-- ============================================================
-- Run this in Supabase > SQL Editor > New query
-- Uses CASCADE to remove any dependent policies/indexes first.
-- ============================================================

-- 1. Drop everything cleanly
DROP TABLE IF EXISTS public.properties CASCADE;

-- 2. Recreate with the correct schema (TEXT primary key, all 21 columns)
CREATE TABLE public.properties (
  id          TEXT        PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  status      TEXT        NOT NULL CHECK (status IN ('For Sale', 'For Rent', 'Sold')),
  type        TEXT        NOT NULL CHECK (type IN ('House', 'Apartment', 'Villa', 'Studio', 'Commercial')),
  price       NUMERIC     NOT NULL,
  address     TEXT        NOT NULL,
  city        TEXT        NOT NULL,
  state       TEXT        NOT NULL,
  zip         TEXT        NOT NULL,
  bedrooms    INTEGER     NOT NULL DEFAULT 0,
  bathrooms   INTEGER     NOT NULL DEFAULT 0,
  sqft        INTEGER     NOT NULL,
  garage      INTEGER,
  year_built  INTEGER,
  floors      INTEGER,
  features    TEXT[]      NOT NULL DEFAULT '{}',
  images      JSONB       NOT NULL DEFAULT '[]',
  is_featured BOOLEAN     NOT NULL DEFAULT FALSE,
  agent_id    TEXT        NOT NULL,
  listed_at   DATE        NOT NULL
);

-- 3. Indexes
CREATE INDEX properties_status_idx      ON public.properties (status);
CREATE INDEX properties_type_idx        ON public.properties (type);
CREATE INDEX properties_city_idx        ON public.properties (city);
CREATE INDEX properties_is_featured_idx ON public.properties (is_featured);
CREATE INDEX properties_price_idx       ON public.properties (price);
CREATE INDEX properties_listed_at_idx   ON public.properties (listed_at DESC);

-- 4. RLS — disabled so the seed script (anon key) can insert freely
--    Re-enable and add policies once you have an admin auth flow.
ALTER TABLE public.properties DISABLE ROW LEVEL SECURITY;

-- 5. Force PostgREST schema cache reload
SELECT pg_notify('pgrst', 'reload schema');
