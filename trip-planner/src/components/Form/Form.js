// once you click budget button the page will reload check that and you need to click twice for budget.
import React, { useEffect, useState } from "react";
import form_svg from "./form.svg";
import payment_svg from "./payment.svg";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import { UserAuth } from "../../context/AuthContext";
import Alert from "../CustomAlert/Alert";

import "./Form.css";

import "swiper/css";
import "swiper/css/effect-cards";

// npm install react-datepicker date-fns //

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";

function Form(props) {
  const { user } = UserAuth();
  const [isSubmitMode, setisSubmitMode] = useState(false);
  const [day1, setDay1] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);
  const [hotel, setHotel] = useState();
  const [transport, setTransport] = useState();
  const [hotel_price, setHotel_price] = useState(0);
  const [transport_price, setTransport_price] = useState(0);
  const [customize, setCustomize] = useState();
  const [budget, setBudget] = useState(0);
  const [showText, setShowText] = useState(false);
  const [cityname, setCityname] = useState("");
  const [num_of_people, setNum_of_people] = useState();

  const [showcustombtn, setShowcustombtn] = useState(false);
  const [showpdfbtn, setShowpdfbtn] = useState(false);
  const [showbudgetbtn, setBudgetbtn] = useState(false);

  const [formdata, setformdata] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);

  //=========================================Function to store form details======================================================//

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setformdata({ ...formdata, [name]: value });
  };

  //=========================================Function to handle date selection======================================================//

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //============================Function to filter available dates to today and future dates===========================================//

  const isFutureDate = (date) => {
    const today = new Date();
    return date >= today;
  };

  //============================================Function to calculate budget============================================================//

  const handleButtonShowBudget = () => {
    setShowText(true);
    let hotel_pri = day1[0].price;
    let transport_pri = 5000;
    let people = formdata.num_of_people;
    if (transport === "Yes" && hotel === "Yes") {
      setHotel_price(hotel_pri);
      setTransport_price(5000);
      const cal = people * hotel_pri + transport_pri;
      console.log(cal);
      setBudget(cal);
    } else if (transport === "Yes" && hotel === "No") {
      setHotel_price(0);
      setTransport_price(5000);
      const cal = 5000;
      console.log(cal);
      setBudget(cal);
    } else if (transport === "No" && hotel === "Yes") {
      setHotel_price(hotel_pri);
      setTransport_price(0);
      const cal = people * hotel_pri;
      console.log(cal);
      setBudget(cal);
    } else if (transport === "No" && hotel === "No") {
      setHotel_price(0);
      setTransport_price(0);
      setBudget(0);
    }
  };

  //====================Function to setisSubmitMode "true" when "proceed" is clickked to show left panel============================//

  const handleProceedClick = () => {
    setisSubmitMode(true);
  };

  //====================Function to setisSubmitMode "false" when "back" is clicked to show right panel==============================//

  const handleFormClick = () => {
    setisSubmitMode(false);
  };

  //=====================================Function to submit details of right section================================================//

  const handleSubmit = (e) => {
    e.preventDefault();
    // setCityname(formdata.cityname);
    setNum_of_people(formdata.num_of_people);
    // Send POST request to server with the cityname
    // let ct = formdata.cityname
    // let ctname = ct.toLowerCase()
    axios
      .post("http://localhost:3001/getplanner", { cityname })
      //  axios.post("https://trip-planner-iq8f.vercel.app/getplanner", { cityname })
      .then((response) => {
        const { cityname, Day1, Day2, Day3 } = response.data;
        setDay1(Day1);
        setDay2(Day2);
        setDay3(Day3);
        // setCity(cityname);
      })
      .catch((err) => console.log(err));

    handleProceedClick();
  };

  //=====================================Function to submit the further details of left section=====================================//

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setTransport(formdata.transport);
    setHotel(formdata.hotel);
    setCustomize(formdata.customize);
    if (formdata.customize === "Yes") {
      setShowpdfbtn(false);
      setShowcustombtn(true);
      setBudgetbtn(true);
    } else {
      setShowcustombtn(false);
      setShowpdfbtn(true);
      setBudgetbtn(true);
    }
  };
  //=====================================Function of customize button, to redirect it into planner section=====================================//

  // ============================= PDF GENERATION CODE ============================================================================//
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set the maximum width and height for the content area
    const maxWidth = doc.internal.pageSize.getWidth();
    const maxHeight = doc.internal.pageSize.getHeight();
    doc.setFont("Fredoka", "bold");
    doc.setFontSize(24);
    doc.addImage("https://i.ibb.co/QKkrvRx/Main-logo.png", 10, 5, 35, 15);
    doc.text("Your trip to " + cityname.toUpperCase() + ", India", 15, 35);
    doc.setFontSize(13);
    doc.setFont("Fredoka", "light");
    doc.setTextColor(0, 117, 195);
    doc.text(
      "**Discover the magic of your next adventure - where every destination is a story and every moment",
      15,
      45
    );
    doc.text(" is a memory in the making.", 15, 53);
    doc.setFont("Fredoka", "bold");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    // doc.text( 45, 40);

    let daynum = 2;

    const imgWidth = 80; // Set the desired width
    const imgHeight = 40; // Set the desired height

    let leftColumnX = 15;
    let rightColumnX = 105;
    // Initial Y position
    let currentY = 60;

    // Function to add an image with its description and handle pagination
    const addImageWithDescription = (imageData, description) => {
      // Calculate the height required for the text
      const textHeight = doc.getTextDimensions(description).h;

      // Check if adding the description exceeds the page height
      if (currentY + textHeight + imgHeight > maxHeight) {
        doc.addPage();
        doc.text("Day " + daynum, 20, 15);
        currentY = 15; // Reset Y position for the new page
        daynum++;
      }
      // Add the image
      doc.addImage(
        imageData,
        "JPEG",
        leftColumnX,
        currentY + 10,
        imgWidth,
        imgHeight
      ); // Adjust coordinates and dimensions as needed
      doc.setFontSize(16);
      // Add the description text
      doc.text(rightColumnX, currentY + 20, description); // Adjust the Y coordinate as needed
      doc.setFontSize(18);
      // currentY += 90; // Adjust as needed based on your layout

      // Update the Y position for the next element
      currentY += Math.max(50, textHeight) + 10; // Adjust as needed based on your layout
    };

    // Iterate through your data (e.g., Day1) to add images with descriptions
    doc.text("Day 1", 20, 65);
    day1.map((place, index) => {
      if (place.place_type === "Attraction") {
        const imageData = place.place_img;

        const description = `Place: ${place.place_name}\nType: ${place.place_type}\nTime: ${place.time}\n`;

        // Add the image with description
        addImageWithDescription(imageData, description);
      }
    });

    day2.map((place, index) => {
      if (place.place_type === "Attraction") {
        const imageData = place.place_img;

        const description = `Place: ${place.place_name}\nType: ${place.place_type}\nTime: ${place.time}\n`;

        // Add the image with description
        addImageWithDescription(imageData, description);
      }
    });

    day3.map((place, index) => {
      if (place.place_type === "Attraction") {
        const imageData = place.place_img;

        const description = `Place: ${place.place_name}\nType: ${place.place_type}\nTime: ${place.time}\n`;

        // Add the image with description
        addImageWithDescription(imageData, description);
      }
    });

    // Save the PDF
    doc.save(`${cityname}-travel-itinerary.pdf`);
  };

  //=====================================Front-end starts here=============================================================================//

  return (
    <>
      {user?.email ? (
        <>
          <div
            className={`PlannerFormcontainer ${
              isSubmitMode ? "proceed-mode" : ""
            }`}
          >
            <div class="forms-container">
              <div class="form_submit-proceed">
                <form
                  id="form"
                  onSubmit={handleSubmit}
                  className={`submit-form ${isSubmitMode ? "hidden" : ""}`}
                >
                  <h2 className="from_title">Details</h2>
                  <div className="input-field">
                    <i className="fas fa-sharp fa-solid fa-city "></i>
                    <input
                      type="text"
                      placeholder="City Name"
                      name="cityname"
                      // edited by sac
                      onChange={(e) =>
                        setCityname(e.target.value.toLowerCase())
                      }
                      // edited by sac

                      required
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-solid fa-user"></i>
                    <input
                      type="number"
                      placeholder="Number Of People"
                      name="num_of_people"
                      onChange={handlechange}
                      required
                    />
                  </div>

                  <div className="input-field">
                    <i className="fas fa-solid fa-calendar-day"></i>
                    <DatePicker
                      className="starting_Datepicker"
                      placeholderText="Select Starting Date"
                      selected={selectedDate}
                      name="datepicker"
                      onChange={handleDateChange}
                      minDate={new Date()} // Set minimum date to today
                      filterDate={isFutureDate} // Only allow future dates
                    />
                  </div>
                  <div className="input-field">
                    <i class="fas fa-regular fa-calendar-plus fa-bounce"></i>
                    <input
                      type="number"
                      placeholder="Number Of Days"
                      name="num_of_days"
                      onChange={handlechange}
                      required
                    />
                  </div>

                  <span>
                    <input
                      type="submit"
                      value="Submit"
                      className="form_btn "
                      onClick={handleSubmit}
                    />
                  </span>
                </form>
                {/* Next Section - Left */}
                <form
                  onSubmit={handleSubmit2}
                  className={`proceed-form ${isSubmitMode ? "" : "hidden"}`}
                >
                  <h2 class="form_title">Plan Your Travel</h2>
                  <br />
                  <div className="radio_transport">
                    <span className="both_radio">
                      Do You Want Hotel Facility ?
                      <input
                        type="radio"
                        name="hotel"
                        className="radio_1"
                        onChange={handlechange}
                        value="Yes"
                      />
                      Yes
                      <input
                        type="radio"
                        name="hotel"
                        className="radio_2"
                        onChange={handlechange}
                        value="No"
                      />
                      No
                    </span>
                  </div>
                  <br />
                  <div className="radio_transport">
                    <span className="both_radio">
                      Do You Want Transport Facility ?
                      <input
                        type="radio"
                        name="transport"
                        className="radio_1"
                        onChange={handlechange}
                        value="Yes"
                      />
                      Yes
                      <input
                        type="radio"
                        name="transport"
                        className="radio_2"
                        onChange={handlechange}
                        value="No"
                      />
                      No
                    </span>
                  </div>
                  <br />
                  <div className="radio_transport">
                    <span className="both_radio">
                      Do You Want customize your travel places ?
                      <input
                        type="radio"
                        name="customize"
                        className="radio_1"
                        onChange={handlechange}
                        value="Yes"
                      />
                      Yes
                      <input
                        type="radio"
                        name="customize"
                        className="radio_2"
                        onChange={handlechange}
                        value="No"
                      />
                      No
                    </span>
                  </div>
                  <br />
                  <span className="planner_showhidebtn">
                    <input type="submit" value="Submit" className="form_btn" />
                    {showbudgetbtn && (
                      <>
                        <button
                          onClick={handleButtonShowBudget}
                          className="form_btn"
                        >
                          Check Budget
                        </button>
                      </>
                    )}

                    {showpdfbtn && (
                      <button onClick={generatePDF} className="pdf_btn">
                        Download Pdf
                      </button>
                    )}

                    {showcustombtn && (
                      // edited by sac

                      <Link to={`/planner?data=${cityname}`}>
                        {" "}
                        <button className="form_btn">Customize</button>
                      </Link>
                      // edited by sac
                    )}
                  </span>
                  <br />

                  <br />
                  <div>
                    {showText && (
                      <span className="planner_budget">
                        <span>
                          <i class="fas fa-sharp fa-solid fa-hotel"></i>Hotel
                          Price:{" "}
                          <i class="fas fa-sharp fa-regular fa-indian-rupee-sign"></i>
                          {hotel_price}
                        </span>
                        <span>
                          <i class="fas fa-duotone fa-car-side"></i>Transport
                          Price:{" "}
                          <i class="fas fa-sharp fa-regular fa-indian-rupee-sign"></i>
                          {transport_price}
                        </span>
                        <span>
                          <i class="fas fa-sharp fa-regular fa-money-bills"></i>
                          Total Persons: {num_of_people}
                        </span>
                        <span>
                          <i class="fas fa-sharp fa-regular fa-money-bills"></i>
                          <strong>
                            Total Budget:{" "}
                            <i class="fas fa-sharp fa-regular fa-indian-rupee-sign"></i>
                            {/* edited by sac  */}
                            {budget} ( per day per person )
                          </strong>
                          {/* edited by sac ends */}
                        </span>
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div class="panels-container">
              <div class="panel left-panel">
                <div class="form_content">
                  <h3>Shall we proceed ?</h3>
                  <p>
                    Adventure is worthwhile in itself. So, go ahead, plan your
                    trip and let the journey begin!
                  </p>
                  {/* <button
                class="form_btn transparent"
                id="sign-up-btn"
                onClick={handleProceedClick}
              >
                Proceed
              </button> */}
                </div>
                <img src={form_svg} class="form_image" alt="" />
              </div>

              <div class="panel right-panel">
                <div class="form_content">
                  <h3>Want to update something ?</h3>
                  <p>
                    Flexibility is the key to a perfect trip. Feel free to step
                    back and fine-tune your plans until they're exactly how you
                    envision them.
                  </p>
                  <button
                    class="form_btn transparent"
                    id="sign-in-btn"
                    onClick={handleFormClick}
                  >
                    Back
                  </button>
                </div>
                <img src={payment_svg} class="form_image" alt="" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
        
          <Alert message="Please login to access planner!" type="error" />
         
        </>
      )}
    </>
  );
}

export default Form;
