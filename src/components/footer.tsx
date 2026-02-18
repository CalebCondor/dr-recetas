"use client";

import React from "react";
import Image from "next/image";
import { FaTiktok, FaInstagram, FaLinkedin, FaApple, FaAndroid } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as "en" | "es";
  const t = useTranslations("Footer");

  if (pathname === "/lock") return null;

  const handleLanguageChange = (lang: "es" | "en") => {
    router.replace(pathname, { locale: lang });
  };

  return (
    <footer className="bg-linear-to-t from-[#167D7F] to-[#B0E5CC] text-white" id="footer">
      {/* Main Footer Section */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[8%] py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          {/* Brand and Apps Column */}
          <div className="flex flex-col gap-8 max-w-[300px]">
            <Link href="/" className="inline-block">
              <Image
                src="/logo_drreceteasblanco.svg"
                alt="Doctor Recetas"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <div className="flex flex-col gap-3 mt-4">
              <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-all w-fit group">
                <FaApple className="w-5 h-5" />
                <span className="text-xs font-bold tracking-tight uppercase">iOS</span>
              </button>
              <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-all w-fit group">
                <FaAndroid className="w-5 h-5" />
                <span className="text-xs font-bold tracking-tight uppercase">Android</span>
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 flex-1">
            {/* About Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest opacity-80">
                {t("About.title")}
              </h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("About.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("About.about_us")}
                  </Link>
                </li>
                <li>
                  <Link href="/tienda" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("About.shop")}
                  </Link>
                </li>
                <li>
                  <Link href="/diario" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("About.journal")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest opacity-80">
                {t("Support.title")}
              </h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/faq" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("Support.faq")}
                  </Link>
                </li>
                <li>
                  <Link href="/politicas-envio" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("Support.shipping")}
                  </Link>
                </li>
                <li>
                  <Link href="/perfil" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("Support.account")}
                  </Link>
                </li>
                <li>
                  <Link href="/reembolso" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("Support.refund")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest opacity-80">
                {t("Contact.title")}
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex flex-col">
                  <span className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-wider">Email</span>
                  <a href={`mailto:${t("Contact.email")}`} className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("Contact.email")}
                  </a>
                </li>
                <li className="flex flex-col">
                  <span className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-wider">Phone</span>
                  <a href={`tel:${t("Contact.phone")}`} className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {t("Contact.phone")}
                  </a>
                </li>
                <li className="flex flex-col">
                  <span className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-wider">Location</span>
                  <span className="text-sm font-bold text-white/70">
                    {t("Contact.address")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[8%]">
        <div className="border-t border-white/10"></div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[8%] py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright & Language */}
          <div className="flex flex-col sm:flex-row items-center gap-6 order-2 md:order-1">
            <p className="text-xs font-bold text-white/60">
              {t("Legal.rights")}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-xs font-black text-white/80 hover:text-white transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  {locale === "es" ? "Español (PR)" : "English (US)"}
                  <ChevronDown className="w-3 h-3 text-white/40" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl p-1 shadow-xl bg-[#167D7F] border-white/10 text-white">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("es")}
                  className="text-xs font-bold px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
                >
                  Español (PR)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("en")}
                  className="text-xs font-bold px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
                >
                  English (US)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-8 order-1 md:order-2">
            <Link href="/politicas-privacidad" className="text-xs font-black text-white hover:text-white/80 transition-colors">
              {t("Legal.privacy")}
            </Link>
            <Link href="/terminos-condiciones" className="text-xs font-black text-white hover:text-white/80 transition-colors">
              {t("Legal.terms")}
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 order-3">
            <a href="#" className="p-2 border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/30 transition-all">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/30 transition-all">
              <FaTiktok className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/30 transition-all">
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Branding Disclaimer */}
        <p className="mt-8 text-center md:text-left text-[10px] font-bold text-white/40 max-w-[600px] leading-relaxed">
          Doctor Recetas and the DR logo are registered trademarks. All medical services are provided by certified professionals in Puerto Rico.
        </p>
      </div>

      {/* Final Branding Bar */}
      <div className="bg-[#0D4B4D] py-4">
        <div className="w-full mx-auto px-6 md:px-12 lg:px-[8%] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_drreceteasblanco.svg"
              alt="Logo"
              width={24}
              height={24}
              className="w-6 h-auto"
            />
            <span className="text-white text-sm font-black tracking-tighter uppercase">Doctor Recetas</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <span className="text-white/40">curated by</span>
            <span className="text-white brightness-125">DR. RECETAS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
