'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="text-8xl">🤝✨</div>
        </div>
        
        <h1 className="text-5xl font-bold text-slate-800 mb-4 tracking-tight">
          Together We Celebrate Recovery
        </h1>
        
        <p className="text-xl text-slate-600 mb-10">
          A private space to cheer each other on, one sober day at a time.
        </p>

        <div className="space-y-4">
          <Link 
            href="/members"
            className="block w-full bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold text-xl py-5 rounded-3xl hover:brightness-110 transition-all active:scale-[0.98]"
          >
            See Group Members
          </Link>
          
          <p className="text-sm text-slate-500 mt-8">
            More pages coming soon 💗
          </p>
        </div>
      </div>
    </main>
  );
}
