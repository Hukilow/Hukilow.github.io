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
