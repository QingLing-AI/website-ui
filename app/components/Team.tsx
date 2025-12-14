'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { TEAM_MEMBERS } from '../constants';

const Team: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('team.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="mb-4 relative w-40 h-40 mx-auto">
                <Image
                  src={member.image}
                  alt={t(member.name)}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full border-4 border-green-50"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{t(member.name)}</h3>
              <p className="text-primary mb-3 font-medium">{t(member.role)}</p>
              <p className="text-gray-600 mb-4 text-sm">
                {t(member.description)}
              </p>
              <div className="flex justify-center space-x-3">
                {member.socials.linkedin && (
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                )}
                {member.socials.twitter && (
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                )}
                {member.socials.github && (
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <i className="fab fa-github text-xl"></i>
                  </a>
                )}
                {member.socials.researchgate && (
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <i className="fab fa-researchgate text-xl"></i>
                  </a>
                )}
                {member.socials.email && (
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <i className="fas fa-envelope text-xl"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;