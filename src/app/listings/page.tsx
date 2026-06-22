import { SearchBar } from "@/components/listings/SearchBar";
import { FilterSidebar } from "@/components/listings/FilterSidebar";
import { PropertyCard } from "@/components/listings/PropertyCard";
import { Pagination } from "@/components/listings/Pagination";
import { getPaginatedProperties } from "@/lib/data/properties";
import { parseFilterQuery } from "@/lib/utils";

export const metadata = {
  title: "Property Listings",
  description: "Browse and filter thousands of premium properties across the US.",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = parseFilterQuery(params);
  const page = Number(params.page ?? 1);

  const { items, totalPages, total } = await getPaginatedProperties(filters, page, 6);

  const searchParamsForPagination: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (k !== "page" && typeof v === "string") searchParamsForPagination[k] = v;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-primary py-14 px-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-white mb-2">Property Listings</h1>
          <p className="text-slate-300 mb-6">
            {total} {total === 1 ? "property" : "properties"} found
          </p>
          <SearchBar initialQuery={typeof params.query === "string" ? params.query : ""} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar initialFilters={filters} />

          <div className="flex-1">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-2xl font-semibold text-slate-700">No properties found</p>
                <p className="mt-2 text-slate-400">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/listings"
                  searchParams={searchParamsForPagination}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
