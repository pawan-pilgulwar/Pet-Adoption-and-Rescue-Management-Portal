import React from 'react';

interface DashboardTableProps {
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ headers, data, renderRow }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.length > 0 ? (
                        data.map((item, index) => renderRow(item))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="px-6 py-10 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;
