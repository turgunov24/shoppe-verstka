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
    return price
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
                      calculatePrice(order.order)
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
        ""
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
