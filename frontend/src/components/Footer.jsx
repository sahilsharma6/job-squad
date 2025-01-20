import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Apple, Play } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Resources: ['About us', 'Our Team', 'Products', 'Contact'],
    Community: ['Feature', 'Pricing', 'Credit', 'FAQ'],
    'Quick links': ['iOS', 'Android', 'Microsoft', 'Desktop'],
    More: ['Privacy', 'Help', 'Terms', 'FAQ']
  };

  return (
    <footer className="w-full bg-white py-8 md:py-12 font-lato font-normal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 pb-8">
          {/* Logo and Description - Full width on mobile */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
              <span className="text-xl font-bold">JobSquad</span>
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-md">
              JobSquad is the heart of the design community and the best resource to discover and connect with designers worldwide.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Footer Links - 2 columns on mobile, 4 on desktop */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h3 className="font-semibold mb-4 text-gray-900">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary-600 text-sm block py-1 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Download Section - Stack on mobile */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              Copyright © 2022. JobSquad all right reserved
            </p>
            {/* <div className="flex flex-col xs:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                className="gap-2 h-11 px-6 hover:bg-gray-50"
              >
                <Apple className="w-5 h-5" />
                App Store
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 h-11 px-6 hover:bg-gray-50"
              >
                <Play className="w-5 h-5" />
                Google Play
              </Button>
            </div> */}
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 mt-6 text-sm text-gray-600">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;