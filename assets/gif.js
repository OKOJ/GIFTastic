/*1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you.Save it to a variable called `topics`.*We chose animals
for our theme, but you can make a list to your own liking.

2. Your app should take the topics in this array and create buttons in your HTML.*Try using a loop that appends a button
for each string in the array.

3. When the user clicks on a button, the page should grab 10 static, non - animated gif images from the GIPHY API and place them on the page.

4. When the user clicks one of the still GIPHY images, the gif should animate.If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating(PG, G, so on).*This data is provided by the GIPHY API.*Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page takes the value from a user input box and adds it into your `topics`
array.Then make a function call that takes each topic in the array remakes the buttons on the page.*/

var winterSports = ["skiing", "snowboarding", "curling", "ice hockey", "bobsled","snowmobiling", "biathlon", "figure skating", "ski jumping"];

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

$("#add-topic").on("click", function (event) {
  event.preventDefault();
  var search = $("#search-input").val().trim();
  winterSports.push(search);
  renderButtons();
  $("#search-input").val("")

});

$(document).on("click", ".button-topic", function () {

  // renderButtons();
  var topic = $(this).attr("data-topic");

  console.log(topic);
  var api_key = "4ZCLxfuC8PLbhVQQWOnCB67ShuSWgBiL";

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + api_key + "&limit=10";
  //query parametre api_key: q: limit: rating:

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {

      var sportsDiv = $("<div>");
      sportsDiv.addClass("image");
      var p = $("<p>").text("Rating: " + response.data[i].rating);
      var sportsImage = $("<img>");
     // var a= 
      sportsImage.attr({
        "src": response.data[i].images.fixed_height_still.url,
        "data-still": response.data[i].images.fixed_height_still.url,
        "data-animate": response.data[i].images.fixed_height_downsampled.url,
        "data-state": "still"
        //"a.href":response.data[i].images.fixed_height_downsampled.url,
      });
      sportsImage.addClass("gif");
      sportsDiv.append(sportsImage);
      sportsDiv.prepend(p)
      $("#gif-area").append(sportsDiv);
    }
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
//
//$("<img>").attr("data-still",response.data[i].images.fixed_width_still.url);
//$("<img>").attr("data-animate",response.data[i].preview_gif.url);