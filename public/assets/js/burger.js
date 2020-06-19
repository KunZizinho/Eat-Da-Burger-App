console.log("burger js ")
$( document ).ready(function(){

  $("#form-devour").on("submit", function(event){
    event.preventDefault();
    console.log("working    heeeeeeeeeeeeeeeeeeeeeeeeeeeeej")
    // ovdje smo osigurali da povucemo id odabranog elementa 
    var id = $(this).children().val();
    console.log("linija 9 burger,js u pub ", id)
    // deklarirali smo variablu u boolean i dali joj vrijednost true
    var newDevoured = true;
    //te smo deklarirali objekt kojem smo dali svojstvu devoured vrijednost variable newDevoured
    var newState = { devoured: newDevoured };
    //te smo ajaxom iz nase db prema id-u PUT metodom dodjelili odabranom burgeru novi boolean state
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newState
    }).then(function(){
      console.log("linija 16 burger.js pub ", newDevoured);
      location.reload();
    })
  });

  
});