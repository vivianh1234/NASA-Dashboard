$(document).ready(function(){
    getDate();
   //  getPhoto();
   })
   
   function getDate(){
       var date = new Date();
       console.log(date)
       var dd = parseInt(String(date.getDate()).padStart(2, '0'));
       var mm = parseInt(String(date.getMonth() + 1).padStart(2, '0')); //January is 0!
       var yyyy = date.getFullYear();
       console.log(yyyy,mm,dd)
      getAstroids(yyyy,mm,dd)
      
   }
   
   function getAstroids(yyyy,mm,dd){
       
       var queryURL = "https://api.nasa.gov/neo/rest/v1/feed?end_date=" +yyyy+"-"+mm+"-"+dd+"&api_key=tEZcdcYgqv4qRNe0W8QrLu2ed5kywhjxxLWvofzI";
       
       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function(response){
           if(dd<10&&mm<10){
               var todayDate = String(yyyy+"-0"+mm+'-0'+dd)
           }else if(mm>10&&dd<10){
               var todayDate = String(yyyy+"-"+mm+'-0'+dd)
           }else if(mm<10&&dd>10){
               var todayDate = String(yyyy+"-0"+mm+'-'+dd)
           }else if(mm>=10&&dd>=10){
               var todayDate = String(yyyy+"-"+mm+'-'+dd)
           }
           
           var number = response.element_count;
           // console.log(number)
           $("#number").text("Number of Near Earth Object in the last week: " + number)
   
          
       for(i=0; i<number; i++){
           var getData = response.near_earth_objects;
           var getData2 = getData[todayDate][i];
           var getName = getData2.name;
           var getDistance = getData2.close_approach_data[0].miss_distance.miles;
           var distanceRounded =  parseInt(getDistance).toFixed();
           distanceRounded = distanceRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
           var getVelocity = getData2.close_approach_data[0].relative_velocity.miles_per_hour;
           var velocityRounded = parseInt(getVelocity).toFixed();
           velocityRounded = velocityRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
           var getLink = getData2.nasa_jpl_url
       
           var card = $("<div class = 'card'  id = 'datacard'>")
           var cardbody = $("<div class = 'card-body'>")
           var nameofAstroid = $("<p>").text("Name of Object: " + getName)
           var missDistance = $("<p>").text("Distance from Earth: " + distanceRounded + " miles away")
           var velocity = $("<p>").text("Velocity of Object: " + velocityRounded + " miles per hour")
           var link = $("<p>").append("<a href = "+getLink+" id='learn'> Learn More")
   
           cardbody.append(nameofAstroid, missDistance, velocity, link)
           card.append(cardbody)
           $(".data").append(card)
   
       }
   
   })
   
   }
   
   