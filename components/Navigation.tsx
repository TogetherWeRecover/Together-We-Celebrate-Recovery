'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-emerald-100 shadow-xl z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-around py-3 px-6">
        
        <Link 
          href="/" 
          className="flex flex-col items-center gap-1 text-emerald-700 hover:text-emerald-600 transition-colors active:scale-95"
        >
          <span className="text-3xl">🏠</span>
          <span className="text-xs font-medium tracking-widest">HOME</span>
        </Link>

        <Link 
          href="/members" 
          className="flex flex-col items-center gap-1 text-emerald-700 hover:text-emerald-600 transition-colors active:scale-95"
        >
          <span className="text-3xl">🤝</span>
          <span className="text-xs font-medium tracking-widest">MEMBERS</span>
        </Link>

        {/* Future pages will go here */}
        <div className="flex flex-col items-center gap-1 text-slate-300">
          <span className="text-3xl">📅</span>
          <span className="text-xs font-medium tracking-widest">MEETINGS</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-slate-300">
          <span className="text-3xl">💬</span>
          <span className="text-xs font-medium tracking-widest">CHAT</span>
        </div>
      </div>
    </nav>
  );
}
