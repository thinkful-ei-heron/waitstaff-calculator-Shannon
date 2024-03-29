

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

//the following functions still require somewhat frequent use of
//parseFloat due to the fact that it seems .toFixed(2) returns the values
// to a string before setting the property value in the CONST object.

function calculateSubtotal(obj) {
  let base = obj.baseMealPrice;
  let tax = obj.taxRate;
  let result = base * tax + base;
  let roundedResult = Math.ceil(result * 100) / 100;
  obj.subTotal = parseFloat(roundedResult).toFixed(2);
  $('.updateSubtotal').html(`$${obj.subTotal}`);
}

function calculateTip(obj) {
  let tipPercent = obj.tipPercentage;
  let subTotal = parseFloat(obj.subTotal);
  let tipAmount = tipPercent * subTotal;
  let roundedTipAmount = Math.ceil(tipAmount * 100) / 100;
  obj.tip = parseFloat(roundedTipAmount).toFixed(2);
  $('.updateTip').html(`$${obj.tip}`);
}

function calculateTotal(obj) {
  let tip = parseFloat(obj.tip);
  let subTotal = parseFloat(obj.subTotal);
  let total = tip + subTotal;
  let roundedTotal = Math.ceil(total * 100) / 100;
  obj.total = parseFloat(roundedTotal).toFixed(2);
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
    let currentDailyTips = parseFloat(myEarnings.tipTotal);
    let incomingTip = parseFloat(obj.tip);
    let updatedTip = currentDailyTips + incomingTip;
    myEarnings.tipTotal = updatedTip.toFixed(2);
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
    let tips = parseFloat(myEarnings.tipTotal);
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
  resetEntireCalculator();
}

$(renderPage);