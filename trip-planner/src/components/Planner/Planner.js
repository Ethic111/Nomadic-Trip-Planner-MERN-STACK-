import React, { useState, useRef, useEffect } from 'react'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { Link } from 'react-router-dom';
import "./Planner.css"
import axios from 'axios'
import jsPDF from "jspdf";


const center = { lat: 48.8584, lng: 2.2945 };

function Planner(props) {
  // edited by sac

  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const dataReceived = searchParams.get('data')

  const [day1, setDay1] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);
  const [available, setavailable] = useState([]);
  const [cityname, setplace] = useState(dataReceived);


  useEffect(() => {

    axios.post("http://localhost:3001/getplanner", { cityname })
    // axios.post("https://trip-planner-iq8f.vercel.app/getplanner", { cityname })
      .then((response) => {
        const { cityname, Day1, Day2, Day3 } = response.data;
        setplace(cityname)
        setDay1(Day1);
        setDay2(Day2);
        setDay3(Day3);
        console.log(Day1)
      })
      .catch((err) => console.log(err));

  }, []);

  // edited by sac ends

//  ===================================For Google Maps (Ignore)==========================================

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  /**@type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const [map, setMap] = useState(/** @type google.maps.Map */(null))


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],

  })
  if (!isLoaded) {
    return console.log("Loading in progress")
  }


  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.test)

  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  // ==============================Google Maps Code Ends=======================================================


  // =========================================For Customization=================================================
  function remove(id, day) {
    console.log(id)
    if (day === 'Day1') {
      const filtered_array = day1.filter((ele) => { if (ele._id !== id) { return true; } else { const updatedAvaialable = [...available, ele]; setavailable(updatedAvaialable); } })
      setDay1(filtered_array)
    }
    else if (day === 'Day2') {
      const filtered_array = day2.filter((ele) => { if (ele._id !== id) { return true; } else { const updatedAvaialable = [...available, ele]; setavailable(updatedAvaialable); } })
      setDay2(filtered_array)
    }
    else if (day === 'Day3') {
      const filtered_array = day3.filter((ele) => { if (ele._id !== id) { return true; } else { const updatedAvaialable = [...available, ele]; setavailable(updatedAvaialable); } })
      setDay3(filtered_array)
    }
  }

  function add(id) {
    const inputValue = window.prompt('Enter a value:');
    if ('1' === inputValue) {
      const filtered_array = available.filter((ele) => { if (ele._id !== id) { return true; } else { const updatedAvaialable = [...day1, ele]; setDay1(updatedAvaialable); } })
      setavailable(filtered_array)
    }
    else if ('2' === inputValue) {
      const filtered_array = available.filter((ele) => { if (ele._id !== id) { return true; } else { const updatedAvaialable = [...day2, ele]; setDay2(updatedAvaialable); } })
      setavailable(filtered_array)
    }
    else if ('3' === inputValue) {
      const filtered_array = available.filter((ele) => { if (ele._id !== id) { return true; } else { const updatedAvaialable = [...day3, ele]; setDay3(updatedAvaialable); } })
      setavailable(filtered_array)
    }
  }


  const generatePDF = () => {

    console.log(day1, day2, day3)
    const doc = new jsPDF();

    // Set the maximum width and height for the content area
    const maxWidth = doc.internal.pageSize.getWidth();
    const maxHeight = doc.internal.pageSize.getHeight();
    doc.setFont("Fredoka", 'bold');
    doc.setFontSize(24);
    doc.addImage("https://i.ibb.co/QKkrvRx/Main-logo.png", 10, 5, 35, 15)
    doc.text("Your trip to " + cityname.toUpperCase() + ", India", 15, 35);
    doc.setFontSize(13)
    doc.setFont("Fredoka", 'light')
    doc.setTextColor(0, 117, 195)
    doc.text("**Discover the magic of your next adventure - where every destination is a story and every moment", 15, 45)
    doc.text(" is a memory in the making.", 15, 53)
    doc.setFont("Fredoka", 'bold');
    doc.setTextColor(0, 0, 0)
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
      if (place.place_type === 'Attraction') {
        const imageData = place.place_img;

        const description = `Place: ${place.place_name}\nType: ${place.place_type}\nTime: ${place.time}\n`;

        // Add the image with description
        addImageWithDescription(imageData, description);
      }

    });

    day2.map((place, index) => {
      if (place.place_type === 'Attraction') {
        const imageData = place.place_img;

        const description = `Place: ${place.place_name}\nType: ${place.place_type}\nTime: ${place.time}\n`;

        // Add the image with description
        addImageWithDescription(imageData, description);
      }
    });

    day3.map((place, index) => {
      if (place.place_type === 'Attraction') {
        const imageData = place.place_img;

        const description = `Place: ${place.place_name}\nType: ${place.place_type}\nTime: ${place.time}\n`;

        // Add the image with description
        addImageWithDescription(imageData, description);
      }
    });

    // Save the PDF
    doc.save(`${cityname}-travel-itinerary.pdf`);
  };
  // ===============================================Customization and pdf generated==================================

  return (

    <div className='planner_container'>
      <div className='planner_main_left_panel'>
        {/* Planner Header */}
        <div className='planner_main_header'>
          <div className='planner_header_left_arrow_icon'>
            {/* <i className='fas fa-solid fa-arrow-left fa-shake'></i> */}
            <Link to={`/form?${searchParams}`}>
            <i class="fa-solid fa-chevron-left"></i>
            </Link>
          </div>

          <div className='planner_header_left_logo'>
            <Link to="/"><img src="https://i.ibb.co/QKkrvRx/Main-logo.png" alt="Trip Planner Logo" width="110px" height="50px" /></Link>
          </div>
        </div>



        {/* Cards Code */}
        <div className='planner_main_section_container'>

          <div className='planner_section_heading'>
            {/* edited by sac  */}

            <h2>Top sights in {cityname.toUpperCase().charAt(0)}{cityname.slice(1)}</h2>
            <p>Select the places you would like to include for your visit in {cityname}</p>
            <hr></hr>

            <h2>Day 1 :-</h2>
            <hr></hr>

            {day1.map((place) => {
              if (place.place_type === 'Attraction') {
                const imageData = place.place_img;
                // const description = `Place: ${place.place_name}\n  Type: ${place.place_type}\n  Time: ${place.time}\n`;
                return (<>
                <div  className='customize_main_list_div'>
                  <div>

                  <img src={imageData} style={{width:12 +"em",height : 12+ "em", objectFit : "contain"}} alt='no' />
                  </div>
                <div style={{marginLeft: 7+ "em"}} className='customize_div_description'>
                <p>🌇 Place : {place.place_name}</p>
                <p>🤯 Type : {place.place_type}</p>
                <p>⏳ Time : {place.time}</p>
                </div>
                <div className='remove_btn'>

                <button onClick={() => remove(place._id, 'Day1')} >Delete</button> 
                </div>

                </div>
               
                
                </>)
              }
            })}
            <hr></hr>

            <h2>Day 2 :-</h2>
            <hr></hr>

            {day2.map((place) => {
              if (place.place_type === 'Attraction') {
                const imageData = place.place_img;
                // const description = `Place: ${place.place_name}\n  Type: ${place.place_type}\n  Time: ${place.time}\n`;
                return (<>
                <div style={{display:"flex"}} className='customize_main_list_div'>
                <br></br>
                <img src={imageData} style={{width:12 +"em",height : 12+ "em", objectFit : "contain"}} alt='no' />
                <div style={{marginLeft: 7+ "em"}} className='customize_div_description'>
                <p>🌇 Place : {place.place_name}</p>
                <p>🤯 Type : {place.place_type}</p>
                <p>⏳ Time : {place.time}</p>
                </div>
                <div className='remove_btn'>

                <button onClick={() => remove(place._id, 'Day2')} >Delete</button> 
                </div>

                </div>
               
                
                </>)
              }
            })}
            <hr></hr>

            Day 3:
            <hr></hr>

            {day3.map((place) => {
              if (place.place_type === 'Attraction') {
                const imageData = place.place_img;
                // const description = `Place: ${place.place_name}\n  Type: ${place.place_type}\n  Time: ${place.time}\n`;
                return (<>
                <div style={{display:"flex"}} className='customize_main_list_div'>
                <br></br>
                <img src={imageData} style={{width:12 +"em",height : 12+ "em", objectFit : "contain"}} alt='no' />
                <div style={{marginLeft: 7+ "em"}} className='customize_div_description'>
                <p>🌇 Place : {place.place_name}</p>
                <p>🤯 Type : {place.place_type}</p>
                <p>⏳ Time : {place.time}</p>
                </div>
                <div className='remove_btn'>

                <button onClick={() => remove(place._id, 'Day3')} >Delete</button> 
                </div>

                </div>
               
                
                </>)
              }
            })}
          </div>
          <hr></hr>

          <h2 style={{marginLeft: 1 +"em"}}><strong>Available places:</strong></h2>
          <hr></hr>

          {available.map((place) => {
            if (place) {
              const imageData = place.place_img;
              // const description = `Place: ${place.place_name}\n  Type: ${place.place_type}\n  Time: ${place.time}\n`;
              return (<>
              <div style={{display:"flex", padding:2+"em"}} className='customize_main_list_div'>
              <br></br>
              <img src={imageData} style={{width:12 +"em",height : 12+ "em", objectFit : "contain"}} alt='no' />
              <div style={{marginLeft: 7+ "em"}} className='customize_div_description'>
              <p>🌇 Place : {place.place_name}</p>
              <p>🤯 Type : {place.place_type}</p>
              <p>⏳ Time : {place.time}</p>
              </div>
              <div className='remove_btn'>

              <button onClick={() => add(place._id)} >Add</button> 
              </div>

              </div>
             
              
              </>)
            }
            else {
              return (<>no available places to add</>)
            }
          })}

          <button onClick={generatePDF} className="pdf_btn" style={{marginLeft : 5 + "em"}}>
            Download Pdf
          </button>
          {/* edited by sac ends */}

          {/* Buttons Code */}

          <div className="planner_section_button_container">

          </div>


          {/* <div>
            {
              day1.map((data, index) => {
                if (data.place_type === "Attraction") {
                  return (
                    <div key={index} className='planner_section_cards'>
                      <img src={data.place_image} alt={data.place_name} className='planner_section_cards_image' />
                      <div className='planner_section_cards_description'>
                        <div className="planner_s_c_d_heading">
                          <h3>{data.place_name}</h3>
                          <form>
                            <input type="checkbox" name="plannercheckbox" className='planner_checkbox' />
                          </form>
                        </div>
                        <div className="planner_s_c_d_para">
                          <p>ABC</p>
                          <p>{data.description}</p>
                        </div>
                        <div className="planner_s_c_d_utilities">
                          <p>{data.place_time}</p>
                        </div>
                      </div>
                    </div>
                  )
                }


              }) 
            }
          </div> */}


        </div>

      </div>

      <div className="planner_main_right_panel">
        {/* Mapping Code */}
        <div>
          {/* Google Map */}

          <div
            id="google-map" // Add an id to this div for Google Maps integration
            style={{
              position: "absolute",
              margin: "20px",
              marginTop: "90px",
              width: "100%",
              height: "80vh"

            }}
          >
            {/* Display your Google Map here */}
            <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: "100%" }} onLoad={(map) => setMap(map)}>
              <Marker position={center}>

              </Marker>
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
          </div>

          <div className='google_navigation_div'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Autocomplete>

                <div style={{ flex: 1 }}>
                  <input type="text" placeholder="Origin" ref={originRef} />
                </div>
              </Autocomplete>
              <Autocomplete>

                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Destination"
                    ref={destinationRef}
                  />
                </div>
              </Autocomplete>
              <div>
                <button
                  style={{ backgroundColor: 'pink', color: 'white' }}
                  onClick={calculateRoute}
                >
                  Calculate Route
                </button>
                <button onClick={clearRoute}>Clear Route</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <div>Distance: {distance}</div>
              <div>Duration: {duration}</div>
              <button
                onClick={() => map.panTo(center)}
              >
                Center Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planner
