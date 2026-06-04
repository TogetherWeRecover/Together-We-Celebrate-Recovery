'use client';

import Link from 'next/link';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-blue-50 pb-24">
      <div className="max-w-md w-full mx-auto text-center pt-12 pb-12 px-6">
        <div className="mb-8 flex justify-center">
          <div className="text-8xl">🤝✨</div>
        </div>
        
        <h1 className="text-5xl font-bold text-slate-800 mb-4 tracking-tight">
          Together We Celebrate Recovery
        </h1>
        
        <p className="text-xl text-slate-600 mb-10">
          A private space to cheer each other on, one sober day at a time.
        </p>

        <Link 
          href="/members"
          className="block w-full bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold text-xl py-5 rounded-3xl hover:brightness-110 transition-all active:scale-[0.98]"
        >
          See Group Members
        </Link>
      </div>

      <Navigation />
    </main>
  );
}
