'use strict';

const STORE = [
]

function calculateSubtotal(){

}

function calculateTip(){

}

function calculateTotal(){

}

// function determineWhichButtonWasClicked(){
//   $('main').on('submit', '.enterTheMealDetailsCalculator', function(event){
//     event.preventDefault();
//     if ($(event.target).hasClass('submitCalc')){
//     submitButtonPressed();
//     } else {
//       resetMealDetailsButtonPressed();
//     }
//   }
//   )
//   }


function submitButtonPressed(){
$('.submitButton').submit(function(event){
   console.log('submit button!')
})
}

function resetMealDetailsButtonPressed(){
  $('.resetCalcButton').submit(function(event){
  console.log('reset button!');
  })
  
}

function calculateTipTotal(){

}

function updateMealCount(){

}

function updateAverageTipPerMeal(){

}

function resetEntireCalculator(){

}

function renderPage(){
 submitButtonPressed();
  resetMealDetailsButtonPressed();
  //determineWhichButtonWasClicked();
  resetEntireCalculator();
}

$(renderPage);