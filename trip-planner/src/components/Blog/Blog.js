import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Blog.css";
import axios from "axios";

function Blog() {
  const { cityname } = useParams();
  const [blogdata, setBlogData] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/blogs/${encodeURIComponent(cityname)}`
        );
        // const response = await axios.get(`https://trip-planner-iq8f.vercel.app/blogs/${encodeURIComponent(cityname)}`);
        setBlogData(response.data);
        setDetail(response.data.details);
      } catch (error) {
        console.error("Error fetching Blog details:", error);
      }
    }

    fetchBlogData();
  }, [cityname]);

  console.log(blogdata);
  //   const detail = blogdata.detail
  console.log(detail);

  return (
    <div className="blog_main_container">
      <div className="blog_start">
        <h1 className="blog_title">Nomadic Travel & Tourism Blog</h1>
        <p className="blog_caption">
          Looking for something useful to read about travelling in India? You've
          come to the right place. Join the league of readers who find here
          detailed insights, interesting travel tips and ideas and daily
          inspiration.
        </p>
      </div>
      <section className="bloglink">
        <div className="blog_container">
          <div className="row">
            {/* <div className="col-3 search_div">
              <form action="" id="searchform" method="get" role="search">
                <input
                  type="text"
                  value=""
                  name="s"
                  id="s"
                  className="blog_input"
                  placeholder="Search.."
                />
              </form>
            </div> */}
            <div className="col-12" style={{ textAlign: "center" }}>
              <ul className="left_link">
                <li className="left_link_li">
                  <Link to="/blogs/Mumbai" className="menu-list left_link_a">
                    Mumbai
                  </Link>
                </li>
                <li className="left_link_li">
                  <Link to="/blogs/Jaipur" className="menu-list left_link_a">
                    Jaipur
                  </Link>
                </li>
                <li className="left_link_li">
                  <Link to="/blogs/Shimla" className="menu-list left_link_a">
                    Shimla
                  </Link>
                </li>
                <li className="left_link_li">
                  <Link to="/blogs/Kochi" className="menu-list left_link_a">
                    Kochi
                  </Link>
                </li>
                <li className="left_link_li">
                  <Link to="/blogs/Goa" className="menu-list left_link_a">
                    Goa
                  </Link>
                </li>
                <li className="left_link_li">
                  <Link to="/blogs/New Delhi" className="menu-list left_link_a">
                    New Delhi
                  </Link>
                </li>
                <li className="left_link_li">
                  <Link to="/blogs/Ahmedabad" className="menu-list left_link_a">
                    Ahmedabad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="hentry">
        <div class="wrapper">
          <div class="typing-demo">{blogdata.name}</div>
        </div>

        <div className="row">
          <div className="col-5 blog_img">
            <img src={blogdata.img_source} alt="sorry" className="blog_img1" />
          </div>
          <div className="col-6 hentry_description ">
          {detail.map((para) => {
            return (
              <>
                <p>{para}</p>
              </>
            );
          })}

          {/* <Link to="#" className="blog_btn">
            Read more
          </Link> */}
        </div>
        </div>

       

        {/* <div className="flex-child-element2 hentry-card">
          <h2>Our Featured Posts</h2>
          <div className="blog_card">
            <img
              src="https://img.traveltriangle.com/blog/wp-content/uploads/2019/12/cover-image-of-Islands-Near-Phi-Phi_6th-dec-400x229.jpg"
              alt="sorry"
              className="blog_photo"
            ></img>
            <Link to="#" className="blog_btn">
              6 Adventure Sports In Kochi That Will Let You Challenge Your Fears
              In 2023!
            </Link>
          </div>
          <div className="blog_card">
            <img
              src="https://img.traveltriangle.com/blog/wp-content/uploads/2019/11/Ahmedabad-18th_nov-400x225.jpg"
              alt="sorry"
              className="blog_photo"
            ></img>
            <Link to="#" className="blog_btn">
              Top 26 Places To Visit Near Ahmedabad On Your Gujarat Vacation{" "}
            </Link>
          </div>
          <div className="blog_card">
            <img
              src="https://img.traveltriangle.com/blog/wp-content/uploads/2018/02/Apple-Country-Resort-400x267.jpg"
              alt="sorry"
              className="blog_photo"
            ></img>
            <Link to="#" className="blog_btn">
              10 Best Resorts In Manali To Pamper The Nature Lover In You
            </Link>
          </div>
          <div className="blog_card">
            <img
              src="https://img.traveltriangle.com/blog/wp-content/uploads/2023/07/Mumbai-Cover.jpg"
              alt="sorry"
              className="blog_photo"
            ></img>
            <Link to="#" className="blog_btn">
              8 Best Places To Visit In Mumbai For 2 Days
            </Link>
          </div>
          <div className="blog_card">
            <img
              src="https://i.ibb.co/9qsV8Mt/jaipur.png"
              alt="sorry"
              className="blog_photo"
            ></img>
            <Link to="#" className="blog_btn">
              “The In-Depth Guide To… jaipur”
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default Blog;
