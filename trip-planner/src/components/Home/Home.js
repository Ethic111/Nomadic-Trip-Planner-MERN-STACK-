import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import i1 from './home.png'
import axios from 'axios'

// Swiper Js Library Modules.
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



function Home() {


   // Logic for Fetching Home Data from MongoDb
   
  const [cardData, setCardData] = useState([]);
  const [exploreData, setExploreData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/gethomes')
    // axios.get('https://trip-planner-iq8f.vercel.app/gethomes')
    .then(response => {
      const { cardData, exploreData, reviewData } = response.data;
      setCardData(cardData);
      setExploreData(exploreData);
      setReviewData(reviewData);
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
    
  }, []);

  
// console.log(cardData)
// console.log(exploreData)
 
 
  return (
    <div className='home_body'>

      {/* ============================= Home Page Main Photo ============================= */}
      <div className='home_photo'>
        <img src={i1} alt="HOMEPICTURE" />
      </div>

      {/* ============================= Most Popular Tours ============================= */}

      <div className='tours_container'>
        <h1><strong>MOST POPULAR TOURS</strong></h1>

        <div className='card_main'>
          {
            cardData.map((item, index) => {
              return (
                <div key={index} className='card'>
                  <img src={item.url} className='card_image' alt={item.title} />
                  <div className='card_body'>
                    <h1 className='card_title'>{item.title}</h1>
                    <p className='card_sub_title'><strong>{item.subtitle}</strong></p>
                    <p className='card_info'>{item.info}</p>
                    <button className='card_btn'><Link to="/form" style={{textDecoration:"none", color :"whitesmoke"}}>Book Now</Link></button>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className='discover_tours_button_div'>
          <button className='discover_tours_button'>
            <Link to="/tours"><strong>Discover Tours</strong>
            <img src="https://i.ibb.co/WPLX80k/right-arrpw.png" alt="right arrow" /></Link>       
          </button>
        </div>

      </div>
      {/* ============================= Explore Nomadic Logos ============================= */}

      <div className="explore_container">
        <h1>
          Explore Nomadic Trips
        </h1>
        <div className="explore_container_inner">
          {
            exploreData.map((data, index) => {
              return (
                <div key={index} className="explore_container_inner_card">
                  <img src={data.url} alt="item" />
                  <h2>{data.title}</h2>
                </div>
              )
            })
          }
        </div>
        <div className='discover_tours_button_div'>
          <button className='discover_tours_button'>
            <Link to="/stories"><strong>Discover Places</strong>
            <img src="https://i.ibb.co/WPLX80k/right-arrpw.png" alt="right arrow" /></Link>       
          </button>
        </div>

      </div>

      {/* ============================= Reviews ============================= */}
          <div className='home_reviews'>
              <h1>
                  Customer Reviews
              </h1>
          
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

        {
            reviewData.map((data, index)=>{
              return(
                <>
                <SwiperSlide key={index}>
                  <div className='swipe_slide_div'>
                    <img src={data.url} alt="Review" className='review_image' />
                    <p className='review_star'>{data.rating}</p>
                    <p className='review_para'>{data.review_content}</p>
                  </div>
                </SwiperSlide>
                </>
              )
            })
        }
      </Swiper>
      </div>
    </div>           

  )
}

export default Home
