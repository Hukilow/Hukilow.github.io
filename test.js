userScores = {
  "Aventurier.ère": 0,
  "Jardinier.ère_en_herbe": 0,
  "Admirateur.rice_de_la_faune": 0,
  "Méditateur.rice": 0,
  "Artiste_passioné.e": 0,
  "Contemplatif.ve": 0,
  "Citadin.e_vert.e": 0,
  "Écologiste_engagé.e": 0,
  "Curieux.se_des_Sciences": 0,
  "Apprenti.e_explorateur.rice": 0,
};

let sliderValue;
function updateDosage(slider, questionElement) {
  var output = questionElement.querySelector(".output");
  if (output) {
    sliderValue = slider.value;
    updateFlowerParts(questionElement, slider.value);
  } else {
    console.error("Output element not found");
  }
}

function calculateUserProfile() {
  var maxScore = 0;
  var topProfiles = [];

  // Copiez les noms des profils et leurs scores dans un tableau
  var profilesArray = Object.entries(userScores);

  // Triez le tableau des profils par score décroissant
  profilesArray.sort((a, b) => b[1] - a[1]);

  // Obtenez le score maximum
  maxScore = profilesArray[0][1];

  // Obtenez tous les profils ayant le score maximum
  topProfiles = profilesArray
    .filter((profile) => profile[1] === maxScore)
    .map((profile) => profile[0]);

  // Remplacez les tirets bas par des espaces et formatez les profils
  var formattedProfiles = topProfiles.map((profile) =>
    profile.replace(/_/g, " "),
  );

  // Affichez les profils avec le score le plus élevé dans l'élément HTML
  var profilInfoElement = document.getElementById("resultat");
  var profileList = document.getElementById("profileList");
  var profileImage = document.getElementById("profileImage");

  if (formattedProfiles.length === 1) {
    profilInfoElement.textContent =
      "Vous êtes plutôt : " + formattedProfiles[0];
  } else {
    profilInfoElement.textContent = "Vous avez plusieurs profils possibles : ";
  }

  // Supprimer les éléments existants de la liste et de l'image
  //profileList.innerHTML = "";
  //profileImage.innerHTML = "";

  // Définir le poids de la police maximum et minimum
  const maxFontWeight = 900;
  const minFontWeight = 400;

  // Définir la taille de la police pour les trois premiers éléments
  const largerFontSize = "24px";

  // Triez les profils par score décroissant
  const sortedProfiles = Object.entries(userScores).sort((a, b) => b[1] - a[1]);

  // Créer et ajouter les éléments li pour chaque profil avec un poids de police dégradé
  sortedProfiles.forEach(([profile, score], index) => {
    const listItem = document.createElement("li");
    // Calculer le poids de la police en fonction de la position du profil dans la liste triée
    const fontWeight =
      maxFontWeight -
      (index / (sortedProfiles.length - 1)) * (maxFontWeight - minFontWeight);
    listItem.style.fontWeight = fontWeight;

    // Appliquer un style différent pour les trois premiers éléments
    if (index < 3) {
      listItem.style.fontWeight = "bold";
      listItem.style.fontSize = largerFontSize;
    }

    listItem.textContent = `${score} : ${profile.replace(/_/g, " ")}`;
    profileList.appendChild(listItem);
  });

  const img = document.getElementById("imgresult");
  console.log(topProfiles[0]);
  img.src = `./img/${topProfiles[0]}.png`;
  const a = document.getElementById("hrefprofil");
  a.href = `./profil/${topProfiles[0]}.html`;
  const p = document.getElementById("hrefp");
  p.innerText = `${topProfiles[0]}`;
  return topProfiles;
}

function updateFlowerParts(questionElement, value) {
  // Réinitialiser les classes de la question spécifique
  for (let i = 0; i <= 4; i++) {
    questionElement.querySelector("#flower-part-" + i).classList.remove("full");
  }

  // Ajouter des classes en fonction de la valeur du curseur de la question spécifique
  for (let i = 0; i < value; i++) {
    questionElement.querySelector("#flower-part-" + i).classList.add("full");
  }
}

var temporaryScores = {}; // Variable pour stocker temporairement les scores associés à chaque bouton

function selectButton(button, scores) {
  // Désélectionnez tous les boutons
  document
    .querySelectorAll(".question button:not(.confirmer)")
    .forEach(function (btn) {
      btn.classList.remove("selected");
    });

  // Sélectionnez le bouton cliqué
  button.classList.add("selected");

  // Stockez temporairement les scores associés au bouton
  temporaryScores = {};
  for (var i = 0; i < scores.length; i++) {
    var scorePair = scores[i];
    var key = scorePair[0].trim();
    var value = parseInt(scorePair[1]);
    temporaryScores[key] = value;
  }

  // Activez le bouton "Confirmer"
  button.closest(".question").querySelector(".confirmer").disabled = false;
  button.closest(".question").querySelector(".confirmer").style.cursor =
    "initial";
}

function nextQuestion(currentQuestion, nextQuestion) {
  if (nextQuestion === "result") {
    calculateUserProfile();
  }
  var currentQuestionDiv = document.querySelector(
    '.question[data-question="' + currentQuestion + '"]',
  );
  var nextQuestionDiv = document.querySelector(
    '.question[data-question="' + nextQuestion + '"]',
  );

  if (currentQuestionDiv && nextQuestionDiv) {
    console.log(nextQuestion);
    // Ajoutez les scores temporaires aux scores réels
    for (var key in temporaryScores) {
      if (temporaryScores.hasOwnProperty(key)) {
        userScores[key] += temporaryScores[key];
      }
    }
    console.log(userScores);
    temporaryScores = {}; // Réinitialisez les scores temporaires

    // Continuez avec la logique de navigation vers la prochaine question ou le résultat
    currentQuestionDiv.classList.remove("active");

    nextQuestionDiv.classList.add("active");

    // Désactivez le bouton "Confirmer" à nouveau
    nextQuestionDiv.querySelector(".confirmer").disabled = true;
    nextQuestionDiv.querySelector(".confirmer").style.cursor = "not-allowed";
  }
}

function nextQuestionSlider(currentQuestion, nextQuestion, NumSlider) {
  if (isNaN(parseInt(sliderValue))) {
    var output = 0;
  } else {
    var output = parseInt(sliderValue);
  }
  var currentQuestionDiv = document.querySelector(
    '.question[data-question="' + currentQuestion + '"]',
  );
  var nextQuestionDiv = document.querySelector(
    '.question[data-question="' + nextQuestion + '"]',
  );
  switch (NumSlider) {
    case 1:
      switch (output) {
        case 0:
          userScores["Aventurier.ère"] += 0;
          userScores["Jardinier.ère_en_herbe"] += 0;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 0;
          userScores["Artiste_passioné.e"] += 0;
          userScores["Contemplatif.ve"] += 0;
          userScores["Citadin.e_vert.e"] += 0;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 0;
          break;
        case 1:
          userScores["Aventurier.ère"] += 0;
          userScores["Jardinier.ère_en_herbe"] += 0;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 1;
          userScores["Artiste_passioné.e"] += 1;
          userScores["Contemplatif.ve"] += 1;
          userScores["Citadin.e_vert.e"] += 0;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
        case 2:
          userScores["Aventurier.ère"] += 1;
          userScores["Jardinier.ère_en_herbe"] += 1;
          userScores["Admirateur.rice_de_la_faune"] += 1;
          userScores["Méditateur.rice"] += 2;
          userScores["Artiste_passioné.e"] += 2;
          userScores["Contemplatif.ve"] += 2;
          userScores["Citadin.e_vert.e"] += 1;
          userScores["Écologiste_engagé.e"] += 1;
          userScores["Curieux.se_des_Sciences"] += 1;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
        case 3:
          userScores["Aventurier.ère"] += 2;
          userScores["Jardinier.ère_en_herbe"] += 2;
          userScores["Admirateur.rice_de_la_faune"] += 2;
          userScores["Méditateur.rice"] += 2;
          userScores["Artiste_passioné.e"] += 2;
          userScores["Contemplatif.ve"] += 2;
          userScores["Citadin.e_vert.e"] += 2;
          userScores["Écologiste_engagé.e"] += 2;
          userScores["Curieux.se_des_Sciences"] += 2;
          userScores["Apprenti.e_explorateur.rice"] += 1;
          break;
        case 4:
          userScores["Aventurier.ère"] += 3;
          userScores["Jardinier.ère_en_herbe"] += 3;
          userScores["Admirateur.rice_de_la_faune"] += 3;
          userScores["Méditateur.rice"] += 3;
          userScores["Artiste_passioné.e"] += 3;
          userScores["Contemplatif.ve"] += 3;
          userScores["Citadin.e_vert.e"] += 3;
          userScores["Écologiste_engagé.e"] += 3;
          userScores["Curieux.se_des_Sciences"] += 3;
          userScores["Apprenti.e_explorateur.rice"] += 1;
          break;
      }
      break;
    case 2:
      switch (output) {
        case 0:
          userScores["Aventurier.ère"] += 0;
          userScores["Jardinier.ère_en_herbe"] += 0;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 0;
          userScores["Artiste_passioné.e"] += 0;
          userScores["Contemplatif.ve"] += 0;
          userScores["Citadin.e_vert.e"] += 0;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
        case 1:
          userScores["Aventurier.ère"] += 1;
          userScores["Jardinier.ère_en_herbe"] += 1;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 2;
          userScores["Artiste_passioné.e"] += 2;
          userScores["Contemplatif.ve"] += 2;
          userScores["Citadin.e_vert.e"] += 2;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 3;
          break;
        case 2:
          userScores["Aventurier.ère"] += 1;
          userScores["Jardinier.ère_en_herbe"] += 1;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 2;
          userScores["Artiste_passioné.e"] += 2;
          userScores["Contemplatif.ve"] += 2;
          userScores["Citadin.e_vert.e"] += 2;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 3;
          break;
        case 3:
          userScores["Aventurier.ère"] += 2;
          userScores["Jardinier.ère_en_herbe"] += 2;
          userScores["Admirateur.rice_de_la_faune"] += 1;
          userScores["Méditateur.rice"] += 3;
          userScores["Artiste_passioné.e"] += 3;
          userScores["Contemplatif.ve"] += 3;
          userScores["Citadin.e_vert.e"] += 3;
          userScores["Écologiste_engagé.e"] += 1;
          userScores["Curieux.se_des_Sciences"] += 1;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
        case 4:
          userScores["Aventurier.ère"] += 3;
          userScores["Jardinier.ère_en_herbe"] += 3;
          userScores["Admirateur.rice_de_la_faune"] += 3;
          userScores["Méditateur.rice"] += 2;
          userScores["Artiste_passioné.e"] += 2;
          userScores["Contemplatif.ve"] += 2;
          userScores["Citadin.e_vert.e"] += 2;
          userScores["Écologiste_engagé.e"] += 3;
          userScores["Curieux.se_des_Sciences"] += 3;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
      }
      break;
    case 3:
      switch (output) {
        case 0:
          userScores["Aventurier.ère"] += 0;
          userScores["Jardinier.ère_en_herbe"] += 0;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 0;
          userScores["Artiste_passioné.e"] += 0;
          userScores["Contemplatif.ve"] += 0;
          userScores["Citadin.e_vert.e"] += 0;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 0;
          break;
        case 1:
          userScores["Aventurier.ère"] += 1;
          userScores["Jardinier.ère_en_herbe"] += 1;
          userScores["Admirateur.rice_de_la_faune"] += 1;
          userScores["Méditateur.rice"] += 1;
          userScores["Artiste_passioné.e"] += 1;
          userScores["Contemplatif.ve"] += 1;
          userScores["Citadin.e_vert.e"] += 1;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 1;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
        case 2:
          userScores["Aventurier.ère"] += 3;
          userScores["Jardinier.ère_en_herbe"] += 3;
          userScores["Admirateur.rice_de_la_faune"] += 3;
          userScores["Méditateur.rice"] += 3;
          userScores["Artiste_passioné.e"] += 3;
          userScores["Contemplatif.ve"] += 3;
          userScores["Citadin.e_vert.e"] += 3;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 3;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
        case 3:
            userScores["Aventurier.ère"] += 3;
            userScores["Jardinier.ère_en_herbe"] += 3;
            userScores["Admirateur.rice_de_la_faune"] += 3;
            userScores["Méditateur.rice"] += 3;
            userScores["Artiste_passioné.e"] += 3;
            userScores["Contemplatif.ve"] += 3;
            userScores["Citadin.e_vert.e"] += 3;
            userScores["Écologiste_engagé.e"] += 2;
            userScores["Curieux.se_des_Sciences"] += 3;
            userScores["Apprenti.e_explorateur.rice"] += 1;
            break;
        case 4:
            userScores["Aventurier.ère"] += 2;
            userScores["Jardinier.ère_en_herbe"] += 2;
            userScores["Admirateur.rice_de_la_faune"] += 2;
            userScores["Méditateur.rice"] += 2;
            userScores["Artiste_passioné.e"] += 2;
            userScores["Contemplatif.ve"] += 2;
            userScores["Citadin.e_vert.e"] += 2;
            userScores["Écologiste_engagé.e"] += 3;
            userScores["Curieux.se_des_Sciences"] += 2;
            userScores["Apprenti.e_explorateur.rice"] += 0;
            break;
      }
      break;
    case 4:
      switch (output) {
        case 0:
          userScores["Aventurier.ère"] += 0;
          userScores["Jardinier.ère_en_herbe"] += 0;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 0;
          userScores["Artiste_passioné.e"] += 0;
          userScores["Contemplatif.ve"] += 0;
          userScores["Citadin.e_vert.e"] += 0;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 0;
          break;
        case 1:
          userScores["Aventurier.ère"] += 0;
          userScores["Jardinier.ère_en_herbe"] += 0;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 0;
          userScores["Artiste_passioné.e"] += 0;
          userScores["Contemplatif.ve"] += 0;
          userScores["Citadin.e_vert.e"] += 0;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 0;
          break;
        case 2:
          userScores["Aventurier.ère"] += 1;
          userScores["Jardinier.ère_en_herbe"] += 1;
          userScores["Admirateur.rice_de_la_faune"] += 0;
          userScores["Méditateur.rice"] += 0;
          userScores["Artiste_passioné.e"] += 0;
          userScores["Contemplatif.ve"] += 0;
          userScores["Citadin.e_vert.e"] += 1;
          userScores["Écologiste_engagé.e"] += 0;
          userScores["Curieux.se_des_Sciences"] += 0;
          userScores["Apprenti.e_explorateur.rice"] += 2;
          break;
        case 3:
            userScores["Aventurier.ère"] += 3;
            userScores["Jardinier.ère_en_herbe"] += 3;
            userScores["Admirateur.rice_de_la_faune"] += 2;
            userScores["Méditateur.rice"] += 2;
            userScores["Artiste_passioné.e"] += 2;
            userScores["Contemplatif.ve"] += 2;
            userScores["Citadin.e_vert.e"] += 3;
            userScores["Écologiste_engagé.e"] += 2;
            userScores["Curieux.se_des_Sciences"] += 2;
            userScores["Apprenti.e_explorateur.rice"] += 1;
            break;
        case 4:
            userScores["Aventurier.ère"] += 2;
            userScores["Jardinier.ère_en_herbe"] += 2;
            userScores["Admirateur.rice_de_la_faune"] += 3;
            userScores["Méditateur.rice"] += 3;
            userScores["Artiste_passioné.e"] += 3;
            userScores["Contemplatif.ve"] += 3;
            userScores["Citadin.e_vert.e"] += 2;
            userScores["Écologiste_engagé.e"] += 3;
            userScores["Curieux.se_des_Sciences"] += 3;
            userScores["Apprenti.e_explorateur.rice"] += 1;
            break;
      }
      break;
  }
  console.log(userScores);
  // Continuez avec la logique de navigation vers la prochaine question
  currentQuestionDiv.classList.remove("active");
  nextQuestionDiv.classList.add("active");

  // Désactivez le bouton "Confirmer" à nouveau
  nextQuestionDiv.querySelector(".confirmer").disabled = true;
  nextQuestionDiv.querySelector(".confirmer").style.cursor = "not-allowed";
}
