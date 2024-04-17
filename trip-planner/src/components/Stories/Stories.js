import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Stories.css";

function Stories() {
  // Logic for Fetching Stories Data from MongoDb

  const [cards, setCards] = useState([]);
  const [image1, setImage] = useState(cards);
  const [imgstyle, setImgStyle] = useState("none");
  const [cardstyle, setCardStyle] = useState("grid");

  const allItem = () => {
    const finalData = cards.filter((value) => {
      setCardStyle("grid");
      if (imgstyle === "none") {
        setImgStyle("block");
      } else {
        setImgStyle("none");
      }
      return value;
    });
    setImage(finalData);
  };

  const specificImg = (C) => {
    const finalData = cards.filter((value) => {
      setCardStyle("none");
      if (imgstyle === "none") {
        setImgStyle("block");
      } else {
        setImgStyle("none");
      }
      return value.category === C;
    });
    setImage(finalData);
  };

  function onImageClick() {
    if (imgstyle === "none") {
      setImgStyle("block");
    } else {
      setImgStyle("none");
    }
  }
  // axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/getstories")
      // axios.get("https://trip-planner-iq8f.vercel.app/getstories")
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    allItem(); // Call allItem whenever cards change
  }, [cards]); // Dependency array containing cards

  return (
    <div className="stories_body">
      <div>
        <section className="stories_body_section">
          <div className="stories_main_container">
            <div className="famous_places">
              <h1>Some Famous Place's Stories</h1>
            </div>

            {/* <div className="stories_input-icons">
              <form>
                <span>
                <i class="fas fa-search stories_input-icons_set_search">
                  </i>
                <input
                  type="text"
                  placeholder="Search Place"
                  className="stories_searchbar"
                />
               </span>

              </form>
            </div> */}
            <br />
            <div class="first stories_card1">
              <div>
                <img src="https://i.ibb.co/NSkJGZf/Dal-Lake.jpg" alt="" />
              </div>
              <div className="header">
                <div>
                  <h3>Dal Lake</h3>
                  <br />
                  <p style={{ textAlign: "justify" }}>
                    Dal is a lake in Srinagar (Dal Lake is a misnomer as Dal in
                    Kashmiri means lake), the summer capital of Jammu and
                    Kashmir. The urban lake, is integral to tourism and
                    recreation in Kashmir and is named the “Jewel in the crown
                    of Kashmir” or “Srinagar's Jewel”.
                  </p>
                </div>
                <br />
                <div class="city"></div>
                <br />
                {/* <button className="read_more_btn">Read More</button> */}
                <Link to={`/blogs/${encodeURIComponent("Dal Lake")}`}>
                  <button className="read_more_btn">Read More</button>
                </Link>
              </div>
            </div>
            <br />
            <hr />
            <br />
            <div class="stories_filters">
              <div id="stories_div1">
                <div>
                  <button class="stories_btn" onClick={allItem}>
                    All
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Forts")}
                  >
                    Forts
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Attraction")}
                  >
                    Attraction
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Garden")}
                  >
                    Garden
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Temples")}
                  >
                    Temples
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Mountains")}
                  >
                    Mountains
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Beaches")}
                  >
                    Beaches
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Museum")}
                  >
                    Museum
                  </button>
                  <button
                    class="stories_btn"
                    onClick={() => specificImg("Wildlife")}
                  >
                    Wildlife
                  </button>
                </div>
              </div>

              <div id="stories_div2">
                <div className="stories_select_menu">
                  <div className="select-stories_btn" onClick={onImageClick}>
                    <span className="sBtn-text">Select You Vibe </span>
                    <img
                      src="https://i.ibb.co/P4R2qc2/larrow.png"
                      alt="lower arrow"
                      className="filter_larrow"
                    />
                  </div>
                  <div style={{ display: imgstyle }}>
                    <ul className="stories_options">
                      <li
                        style={{ "--delay": "1" }}
                        onClick={allItem}
                        className="stories_option "
                      >
                        <img src="https://i.ibb.co/ynMVSbS/all.png" alt="" />
                        <span className="option-text">All</span>
                      </li>
                      <li
                        style={{ "--delay": "2" }}
                        className="stories_option"
                        onClick={() => specificImg("Forts")}
                      >
                        <img src="https://i.ibb.co/FYTnCcd/fort.png" alt="" />
                        <span className="option-text">Forts</span>
                      </li>
                      <li
                        style={{ "--delay": "3" }}
                        className="stories_option"
                        onClick={() => specificImg("Church")}
                      >
                        <img
                          src="https://i.ibb.co/7pPmqXY/arc-de-triomphe.png"
                          alt=""
                        />
                        <span className="option-text">Attraction</span>
                      </li>
                      <li
                        style={{ "--delay": "4" }}
                        className="stories_option"
                        onClick={() => specificImg("Palace")}
                      >
                        <img src="https://i.ibb.co/G0WbMbx/garden.png" alt="" />
                        <span className="option-text">Garden</span>
                      </li>
                      <li
                        style={{ "--delay": "5" }}
                        className="stories_option"
                        onClick={() => specificImg("Temples")}
                      >
                        <img src="https://i.ibb.co/SPkc6T6/temple.png" alt="" />
                        <span className="option-text">Temple</span>
                      </li>
                      <li
                        style={{ "--delay": "6" }}
                        className="stories_option"
                        onClick={() => specificImg("Mountains")}
                      >
                        <img
                          src="https://i.ibb.co/ZcM301q/mountain.png"
                          alt=""
                        />
                        <span className="option-text">Mountain</span>
                      </li>
                      <li
                        style={{ "--delay": "7" }}
                        className="stories_option"
                        onClick={() => specificImg("Beaches")}
                      >
                        <img
                          src="https://i.ibb.co/2NxNTxZ/beaches.png"
                          alt=""
                        />
                        <span className="option-text">Beaches</span>
                      </li>
                      <li
                        style={{ "--delay": "8" }}
                        className="stories_option"
                        onClick={() => specificImg("Museum")}
                      >
                        <img src="https://i.ibb.co/0hBnZnH/museum.png" alt="" />
                        <span className="option-text">Museum</span>
                      </li>
                      <li
                        style={{ "--delay": "9" }}
                        className="stories_option"
                        onClick={() => specificImg("Wildlife")}
                      >
                        <img
                          src="https://i.ibb.co/Lz9kmgC/wildlife.png"
                          alt=""
                        />
                        <span className="option-text">Wildlife</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <br />
              <hr />
              <br />
              <br />

              <br />
              <div className="stories_cards">
                {image1.map((card, i) => (
                  <div key={i} className="stories_card">
                    <div>
                      <img src={card.image} alt="" />
                    </div>
                    <br />
                    <div>
                      <h3>{card.title}</h3>

                      <p style={{ textAlign: "justify" }}>{card.text}</p>

                      {/* <div class="city">
                        <img src={card.cimage} alt="city" />
                        <div class="city-info">
                          <h3>{card.cname}</h3>
                        </div>
                      </div>
                      <br /> */}
                      <div>
                        {/* <button className='read_more_btn'>Read More</button> */}

                        <Link to={`/blogs/${encodeURIComponent(card.title)}`}>
                          <button className="read_more_btn">Read More</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Stories;
