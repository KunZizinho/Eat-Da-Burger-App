console.log("burger js ")
$( document ).ready(function(){

  $("#form-devour").on("submit", function(event){
    event.preventDefault();
    console.log("working    heeeeeeeeeeeeeeeeeeeeeeeeeeeeej")
    var id = $(this).children().val();
    console.log("linija 8 burger,js u pub ", id)
    var newDevoured = true;
    console.log("here line 10 ", newDevoured)
    var newState = { devoured: newDevoured };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newState
    }).then(function(){
      console.log("linija 16 burger.js pub ", newDevoured);
      location.reload();
    })
  });
});