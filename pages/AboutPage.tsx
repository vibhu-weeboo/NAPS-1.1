import React from 'react';
import { VISIONS, MISSIONS, OBJECTIVES } from '../constants';
import BackButton from '../components/BackButton';

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start space-x-3">
    <div className="flex-shrink-0">
      <svg className="w-5 h-5 text-naps-teal" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
    </div>
    <span className="text-gray-400">{children}</span>
  </li>
);

const SectionCard: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(15,107,107,0.15)] border border-gray-700/50 transition-all duration-500 hover:shadow-[0_12px_48px_rgba(15,107,107,0.35)] hover:border-naps-teal/50 hover:bg-gray-800/60 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-naps-teal/0 via-naps-teal/0 to-naps-teal/0 group-hover:from-naps-teal/5 group-hover:via-naps-teal/10 group-hover:to-naps-teal/5 transition-all duration-500"></div>
    <div className="relative z-10">
      <h3 className="text-2xl font-bold text-naps-teal mb-6 group-hover:drop-shadow-[0_0_15px_rgba(15,107,107,0.6)] transition-all duration-300">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </ul>
    </div>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        <BackButton />
        <div className="py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-50">About <span style={{ color: '#529A9B' }}>NAPS</span></h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Learn about our guiding principles that drive us to empower the next generation of pharmacists in Myanmar.
          </p>
        </div>

        <div className="py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Our Principles</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our vision, mission, and objectives guide us in our commitment to fostering a supportive and enriching environment for all pharmacy students in Myanmar.
            </p>
          </div>
          <div className="space-y-12">
            <SectionCard title="Our Vision" items={VISIONS} />
            <SectionCard title="Our Mission" items={MISSIONS} />
            <SectionCard title="Our Objectives" items={OBJECTIVES} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;