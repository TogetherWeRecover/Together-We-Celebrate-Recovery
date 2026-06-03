import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-emerald-600">
          Together We Celebrate Recovery
        </h1>
        
        <p className="text-center text-xl mb-10 text-gray-600">
          Sober Birthdays & Recovery Milestones
        </p>

        {session ? (
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <p className="text-lg">Welcome back!</p>
            <p className="text-emerald-600 font-medium">{session.user.email}</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <p className="mb-6 text-gray-600">Sign in to start tracking your sober journey</p>
          </div>
        )}
      </div>
    </main>
  )
}
