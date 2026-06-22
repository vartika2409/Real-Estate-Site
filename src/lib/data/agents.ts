import type { Agent } from "@/types";

export const AGENTS: Agent[] = [
  {
    id: "agent-001",
    name: "Sarah Mitchell",
    title: "Senior Property Advisor",
    phone: "+1 (512) 555-0101",
    email: "sarah@luxestate.com",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "With over 12 years in luxury real estate, Sarah specializes in high-end residential properties across Texas and the Southwest. Her market insight and client-first approach have made her one of our top performers.",
    yearsExperience: 12,
    propertiesSold: 247,
    rating: 4.9,
  },
  {
    id: "agent-002",
    name: "Marcus Chen",
    title: "Commercial Real Estate Specialist",
    phone: "+1 (303) 555-0202",
    email: "marcus@luxestate.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Marcus brings a deep understanding of commercial markets across the Mountain West. He has facilitated over $200M in commercial transactions and is known for his strategic negotiation skills.",
    yearsExperience: 9,
    propertiesSold: 182,
    rating: 4.8,
  },
  {
    id: "agent-003",
    name: "Elena Rodriguez",
    title: "Luxury Homes Consultant",
    phone: "+1 (305) 555-0303",
    email: "elena@luxestate.com",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Elena is the go-to expert for waterfront and resort-style properties in Florida. Her bilingual proficiency and international network attract buyers from around the globe.",
    yearsExperience: 8,
    propertiesSold: 165,
    rating: 4.9,
  },
  {
    id: "agent-004",
    name: "David Park",
    title: "Investment Property Analyst",
    phone: "+1 (503) 555-0404",
    email: "david@luxestate.com",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "David combines a background in finance with real estate expertise to help investors identify high-yield opportunities. He has built a reputation for finding undervalued assets in emerging markets.",
    yearsExperience: 7,
    propertiesSold: 134,
    rating: 4.7,
  },
];

export function getAgentById(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}
