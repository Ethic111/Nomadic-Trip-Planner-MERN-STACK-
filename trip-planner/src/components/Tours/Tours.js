import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "./Tours.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Tours() {
  const [tours_data, setToursData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gettours")
      // axios.get('https://trip-planner-iq8f.vercel.app/gettours')
      .then((tours_data) => setToursData(tours_data.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/gethomes")
      // axios.get('https://trip-planner-iq8f.vercel.app/gethomes')
      .then((response) => {
        const { reviewData } = response.data;
        setReviewData(reviewData);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  // console.log(tours_data)

  return (
    <>
      <div className="tours_main_container">
        <div></div>

        <div className="tours_city_main_container">
          <div className="tours_heading">
            <h1>Cities to Explore</h1>
          </div>
          <div>
            <Swiper
              // centeredSlides={true}
              breakpoints={{
                300: {
                  // width:300,
                  slidesPerView: 1,
                },
                // when window width is >= 640px
                640: {
                  // width: 640,
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  // width: 768,
                  slidesPerView: 2,
                },
                1180: {
                  // width: 768,
                  slidesPerView: 3,
                },
              }}
              spaceBetween={20}
              slidesPerView={2}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {tours_data.map((data, index) => {
                return (
                  <>
                    {data.view == true && (
                      <SwiperSlide>
                        <div className="tours_main_card" key={index}>
                          <div className="tours_main_card_icon">
                            <img src={data.img} alt={data.title} />
                          </div>

                          <div className="tours_main_card_content">
                            <h1>{data.title}</h1>
                            <p>✨{data.sub_title}✨</p>
                            <div
                              className="tours_main_card_subcontent"
                              style={{ textAlign: "justify" }}
                            >
                              {data.description}
                            </div>
                          </div>
                          <div
                            className="tour_main_card_utils"
                            key={data.title}
                          >
                            <Link
                              to={`/blogs/${encodeURIComponent(data.title)}`}
                            >
                              <button className="tour_main_card_button">
                                Read More
                              </button>
                            </Link>
                            <Link to="/form" className="tour_main_card_button">
                              Book Now
                            </Link>

                            {/* <button className='tour_main_card_button'>Book Now</button> */}
                          </div>
                          {/* <ul style={{display: 'flex'}}>
                                <li style={{margin: '10px'}}>{data.place1}</li>
                                <li style={{margin: '10px'}}>{data.place2}</li>
                                <li style={{margin: '10px'}}>{data.place3}</li>
                              </ul> */}
                        </div>
                      </SwiperSlide>
                    )}
                  </>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="tours_reviews">
          <div className="home_reviews">
            <h1>Customer Reviews</h1>

            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {reviewData.map((data, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <div className="swipe_slide_div">
                        <img
                          src={data.url}
                          alt="Review"
                          className="review_image"
                        />
                        <p className="review_star">{data.rating}</p>
                        <p className="review_para">{data.review_content}</p>
                      </div>
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tours;
