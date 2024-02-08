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
};


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


if (window.location.href.indexOf("index.html") > -1) {
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
  
    // Function to fetch and display the current PM2.5 for the west region
    function getAndDisplayPM25() {
      const apiUrl = "https://api.data.gov.sg/v1/environment/pm25";
  
      // Make AJAX request with the region parameter
      fetch(apiUrl)
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
    getAndDisplayUVIndex()
  
    // Function to fetch and display the current rainfall at Clementi Road
    function getAndDisplayRainfall() {
      const apiUrl = "https://api.data.gov.sg/v1/environment/rainfall";
  
      // Make AJAX request
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Assume data structure matches the OpenAPI specification
          const clementiRoadData = data.items[0].readings.find(station => station.station_id === "S50").value;
          // Update the content in the result div
          const resultDiv = document.querySelector('.weather video')
          if (clementiRoadData > 0.2) {
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
};

//Maps
// Function to show the popup
function showPopup() {
  document.getElementById('popup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// Adding event listener to your POI image
document.getElementById('Overlay').addEventListener('click', showPopup);

// Contact form
if (window.location.href.indexOf("aboutUs.html") > -1) {
  //[STEP 0]: Make sure our document is A-OK
  document.addEventListener("DOMContentLoaded", function () {
    // What kind of interface we want at the start 
    const APIKEY = "65a541997ebcc7357e02c1f7";
    document.getElementById("feedback-msg").style.display = "none";
    
    //[STEP 1]: Create our submit form listener
    document.getElementById("feedback-submit").addEventListener("click", function (e) {
      // Prevent default action of the button 
      e.preventDefault();
  
      //[STEP 2]: Let's retrieve form data
      // For now, we assume all information is valid
      // You are to do your own data validation
      let name = document.getElementById("feedback-name").value;
      let contact = document.getElementById("feedback-contact").value;
      let email = document.getElementById("feedback-email").value;
      let type = document.getElementById("feedback-type").value;
      let enquiry = document.getElementById("feedback-enquiry").value;
  
      //[STEP 3]: Get form values when the user clicks on send
      // Adapted from restdb API
      let jsondata = {
        "name": name,
        "sContact": contact,
        "sEmail": email,
        "sType": type,
        "sEnquiry": enquiry,
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
          document.getElementById("feedback-submit").disabled = true;
        }
      }
  
      //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://student-0862.restdb.io/rest/feedback", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("feedback-submit").disabled = false;
          //@TODO update frontend UI 
          document.getElementById("feedback-msg").style.display = "block";
          setTimeout(function () {
            document.getElementById("feedback-msg").style.display = "none";
          }, 3000);
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("feedback-form").reset();
        });
    });//end click 
  });
};


// Rewards
if (window.location.href.indexOf("signUp.html") > -1) {
  if (loginName != ""){

  }
};



// Sign up
if (window.location.href.indexOf("signUp.html") > -1) {
  // Contact form
  //[STEP 0]: Make sure our document is A-OK
  document.addEventListener("DOMContentLoaded", function () {
    // What kind of interface we want at the start 
    const APIKEY = "65c44073cca7367aab653555";
    // document.getElementById("feedback-msg").style.display = "none";
    
    //[STEP 1]: Create our submit form listener
    document.getElementById("signup-submit").addEventListener("click", function (e) {
      // Prevent default action of the button 
      e.preventDefault();
  
      //[STEP 2]: Let's retrieve form data
      // For now, we assume all information is valid
      // You are to do your own data validation
      let fName = document.getElementById("signup-fName").value;
      let lName = document.getElementById("signup-lName").value;
      let email = document.getElementById("signup-email").value;
      let username = document.getElementById("signup-username").value;
      let password = document.getElementById("signup-password").value;
      let cfmPassword = document.getElementById("signup-cfmPassword").value;
      let points = 0;

      if (password !== cfmPassword) {
        alert("Passwords do not match!! Please try again");
        return;
      }
  
      //[STEP 3]: Get form values when the user clicks on send
      // Adapted from restdb API
      let jsondata = {
        "First Name": fName,
        "Last Name": lName,
        "Email": email,
        "Username": username,
        "Password": password,
        "Points": points,
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
          document.getElementById("signup-submit").disabled = true;
        }
      }
  
      //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://studentcruddashboard-f834.restdb.io/rest/logindata", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("signup-submit").disabled = false;
          //@TODO update frontend UI 
          // document.getElementById("feedback-msg").style.display = "block";
          // setTimeout(function () {
          //   document.getElementById("feedback-msg").style.display = "none";
          // }, 3000);
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("signup-form").reset();
        });
    });//end click 
  });
};




var loginName = "";
var loginPoints = "";
// Login
if (window.location.href.indexOf("login.html") > -1) {
  // Contact form
  //[STEP 0]: Make sure our document is A-OK
  document.addEventListener("DOMContentLoaded", function () {
    // What kind of interface we want at the start 
    const APIKEY = "65c44073cca7367aab653555";
    // document.getElementById("feedback-msg").style.display = "none";
    
    //[STEP 1]: Create our submit form listener
    document.getElementById("login-submit").addEventListener("click", function (e) {
      // Prevent default action of the button 
      e.preventDefault();
  
      //[STEP 2]: Let's retrieve form data
      // For now, we assume all information is valid
      // You are to do your own data validation
      let username = document.getElementById("login-fName").value;
      let password = document.getElementById("login-lName").value;

      //[STEP 7]: Create our AJAX settings
      let settings = {
        method: "GET", //[cher] we will use GET to retrieve info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      }

      //[STEP 8]: Make our AJAX calls
      fetch("https://studentcruddashboard-f834.restdb.io/rest/logindata", settings)
        .then(response => response.json())
        .then(response => {
          for (var i = 0; i < response.length; i++) {
            if (username == response[i].Username && password == response[i].password){
              var login = document.getElementById("login-btn");
              login.innerHTML = response[i].Username;
              login.style.pointerEvents = "none";
              loginPoints = response[i].Points;
              window.location.href = 'index.html';
            }
          }
        });
    });//end click 
  });
};
