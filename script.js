// ======= Formular =======

function onSubmitClick(event) {
  event.preventDefault();

  // daten auslesen
  const formElement = document.getElementById("personalData");
  const formularData = new FormData(formElement);

  //neues objekt hinzufügen wo die daten reingespiechert werden
  const neuePerson = {};
  for (const entry of formularData.entries()) {
    console.log("Name des Feldes: ", entry[0]);
    console.log("Wert des Feldes: ", entry[1]);
    neuePerson[entry[0]] = entry[1];
  }

  //den eintrag im localstorage speichern
  let personenListe = JSON.parse(localStorage.getItem("personData")) || [];
  personenListe.push(neuePerson);
  localStorage.setItem("personData", JSON.stringify(personenListe));
  console.log("Neuer Eintrag hinzugefügt: ", neuePerson);

  console.log(personenListe);

  //nach submitten formular leeren
  formElement.reset();

  console.log("submit button clicked");

  //die daten anzeigen, wenn die funktion da ist
  if (typeof formsAnzeigen === "function") {
    formsAnzeigen();
  }
}

//submit event hinzufügen, dass man mit enter submitten kann
const formElement = document.getElementById("personalData");
if (formElement) {
  formElement.addEventListener("submit", onSubmitClick);
}

// ======= Übersicht =========

const formDataDiv = document.getElementById("formularData");

// formulardaten werden angzeigt
function formsAnzeigen() {
  if (!formDataDiv) return;

  //alles aus dem localstorage holen
  const alleFormulare = JSON.parse(localStorage.getItem("personData")) || [];
  formDataDiv.innerHTML = "";

  //wenn keine daten da sind, wird die angezeigt, dass nix da ist, sonst wird es angezeigt
  if (!alleFormulare || alleFormulare.length === 0) {
    formDataDiv.innerHTML = "<p>Keine Formulare gefunden :(</p>";
  } else {
    alleFormulare.forEach((Person, i) => {
      const container = document.createElement("div");

      const überschrift = document.createElement("h2");
      überschrift.textContent = "Formular " + (i + 1);
      container.appendChild(überschrift);

      for (const key in Person) {
        const p = document.createElement("p");

        const fett = document.createElement("strong");
        fett.textContent = key + ": ";

        p.appendChild(fett);
        p.append(Person[key]);

        container.appendChild(p);
      }
      const löschenButton = document.createElement("button");
      löschenButton.textContent = "Eintrag Löschen";
      löschenButton.onclick = () => einzelnenEintragLöschen(i);
      container.appendChild(löschenButton);

      const hr = document.createElement("hr");
      container.appendChild(hr);

      formDataDiv.appendChild(container);
    });
  }
}

//funktion zum einzenen eintrag löschen, die den index vom löschenden eintrag bekommt und den löscht und dann das anzeigen aktuallisirt
function einzelnenEintragLöschen(index) {
  let listeDerPersonen = JSON.parse(localStorage.getItem("personData")) || [];
  listeDerPersonen.splice(index, 1);
  localStorage.setItem("personData", JSON.stringify(listeDerPersonen));
  formsAnzeigen();
}

// funktion zum löschen der ganzen einträge; löcalstorage wird gelöscht und neu angezeigt
function eintragLöschen() {
  if (confirm("Möchtest du wirklich alle Formulare löschen?")) {
    localStorage.removeItem("personData");
    formsAnzeigen();
  }
}

//anzeigen
formsAnzeigen();
