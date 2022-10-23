//hooks
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//icons
import { AiFillCloseCircle } from "react-icons/ai";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//additional
import { navLinks } from "../../data/navbar-data/navLinks";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../data/firebase/firebase-setup";
import { comment } from "postcss";
import { CircularProgress } from "@mui/material";

function SelectedBlogPage() {
  let date = new Date();
  //hooks
  const dispatch = useDispatch();
  const selectedBlog = useSelector((state) => state.getAllData.selectedBlog);
  //email-input
  const [emailInput, setEmailInput] = useState(null);
  const [emailIcon, setEmailIcon] = useState(false);
  const emailInputRef = useRef("");
  //first-name-input
  const [firstNameInput, setFirstNameInput] = useState(null);
  const [firstNameIcon, setFirstNameIcon] = useState(false);
  const firstNameInputRef = useRef("");
  //website-input
  const [websiteInput, setWebsiteInput] = useState(null);
  const [websiteIcon, setWebsiteIcon] = useState(false);
  const websiteInputRef = useRef("");
  //comment-input
  const [commentInput, setCommentInput] = useState(null);
  const [commentIcon, setcommentIcon] = useState(false);
  const commentInpuRef = useRef("");
  const [postCommentButtonText, setPostCommentButtonText] =
    useState("POST COMMENT");
  //FIREBASE
  const commentsCollection = collection(dataBase, "blog-reviews");
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState(null);
  //get
  const getData = async () => {
    const data = await getDocs(commentsCollection);
    setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (comments) {
      setPostCommentButtonText("POST COMMENT");
      setComment(comments.filter((c) => c.where == selectedBlog.id));
    }
  }, [comments]);

  //post
  const addData = async (blogId) => {
    setPostCommentButtonText("POSTING...");
    await addDoc(commentsCollection, {
      date: date.toString(),
      email: emailInput,
      name: firstNameInput,
      text: commentInput,
      where: selectedBlog.id,
      queue:
        comments.length == 0
          ? 1
          : (comments.sort((a, b) => a.queue - b.queue)[
              comments.length - 1
            ].queue += 1),
    });
    setPostCommentButtonText("POSTED");
    getData();
    setTimeout(() => {
      setPostCommentButtonText("POST COMMENT");
    }, 1000);
  };
  //comment-form-submit-function
  let inputRefs = [
    emailInputRef,
    firstNameInputRef,
    websiteInputRef,
    commentInpuRef,
  ];
  const submittedComment = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (inputRefs.every((input) => input.current.value != "")) {
      if (user.email == emailInput && user.firstName == firstNameInput) {
        comments ? addData() : setPostCommentButtonText("WAIT...");
      } else if (user.email != emailInput && user.firstName == firstNameInput) {
        emailInputRef.current.value = "ERROR EMAIL";
      } else if (user.email == emailInput && user.firstName != firstNameInput) {
        firstNameInputRef.current.value = "ERROR NAME";
      } else {
        emailInputRef.current.value = "ERROR EMAIL";
        firstNameInputRef.current.value = "ERROR NAME";
      }
    } else {
      inputRefs.forEach((input) => {
        if (input.current.value == "") {
          input.current.style.borderBottom = "1px solid red";
        }
      });
    }
  };
  return (
    <section className="flex flex-col items-center gap-5 w-full min-h-screen">
      <Navbar />
      <h4 className="text-lg font-bold mt-28 md:text-2xl md:mt-32">{`${selectedBlog.style
        .charAt(0)
        .toUpperCase()}${selectedBlog.style.slice(
        1
      )} Trends From ${selectedBlog.season
        .charAt(0)
        .toUpperCase()}${selectedBlog.season.slice(1)}`}</h4>
      <div className="flex justify-center items-center w-full gap-2">
        <p>by</p> <h6>ANNY JOHNSON</h6>{" "}
        <p>
          {`- ${
            date.toString().split(" ", 2)[
              date.toString().split(" ", 2).length - 1
            ]
          } ${
            date.toString().split(" ", 3)[
              date.toString().split(" ", 3).length - 1
            ]
          },${
            date.toString().split(" ", 4)[
              date.toString().split(" ", 4).length - 1
            ]
          }`}
        </p>
      </div>
      <img
        src={selectedBlog.image}
        className="w-full object-cover h-52 rounded-md sm:h-56 md:h-64 lg:h-[450px]"
      />
      <h6 className="mt-5 w-full md:w-8/12 lg:w-1/2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
        maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
        consequat sed eu felis. Nunc sed porta augue. <br /> <br /> Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a
        volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex
        vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu
        felis.
      </h6>
      <div className="flex flex-col gap-5 w-full md:w-8/12 lg:w-1/2">
        <h4 className="text-lg font-bold md:text-2xl">Top Trends</h4>
        <h6 className="w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero.
        </h6>
        <div className="flex flex-col gap-2 w-full">
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
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3 w-full md:w-8/12 lg:w-1/2">
        <div className="flex items-center justify-between gap-2">
          <h6>Tags</h6>
          <div className="w-16 h-[2px] rounded-lg bg-[#000]"></div>
          <p>{`${selectedBlog.fashion}, ${selectedBlog.style}, ${selectedBlog.season}`}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h6>Share</h6>
          <div className="w-16 h-[2px] rounded-lg bg-[#000]"></div>
          <p className="text-2xl flex items-center gap-3">
            {navLinks.socialMediaIcons.slice(1).map((icon) => icon.name)}
          </p>
        </div>
      </div>
      <div className="w-full h-[2px] bg-whiteGray md:w-8/12 lg:w-1/2"></div>

      {/* ----------------COMMENT-SECTION-------------- */}
      <form
        onSubmit={submittedComment}
        className="flex flex-col items-start gap-5 h-max w-full mt-6 md:w-8/12 lg:w-1/2"
      >
        <h4 className="font-bold text-lg md:text-2xl">Leave a Reply</h4>
        <p className="text-sm">
          Your email Address Will Not Be Published. Required Fields Are Marked *
        </p>
        {/* ----------------------NAME_INPUT--------------------- */}
        <div className="relative w-full mt-5">
          <input
            onChange={(e) => {
              setFirstNameInput(e.target.value);
              e.target.value == ""
                ? setFirstNameIcon(false)
                : setFirstNameIcon(true);
              firstNameInputRef.current.style.borderBottom =
                "1px solid #D8D8D8";
            }}
            ref={firstNameInputRef}
            value={firstNameInput}
            type="text"
            placeholder="Enter your name*"
            className="border-b border-[#D8D8D8] outline-none w-full py-1"
          />
          <button
            type="button"
            onClick={() => {
              setFirstNameInput("");
              setFirstNameIcon(false);
            }}
            className={
              firstNameIcon
                ? "absolute top-1/2 -translate-y-1/2 right-0"
                : "hidden"
            }
          >
            <p>
              <AiFillCloseCircle />
            </p>
          </button>
        </div>
        {/* ----------------------EMAIL_INPUT--------------------- */}
        <div className="relative w-full mt-5">
          <input
            onChange={(e) => {
              setEmailInput(e.target.value);
              e.target.value == "" ? setEmailIcon(false) : setEmailIcon(true);
              emailInputRef.current.style.borderBottom = "1px solid #D8D8D8";
            }}
            ref={emailInputRef}
            value={emailInput}
            type="text"
            placeholder="Enter your email*"
            className="border-b border-[#D8D8D8] outline-none w-full py-1"
          />
          <button
            type="button"
            onClick={() => {
              setEmailInput("");
              setEmailIcon(false);
            }}
            className={
              emailIcon ? "absolute top-1/2 -translate-y-1/2 right-0" : "hidden"
            }
          >
            <p>
              <AiFillCloseCircle />
            </p>
          </button>
        </div>
        {/* ----------------------WEBSITE_INPUT--------------------- */}
        <div className="relative w-full mt-5">
          <input
            onChange={(e) => {
              setWebsiteInput(e.target.value);
              e.target.value == ""
                ? setWebsiteIcon(false)
                : setWebsiteIcon(true);
              websiteInputRef.current.style.borderBottom = "1px solid #D8D8D8";
            }}
            ref={websiteInputRef}
            value={websiteInput}
            type="text"
            placeholder="Enter your website*"
            className="border-b border-[#D8D8D8] outline-none w-full py-1"
          />
          <button
            type="button"
            onClick={() => {
              setWebsiteInput("");
              setWebsiteIcon(false);
            }}
            className={
              websiteIcon
                ? "absolute top-1/2 -translate-y-1/2 right-0"
                : "hidden"
            }
          >
            <p>
              <AiFillCloseCircle />
            </p>
          </button>
        </div>

        {/* COMMENT-TEXT-AREA */}
        <div className="flex w-full items-center gap-2">
          <input type="checkbox" id="remember-data" />
          <label htmlFor="remember-data" className="text-sm">
            <p>
              Save my name, email and website in this browser for the next time
              I comment
            </p>
          </label>
        </div>
        <textarea
          ref={commentInpuRef}
          onChange={(e) => {
            setCommentInput(e.target.value);
            commentInpuRef.current.style.borderBottom = "1px solid #D8D8D8";
          }}
          rows="2"
          placeholder="Your Comment*"
          className="border-b border-[#D8D8D8] w-full outline-none mt-5"
        ></textarea>
        <button id="btn-border-dark" className="border px-7 py-1 mt-5">
          {postCommentButtonText}
        </button>
      </form>
      <div className="flex flex-col gap-5 w-full sm:w-8/12 md:w-1/2">
        <h4 className="text-lg font-bold md:text-2xl">
          Comments(
          {comment == null ? "..." : comment.length == 0 ? "0" : comment.length}
          )
        </h4>
        {comment == null ? (
          <CircularProgress />
        ) : (
          comment.map((c) => (
            <div className="flex items-start gap-5 py-2 border-b border-[#D8D8D8]">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col gap-1 items-start">
                <div className="flex gap-3 justify-start">
                  <h6 className="font-bold">{c.name}</h6>
                  <p>{`${
                    c.date.split(" ", 3)[c.date.split(" ", 3).length - 1]
                  } ${c.date.split(" ", 2)[c.date.split(" ", 2).length - 1]},${
                    c.date.split(" ", 4)[c.date.split(" ", 4).length - 1]
                  }`}</p>
                </div>
                <p>{c.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </section>
  );
}

export default SelectedBlogPage;
