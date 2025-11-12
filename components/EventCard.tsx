
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-[0_8px_32px_rgba(15,107,107,0.15)] overflow-hidden hover:shadow-[0_12px_48px_rgba(15,107,107,0.35)] hover:border-naps-teal/50 transition-all duration-500 transform hover:-translate-y-2 group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-naps-teal/0 via-naps-teal/0 to-naps-teal/0 group-hover:from-naps-teal/5 group-hover:via-naps-teal/10 group-hover:to-naps-teal/5 transition-all duration-500 z-0"></div>
      <div className="relative z-10">
        <div className="relative overflow-hidden">
          <img className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" src={event.image} alt={event.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="p-6">
          <div className="uppercase tracking-wide text-sm text-naps-teal font-semibold group-hover:text-naps-teal transition-colors duration-300">{event.date}</div>
          <h3 className="block mt-1 text-lg leading-tight font-medium text-gray-100 group-hover:text-naps-teal transition-colors duration-300">{event.title}</h3>
          <p className="mt-2 text-gray-400">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;