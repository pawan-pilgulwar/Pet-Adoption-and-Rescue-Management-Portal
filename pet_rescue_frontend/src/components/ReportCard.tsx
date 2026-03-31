import React from 'react';
import { PetReport } from '../types';
import { MEDIA_BASE_URL } from '../services/api';

interface ReportCardProps {
  report: PetReport;
  children?: React.ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, children }) => {
  // The API returns pet data either flat or nested - handle both
  const petName = report.pet_data?.name || report.pet_name || 'Unknown';
  const petType = report.pet_data?.pet_type || report.pet_type || 'Unknown';
  const petStatus = report.pet_data?.status || report.pet_status || 'Lost';
  const petImage = report.pet_data?.image || report.pet_image;

  const imageUrl = petImage
    ? `${MEDIA_BASE_URL}${petImage}`
    : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=70';

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md border border-orange-50 card-hover">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-orange-50">
        <img
          src={imageUrl}
          alt={petName}
          className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
          petStatus === 'Found'
            ? 'bg-teal-500 text-white'
            : 'bg-orange-500 text-white'
        }`}>
          {petStatus}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-lg font-black text-slate-800">{petName}</h3>
            <p className="text-sm text-slate-500">Type: {petType}</p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
            report.status === 'Accepted'
              ? 'bg-teal-50 text-teal-600'
              : report.status === 'Rejected'
              ? 'bg-red-50 text-red-600'
              : 'bg-amber-50 text-amber-600'
          }`}>
            {report.status}
          </span>
        </div>

        <div className="space-y-1 text-sm text-slate-500 mb-3">
          <p className="flex items-center gap-1">
            <span>📍</span> {report.location}
          </p>
          <p className="flex items-center gap-1">
            <span>📝</span> {report.report_type}
          </p>
          {report.user_contact && (
            <p className="flex items-center gap-1">
              <span>📞</span> {report.user_contact.phone || report.user_contact.email}
            </p>
          )}
          {report.pet_age && (
            <p className="flex items-center gap-1">
              <span>🐾</span> Age: {report.pet_age} • Gender: {report.pet_gender || '—'} • Size: {report.pet_size || '—'}
            </p>
          )}
        </div>

        <p className="text-sm text-slate-400 line-clamp-2">
          {report.description || 'No additional details provided.'}
        </p>

        {children && <div className="mt-4 flex gap-2">{children}</div>}
      </div>
    </article>
  );
};

export default ReportCard;
