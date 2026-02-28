-- Add featured items for Cambodia Express bus service
INSERT INTO menu_featured_items (
  client_id, title, title_km, subtitle, subtitle_km, badge_text, image_url, sort_order, is_active
)
SELECT 
  id,
  'VIP Express to Siem Reap',
  'VIP រហ័សទៅសៀមរាប',
  'Luxury travel with reclining seats & meals',
  'ការធ្វើដំណើរប្រណីតជាមួយកៅអីផ្អៀង និងអាហារ',
  'VIP',
  'https://images.unsplash.com/photo-1540339832862-474599807836?w=1200&h=600&fit=crop',
  1,
  true
FROM menu_clients WHERE slug = 'cambodia-express'
UNION ALL
SELECT 
  id,
  'Beach Express to Sihanoukville',
  'រហ័សទៅឆ្នេរសីហនុវិល',
  'Direct route to paradise beaches',
  'ផ្លូវត្រង់ទៅឆ្នេរស្រស់ស្អាត',
  'Popular',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
  2,
  true
FROM menu_clients WHERE slug = 'cambodia-express'
UNION ALL
SELECT 
  id,
  'Angkor Temple Tours',
  'ទេសចរណ៍ប្រាសាទអង្គរ',
  'Daily departures to world heritage sites',
  'ចេញប្រចាំថ្ងៃទៅកេរ org​ដំណែលពិភពលោក',
  'New',
  'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1200&h=600&fit=crop',
  3,
  true
FROM menu_clients WHERE slug = 'cambodia-express';

