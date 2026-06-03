'use client';

import { useState, useEffect } from 'react';

type Milestone = {
  id: number;
  name: string;
  days: number;
  message: string;
  date: string;
};

export default function Home() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ name: '', days: '', message: '' });

  useEffect(() => {
    const saved = localStorage.getItem('soberMilestones');
    if (saved) {
      setMilestones(JSON.parse(saved));
    } else {
      const defaults: Milestone[] = [
        { id: 1, name: "Sarah K.", days: 1847, message: "One day at a time turned into over 5 years. Grateful beyond words.", date: "March 12, 2020" },
        { id: 2, name: "Marcus T.", days: 623, message: "My kids have their dad back. That's everything.", date: "October 18, 2024" },
        { id: 3, name: "Elena R.", days: 90, message: "90 days today. First time in my adult life. Feeling hopeful.", date: "Today" },
      ];
      setMilestones(defaults);
      localStorage.setItem('soberMilestones', JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('soberMilestones', JSON.stringify(milestones));
  }, [milestones]);

  const totalDays = milestones.reduce((sum, m) => sum + m.days, 0);

  const triggerConfetti = () => {
    for (let i = 0; i < 120; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#10b981', '#8b5cf6', '#eab308', '#ec4899', '#f43f5e'][Math.floor(Math.random() * 5)];
        confetti.style.width = confetti.style.height = (Math.random() * 10 + 8) + 'px';
        confetti.style.animationDuration = (Math.random() * 3.8 + 2.8) + 's';
        confetti.style.opacity = (Math.random() * 0.7 + 0.6).toString();
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 7000);
      }, i * 20);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.name || !newMilestone.days) return;

    const milestone: Milestone = {
      id: Date.now(),
      name: newMilestone.name.trim(),
      days: parseInt(newMilestone.days),
      message: newMilestone.message.trim() || "Celebrating this milestone today!",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setMilestones([milestone, ...milestones]);
    setNewMilestone({ name: '', days: '', message: '' });
    setShowForm(false);
    triggerConfetti();
  };

  const deleteMilestone = (id: number) => {
    if (confirm("Delete this milestone?")) {
      setMilestones(milestones.filter(m => m.id !== id));
    }
  };

  const shareApp = () => {
    const text = `Every sober day is worth celebrating 🌟\n\nI've been celebrating recovery with this beautiful app. Join me?`;
    navigator.share?.({ title: "Sober Celebrations", text })
      .catch(() => alert("Copy this link and share it:\nhttps://your-app-url.vercel.app"));
  };

  return (
    <main className="max-w-4xl mx-auto pb-20 px-4 sm:px-6">
      <div className="text-center py-12">
        <div className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
          Together We Celebrate Recovery
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
          Every sober day<br />is worth celebrating
        </h1>
        
        <div className="inline-flex items-baseline gap-3 bg-white rounded-3xl px-8 py-4 shadow-sm border border-emerald-100 mb-10">
          <span className="text-5xl">🌟</span>
          <div>
            <div className="text-4xl font-bold text-emerald-600">{totalDays.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Total days celebrated together</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <button 
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
        >
          🎉 Add New Sober Birthday
        </button>
        <button 
          onClick={shareApp}
          className="bg-white border border-slate-300 hover:bg-slate-50 px-8 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          Share this App 💞
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="milestone-card bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 hover:border-emerald-200 relative">
            <button onClick={() => deleteMilestone(milestone.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-3xl leading-none">×</button>

            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-5xl font-bold text-emerald-600">{milestone.days}</div>
                <div className="text-sm text-slate-500">days sober</div>
              </div>
              <div className="text-5xl">🎊</div>
            </div>

            <div className="font-semibold text-xl mb-3">{milestone.name}</div>
            <div className="text-slate-600 mb-6 leading-relaxed">"{milestone.message}"</div>
            <div className="text-xs text-slate-500">{milestone.date}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Celebrate a New Milestone</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Name or Initials</label>
                <input type="text" value={newMilestone.name} onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-emerald-500" placeholder="Alex R." required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Days Sober</label>
                <input type="number" value={newMilestone.days} onChange={(e) => setNewMilestone({...newMilestone, days: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-emerald-500" placeholder="365" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Celebration Message (optional)</label>
                <textarea value={newMilestone.message} onChange={(e) => setNewMilestone({...newMilestone, message: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-3xl focus:outline-none focus:border-emerald-500 h-24 resize-y" placeholder="This journey has changed my life..." />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 border border-slate-300 rounded-2xl font-medium">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-semibold">Celebrate 🎉</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="text-center text-slate-400 text-sm mt-16">
        Made with love for every sober day 💗
      </footer>
    </main>
  );
}
