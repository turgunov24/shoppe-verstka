//hooks
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//icons
import { AiFillCloseCircle } from "react-icons/ai";
import { GrPaypal } from "react-icons/gr";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//additional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { CircularProgress, Radio } from "@mui/material";
import { dataBase } from "../../data/firebase/firebase-setup";
import { getDocs, updateDoc, doc, collection } from "firebase/firestore";
import { navLinks } from "../../data/navbar-data/navLinks";

function CheckoutPage() {
  //hooks
  const navigate = useNavigate();
  //INPUTS-DATA
  //coupon-code-input
  const [couponCodeInput, setCouponCodeInput] = useState(null);
  const [couponCodeIcon, setCouponCodeIcon] = useState(false);
  //first-name-input
  const [firstNameInput, setFirstNameInput] = useState(null);
  const [firstNameIcon, setFirstNameIcon] = useState(false);
  const firstNameRef = useRef("");
  //last-name-input
  const [lastNameInput, setLastNameInput] = useState(null);
  const [lastNameIcon, setLastNameIcon] = useState(false);
  const lastNameRef = useRef("");
  //coutry-input
  const [countryInput, setcountryInput] = useState(null);
  const [countryIcon, setCountryIcon] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [countryDropdownIcon, setcountryDropdownIcon] = useState(false);
  const countryRef = useRef("");
  //company-name-input
  const [companyNameInput, setCompanyNameInput] = useState(null);
  const [companyNameIcon, setCompanyNameIcon] = useState(false);
  const companyNameRef = useRef("");
  //street-address-input
  const [streetAddressInput, setStreetAddressInput] = useState(null);
  const [streetAddressIcon, setStreetAddressIcon] = useState(false);
  const streetAddressRef = useRef("");
  //post-code-input
  const [postCodeInput, setPostCodeInput] = useState(null);
  const [postCodeIcon, setPostCodeIcon] = useState(false);
  const postCodeRef = useRef("");
  //city-input
  const [cityInput, setCityInput] = useState(null);
  const [cityIcon, setCityIcon] = useState(false);
  const cityRef = useRef("");
  //phone-input
  const [phoneInput, setPhoneInput] = useState(null);
  const [phoneIcon, setPhoneIcon] = useState(false);
  const phoneRef = useRef("");
  //email-input
  const [emailInput, setEmailInput] = useState(null);
  const [emailIcon, setEmailIcon] = useState(false);
  const emailRef = useRef("");
  //order-notes-input
  const [orderNotesInput, setOrderNotesInput] = useState(null);
  const [orderNotesIcon, setOrderNotesIcon] = useState(false);
  const orderNotesRef = useRef("");

  //--------------------PAYMENT_METHOD_INPUTS-------------------//
  //direct-bank-transfer
  const [directBankTransferInput, setDirectBankTransferInput] = useState(null);
  const [directBankTransferIcon, setDirectBankTransferIcon] = useState(false);
  const directBankTransferRef = useRef("");
  //check-payments
  const [checkPaymentsInput, setCheckPaymentsInput] = useState(null);
  const [checkPaymentsIcon, setCheckPaymentsIcon] = useState(false);
  const checkPaymentsRef = useRef("");
  //cash-on-delivery
  const [cashOnDeliveryInput, setCashOnDeliveryInput] = useState(null);
  const [cashOnDeliveryIcon, setCashOnDeliveryIcon] = useState(false);
  const cashOnDeliveryRef = useRef("");
  //paypal-input
  const [paypalInput, setPaypalInput] = useState(null);
  const [paypalIcon, setPaypalIcon] = useState(false);
  const paypalRef = useRef("");
  //select-payment-toggle
  const [selectPaymentToggle, setSelectPaymentToggle] = useState(0);
  //place-order-button-text
  const [pleaceOrderButtonText, setPleaceOrderButtonText] =
    useState("PLACE ORDER");
  useEffect(() => {
    selectPaymentToggle != 0 && setPleaceOrderButtonText("PLACE ORDER ");
  }, [selectPaymentToggle]);

  //GET_COUNTRY
  const [allCountry, setAllCountry] = useState(null);
  const [foundedCountry, setFoundedCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const getCountry = async () => {
    const URL = "https://restcountries.com/v3.1/all";
    fetch(URL)
      .then((res) => res.json())
      .then((json) => setAllCountry(json));
  };
  useEffect(() => {
    getCountry();
  }, []);
  //searching-country
  const searchCountry = (e) => {
    const founded = allCountry.filter((country) =>
      country.name.common.toLowerCase().includes(e.toLowerCase())
    );
    setFoundedCountry(founded);
  };

  //----------------FIREBASE----------------//
  const usersCollection = collection(dataBase, "login-base");
  const [usersList, setUsersList] = useState(null);
  const [orders, setOrders] = useState(null);
  // const userDOC = doc(
  //   dataBase,
  //   "login-base",
  //   JSON.parse(localStorage.getItem("user")).id
  // );

  //GET
  const getData = async () => {
    const data = await getDocs(usersCollection);
    setUsersList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  useEffect(() => {
    getData();
  }, []);
  //INPUT-REFS
  const [inputRefs, setInputRefs] = useState([
    firstNameRef,
    lastNameRef,
    companyNameRef,
    streetAddressRef,
    postCodeRef,
    cityRef,
    phoneRef,
    emailRef,
  ]);
  const [paymentMethodRefs, setPaymentMethodRefs] = useState([
    directBankTransferRef,
    checkPaymentsRef,
    cashOnDeliveryRef,
    paypalRef,
  ]);
  console.log(orders);
  //POST
  const updateData = async () => {
    orders.sort((a, b) => a.orderNumber - b.orderNumber);
    let date = new Date();
    orders.push({
      cardNumber: paymentMethodRefs.find((input) => input.current.value != "")
        .current.value,
      orderNote: orderNotesInput && orderNotesInput,
      orderDate: date.toString(),
      orderNumber:
        orders.length < 1 ? 1 : orders[orders.length - 1].orderNumber + 1,
      order: JSON.parse(localStorage.getItem("user")).shoppingbag,
    });
    setPleaceOrderButtonText("ORDERING...");
    const userDoc = doc(
      dataBase,
      "login-base",
      JSON.parse(localStorage.getItem("user")).id
    );
    await updateDoc(userDoc, {
      companyName: companyNameInput,
      country: selectedCountry,
      streetAddress: streetAddressInput,
      postCode: postCodeInput,
      city: cityInput,
      phone: phoneInput,
      order: orders,
      shoppingbag: [],
    });
    setPleaceOrderButtonText("ORDERED");
    setUpdateLocalStorageToggle(true);
    setTimeout(() => {
      setPleaceOrderButtonText("PLACE ORDER");
      setTimeout(() => {
        navigate("/home-page");
      }, 500);
    }, 1500);
  };

  const checkData = () => {
    const emptyInputToggle = inputRefs.every(
      (input) => input.current.value != ""
    );
    if (emptyInputToggle && selectedCountry && selectPaymentToggle != 0) {
      if (
        emailInput == JSON.parse(localStorage.getItem("user")).email &&
        firstNameInput == JSON.parse(localStorage.getItem("user")).firstName &&
        lastNameInput == JSON.parse(localStorage.getItem("user")).lastName &&
        paymentMethodRefs.some((input) => input.current.value != "")
      ) {
        updateData();
      } else {
        if (emailInput != JSON.parse(localStorage.getItem("user")).email) {
          emailRef.current.value = "ERROR EMAIL";
        }
        if (
          firstNameInput != JSON.parse(localStorage.getItem("user")).firstName
        ) {
          firstNameRef.current.value = "ERROR FIRST NAME";
        }
        if (
          lastNameInput != JSON.parse(localStorage.getItem("user")).lastName
        ) {
          lastNameRef.current.value = "ERROR LAST NAME";
        }
        if (paymentMethodRefs.every((input) => input.current.value == "")) {
          setPleaceOrderButtonText("ENTER CARD NUMBER");
        }
      }
    } else {
      if (!emptyInputToggle) {
        inputRefs.forEach((input) => {
          if (input.current.value == "") {
            input.current.style.borderBottom = "1px solid red";
          }
        });
      }
      if (!selectedCountry) {
        setCountryDropdown(true);
        countryRef.current.style.borderBottom = "1px solid red";
      }
      if (!selectPaymentToggle) {
        setPleaceOrderButtonText("SELECT PAYMENT METHOD");
      }
    }
  };

  //CALCULATE_PRICE
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (usersList) {
      let price = 0;
      const user = usersList.find(
        (user) => user.email == JSON.parse(localStorage.getItem("user")).email
      );
      user.shoppingbag.forEach((product) => {
        product.orderCount > 1
          ? (price += product.orderCount * product.price)
          : (price += product.price);
      });
      setTotalPrice(price);
      setUpdateLocalStorageToggle(false);
      setOrders(
        usersList.find(
          (user) => user.email == JSON.parse(localStorage.getItem("user")).email
        ).order
      );
    }
  }, [usersList]);
  //UPDATE-LOCALSTORAGE
  const [updateLocalStorageToggle, setUpdateLocalStorageToggle] =
    useState(true);
  const updateLocalStorage = () => {
    const user = usersList.find(
      (user) => user.email == JSON.parse(localStorage.getItem("user")).email
    );
    localStorage.setItem("user", JSON.stringify(user));
  };
  useEffect(() => {
    if (updateLocalStorageToggle) {
      getData();
    }
  }, [updateLocalStorageToggle]);
  useEffect(() => {
    !updateLocalStorageToggle && updateLocalStorage();
  }, [updateLocalStorageToggle]);

  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full min-h-screen gap-5"
    >
      <Navbar />
      <h4 className="w-full text-start text-lg font-bold mt-28 md:text-center md:text-2xl md:mt-32">
        Checkout
      </h4>
      <div className="flex flex-wrap gap-1 w-full">
        <div className="flex flex-wrap gap-1 w-full">
          <p>Returning customer ?</p>
          <h6 onClick={() => navigate("/")} className="font-bold">
            Click here to login in
          </h6>
        </div>
        <div className="flex flex-wrap gap-1 w-full">
          <p>Have a coupon ?</p>
          <h6 className="font-bold">
            <label htmlFor="apply-coupon">Click here to enter your code</label>
          </h6>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full p-3 border border-borderGray md:w-[400px] lg:w-[450px] xl:w-[500px]">
        <p>If you have a coupon code, please apply it below.</p>
        <div className="flex gap-3 justify-between items-end w-full">
          <div className="relative w-full">
            <input
              id="apply-coupon"
              onChange={(e) => {
                setCouponCodeInput(e.target.value);
                e.target.value == ""
                  ? setCouponCodeIcon(false)
                  : setCouponCodeIcon(true);
              }}
              value={couponCodeInput}
              type="text"
              placeholder="Coupon code"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setCouponCodeInput("");
                setCouponCodeIcon(false);
              }}
              className={
                couponCodeIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          <button id="btn-border-dark" className="py-1 px-5">
            APPLY
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10 w-full md:flex-row md:gap-14">
        {/* -----------------BILLING_DETAILS-------------- */}
        <div className="flex flex-col w-full gap-5 md:gap-7 md:w-[400px] lg:w-[450px] xl:w-[500px]">
          <h4 className="text-lg font-bold w-full md:text-xl">
            Billing Details
          </h4>
          <div className="flex flex-col w-full gap-5 md:flex-row md:gap-2">
            {/* FIRST_NAME_INPUT */}
            <div className="relative w-full">
              <input
                ref={firstNameRef}
                onChange={(e) => {
                  firstNameRef.current.style.borderBottom = "";
                  setFirstNameInput(e.target.value);
                  e.target.value == ""
                    ? setFirstNameIcon(false)
                    : setFirstNameIcon(true);
                }}
                value={firstNameInput}
                type="text"
                placeholder="First Name *"
                className="border-b border-[#D8D8D8] outline-none w-full py-1"
              />
              <button
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
            {/* LAST_NAME_INPUT */}
            <div className="relative w-full">
              <input
                ref={lastNameRef}
                onChange={(e) => {
                  lastNameRef.current.style.borderBottom = "";
                  setLastNameInput(e.target.value);
                  e.target.value == ""
                    ? setLastNameIcon(false)
                    : setLastNameIcon(true);
                }}
                value={lastNameInput}
                type="text"
                placeholder="Last Name *"
                className="border-b border-[#D8D8D8] outline-none w-full py-1"
              />
              <button
                onClick={() => {
                  setLastNameInput("");
                  setLastNameIcon(false);
                }}
                className={
                  lastNameIcon
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
          {/* ----------------COUNTRY_INPUT------------ */}
          <div
            className={
              countryDropdown
                ? "border-b border-[#D8D8D8] w-full h-max overflow-hidden rounded-md"
                : "border-b border-[#D8D8D8] w-full h-12 overflow-hidden rounded-md"
            }
          >
            <div
              className="relative h-12"
              onClick={() => {
                setCountryDropdown(!countryDropdown);
                setcountryDropdownIcon(!countryDropdownIcon);
              }}
            >
              <input
                type="text"
                disabled
                value={selectedCountry}
                className="w-full h-full bg-[white]"
                placeholder="Country *"
              />
              <h4
                className={
                  countryDropdownIcon
                    ? "absolute top-1/2 -translate-y-1/2 right-0 rotate-90 duration-200 text-sm"
                    : "absolute top-1/2 -translate-y-1/2 right-0 -rotate-90 duration-200 text-sm"
                }
              >
                {
                  navLinks.icons.find((icon) => icon.name == "arrowDropdown")
                    .icon
                }
              </h4>
            </div>
            <div className="relative w-full mt-2">
              <input
                ref={countryRef}
                onChange={(e) => {
                  countryRef.current.style.borderBottom = "";
                  searchCountry(e.target.value);
                  setcountryInput(e.target.value);
                  e.target.value == ""
                    ? setCountryIcon(false)
                    : setCountryIcon(true);
                }}
                value={countryInput}
                type="text"
                placeholder="Search Country"
                className="border-b border-[#D8D8D8] outline-none w-full py-1"
              />
              <button
                onClick={() => {
                  setcountryInput("");
                  setCountryIcon(false);
                  setFoundedCountry(null);
                }}
                className={
                  countryIcon
                    ? "absolute top-1/2 -translate-y-1/2 right-0"
                    : "hidden"
                }
              >
                <p>
                  <AiFillCloseCircle />
                </p>
              </button>
            </div>
            {foundedCountry &&
              foundedCountry.map((country, key) => (
                <div
                  key={key}
                  onClick={() => {
                    setCountryDropdown(false);
                    setcountryDropdownIcon(false);
                    setSelectedCountry(country.name.common);
                    setcountryInput("");
                    setCountryIcon(false);
                    setFoundedCountry(null);
                  }}
                  className="flex items-center justify-start w-full py-1 rounded-sm duration-200 hover:bg-whiteGray"
                >
                  {country.name.common}
                </div>
              ))}
          </div>
          {/* COMPANY_NAME_INPUT */}
          <div className="relative w-full">
            <input
              ref={companyNameRef}
              onChange={(e) => {
                companyNameRef.current.style.borderBottom = "";
                setCompanyNameInput(e.target.value);
                e.target.value == ""
                  ? setCompanyNameIcon(false)
                  : setCompanyNameIcon(true);
              }}
              value={companyNameInput}
              type="text"
              placeholder="Company Name"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setCompanyNameInput("");
                setCompanyNameIcon(false);
              }}
              className={
                companyNameIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/* STREET_ADDRESS_INPUT */}
          <div className="relative w-full">
            <input
              ref={streetAddressRef}
              onChange={(e) => {
                streetAddressRef.current.style.borderBottom = "";
                setStreetAddressInput(e.target.value);
                e.target.value == ""
                  ? setStreetAddressIcon(false)
                  : setStreetAddressIcon(true);
              }}
              value={streetAddressInput}
              type="text"
              placeholder="Street Address *"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setStreetAddressInput("");
                setStreetAddressIcon(false);
              }}
              className={
                streetAddressIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/* POST_CODE_INPUT */}
          <div className="relative w-full">
            <input
              ref={postCodeRef}
              onChange={(e) => {
                postCodeRef.current.style.borderBottom = "";
                setPostCodeInput(e.target.value);
                e.target.value == ""
                  ? setPostCodeIcon(false)
                  : setPostCodeIcon(true);
              }}
              value={postCodeInput}
              type="text"
              placeholder="Postcode / ZIP *"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setPostCodeInput("");
                setPostCodeIcon(false);
              }}
              className={
                postCodeIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/*CITY_INPUT */}
          <div className="relative w-full">
            <input
              ref={cityRef}
              onChange={(e) => {
                cityRef.current.style.borderBottom = "";
                setCityInput(e.target.value);
                e.target.value == "" ? setCityIcon(false) : setCityIcon(true);
              }}
              value={cityInput}
              type="text"
              placeholder="Town / City *"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setCityInput("");
                setCityIcon(false);
              }}
              className={
                cityIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/*PHONE_INPUT */}
          <div className="relative w-full">
            <input
              ref={phoneRef}
              onChange={(e) => {
                phoneRef.current.style.borderBottom = "";
                setPhoneInput(e.target.value);
                e.target.value == "" ? setPhoneIcon(false) : setPhoneIcon(true);
              }}
              value={phoneInput}
              type="text"
              placeholder="Phone *"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setPhoneInput("");
                setPhoneIcon(false);
              }}
              className={
                phoneIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/*EMAIL_INPUT */}
          <div className="relative w-full">
            <input
              ref={emailRef}
              onChange={(e) => {
                emailRef.current.style.borderBottom = "";
                setEmailInput(e.target.value);
                e.target.value == "" ? setEmailIcon(false) : setEmailIcon(true);
              }}
              value={emailInput}
              type="text"
              placeholder="Email *"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setEmailInput("");
                setEmailIcon(false);
              }}
              className={
                emailIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          <div className="w-full flex flex-col gap-1 mt-5">
            <h4 className="font-semibold">Create an account</h4>
            <h4 className="font-semibold">Ship to different address</h4>
          </div>
          {/* ORDER_NOTES_INPUT */}
          <div className="relative w-full mt-5">
            <input
              onChange={(e) => {
                setOrderNotesInput(e.target.value);
                e.target.value == ""
                  ? setOrderNotesIcon(false)
                  : setOrderNotesIcon(true);
              }}
              value={orderNotesInput}
              type="text"
              placeholder="Order notes"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={() => {
                setOrderNotesInput("");
                setOrderNotesIcon(false);
              }}
              className={
                orderNotesIcon
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
        {/* -----------------YOUR_ORDER-------------- */}
        <div className="flex flex-col w-full gap-7 md:w-[400px] lg:w-[450px] xl:w-[500px]">
          <h4 className="text-lg font-bold w-full md:text-xl">Your Order</h4>
          <div className="flex flex-col w-full bg-gray1 rounded-md p-5 gap-5 lg:p-10 md:rounded-none">
            <div className="flex items-center justify-between flex-wrap">
              <h4>PRODUCT</h4>
              <h4>TOTAL</h4>
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex flex-col items-center w-full gap-5">
              {usersList ? (
                usersList
                  .find(
                    (user) =>
                      user.email ==
                      JSON.parse(localStorage.getItem("user")).email
                  )
                  .shoppingbag.map((order) => (
                    <div className="flex items-center justify-between w-full">
                      <p>{order.title.split(" ", 2)}</p>
                      <p>
                        ${" "}
                        {order.orderCount > 1
                          ? (order.orderCount * order.price)
                              .toString()
                              .split(".", 1)
                          : order.price.toString().split(".", 1)}
                      </p>
                    </div>
                  ))
              ) : (
                <CircularProgress />
              )}
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex items-center justify-between flex-wrap">
              <h4>SUBTOTAL</h4>
              <p>$ {totalPrice.toString().split(".", 1)}</p>
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex items-center justify-between flex-wrap">
              <h4>SHIPPING</h4>
              <p>Free shipping</p>
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            <div className="flex items-center justify-between flex-wrap">
              <h4>TOTAL</h4>
              <h4 className="font-bold">
                $ {Number(totalPrice.toString().split(".", 1)) + 5}
              </h4>
            </div>
            <div className="w-full h-[1px] rounded-md bg-whiteGray"></div>
            {/* -------------DIRECT_BANK_TRANSFER------------ */}
            <div className="flex flex-col w-full mt-5 gap-2">
              <div
                onClick={() => {
                  setSelectPaymentToggle(1);
                  setCheckPaymentsInput("");
                  setCashOnDeliveryInput("");
                  setPaypalInput("");
                  setCheckPaymentsIcon(false);
                  setCashOnDeliveryIcon(false);
                  setPaypalIcon(false);
                }}
                className="flex items-center justify-start gap-3 w-full "
              >
                <input
                  name="payment"
                  type="radio"
                  id="direct-bank-transfer"
                  className="text-lg"
                />
                <label htmlFor="direct-bank-transfer" className="font-bold">
                  Direct bank transfer
                </label>
              </div>
              <p className={selectPaymentToggle == 1 ? "" : "hidden"}>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account
              </p>
              <div
                className={
                  selectPaymentToggle == 1 ? "relative w-full" : "hidden"
                }
              >
                <input
                  ref={directBankTransferRef}
                  onChange={(e) => {
                    setDirectBankTransferInput(e.target.value);
                    setPleaceOrderButtonText("PLACE ORDER");
                    e.target.value == ""
                      ? setDirectBankTransferIcon(false)
                      : setDirectBankTransferIcon(true);
                  }}
                  value={directBankTransferInput}
                  type="number"
                  placeholder="CardNumber"
                  className="border-b border-[#D8D8D8] bg-gray1 outline-none w-full py-1"
                />
                <button
                  onClick={() => {
                    setDirectBankTransferInput("");
                    setDirectBankTransferIcon(false);
                  }}
                  className={
                    directBankTransferIcon
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
            {/* -------------CHECK_PAYMENTS------------ */}
            <div className="flex flex-col w-full gap-2">
              <div
                onClick={() => {
                  setSelectPaymentToggle(2);
                  setDirectBankTransferInput("");
                  setCashOnDeliveryInput("");
                  setPaypalInput("");
                  setDirectBankTransferIcon(false);
                  setCashOnDeliveryIcon(false);
                  setPaypalIcon(false);
                }}
                className="flex items-center justify-start gap-3 w-full "
              >
                <input
                  name="payment"
                  type="radio"
                  id="check-payments"
                  className="text-lg"
                />
                <label htmlFor="check-payments" className="font-bold">
                  Check payments
                </label>
              </div>
              <p className={selectPaymentToggle == 2 ? "" : "hidden"}>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account
              </p>
              <div
                className={
                  selectPaymentToggle == 2 ? "relative w-full" : "hidden"
                }
              >
                <input
                  ref={checkPaymentsRef}
                  onChange={(e) => {
                    setPleaceOrderButtonText("PLACE ORDER");
                    setCheckPaymentsInput(e.target.value);
                    e.target.value == ""
                      ? setCheckPaymentsIcon(false)
                      : setCheckPaymentsIcon(true);
                  }}
                  value={checkPaymentsInput}
                  type="number"
                  placeholder="CardNumber"
                  className="border-b border-[#D8D8D8] bg-gray1 outline-none w-full py-1"
                />
                <button
                  onClick={() => {
                    setCheckPaymentsInput("");
                    setCheckPaymentsIcon(false);
                  }}
                  className={
                    checkPaymentsIcon
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
            {/* -------------CASH_ON_DELIVERY------------ */}
            <div className="flex flex-col w-full gap-2">
              <div
                onClick={() => {
                  setSelectPaymentToggle(3);
                  setDirectBankTransferInput("");
                  setCheckPaymentsInput("");
                  setPaypalInput("");
                  setDirectBankTransferIcon(false);
                  setCheckPaymentsIcon(false);
                  setPaypalIcon(false);
                }}
                className="flex items-center justify-start gap-3 w-full "
              >
                <input
                  name="payment"
                  type="radio"
                  id="cash-on-delivery"
                  className="text-lg"
                />
                <label htmlFor="cash-on-delivery" className="font-bold">
                  Cash on delivery
                </label>
              </div>
              <p className={selectPaymentToggle == 3 ? "" : "hidden"}>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account
              </p>
              <div
                className={
                  selectPaymentToggle == 3 ? "relative w-full" : "hidden"
                }
              >
                <input
                  ref={cashOnDeliveryRef}
                  onChange={(e) => {
                    setPleaceOrderButtonText("PLACE ORDER");
                    setCashOnDeliveryInput(e.target.value);
                    e.target.value == ""
                      ? setCashOnDeliveryIcon(false)
                      : setCashOnDeliveryIcon(true);
                  }}
                  value={cashOnDeliveryInput}
                  type="number"
                  placeholder="CardNumber"
                  className="border-b border-[#D8D8D8] bg-gray1 outline-none w-full py-1"
                />
                <button
                  onClick={() => {
                    setCashOnDeliveryInput("");
                    setCashOnDeliveryIcon(false);
                  }}
                  className={
                    cashOnDeliveryIcon
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
            {/* -------------PAYPAL------------ */}
            <div className="flex flex-col w-full gap-2">
              <div
                onClick={() => {
                  setSelectPaymentToggle(4);
                  setDirectBankTransferInput("");
                  setCheckPaymentsInput("");
                  setCashOnDeliveryInput("");
                  setDirectBankTransferIcon(false);
                  setCheckPaymentsIcon(false);
                  setCashOnDeliveryIcon(false);
                }}
                className="flex items-center justify-start gap-3 w-full "
              >
                <input
                  name="payment"
                  type="radio"
                  id="paypal"
                  className="text-lg"
                />
                <label
                  htmlFor="paypal"
                  className="font-bold flex items-center gap-2"
                >
                  PayPal <GrPaypal />
                </label>
              </div>
              <p className={selectPaymentToggle == 4 ? "" : "hidden"}>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account
              </p>
              <div
                className={
                  selectPaymentToggle == 4 ? "relative w-full" : "hidden"
                }
              >
                <input
                  ref={paypalRef}
                  onChange={(e) => {
                    setPleaceOrderButtonText("PLACE ORDER");
                    setPaypalInput(e.target.value);
                    e.target.value == ""
                      ? setPaypalIcon(false)
                      : setPaypalIcon(true);
                  }}
                  value={paypalInput}
                  type="number"
                  placeholder="CardNumber"
                  className="border-b border-[#D8D8D8] bg-gray1 outline-none w-full py-1"
                />
                <button
                  onClick={() => {
                    setPaypalInput("");
                    setPaypalIcon(false);
                  }}
                  className={
                    paypalIcon
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
            <button
              onClick={checkData}
              id="btn-border-dark"
              className="py-1 w-full"
            >
              {pleaceOrderButtonText}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}

export default CheckoutPage;
