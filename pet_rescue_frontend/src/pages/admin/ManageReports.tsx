import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { PetReport } from '../../types';
import ReportCard from '../../components/ReportCard';
import Button from '../../components/Button';

const ManageReports: React.FC = () => {
  const [reports, setReports] = useState<PetReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/reports/admin-get-all/');
      setReports(response.data.data.Reports);
    } catch (error) {
      console.error('Error fetching admin reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const comment = newStatus === 'Rejected'
        ? prompt("Enter rejection reason (optional):") || ""
        : "Approved by administrator.";

      await api.patch(`/reports/${id}/admin-update-report/`, {
        status: newStatus,
        admin_comment: comment
      });

      setReports(reports.map(r =>
        r.id === id ? { ...r, status: newStatus as any, admin_comment: comment } : r
      ));
    } catch (error) {
      console.error('Failed to update report status:', error);
      alert('Error updating report status.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800">📋 Manage Reports</h1>
        <p className="text-slate-500 mt-1">Review and manage community rescue reports.</p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <span className="text-4xl animate-float inline-block">📋</span>
          <p className="mt-4 text-slate-500 font-bold">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-orange-50">
          <span className="text-4xl">📋</span>
          <p className="mt-4 text-slate-500 font-bold">No reports found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report}>
              {report.status === 'Pending' ? (
                <>
                  <Button className="flex-1" variant="success" onClick={() => handleUpdateStatus(report.id, 'Accepted')}>
                    ✓ Accept
                  </Button>
                  <Button className="flex-1" variant="danger" onClick={() => handleUpdateStatus(report.id, 'Rejected')}>
                    ✕ Reject
                  </Button>
                </>
              ) : (
                <div className="w-full text-center text-sm font-bold py-2.5 rounded-xl bg-slate-50 text-slate-500 border border-slate-100">
                  {report.status} {report.admin_comment && ` — ${report.admin_comment}`}
                </div>
              )}
            </ReportCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReports;
