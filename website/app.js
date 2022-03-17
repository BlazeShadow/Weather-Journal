// 'npm run devStart' to start the server using nodemon //
/* Steps: 
- take data from user
- take data from api
- send the object data to the server (POST)
- GET the data back from server and display it to user
*/
/* Global variables */
// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
const date = document.getElementById("date");
const content = document.getElementById("content");
const MyApiKey = "acbaec6450bac6c126565392cbf94d26&units=imperial"; // '&units=imperial' inculded in the end

// Selecting the button & adding a click event to excute the app functions
document.getElementById("generate").addEventListener("click",()=>{
    // Taking the data from the user //
    //A const that contains the value of what the user wrote in the 'enter zipcode' textarea
    const zip = document.querySelector("#zip").value;
    //A const that contains the value of what the user wrote in the 'how are you feeling' text area
    const inputFeelings = document.querySelector("#feelings").value;
    // Displays an appropriate message to the user if he didn't input data^ 
    if (!zip && !inputFeelings){
        alert("No zip code or feelings entered")
    }
    else if (!zip){
        alert("No zip code entered")
    }
    else if(!inputFeelings) {
        alert("No feelings entered")
    };
    
    // Getting the data from the API using zipcode that user entered w/ an async function //
    const getFullWeatherData = async(zipCode) => {
        try{
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${MyApiKey}`); //fetching data from API
        const fullObject = await res.json(); //objectifying the data fetched from API in a variable
        const relevantData = {temp: fullObject.main.temp}; //taking temperature data from the object
        /*console.log("getfullweatherdata", relevantData);*/
        return relevantData; //returning the temperature data
    }catch(error){
        console.log(error);
    };};
    getFullWeatherData(zip) //takes zip code
    .then((apiObjectData)=>{ //and temperature data from the function above
        /*console.log("gfwdInsideFunction",apiObjectData);*/
        
        // POSTing/saving data to server //
        const postToServer = async ( url = '', data = {})=>{
            const res = await fetch(url, {
              method: 'POST', 
              credentials: 'same-origin', 
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data),  //stringifying the object       
            });
              try {
              const postedWeatherData =  JSON.stringify(res);
              /*console.log("posttoserver",postedWeatherData);*/
              return postedWeatherData;
              }catch(error) {
                  console.log(error);
              };
          };
        postToServer("/post", {feeling: inputFeelings, temp: apiObjectData.temp}); //saving/posting user's feelings & temperature to server post route
        
        // GETting the data from the server //
        const retrieveToUI = async() => {
            const req = await fetch('/get') //fetching data from server get route
            try {
            const getData = await req.json(); //objectifying returned data in a variable
            /*console.log("retoUI",getData);*/
            // Selecting DOM div elements and setting their values accordingly to display them to the user //
            document.querySelector("#date").innerHTML = "Date is: " + currentDate;
            document.querySelector("#temp").innerHTML = "Temperature is: " + Math.round(getData.temp) + "°F";
            document.querySelector("#content").innerHTML = "Your feelings are:  " + getData.feeling;
            }catch(error){
                console.log(error)
            };
        };
        retrieveToUI();
    });
});