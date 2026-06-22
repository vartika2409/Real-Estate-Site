-- Run this in Supabase > SQL Editor to test a single insert.
-- If it errors, the error message will tell us exactly what's wrong.

INSERT INTO public.properties
  (id, title, description, status, type, price, address, city, state, zip,
   bedrooms, bathrooms, sqft, garage, year_built, floors, features, images,
   is_featured, agent_id, listed_at)
VALUES
  ('prop-test',
   'Test Property',
   'A test description.',
   'For Sale', 'House', 500000,
   '123 Main St', 'Austin', 'TX', '78701',
   3, 2, 2000, 2, 2020, 2,
   ARRAY['Pool', 'Garage'],
   '[{"url":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80","alt":"Test"}]'::jsonb,
   FALSE, 'agent-001', '2024-01-01');

-- Check result
SELECT id, title, type, sqft, agent_id FROM public.properties;
