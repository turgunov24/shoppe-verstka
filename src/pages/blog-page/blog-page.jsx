//hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//components
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//additional
import { introAnimation } from "../../data/framer-motion/intro-animation";
import { motion } from "framer-motion";
import dataJson from "../../data/data.json";
import { navLinks } from "../../data/navbar-data/navLinks";
import { CircularProgress } from "@mui/material";
import BlogPagePagination from "./blog-page-pagination/blog-page-pagination";
import { actions } from "../../data/redux/reducers/allData";
function BlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //date
  let date = new Date();
  //season
  const [season, seSeason] = useState();
  const findSeason = () => {
    let month = date.toString().split(" ", 2)[
      date.toString().split(" ", 2).length - 1
    ];
    if (month == "Dec" || month == "Jan" || month == "Feb") {
      return "winter";
    } else if (month == "Mar" || month == "Apr" || month == "May") {
      return "spring";
    } else if (month == "Jun" || month == "Jul" || month == "Aug") {
      return "summer";
    } else {
      return "autumn";
    }
  };
  //hooks
  const [data, setData] = useState(dataJson);
  const [readMorebutton, setReadMorebutton] = useState(false);
  //search-input-data
  const [blogPageSearchInput, setBlogPageSearchInput] = useState(null);
  const [blogPageSearchIcon, setBlogPageSearchIcon] = useState(false);
  //filter-function
  const categories = ["Fashion", "Style", "Accessories", "Season"];
  const categoryFilter = (e) => {
    let filtered = dataJson.filter((blog) => {
      if (e == "Accessories") {
        return blog.category == "accessories";
      } else if (e == "Style") {
        return blog.style == "classic";
      } else if (e == "Fashion") {
        return blog.fashion == 19;
      } else {
        return blog.season.includes(findSeason());
      }
    });
    setData(filtered);
  };
  //search-function
  const searchBlog = () => {
    let founded = [];
    dataJson.forEach((blog) => {
      if (
        blog.category.toString().includes(blogPageSearchInput) ||
        blog.style.toString().includes(blogPageSearchInput) ||
        blog.season.toString().includes(blogPageSearchInput) ||
        blog.fashion.toString().includes(blogPageSearchInput)
      ) {
        founded.push(blog);
      }
    });
    if (founded.length != 0) {
      setData(founded);
    }
  };
  //pagination
  //calculate-page-function
  const [pages, setPages] = useState(null);
  const [changeShoppingBag, setChangeShoppingBag] = useState(null);
  const [pagination, setPagination] = useState(0);

  const calculatePagesFunction = () => {
    setPages(null);
    if (changeShoppingBag / 4 <= 1) {
    } else {
      if ((changeShoppingBag / 4) % 2 == 0) {
        setPages(changeShoppingBag / 4);
      } else {
        setPages(Math.floor(changeShoppingBag / 4));
      }
    }
  };

  useEffect(() => {
    setChangeShoppingBag(data.length);
  }, [data]);
  useEffect(() => {
    calculatePagesFunction();
  }, [changeShoppingBag]);
  //selectedBlog-function
  const selectedBlogFunction = (e) => {
    dispatch(actions.selectedBlog(e));
    navigate("/selected-blog-page");
  };

  return (
    <motion.section
      variants={introAnimation}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full min-h-screen gap-5"
    >
      <Navbar />
      <h4 className="w-full text-start text-lg font-bold mt-28 md:text-2xl">
        Blog
      </h4>
      {/* --------------MAIN-------------- */}
      <div className="flex flex-col w-full md:flex-row gap-7">
        {/* --------------CATEGORIES------------ */}
        <div className="hidden md:flex flex-col w-56">
          <div className="relative w-full">
            <input
              onChange={(e) => {
                setBlogPageSearchInput(e.target.value);
                e.target.value == ""
                  ? setBlogPageSearchIcon(false)
                  : setBlogPageSearchIcon(true);
              }}
              value={blogPageSearchInput}
              type="text"
              placeholder="search by season,style..."
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={searchBlog}
              className={
                blogPageSearchInput
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <h4 className="text-lg">
                {navLinks.icons.find((icon) => icon.name == "searchIcon").icon}
              </h4>
            </button>
          </div>
          <div className="flex flex-col items-start w-full gap-3 mt-5">
            <h4 className="font-bold text-lg pb-2">Categories</h4>
            {categories.map((category) => (
              <p onClick={() => categoryFilter(category)}>{category}</p>
            ))}
          </div>
        </div>
        {/* -------------RIGHT-SIDE------------- */}
        <div className="flex flex-col w-full gap-5 items-center">
          <div className="relative w-full md:hidden">
            <input
              onChange={(e) => {
                setBlogPageSearchInput(e.target.value);
                e.target.value == ""
                  ? setBlogPageSearchIcon(false)
                  : setBlogPageSearchIcon(true);
              }}
              value={blogPageSearchInput}
              type="text"
              placeholder="Search..."
              className="border-b border-[#D8D8D8] outline-none w-full py-1"
            />
            <button
              onClick={searchBlog}
              className={
                blogPageSearchInput
                  ? "absolute top-1/2 -translate-y-1/2 right-0"
                  : "hidden"
              }
            >
              <h4 className="text-lg">
                {navLinks.icons.find((icon) => icon.name == "searchIcon").icon}
              </h4>
            </button>
          </div>
          <div className="flex flex-wrap gap-7">
            {data ? (
              data
                // .filter((a, i) => i < 4)
                .slice(pagination, pagination + 4)
                .map((blog) => (
                  <div
                    // onMouseEnter={() => setvideoToggle(!videoToggle)}
                    className="flex flex-col w-full items-start gap-3 hover:scale-110 duration-200 p-3 shadow-md md:w-5/12"
                  >
                    <img
                      onClick={() => selectedBlogFunction(blog)}
                      src={blog.image}
                      className="w-full h-56 object-cover rounded-md"
                    />
                    <p className="text-sm">{`Fashion - ${blog.fashion} Century`}</p>
                    <h4
                      onClick={() => selectedBlogFunction(blog)}
                      className="text-lg font-bold"
                    >{`${blog.style.charAt(0).toUpperCase()}${blog.style.slice(
                      1
                    )} Trends From ${blog.season
                      .charAt(0)
                      .toUpperCase()}${blog.season.slice(1)}`}</h4>
                    <p>
                      {readMorebutton ? (
                        <p>{blog.longDescription}</p>
                      ) : (
                        <p>{blog.shortDescription}</p>
                      )}
                    </p>
                    <button
                      onClick={() => setReadMorebutton(!readMorebutton)}
                      className="mt-2"
                    >
                      <h5>Read more</h5>
                    </button>
                  </div>
                ))
            ) : (
              <CircularProgress />
            )}
          </div>
          {/* {pagination.length != 0 && (
            <div className="border">
              {pagination.map((page) => (
                <div className="border px-3">{page}</div>
              ))}
            </div>
          )} */}
          <BlogPagePagination pages={pages} elements={setPagination} />
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}

export default BlogPage;
