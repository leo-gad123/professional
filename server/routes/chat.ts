import { Router } from "express";
import { Project } from "../models/Project.js";
import { SiteSettings } from "../models/SiteSettings.js";

const router = Router();

const name = "Hakizimana Leogad";
const title = "Embedded Systems & IoT Engineer";
const location = "Kigali, Rwanda";
const email = "hakizimanaleogad@gmail.com";

const faq: { pattern: RegExp; reply: string }[] = [
  { pattern: /hello|hi|hey|greetings/i, reply: `Hello! I'm the AI assistant for ${name}. How can I help you today?` },
  { pattern: /who are you|what are you/, reply: `I'm the AI assistant for ${name}, an ${title} from ${location}. I can answer questions about skills, projects, experience, and contact info.` },
  { pattern: /skills|technologies|tech stack|what.*know/i, reply: `${name} specializes in Embedded Systems, IoT, Arduino, ESP32, Raspberry Pi, Python, C++, JavaScript, and automation technologies.` },
  { pattern: /experience|background|biography|about/i, reply: `${name} is an ${title} based in ${location}, crafting intelligent hardware solutions, IoT ecosystems, and automation technologies that bridge the physical and digital worlds.` },
  { pattern: /contact|email|reach|hire/i, reply: `You can reach ${name} at ${email} or through the contact form on this site. Located in ${location}.` },
  { pattern: /location|based|where/i, reply: `${name} is based in ${location}.` },
  { pattern: /resume|cv/, reply: `You can download ${name}'s CV from the home page using the "Download CV" button.` },
  { pattern: /project|portfolio|work/i, reply: `Let me fetch the latest projects for you...` },
  { pattern: /github|repo|source/i, reply: `You can find ${name}'s code at https://github.com/leo-gad123` },
  { pattern: /linkedin/i, reply: `Connect with ${name} on LinkedIn: https://www.linkedin.com/in/leogadhakizimana/` },
  { pattern: /thanks|thank you|appreciate/i, reply: `You're welcome! Feel free to ask anything else.` },
  { pattern: /bye|goodbye|see you/i, reply: `Goodbye! Feel free to come back anytime.` },
];

router.post("/", async (req, res) => {
  try {
    const { message } = req.body as { message?: string };
    if (!message || typeof message !== "string" || !message.trim()) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const msg = message.trim();

    if (/\bproject|portfolio|work\b/i.test(msg)) {
      const projects = await Project.find({ is_published: true }).sort({ sort_order: 1 }).lean();
      if (projects.length === 0) {
        res.json({ reply: "No projects have been published yet. Check back soon!" });
        return;
      }
      const list = projects
        .slice(0, 5)
        .map((p, i) => `${i + 1}. **${p.title}**${p.description ? ` — ${p.description.slice(0, 100)}` : ""}`)
        .join("\n");
      res.json({ reply: `Here are ${name}'s projects:\n\n${list}` });
      return;
    }

    for (const faqItem of faq) {
      if (faqItem.pattern.test(msg)) {
        const projects = await Project.find({ is_published: true }).sort({ sort_order: 1 }).lean();
        const settings = await SiteSettings.findOne().lean();
        let reply = faqItem.reply;

        if (/\bproject|portfolio|work\b/i.test(msg) && projects.length > 0) {
          const list = projects
            .slice(0, 5)
            .map((p, i) => `${i + 1}. **${p.title}**${p.description ? ` — ${p.description.slice(0, 100)}` : ""}`)
            .join("\n");
          reply = `Here are ${name}'s projects:\n\n${list}`;
        }

        if (settings) {
          reply = reply
            .replace(/\{email\}/g, settings.contact_email || email)
            .replace(/\{phone\}/g, settings.contact_phone || "")
            .replace(/\{location\}/g, settings.location || location);
        }

        res.json({ reply });
        return;
      }
    }

    res.json({
      reply: `I'm not sure how to answer that. You can ask me about ${name}'s skills, projects, experience, contact info, or anything else about the portfolio!`,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
