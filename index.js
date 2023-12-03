//index.js


// Fonction pour vérifier l'état de connexion et afficher/masquer les éléments en conséquence
function updateUI(user) {
  const userDiv = document.getElementById('user-info');
  const loginSignupDiv = document.getElementById('login-signup');

  if (user) {
    // L'utilisateur est connecté
    const usernameElement = document.getElementById('username');
    const logoutElement = document.getElementById('logout');

    // Afficher le nom d'utilisateur dans la barre de navigation
    usernameElement.textContent = user.username;

    // Afficher la section utilisateur connecté
    userDiv.style.display = 'block';
    loginSignupDiv.style.display = 'none';

    // Ajouter un gestionnaire d'événements pour le lien de déconnexion
    logoutElement.addEventListener('click', () => {
      // Effectuer des actions de déconnexion côté client si nécessaire

      // Rediriger l'utilisateur vers la route de déconnexion côté serveur
      window.location.href = "/logout";
    });
  } else {
    // L'utilisateur n'est pas connecté
    userDiv.style.display = 'none';
    loginSignupDiv.style.display = 'block';
  }
}

// Exemple: appel à updateUI avec un utilisateur fictif (remplacez-le par votre logique d'authentification)
const user = { username: 'Hukilow' };
updateUI(user);

// Fonction pour déconnecter l'utilisateur côté client
function logout() {
  // Effectuez des actions de déconnexion côté client si nécessaire

  // Redirigez l'utilisateur vers la page de déconnexion côté serveur
  window.location.href = "/logout";
}

// Exemple : associez la fonction logout à un élément HTML (par exemple, un bouton de déconnexion)
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
