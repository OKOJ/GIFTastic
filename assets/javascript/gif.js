/*1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you.Save it to a variable called `topics`.*We chose animals
for our theme, but you can make a list to your own liking.

2. Your app should take the topics in this array and create buttons in your HTML.*Try using a loop that appends a button
for each string in the array.

3. When the user clicks on a button, the page should grab 10 static, non - animated gif images from the GIPHY API and place them on the page.

4. When the user clicks one of the still GIPHY images, the gif should animate.If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating(PG, G, so on).*This data is provided by the GIPHY API.*Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page takes the value from a user input box and adds it into your `topics`
array.Then make a function call that takes each topic in the array remakes the buttons on the page.*/

var winterSports = ["skiing", "snowboarding", "curling", "ice hockey", "bobsled", "snowmobiling", "biathlon", "figure skating", "ski jumping"];
// making buttons with a topic theme
function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < winterSports.length; i++) {

    var button = $("<button>");

    button.text(winterSports[i]);

    button.attr("data-topic", winterSports[i]);

    button.addClass("button-topic");

    $("#buttons-view").append(button);
  };
};
renderButtons();
//search input and add button , when new search is added new button will be made 
$("#add-topic").on("click", function (event) {
  event.preventDefault();
  var search = $("#search-input").val().trim();
  winterSports.push(search);
  renderButtons();
  $("#search-input").val("")
});
//getting the requested info from the API
$(document).on("click", ".button-topic", function () {

  var topic = $(this).attr("data-topic");
  //console.log(topic);
  var api_key = "4ZCLxfuC8PLbhVQQWOnCB67ShuSWgBiL";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + api_key + "&limit=10";
//query parametre api_key: q: limit: rating:
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //console.log(response);
    for (var i = 0; i < response.data.length; i++) {
//making divs to display gifs adding attributes for the animated and still data
      var sportsDiv = $("<div>");
      sportsDiv.addClass("image");
      var p = $("<p>").text("Rating: " + response.data[i].rating);
      var sportsImage = $("<img>");
      sportsImage.attr({
        "src": response.data[i].images.fixed_height_still.url,
        "data-still": response.data[i].images.fixed_height_still.url,
        "data-animate": response.data[i].images.fixed_height_downsampled.url,
        "data-state": "still"
      });
//making icons for favorite and download buttons
      var iconFav = $("<input>");
      iconFav.attr({
        "type": "image",
        "src": "https://www.searchpng.com/wp-content/uploads/2019/02/favorite-icon-PNG.png",
        "alt": "Click me",
        "width": 28,
        "height": 28
      });
//function to download gif

//
      var iconDownld = $("<input>");
      iconDownld.attr({
        "type": "image",
        "src": "https://www.lua.org/images/downloadarrow.png",
        "id": "download",
        "width": 28,
        "height": 28,
      });
//function to put to add their favorite gifs to a favorites section

//
//attaching rating and icons to the each gif
      var pIcon = $("<p>").append(iconFav, iconDownld);
      sportsImage.addClass("gif");
      sportsDiv.append(sportsImage);
      sportsDiv.append(p);
      sportsDiv.append(pIcon);
      $("#gif-area").append(sportsDiv);
    };
//gif are still, making gifs animated or still, if you click on it
    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
  $("#gif-area").empty()
});