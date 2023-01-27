"use strict";

const currentElOne = document.getElementById("currency-one");
const currentElTwo = document.getElementById("currency-two");
const amountElOne = document.getElementById("amount-one");
const amountElTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch currency rates and update the dom
function calculate() {
  const currencyOne = currentElOne.value;
  const currencyTwo = currentElTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/9a3ef75b0d947c8961475845/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.conversion_rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
}

currentElOne.addEventListener("change", calculate);
currentElTwo.addEventListener("change", calculate);
amountElOne.addEventListener("input", calculate);
amountElTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currentElOne.value;
  currentElOne.value = currentElTwo.value;
  currentElTwo.value = temp;
  calculate();
});

calculate();
