'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ExpertResult {
  name: string;
  position: string;
  certificateId: string;
}
const ExpertPage: React.FC = () => {
  const { t } = useTranslation('expert');
  const [expertName, setExpertName] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExpertResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/expert-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expertName,
          certificateId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.expert);
      } else {
        setError(t('search.noExpert'));
      }
    } catch (err) {
      setError(t('search.errorMessage'));
      console.error('Error searching expert:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-primary-pale">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* 专家库查询系统 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">{t('search.title')}</h3>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="certificateId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('search.certificateIdLabel')}
                </label>
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder={t('search.certificateIdPlaceholder')}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="expertName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('search.nameLabel')}
                </label>
                <input
                  type="text"
                  id="expertName"
                  value={expertName}
                  onChange={(e) => setExpertName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder={t('search.namePlaceholder')}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-primary-dark transition-colors transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('search.loading') : t('search.submitButton')}
              </button>
            </div>
          </form>

          {/* 结果展示 */}
          {error && (
            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
              <i className="fas fa-exclamation-triangle text-red-500 text-3xl mb-4"></i>
              <h4 className="text-xl font-semibold text-red-800 mb-2">{t('search.noExpert')}</h4>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <i className="fas fa-check-circle text-green-500 text-3xl mb-4"></i>
              <p className="text-gray-800">
                <span className="font-medium mx-1">{t('search.nameLabel')}</span>
                <span>{result.name}</span>
              </p>
              <p className="text-gray-800">
                <span className="font-medium mx-1">{t('search.positionLabel')}</span>
                <span>{result.position}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExpertPage;
