'use client';

import { useState } from 'react';

export default function Home() {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      name: "Sarah K.",
      days: 1847,
      message: "One day at a time turned into over 5 years. Grateful beyond words.",
      date: "March 12, 2020"
    },
    {
      id: 2,
      name: "Marcus T.",
      days: 623,
      message: "My kids have their dad back. That's everything.",
      date: "October 18, 2024"
    },
    {
      id: 3,
      name: "Elena R.",
      days: 90,
      message: "90 days today. First time in my adult life. Feeling hopeful.",
      date: "Today"
    },
  ]);

  return (
    <main className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <div className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
          Together We Celebrate Recovery
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Every sober day<br />is worth celebrating
        </h1>
        <p className="text-xl text-slate-600 max-w-md mx-auto">
          A beautiful space to honor recovery milestones and support one another.
        </p>
      </div>

      {/* Add New Milestone Button */}
      <div className="flex justify-center mb-12">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 shadow-lg transition-all active:scale-95">
          🎉 Add New Sober Birthday
        </button>
      </div>

      {/* Milestones Grid */}
      <div className="grid md:grid-cols-2 gap-6 px-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-emerald-200 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-4xl font-bold text-emerald-600">{milestone.days}</div>
                <div className="text-sm text-slate-500">days sober</div>
              </div>
              <div className="text-4xl">🎊</div>
            </div>

            <div className="font-semibold text-xl mb-2">{milestone.name}</div>
            <div className="text-slate-600 mb-6 leading-relaxed">
              "{milestone.message}"
            </div>

            <div className="text-xs text-slate-500">{milestone.date}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-slate-500 text-sm mt-16 pb-12">
        More milestones coming soon...
      </div>
    </main>
  );
}
