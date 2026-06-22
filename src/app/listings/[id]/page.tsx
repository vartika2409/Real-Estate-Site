import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ImageGallery } from "@/components/property/ImageGallery";
import { PropertyDetails } from "@/components/property/PropertyDetails";
import { AgentCard } from "@/components/property/AgentCard";
import { PropertyCard } from "@/components/listings/PropertyCard";
import { getPropertyById, getRelatedProperties, getAllPropertyIds } from "@/lib/data/properties";
import { getAgentById } from "@/lib/data/agents";

export async function generateStaticParams() {
  const ids = await getAllPropertyIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  const agent = getAgentById(property.agentId);
  const related = await getRelatedProperties(property, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-100 py-4 px-4">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Listings
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <ImageGallery images={property.images} title={property.title} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <PropertyDetails property={property} />
          </div>
          {agent && (
            <div className="w-full lg:w-80 shrink-0">
              <AgentCard agent={agent} propertyId={property.id} />
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Properties</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
