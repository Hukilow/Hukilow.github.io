function nextQuestion(currentQuestion, nextQuestion) {
  document
    .querySelector('.question[data-question="' + currentQuestion + '"]')
    .classList.remove("active");
  document
    .querySelector('.question[data-question="' + nextQuestion + '"]')
    .classList.add("active");
}

function updateDosage() {
  var slider = document.getElementById("dosage");
  var output = document.getElementById("output");
  output.innerText = "" + slider.value;
}

function selectButton(button) {
  // Deselect all buttons
  document
    .querySelectorAll('.question button:not(.confirmer)')
    .forEach(function(btn) {
      btn.classList.remove('selected');
    });

  // Select the clicked button
  button.classList.add('selected');

  // Enable the "Confirmer" button
  button.closest('.question').querySelector('.confirmer').disabled = false;
  button.closest('.question').querySelector('.confirmer').style.cursor = 'initial';
}

function nextQuestion(currentQuestion, nextQuestion) {
  var currentQuestionDiv = document.querySelector('.question[data-question="' + currentQuestion + '"]');
  var nextQuestionDiv = document.querySelector('.question[data-question="' + nextQuestion + '"]');

  if (currentQuestionDiv && nextQuestionDiv) {
    currentQuestionDiv.classList.remove("active");
    nextQuestionDiv.classList.add("active");

    // Disable the "Confirmer" button again
    nextQuestionDiv.querySelector('.confirmer').disabled = true;
    nextQuestionDiv.querySelector('.confirmer').style.cursor = 'not-allowed';
  }
}