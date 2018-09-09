// Add some Javascript code here, to run on the front end.
//global variable
var test = "hello";

console.log("Welcome to assignment 2!")

// Form submission
window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("the-button").addEventListener("click", function (){
    event.preventDefault();
    var dataForm = new FormData(document.getElementById("form_id"));
    var ConvertedJSON= {
      "Alcohol1": document.getElementById('alcohol_low').value,
      "Alcohol2": document.getElementById('alcohol_high').value,
      "brewer": document.getElementById('brewer').value,
      "categories": document.getElementById('categories').value,
      "style": document.getElementById('style').value,
      "country": document.getElementById('country').value,
    };
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handle_res;
    xhr.open('POST', '/json-handler');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    alert(document.getElementById('country').value);
    xhr.send(JSON.stringify(ConvertedJSON));

    function handle_res(){
      if(this.readState != 4) return;
      if(this.status != 200){
        var beers = JSON.parse(this.responseText);
        alert(beers.length);
    }
  }
  }
)
})

// Helper functions
function checkAge() {
  var date = new Date();
  var now = date.getTime(); // Current time

  var userDate = document.getElementById('day').value +"/"+ document.getElementById('month').value +"/"+  document.getElementById('year').value;
  var bday = new Date(userDate).getTime(); // Time of user's birthday

  var age = (now - bday) / (1000 * 356 * 24 * 3600); // Calculate age

  if (age < 18) {
    // Route to baby page
    window.location = "baby.html";
  } else {
    document.getElementById('popup-wrapper').style.display="none";
  }
}
