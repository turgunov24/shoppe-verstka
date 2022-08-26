import React, { useRef } from "react";

//additional
import { navLinks } from "../../data/navbar-data/navLinks";

function Footer() {
  const FooterInput = useRef(null);
  const FooterInputButton = useRef(null);

  return (
    <footer className="flex flex-col w-full py-5 gap-8 mt-auto">
      <div className="flex flex-col items-start gap-10 w-full md:border-t border-[#D8D8D8] md:flex-row-reverse justify-between md:pt-6 md:items-end md:gap-0">
        <div className="flex flex-col w-full gap-1 sm:w-8/12 md:w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="Give an email, get the newsletter."
              className="border-b border-black outline-none w-full py-1 placeholder:text-[13px] md:py-0"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-1">
              {navLinks.icons[6].arrowIcon}
            </button>
          </div>
          <div className="flex items-center justify-start gap-1 md:hidden">
            <input type="checkbox" id="footer-chekbox" />
            <label htmlFor="footer-checkbox" className="text-sm font-bold">
              i agree to the website’s terms and conditions
            </label>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2 md:flex-row md:w-max md:gap-5">
          <p className="md:text-[11px]">CONTACT</p>
          <p className="md:text-[11px]">TERMS OF SERVICES</p>
          <p className="md:text-[11px]">SHIPPING AND RETURNS</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-5 w-full md:flex-row-reverse justify-between md:items-end md:gap-0">
        <div className="flex items-center gap-2">
          <h6 className="font-bold text-sm md:hidden">Follow us</h6>
          <div className="h-1 w-16 bg-[black] rounded-lg md:hidden"></div>
          <p className="hidden md:inline">{navLinks.socialMediaIcons[0].name}</p>
          <p>{navLinks.socialMediaIcons[1].name}</p>
          <p>{navLinks.socialMediaIcons[2].name}</p>
          <p>{navLinks.socialMediaIcons[3].name}</p>
        </div>
        <p className="text-[12px]">
          © 2020 Shelly. Terms of use and privacy policy.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
