'use client';

import React, { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = ({contactData}: any) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  console.log(contactData)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setIsLoading(true);

    try {
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        content: formData.get('content') as string,
      };

      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(t('感谢您的留言！我们会尽快与您联系。'));
        form.reset();
      } else {
        alert(t('提交失败，请稍后重试。'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('网络错误，请稍后重试。'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{t('contact.form.name')}</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={t('contact.form.name')} />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">{t('contact.form.email')}</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={t('contact.form.email')} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">{t('contact.form.phone')}</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={t('contact.form.phone')} />
              </div>
              <div>
                <label htmlFor="content" className="block text-gray-700 font-medium mb-2">{t('contact.form.msg')}</label>
                <textarea required id="content" name="content" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={t('contact.form.msg')}></textarea>
              </div>
              <button type="submit" disabled={isLoading} className={`w-full ${isLoading ? 'bg-primary-dark opacity-70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all ${!isLoading ? 'transform hover:scale-[1.02]' : ''}`}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact.form.submitting')}
                  </span>
                ) : (
                  t('contact.form.btn')
                )}
              </button>
            </form>
          </div>

          <div className="md:w-1/2 md:pl-8">
            <div className="bg-gray-50 rounded-lg p-8 h-full border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-primary">{t('contact.info.title')}</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{t('contact.info.addrTitle')}</h4>
                    <p className="text-gray-600">{contactData.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                      <i className="fas fa-phone"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{t('contact.info.phoneTitle')}</h4>
                    <p className="text-gray-600">{contactData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{t('contact.info.emailTitle')}</h4>
                    <p className="text-gray-600">{contactData.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                      <i className="fas fa-clock"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{t('contact.info.hoursTitle')}</h4>
                    <p className="text-gray-600">{contactData.work_time}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold mb-4">{t('contact.info.follow')}</h4>
                <div className="flex space-x-4">
                  {['weixin', 'linkedin', 'github', 'zhihu'].map((social) => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                      <i className={`fab fa-${social}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;