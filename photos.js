const baseUrl = "https://images-api.nasa.gov/search?q=";
var url = '';

function performSearch() {
  let searchValue = document.querySelector("#photo-search").value;
  console.log(searchValue);

  url = baseUrl + searchValue;
  url = encodeURI(url);
  console.log(url);

  let response = fetchPhotos(url);
//   console.log(response);
}

function fetchPhotos(url) {
    // try {
    //   let response = await fetch(url);
    //   response = await response.json();
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }


//   fetch(url, {
//     mode: 'no-cors',
//     headers: {
//         "Content-Type": "text/plain",
//         "Access-Control-Allow-Origin": '*',
//         "Access-Control-Allow-Credentials": "true",
//     }})
//     .then((response) => response.json())
//     .catch((error) => console.log(error));


    // let req = new XMLHttpRequest();
    // req.open("GET", url);
    // req.send();

    // req.addEventListener("load", function(){
	//     if(req.status == 200 && req.readyState == 4){
  	//         let response = JSON.parse(req.responseText);
    //         console.log("RESPONSE", response.collection);
    //     }
    //     else{
    //         console.log("error");
    //     }
    // });
}

