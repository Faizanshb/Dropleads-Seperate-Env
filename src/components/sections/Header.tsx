"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PromotionalBanner from "@/components/ui/promotional-banner";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const updateBannerHeight = () => {
      const banner = document.querySelector("[data-banner]");
      const height = banner ? banner.getBoundingClientRect().height : 0;
      setBannerHeight(height);
    };

    // Initial height calculation
    updateBannerHeight();

    // Update on scroll and resize
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateBannerHeight);

    // Use MutationObserver to detect when banner is added/removed
    const observer = new MutationObserver(updateBannerHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBannerHeight);
      observer.disconnect();
    };
  }, []);

  const navItems = [
    {
      name: "Product",
      href: "#product",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "API Documentation",
          href: "https://dropleads.readme.io/reference/email-finder",
          description: "Complete API reference",
        },
        {
          name: "Data Types",
          href: "#product",
          description: "Available data sources",
        },
      ],
    },
    { name: "Pricing", href: "#pricing", hasDropdown: false },
    {
      name: "Resources",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Documentation", href: "#", description: "Get started guides" },
        { name: "Blog", href: "/blog", description: "Latest insights" },
      ],
    },
    { name: "Support", href: "#support", hasDropdown: false },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      if (!prev) {
        setActiveMobileDropdown(null);
      }
      return !prev;
    });
  };

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

  const handleMobileNavClick = (
    itemHref: string,
    hasDropdown?: boolean,
    itemName?: string
  ) => {
    if (hasDropdown && itemName) {
      setActiveMobileDropdown(
        activeMobileDropdown === itemName ? null : itemName
      );
    } else {
      scrollToSection(itemHref);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <PromotionalBanner />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
            : "bg-white/60 backdrop-blur-sm border-b border-transparent"
        }`}
        style={{ top: `${bannerHeight}px` }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/"
              className="flex items-center space-x-3  cursor-pointer bg-transparent"
              aria-label="gofindy homepage"
            >
              <Image
                src="/logo.png"
                alt="gofindy logo"
                width={50}
                height={50}
                className="w-12 h-12 rounded-xl object-cover "
              />
            </Link>

            <nav
              className="hidden lg:flex items-center space-x-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() =>
                    item.hasDropdown && setActiveDropdown(null)
                  }
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-1 px-4 py-2 text-[#64748B] hover:text-[#1E293B] transition-all duration-300 rounded-xl hover:bg-white/50 group"
                    aria-haspopup={item.hasDropdown ? "true" : undefined}
                    aria-expanded={
                      item.hasDropdown
                        ? activeDropdown === item.name
                        : undefined
                    }
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                      <div className="p-2" role="menu">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={(e) =>
                              handleNavClick(e, dropdownItem.href)
                            }
                            className="flex flex-col p-3 rounded-xl hover:bg-[#4285F4]/5 transition-all duration-300 group"
                            role="menuitem"
                          >
                            <span className="font-medium text-[#1E293B] group-hover:text-[#4285F4] transition-colors duration-300">
                              {dropdownItem.name}
                            </span>
                            <span className="text-sm text-[#64748B] mt-1">
                              {dropdownItem.description}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              <Link href="https://app.dropleads.io/auth/signin">
                <Button
                  variant="ghost"
                  className="text-[#64748B] hover:text-[#1E293B] hover:bg-white/50 transition-all duration-300 font-medium cursor-pointer"
                  aria-label="Sign in to your account"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="https://app.dropleads.io/auth/signup">
                <Button
                  className={`bg-gradient-to-r from-[#4285F4] to-[#4285F4]/90 hover:from-[#4285F4]/90 hover:to-[#4285F4] text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isScrolled ? "shadow-[#4285F4]/20" : ""
                  }`}
                  aria-label="Start free trial"
                >
                  Try for Free
                </Button>
              </Link>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl hover:bg-white/50 transition-all duration-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1E293B]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1E293B]" />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-[calc(100vh-4rem)] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-lg">
            <div className="container mx-auto px-4 py-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <nav
                className="space-y-1"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <div key={item.name}>
                    <div
                      className="flex items-center justify-between p-4 text-[#64748B] hover:text-[#1E293B] hover:bg-white/50 rounded-xl transition-all duration-300 group cursor-pointer"
                      onClick={() =>
                        handleMobileNavClick(
                          item.href,
                          item.hasDropdown,
                          item.name
                        )
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleMobileNavClick(
                            item.href,
                            item.hasDropdown,
                            item.name
                          );
                      }}
                      aria-haspopup={item.hasDropdown ? "true" : undefined}
                      aria-expanded={
                        item.hasDropdown
                          ? activeMobileDropdown === item.name
                          : undefined
                      }
                    >
                      <span className="font-medium text-lg">{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            activeMobileDropdown === item.name
                              ? "rotate-180"
                              : ""
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {item.hasDropdown && (
                      <div
                        className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
                          activeMobileDropdown === item.name
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                        role="menu"
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(dropdownItem.href);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block p-3 text-[#64748B] hover:text-[#4285F4] hover:bg-[#4285F4]/5 rounded-lg transition-all duration-300"
                            role="menuitem"
                          >
                            <div className="font-medium">
                              {dropdownItem.name}
                            </div>
                            <div className="text-sm text-[#64748B] mt-1">
                              {dropdownItem.description}
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200/50 space-y-3">
                <Link href="https://app.dropleads.io/auth/signin">
                  <Button
                    variant="outline"
                    className="w-full border-[#4285F4]/30 text-[#4285F4] hover:bg-[#4285F4]/10 hover:border-[#4285F4] transition-all duration-300 font-medium py-3 text-base bg-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="https://app.dropleads.io/auth/signup">
                  <Button
                    className="w-full bg-gradient-to-r from-[#4285F4] to-[#4285F4]/90 hover:from-[#4285F4]/90 hover:to-[#4285F4] text-white font-semibold py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Start free trial"
                  >
                    Try for Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Add padding to body content to account for banner + header */}
      <div style={{ paddingTop: `${bannerHeight + 36}px` }} />
    </>
  );
}
