import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient()

    const { data: profiles } = await supabase
        .from('profiles')
        .select('slug, updated_at')
        .eq('is_public', true)

    const baseUrl = 'https://enesxbozkurt.com'

    const profileUrls =
        profiles?.map((profile) => ({
            url: `${baseUrl}/${profile.slug}`,
            lastModified: profile.updated_at
                ? new Date(profile.updated_at)
                : new Date(),
        })) ?? []

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...profileUrls,
    ]
}
