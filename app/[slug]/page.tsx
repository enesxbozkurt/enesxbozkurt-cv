import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Education } from '@/components/sections/education'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import type { Metadata } from 'next'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getProfileData(slug: string) {
    const supabase = await createClient()

    // Get current user to check ownership
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch profile
    let query = supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .single()

    const { data: profile, error: profileError } = await query

    if (profileError || !profile) {
        return null
    }

    // Access control:
    // 1. Profile is public -> Allow
    // 2. Profile is private BUT current user is the owner -> Allow
    // 3. Otherwise -> Deny (return null)

    if (!profile.is_public && profile.id !== user?.id) {
        return null
    }

    // Fetch all related data in parallel
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

    return {
        profile,
        experiences: experiences || [],
        projects: projects || [],
        education: education || [],
        skills: skills || [],
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const data = await getProfileData(slug)

    if (!data) {
        return {
            title: 'Profile Not Found',
        }
    }

    return {
        title: `${data.profile.name} - ${data.profile.title}`,
        description: data.profile.tagline || data.profile.bio || `${data.profile.name}'s professional CV and portfolio`,
    }
}

export default async function CVPage({ params }: PageProps) {
    const { slug } = await params
    const data = await getProfileData(slug)

    if (!data) {
        notFound()
    }

    const { profile, experiences, projects, education, skills } = data

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

                <About bio={profile.bio} location={profile.location} />

                <Skills skills={skills} />

                <Experience experiences={experiences} />

                <Projects projects={projects} />

                <Education education={education} />

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
