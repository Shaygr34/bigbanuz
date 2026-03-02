import type { Metadata } from "next";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";
import { INSTAGRAM_URL, EMAIL_ADDRESS } from "@/lib/utils/constants";
import ContactForm from "@/components/ui/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact | Smile Amigo",
  description:
    "Get in touch with Amit Banuz. Available for event photography, surf photography, and brand collaborations. WhatsApp, email, or Instagram DM.",
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Warm Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-accent-soft via-white to-white-pure">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sun-gradient text-white shadow-sun-glow mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-h1 font-heading font-bold text-black mb-4">
              Let&apos;s Create Something Together
            </h1>
            <p className="text-body text-gray-mid max-w-text mx-auto mb-3">
              Whether it&apos;s capturing your event, shooting surf in a new
              location, or collaborating on a brand project — I&apos;d love to
              hear from you.
            </p>
            <p className="text-small text-gray-mid">
              Currently based in Israel, available worldwide
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* WhatsApp Card */}
              <a
                href={buildWhatsAppUrlSimple()}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-50 rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-normal text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-normal">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h2 className="text-h3 font-heading font-bold text-black mb-2">
                  WhatsApp
                </h2>
                <p className="text-small text-gray-mid">
                  Fastest way to reach me. Tap to start a conversation.
                </p>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="group bg-amber-50 rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-normal text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-normal">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-h3 font-heading font-bold text-black mb-2">
                  Email
                </h2>
                <p className="text-small text-gray-mid">
                  {EMAIL_ADDRESS}
                </p>
              </a>

              {/* Instagram Card */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-pink-50 rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-normal text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-4 group-hover:scale-110 transition-transform duration-normal">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-h3 font-heading font-bold text-black mb-2">
                  Instagram
                </h2>
                <p className="text-small text-gray-mid">
                  DM me on Instagram @bigbanuz
                </p>
              </a>
            </div>
          </ScrollReveal>

          {/* Form Section */}
          <div className="max-w-text mx-auto">
            <ScrollReveal>
              <div className="bg-gradient-to-b from-accent-soft/40 to-transparent rounded-2xl p-8 sm:p-12">
                <div className="w-20 h-1 bg-sun-gradient rounded-full mx-auto mb-8" />
                <h2 className="text-h2 font-heading font-bold text-black text-center mb-8">
                  Drop Me a Line
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
