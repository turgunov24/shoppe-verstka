//hooks
import React, { useState } from "react";
//components
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

//icons
import { AiFillCloseCircle } from "react-icons/ai";

//addtional
import { navLinks } from "../../data/navbar-data/navLinks";

function ContactPage() {
  //first-name-input-data
  const [contactPageFirstName, setContactPageFirstName] = useState(null);
  const [contactPageFirstNameIcon, setContactPageFirstNameIcon] =
    useState(null);
  //last-name-input-data
  const [contactPageLastName, setContactPageLastName] = useState(null);
  const [contactPageLastNameIcon, setContactPageLastNameIcon] = useState(null);

  //email-input-data
  const [contactPageEmail, setContactPageEmail] = useState(null);
  const [contactPageEmailIcon, setContactPageEmailIcon] = useState(null);
  //subject-dropdown
  const [subjectDropdown, setSubjectDropdown] = useState(null);
  const [subjectDropdownIcon, setSubjectDropdownIcon] = useState(false);
  //subject-input-data
  const [subjectInputData, setSubjectInputData] = useState();

  return (
    <section className="flex flex-col items-center w-full min-h-screen gap-5">
      <Navbar />
      <h4 className="text-xl font-bold flex items-center justify-start mt-28 w-full md:mt-40 md:justify-center gap-3 md:text-2xl">
        Contact
        <h4 className="hidden md:block">Us</h4>
      </h4>
      <h4 className="hidden md:block w-full text-center ">
        Say Hello send us your thoughts about our products or share <br /> your
        ideas with our Team!
      </h4>
      <div className="flex flex-col items-center w-full gap-10 mt-8 md:flex-row justify-between md:items-end lg:justify-around xl:justify-evenly">
        <div className="relative w-full sm:w-10/12 md:w-96">
          <input
            onChange={(e) => {
              setContactPageFirstName(e.target.value);
              e.target.value == ""
                ? setContactPageFirstNameIcon(false)
                : setContactPageFirstNameIcon(true);
            }}
            value={contactPageFirstName}
            type="text"
            placeholder="First Name"
            className="border-b border-[#D8D8D8] outline-none w-full py-1"
          />
          <button
            onClick={() => {
              setContactPageFirstName("");
              setContactPageFirstNameIcon(false);
            }}
            className={
              contactPageFirstNameIcon
                ? "absolute top-1/2 -translate-y-1/2 right-0"
                : "hidden"
            }
          >
            <p>
              <AiFillCloseCircle />
            </p>
          </button>
        </div>
        <div className="relative w-full sm:w-10/12 md:w-96">
          <input
            onChange={(e) => {
              setContactPageLastName(e.target.value);
              e.target.value == ""
                ? setContactPageLastNameIcon(false)
                : setContactPageLastNameIcon(true);
            }}
            value={contactPageLastName}
            type="text"
            placeholder="Last Name"
            className="border-b border-[#D8D8D8] outline-none w-full py-1"
          />
          <button
            onClick={() => {
              setContactPageLastName("");
              setContactPageLastNameIcon(false);
            }}
            className={
              contactPageLastNameIcon
                ? "absolute top-1/2 -translate-y-1/2 right-0"
                : "hidden"
            }
          >
            <p>
              <AiFillCloseCircle />
            </p>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-5 mt-5 md:flex-row justify-between md:items-end lg:justify-around xl:justify-evenly">
        <div className="relative w-full sm:w-10/12 md:w-96">
          <input
            onChange={(e) => {
              setContactPageEmail(e.target.value);
              e.target.value == ""
                ? setContactPageEmailIcon(false)
                : setContactPageEmailIcon(true);
            }}
            value={contactPageEmail}
            type="text"
            placeholder="Email"
            className="border-b border-[#D8D8D8] outline-none w-full py-1"
          />
          <button
            onClick={() => {
              setContactPageEmail("");
              setContactPageEmailIcon(false);
            }}
            className={
              contactPageEmailIcon
                ? "absolute top-1/2 -translate-y-1/2 right-0"
                : "hidden"
            }
          >
            <p>
              <AiFillCloseCircle />
            </p>
          </button>
        </div>
        <div
          className={
            subjectDropdown
              ? "border-b border-[#D8D8D8] w-full h-36 overflow-hidden rounded-md duration-300 sm:w-10/12 md:h-[34] md:w-96"
              : "border-b border-[#D8D8D8] w-full h-14 overflow-hidden rounded-md duration-300 sm:w-10/12 md:h-12 md:w-96"
          }
        >
          <div
            className="relative h-14 md:h-12"
            onClick={() => {
              setSubjectDropdown(!subjectDropdown);
              setSubjectDropdownIcon(!subjectDropdownIcon);
            }}
          >
            <input
              type="text"
              disabled
              value={subjectInputData}
              className="w-full h-full bg-[white] placeholder:text-[#707070]"
              placeholder="Subject"
            />
            <h4
              className={
                subjectDropdownIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0 rotate-90 duration-200 md:text-sm"
                  : "absolute top-1/2 -translate-y-1/2 right-0 -rotate-90 duration-200 md:text-sm"
              }
            >
              {navLinks.icons.find((icon) => icon.name == "arrowDropdown").icon}
            </h4>
          </div>
          <h4
            onClick={() => {
              setSubjectInputData("Cheapest");
              setSubjectDropdown(false);
              setSubjectDropdownIcon(false);
            }}
            className={
              subjectDropdown
                ? "flex items-center h-11 opacity-100 hover:bg-[#D8D8D8] duration-300"
                : "flex items-center h-11 opacity-0 hover:bg-[#D8D8D8] duration-300"
            }
          >
            Cheapest
          </h4>
          <h4
            onClick={() => {
              setSubjectInputData("Expensive");
              setSubjectDropdown(false);
              setSubjectDropdownIcon(false);
            }}
            className={
              subjectDropdown
                ? "flex items-center h-11 opacity-100 hover:bg-[#D8D8D8] duration-300"
                : "flex items-center h-11 opacity-0 hover:bg-[#D8D8D8] duration-300"
            }
          >
            Expensive
          </h4>
        </div>
      </div>
      <textarea
        rows="2"
        placeholder="Message"
        className="border-b border-[#D8D8D8] w-full mt-10 outline-none sm:w-10/12 md:w-full lg:w-10/12"
      ></textarea>
      <div className="w-full flex items-start justify-center pb-10 lg:pb-16">
        <button
          id="btn-border-dark"
          className="w-full py-1 mt-5 xs:w-80 lg:mt-10 lg:py-2 lg:w-96"
        >
          SEND
        </button>
      </div>
      <Footer />
    </section>
  );
}

export default ContactPage;
