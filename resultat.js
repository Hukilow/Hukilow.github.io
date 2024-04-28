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
  var profileListElements = document.querySelectorAll("#profileList li");

  if (formattedProfiles.length === 1) {
    profilInfoElement.textContent =
      "Vous êtes plutôt : " + formattedProfiles[0];
  } else {
    profilInfoElement.textContent = "Vous avez plusieurs profils possibles : ";
  }

  return topProfiles;
}

const onload = () => {
  const userProfile = calculateUserProfile();
  const profileList = document.getElementById("profileList");
  const profileImage = document.getElementById("profileImage");

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

  // Trouver le score maximum parmi tous les profils
  const maxScore = sortedProfiles[0][1];

  // Récupérer le nom du premier profil
  const firstProfile = sortedProfiles[0][0];

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
};

// Attacher la fonction onload à l'événement load du document
document.addEventListener("DOMContentLoaded", onload);
