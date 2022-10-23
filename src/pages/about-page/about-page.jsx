//kooks
import React from "react";
//assets
import AboutPageImageOne from "../../assets/images/about-page-image-1.png";
import AboutPageImageTwo from "../../assets/images/about-page-image-2.png";

//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//additional
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { motion } from "framer-motion";
function AboutPage() {
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 w-full min-h-screen items-center"
    >
      <Navbar />
      <h4 className="w-full text-lg mt-28 text-start font-bold md:text-2xl md:text-center md:w-1/3">
        About
      </h4>
      <h6 className="hidden md:block w-full text-center">
        Who we are and why we do what we do!
      </h6>
      <h6 className="text-sm md:w-3/5">
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
        sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget
        pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et,
        placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac
        sodales lectus placerat quis.{" "}
      </h6>
      <div className="flex flex-col gap-3 w-full md:w-3/5">
        <h6 className="w-full text-start text-lg font-semibold md:text-xl">
          Top trends
        </h6>
        <img src={AboutPageImageOne} className="object-contain" />
      </div>
      <h6 className="text-sm md:w-3/5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
        maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
        consequat sed eu felis.
      </h6>
      <div className="flex flex-col gap-2 text-sm w-full md:w-3/5">
        <div className="flex items-center justify-start gap-2 pl-2 w-full">
          <div className="w-1 h-1 rounded-full bg-[#000] p-1"></div>
          <h6>consectetur adipiscing elit. Aliquam placerat</h6>
        </div>
        <div className="flex items-center justify-start gap-2 pl-2 w-full">
          <div className="w-1 h-1 rounded-full bg-[#000] p-1"></div>
          <h6>Lorem ipsum dolor sit amet consectetur</h6>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-3/5">
        <h6 className="w-full text-start text-lg font-semibold md:text-xl">
          Produced with care
        </h6>
        <img src={AboutPageImageTwo} className="object-contain" />
      </div>
      <h6 className="text-sm md:w-3/5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
        maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
        consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio,
        in molestie diam bibendu.
      </h6>
      <Footer />
    </motion.section>
  );
}

export default AboutPage;
