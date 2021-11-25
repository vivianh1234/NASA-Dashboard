let url = 'https://images-api.nasa.govacters';

let result = document.getElementById("results");

let imgCount = 1;

let addToDom = (element) => {

  let div_ele = document.createElement("div");
  div_ele.setAttribute("class", "card-char");

  let img_ele = document.createElement("img");
  img_ele.setAttribute("class", "card-img");
  img_ele.setAttribute("src", element.imageUrl);
  img_ele.setAttribute("alt", "charecter-"+imgCount);
  img_ele.setAttribute("style", "height:250px;width:250px;padding:10px;padding-bottom:10px;");
  div_ele.appendChild(img_ele);

  let div_ele2 = document.createElement("div");
  div_ele2.setAttribute("class", "card-info");
  div_ele.appendChild(div_ele2);
  div_ele2.setAttribute("style", "text-align:center;width:250px;")

  let h4_ele = document.createElement("h3");
  h4_ele.textContent = element.fullName;
  div_ele2.appendChild(h4_ele);

  let p_ele = document.createElement("p");
  p_ele.textContent = element.title;
  div_ele2.appendChild(p_ele);

  result.appendChild(div_ele)
  imgCount++;
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach(element => {
      addToDom(element);
    });
  })
  .catch((error) => {
      console.log(error);
  });
