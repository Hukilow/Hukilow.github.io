userScores = {
  "Aventurier.ère": 0,
  "Jardinier.ière_en_herbe": 0,
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
  } else if (nextQuestion === "result") {
    window.location.href = "resultat.html";
  }
}

function nextQuestionSlider(currentQuestion, nextQuestion, NumSlider) {
  var output = parseInt(sliderValue);
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
          userScores["Explorateur_aventureux"] += 1;
          userScores["Explorateur_aventureux"] += 1;
          break;
        case 1:
          userScores["Explorateur_aventureux"] += 1;
          break;
        case 2:
          userScores["Explorateur_aventureux"] += 1;
          break;
      }
      break;
    case 2:
      switch (output) {
        case 0:
          userScores["Explorateur_aventureux"] += 1;
          userScores["Explorateur_aventureux"] += 1;
          break;
        case 1:
          userScores["Jardinier_en_herbe"] += 10;
          break;
        case 2:
          userScores["Explorateur_aventureux"] += 1;
          break;
      }
      break;
    case 3:
      switch (output) {
        case 0:
          userScores["Explorateur_aventureux"] += 1;
          userScores["Explorateur_aventureux"] += 1;
          break;
        case 1:
          userScores["Explorateur_aventureux"] += 1;
          break;
        case 2:
          userScores["Explorateur_aventureux"] += 1;
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
