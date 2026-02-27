"use client";

import React from "react";
import Image from "next/image";
import {
  FaTiktok,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function Footer() {
  const pathname = usePathname();

  const t = useTranslations("Footer");

  if (pathname === "/lock") return null;


  return (
    <footer className="bg-[#91E09E] text-black" id="footer">
      {/* Main Footer Section */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[8%] py-8 md:py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          {/* Brand and Apps Column */}
          <div className="flex flex-col gap-8 max-w-[300px] mx-auto md:mx-0 items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/logo_drrecetas.svg"
                alt="Doctor Recetas"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <div className="flex flex-col gap-3 mt-4 w-full">
              <p className="text-base text-left md:text-xl font-bold text-black/80 leading-relaxed">
                Simplificamos el acceso a tu tratamiento para que tu única
                preocupación sea sentirte mejor.
              </p>
            </div>
          </div>

          {/* Links Grid (desktop) */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-12 flex-1">
            {/* About Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-black text-black opacity-80">
                {t("About.title")}
              </h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("About.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/nosotros"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("About.about_us")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tienda"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("About.shop")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/diario"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("About.journal")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-black text-black opacity-80">
                {t("Support.title")}
              </h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/faq"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("Support.faq")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-envio"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("Support.shipping")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/perfil"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("Support.account")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reembolso"
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("Support.refund")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-black text-black tracking-normal opacity-80">
                {t("Contact.title")}
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex flex-col">
                  <a
                    href={`mailto:${t("Contact.email")}`}
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("Contact.email")}
                  </a>
                </li>
                <li className="flex flex-col">
                  <a
                    href={`tel:${t("Contact.phone")}`}
                    className="text-xl font-bold text-black/70 hover:text-black transition-colors"
                  >
                    {t("Contact.phone")}
                  </a>
                </li>
                <li className="flex flex-col">
                  <span className="text-xl font-bold text-black/70">
                    {t("Contact.address")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Accordions */}
          <div className="w-full md:hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="about">
                <AccordionTrigger className="flex items-center justify-between w-full py-3 border-b border-black/10 text-black text-lg font-black">
                  {t("About.title")}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <Link
                        href="/"
                        className="text-base font-bold text-black/70"
                      >
                        {t("About.home")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/nosotros"
                        className="text-base font-bold text-black/70"
                      >
                        {t("About.about_us")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tienda"
                        className="text-base font-bold text-black/70"
                      >
                        {t("About.shop")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/diario"
                        className="text-base font-bold text-black/70"
                      >
                        {t("About.journal")}
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support">
                <AccordionTrigger className="flex items-center justify-between w-full py-3 border-b border-black/10 text-black text-lg font-black">
                  {t("Support.title")}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <Link
                        href="/faq"
                        className="text-base font-bold text-black/70"
                      >
                        {t("Support.faq")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/politicas-envio"
                        className="text-base font-bold text-black/70"
                      >
                        {t("Support.shipping")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/perfil"
                        className="text-base font-bold text-black/70"
                      >
                        {t("Support.account")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/reembolso"
                        className="text-base font-bold text-black/70"
                      >
                        {t("Support.refund")}
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger className="flex items-center justify-between w-full py-3 border-b border-black/10 text-black text-lg font-black">
                  {t("Contact.title")}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <a
                        href={`mailto:${t("Contact.email")}`}
                        className="text-base font-bold text-black/70"
                      >
                        {t("Contact.email")}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${t("Contact.phone")}`}
                        className="text-base font-bold text-black/70"
                      >
                        {t("Contact.phone")}
                      </a>
                    </li>
                    <li>
                      <span className="text-base font-bold text-black/70">
                        {t("Contact.address")}
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Mobile social icons */}
            <div className="flex items-center justify-start gap-4 py-4">
              <a
                href="#"
                className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
              >
                <FaLinkedin className="w-4 h-4 text-black" />
              </a>
              <a
                href="#"
                className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
              >
                <FaTiktok className="w-4 h-4 text-black" />
              </a>
              <a
                href="#"
                className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
              >
                <FaInstagram className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[8%]">
        <div className="border-t border-white/10"></div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[8%] pb-4 md:pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright & Language */}
          <div className="flex flex-col sm:flex-row items-center gap-6 order-2 md:order-1">
            <p className="text-lg font-bold text-black/60">
              {t("Legal.rights")}
            </p>

          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-start gap-8 order-1 md:order-2">
            <Link
              href="/politicas-privacidad"
              className="text-lg text-black/70 transition-colors"
            >
              {t("Legal.privacy")}
            </Link>
            <Link
              href="/terminos-condiciones"
              className="text-lg text-black/70 transition-colors"
            >
              {t("Legal.terms")}
            </Link>
          </div>

          {/* Social Icons (desktop only) */}
          <div className="hidden md:flex items-center gap-5 order-3">
            <a
              href="#"
              className="p-2 border border-white/10 rounded-full text-black/60 hover:text-black hover:border-white/30 transition-all"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 border border-white/10 rounded-full text-black/60 hover:text-black hover:border-white/30 transition-all"
            >
              <FaTiktok className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 border border-white/10 rounded-full text-black/60 hover:text-black hover:border-white/30 transition-all"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
