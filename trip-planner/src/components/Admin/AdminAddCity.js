import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminAddCity.css";

const AdminAddCity = () => {
  const [cityData, setCityData] = useState({
    title: "",
    sub_title: "",
    description: "",
    img: "",
    // placesToVisit: []
  });

  // useEffect(() => {
  //   async function Addcity() {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3001/addcity",
  //         cityData
  //       );
  //       // const response = await axios.post("http://localhost:3001/addcity", cityData);
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error fetching Blog details:", error);
  //     }
  //   }

  //   Addcity();
  //   // axios
  //   //   .post("http://localhost:3001/addcity", cityData)
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // }, [cityData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCityData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleAddPlace = () => {
  //     setCityData(prevState => ({
  // ...prevState,
  //         placesToVisit: [...prevState.placesToVisit, '']
  //     }));
  // };

  // const handlePlaceInputChange = (e, index) => {
  //     const { value } = e.target;
  //     setCityData(prevState => {
  //         const updatedPlacesToVisit = [...prevState.placesToVisit];
  //         updatedPlacesToVisit[index] = value;
  //         return {
  //             ...prevState,
  //             placesToVisit: updatedPlacesToVisit
  //         };
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("cityData", cityData);
    try {
      await axios
        .post("http://localhost:3001/addcity", cityData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert("City already exists.");
          console.log(error);
        });

      setCityData({
        title: "",
        sub_title: "",
        description: "",
        img: "",
      });
    } catch (error) {
      console.error("Error adding city:", error);
    }
    // console.log(cityData);
  };

  return (
    <>
      <div>
        <Link to="/admin/dashboard">
          <i class="fa-solid fa-arrow-left" id="fasbackicon"></i>
        </Link>
      </div>
      <div>
        <section class="get-in-touch">
          <h1 class="title">Add New City</h1>
          <form class="contact-form row" onSubmit={handleSubmit}>
            <div class="form-field col-lg-6">
              <input
                id="title"
                class="input-text js-input"
                type="text"
                name="title"
                value={cityData.title}
                onChange={handleInputChange}
                required
              />
              <label class="label" for="title">
                CityName
              </label>
            </div>
            <div class="form-field col-lg-6 ">
              <input
                id="sub_title"
                class="input-text js-input"
                type="text"
                name="sub_title"
                value={cityData.sub_title}
                onChange={handleInputChange}
                required
              />
              <label class="label" for="sub_title">
                Alias
              </label>
            </div>
            {/*  */}
            <div class="form-field col-lg-6 ">
              <input
                id="img"
                class="input-text js-input"
                type="text"
                name="img"
                value={cityData.img}
                onChange={handleInputChange}
              />
              <label class="label" for="img">
                City Image
              </label>
            </div>
            <div class="form-field col-lg-6 ">
              <input id="places" class="input-text js-input" type="text" />
              <label class="label" for="places">
                Places to Visit
              </label>
            </div>
            {/*  */}
            <div class="form-field col-lg-12">
              <input
                id="description"
                class="input-text js-input"
                type="text"
                name="description"
                value={cityData.description}
                onChange={handleInputChange}
                required
              />
              <label class="label" for="description">
                Description
              </label>
            </div>
            <div class="form-field col-lg-12">
              <input class="submit-btn" type="submit" value="Submit" />
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default AdminAddCity;
