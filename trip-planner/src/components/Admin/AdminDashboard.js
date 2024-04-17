import React from "react";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
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

  return (
    <>
      <Link to="/">
        <div class="d-flex justify-content-between align-items-center adminlogout">
          <span class="ms-auto adminlogouttext">Logout</span>
          <i class="fa-solid fa-arrow-right-from-bracket adminlogouticon"></i>
        </div>
      </Link>

      <div style={{ margin: "2rem" }}>
        <div class="row justify-content-center">
          <div class="col-xl-2 col-md-5 mb-4" style={{ marginRight: "8rem" }}>
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Add New City
                      <br />
                      <Link to="/admin/addcity">
                        <button style={{ marginTop: "15px" }}>Add</button>
                      </Link>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-solid fa-rupee-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-md-5 mb-4" style={{ marginRight: "8rem" }}>
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Total Users
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                  </div>
                  <div class="col-auto">
                    {/* <i class="fas fa-dollar-sign fa-2x text-gray-300"></i> */}
                    <i class="fas fa-solid fa-users fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-md-5 mb-4" style={{ marginRight: "8rem" }}>
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Total Organisations
                    </div>
                    <div class="row no-gutters align-items-center">
                      <div class="col-auto">
                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-md-5 mb-4" style={{ marginRight: "8rem" }}>
            <div class="card border-left-warning shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Total Event Posts
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                  </div>
                  <div class="col-auto">
                    {/* <i class="fas fa-comments fa-2x text-gray-300"></i> */}
                    <i class="fas fa-solid fa-indent fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <hr /> */}
      <div className="row m-2">
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
    </>
  );
}

export default AdminDashboard;
