// ======= Formular =======

function onSubmitClick(event) {
  event.preventDefault();

  const formElement = document.getElementById("personalData");
  const formularData = new FormData(formElement);

  const neuePerson = {};
  for (const entry of formularData.entries()) {
    console.log("Name des Feldes: ", entry[0]);
    console.log("Wert des Feldes: ", entry[1]);
    neuePerson[entry[0]] = entry[1];
  }

  let personenListe = JSON.parse(localStorage.getItem("personData")) || [];
  personenListe.push(neuePerson);
  localStorage.setItem("personData", JSON.stringify(personenListe));
  console.log("Neuer Eintrag hinzugefügt: ", neuePerson);

  console.log(personenListe);

  //nach submitten formular leeren
  formElement.reset();

  console.log("submit button clicked");

  if (typeof formsAnzeigen === "function") {
    formsAnzeigen();
  }
}

const formElement = document.getElementById("personalData");
if(formElement){
  formElement.addEventListener("submit", onSubmitClick);
}

const submitbutton = document.querySelector("#submitbutton");

if (submitbutton) {
  submitbutton.addEventListener("click", onSubmitClick);
}

// ======= Übersicht =========

const formDataDiv = document.getElementById("formularData");

function formsAnzeigen() {
  if (!formDataDiv) return;

  const alleFormulare = JSON.parse(localStorage.getItem("personData"));
  formDataDiv.innerHTML = "";

  if (!alleFormulare || alleFormulare.length === 0) {
    formDataDiv.innerHTML = "<p>Keine Daten gefunden :(</p>";
  } else {
    let html = "";
    alleFormulare.forEach((Person, i) => {
      html += "<div><h3>Formular " + (i + 1) + "</h3>";
      for (const key in Person) {
        html += "<p><strong>" + key + ":</strong> " + Person[key] + "</p>";
      }
      html += "</div>";
    });
    formDataDiv.innerHTML = html;
  }
}

function einzelenenEntragLöschen(index){
  let alleFormulare = JSON.parse(localStorage.getItem("personalData")) || [];

  alleFormulare.splice(index, 1);

  localStorage.setItem("personData", JSON.stringify(alleFormulare));
  formsAnzeigen();
}

function eintragLöschen() {
  if (confirm("Formulare wirklich löschen?")) {
    localStorage.removeItem("personData");
    formsAnzeigen();
  }
}

formsAnzeigen();
