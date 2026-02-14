import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
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

  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('slug')
      .eq('id', user.id)
      .single()

    if (userProfile?.slug) {
      redirect(`/${userProfile.slug}`)
    }
  }

  // Check if there's a default PUBLIC profile to show
  try {
    const { data: publicProfile } = await supabase
      .from('profiles')
      .select('slug')
      .eq('is_public', true)
      .limit(1)
      .single()

    if (publicProfile?.slug) {
      // Redirect to the first public CV
      redirect(`/${publicProfile.slug}`)
    }
  } catch (e) {
    // Ignore errors for now and show demo
  }

  // Demo data for the root page when no profile exists
  const demoProfile = {
    name: "Enes Bozkurt",
    title: "Full Stack Developer",
    tagline: "Building digital experiences with code and creativity.",
    bio: "I am a passionate developer handling full-stack projects with modern technologies. I love building clean, performant, and user-friendly applications.",
    email: "contact@example.com",
    location: "Istanbul, Turkey",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com"
  }

  const demoSkills = [
    { id: "1", name: "Next.js", category: "Frontend" },
    { id: "2", name: "React", category: "Frontend" },
    { id: "3", name: "TypeScript", category: "Languages" },
    { id: "4", name: "Tailwind CSS", category: "Styling" },
    { id: "5", name: "Supabase", category: "Backend" },
    { id: "6", name: "Node.js", category: "Backend" },
    { id: "7", name: "PostgreSQL", category: "Database" },
    { id: "8", name: "Git", category: "Tools" },
  ]

  const demoExperience = [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      start_date: "2022-01-01",
      description: "Leading the frontend team, architecting new features, and optimizing performance.",
      location: "Hybrid"
    },
    {
      id: "2",
      company: "Creative Digital Agency",
      position: "Full Stack Developer",
      start_date: "2020-03-01",
      end_date: "2021-12-31",
      description: "Developed custom web applications for various clients using React and Node.js.",
      location: "Istanbul"
    }
  ]

  const demoProjects = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-featured online store with cart, checkout, and admin dashboard.",
      tech_stack: ["Next.js", "Stripe", "Prisma"],
      github_url: "https://github.com",
      url: "https://example.com",
      image_url: "" // Placeholder
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Real-time collaboration tool for teams to manage tasks and projects.",
      tech_stack: ["React", "Firebase", "Tailwind"],
      github_url: "https://github.com",
      image_url: "" // Placeholder
    },
    {
      id: "3",
      title: "Portfolio Website",
      description: "Modern personal portfolio with animations and dark mode.",
      tech_stack: ["Next.js", "Framer Motion"],
      url: "https://example.com",
      image_url: "" // Placeholder
    }
  ]

  const demoEducation = [
    {
      id: "1",
      institution: "Istanbul Technical University",
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      start_date: "2016-09-01",
      end_date: "2020-06-30"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar name={demoProfile.name} />

      <main>
        <Hero
          name={demoProfile.name}
          title={demoProfile.title}
          tagline={demoProfile.tagline}
          email={demoProfile.email}
        />

        <About bio={demoProfile.bio} location={demoProfile.location} />

        <Skills skills={demoSkills} />

        <Experience experiences={demoExperience} />

        <Projects projects={demoProjects} />

        <Education education={demoEducation} />

        <Contact
          email={demoProfile.email}
          linkedin={demoProfile.linkedin}
          github={demoProfile.github}
          website={demoProfile.website}
        />
      </main>

      <Footer />
    </div>
  )
}
