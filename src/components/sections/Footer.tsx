"use client";
import {
  Search,
  Mail,
  CalendarDays,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  Youtube,
  BotIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation

export default function Footer() {
  const router = useRouter();

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      window.location.href = href;
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };
  const navigationLinks = [
    { name: "Home", href: "#hero" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "/blog" }, // Assuming you have a blog
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/dropleads",
      icon: (
        <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
      ),
    },
    {
      name: "Twitter/X",
      href: "https://x.com/dropleads",
      icon: (
        <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@Clicksuggest",
      icon: (
        <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/dropleads",
      icon: (
        <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
      ),
    },
  ];

  return (
    <footer
      className="bg-[#01519F] text-white pt-16 pb-12 px-4"
      role="contentinfo"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 mb-12">
          {/* Column 1: Logo, Description, Social */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-md">
                <Search className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold">Dropleads</span>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed max-w-sm">
              Empowering businesses with accurate, real-time B2B data enrichment
              for superior outreach and intelligence.
            </p>
            <div>
              <h3 className="font-semibold text-lg mb-3">🌐 Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="font-semibold text-xl mb-5">Navigation</h3>
            <ul className="space-y-3 ">
              {navigationLinks.map((link) => (
                <li key={link.name} className="break-inside-avoid">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="font-semibold text-xl mb-5">📬 Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="mailto:sales@dropleads.io"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                  sales@dropleads.io
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group"
                >
                  <BotIcon className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                  Reach us out via chatbot
                </a>
              </li>
              <li>
                <Button
                  className="inline-flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group font-medium bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg cursor-pointer"
                  onClick={() => {
                    router.push("https://calendly.com/dropleads-support/30min");
                  }}
                >
                  <CalendarDays className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                  Book a Call{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-gray-300 mb-2">
            © {new Date().getFullYear()} dropleads. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Built with privacy, accuracy, and compliance at the core.
          </p>
        </div>
      </div>
    </footer>
  );
}
