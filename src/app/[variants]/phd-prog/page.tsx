'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PhDProgramPage: React.FC = () => {
  const { t } = useTranslation('phd_prog');

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* 头部介绍 */}
      <section className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">{t('subtitle')}</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">{t('intro')}</p>
      </section>

      {/* 计划概览 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('programOverview')}
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('vision')}</h3>
          <p className="text-gray-600 leading-relaxed">{t('visionContent')}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('researchAreas')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">{t('researchArea1')}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">{t('researchArea2')}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">{t('researchArea3')}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">{t('researchArea4')}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">{t('researchArea5')}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">{t('researchArea6')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 计划核心亮点 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('highlights')}
        </h2>

        <div className="space-y-5">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4">
              1
            </div>
            <p className="text-gray-600 leading-relaxed pt-1">{t('highlight1')}</p>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4">
              2
            </div>
            <p className="text-gray-600 leading-relaxed pt-1">{t('highlight2')}</p>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4">
              3
            </div>
            <p className="text-gray-600 leading-relaxed pt-1">{t('highlight3')}</p>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4">
              4
            </div>
            <p className="text-gray-600 leading-relaxed pt-1">{t('highlight4')}</p>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4">
              5
            </div>
            <p className="text-gray-600 leading-relaxed pt-1">{t('highlight5')}</p>
          </div>
        </div>
      </section>

      {/* 伙伴大学 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('partnerUniversities')}
        </h2>

        <p className="text-gray-600 mb-5 leading-relaxed">{t('universitiesIntro')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            {t('university1')}
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            {t('university2')}
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            {t('university3')}
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            {t('university4')}
          </div>
        </div>

        <p className="text-gray-500 italic text-sm">{t('universitiesNote')}</p>
      </section>

      {/* 工作职责 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('responsibilities')}
        </h2>

        <ul className="space-y-3 list-disc pl-6 text-gray-600">
          <li className="leading-relaxed">{t('responsibility1')}</li>
          <li className="leading-relaxed">{t('responsibility2')}</li>
          <li className="leading-relaxed">{t('responsibility3')}</li>
          <li className="leading-relaxed">{t('responsibility4')}</li>
          <li className="leading-relaxed">{t('responsibility5')}</li>
          <li className="leading-relaxed">{t('responsibility6')}</li>
          <li className="leading-relaxed">{t('responsibility7')}</li>
        </ul>
      </section>

      {/* 申请条件 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('requirements')}
        </h2>

        <ul className="space-y-4 list-none">
          <li className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-3 mt-0.5">
              •
            </div>
            <p className="text-gray-600 leading-relaxed">{t('requirement1')}</p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-3 mt-0.5">
              •
            </div>
            <p className="text-gray-600 leading-relaxed">{t('requirement2')}</p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-3 mt-0.5">
              •
            </div>
            <p className="text-gray-600 leading-relaxed">{t('requirement3')}</p>
          </li>
          <li className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-3 mt-0.5">
              •
            </div>
            <p className="text-gray-600 leading-relaxed">{t('requirement4')}</p>
          </li>
        </ul>
      </section>

      {/* 申请流程 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('applicationProcess')}
        </h2>

        <div className="relative">
          {/* 连接线 */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>

          <div className="space-y-8">
            <div className="flex md:items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4 z-10">
                1
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                <p className="text-gray-600">{t('process1')}</p>
              </div>
            </div>
            <div className="flex md:items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4 z-10">
                2
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                <p className="text-gray-600">{t('process2')}</p>
              </div>
            </div>
            <div className="flex md:items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4 z-10">
                3
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                <p className="text-gray-600">{t('process3')}</p>
              </div>
            </div>
            <div className="flex md:items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold mr-4 z-10">
                4
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                <p className="text-gray-600">{t('process4')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 申请方法 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('applicationMethod')}
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">{t('applicationIntro')}</p>

        <div className="bg-gray-50 p-5 rounded-lg mb-4">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="font-semibold text-gray-800 mr-2">1.</span>
              <span className="text-gray-600">{t('resumeReq1')}</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-gray-800 mr-2">2.</span>
              <span className="text-gray-600">{t('resumeReq2')}</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-gray-800 mr-2">3.</span>
              <span className="text-gray-600">{t('resumeReq3')}</span>
              <ul className="ml-4 mt-2 space-y-2">
                <li className="text-gray-600">{t('resumeSub1')}</li>
                <li className="text-gray-600">{t('resumeSub2')}</li>
                <li className="text-gray-600">{t('resumeSub3')}</li>
              </ul>
            </li>
          </ul>
        </div>

        <p className="text-gray-600 italic">{t('resumeNote')}</p>
      </section>

      {/* 其他说明 */}
      <section className="mb-16 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
          {t('otherNotes')}
        </h2>

        <div className="space-y-4 text-gray-600">
          <p className="leading-relaxed">{t('note1')}</p>
          <p className="leading-relaxed">{t('note2')}</p>
          <p className="leading-relaxed">{t('note3')}</p>
          <p className="leading-relaxed font-medium">{t('note4')}</p>
        </div>
      </section>

      {/* 联络方式 */}
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-500 pb-2">
          {t('contact')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('instituteName')}</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t('address')}
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {t('phone')}
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {t('email')}
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zm2 10a2 2 0 110-4 2 2 0 010 4zm-6 6a2 2 0 110-4 2 2 0 010 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18v-5l-4 4m8-4l4 4V6m-12 0h10m-4 0h2m-10 0a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2H6z"
                  />
                </svg>
                <a
                  href="https://www.iodeg.hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-200 transition-colors"
                >
                  {t('website')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PhDProgramPage;
