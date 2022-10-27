//hooks
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ProfilePageTab from "../../components/profile-page-tab/profile-page-tab";
//icons
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { CircularProgress } from "@mui/material";
//addtional
import { motion } from "framer-motion";
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { dataBase } from "../../data/firebase/firebase-setup";
import { actions } from "../../data/redux/reducers/allData";
import { navLinks } from "../../data/navbar-data/navLinks";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //profile-page-tab-index-value
  const [profilePageTabValue, setProfilePageTabValue] = useState(0);
  ///////////////profile-page-account-details-data//////////
  //first-name-input-data
  const [accountDetailsFirstName, setAccountDetailsFirstName] = useState(null);
  const [accountDetailsFirstNameIcon, setAccountDetailsFirstNameIcon] =
    useState(false);
  const accountDetailsFirstNameRef = useRef(null);
  //last-name-input-data
  const [accountDetailsLastName, setAccountDetailsLastName] = useState(null);
  const [accountDetailsLastNameIcon, setAccountDetailsLastNameIcon] =
    useState(false);
  const accountDetailsLastNameRef = useRef(null);
  //display-name-input-data
  const [accountDetailsDisplayName, setAccountDetailsDisplayName] =
    useState(null);
  const [accountDetailsDisplayNameIcon, setAccountDetailsDisplayNameIcon] =
    useState(false);
  const accountDetailsDisplayNameRef = useRef(null);
  //email-address-input-data
  const [accountDetailsEmail, setAccountDetailsEmail] = useState(null);
  const [accountDetailsEmailIcon, setAccountDetailsEmailIcon] = useState(false);
  const accountDetailsEmailRef = useRef(null);
  //current-password-input-data
  const [accountDetailsCurrentPassword, setAccountDetailsCurrentPassword] =
    useState(null);
  const [
    accountDetailsCurrentPasswordIcon,
    setAccountDetailsCurrentPasswordIcon,
  ] = useState(false);
  const accountDetailsCurrentPasswordRef = useRef(null);
  //new-password-input-data
  const [accountDetailsNewPassword, setAccountDetailsNewPassword] =
    useState(null);
  const [accountDetailsNewPasswordIcon, setAccountDetailsNewPasswordIcon] =
    useState(false);
  const accountDetailsNewpasswordRef = useRef(null);
  //confirm-new-password
  const [
    accountDetailsConfirmNewPassword,
    setAccountDetailsConfirmNewPassword,
  ] = useState(null);
  const [
    accountDetailsConfirmNewPasswordIcon,
    setAccountDetailsConfirmNewPasswordIcon,
  ] = useState(false);
  const accountDetailsConfirmNewPasswordRef = useRef(null);
  /////////firebase-data
  const usersCollection = collection(dataBase, "login-base");
  const [usersList, setUsersList] = useState(null);

  //account-details-form-submit-function
  const [wantDisplayName, setWantDisplayName] = useState(false);
  const [wantPassword, setWantPassword] = useState(false);
  const [isChecking, setIsChecking] = useState("SAVE CHANGES");
  const accountDetailsInputsRefs = [
    accountDetailsFirstNameRef,
    accountDetailsNewpasswordRef,
    accountDetailsDisplayNameRef,
    accountDetailsCurrentPasswordRef,
    accountDetailsNewpasswordRef,
    accountDetailsConfirmNewPassword,
    accountDetailsEmailRef,
  ];
  //update-localstorage
  const updateLocalStorage = async () => {
    const data = await getDocs(usersCollection);
    setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    usersList &&
      localStorage.setItem(
        "user",
        JSON.stringify(
          usersList.find(
            (user) =>
              user.email == JSON.parse(localStorage.getItem("user").email)
          )
        )
      );
  }, [usersList]);
  const accountDetailsFormSubmitted = (e) => {
    e.preventDefault();
    //checking-inputs
    if (
      accountDetailsFirstName &&
      accountDetailsLastName &&
      accountDetailsDisplayName &&
      accountDetailsEmailRef &&
      !accountDetailsCurrentPassword &&
      !accountDetailsNewPassword &&
      !accountDetailsConfirmNewPassword
    ) {
      setWantDisplayName(true);
    } else if (
      !accountDetailsFirstName &&
      !accountDetailsLastName &&
      !accountDetailsDisplayName &&
      accountDetailsEmailRef &&
      accountDetailsCurrentPassword &&
      accountDetailsNewPassword &&
      accountDetailsConfirmNewPassword
    ) {
      setWantPassword(true);
    } else if (
      accountDetailsFirstName &&
      accountDetailsLastName &&
      accountDetailsDisplayName &&
      accountDetailsCurrentPassword &&
      accountDetailsNewPassword &&
      accountDetailsConfirmNewPassword &&
      accountDetailsEmailRef
    ) {
      setWantDisplayName(true);
      setWantPassword(true);
    } else {
      accountDetailsInputsRefs.forEach((input) => {
        if (input.current.value == "") {
          input.current.style.borderBottom = "1px solid red";
        }
      });
    }
    //updating-funtions
    //----------------------DISPLAY_NAME-UPDATE---------------------//
    if (wantDisplayName && !wantPassword) {
      setIsChecking("CHECKING");
      if (
        accountDetailsEmail == JSON.parse(localStorage.getItem("user")).email
      ) {
        setTimeout(() => {
          const addData = async () => {
            setIsChecking("UPDATING");
            const userDoc = doc(
              dataBase,
              "login-base",
              JSON.parse(localStorage.getItem("user")).id
            );

            await updateDoc(userDoc, {
              firstName: accountDetailsFirstName,
              lastName: accountDetailsLastName,
              displayName: accountDetailsDisplayName,
            });
            updateLocalStorage();
            setIsChecking("UPDATED");
            setTimeout(() => {
              setIsChecking("SAVE CHANGES");
            }, 1000);
          };
          addData();
        }, 1000);
      } else {
        setTimeout(() => {
          setIsChecking("ERROR EMAIL");
          setTimeout(() => {
            setIsChecking("SAVE CHANGES");
          }, 1000);
        }, 1000);
      }
    }
    //--------------------PASSWORD_UPDATE----------------------//
    else if (!wantDisplayName && wantPassword) {
      setIsChecking("CHECKING");
      if (
        accountDetailsEmail == JSON.parse(localStorage.getItem("user")).email
      ) {
        setTimeout(() => {
          if (
            JSON.parse(localStorage.getItem("user")).password ==
            accountDetailsCurrentPassword
          ) {
            if (accountDetailsNewPassword == accountDetailsConfirmNewPassword) {
              setIsChecking("UPDATING");
              const userDoc = doc(
                dataBase,
                "login-base",
                JSON.parse(localStorage.getItem("user")).id
              );
              const addData = async () => {
                await updateDoc(userDoc, {
                  password: accountDetailsNewPassword,
                });
                updateLocalStorage();
                setIsChecking("UPDATED");
                setTimeout(() => {
                  setIsChecking("SAVE CHANGES");
                }, 1000);
              };
              addData();
            } else {
              accountDetailsConfirmNewPasswordRef.current.style.borderBottom =
                "1px solid red";
              setIsChecking("SAVE CHANGES");
            }
          } else {
            setAccountDetailsCurrentPassword("ERROR PASSWORD");
            setTimeout(() => {
              setIsChecking("SAVE CHANGES");
            }, 1000);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setIsChecking("ERROR EMAIL");
          setTimeout(() => {
            setIsChecking("SAVE CHANGES");
          }, 1000);
        }, 1000);
      }
    }

    //-------------------DISPLAU_NAME_and_PASSWORD_UPDATE-------------------//
    else if (wantDisplayName && wantPassword) {
      setIsChecking("CHECKING");
      if (
        accountDetailsEmail == JSON.parse(localStorage.getItem("user")).email
      ) {
        setTimeout(() => {
          if (
            JSON.parse(localStorage.getItem("user")).password ==
            accountDetailsCurrentPassword
          ) {
            if (accountDetailsNewPassword == accountDetailsConfirmNewPassword) {
              setIsChecking("UPDATING");
              const userDoc = doc(
                dataBase,
                "login-base",
                JSON.parse(localStorage.getItem("user")).id
              );
              const addData = async () => {
                await updateDoc(userDoc, {
                  displayName: accountDetailsDisplayName,
                  firstName: accountDetailsFirstName,
                  lastName: accountDetailsLastName,
                  password: accountDetailsNewPassword,
                });
                updateLocalStorage();
                setIsChecking("UPDATED");
                setTimeout(() => {
                  setIsChecking("SAVE CHANGES");
                }, 1000);
              };
              addData();
            } else {
              accountDetailsConfirmNewPasswordRef.current.style.borderBottom =
                "1px solid red";
              setIsChecking("SAVE CHANGES");
            }
          } else {
            setAccountDetailsCurrentPassword("ERROR PASSWORD");
            setTimeout(() => {
              setIsChecking("SAVE CHANGES");
            }, 1000);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setIsChecking("ERROR EMAIL");
          setTimeout(() => {
            setIsChecking("SAVE CHANGES");
          }, 1000);
        }, 1000);
      }
    }
  };

  //------------------ORDERS------------------//
  const [orders, setOrders] = useState(null);
  const getOrders = async () => {
    setOrders(JSON.parse(localStorage.getItem("user")).order);
  };
  useEffect(() => {
    profilePageTabValue == 1 && getOrders();
  }, [profilePageTabValue]);

  // //calculate-price
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(totalPrice);
  let calculatePrice = (number) => {
    let price = 0;
    number.forEach((product) => {
      if (product.orderCount == 1) {
        price += product.price;
      } else {
        price += product.orderCount * product.price;
      }
    });
    setTotalPrice(price);
    console.log(price);
    return price;
  };
  //---------------ADDRESSES---------------//
  const [billingAddressToggle, setBillingAddressToggle] = useState(false);
  const [shippingAddressToggle, setShippingAddressToggle] = useState(false);
  //---------------SHIPPING-ADDRESS-INPUTS---------------//
  //first-name-input-data
  const [billingAddressFirstName, setBillingAddressFirstName] = useState(null);
  const [billingAddressFirstNameIcon, setBillingAddressFirstNameIcon] =
    useState(false);
  const billingAddressFirstNameRef = useRef("");
  //last-name-input-data
  const [billingAddressLastName, setBillingAddressLastName] = useState(null);
  const [billingAddressLastNameIcon, setBillingAddressLastNameIcon] =
    useState(false);
  const billingAddressLastNameRef = useRef("");
  //company-name-input-data
  const [billingAddressCompanyName, setBillingAddressCompanyName] =
    useState(null);
  const [billingAddressCompanyNameIcon, setBillingAddressCompanyNameIcon] =
    useState(false);
  const billingAddressCompanyNameRef = useRef("");
  //street-address-input-data
  const [billingAddressStreetAddress, setBillingAddressStreetAddress] =
    useState(null);
  const [billingAddressStreetAddressIcon, setBillingAddressStreetAddressIcon] =
    useState(false);
  const billingAddressStreetAddressRef = useRef("");
  //post-code-input-data
  const [billingAddressPostCode, setBillingAddressPostCode] = useState(null);
  const [billingAddressPostCodeIcon, setBillingAddressPostCodeIcon] =
    useState(false);
  const billingAddressPostCodeRef = useRef("");
  //city-input-data
  const [billingAddressCity, setBillingAddressCity] = useState(null);
  const [billingAddressCityIcon, setBillingAddressCityIcon] = useState(false);
  const billingAddressCityRef = useRef("");
  //phone-input-data
  const [billingAddressPhone, setBillingAddressPhone] = useState(null);
  const [billingAddressPhoneIcon, setBillingAddressPhoneIcon] = useState(false);
  const billingAddressPhoneRef = useRef("");
  //email-input-data
  const [billingAddressEmail, setBillingAddressEmail] = useState(null);
  const [billingAddressEmailIcon, setBillingAddressEmailIcon] = useState(false);
  const billingAddressEmailRef = useRef("");
  //country-input-data
  const [
    billingAddressCountryDropdownToggle,
    setBillingAddressCountryDropdownToggle,
  ] = useState(false);
  const [
    billingAddressCountryDropdownIcon,
    setBillingAddressCountryDropdownIcon,
  ] = useState(false);
  const [billingAddressSelectedCountry, setBillingAddressSelectedCountry] =
    useState(null);
  const [billingAddressFoundedCountry, setBillingAddressFoundedCountry] =
    useState(null);
  const [billingAddressCountry, setBillingAddressCountry] = useState(null);
  const [billingAddressCountryIcon, setBillingAddressCountryIcon] =
    useState(false);
  const billingAddressCountryRef = useRef("");
  //---------------SHIPPING-ADDRESS-INPUTS---------------//
  //first-name-input-data
  const [shippingAddressFirstName, setShippingAddressFirstName] =
    useState(null);
  const [shippingAddressFirstNameIcon, setShippingAddressFirstNameIcon] =
    useState(false);
  const shippingAddressFirstNameRef = useRef("");
  //last-name-input-data
  const [shippingAddressLastName, setShippingAddressLastName] = useState(null);
  const [shippingAddressLastNameIcon, setShippingAddressLastNameIcon] =
    useState(false);
  const shippingAddressLastNameRef = useRef("");
  //company-name-input-data
  const [shippingAddressCompanyName, setShippingAddressCompanyName] =
    useState(null);
  const [shippingAddressCompanyNameIcon, setShippingAddressCompanyNameIcon] =
    useState(false);
  const shippingAddressCompanyNameRef = useRef("");
  //street-address-input-data
  const [shippingAddressStreetAddress, setShippingAddressStreetAddress] =
    useState(null);
  const [
    shippingAddressStreetAddressIcon,
    setShippingAddressStreetAddressIcon,
  ] = useState(false);
  const shippingAddressStreetAddressRef = useRef("");
  //post-code-input-data
  const [shippingAddressPostCode, setShippingAddressPostCode] = useState(null);
  const [shippingAddressPostCodeIcon, setShippingAddressPostCodeIcon] =
    useState(false);
  const shippingAddressPostCodeRef = useRef("");
  //city-input-data
  const [shippingAddressCity, setShippingAddressCity] = useState(null);
  const [shippingAddressCityIcon, setShippingAddressCityIcon] = useState(false);
  const shippingAddressCityRef = useRef("");
  //phone-input-data
  const [shippingAddressPhone, setShippingAddressPhone] = useState(null);
  const [shippingAddressPhoneIcon, setShippingAddressPhoneIcon] =
    useState(false);
  const shippingAddressPhoneRef = useRef("");
  //email-input-data
  const [shippingAddressEmail, setShippingAddressEmail] = useState(null);
  const [shippingAddressEmailIcon, setShippingAddressEmailIcon] =
    useState(false);
  const shippingAddressEmailRef = useRef("");
  //country-input-data
  const [
    shippingAddressCountryDropdownToggle,
    setShippingAddressCountryDropdownToggle,
  ] = useState(false);
  const [
    shippingAddressCountryDropdownIcon,
    setShippingAddressCountryDropdownIcon,
  ] = useState(false);
  const [shippingAddressSelectedCountry, setShippingAddressSelectedCountry] =
    useState(null);
  const [shippingAddressFoundedCountry, setShippingAddressFoundedCountry] =
    useState(null);
  const [shippingAddressCountry, setShippingAddressCountry] = useState(null);
  const [shippingAddressCountryIcon, setShippingAddressCountryIcon] =
    useState(false);
  const shippingAddressCountryRef = useRef("");
  //input-refs
  const [billingInputRefs, setBillingInputRefs] = useState([
    billingAddressFirstNameRef,
    billingAddressLastNameRef,
    billingAddressCompanyNameRef,
    billingAddressStreetAddressRef,
    billingAddressPostCodeRef,
    billingAddressCityRef,
    billingAddressPhoneRef,
    billingAddressEmailRef,
  ]);
  const [shippingInputRefs, setShippingInputRefs] = useState([
    shippingAddressFirstNameRef,
    shippingAddressLastNameRef,
    shippingAddressCompanyNameRef,
    shippingAddressStreetAddressRef,
    shippingAddressPostCodeRef,
    shippingAddressCityRef,
    shippingAddressPhoneRef,
    shippingAddressEmailRef,
  ]);
  //---------------UPDATING-BILLING-ADDRESSES--------------//
  const [
    billingAddressSaveChangesButtonText,
    setBillingAddressSaveChangesButtonText,
  ] = useState("SAVE CHANGES");
  //GET_COUNTRY
  const [allCountry, setAllCountry] = useState(null);
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
  const billingAddressSearchCountry = (e) => {
    const founded = allCountry.filter((country) =>
      country.name.common.toLowerCase().includes(e.toLowerCase())
    );
    setBillingAddressFoundedCountry(founded);
  };
  //update-localstorage
  const updateLocalStorageForAddresses = async () => {
    const data = await getDocs(usersCollection);
    const res = await data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const findedUser = res.find(
      (user) => user.email == JSON.parse(localStorage.getItem("user")).email
    );
    localStorage.setItem("user", JSON.stringify(findedUser));
    setBillingAddressSaveChangesButtonText("UPDATED");
    setTimeout(() => {
      setBillingAddressSaveChangesButtonText("SAVE CHANGES");
      setshippingAddressSaveChangesButtonText("SAVE CHANGES");

      navigate("/home-page");
    }, 1000);
  };
  //update-firebase
  const updateDataForBillingAddress = async () => {
    setBillingAddressSaveChangesButtonText("UPDATING...");
    const userDoc = doc(
      dataBase,
      "login-base",
      JSON.parse(localStorage.getItem("user")).id
    );
    await updateDoc(userDoc, {
      companyName: billingAddressCompanyName,
      country: billingAddressSelectedCountry,
      streetAddress: billingAddressStreetAddress,
      postCode: billingAddressPostCode,
      city: billingAddressCity,
      phone: billingAddressPhone,
    });
    updateLocalStorageForAddresses();
  };
  //update-billing-address
  const updateBillingAddressFunction = () => {
    const emptyInputToggle = billingInputRefs.every(
      (input) => input.current.value != ""
    );
    if (emptyInputToggle && billingAddressSelectedCountry) {
      if (
        billingAddressEmail == JSON.parse(localStorage.getItem("user")).email &&
        billingAddressFirstName ==
          JSON.parse(localStorage.getItem("user")).firstName &&
        billingAddressLastName ==
          JSON.parse(localStorage.getItem("user")).lastName
      ) {
        updateDataForBillingAddress();
      } else {
        if (
          billingAddressEmail != JSON.parse(localStorage.getItem("user")).email
        ) {
          billingAddressEmailRef.current.value = "ERROR EMAIL";
        }
        if (
          billingAddressFirstName !=
          JSON.parse(localStorage.getItem("user")).firstName
        ) {
          billingAddressFirstNameRef.current.value = "ERROR FIRST NAME";
        }
        if (
          billingAddressLastName !=
          JSON.parse(localStorage.getItem("user")).lastName
        ) {
          billingAddressLastNameRef.current.value = "ERROR LAST NAME";
        }
      }
    } else {
      if (!emptyInputToggle) {
        billingInputRefs.forEach((input) => {
          if (input.current.value == "") {
            input.current.style.borderBottom = "1px solid red";
          }
        });
      }
      if (!billingAddressSelectedCountry) {
        setBillingAddressCountryDropdownToggle(true);
        billingAddressCountryRef.current.style.borderBottom = "1px solid red";
      }
    }
  };
  //--------------UPDATING-SHIPPING-ADDRESSES--------------//
  const [
    shippingAddressSaveChangesButtonText,
    setshippingAddressSaveChangesButtonText,
  ] = useState("SAVE CHANGES");
  //searching-country
  const shippingAddressSearchCountry = (e) => {
    const founded = allCountry.filter((country) =>
      country.name.common.toLowerCase().includes(e.toLowerCase())
    );
    setShippingAddressFoundedCountry(founded);
  };
  //update-firebase
  const updateDataForShippingAddress = async () => {
    setshippingAddressSaveChangesButtonText("UPDATING...");
    const userDoc = doc(
      dataBase,
      "login-base",
      JSON.parse(localStorage.getItem("user")).id
    );
    await updateDoc(userDoc, {
      companyName: shippingAddressCompanyName,
      country: shippingAddressSelectedCountry,
      streetAddress: shippingAddressStreetAddress,
      postCode: shippingAddressPostCode,
      city: shippingAddressCity,
      phone: shippingAddressPhone,
    });
    updateLocalStorageForAddresses();
  };
  //update-billing-address
  const updateShippingAddressFunction = () => {
    const emptyInputToggle = shippingInputRefs.every(
      (input) => input.current.value != ""
    );
    if (emptyInputToggle && shippingAddressSelectedCountry) {
      if (
        shippingAddressEmail ==
          JSON.parse(localStorage.getItem("user")).email &&
        shippingAddressFirstName ==
          JSON.parse(localStorage.getItem("user")).firstName &&
        shippingAddressLastName ==
          JSON.parse(localStorage.getItem("user")).lastName
      ) {
        updateDataForShippingAddress();
      } else {
        if (
          shippingAddressEmail != JSON.parse(localStorage.getItem("user")).email
        ) {
          shippingAddressEmailRef.current.value = "ERROR EMAIL";
        }
        if (
          shippingAddressFirstName !=
          JSON.parse(localStorage.getItem("user")).firstName
        ) {
          shippingAddressFirstNameRef.current.value = "ERROR FIRST NAME";
        }
        if (
          shippingAddressLastName !=
          JSON.parse(localStorage.getItem("user")).lastName
        ) {
          shippingAddressLastNameRef.current.value = "ERROR LAST NAME";
        }
      }
    } else {
      if (!emptyInputToggle) {
        shippingInputRefs.forEach((input) => {
          if (input.current.value == "") {
            input.current.style.borderBottom = "1px solid red";
          }
        });
      }
      if (!shippingAddressSelectedCountry) {
        setShippingAddressCountryDropdownToggle(true);
        shippingAddressCountryRef.current.style.borderBottom = "1px solid red";
      }
    }
  };

  return (
    <section className="flex flex-col gap-5 w-full min-h-screen">
      <Navbar />
      {profilePageTabValue == 0 && (
        <h4 className="mt-32 w-full text-center text-xl font-bold md:text-2xl">
          My account
        </h4>
      )}
      <ProfilePageTab setProfilePageTabValue={setProfilePageTabValue} />
      {profilePageTabValue == 0 ? (
        <motion.div
          variants={introAnimation}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-3"
        >
          <h6 className="flex">
            Hello {JSON.parse(localStorage.getItem("user")).firstName} (not
            {JSON.parse(localStorage.getItem("user")).firstName} ?{" "}
            <h5 className="ml-1">Log out</h5>)
          </h6>
          <div>
            <h6 className="inline">
              From your account dashboard you can view your
            </h6>
            <h5 className="inline ml-1">recent orders</h5>
            <h6 className="inline">, manage your</h6>
            <h5 className="inline ml-1">shipping and billing addresses</h5>
            <h6 className="inline">, and edit your</h6>
            <h5 className="inline ml-1">password and account details</h5>
          </div>
        </motion.div>
      ) : profilePageTabValue == 1 ? (
        orders ? (
          orders.length == 0 ? (
            <div className="w-full border-t border-[#A18A68] bg-gray1 flex items-center justify-between p-3 gap-3 mt-5 md:px-7">
              <h6 className="hidden md:block text-sm">
                No order has been made yet
              </h6>
              <h6 className="text-sm md:hidden">No orders</h6>
              <h5
                onClick={() => navigate("/shop-page")}
                className="hidden md:block"
              >
                BROWSE PRODUCT
              </h5>
              <h5 onClick={() => navigate("/shop-page")} className="md:hidden">
                BROWSE
              </h5>
            </div>
          ) : (
            <motion.div
              variants={introAnimation}
              initial="hidden"
              animate="visible"
              className="flex flex-col w-full"
            >
              <div className="hidden md:flex items-center justify-between border-b-[1.5px] border-[#707070] w-full pt-1 pb-3">
                <h6 className="flex justify-start w-1/5">ORDER NUMBER</h6>
                <h6 className="flex justify-start w-1/5">DATE</h6>
                <h6 className="flex justify-start w-1/5">STATUS</h6>
                <h6 className="flex justify-start w-1/5">TOTAL</h6>
                <h6 className="flex justify-start w-1/5">ACTIONS</h6>
              </div>
              {orders.map((order) => (
                <div className="flex flex-col w-full gap-2 py-3 border-b border-[#D8D8D8] md:flex-row justify-between md:border-none">
                  <p className="flex justify-start w-full md:w-1/5">
                    {order.orderNumber}
                  </p>
                  <p className="flex justify-start w-full md:w-1/5">{`${
                    order.orderDate.split(" ", 2)[
                      order.orderDate.split(" ", 2).length - 1
                    ]
                  } ${
                    order.orderDate.split(" ", 3)[
                      order.orderDate.split(" ", 3).length - 1
                    ]
                  },${
                    order.orderDate.split(" ", 4)[
                      order.orderDate.split(" ", 4).length - 1
                    ]
                  }`}</p>
                  <p className="flex justify-start w-full md:w-1/5">
                    Delivered
                  </p>
                  <p className="flex justify-start w-full md:w-1/5">
                    {() => {
                      console.log(order);
                      calculatePrice(order.order);
                    }}
                  </p>
                  <h5
                    onClick={() => {
                      dispatch(actions.selectedOrder(order));
                      navigate("/checkout-confirm-page");
                    }}
                    className="flex justify-start w-full md:w-1/5"
                  >
                    View Order
                  </h5>
                </div>
              ))}
            </motion.div>
          )
        ) : (
          <CircularProgress />
        )
      ) : profilePageTabValue == 2 ? (
        ""
      ) : profilePageTabValue == 3 ? (
        <motion.div
          variants={introAnimation}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 w-full"
        >
          <h6>
            The following addresses will be used on the checkout page by default
          </h6>
          <div className="flex flex-col gap-5 w-full md:flex-row justify-between">
            <div className="flex flex-col gap-2 w-full md:w-[400px] lg:w-[450px] xl:w-[500px]">
              <h4 className="text-lg font-bold">Billing address</h4>
              <div className="flex flex-col items-start gap-2 w-full">
                <h5
                  onClick={() => {
                    setBillingAddressToggle(!billingAddressToggle);
                    setShippingAddressToggle(false);
                  }}
                  className="font-bold cursor-pointer"
                >
                  ADD
                </h5>
                <p className={billingAddressToggle ? "hidden" : ""}>
                  You have not set up this type of address yet
                </p>
              </div>
              {billingAddressToggle && (
                <motion.div
                  variants={introAnimation}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col w-full gap-5 md:gap-7"
                >
                  <div className="flex flex-col w-full gap-5 md:flex-row md:gap-2">
                    {/* FIRST_NAME_INPUT */}
                    <div className="relative w-full">
                      <input
                        ref={billingAddressFirstNameRef}
                        onChange={(e) => {
                          billingAddressFirstNameRef.current.style.borderBottom =
                            "";
                          setBillingAddressFirstName(e.target.value);
                          e.target.value == ""
                            ? setBillingAddressFirstNameIcon(false)
                            : setBillingAddressFirstNameIcon(true);
                        }}
                        value={billingAddressFirstName}
                        type="text"
                        placeholder="First Name *"
                        className="border-b border-[#D8D8D8] outline-none w-full py-1"
                      />
                      <button
                        onClick={() => {
                          setBillingAddressFirstName("");
                          setBillingAddressFirstNameIcon(false);
                        }}
                        className={
                          billingAddressFirstNameIcon
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
                        ref={billingAddressLastNameRef}
                        onChange={(e) => {
                          billingAddressLastNameRef.current.style.borderBottom =
                            "";
                          setBillingAddressLastName(e.target.value);
                          e.target.value == ""
                            ? setBillingAddressLastNameIcon(false)
                            : setBillingAddressLastNameIcon(true);
                        }}
                        value={billingAddressLastName}
                        type="text"
                        placeholder="Last Name *"
                        className="border-b border-[#D8D8D8] outline-none w-full py-1"
                      />
                      <button
                        onClick={() => {
                          setBillingAddressLastName("");
                          setBillingAddressLastNameIcon(false);
                        }}
                        className={
                          billingAddressLastNameIcon
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
                      billingAddressCountryDropdownToggle
                        ? "border-b border-[#D8D8D8] w-full h-max overflow-hidden rounded-md"
                        : "border-b border-[#D8D8D8] w-full h-12 overflow-hidden rounded-md"
                    }
                  >
                    <div
                      className="relative h-12"
                      onClick={() => {
                        setBillingAddressCountryDropdownToggle(
                          !billingAddressCountryDropdownToggle
                        );
                        setBillingAddressCountryDropdownIcon(
                          !billingAddressCountryDropdownIcon
                        );
                      }}
                    >
                      <input
                        type="text"
                        disabled
                        value={billingAddressSelectedCountry}
                        className="w-full h-full bg-[white]"
                        placeholder="Country *"
                      />
                      <h4
                        className={
                          billingAddressCountryDropdownIcon
                            ? "absolute top-1/2 -translate-y-1/2 right-0 rotate-90 duration-200 text-sm"
                            : "absolute top-1/2 -translate-y-1/2 right-0 -rotate-90 duration-200 text-sm"
                        }
                      >
                        {
                          navLinks.icons.find(
                            (icon) => icon.name == "arrowDropdown"
                          ).icon
                        }
                      </h4>
                    </div>
                    <div className="relative w-full mt-2">
                      <input
                        ref={billingAddressCountryRef}
                        onChange={(e) => {
                          billingAddressCountryRef.current.style.borderBottom =
                            "";
                          billingAddressSearchCountry(e.target.value);
                          setBillingAddressCountry(e.target.value);
                          e.target.value == ""
                            ? setBillingAddressCountryIcon(false)
                            : setBillingAddressCountryIcon(true);
                        }}
                        value={billingAddressCountry}
                        type="text"
                        placeholder="Search Country"
                        className="border-b border-[#D8D8D8] outline-none w-full py-1"
                      />
                      <button
                        onClick={() => {
                          setBillingAddressCountry("");
                          setBillingAddressCountryIcon(false);
                          setBillingAddressFoundedCountry(null);
                        }}
                        className={
                          billingAddressCountryIcon
                            ? "absolute top-1/2 -translate-y-1/2 right-0"
                            : "hidden"
                        }
                      >
                        <p>
                          <AiFillCloseCircle />
                        </p>
                      </button>
                    </div>
                    {billingAddressFoundedCountry &&
                      billingAddressFoundedCountry.map((country, key) => (
                        <div
                          key={key}
                          onClick={() => {
                            setBillingAddressCountryDropdownToggle(false);
                            setBillingAddressCountryDropdownIcon(false);
                            setBillingAddressSelectedCountry(
                              country.name.common
                            );
                            setBillingAddressCountry("");
                            setBillingAddressCountryIcon(false);
                            setBillingAddressFoundedCountry(null);
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
                      ref={billingAddressCompanyNameRef}
                      onChange={(e) => {
                        billingAddressCompanyNameRef.current.style.borderBottom =
                          "";
                        setBillingAddressCompanyName(e.target.value);
                        e.target.value == ""
                          ? setBillingAddressCompanyNameIcon(false)
                          : setBillingAddressCompanyNameIcon(true);
                      }}
                      value={billingAddressCompanyName}
                      type="text"
                      placeholder="Company Name"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setBillingAddressCompanyName("");
                        setBillingAddressCompanyNameIcon(false);
                      }}
                      className={
                        billingAddressCompanyNameIcon
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
                      ref={billingAddressStreetAddressRef}
                      onChange={(e) => {
                        billingAddressStreetAddressRef.current.style.borderBottom =
                          "";
                        setBillingAddressStreetAddress(e.target.value);
                        e.target.value == ""
                          ? setBillingAddressStreetAddressIcon(false)
                          : setBillingAddressStreetAddressIcon(true);
                      }}
                      value={billingAddressStreetAddress}
                      type="text"
                      placeholder="Street Address *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setBillingAddressStreetAddress("");
                        setBillingAddressStreetAddressIcon(false);
                      }}
                      className={
                        billingAddressStreetAddressIcon
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
                      ref={billingAddressPostCodeRef}
                      onChange={(e) => {
                        billingAddressPostCodeRef.current.style.borderBottom =
                          "";
                        setBillingAddressPostCode(e.target.value);
                        e.target.value == ""
                          ? setBillingAddressPostCodeIcon(false)
                          : setBillingAddressPostCodeIcon(true);
                      }}
                      value={billingAddressPostCode}
                      type="text"
                      placeholder="Postcode / ZIP *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setBillingAddressPostCode("");
                        setBillingAddressPostCodeIcon(false);
                      }}
                      className={
                        billingAddressPostCodeIcon
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
                      ref={billingAddressCityRef}
                      onChange={(e) => {
                        billingAddressCityRef.current.style.borderBottom = "";
                        setBillingAddressCity(e.target.value);
                        e.target.value == ""
                          ? setBillingAddressCityIcon(false)
                          : setBillingAddressCityIcon(true);
                      }}
                      value={billingAddressCity}
                      type="text"
                      placeholder="Town / City *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setBillingAddressCity("");
                        setBillingAddressCityIcon(false);
                      }}
                      className={
                        billingAddressCityIcon
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
                      ref={billingAddressPhoneRef}
                      onChange={(e) => {
                        billingAddressPhoneRef.current.style.borderBottom = "";
                        setBillingAddressPhone(e.target.value);
                        e.target.value == ""
                          ? setBillingAddressPhoneIcon(false)
                          : setBillingAddressPhoneIcon(true);
                      }}
                      value={billingAddressPhone}
                      type="text"
                      placeholder="Phone *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setBillingAddressPhone("");
                        setBillingAddressPhoneIcon(false);
                      }}
                      className={
                        billingAddressPhoneIcon
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
                      ref={billingAddressEmailRef}
                      onChange={(e) => {
                        billingAddressEmailRef.current.style.borderBottom = "";
                        setBillingAddressEmail(e.target.value);
                        e.target.value == ""
                          ? setBillingAddressEmailIcon(false)
                          : setBillingAddressEmailIcon(true);
                      }}
                      value={billingAddressEmail}
                      type="text"
                      placeholder="Email *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setBillingAddressEmail("");
                        setBillingAddressEmailIcon(false);
                      }}
                      className={
                        billingAddressEmailIcon
                          ? "absolute top-1/2 -translate-y-1/2 right-0"
                          : "hidden"
                      }
                    >
                      <p>
                        <AiFillCloseCircle />
                      </p>
                    </button>
                  </div>
                  <button
                    onClick={updateBillingAddressFunction}
                    id="btn-border-dark"
                    className="w-full py-1 md:w-1/2"
                  >
                    {billingAddressSaveChangesButtonText}
                  </button>
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-[400px] lg:w-[450px] xl:w-[500px]">
              <h4 className="text-lg font-bold">Shipping address</h4>
              <div className="flex flex-col gap-2 w-full">
                <h5
                  onClick={() => {
                    setShippingAddressToggle(!shippingAddressToggle);
                    setBillingAddressToggle(false);
                  }}
                  className="font-bold"
                >
                  ADD
                </h5>
                <p className={shippingAddressToggle ? "hidden" : ""}>
                  You have not set up this type of address yet
                </p>
              </div>
              {shippingAddressToggle && (
                <motion.div
                  variants={introAnimation}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col w-full gap-5 md:gap-7"
                >
                  <div className="flex flex-col w-full gap-5 md:flex-row md:gap-2">
                    {/* FIRST_NAME_INPUT */}
                    <div className="relative w-full">
                      <input
                        ref={shippingAddressFirstNameRef}
                        onChange={(e) => {
                          shippingAddressFirstNameRef.current.style.borderBottom =
                            "";
                          setShippingAddressFirstName(e.target.value);
                          e.target.value == ""
                            ? setShippingAddressFirstNameIcon(false)
                            : setShippingAddressFirstNameIcon(true);
                        }}
                        value={shippingAddressFirstName}
                        type="text"
                        placeholder="First Name *"
                        className="border-b border-[#D8D8D8] outline-none w-full py-1"
                      />
                      <button
                        onClick={() => {
                          setShippingAddressFirstName("");
                          setShippingAddressFirstNameIcon(false);
                        }}
                        className={
                          shippingAddressFirstNameIcon
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
                        ref={shippingAddressLastNameRef}
                        onChange={(e) => {
                          shippingAddressLastNameRef.current.style.borderBottom =
                            "";
                          setShippingAddressLastName(e.target.value);
                          e.target.value == ""
                            ? setShippingAddressLastNameIcon(false)
                            : setShippingAddressLastNameIcon(true);
                        }}
                        value={shippingAddressLastName}
                        type="text"
                        placeholder="Last Name *"
                        className="border-b border-[#D8D8D8] outline-none w-full py-1"
                      />
                      <button
                        onClick={() => {
                          setShippingAddressLastName("");
                          setShippingAddressLastNameIcon(false);
                        }}
                        className={
                          shippingAddressLastNameIcon
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
                      shippingAddressCountryDropdownToggle
                        ? "border-b border-[#D8D8D8] w-full h-max overflow-hidden rounded-md"
                        : "border-b border-[#D8D8D8] w-full h-12 overflow-hidden rounded-md"
                    }
                  >
                    <div
                      className="relative h-12"
                      onClick={() => {
                        setShippingAddressCountryDropdownToggle(
                          !shippingAddressCountryDropdownToggle
                        );
                        setShippingAddressCountryDropdownIcon(
                          !shippingAddressCountryDropdownIcon
                        );
                      }}
                    >
                      <input
                        type="text"
                        disabled
                        value={shippingAddressSelectedCountry}
                        className="w-full h-full bg-[white]"
                        placeholder="Country *"
                      />
                      <h4
                        className={
                          shippingAddressCountryDropdownIcon
                            ? "absolute top-1/2 -translate-y-1/2 right-0 rotate-90 duration-200 text-sm"
                            : "absolute top-1/2 -translate-y-1/2 right-0 -rotate-90 duration-200 text-sm"
                        }
                      >
                        {
                          navLinks.icons.find(
                            (icon) => icon.name == "arrowDropdown"
                          ).icon
                        }
                      </h4>
                    </div>
                    <div className="relative w-full mt-2">
                      <input
                        ref={shippingAddressCountryRef}
                        onChange={(e) => {
                          shippingAddressCountryRef.current.style.borderBottom =
                            "";
                          shippingAddressSearchCountry(e.target.value);
                          setShippingAddressCountry(e.target.value);
                          e.target.value == ""
                            ? setShippingAddressCountryIcon(false)
                            : setShippingAddressCountryIcon(true);
                        }}
                        value={shippingAddressCountry}
                        type="text"
                        placeholder="Search Country"
                        className="border-b border-[#D8D8D8] outline-none w-full py-1"
                      />
                      <button
                        onClick={() => {
                          setShippingAddressCountry("");
                          setShippingAddressCountryIcon(false);
                          setShippingAddressFoundedCountry(null);
                        }}
                        className={
                          shippingAddressCountryIcon
                            ? "absolute top-1/2 -translate-y-1/2 right-0"
                            : "hidden"
                        }
                      >
                        <p>
                          <AiFillCloseCircle />
                        </p>
                      </button>
                    </div>
                    {shippingAddressFoundedCountry &&
                      shippingAddressFoundedCountry.map((country, key) => (
                        <div
                          key={key}
                          onClick={() => {
                            setShippingAddressCountryDropdownToggle(false);
                            setShippingAddressCountryDropdownIcon(false);
                            setShippingAddressSelectedCountry(
                              country.name.common
                            );
                            setShippingAddressCountry("");
                            setShippingAddressCountryIcon(false);
                            setShippingAddressFoundedCountry(null);
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
                      ref={shippingAddressCompanyNameRef}
                      onChange={(e) => {
                        shippingAddressCompanyNameRef.current.style.borderBottom =
                          "";
                        setShippingAddressCompanyName(e.target.value);
                        e.target.value == ""
                          ? setShippingAddressCompanyNameIcon(false)
                          : setShippingAddressCompanyNameIcon(true);
                      }}
                      value={shippingAddressCompanyName}
                      type="text"
                      placeholder="Company Name"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setShippingAddressCompanyName("");
                        setShippingAddressCompanyNameIcon(false);
                      }}
                      className={
                        shippingAddressCompanyNameIcon
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
                      ref={shippingAddressStreetAddressRef}
                      onChange={(e) => {
                        shippingAddressStreetAddressRef.current.style.borderBottom =
                          "";
                        setShippingAddressStreetAddress(e.target.value);
                        e.target.value == ""
                          ? setShippingAddressStreetAddressIcon(false)
                          : setShippingAddressStreetAddressIcon(true);
                      }}
                      value={shippingAddressStreetAddress}
                      type="text"
                      placeholder="Street Address *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setShippingAddressStreetAddress("");
                        setShippingAddressStreetAddressIcon(false);
                      }}
                      className={
                        shippingAddressStreetAddressIcon
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
                      ref={shippingAddressPostCodeRef}
                      onChange={(e) => {
                        shippingAddressPostCodeRef.current.style.borderBottom =
                          "";
                        setShippingAddressPostCode(e.target.value);
                        e.target.value == ""
                          ? setShippingAddressPostCodeIcon(false)
                          : setShippingAddressPostCodeIcon(true);
                      }}
                      value={shippingAddressPostCode}
                      type="text"
                      placeholder="Postcode / ZIP *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setShippingAddressPostCode("");
                        setShippingAddressPostCodeIcon(false);
                      }}
                      className={
                        shippingAddressPostCodeIcon
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
                      ref={shippingAddressCityRef}
                      onChange={(e) => {
                        shippingAddressCityRef.current.style.borderBottom = "";
                        setShippingAddressCity(e.target.value);
                        e.target.value == ""
                          ? setShippingAddressCityIcon(false)
                          : setShippingAddressCityIcon(true);
                      }}
                      value={shippingAddressCity}
                      type="text"
                      placeholder="Town / City *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setShippingAddressCity("");
                        setShippingAddressCityIcon(false);
                      }}
                      className={
                        shippingAddressCityIcon
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
                      ref={shippingAddressPhoneRef}
                      onChange={(e) => {
                        shippingAddressPhoneRef.current.style.borderBottom = "";
                        setShippingAddressPhone(e.target.value);
                        e.target.value == ""
                          ? setShippingAddressPhoneIcon(false)
                          : setShippingAddressPhoneIcon(true);
                      }}
                      value={shippingAddressPhone}
                      type="text"
                      placeholder="Phone *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setShippingAddressPhone("");
                        setShippingAddressPhoneIcon(false);
                      }}
                      className={
                        shippingAddressPhoneIcon
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
                      ref={shippingAddressEmailRef}
                      onChange={(e) => {
                        shippingAddressEmailRef.current.style.borderBottom = "";
                        setShippingAddressEmail(e.target.value);
                        e.target.value == ""
                          ? setShippingAddressEmailIcon(false)
                          : setShippingAddressEmailIcon(true);
                      }}
                      value={shippingAddressEmail}
                      type="text"
                      placeholder="Email *"
                      className="border-b border-[#D8D8D8] outline-none w-full py-1"
                    />
                    <button
                      onClick={() => {
                        setShippingAddressEmail("");
                        setShippingAddressEmailIcon(false);
                      }}
                      className={
                        shippingAddressEmail
                          ? "absolute top-1/2 -translate-y-1/2 right-0"
                          : "hidden"
                      }
                    >
                      <p>
                        <AiFillCloseCircle />
                      </p>
                    </button>
                  </div>
                  <button
                    onClick={updateShippingAddressFunction}
                    id="btn-border-dark"
                    className="w-full py-1 md:w-1/2"
                  >
                    {shippingAddressSaveChangesButtonText}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ) : profilePageTabValue == 4 ? (
        <motion.form
          onSubmit={accountDetailsFormSubmitted}
          variants={introAnimation}
          initial="hidden"
          animate="visible"
          className={
            profilePageTabValue == 0
              ? "flex flex-col items-center gap-7 w-full mt-6 md:mt-2"
              : "flex flex-col items-center gap-7 w-full mt-10 md:mt-5"
          }
        >
          <h4 className="hidden md:block text-center text-2xl font-bold w-96">
            Account details
          </h4>
          {/* --------------------FIRST_NAME_INPUT----------------- */}
          <div className="relative w-full sm:w-10/12 md:w-96">
            <input
              ref={accountDetailsFirstNameRef}
              onChange={(e) => {
                setAccountDetailsFirstName(e.target.value);
                e.target.value == ""
                  ? setAccountDetailsFirstNameIcon(false)
                  : setAccountDetailsFirstNameIcon(true);
                setWantDisplayName(false);
                setWantPassword(false);
                accountDetailsFirstNameRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              value={accountDetailsFirstName}
              type="text"
              placeholder="First Name*"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              type="button"
              onClick={() => {
                setAccountDetailsFirstName("");
                setAccountDetailsFirstNameIcon(false);
                accountDetailsFirstNameRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              className={
                accountDetailsFirstNameIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/* -------------------LAST_NAME_INPUT---------------- */}
          <div className="relative w-full sm:w-10/12 md:w-96">
            <input
              ref={accountDetailsLastNameRef}
              onChange={(e) => {
                setAccountDetailsLastName(e.target.value);
                e.target.value == ""
                  ? setAccountDetailsLastNameIcon(false)
                  : setAccountDetailsLastNameIcon(true);
                setWantDisplayName(false);
                setWantPassword(false);
                accountDetailsLastNameRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              value={accountDetailsLastName}
              type="text"
              placeholder="Last Name*"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              type="button"
              onClick={() => {
                setAccountDetailsLastName("");
                setAccountDetailsLastNameIcon(false);
                accountDetailsLastNameRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              className={
                accountDetailsLastNameIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/* ------------------DISPLAY_NAME_INPUT---------------- */}
          <div className="flex flex-col items-start w-full gap-2 sm:w-10/12 md:w-96">
            <div className="relative w-full">
              <input
                id="account-details-display-name-input"
                ref={accountDetailsDisplayNameRef}
                onChange={(e) => {
                  setAccountDetailsDisplayName(e.target.value);
                  e.target.value == ""
                    ? setAccountDetailsDisplayNameIcon(false)
                    : setAccountDetailsDisplayNameIcon(true);
                  setWantDisplayName(false);
                  setWantPassword(false);
                  accountDetailsDisplayNameRef.current.style.borderBottom =
                    "1px solid #D8D8D8";
                }}
                value={accountDetailsDisplayName}
                type="text"
                placeholder="Display Name*"
                className="border-b border-[#D8D8D8] outline-none w-full py-1"
              />
              <button
                type="button"
                onClick={() => {
                  setAccountDetailsDisplayName("");
                  setAccountDetailsDisplayNameIcon(false);
                  accountDetailsDisplayNameRef.current.style.borderBottom =
                    "1px solid #D8D8D8";
                }}
                className={
                  accountDetailsDisplayNameIcon
                    ? "absolute top-1/2 -translate-y-1/2 right-0"
                    : "hidden"
                }
              >
                <p>
                  <AiFillCloseCircle />
                </p>
              </button>
            </div>
            <label htmlFor="account-details-display-name-input">
              <p className="text-sm">
                This will be how your name will be displayed in the account page
                and in reviews.
              </p>
            </label>
          </div>
          {/* -----------------EMAIL-INPUT--------------- */}
          <div className="relative w-full sm:w-10/12 md:w-96">
            <input
              ref={accountDetailsEmailRef}
              onChange={(e) => {
                setAccountDetailsEmail(e.target.value);
                e.target.value == ""
                  ? setAccountDetailsEmailIcon(false)
                  : setAccountDetailsEmailIcon(true);
                setWantDisplayName(false);
                setWantPassword(false);
                accountDetailsEmailRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              value={accountDetailsEmail}
              type="text"
              placeholder="Email*"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              type="button"
              onClick={() => {
                setAccountDetailsEmail("");
                setAccountDetailsEmailIcon(false);
                accountDetailsEmailRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              className={
                accountDetailsEmailIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          <h4 className="text-start font-bold w-full sm:w-10/12 md:w-96">
            Password change
          </h4>
          {/* ------------------CURRENT_PASSWORD_INPUT----------------- */}
          <div className="relative w-full sm:w-10/12 md:w-96">
            <input
              ref={accountDetailsCurrentPasswordRef}
              onChange={(e) => {
                setAccountDetailsCurrentPassword(e.target.value);
                e.target.value == ""
                  ? setAccountDetailsCurrentPasswordIcon(false)
                  : setAccountDetailsCurrentPasswordIcon(true);
                setWantDisplayName(false);
                setWantPassword(false);
                accountDetailsCurrentPasswordRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              value={accountDetailsCurrentPassword}
              type="text"
              placeholder="Current password (leave blank to leave unchanged)"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              type="button"
              onClick={() => {
                setAccountDetailsCurrentPassword("");
                setAccountDetailsCurrentPasswordIcon(false);
                accountDetailsCurrentPasswordRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              className={
                accountDetailsCurrentPasswordIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/* ------------------NEW_PASSWORD_INPUT----------------- */}
          <div className="relative w-full sm:w-10/12 md:w-96">
            <input
              ref={accountDetailsNewpasswordRef}
              onChange={(e) => {
                setAccountDetailsNewPassword(e.target.value);
                e.target.value == ""
                  ? setAccountDetailsNewPasswordIcon(false)
                  : setAccountDetailsNewPasswordIcon(true);
                setWantDisplayName(false);
                setWantPassword(false);
                accountDetailsNewpasswordRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              value={accountDetailsNewPassword}
              type="text"
              placeholder="New password (leave blank to leave unchanged)"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              type="button"
              onClick={() => {
                setAccountDetailsNewPassword("");
                setAccountDetailsNewPasswordIcon(false);
                accountDetailsNewpasswordRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              className={
                accountDetailsNewPasswordIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          {/* --------------------CONFIRM_NEW_PASSWORD_INPUT------------------- */}
          <div className="relative w-full sm:w-10/12 md:w-96">
            <input
              ref={accountDetailsConfirmNewPasswordRef}
              onChange={(e) => {
                setAccountDetailsConfirmNewPassword(e.target.value);
                e.target.value == ""
                  ? setAccountDetailsConfirmNewPasswordIcon(false)
                  : setAccountDetailsConfirmNewPasswordIcon(true);
                setWantDisplayName(false);
                setWantPassword(false);
                accountDetailsConfirmNewPasswordRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              value={accountDetailsConfirmNewPassword}
              type="text"
              placeholder="Confirm new password"
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              type="button"
              onClick={() => {
                setAccountDetailsConfirmNewPassword("");
                setAccountDetailsConfirmNewPasswordIcon(false);
                accountDetailsConfirmNewPasswordRef.current.style.borderBottom =
                  "1px solid #D8D8D8";
              }}
              className={
                accountDetailsConfirmNewPasswordIcon
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <p>
                <AiFillCloseCircle />
              </p>
            </button>
          </div>
          <button
            type="submit"
            id="btn-border-dark"
            className="w-full py-1 sm:w-10/12 md:w-96"
          >
            {isChecking}
          </button>
        </motion.form>
      ) : profilePageTabValue == 5 ? (
        ""
      ) : (
        ""
      )}
      <Footer />
    </section>
  );
}

export default ProfilePage;
