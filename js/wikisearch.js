$(document).ready(function() {

  var boxesVisible = 0

  var grabSearchResults = function() {
    $("#search").removeClass("fa-search").addClass("fa-spinner fa-pulse");
    console.log("sending request")
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + encodeURIComponent($("#searchbox").val()) + "&srprop=snippet&srlimit=50&format=json&callback=?", function(json) {
      $("#search").attr("value","Search");
      console.log("received data")
      $("#search").removeClass("fa-spinner fa-pulse").addClass("fa-search");
	  var html = "";
      var i = 1
      json.query.search.forEach(function(val, index, arary) {

        var keys = Object.keys(val);

        var title = val[keys[1]];

        var snippet = val[keys[2]];

        html = "<div class='result-box' id='box" + i + "'>" +
          "<div class='highlight-bar inactive'>" +
          "&nbsp;" +
          "</div>" +
          "<div class='content'>" +
          "<div class='result-title'>" +
          "<a href='https://en.wikipedia.org/wiki/" + encodeURIComponent(title) + "' target='_blank'>" +
          title +
          "</a>" +
          "</div>" +
          "<div class='snippet'>" +
          snippet +
          "</div>" +
          "</div>" +
          "</div>";
        var id = "#box" + i
        $(".result-container").append(html);
        $(id).hide();
        console.log(id)

        i++
      }); //end getJSON
      showResults(10)
      $("#loadResults").css("visibility", "visible");
    }); //end forEach
  }; // end var

  var showResults = function(num) {
    console.log("in showResults()")
    for (i = boxesVisible + 1; i < boxesVisible + num + 1; i++) {
      console.log("show #box" + i)
      $("#box" + i).show(800);
    }
    boxesVisible += num;
  };

  var clearResults = function() {
    $(".result-container").html("");
  };


  //Event listeners
  $(".result-container").on("mouseenter", ".result-box", function(event) { //on mouse over
    $(this).children(".inactive").css("visibility", "visible");
  }); // end result-box hover

  $(".result-container").on("mouseleave", ".result-box", function(event) { //on mouse over
    $(this).children(".inactive").css("visibility", "hidden");
  }); // end result-box hover

  $("#search").on("click", function(){
    if (!$("#searchbox").val()) {
      return false;
    } else if ($(".topbar").css("top") != 0) {
      $(".topbar").animate({
        top: 0
      }, 800);
      console.log("should be changing color, erasing header");
      $(".topbar").css("background-color", "#E1B80D");
      console.log($("header.p"));
      $("header > h1").hide(200);
      $("footer").css("visibility", "visible");

    }
    clearResults();
    grabSearchResults();

  });

  $("#test").on("click", function() {
    $("#box" + "1").hide();
  });

  $("#loadResults").on("click", function() {
    console.log("button clicked");
    showResults(10);
  });

}); // end ready()
