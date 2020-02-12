function autocomplete(inp, arr) {
    
    var currentFocus;
    
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        
        for (i = 0; i < arr.length; i++) {
          
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          
          currentFocus++;
          
          addActive(x);
        } else if (e.keyCode == 38) { 
          
          currentFocus--;
          
          addActive(x);
        } else if (e.keyCode == 13) {
          
          e.preventDefault();
          if (currentFocus > -1) {
            
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      
      if (!x) return false;
      
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
    
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
 
  var countries = ["Chiny", "Norwegia", "Polska", "Stany Zjednoczone"];
  
    autocomplete(document.getElementById("myInput"), countries);


mostPollutedTown = (country) => {
    console.log(country);
    let url = "https://api.openaq.org/v1/measurements?country=" + country + "&parameter=pm10&order_by=value&sort=desc&limit=10";
    
    fetch(url)
    .then(response => response.json())
    .then(response => {
      var cityListDiv = document.getElementById("cityList");
      cityListDiv.innerHTML = '';
      console.log('top 10 w ' + country);
      console.log(response);
      for(let k=0; k<10; k++) {
        cityListDiv.innerHTML += 
          '<div><button class="accordion">' 
          + response.results[k].location
          + '</button><div class="panel"><p>Poziom zanieczyszczenia: '
          + response.results[k].value 
          + response.results[k].unit
          + '</p></div></div>';
        console.log(response.results[k].location);
      }
      addEventClickToCities();
    })
  }

function Sub(){
   
  var country = document.getElementById("myInput").value; 

  switch (country) {
      case 'Norwegia':
          mostPollutedTown('NO');        
      break;
      case 'Polska':
          mostPollutedTown('PL');
      break;
      case 'Stany Zjednoczone':
          mostPollutedTown('US');      
      break;
      case 'Chiny':
          mostPollutedTown('CN');      
      break;
  }
}

function addEventClickToCities() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}
