```tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

type Profile = {
  id: string;
  name: string;
  sobriety_date: string;
};

export default function MembersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<'name' | 'sobriety_date' | 'days_sober'>('sobriety_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterMonth, setFilterMonth] = useState<string>('');

  const supabase = createClient();

  useEffect(() => {
    async function fetchMembers() {
      const { data } = await supabase
        .from('profiles')
        .select('id, name, sobriety_date')   // Phone is intentionally NEVER selected
        .order('sobriety_date', { ascending: false });

      if (data) setProfiles(data);
      setLoading(false);
    }
    fetchMembers();
  }, [supabase]);

  const membersWithData = profiles.map((p) => {
    const sobDate = new Date(p.sobriety_date);
    const today = new Date();
    const daysSober = Math.floor((today.getTime() - sobDate.getTime()) / (1000 * 3600 * 24));
    const monthsSober = Math.floor(daysSober / 30.44);
    const yearsSober = Math.floor(daysSober / 365.25);
    const birthMonth = sobDate.toLocaleString('default', { month: 'long' });

    return { ...p, daysSober, monthsSober, yearsSober, birthMonth };
  });

  let filtered = [...membersWithData];
  if (filterMonth) {
    filtered = filtered.filter(m => m.birthMonth === filterMonth);
  }

  filtered.sort((a, b) => {
    let valA: any = a[sortColumn];
    let valB: any = b[sortColumn];
    if (sortColumn === 'name') {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (column: 'name' | 'sobriety_date' | 'days_sober') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-blue-50 pb-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with logo feel */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="text-5xl">🤝</div>
            <div className="text-5xl">✨</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Group Members
          </h1>
          <p className="text-emerald-700 mt-2 text-lg">Celebrating every sober day together</p>
        </div>

        {/* Month Filter */}
        <div className="max-w-xs mx-auto mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">Filter by Birthday Month</label>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="w-full px-5 py-4 bg-white border border-emerald-200 rounded-3xl text-lg focus:outline-none focus:border-emerald-500 shadow-sm"
          >
            <option value="">All Months</option>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl text-emerald-700">Loading your group… ✨</div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-600 to-sky-600 text-white">
                  <th onClick={() => toggleSort('name')} className="px-6 py-5 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors">
                    Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => toggleSort('sobriety_date')} className="px-6 py-5 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors">
                    Sobriety Date {sortColumn === 'sobriety_date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => toggleSort('days_sober')} className="px-6 py-5 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors">
                    Days Sober {sortColumn === 'days_sober' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-5 text-left font-semibold">Months</th>
                  <th className="px-6 py-5 text-left font-semibold">Years</th>
                  <th className="px-6 py-5 text-left font-semibold">Birthday Month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-emerald-50/70 transition-colors">
                    <td className="px-6 py-5 font-medium text-slate-800">{member.name}</td>
                    <td className="px-6 py-5 text-slate-600">{new Date(member.sobriety_date).toLocaleDateString()}</td>
                    <td className="px-6 py-5 font-semibold text-emerald-700 text-lg">{member.daysSober.toLocaleString()}</td>
                    <td className="px-6 py-5 text-slate-700">{member.monthsSober}</td>
                    <td className="px-6 py-5 text-slate-700">{member.yearsSober}</td>
                    <td className="px-6 py-5 text-emerald-700 font-medium">{member.birthMonth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center text-slate-400 text-sm mt-10">
          Phone numbers are never visible here — even to the app owner 💗
        </div>
      </div>
    </main>
  );
}
```
