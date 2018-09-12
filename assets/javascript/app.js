var key = "hCvW4yLPFxzz7xPPllxaTs74GcXZPaor"
var topicArray = ["hearthstone", "starcraft", "for honor", "battlerite", "league of legends", "overwatch", "vermintide", "darkest dungeon", "angband"]
var makeBtn = function (interests) {
    for (var i = 0; i < interests.length; i++) {
        var giphyBtn = $("<button>");
        giphyBtn.addClass("gifbtn btn")
        giphyBtn.attr("data-gif", interests[i])
        giphyBtn.text(interests[i])
        giphyBtn.appendTo(".buttdiv")
    }
}
makeBtn(topicArray)

$(document).on("click", ".gifbtn", function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=hCvW4yLPFxzz7xPPllxaTs74GcXZPaor&limit=10"
    console.log("click works")
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                var imgGif = results[i].images.fixed_height.url
                var imgStill = results[i].images.fixed_height_still.url

                var theD = $("<div>")
                var theP = $("<p>").text("Rating: " + results[i].rating)
                var giphyImg = $("<img>")
                giphyImg.attr("id", "gif")
                giphyImg.attr("src", imgStill)
                giphyImg.attr("data-still", imgStill)
                giphyImg.attr("data-active", imgGif)
                giphyImg.attr("data-state", "still")
                giphyImg.attr("alt", "fail")

                theD.append(theP)
                theD.append(giphyImg)

                $(".insertGif").prepend(theD)
            }
        })
})
$("#theSubmit").on("click", function () {
    topicArray.push($("#theInput").val().trim())
    $("#theInput").val("")
    $(".buttdiv").empty()
    makeBtn(topicArray)
})
$(document).on("click", "#gif", function () {
    var state = $(this).attr("data-state")
    console.log(state)
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-active"))
        $(this).attr("data-state", "active")
    }
    else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
})