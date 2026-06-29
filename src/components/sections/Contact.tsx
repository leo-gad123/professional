import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const defaults = {
  email: "hakizimanaleogad@gmail.com",
  phone: "+250 793 953 775",
  location: "Kigali, Rwanda",
  linkedin: "https://www.linkedin.com/in/leogadhakizimana/",
  github: "https://github.com/leo-gad123",
};

const contactIconMap: Record<string, typeof Mail> = {
  Email: Mail,
  Phone: Phone,
  Address: MapPin,
};

export function Contact() {
  const { data } = useSiteSettings();
  const email = data?.contact_email || defaults.email;
  const phone = data?.contact_phone || defaults.phone;
  const location = data?.location || defaults.location;

  const contacts = [
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Phone", value: phone, href: `tel:${phone.replace(/\s+/g, "")}` },
    { label: "Address", value: location },
  ];

  const socials = [
    { label: "LinkedIn", href: data?.linkedin_url || defaults.linkedin },
    { label: "GitHub", href: data?.github_url || defaults.github },
    data?.twitter_url ? { label: "Twitter", href: data.twitter_url } : null,
    data?.website_url ? { label: "Website", href: data.website_url } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Contact" title="Let's" accent="Connect" />
        <Reveal delay={0.1}>
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-16 card-shadow text-center relative overflow-hidden border border-border">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-primary/5 pointer-events-none" />
            <div className="relative">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium mb-3 text-foreground">
                Have a project in <span className="text-gradient">mind?</span>
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                Open to collaborations in embedded systems, IoT, and intelligent automation.
              </p>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-3 text-left mb-10">
                {contacts.map((c) => {
                  const Icon = contactIconMap[c.label] || Mail;
                  return (
                    <div
                      key={c.label}
                      className="bg-secondary/60 rounded-xl p-4 sm:p-5 card-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                            {c.label}
                          </p>
                          {c.href ? (
                            <a
                              href={c.href}
                              className="text-sm text-foreground hover:text-primary transition-colors break-all"
                            >
                              {c.value}
                            </a>
                          ) : (
                            <p className="text-sm text-foreground break-all">{c.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full btn-ghost px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]"
                  >
                    {s.label}
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <footer className="text-center mt-12 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hakizimana Leogad · Built with passion in Kigali
        </footer>
      </div>
    </section>
  );
}
