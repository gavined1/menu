-- Remove starter kit demo tables
-- These tables were part of the original starter kit and are no longer needed

-- Drop tables (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS content_blog_post_comments CASCADE;
DROP TABLE IF EXISTS content_blog_posts CASCADE;
DROP TABLE IF EXISTS private_items CASCADE;

-- Rollback script (if needed):
-- The original migrations would need to be re-run to restore these tables

