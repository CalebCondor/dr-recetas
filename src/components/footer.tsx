"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaTiktok, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations("Footer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  if (pathname === "/lock") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter signup:", formData);
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <footer className="bg-linear-to-t from-[#167D7F] to-[#B0E5CC] text-white" id="footer">
      {/* Top Section with Logo and Social Icons */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[5%] pt-12 pb-8 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img src="/logo_footer.png" alt="" />
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <FaTiktok className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20"></div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[5%] py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-12">
        {/* About Section */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-6">{t("About.title")}</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:opacity-80 transition-opacity">
                {t("About.home")}
              </Link>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("About.shop")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("About.about_us")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("About.journal")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("About.science")}
              </a>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-6">{t("Support.title")}</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("Support.faq")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("Support.shipping")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("Support.refund")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("Support.account")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                {t("Support.contact")}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-6">{t("Contact.title")}</h3>
          <ul className="space-y-3">
            <li className="flex flex-col gap-1">

              <a href={`tel:${t("Contact.phone")}`} className="hover:opacity-80 transition-opacity ">
                {t("Contact.phone")}
              </a>
            </li>
            <li className="flex flex-col gap-1">

              <a href={`mailto:${t("Contact.email")}`} className="hover:opacity-80 transition-opacity ">
                {t("Contact.email")}
              </a>
            </li>
            <li className="flex flex-col gap-1">

              <span className="hover:opacity-80 transition-opacity">
                {t("Contact.address")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 w-full mx-auto px-6 md:px-12 lg:px-[5%] py-8">
        <div className="flex justify-between items-center mb-6 text-sm">
          <Link
            href="/politicas-privacidad"
            prefetch={true}
            className="hover:opacity-80 transition-opacity"
          >
            {t("Legal.privacy")}
          </Link>
          <Link
            href="/terminos-condiciones"
            prefetch={true}
            className="hover:opacity-80 transition-opacity"
          >
            {t("Legal.terms")}
          </Link>
        </div>
        <p className="text-white/80 text-center text-sm">{t("Legal.rights")}</p>
      </div>
    </footer>
  );
}
