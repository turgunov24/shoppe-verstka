import { IoIosSearch, IoIosLogOut } from "react-icons/io";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { BsCart2, BsEye } from "react-icons/bs";
import { CgArrowLongRight } from "react-icons/cg";
import { GiSettingsKnobs } from "react-icons/gi"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import {
  RiLinkedinFill,
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterFill,
} from "react-icons/ri";

export const navLinks = {
  mobileNav: [
    {
      name: "Home",
      to: "/home-page",
    },
    {
      name: "Shop",
      to: "/shop-page",
    },
    {
      name: "About",
      to: "/about-page",
    },
    {
      name: "Blog",
      to: "/blog-page",
    },
    {
      name: "Help",
      to: "/help-page",
    },
    {
      name: "Contact",
      to: "/contact-page",
    },
    {
      name: "Search",
      to: "/search-page",
    },
  ],
  desktopNav: [
    {
      name: "Shop",
      to: "/shop-page",
    },
    {
      name: "Blog",
      to: "/blog-page",
    },
    {
      name: "Our Story",
      to: "/story-page",
    },
  ],
  icons: [
    {
      name:"shopIcon",
      icon:<BsCart2 />
    },
    {
      name:"userIcon",
      icon:<AiOutlineUser />
    },
    {
      name:"searchIcon",
      icon:<IoIosSearch />
    },
    {
      name:"menuIcon",
      icon: <HiOutlineMenuAlt3 />,
    },
    {
      name:"filterIcon",
      icon: <GiSettingsKnobs />,
    },
    {
      name:"closeIcon",
      icon: <GrClose />,
    },
    {
      name:"logOutIcon",
      icon: <IoIosLogOut />,
    },
    {
      name:"arrowIcon",
      icon: <CgArrowLongRight />,
    },
    {
      name:"heartIcon",
      icon: <AiOutlineHeart />,
    },
    {
      name:"eyeIcon",
      icon: <BsEye />,
    },
    {
      name:"arrowDropdown",
      icon:<MdOutlineArrowBackIosNew />
    }
  ],
  socialMediaIcons: [
    {
      name: <RiLinkedinFill />,
    },
    {
      name: <RiFacebookFill />,
    },
    {
      name: <RiInstagramLine />,
    },
    {
      name: <RiTwitterFill />,
    },
  ],
};
