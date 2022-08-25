import { IoIosSearch, IoIosLogOut } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { BsCart2 } from "react-icons/bs";
import { CgArrowLongRight } from "react-icons/cg";
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
    },
    {
      name: "Shop",
    },
    {
      name: "About",
    },
    {
      name: "Blog",
    },
    {
      name: "Help",
    },
    {
      name: "Contact",
    },
    {
      name: "Search",
    },
  ],
  desktopNav: [
    {
      name: "Shop",
    },
    {
      name: "Blog",
    },
    {
      name: "Our Story",
    },
  ],
  icons: [
    {
      shopIcon: <BsCart2 />,
    },
    {
      userIcon: <AiOutlineUser />,
    },
    {
      searchIcon: <IoIosSearch />,
    },
    {
      menuIcon: <HiOutlineMenuAlt3 />,
    },
    {
      closeIcon: <GrClose />,
    },
    {
      logOuticon: <IoIosLogOut />,
    },
    {
      arrowIcon: <CgArrowLongRight />,
    },
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
