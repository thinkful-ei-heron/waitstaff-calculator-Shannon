'use strict';

const STORE = {
  todaysCustomers: [
    { baseMealPrice: 0.00, taxRate: 0.00, tipPercentage: 0.00, subTotal: 0.00, tip: 0.00, total: 0.00 }
  ],
  myEarnings: [
    { tipTotal: 0.00, mealCount: 0, averageTipPerMeal: 0.00 }
  ]
};

function getNewestObj() {
  let obj = STORE.todaysCustomers;
  return obj[obj.length - 1];

}
function calculateSubtotal(obj) {
  let base = obj.baseMealPrice;
  let tax= obj.taxRate;
  let result= (parseFloat(base) * parseFloat(tax)) + parseFloat(base);
  let roundedResult= Math.ceil(result * 100) / 100;
  obj.subTotal= roundedResult;
  $('.updateSubtotal').html(`${obj.subTotal}`);
}

function calculateTip(obj) {
  console.log(obj);
  let tipPercent = obj.tipPercentage;
  console.log(tipPercent);
  let subTotal= obj.subTotal;
  console.log(subTotal);
  let tipAmount= tipPercent * subTotal;
  let roundedTipAmount = Math.ceil(tipAmount * 100) / 100;
  obj.tip = roundedTipAmount;
  $('.updateTip').html(`${obj.tip}`);
}

function calculateTotal(obj) {
  let tip= obj.tip;
  let subTotal= obj.subTotal;
  let total= parseFloat(tip) + parseFloat(subTotal);
  let roundedTotal= Math.ceil(total * 100) / 100;
  let twoDecimalTotal= roundedTotal.toFixed(2);
  obj.total = twoDecimalTotal;
  $('.updateTotal').html(`$${obj.total}`);

}
function updateCustomerCharges() {
  let currentObj = getNewestObj();
  calculateSubtotal(currentObj);
  calculateTip(currentObj);
  calculateTotal(currentObj);
  updateMyEarnings(currentObj);
}


function submitButtonPressed() {
  $('.submitButton').submit(function (event) {
    event.preventDefault();
    STORE.todaysCustomers.push({ baseMealPrice: $('#baseMealPrice').val(), taxRate: ($('#taxRate').val() * 0.01), tipPercentage: ($('#tipPercentage').val()*0.01)});
    $('input').val('');
    updateCustomerCharges();
  });
}


function resetMealDetailsButtonPressed() {
  $('.resetCalcButton').submit(function (event) {
    console.log('reset button!');
  });

}

function updateMyEarnings(obj) {
calculateTipTotal(obj);
updateMealCount(obj);
updateAverageTipPerMeal(obj);
}

function calculateTipTotal(obj) {

}

function updateMealCount(obj) {

}

function updateAverageTipPerMeal(obj) {

}

function resetEntireCalculator() {
  $('.resetEntireApp').submit(function (event) {
    console.log('hard reset button works');
  });

}

function renderPage() {
  submitButtonPressed();
  resetMealDetailsButtonPressed();
  resetEntireCalculator();
}

$(renderPage);