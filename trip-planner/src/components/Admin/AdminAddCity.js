import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminAddCity.css";
import { toast } from "react-toastify";

const AdminAddCity = () => {
  const [cityData, setCityData] = useState({
    title: "",
    sub_title: "",
    description: "",
    img: "",
    view: "true",
    placesToVisit: [],
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
    var placesToVisit = cityData.placesToVisit;
    // for (var i = 0; i < placesToVisit.length; i++) {
    //   console.log(placesToVisit[i]);
    // }

    delete cityData["placesToVisit"];

    try {
      await axios
        .post("http://localhost:3001/addplaces", placesToVisit)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert("Places already exists.");
          console.log(error);
        });
        
      await axios
        .post("http://localhost:3001/addcity", cityData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert("City already exists.");
          console.log(error);
        });

      document.getElementById("placesToVisit").value = "";
      document.getElementById("img").value = "";
      setCityData({
        title: "",
        sub_title: "",
        description: "",
        img: "",
        view: "true",
        placesToVisit: [],
      });
    } catch (error) {
      console.error("Error adding city:", error);
    }
    // console.log(cityData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const reader = new FileReader();

        reader.onloadend = () => {
          // reader.result contains the base64-encoded string
          const base64String = reader.result;

          setCityData({
            ...cityData,
            [event.target.name]: base64String,
          });
        };

        reader.readAsDataURL(file);
      } else {
        setCityData({
          ...cityData,
          [event.target.name]: "",
        });
        document.getElementById(event.target.name).value = "";
        toast.error("Unsupported file type. Please choose a JPG or PNG image.");
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 1024 * 1024 * 1024 * 10; // 10GB Limit
    if (file && file.size > maxSizeInBytes) {
      alert("File size exceeds the limit (10MB)");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        try {
          console.log("step4" + event.target.name);
          const jsonData = JSON.parse(fileContent);
          setCityData({
            ...cityData,
            [event.target.name]: jsonData,
            // placesToVisit : file?.name
          });
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.readAsText(file);
    }
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
                onChange={handleImageChange}
                type="file"
                className="form-control input-text js-input"
                id="img"
                placeholder=""
                name="img"
                // value={cityData.img}
                required
              />
              <label class="label" for="img">
                City Image
              </label>
            </div>
            <div class="form-field col-lg-6 ">
              <input
                type="file"
                className="form-control input-text js-input"
                id="placesToVisit"
                accept=".json"
                onChange={handleFileChange}
                multiple={false}
                name="placesToVisit"
              />
              <label class="label" for="places">
                Places to Visit ( json )
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
