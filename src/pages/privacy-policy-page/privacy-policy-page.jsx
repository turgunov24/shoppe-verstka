//hooks
import React from "react";
//components
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
//additional
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { motion } from "framer-motion";
function PrivacyPolicyPage() {
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center w-full min-h-screen gap-5"
    >
      <Navbar />
      <h4 className="w-full font-bold text-start text-lg mt-28 md:text-2xl md:text-center md:mt-44">
        Privacy Policy
      </h4>
      <h6 className="w-full md:w-8/12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        distinctio mollitia iusto ducimus sint molestiae soluta laudantium porro
        velit neque, sit aut placeat corporis dolore ipsum numquam tempora
        exercitationem corrupti molestias voluptatum nulla ex earum.
      </h6>
      <div className="flex flex-col gap-5 w-full md:w-8/12">
        <h4 className="w-full text-lg font-bold md:text-2xl">Security</h4>
        <h6 className="w-full">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni esse
          repudiandae, inventore neque, totam ad laboriosam porro quas quod
          autem cumque eius natus sed alias?
        </h6>
      </div>
      <div className="flex flex-col gap-5 w-full md:w-8/12">
        <h4 className="w-full text-lg font-bold md:text-2xl">Cookies</h4>
        <div className="flex items-center justify-start gap-2 pl-2 w-full">
          <div className="w-1 h-1 rounded-full bg-[#000] p-1"></div>
          <h6>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui,
            omnis.
          </h6>
        </div>
        <div className="flex items-center justify-start gap-2 pl-2 w-full">
          <div className="w-1 h-1 rounded-full bg-[#000] p-1"></div>
          <h6>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui,
            omnis.
          </h6>
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}

export default PrivacyPolicyPage;
