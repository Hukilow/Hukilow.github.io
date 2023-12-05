var userScores = {
  "Explorateur_aventureux": 0,
  "Jardinier_en_herbe": 0,
  "Admirateur_de_la_faune": 0,
  "Méditateur_naturel": 0,
  "Artiste_botanique": 0,
  "Explorateur_contemplatif": 0,
  "Citadin_vert": 0,
  "Écologiste_engagé": 0,
  "Curieux_des_sciences_naturelles": 0,
  "Apprenti_explorateur": 0,
};


function calculateUserProfile() {
  var maxScore = 0;
  var userProfile = "";

  // Iterate through the userScores object to find the profile with the highest score
  for (var profile in userScores) {
    if (userScores[profile] > maxScore) {
      maxScore = userScores[profile];
      userProfile = profile;
    }
  }
  console.log(userProfile);
  return userProfile;
}

function updateDosage() {
  var slider = document.getElementById("dosage");
  var output = document.getElementById("output");
  output.innerText = "" + slider.value;
}

var temporaryScores = {}; // Variable pour stocker temporairement les scores associés à chaque bouton

function selectButton(button, scores) {
  // Désélectionnez tous les boutons
  document
    .querySelectorAll('.question button:not(.confirmer)')
    .forEach(function(btn) {
      btn.classList.remove('selected');
    });

  // Sélectionnez le bouton cliqué
  button.classList.add('selected');

  // Stockez temporairement les scores associés au bouton
  temporaryScores = {};
  for (var i = 0; i < scores.length; i++) {
    var scorePair = scores[i];
    var key = scorePair[0].trim();
    var value = parseInt(scorePair[1]);
    temporaryScores[key] = value;
  }

  // Activez le bouton "Confirmer"
  button.closest('.question').querySelector('.confirmer').disabled = false;
  button.closest('.question').querySelector('.confirmer').style.cursor = 'initial';
}

function nextQuestion(currentQuestion, nextQuestion) {
  var currentQuestionDiv = document.querySelector('.question[data-question="' + currentQuestion + '"]');
  var nextQuestionDiv = document.querySelector('.question[data-question="' + nextQuestion + '"]');

  if (currentQuestionDiv && nextQuestionDiv) {
    // Ajoutez les scores temporaires aux scores réels
    for (var key in temporaryScores) {
      if (temporaryScores.hasOwnProperty(key)) {
        userScores[key] += temporaryScores[key];
      }
    }
    console.log(temporaryScores);
    console.log(userScores);
    temporaryScores = {}; // Réinitialisez les scores temporaires

    // Continuez avec la logique de navigation vers la prochaine question ou le résultat
    currentQuestionDiv.classList.remove("active");

    if (nextQuestion === 'result') {
      calculateUserProfile();
      // Ajoutez ici le code pour afficher ou gérer le résultat
    } else {
      nextQuestionDiv.classList.add("active");

      // Désactivez le bouton "Confirmer" à nouveau
      nextQuestionDiv.querySelector('.confirmer').disabled = true;
      nextQuestionDiv.querySelector('.confirmer').style.cursor = 'not-allowed';
    }
  }
}

function nextQuestionSlider(currentQuestion, nextQuestion, NumSlider) {
  var output = document.getElementById('output' + sliderId.slice(-1));
  output.innerText = "" + slider.value;
  var currentQuestionDiv = document.querySelector('.question[data-question="' + currentQuestion + '"]');
  var nextQuestionDiv = document.querySelector('.question[data-question="' + nextQuestion + '"]');

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
          userScores["Explorateur_aventureux"] += 1;
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
  // Continuez avec la logique de navigation vers la prochaine question
  currentQuestionDiv.classList.remove("active");
  nextQuestionDiv.classList.add("active");

  // Désactivez le bouton "Confirmer" à nouveau
  nextQuestionDiv.querySelector('.confirmer').disabled = true;
  nextQuestionDiv.querySelector('.confirmer').style.cursor = 'not-allowed';
}
