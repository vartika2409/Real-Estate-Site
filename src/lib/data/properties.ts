import { supabase } from "@/lib/supabase";
import type { Property, PropertyFilters, PropertyImage, PropertyStatus, PropertyType } from "@/types";

type PropertyRow = {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  garage: number | null;
  year_built: number | null;
  floors: number | null;
  features: string[];
  images: PropertyImage[];
  is_featured: boolean;
  agent_id: string;
  listed_at: string;
};

function mapRow(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status as PropertyStatus,
    type: row.type as PropertyType,
    price: row.price,
    location: {
      address: row.address,
      city: row.city,
      state: row.state,
      zip: row.zip,
    },
    specs: {
      bedrooms: row.bedrooms,
      bathrooms: row.bathrooms,
      sqft: row.sqft,
      ...(row.garage != null && { garage: row.garage }),
      ...(row.year_built != null && { yearBuilt: row.year_built }),
      ...(row.floors != null && { floors: row.floors }),
    },
    features: row.features ?? [],
    images: row.images ?? [],
    isFeatured: row.is_featured,
    agentId: row.agent_id,
    listedAt: row.listed_at,
  };
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapRow(data as PropertyRow);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_featured", true)
    .order("listed_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => mapRow(row as PropertyRow));
}

export async function getPaginatedProperties(
  filters: Partial<PropertyFilters>,
  page: number,
  perPage = 6
): Promise<{ items: Property[]; totalPages: number; total: number }> {
  let query = supabase.from("properties").select("*", { count: "exact" });

  if (filters.query) {
    const q = filters.query;
    query = query.or(
      `title.ilike.%${q}%,city.ilike.%${q}%,state.ilike.%${q}%,description.ilike.%${q}%`
    );
  }
  if (filters.type && filters.type !== "All") {
    query = query.eq("type", filters.type);
  }
  if (filters.status && filters.status !== "All") {
    query = query.eq("status", filters.status);
  }
  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }
  if (filters.minPrice) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters.maxPrice && filters.maxPrice < 10_000_000) {
    query = query.lte("price", filters.maxPrice);
  }

  switch (filters.sortBy) {
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price", { ascending: false });
      break;
    case "oldest":
      query = query.order("listed_at", { ascending: true });
      break;
    default:
      query = query.order("listed_at", { ascending: false });
  }

  const safePage = Math.max(1, page);
  const start = (safePage - 1) * perPage;
  query = query.range(start, start + perPage - 1);

  const { data, error, count } = await query;

  if (error || !data) return { items: [], totalPages: 0, total: 0 };

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return {
    items: data.map((row) => mapRow(row as PropertyRow)),
    totalPages,
    total,
  };
}

export async function getRelatedProperties(
  property: Property,
  limit = 3
): Promise<Property[]> {
  const { data: byCity } = await supabase
    .from("properties")
    .select("*")
    .neq("id", property.id)
    .eq("city", property.location.city)
    .limit(limit);

  if ((byCity?.length ?? 0) >= limit) {
    return (byCity ?? []).map((row) => mapRow(row as PropertyRow));
  }

  const existingIds = [property.id, ...(byCity ?? []).map((r) => r.id)];
  const { data: byType } = await supabase
    .from("properties")
    .select("*")
    .eq("type", property.type)
    .not("id", "in", `(${existingIds.join(",")})`)
    .limit(limit - (byCity?.length ?? 0));

  const combined = [...(byCity ?? []), ...(byType ?? [])];
  return combined.slice(0, limit).map((row) => mapRow(row as PropertyRow));
}

export async function getAllPropertyIds(): Promise<string[]> {
  const { data, error } = await supabase.from("properties").select("id");
  if (error || !data) return [];
  return data.map((r) => r.id);
}
