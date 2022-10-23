//hooks
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
//icons
import { GiShare } from "react-icons/gi";
import {
  AiFillCloseCircle,
  AiOutlineStar,
  AiTwotoneStar,
} from "react-icons/ai";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ProductPageSwiper from "./product-page-swiper/product-page-swiper";
import ProductPageTab from "./product-page-tab/product-page-tab";
import ProductPageResponsiveSwiper from "./product-page-responsive-swiper/product-page-responsive-swiper";
import ProductpageVerticalSwiper from "./product-page-vertical-swiper/product-page-vertical-swiper";
//addtional
import "./product-page.css";
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { navLinks } from "../../data/navbar-data/navLinks";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dataBase } from "../../data/firebase/firebase-setup";
import { Checkbox, CircularProgress } from "@mui/material";

function ProductPage() {
  //useselector-hook
  const selectedProduct = useSelector((state) => state.getAllData.selectedData);
  //product-page-social-and-category-toggle
  const [productPageLoremToggle, setProductPageLoremToggle] = useState(false);
  //product-page-tab-data
  const [productPageTabValue, setProductPageTabValue] = useState(0);
  //------------------Dropdowns-----------------------//
  //description-dropdown
  const [descriptionDropdown, setdescriptionDropdown] = useState(false);
  //additional-information-dropdown
  const [additionalInformationDropdown, setadditionalInformationDropdown] =
    useState(false);
  //rewies-dropdown
  const [reviewsDropdown, setreviewsDropdown] = useState(false);

  //--------------------inputs-data-------------------//
  //name-input-data
  const [productPageNameInput, setProductPageNameInput] = useState(null);
  const [productPageNameInputIcon, setProductPageNameInputIcon] =
    useState(false);
  const productPageNameInputRef = useRef("");
  //email-input-data
  const [productPageEmailInput, setProductPageEmailInput] = useState(null);
  const [productPageEmailInputIcon, setProductPageEmailInputIcon] =
    useState(false);
  const productPageEmailInputRef = useRef("");
  //text-area-data
  const [produtPageTextArea, setprodutPageTextArea] = useState(null);
  const productPageTextAreaRef = useRef("");
  const productPageReviewFormRefs = [
    productPageNameInputRef,
    productPageEmailInputRef,
    productPageTextAreaRef,
  ];
  //----------------------firebase-for-reviews--------------------//
  const [reviews, setReviews] = useState(null);
  const reviewsCollection = collection(dataBase, "shoppe-reviews");
  const [addingDataIndicator, setAddingDataIndicator] = useState("Submit");
  //get
  const getData = async () => {
    const data = await getDocs(reviewsCollection);
    setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  //md
  useEffect(() => {
    productPageTabValue == 2 && getData();
  }, [productPageTabValue]);
  //sm
  useEffect(() => {
    reviewsDropdown && getData();
  }, [reviewsDropdown]);
  //post
  const addData = async () => {
    setAddingDataIndicator("Adding");
    let GTM = new Date();
    await addDoc(reviewsCollection, {
      date: GTM.toString(),
      email: productPageEmailInput,
      name: productPageNameInput,
      rate: selectedStars ? selectedStars : 0,
      text: produtPageTextArea,
      where: selectedProduct[0].id,
      queue:
        reviews.sort((a, b) => a.queue - b.queue)[reviews.length - 1].queue + 1,
    });
    setAddingDataIndicator("Added");
    setTimeout(() => {
      setAddingDataIndicator("Submit");
    }, 1500);
  };
  //------------review-ratings--------//
  const [reviewRatingCounts, setreviewRatingCounts] = useState(0);
  // const reviewRatingCounts = [];
  const residueReviewRatingCounts = [];
  useEffect(() => {
    if (reviews) {
      // for (let i = 0; i < Math.floor(selectedProduct[0].rating.rate); i++) {
      //   allRatingCounts.push(`${i}`);
      // }
      // //rating-black
      // if (5 - Math.floor(selectedProduct[0].rating.rate) == 0) {
      //   residueRatingCounts = "EMPTY";
      // } else {
      //   for (let i = 0; i < 5 - Math.floor(selectedProduct[0].rating.rate); i++) {
      //     residueRatingCounts.push(`${i}`);
      //   }
      // }
    }
  }, [reviews]);

  //---------------------------selected-product-rating-------------------------//
  // const [allRatingCounts, setAllRatingCounts] = useState([]);
  // const [residueRatingCounts, setResidueRatingCounts] = useState([]);
  // //
  const allRatingCounts = [];
  const residueRatingCounts = [];

  for (let i = 0; i < Math.floor(selectedProduct[0].rating.rate); i++) {
    allRatingCounts.push(`${i}`);
  }

  //rating-black
  if (5 - Math.floor(selectedProduct[0].rating.rate) == 0) {
    residueRatingCounts = "EMPTY";
  } else {
    for (let i = 0; i < 5 - Math.floor(selectedProduct[0].rating.rate); i++) {
      residueRatingCounts.push(`${i}`);
    }
  }

  //---------------stars-ref----------------//
  const starOne = useRef();
  const starTwo = useRef();
  const starThree = useRef();
  const starFour = useRef();
  const starFive = useRef();
  const starsData = [starOne, starTwo, starThree, starFour, starFive];
  const [selectedStars, setSelectedStars] = useState(null);

  // if (selectedStars) {
  //   for (let i = 0; i < selectedStars; i++) {
  //     starsData[i].current.style.border = "1px solid #000";
  //   }
  //   for (let k = selectedStars; k < starsData.length + 1; k++) {
  //     starsData[k].current.style.border = "1px solid #fff";
  //   }
  // }
  // selectedStars && starsData.filter((star,index) => index < selectedStars).forEach(star => star.current.style.border = "#000")
  //-------------product-page-review-form-submit-function---------//
  const productPageReviewFormSubmitted = (e) => {
    e.preventDefault();

    if (productPageNameInput && productPageEmailInput && produtPageTextArea) {
      if (
        productPageNameInput ==
          JSON.parse(localStorage.getItem("user")).firstName &&
        productPageEmailInput == JSON.parse(localStorage.getItem("user")).email
      ) {
        const refresh = async () => {
          await addData();
          getData();
        };
        refresh();
      } else if (
        productPageNameInput ==
          JSON.parse(localStorage.getItem("user")).firstName &&
        productPageEmailInput != JSON.parse(localStorage.getItem("user")).email
      ) {
        setAddingDataIndicator("Checking");
        setTimeout(() => {
          setAddingDataIndicator("Error email");
          setTimeout(() => {
            setAddingDataIndicator("Submit");
          }, 1500);
        }, 1000);
      } else if (
        productPageNameInput !=
          JSON.parse(localStorage.getItem("user")).firstName &&
        productPageEmailInput == JSON.parse(localStorage.getItem("user")).email
      ) {
        setAddingDataIndicator("Checking");
        setTimeout(() => {
          setAddingDataIndicator("Error name");
          setTimeout(() => {
            setAddingDataIndicator("Submit");
          }, 1500);
        }, 1000);
      } else {
        setAddingDataIndicator("Checking");
        setTimeout(() => {
          setAddingDataIndicator("Error");
          setTimeout(() => {
            setAddingDataIndicator("Submit");
          }, 1500);
        }, 1000);
      }
    } else {
      productPageReviewFormRefs.forEach((ref) => {
        if (ref.current.value == "") {
          ref.current.style.borderBottom = "1px solid red";
        }
      });
    }
  };
  //update-localstorage-function
  const updateLocalstorage = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(
        usersData.find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        )
      )
    );
  };

  //----------------firebase-for-shopping-bag-------------------//
  const [addToCartButtonText, setaddToCartButtonText] = useState("ADD TO CART");
  const [productPageOrderCounts, setproductPageOrderCounts] = useState(1);
  const [usersData, setusersData] = useState(null);
  const [shoppingBag, setShoppingBag] = useState(null);
  const shoppingBagCollection = collection(dataBase, "login-base");
  //get
  const getShoppingBag = async () => {
    setaddToCartButtonText("CHECKING");
    const data = await getDocs(shoppingBagCollection);
    setusersData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  //post
  const postShoppingBag = async (bag) => {
    const userDoc = doc(
      dataBase,
      "login-base",
      JSON.parse(localStorage.getItem("user")).id
    );
    if (bag == "empty") {
      setaddToCartButtonText("ADDING");
      await updateDoc(userDoc, {
        shoppingbag: [
          {
            title: selectedProduct[0].title,
            productId: selectedProduct[0].id,
            rating: selectedProduct[0].rating,
            orderCount: productPageOrderCounts,
            category: selectedProduct[0].category,
            description: selectedProduct[0].description,
            image: selectedProduct[0].image,
            price: selectedProduct[0].price,
          },
        ],
      });

      const getData = async () => {
        const data = await getDocs(shoppingBagCollection);
        setShoppingBag(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getData()
      setaddToCartButtonText("ADDED");
    } else if (bag == "push") {
      setaddToCartButtonText("ADDING");

      const arrForPush = usersData.find(
        (user) => user.email == JSON.parse(localStorage.getItem("user")).email
      ).shoppingbag;
      arrForPush.push({
        title: selectedProduct[0].title,
        productId: selectedProduct[0].id,
        rating: selectedProduct[0].rating,
        orderCount: productPageOrderCounts,
        category: selectedProduct[0].category,
        description: selectedProduct[0].description,
        image: selectedProduct[0].image,
        price: selectedProduct[0].price,
      });
      await updateDoc(userDoc, {
        shoppingbag: arrForPush,
      });
      updateLocalstorage();
      setaddToCartButtonText("ADDED");
    } else if (bag == "update") {
      setaddToCartButtonText("UPDATING");

      const arrForFilter = usersData.find(
        (user) => user.email == JSON.parse(localStorage.getItem("user")).email
      ).shoppingbag;
      const updatingProduct = arrForFilter.find(
        (product) => product.productId == selectedProduct[0].id
      );
      console.log(updatingProduct);
      const arrForUpdate = arrForFilter.filter(
        (product) => product.productId != selectedProduct[0].id
      );
      updatingProduct.orderCount += productPageOrderCounts;

      arrForUpdate.push(updatingProduct);
      console.log(arrForUpdate);
      await updateDoc(userDoc, {
        shoppingbag: arrForUpdate,
      });
      updateLocalstorage();
      setaddToCartButtonText("UPDATED");
    }

    setTimeout(() => {
      setaddToCartButtonText("ADD TO CART");
    }, 1000);
  };
  useEffect(() => {
    if (usersData) {
      setaddToCartButtonText("working");
      const userBag = usersData.find(
        (user) => user.email == JSON.parse(localStorage.getItem("user")).email
      ).shoppingbag;
      if (userBag.length == 0) {
        postShoppingBag("empty");
      } else {
        userBag.find((product) => product.productId == selectedProduct[0].id)
          ? postShoppingBag("update")
          : postShoppingBag("push");
      }
    }
  }, [usersData]);
  //update-localstorage-for-empty-shopping-bag
  const updateLocalstorageForEmptyBag = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(
        shoppingBag.find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        )
      )
    );
  };
  useEffect(() => {
    shoppingBag && updateLocalstorageForEmptyBag();
  }, [shoppingBag]);
  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full min-h-screen gap-5"
    >
      <Navbar />
      <div className="flex flex-col gap-5 w-full  mt-28 pb-5 md:flex-row items-end md:gap-10 md:pb-0 md:h-max">
        <ProductpageVerticalSwiper />
        <ProductPageSwiper />
        {selectedProduct &&
          selectedProduct.map((product) => (
            <div className="flex flex-col w-full h-max gap-2 md:gap-5 lg:w-[900px]">
              <h4 className="text-xl font-bold">
                {product.title.split(" ", 1).join("")}
              </h4>
              <div className="flex justify-between items-center md:text-lg font-bold">
                <h5>$ {product.price}</h5>
                <h4 className="text-2xl md:hidden">
                  <GiShare />
                </h4>
              </div>
              <div className="hidden md:flex justify-between mt-5">
                <div className="flex justify-between items-center">
                  {allRatingCounts.map((icon) => (
                    <h5>
                      <AiTwotoneStar />
                    </h5>
                  ))}
                  {residueRatingCounts != "EMPTY" &&
                    residueRatingCounts.map((icon) => (
                      <h6>
                        <AiTwotoneStar />
                      </h6>
                    ))}
                </div>
                <p className="md:hidden">Rating</p>
                <p className="hidden md:block">1 customer review</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-col-reverse">
                <div className="flex justify-between gap-5">
                  <div className="hidden sm:flex items-center bg-gray1 relative">
                    <button
                      onClick={() =>
                        setproductPageOrderCounts(
                          productPageOrderCounts > 1
                            ? productPageOrderCounts - 1
                            : 1
                        )
                      }
                      className="flex items-center justify-center text-[#707070] h-full px-3"
                    >
                      -
                    </button>
                    <div className="flex items-center justify-center text-[#707070] h-full px-2">
                      {productPageOrderCounts}
                    </div>
                    <button
                      onClick={() =>
                        setproductPageOrderCounts(productPageOrderCounts + 1)
                      }
                      className="flex items-center justify-center text-[#707070] h-full px-3"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      getShoppingBag();
                    }}
                    id="btn-dark"
                    className="w-full py-1 sm:w-96 md:w-80 md:py-2"
                  >
                    {addToCartButtonText}
                  </button>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <p
                    className={
                      productPageLoremToggle
                        ? "h-max"
                        : "h-6 overflow-hidden md:h-max"
                    }
                  >
                    {selectedProduct[0].description}
                  </p>
                  <div
                    onClick={() =>
                      setProductPageLoremToggle(!productPageLoremToggle)
                    }
                    className="flex items-center gap-2 md:hidden"
                  >
                    <h5>View more</h5>
                    <button
                      className={
                        productPageLoremToggle
                          ? "rotate-90 duration-300"
                          : "rotate-[270deg] duration-300"
                      }
                    >
                      {
                        navLinks.icons.find(
                          (icon) => icon.name == "arrowDropdown"
                        ).icon
                      }
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={
                  productPageLoremToggle
                    ? "flex items-center justify-start gap-5 text-2xl"
                    : "hidden md:flex items-center justify-start gap-5 text-2xl"
                }
              >
                <div className="flex items-center bg-gray1 sm:hidden">
                  <button
                    onClick={() =>
                      setproductPageOrderCounts(
                        productPageOrderCounts > 1
                          ? productPageOrderCounts - 1
                          : 1
                      )
                    }
                    className="flex items-center justify-center text-[#707070] h-full px-3"
                  >
                    -
                  </button>
                  <div className="flex items-center justify-center text-sm text-[#707070] h-full px-2">
                    {productPageOrderCounts}
                  </div>
                  <button
                    onClick={() =>
                      setproductPageOrderCounts(productPageOrderCounts + 1)
                    }
                    className="flex items-center justify-center text-[#707070] h-full px-3"
                  >
                    +
                  </button>
                </div>
                <p>
                  {navLinks.icons.find((icon) => icon.name == "heartIcon").icon}
                </p>
                <h4 className="w-[2px] h-full bg-gray1  border"></h4>
                {navLinks.socialMediaIcons.map((icon) => (
                  <p>{icon.name}</p>
                ))}
              </div>
              <div
                className={
                  productPageLoremToggle
                    ? "flex gap-3 items-end"
                    : "hidden md:flex gap-3 items-end"
                }
              >
                <h4 className="text-lg">SKU:</h4>
                <p className="text-lg">{selectedProduct[0].rating.count}</p>
              </div>
              <div
                className={
                  productPageLoremToggle
                    ? "flex gap-3 items-end"
                    : "hidden md:flex gap-3 items-end"
                }
              >
                <h4>Categories:</h4>
                <p>{selectedProduct[0].category}</p>
              </div>
            </div>
          ))}
      </div>
      {/* -------------------REVIEWS------------------- */}
      <div className="flex flex-col mt-5">
        {/* ---------------------MD_REVIEWS--------------------- */}
        <ProductPageTab setProductPageTabValue={setProductPageTabValue} />
        <div className="hidden md:block py-5">
          {productPageTabValue == 0 ? (
            selectedProduct.map((product) => (
              <motion.p
                variants={introAnimation}
                initial="hidden"
                animate="visible"
              >
                {product.description}
              </motion.p>
            ))
          ) : productPageTabValue == 1 ? (
            <motion.div
              variants={introAnimation}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start gap-2 "
            >
              <div className="flex items-center gap-2">
                <h6>Weight:</h6>
                <p>0.3 kg</p>
              </div>
              <div className="flex items-center gap-2">
                <h6>Dimentions:</h6>
                <p>15 x 10 x 1 cm</p>
              </div>
              <div className="flex items-center gap-2">
                <h6>Colours:</h6>
                <p>Black,Browns,White</p>
              </div>
              <div className="flex items-center gap-2">
                <h6>Material:</h6>
                <p>Metal</p>
              </div>
            </motion.div>
          ) : productPageTabValue == 2 ? (
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="w-full h-max overscroll-y-none md:w-1/2 md:h-[470px] overflow-y-scroll xl:h-[455px]">
                {reviews ? (
                  reviews.find(
                    (review) => review.where == selectedProduct[0].id
                  ) ? (
                    <motion.div
                      variants={introAnimation}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col w-full h-max gap-5"
                    >
                      <h4 className="pb-7 font-bold">
                        {`
                          ${
                            reviews.filter(
                              (review) => review.where == selectedProduct[0].id
                            ).length
                          } 
                          Reviews for 
                          ${selectedProduct[0].title}
                          `}
                      </h4>
                      {reviews
                        .filter(
                          (review) => review.where == selectedProduct[0].id
                        )
                        .sort((a, b) => b.queue - a.queue)
                        .map((review) => (
                          <div className="flex flex-col items-start gap-3 w-full">
                            <div className="flex gap-2 flex-wrap items-center w-full">
                              <h6 className="text-lg font-bold">
                                {review.name}
                              </h6>
                              <p>{`${
                                review.date.split(" ", 3)[
                                  review.date.split(" ", 3).length - 1
                                ]
                              } ${
                                review.date.split(" ", 2)[
                                  review.date.split(" ", 2).length - 1
                                ]
                              }, ${
                                review.date.split(" ", 4)[
                                  review.date.split(" ", 4).length - 1
                                ]
                              }, 
                              ${review.date
                                .split(" ", 5)
                                [review.date.split(" ", 5).length - 1].split(
                                  ":",
                                  2
                                )
                                .join(":")} 
                              `}</p>
                            </div>
                            <div>{review.rate}</div>
                            <p>{review.text}</p>
                          </div>
                        ))}
                    </motion.div>
                  ) : (
                    <p>no reviews</p>
                  )
                ) : (
                  <motion.div
                    variants={introAnimation}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center w-full h-full"
                  >
                    <CircularProgress />
                  </motion.div>
                )}
              </div>
              {/* -----------------------ADD_REVIEW---------------------- */}
              <form
                onSubmit={productPageReviewFormSubmitted}
                className="flex flex-col items-start gap-5 h-max w-full md:w-1/2 md:h-[470px] xl:h-[455px]"
              >
                <h4 className="font-bold">Add a Review</h4>
                <p className="text-sm">
                  Your email Address Will Not Be Published. Required Fields Are
                  Marked *
                </p>
                <textarea
                  ref={productPageTextAreaRef}
                  onChange={(e) => {
                    setprodutPageTextArea(e.target.value);
                    productPageTextAreaRef.current.style.borderBottom =
                      "1px solid #D8D8D8";
                  }}
                  rows="2"
                  placeholder="Your Review*"
                  className="border-b border-[#D8D8D8] w-full outline-none"
                ></textarea>
                {/* ----------------------NAME_INPUT--------------------- */}
                <div className="relative w-full mt-5">
                  <input
                    onChange={(e) => {
                      setProductPageNameInput(e.target.value);
                      e.target.value == ""
                        ? setProductPageNameInputIcon(false)
                        : setProductPageNameInputIcon(true);
                      productPageNameInputRef.current.style.borderBottom =
                        "1px solid #D8D8D8";
                    }}
                    ref={productPageNameInputRef}
                    value={productPageNameInput}
                    type="text"
                    placeholder="Enter your name*"
                    className="border-b border-[#D8D8D8] outline-none w-full py-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProductPageNameInput("");
                      setProductPageNameInputIcon(false);
                    }}
                    className={
                      productPageNameInputIcon
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
                      setProductPageEmailInput(e.target.value);
                      e.target.value == ""
                        ? setProductPageEmailInputIcon(false)
                        : setProductPageEmailInputIcon(true);
                      productPageEmailInputRef.current.style.borderBottom =
                        "1px solid #D8D8D8";
                    }}
                    ref={productPageEmailInputRef}
                    value={productPageEmailInput}
                    type="text"
                    placeholder="Enter your email*"
                    className="border-b border-[#D8D8D8] outline-none w-full py-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProductPageEmailInput("");
                      setProductPageEmailInputIcon(false);
                    }}
                    className={
                      productPageEmailInputIcon
                        ? "absolute top-1/2 -translate-y-1/2 right-0"
                        : "hidden"
                    }
                  >
                    <p>
                      <AiFillCloseCircle />
                    </p>
                  </button>
                </div>
                <div className="flex w-full items-center gap-2">
                  <input type="checkbox" id="remember-data" />
                  {/* <Checkbox
                    // {...label}
                    color="default"
                    id="remember-data"
                  /> */}
                  <label htmlFor="remember-data" className="text-sm">
                    <p>
                      Save my name, email and website in this browser for the
                      next time I comment
                    </p>
                  </label>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p>Your Rating*</p>
                  <div className="flex gap-1 items-center text-xl">
                    <div
                      ref={starOne}
                      onClick={() => {
                        setSelectedStars(1);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starTwo}
                      onClick={() => {
                        setSelectedStars(2);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starThree}
                      onClick={() => {
                        setSelectedStars(3);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starFour}
                      onClick={() => {
                        setSelectedStars(4);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starFive}
                      onClick={() => {
                        setSelectedStars(5);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                  </div>
                </div>
                <button id="btn-border-dark" className="border px-7 py-1">
                  {addingDataIndicator}
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* ---------------------SM_REVIEWS-------------------- */}
        <div className="flex flex-col gap-2 border-b border-[#D8D8D8] md:hidden">
          {/* ------------------DESCRIPTION_DROPDOWN-------------- */}
          <div
            className={
              descriptionDropdown
                ? "h-max overflow-hidden md:hidden"
                : "h-14 overflow-hidden md:hidden"
            }
          >
            <motion.div
              variants={introAnimation}
              initial="hidden"
              animate="visible"
              className="relative flex items-center justify-between h-14"
              onClick={() => {
                setdescriptionDropdown(!descriptionDropdown);
              }}
            >
              <h4>Description</h4>
              <h4
                className={
                  descriptionDropdown
                    ? "rotate-90 duration-200"
                    : "-rotate-90 duration-200"
                }
              >
                {
                  navLinks.icons.find((icon) => icon.name == "arrowDropdown")
                    .icon
                }
              </h4>
            </motion.div>
            <p>{selectedProduct[0].description}</p>
          </div>
          {/* ------------------ADDITIONAL_INFORMATION_DROPDOWN-------------- */}
          <div
            className={
              additionalInformationDropdown
                ? "h-max overflow-hidden md:hidden"
                : "h-14 overflow-hidden md:hidden"
            }
          >
            <div
              className="relative flex items-center justify-between h-14"
              onClick={() => {
                setadditionalInformationDropdown(
                  !additionalInformationDropdown
                );
              }}
            >
              <h4>Additional information</h4>
              <h4
                className={
                  additionalInformationDropdown
                    ? "rotate-90 duration-200"
                    : "-rotate-90 duration-200"
                }
              >
                {
                  navLinks.icons.find((icon) => icon.name == "arrowDropdown")
                    .icon
                }
              </h4>
            </div>
            <motion.div
              variants={introAnimation}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start gap-2 "
            >
              <div className="flex items-center gap-2">
                <h6>Weight:</h6>
                <p>0.3 kg</p>
              </div>
              <div className="flex items-center gap-2">
                <h6>Dimentions:</h6>
                <p>15 x 10 x 1 cm</p>
              </div>
              <div className="flex items-center gap-2">
                <h6>Colours:</h6>
                <p>Black,Browns,White</p>
              </div>
              <div className="flex items-center gap-2">
                <h6>Material:</h6>
                <p>Metal</p>
              </div>
            </motion.div>
          </div>
          {/* --------------------REVIEWS_DROPDOWN-------------------- */}
          <div
            className={
              reviewsDropdown
                ? "h-max overflow-hidden md:hidden"
                : "h-14 overflow-hidden md:hidden"
            }
          >
            <div
              className="relative flex items-center justify-between h-14"
              onClick={() => {
                setreviewsDropdown(!reviewsDropdown);
              }}
            >
              <h4>Reviews</h4>
              <h4
                className={
                  reviewsDropdown
                    ? "rotate-90 duration-200"
                    : "-rotate-90 duration-200"
                }
              >
                {
                  navLinks.icons.find((icon) => icon.name == "arrowDropdown")
                    .icon
                }
              </h4>
            </div>
            <div className="flex flex-col gap-10 pb-3 md:hidden">
              <div className="w-full h-max overscroll-y-none">
                {reviews ? (
                  reviews.find(
                    (review) => review.where == selectedProduct[0].id
                  ) ? (
                    <motion.div
                      variants={introAnimation}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col w-full h-max gap-5"
                    >
                      <h4 className="pb-7 font-bold">
                        {`
                          ${
                            reviews.filter(
                              (review) => review.where == selectedProduct[0].id
                            ).length
                          } 
                          Reviews for 
                          ${selectedProduct[0].title}
                          `}
                      </h4>
                      {reviews
                        .filter(
                          (review) => review.where == selectedProduct[0].id
                        )
                        .sort((a, b) => b.queue - a.queue)
                        .map((review) => (
                          <div className="flex flex-col items-start gap-3 w-full border-b border-[#D8D8D8] pb-4">
                            <div className="flex gap-2 flex-wrap items-center w-full">
                              <h6 className="text-lg font-bold">
                                {review.name}
                              </h6>
                              <p>{`${
                                review.date.split(" ", 3)[
                                  review.date.split(" ", 3).length - 1
                                ]
                              } ${
                                review.date.split(" ", 2)[
                                  review.date.split(" ", 2).length - 1
                                ]
                              }, ${
                                review.date.split(" ", 4)[
                                  review.date.split(" ", 4).length - 1
                                ]
                              }, 
                              ${review.date
                                .split(" ", 5)
                                [review.date.split(" ", 5).length - 1].split(
                                  ":",
                                  2
                                )
                                .join(":")} 
                              `}</p>
                            </div>
                            <div>{review.rate}</div>
                            <p>{review.text}</p>
                          </div>
                        ))}
                    </motion.div>
                  ) : (
                    <p>no reviews</p>
                  )
                ) : (
                  <motion.div
                    variants={introAnimation}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center w-full h-full"
                  >
                    <CircularProgress />
                  </motion.div>
                )}
              </div>
              {/* -----------------------ADD_REVIEW---------------------- */}
              <form
                onSubmit={productPageReviewFormSubmitted}
                className="flex flex-col items-start gap-5 h-max w-full md:w-1/2 md:h-[470px] xl:h-[455px]"
              >
                <h4 className="font-bold">Add a Review</h4>
                <p className="text-sm">
                  Your email Address Will Not Be Published. Required Fields Are
                  Marked *
                </p>
                <textarea
                  ref={productPageTextAreaRef}
                  onChange={(e) => {
                    setprodutPageTextArea(e.target.value);
                    productPageTextAreaRef.current.style.borderBottom =
                      "1px solid #D8D8D8";
                  }}
                  rows="2"
                  placeholder="Your Review*"
                  className="border-b border-[#D8D8D8] w-full outline-none"
                ></textarea>
                {/* ----------------------NAME_INPUT--------------------- */}
                <div className="relative w-full mt-5">
                  <input
                    onChange={(e) => {
                      setProductPageNameInput(e.target.value);
                      e.target.value == ""
                        ? setProductPageNameInputIcon(false)
                        : setProductPageNameInputIcon(true);
                      productPageNameInputRef.current.style.borderBottom =
                        "1px solid #D8D8D8";
                    }}
                    ref={productPageNameInputRef}
                    value={productPageNameInput}
                    type="text"
                    placeholder="Enter your name*"
                    className="border-b border-[#D8D8D8] outline-none w-full py-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProductPageNameInput("");
                      setProductPageNameInputIcon(false);
                    }}
                    className={
                      productPageNameInputIcon
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
                      setProductPageEmailInput(e.target.value);
                      e.target.value == ""
                        ? setProductPageEmailInputIcon(false)
                        : setProductPageEmailInputIcon(true);
                      productPageEmailInputRef.current.style.borderBottom =
                        "1px solid #D8D8D8";
                    }}
                    ref={productPageEmailInputRef}
                    value={productPageEmailInput}
                    type="text"
                    placeholder="Enter your email*"
                    className="border-b border-[#D8D8D8] outline-none w-full py-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProductPageEmailInput("");
                      setProductPageEmailInputIcon(false);
                    }}
                    className={
                      productPageEmailInputIcon
                        ? "absolute top-1/2 -translate-y-1/2 right-0"
                        : "hidden"
                    }
                  >
                    <p>
                      <AiFillCloseCircle />
                    </p>
                  </button>
                </div>
                <div className="flex w-full items-center gap-2">
                  <input type="checkbox" id="remember-data" />
                  {/* <Checkbox
                    // {...label}
                    color="default"
                    id="remember-data"
                  /> */}
                  <label htmlFor="remember-data" className="text-sm">
                    <p>
                      Save my name, email and website in this browser for the
                      next time I comment
                    </p>
                  </label>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p>Your Rating*</p>
                  <div className="flex gap-1 items-center text-xl">
                    <div
                      ref={starOne}
                      onClick={() => {
                        setSelectedStars(1);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starTwo}
                      onClick={() => {
                        setSelectedStars(2);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starThree}
                      onClick={() => {
                        setSelectedStars(3);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starFour}
                      onClick={() => {
                        setSelectedStars(4);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                    <div
                      ref={starFive}
                      onClick={() => {
                        setSelectedStars(5);
                      }}
                    >
                      <AiOutlineStar />
                    </div>
                  </div>
                </div>
                <button id="btn-border-dark" className="border px-7 py-1">
                  {addingDataIndicator}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <h4>Similar Items</h4>
      <ProductPageResponsiveSwiper />
      <Footer />
    </motion.section>
  );
}

export default ProductPage;
