const card = [...document.querySelectorAll('.card')];
for(const el in card){
  card[el].addEventListener('click', revealCard);
}

var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

var oneVisible = false;
var turnCounter = 0;
var first;
var lock = false;
var pairsLeft = 6;

function revealCard(e){
  console.log("e.target.id: ", e.target.id);
  console.log("e.target.id.slice(1): ", e.target.id.substr(1) );

  var numer = e.target.id.substr(1);

  var opacityValue = $("#c"+numer).css('opacity');

  if(opacityValue != 0 && lock == false){
    // flaga
    lock = true;
    var obraz = "url(img/" + cards[numer] + ")";

    $("#c"+numer).css("background-image", obraz);
    $("#c"+numer).toggleClass("card cardA");

    if(oneVisible == false){
      //first card
      oneVisible = true;
      first = numer; //1
      lock = false;
    }else{
      //first card
      if(cards[first] == cards[numer]){
        console.log("para");
        setTimeout( hide2Cards, 750, first, numer);
      }else{
        console.log("pudło");
        setTimeout( restore2Cards, 850, first, numer);
      }
      turnCounter++;
      $(".score").html("Turn counter: " + turnCounter);
      oneVisible = false;
    }

  }

}

function hide2Cards(nr1, nr2){
  $("#c"+nr1).css("opacity","0");
  $("#c"+nr2).css("opacity","0");

  pairsLeft--;

  pairsLeft == 0 ? $(".board")
  .html(
    '<h1 class="col-12 text-center">You win! <br /> Done in '+turnCounter+' turns</h1>'+
    '<br><br><br><br><br>'+
    '<button class="col-12" onclick="window.location.reload();">Again?</button>'
  ).css("display", "block") : null;

  lock = false;
}

function restore2Cards(nr1, nr2){
  $("#c"+nr1).css("background-image", "url(img/karta.png)");
  $("#c"+nr1).toggleClass("card cardA");

  $("#c"+nr2).css("background-image", "url(img/karta.png)");
  $("#c"+nr2).toggleClass("card cardA");

  lock = false;
}
