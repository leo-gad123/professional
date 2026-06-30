import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Mail, Phone, MapPin, ExternalLink, Send, Github, Linkedin, Twitter } from "lucide-react";

const defaults = {
  email: "hakizimanaleogad@gmail.com",
  phone: "+250 793 953 775",
  location: "Kigali, Rwanda",
  linkedin: "https://www.linkedin.com/in/leogadhakizimana/",
  github: "https://github.com/leo-gad123",
};

const socialIcons: Record<string, typeof Github> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter: Twitter,
};

export function Contact() {
  const { data } = useSiteSettings();
  const email = data?.contact_email || defaults.email;
  const phone = data?.contact_phone || defaults.phone;
  const location = data?.location || defaults.location;

  const contacts = [
    { label: "Email", value: email, href: `mailto:${email}`, icon: Mail },
    { label: "Phone", value: phone, href: `tel:${phone.replace(/\s+/g, "")}`, icon: Phone },
    { label: "Address", value: location, icon: MapPin },
  ];

  const socials = [
    { label: "LinkedIn", href: data?.linkedin_url || defaults.linkedin },
    { label: "GitHub", href: data?.github_url || defaults.github },
    data?.twitter_url ? { label: "Twitter", href: data.twitter_url } : null,
    data?.website_url ? { label: "Website", href: data.website_url } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 h-80 w-80 rounded-full bg-emerald-500/3 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Contact" title="Let's" accent="Connect" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-gradient-to-br from-[#0a0a12] to-[#111118] p-6 sm:p-10 md:p-16 text-center shadow-xl shadow-emerald-500/5"
        >
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-400/3 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/[0.02] to-transparent pointer-events-none" />

          <div className="relative">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium mb-3 text-foreground">
              Have a project in{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                mind?
              </span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Open to collaborations in embedded systems, IoT, and intelligent automation.
            </p>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-3 text-left mb-10">
              {contacts.map((c) => (
                <motion.div
                  key={c.label}
                  whileHover={{ y: -2 }}
                  className="group rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-4 sm:p-5 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <c.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-medium">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="text-sm text-foreground hover:text-emerald-400 transition-colors break-all"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground break-all">{c.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.label] || ExternalLink;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    className="group inline-flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 font-mono text-xs text-muted-foreground"
        >
          <div className="inline-flex items-center gap-2">
            <span className="text-emerald-400">&copy;</span>
            {new Date().getFullYear()} Hakizimana Leogad
            <span className="text-emerald-400/50">·</span>
            Built with passion in Kigali
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
