import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Switch from "react-switch";
import "./Admin.css";

const Admin = () => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  );
  const [status, setStatus] = useState(
    () => localStorage.getItem("status") || "open"
  );

  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gettours")
      // axios.get('https://trip-planner-iq8f.vercel.app/getcitiesforadmin')

      .then((response) => {
        // Set checked property to true for each city
        const cities = response.data.map((city) => ({
          ...city,
          checked: city.view,
        }));
        setDetails(cities);
      })
      .catch((err) => console.log(err))

      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const handlecitydelete = (title) => {
    // console.log(title)
    axios
      .delete(`http://localhost:3001/deletecity/${encodeURIComponent(title)}`)
      .then((response) => {
        // console.log(response);
        setDetails((prevDetails) =>
          prevDetails.filter((city) => city.title !== title)
        );
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const handleSwitchChange = (checked, title) => {
    setDetails((prevDetails) =>
      prevDetails.map((city) =>
        city.title === title ? { ...city, checked: checked } : city
      )
    );

    if (checked) {
      // If the switch is checked, make PUT request to enable city
      console.log("City enabled:", title);
      axios
        .put(`http://localhost:3001/enablecity/${encodeURIComponent(title)}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error enabling city:", error);
        });
    } else {
      axios
        .put(`http://localhost:3001/disablecity/${encodeURIComponent(title)}`)
        .then((response) => {})
        .catch((error) => {
          console.log("Error disabling city:", error);
        });
      console.log("City disabled:", title);
    }
  };

  //   useEffect(() => {
  //     document.body.classList.toggle("dark", mode === "dark");
  //     localStorage.setItem("mode", mode);
  //   }, [mode]);

  //   useEffect(() => {
  //     const sidebar = document.querySelector("nav");
  //     sidebar.classList.toggle("close", status === "close");
  //     localStorage.setItem("status", status);
  //   }, [status]);

  const handleModeToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleSidebarToggle = () => {
    setStatus((prevStatus) => (prevStatus === "open" ? "close" : "open"));
  };

  return (
    <>
      <div>
        <div className="mode-toggle" onClick={handleModeToggle}>
          <span className={`switch ${mode === "dark" ? "on" : "off"}`}></span>
        </div>
        <button className="sidebar-toggle" onClick={handleSidebarToggle}>
          Toggle Sidebar
        </button>

        <nav>
          <div class="logo-name">
            <div class="logo-image">
              <img src="images/logo.png" alt="" />
            </div>
            <span class="logo_name">
              <Link to="/">
                <img
                  src="https://i.ibb.co/QKkrvRx/Main-logo.png"
                  alt="Trip Planner Logo"
                  width="125px"
                  height="55px"
                />
              </Link>
            </span>
          </div>
          <div class="menu-items">
            <ul class="nav-links">
              <li>
                <Link to="/admin/dashboard">
                  <i class="uil uil-estate"></i>
                  <span class="link-name">Dahsboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/cities">
                  <i class="uil uil-files-landscapes"></i>
                  <span class="link-name">Cities</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard">
                  <i class="uil uil-chart"></i>
                  <span class="link-name">Locations</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard">
                  <i class="uil uil-thumbs-up"></i>
                  <span class="link-name">Like</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard">
                  <i class="uil uil-comments"></i>
                  <span class="link-name">Comment</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard">
                  <i class="uil uil-share"></i>
                  <span class="link-name">Share</span>
                </Link>
              </li>
            </ul>

            <ul class="logout-mode">
              <li>
                <Link to="/admin/dashboard">
                  <i class="uil uil-signout"></i>
                  <span class="link-name">Logout</span>
                </Link>
              </li>
              <li class="mode">
                <a href="#">
                  <i class="uil uil-moon"></i>
                  <span class="link-name">Dark Mode</span>
                </a>
                <div class="mode-toggle">
                  <span class="switch"></span>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <section class="dashboard" style={{ marginTop: "-25px" }}>
          <div class="top">
            <i class="uil uil-bars sidebar-toggle"></i>
            <div class="search-box">
              <i class="uil uil-search"></i>
              <input type="text" placeholder="Search here..." />
            </div>

            {/* <!--<img src="images/profile.jpg" alt="">--> */}
          </div>
          <div class="dash-content">
            <div class="overview">
              <div class="title">
                <i class="uil uil-tachometer-fast-alt"></i>
                <span class="text">All Cities</span>
              </div>
              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                <Link to="/admin/addcity">
                  <button style={{ marginLeft: "15px" }}>Add New City</button>
                </Link>
              </div>
            </div>
            <div className="row" style={{ marginTop: "3.2rem" }}>
              <div className="col-12">
                {/* <br /> */}

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" className="tablehead align-middle">
                        Sno
                      </th>
                      <th scope="col" className="tablehead align-middle">
                        City Name
                      </th>
                      <th scope="col" className="tablehead align-middle">
                        Known As
                      </th>
                      <th scope="col" className="tablehead align-middle">
                        Description
                      </th>
                      <th scope="col" className="tablehead align-middle">
                        Image
                      </th>
                      <th scope="col" className="tablehead align-middle">
                        Enable/Disable
                      </th>
                      <th scope="col" className="tablehead align-middle">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>
                        <div type="text" className="inputdiv">
                          <input
                            className="trtext"
                            name="cityname"
                            //   value={filters.memberid}
                            //   onChange={handleFilterInputChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div type="text" className="inputdiv">
                          <input
                            className="trtext"
                            name="knownas"
                            //   value={filters.username}
                            //   onChange={handleFilterInputChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div type="text" className="inputdiv">
                          <input
                            style={{ width: "56.5rem" }}
                            className="trtext"
                            name="desc"
                            //   value={filters.name}
                            //   onChange={handleFilterInputChange}
                          />
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {/* <tr>
                <td className="trtext"></td>
                <td className="trtext">Hello</td>
                <td className="trtext">Hello</td>
                <td className="trtext">Hello</td>
                <td className="trtext">Hello</td>
                
                <td className="trtext">
                  <Switch/>
                </td>
                <td className="trtext">
                  <button
                    className="addmembtn"
                    //   onClick={() => handlememberdelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr> */}
                    {details.map((city, index) => (
                      <tr key={city._id}>
                        <td className="trtext">{index + 1}</td>
                        <td className="trtext">{city.title}</td>
                        <td className="trtext">{city.sub_title}</td>
                        <td className="trtext">{city.description}</td>
                        <td className="trtext">
                          <img
                            src={city.img}
                            alt="City icon"
                            height="50rem"
                            width="50rem"
                            style={{ margin: "5px" }}
                          />
                        </td>

                        <td className="trtext">
                          <Switch
                            onChange={(checked) =>
                              handleSwitchChange(checked, city.title)
                            }
                            checked={city.checked}
                            className="react-switch m-2 mt-3"
                          />
                        </td>
                        <td className="trtext">
                          <button
                            type="button"
                            class="btn btn-danger m-2"
                            onClick={() => handlecitydelete(city.title)}
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div></div>
    </>
  );
};

export default Admin;
