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
if (formElement) {
  formElement.addEventListener("submit", onSubmitClick);
}

// ======= Übersicht =========

const formDataDiv = document.getElementById("formularData");

function formsAnzeigen() {
  if (!formDataDiv) return;

  const alleFormulare = JSON.parse(localStorage.getItem("personData"));
  formDataDiv.innerHTML = "";

  if (!alleFormulare || alleFormulare.length === 0) {
    formDataDiv.innerHTML = "<p>Keine Formulare gefunden :(</p>";
  } else {
    let html = "";
    alleFormulare.forEach((Person, i) => {
      html += "<div><h2>Formular " + (i + 1) + "</h2>";
      for (const key in Person) {
        html += "<p><strong>" + key + ":</strong> " + Person[key] + "</p>";
      }
      html += `<button onclick="einzelnenEintragLöschen(${i})">Eintrag löschen</button>`;
      html += "</div><hr>";
    });
    formDataDiv.innerHTML = html;
  }
}

function einzelnenEintragLöschen(index) {
  let listeDerPersonen = JSON.parse(localStorage.getItem("personData")) || [];
  listeDerPersonen.splice(index, 1);
  localStorage.setItem("personData", JSON.stringify(listeDerPersonen));
  formsAnzeigen();
}

function eintragLöschen() {
  if (confirm("Möchtest du wirklich alle Formulare löschen?")) {
    localStorage.removeItem("personData");
    formsAnzeigen();
  }
}

formsAnzeigen();
