var userScores = {
  Explorateur_aventureux: 10,
  Jardinier_en_herbe: 15,
  Admirateur_de_la_faune: 8,
  Méditateur_naturel: 5,
  Artiste_botanique: 12,
  Explorateur_contemplatif: 18,
  Citadin_vert: 7,
  Écologiste_engagé: 14,
  Curieux_des_sciences_naturelles: 11,
  Apprenti_explorateur: 9,
};

// Convertir les scores en tableau pour Chart.js
var profileLabels = Object.keys(userScores);
var profilePoints = Object.values(userScores);

// Créer le graphique polarArea
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "polarArea",
  data: {
    datasets: [
      {
        data: profilePoints,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
    labels: profileLabels,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Cela empêchera le graphique de redimensionner automatiquement
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

function calculateUserProfile() {
  var maxScore = 0;
  var topProfiles = [];

  // Iterate through the userScores object to find the profile with the highest score
  for (var profile in userScores) {
    if (userScores[profile] > maxScore) {
      maxScore = userScores[profile];
      topProfiles = [profile];
    } else if (userScores[profile] === maxScore) {
      // Si le profil a le même score que le score maximum, ajoutez-le à la liste des meilleurs profils
      topProfiles.push(profile);
    }
  }

  // Remplacez les tirets bas par des espaces et formatez les profils
  var formattedProfiles = topProfiles.map((profile) =>
    profile.replace(/_/g, " ")
  );

  // Affichez les profils avec le score le plus élevé dans l'élément HTML
  var profilInfoElement = document.getElementById("resultat");

  if (formattedProfiles.length === 1) {
    profilInfoElement.textContent =
      "Vous êtes plutot : " + formattedProfiles[0];
  } else {
    profilInfoElement.textContent =
      "Vous avez plusieurs profils possibles : " + formattedProfiles.join(", ");
  }

  console.log(topProfiles);
  return topProfiles;
}

const onload = () => {
  const userProfile = calculateUserProfile();
  console.log(userProfile);
};

// Attachez la fonction onload à l'événement load du document
document.addEventListener("DOMContentLoaded", onload);
