import { SectionHeading } from "../SectionHeading";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const defaults = {
  email: "hakizimanaleogad@gmail.com",
  phone: "+250 793 953 775",
  location: "Kigali, Rwanda",
  linkedin: "https://www.linkedin.com/in/leogadhakizimana/",
  github: "https://github.com/leo-gad123",
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
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Contact" title="Let's" accent="Connect" />
        <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-60 pointer-events-none" />
          <div className="relative">
            <h3 className="font-serif text-4xl md:text-5xl mb-4">
              Have a project in <span className="italic text-primary">mind?</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Open to collaborations in embedded systems, IoT, and intelligent automation.
            </p>

            <div className="grid gap-6 md:grid-cols-3 text-left mb-10">
              {contacts.map((c) => (
                <div key={c.label} className="glass rounded-xl p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a href={c.href} className="text-foreground hover:text-primary transition-colors break-words">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-foreground">{c.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary/30 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:border-primary/60 transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <footer className="text-center mt-12 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hakizimana Leogad · Built with passion in Kigali
        </footer>
      </div>
    </section>
  );
}
