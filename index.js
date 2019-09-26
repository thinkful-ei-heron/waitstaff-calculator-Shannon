

const STORE = {
  todaysCustomers: [
    {
      baseMealPrice: 0.00,
      taxRate: 0.00,
      tipPercentage: 0.00,
      subTotal: 0.00,
      tip: 0.00,
      total: 0.00
    }
  ],
  myEarnings:
  {
    tipTotal: 0.00,
    mealCount: 0,
    averageTipPerMeal: 0.00
  }

};

function getNewestObj() {
  let obj = STORE.todaysCustomers;
  return obj[obj.length - 1];

}
function calculateSubtotal(obj) {
  let base = obj.baseMealPrice;
  //console.log(base);
  let tax = obj.taxRate;
  //console.log(tax);
  let result = base * tax + base;
  //console.log(result);
  let roundedResultOne = Math.ceil(result * 100) / 100;
  //console.log(roundedResultOne);
  let roundedResult = roundedResultOne.toFixed(2);
  //console.log(roundedResult);
  obj.subTotal = parseFloat(roundedResult);
  //console.log(obj.subTotal);
  $('.updateSubtotal').html(`$${obj.subTotal}`);
}

function calculateTip(obj) {
  let tipPercent = obj.tipPercentage;
  //console.log(tipPercent);
  let subTotal = obj.subTotal;
  //console.log(subTotal);
  let tipAmount = tipPercent * subTotal;
  //console.log(tipAmount);
  let roundedTipAmountOne = Math.ceil(tipAmount * 100) / 100;
  //console.log(roundedTipAmountOne);
  let roundedTipAmount = roundedTipAmountOne.toFixed(2);
  //console.log(roundedTipAmount);
  obj.tip = parseFloat(roundedTipAmount);
  //console.log(obj.tip);
  $('.updateTip').html(`$${obj.tip}`);
}

function calculateTotal(obj) {
  let tip = obj.tip;
  //console.log(tip);
  let subTotal = obj.subTotal;
  //console.log(subTotal);
  let total = tip + subTotal;
  //console.log(total);
  let roundedTotal = Math.ceil(total * 100) / 100;
  //console.log(roundedTotal);
  let twoDecimalTotal = roundedTotal.toFixed(2);
  //console.log(twoDecimalTotal);
  obj.total = parseFloat(twoDecimalTotal);
  //console.log(obj.total);
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
  $('.enterTheMealDetailsCalculator').submit(function (event) {
    event.preventDefault();
    STORE.todaysCustomers.push({
      baseMealPrice: parseFloat($('#baseMealPrice').val()),
      taxRate: parseFloat(($('#taxRate').val() * 0.01)),
      tipPercentage: parseFloat(($('#tipPercentage').val() * 0.01)) 
    });
    $('input').val('');
    updateCustomerCharges();
  });
}

// I was able to comment out the following because 
//The <input type="reset"> button defines a reset button 
//which resets all form values to its initial values.

// function resetMealDetailsButtonPressed() {
//   $('.enterTheMealDetailsCalculator').on('reset', '.resetCalcButton', function(event) {
//     event.preventDefault();
//     console.log('reset button clicked');
//     $('input').val('');
//   });
// }

function updateMyEarnings(obj) {
  calculateTipTotal(obj);
  updateMealCount();
  updateAverageTipPerMeal();
}

function calculateTipTotal(obj) {
  let myEarnings = STORE.myEarnings;
  if (STORE.todaysCustomers.length === 1) {
    myEarnings.tipTotal = (0.00).toFixed(2);
  } else {
    let currentDailyTips = myEarnings.tipTotal;
    //console.log(currentDailyTips);
    let incomingTip = obj.tip;
    //console.log(incomingTip);
    let updatedTip = (currentDailyTips + incomingTip).toFixed(2);
    //console.log(updatedTip);
    myEarnings.tipTotal = parseFloat(updatedTip);
    //console.log(myEarnings.tipTotal);
  }
  $('.updateTipTotal').html(`$${myEarnings.tipTotal}`);


}

function updateMealCount() {
  let myEarnings = STORE.myEarnings;
  if (STORE.todaysCustomers.length === 1) {
    myEarnings.mealCount = 0;
  } else {
    let currentMealCount = myEarnings.mealCount;
    currentMealCount += 1;
    myEarnings.mealCount = currentMealCount;
  }
  $('.updateMealCount').html(`${myEarnings.mealCount}`);
}

function updateAverageTipPerMeal() {
  let myEarnings = STORE.myEarnings;
  if (STORE.todaysCustomers.length === 1) {
    myEarnings.averageTipPerMeal = (0.00).toFixed(2);
  } else {
    let tips = myEarnings.tipTotal;
    let numMeals = myEarnings.mealCount;
    let average = (tips / numMeals).toFixed(2);
    myEarnings.averageTipPerMeal = average;
  }
  $('.averageTipPerMeal').html(`$${myEarnings.averageTipPerMeal}`);
}

function resetEntireCalculator() {
  $('.resetEntireApp').submit(function (event) {
    STORE.todaysCustomers = STORE.todaysCustomers.slice(0, 1);
    updateCustomerCharges();
  });

}

function renderPage() {
  submitButtonPressed();
  //resetMealDetailsButtonPressed();
  resetEntireCalculator();
}

$(renderPage);