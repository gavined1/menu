/** @type {import('next-sitemap').IConfig} */
const { createClient } = require('@supabase/supabase-js');

module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    'https://angkormenu.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/dashboard', '/dashboard/*', '/auth/*', '/api/*'],
  additionalPaths: async (config) => {
    const result = [];

    // Add main pages
    result.push({
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
    });

    result.push({
      loc: '/privacy',
      changefreq: 'monthly',
      priority: 0.5,
    });

    result.push({
      loc: '/terms',
      changefreq: 'monthly',
      priority: 0.5,
    });

    // Add dynamic menu pages ([/slug] routes)
    // Next-sitemap will also auto-discover routes from generateStaticParams
    // but we explicitly add them here for better control over priority/changefreq
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: clients, error } = await supabase
          .from('menu_clients')
          .select('slug, updated_at')
          .eq('is_active', true);

        if (!error && clients) {
          clients.forEach((client) => {
            result.push({
              loc: `/${client.slug}`,
              changefreq: 'weekly',
              priority: 0.8,
              lastmod: client.updated_at || new Date().toISOString(),
            });
          });
        }
      }
    } catch (error) {
      console.error('Error adding menu slugs to sitemap:', error);
      // Continue without failing - next-sitemap will still discover routes from generateStaticParams
    }

    return result;
  },
};
