//1.Grab the input value.
function getValue() {
  const textbox = document.querySelector(".js-input");
  return textbox.value;
}
const searchButton = document.querySelector("button");

//when the button is searchButton
searchButton.addEventListener("click", function () {
  let input = getValue();
  input = input.replace(" ", "+");
  console.log(input);
  ajaxCall(input);
});

//when 'Enter' key is pressed
textbox.addEventListener("keyup", function (e) {
  if (e.which === 13) {
    //.which returns the key code of the key, and 13 is keycode for 'Enter' key
    let input = getValue();
    input = input.replace(" ", "+");
    console.log(input);
    ajaxCall(input);
  }
});

//  2. do the data stuff with the API
function ajaxCall(query) {
  const url =
    "https://api.giphy.com/v1/gifs/search?api_key=P5U1CQ8WeUsTnC8LRY5wDK1LsVRiwAmK&q=" +
    query +
    "&limit=50&offset=0&rating=g&lang=en";

  const giphyAjaxCall = new XMLHttpRequest(); //creates a request and assigns it to a variable
  giphyAjaxCall.open("GET", url); // opens the url
  giphyAjaxCall.send(); // gets the data
  giphyAjaxCall.addEventListener("load", function (e) {
    var data = e.target.response;
    pushToGifDiv(data);
  });
}
//  3. display the GIFs
function pushToGifDiv(input) {
  const parsedData = JSON.parse(input);
  console.log(parsedData);

  let urlList = [];
  for (let i = 0; i < parsedData.data.length; i++) {
    urlList.push(parsedData.data[i].images.original.url);
  }
  console.log(urlList);
  let div = document.querySelector(".js-gifs");
  div.innerHTML = " ";
  for (let i = 0; i < urlList.length; i++) {
    let box = document.createElement("span");
    box.className = "gifBox";
    box.innerHTML = '<img class="gifelement" src="' + urlList[i] + '" alt="">';
    div.appendChild(box);
  }
}
