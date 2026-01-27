"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaTiktok, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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
    <footer className="bg-linear-to-t from-[#167D7F] to-[#B0E5CC] text-white">
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
      <div className="w-full mx-auto px-6 md:px-12 lg:px-[5%] py-12 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-12">
        {/* About Section */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-6">About</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Nosu Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Journal
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Science
              </a>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-6">Support</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Refund and Returns Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                My account
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="col-span-2 md:col-span-1 border-t border-white/10 pt-12 md:border-none md:pt-0">
          <h3 className="text-xl font-bold mb-6">
            Subscribe to our newsletter and claim your 15% discount today
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-3 rounded-full bg-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-3 rounded-full bg-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full bg-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button
              type="submit"
              className="w-full bg-white text-[#4ECDC4] font-semibold py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Claim discount
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 w-full mx-auto px-6 md:px-12 lg:px-[5%] py-8">
        <div className="flex justify-between items-center mb-6 text-sm">
          <a
            href="/politicas-privacidad"
            className="hover:opacity-80 transition-opacity"
          >
            Privacy Policy
          </a>
          <a
            href="/terminos-condiciones"
            className="hover:opacity-80 transition-opacity"
          >
            Terms & Conditions
          </a>
        </div>
        <p className="text-white/80 text-center text-sm">
          © 2025 DR. Recetas All rights reserved.
        </p>
      </div>
    </footer>
  );
}
