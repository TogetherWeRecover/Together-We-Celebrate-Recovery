'use client';

import { useState } from 'react';

type Milestone = {
  id: number;
  name: string;
  days: number;
  message: string;
  date: string;
};

export default function Home() {
  const [milestones, setMilestones] = useState<Milestone[]>([
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

  const [showForm, setShowForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    name: '',
    days: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.name || !newMilestone.days) return;

    const milestone: Milestone = {
      id: Date.now(),
      name: newMilestone.name,
      days: parseInt(newMilestone.days),
      message: newMilestone.message || "Celebrating this milestone today!",
      date: "Today"
    };

    setMilestones([milestone, ...milestones]);
    setNewMilestone({ name: '', days: '', message: '' });
    setShowForm(false);
  };

  return (
    <main className="max-w-4xl mx-auto pb-12">
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

      {/* Add Button */}
      <div className="flex justify-center mb-12">
        <button 
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 shadow-lg transition-all active:scale-95"
        >
          🎉 Add New Sober Birthday
        </button>
      </div>

      {/* Milestones Grid */}
      <div className="grid md:grid-cols-2 gap-6 px-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-emerald-200 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-5xl font-bold text-emerald-600">{milestone.days}</div>
                <div className="text-sm text-slate-500">days sober</div>
              </div>
              <div className="text-5xl">🎊</div>
            </div>

            <div className="font-semibold text-xl mb-2">{milestone.name}</div>
            <div className="text-slate-600 mb-6 leading-relaxed">
              "{milestone.message}"
            </div>

            <div className="text-xs text-slate-500">{milestone.date}</div>
          </div>
        ))}
      </div>

      {/* Add Milestone Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Celebrate a New Milestone</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Name or Initials</label>
                <input
                  type="text"
                  value={newMilestone.name}
                  onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  placeholder="Alex R."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Days Sober</label>
                <input
                  type="number"
                  value={newMilestone.days}
                  onChange={(e) => setNewMilestone({...newMilestone, days: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  placeholder="365"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Celebration Message (optional)</label>
                <textarea
                  value={newMilestone.message}
                  onChange={(e) => setNewMilestone({...newMilestone, message: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-3xl focus:outline-none focus:border-emerald-500 h-24"
                  placeholder="This journey has changed my life..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-4 border border-slate-300 rounded-2xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-semibold"
                >
                  Celebrate 🎉
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
