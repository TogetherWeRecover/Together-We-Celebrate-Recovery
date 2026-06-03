import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = createClient(await cookies())
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Together We Celebrate Recovery
        </h1>
        
        <p className="text-center text-lg mb-8">
          Sober Birthdays &amp; Recovery Milestones
        </p>

        {session ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p>Welcome back, {session.user.email}!</p>
            {/* We'll build the sober tracker here soon */}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-6">Sign in to track your milestones</p>
            {/* Login button will go here later */}
          </div>
        )}
      </div>
    </main>
  )
}
