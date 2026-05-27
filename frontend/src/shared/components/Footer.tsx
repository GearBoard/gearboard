"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <div className="bg-linear-to-t from-[#DFDBFE] to-bg-white/50 relative flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-0 pt-8 md:pt-0">
      <div className="pt-8 pb-4 md:py-11 flex flex-row md:flex-col gap-8 md:gap-19 justify-between w-full max-w-[340px] md:max-w-none md:w-auto px-4 md:px-0">
        <div className="flex flex-col gap-3 md:gap-5 w-auto md:w-85 text-xs md:text-base text-dark-red font-satoshi order-2 md:order-1">
          <span className="text-sm md:text-h3 text-primary-red font-bold">Contact</span>
          <Link
            href="#"
            className="flex items-center gap-2 md:gap-3 hover:text-primary-red transition-colors"
          >
            <Phone className="w-[20px] h-[20px] md:w-[35px] md:h-[35px] text-primary-red shrink-0" />
            <span>xxx-xxx-xxx</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 md:gap-3 hover:text-primary-red transition-colors"
          >
            <Mail className="w-[20px] h-[20px] md:w-[35px] md:h-[35px] text-primary-red shrink-0" />
            <span>gearboard@gmail.com</span>
          </Link>
        </div>
        <div className="flex flex-col gap-3 md:gap-5 w-auto md:w-85 text-xs md:text-base text-dark-red font-satoshi order-1 md:order-2">
          <span className="text-sm md:text-h3 text-primary-red font-bold">Social</span>
          <Link
            href="#"
            className="flex items-center gap-2 md:gap-3 hover:text-primary-red transition-colors"
          >
            <Instagram className="w-[20px] h-[20px] md:w-[35px] md:h-[35px] text-primary-red shrink-0" />
            <span>gear.board</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 md:gap-3 hover:text-primary-red transition-colors"
          >
            <Facebook className="w-[20px] h-[20px] md:w-[35px] md:h-[35px] text-primary-red shrink-0" />
            <span>Gear Board</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 md:gap-3 hover:text-primary-red transition-colors"
          >
            <Linkedin className="w-[20px] h-[20px] md:w-[35px] md:h-[35px] text-primary-red shrink-0" />
            <span>Gear.Board</span>
          </Link>
        </div>
      </div>
      <Image
        src="/sneak_fat_gear.svg"
        width={806}
        height={1200}
        className="w-[256px] h-auto md:w-[806px] md:h-auto shrink-0"
        alt="sneak-fat-gear"
        priority
      ></Image>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-satoshi text-white/80 hover:text-white transition-colors cursor-pointer"
      >
        <span>back to top</span>
        <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

export default Footer;
