import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Education } from '@/components/sections/education'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', 'enesxbozkurt')
    .eq('is_public', true)
    .single()

  if (error || !profile) {
    notFound()
  }

  const [
    { data: experiences },
    { data: projects },
    { data: education },
    { data: skills },
  ] = await Promise.all([
    supabase
      .from('experiences')
      .select('*')
      .eq('user_id', profile.id)
      .order('order', { ascending: true }),

    supabase
      .from('projects')
      .select('*')
      .eq('user_id', profile.id)
      .order('order', { ascending: true }),

    supabase
      .from('education')
      .select('*')
      .eq('user_id', profile.id)
      .order('order', { ascending: true }),

    supabase
      .from('skills')
      .select('*')
      .eq('user_id', profile.id)
      .order('order', { ascending: true }),
  ])

  return (
    <div className="min-h-screen">
      <Navbar name={profile.name} />

      <main>
        <Hero
          name={profile.name}
          title={profile.title}
          tagline={profile.tagline}
          avatarUrl={profile.avatar_url}
          email={profile.email}
        />

        <About
          bio={profile.bio}
          location={profile.location}
        />

        <Skills skills={skills || []} />

        <Experience experiences={experiences || []} />

        <Projects projects={projects || []} />

        <Education education={education || []} />

        <Contact
          email={profile.email}
          phone={profile.phone}
          linkedin={profile.linkedin}
          github={profile.github}
          website={profile.website}
        />
      </main>

      <Footer />
    </div>
  )
}
