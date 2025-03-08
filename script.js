const formulaire = document.getElementById("form");
const nameIn = document.getElementById("cardholder-name");
const numbersIn = document.getElementById("card-numbers");
const monthIn = document.getElementById("MM");
const yearIn = document.getElementById("YY");
const cvcIn = document.getElementById("cvc");

const numbersOut = document.getElementById("card-numbers-card");
const nameOut = document.getElementById("name-cardholder-card");
const dateOut = document.getElementById("exp-date-card");
const cvcOut = document.getElementById("cvc-card");

formulaire.addEventListener("submit", (event) => {
   event.preventDefault();
   let error = false;
   document.querySelectorAll("input").forEach((elt) => {
      let errMess = document.querySelector(`.errBlank-${elt.id}`);
      if (elt.value === "") {
         errMess.innerText = "Can't be blank";
         elt.style.borderColor = "#ff5252";
         errMess.style.display = "inline";
         error = true;
      }
   });
   if (
      numbersIn.value.length != numbersIn.maxLength &&
      numbersIn.value !== ""
   ) {
      let errMess = document.querySelector(".errBlank-card-numbers");
      errMess.innerText = "Wrong format";
      document.getElementById("card-numbers").style.borderColor = "#ff5252";
      errMess.style.display = "inline";
      error = true;
   }
   if (monthIn.value.length != 2 && monthIn.value !== "") {
      let errMess = document.querySelector(".errBlank-MM");
      errMess.innerText = "Wrong format";
      document.getElementById("MM").style.borderColor = "#ff5252";
      errMess.style.display = "inline";
      error = true;
   }
   if (yearIn.value.length != 2 && yearIn.value !== "") {
      let errMess = document.querySelector(".errBlank-MM");
      errMess.innerText = "Wrong format";
      document.getElementById("YY").style.borderColor = "#ff5252";
      errMess.style.display = "inline";
      error = true;
   }
   if (cvcIn.value.length != cvcIn.maxLength && cvcIn.value !== "") {
      let errMess = document.querySelector(".errBlank-cvc");
      errMess.innerText = "Wrong format";
      document.getElementById("cvc").style.borderColor = "#ff5252";
      errMess.style.display = "inline";
      error = true;
   }
   if (!error) {
      document.getElementById("form").style.display = "none";
      document.querySelector(".success").style.display = "flex";
   }
});

nameIn.addEventListener("input", () => {
   nameIn.value = nameIn.value.replace(/[^A-zÀ-ú ]+/g, "");
   if (nameIn.value === "") {
      nameOut.innerText = "Jane Appleseed";
   } else {
      nameOut.innerText = nameIn.value;
   }
});

let lengthBeforeInput = 0;
numbersIn.addEventListener("input", () => {
   let newValue = numbersIn.value.replace(/[^0-9 ]+/g, "");

   let nb = newValue.length;
   if (nb < lengthBeforeInput) {
      //pass
   } else if ([4, 9, 14].includes(nb) && nb != lengthBeforeInput) {
      newValue += " ";
   } else if ([5, 10, 15].includes(nb)) {
      newValue = newValue.slice(0, -1);
   }

   nb == 0
      ? (numbersOut.innerText = "0000 0000 0000 0000")
      : (numbersOut.innerText = newValue);

   nb == 0
      ? (document.getElementById("card-numbers-card").style["letter-spacing"] =
           "2px")
      : (document.getElementById("card-numbers-card").style["letter-spacing"] =
           "2.5px");
   numbersIn.value = newValue;
   lengthBeforeInput = nb;
});

let month = "MM";
let year = "YY";

monthIn.addEventListener("input", () => {
   monthIn.value = monthIn.value.replace(/[^0-9 ]+/g, "");
   if (monthIn.value > 12) {
      monthIn.value = 12;
   }
   if (monthIn.value.length < 2) {
      month = "MM";
   } else {
      month = monthIn.value;
   }
   dateOut.innerText = month + "/" + year;
});

yearIn.addEventListener("input", () => {
   yearIn.value = yearIn.value.replace(/[^0-9 ]+/g, "");
   if (yearIn.value > 99) {
      yearIn.value = 99;
   }
   if (yearIn.value.length < 2) {
      year = "YY";
   } else {
      year = yearIn.value;
   }
   dateOut.innerText = month + "/" + year;
});

cvcIn.addEventListener("input", () => {
   cvcIn.value = cvcIn.value.replace(/[^0-9 ]+/g, "");
   if (cvcIn.value === "") {
      cvcOut.innerText = "000";
   } else {
      cvcOut.innerText = cvcIn.value;
   }
});

document.querySelectorAll("input").forEach((elt) => {
   elt.addEventListener("change", (e) => {
      let errMess = document.querySelector(`.errBlank-${e.target.id}`);

      if (elt.value === "" && elt.id === e.target.id) {
         errMess.innerText = "Can't be blank";
         elt.style.borderColor = "#ff5252";
         errMess.style.display = "inline";
      } else {
         errMess.style.display = "none";
         elt.style.borderColor = "#dedddf";
      }
   });
});

document.getElementById("btn-next").addEventListener("click", () => {
   document.querySelectorAll("input").forEach((elt) => {
      elt.value = "";
   });
   nameOut.innerText = "Jane Appleseed";
   numbersOut.innerText = "0000 0000 0000 0000";
   dateOut.innerText = "MM/YY";
   cvcOut.innerText = "000";
   document.getElementById("form").style.display = "flex";
   document.querySelector(".success").style.display = "none";
});
