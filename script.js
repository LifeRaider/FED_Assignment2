// Menu
function myFunction() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");

  var buttonImg = document.querySelector('.dropbtn img');

  var socialBar = document.getElementById('social-media-bar');
  socialBar.classList.toggle("hidden");

  if (dropdown.classList.contains("show")) {
    // Change image when dropdown is shown
    buttonImg.src = "Assets/Main_cross.png";
  } else {
    // Change image when dropdown is hidden
    buttonImg.src = "Assets/Main_menu.png";
  }
}


// Navbar
var prevScrollpos = window.scrollY;
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (document.getElementById("index-navbar") != null) {
    var indexnavbar = document.getElementById("index-navbar")
    var menu = document.querySelector('.dropbtn img')
  
    if (currentScrollPos < 100) {
      indexnavbar.style.top = "0";
      indexnavbar.style.backgroundColor = "rgba(0, 0, 0, 0)";
      menu.src = "Assets/Main_menu.png";
    } else if (prevScrollpos > currentScrollPos) {
      indexnavbar.style.top = "0";
    } else {
      indexnavbar.style.top = "-80px";
      indexnavbar.style.backgroundColor = "rgba(0, 0, 0, 1)"
      menu.src = "Assets/Main_menu_light.png";
    }
  } else {
    var navbar = document.getElementById("navbar");

    if (prevScrollpos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-80px";
    }
  }
  prevScrollpos = currentScrollPos;
};


// Event Slide
let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

showSlides();
function currentSlide(index) {
      slideIndex = index;
      showSlides();
}
function plusSlides(step) {
  
  if(step < 0) {
      slideIndex -= 2;
      
      if(slideIndex < 0) {
        slideIndex = slides.length - 1;
      }
  }
  
  showSlides();
}
function showSlides() {
  for(let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove('active');
  }
  slideIndex++;
  if(slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add('active');
    if(timeoutId) {
      clearTimeout(timeoutId);
    }
  timeoutId = setTimeout(showSlides, 5000); // Change image every 5 seconds
}


// Weather
// Temp
document.addEventListener("DOMContentLoaded", function() {
  // Function to fetch and display the current air temperature
  function getAndDisplayAirTemperature() {
    const apiUrl = "https://api.data.gov.sg/v1/environment/air-temperature";

    // Make AJAX request with the parameters
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Assume data structure matches the OpenAPI specification
        const temperatureReading = data.items[0].readings[0].value; // Assuming only one reading is available

        // Update the content in the result div
        const resultDiv = document.getElementById("temp");
        resultDiv.innerHTML = temperatureReading;
      })
  }
  // Call the function when the page loads
  getAndDisplayAirTemperature();
});


// Humidity
document.addEventListener("DOMContentLoaded", function() {
  // Function to fetch and display the current humidity readings
  function getAndDisplayHumidity() {
    const apiUrl = "https://api.data.gov.sg/v1/environment/relative-humidity";

    // Make AJAX request
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Assume data structure matches the OpenAPI specification
        const humidityValue = data.items[0].readings[0].value; // Assuming the first station's value is used

        // Update the content in the result div
        const resultDiv = document.getElementById("rh");
        resultDiv.innerHTML = humidityValue;
      })
  }
  // Call the function when the page loads
  getAndDisplayHumidity();
});


// Air quality
document.addEventListener("DOMContentLoaded", function() {
  // Function to fetch and display the current PM2.5 for the west region
  function getAndDisplayPM25() {
    const apiUrl = "https://api.data.gov.sg/v1/environment/pm25";

    // Make AJAX request with the region parameter
    fetch(apiUrl + "?region=west")
      .then(response => response.json())
      .then(data => {
        // Assume data structure matches the OpenAPI specification
        const pm25Value = data.items[0].readings.pm25_one_hourly.west;

        // Update the content in the result div
        const resultDiv = document.getElementById("air-quality");
        resultDiv.innerHTML = pm25Value;
      })
  }
  // Call the function when the page loads
  getAndDisplayPM25();
});


//UV index
// Function to fetch and display the current UV Index
function getAndDisplayUVIndex() {
  const apiUrl = "https://api.data.gov.sg/v1/environment/uv-index";

  // Make AJAX request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Assume data structure matches the OpenAPI specification
      const uvIndex = data.items[0].index[0].value;

      // Update the content in the result div
      const resultDiv = document.getElementById("uvi");
      resultDiv.innerHTML = uvIndex;
    })
}
// Call the function when the page loads
document.addEventListener("DOMContentLoaded", getAndDisplayUVIndex);


// Rainfall
document.addEventListener("DOMContentLoaded", function() {
  // Function to fetch and display the current rainfall at Clementi Road
  function getAndDisplayRainfall() {
    const apiUrl = "https://api.data.gov.sg/v1/environment/rainfall";

    // Make AJAX request
    fetch(apiUrl + "?date_time=2024-02-05T12:00:00")
      .then(response => response.json())
      .then(data => {
        // Assume data structure matches the OpenAPI specification
        const clementiRoadData = data.items[0].readings.find(station => station.station_id === "S50");

        // Update the content in the result div
        const resultDiv = document.querySelector('.weather video')
        if (clementiRoadData.value > 0.2) {
          resultDiv.src = "Assets/home_raining.mp4";
        } else if(new Date().getHours() > 7 && new Date().getHours() < 19) {
          resultDiv.src = "Assets/home_cloudy_day.mp4";
        } else {
          resultDiv.src = "Assets/home_cloudy_night.mp4";
        }
      })
  }
  // Call the function when the page loads
  getAndDisplayRainfall();
});




// Contact form
//[STEP 0]: Make sure our document is A-OK
document.addEventListener("DOMContentLoaded", function () {
  // What kind of interface we want at the start 
  const APIKEY = "65a541997ebcc7357e02c1f7";
  getContacts();
  // document.getElementById("update-contact-container").style.display = "none";
  // document.getElementById("add-update-msg").style.display = "none";

  //[STEP 1]: Create our submit form listener
  document.getElementById("submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: Let's retrieve form data
    // For now, we assume all information is valid
    // You are to do your own data validation
    let name = document.getElementById("name").value;
    let contact = document.getElementById("contact").value;
    let email = document.getElementById("email").value;
    let type = document.getElementById("type").value;
    let enquiry = document.getElementById("enquiry").value;

    //[STEP 3]: Get form values when the user clicks on send
    // Adapted from restdb API
    let jsondata = {
      "name": name,
      "contact": contact,
      "email": email,
      "type": type,
      "enquiry": enquiry,
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      method: "POST", //[cher] we will use post to send info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        // Disable our button or show loading bar
        document.getElementById("submit").disabled = true;
      }
    }

    //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch("https://student-0862.restdb.io/rest/feedback", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("submit").disabled = false;
        //@TODO update frontend UI 
        // document.getElementById("add-update-msg").style.display = "block";
        setTimeout(function () {
          // document.getElementById("add-update-msg").style.display = "none";
        }, 3000);
        // // Update our table 
        // getContacts();
        // Clear our form using the form ID and triggering its reset feature
        document.getElementById("add-contact-form").reset();
      });
  });//end click 
});
