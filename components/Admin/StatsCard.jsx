import React from 'react';

const StatsCard = ({ title, value, color }) => {
    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
    );
};

export default StatsCard;