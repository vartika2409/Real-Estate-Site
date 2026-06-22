import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with LuxEstate — we're here to help you find your dream property.",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const propertyId = typeof params.propertyId === "string" ? params.propertyId : undefined;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-primary py-20 px-4 text-center">
        <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Contact Us</h1>
        <p className="mt-4 text-slate-300 max-w-xl mx-auto">
          Have a question or ready to start your property journey? Our team is here to help.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Send Us a Message</h2>
            <ContactForm propertyId={propertyId} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Find Us</h2>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: "200 Main Street, Suite 400\nAustin, TX 78701" },
                { icon: Phone, label: "Phone", value: "+1 (512) 555-0100" },
                { icon: Mail, label: "Email", value: "hello@luxestate.com" },
                { icon: Clock, label: "Office Hours", value: "Monday – Friday: 9am – 6pm\nSaturday: 10am – 4pm" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/10 shrink-0">
                    <Icon className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-0.5">{label}</p>
                    <p className="text-sm text-slate-500 whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-slate-200 h-64 flex items-center justify-center text-slate-400 text-sm">
              [Map placeholder — embed Google Maps iframe here]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
