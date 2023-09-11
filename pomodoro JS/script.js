// Récupérez la case à cocher pour le mode sombre
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Écoutez l'événement de changement d'état de la case à cocher
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
  }
});

// Variables pour gérer la minuterie
let workDuration = 25 * 60; // Durée de travail par défaut en secondes (25 minutes)
let breakDuration = 5 * 60; // Durée de pause par défaut en secondes (5 minutes)
let timer;
let isWorking = true; // Indique si la minuterie est en mode travail ou pause
let isRunning = false; // Indique si la minuterie est en cours d'exécution

// Fonction pour afficher le temps au format "mm:ss"
function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  document.getElementById("timer-display").textContent = formattedTime;
}

// Fonction pour démarrer ou mettre en pause la minuterie
function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("start-stop").textContent = "Start";
  } else {
    timer = setInterval(updateTimer, 1000);
    document.getElementById("start-stop").textContent = "Pause";
  }
  isRunning = !isRunning;
}

// Fonction pour mettre à jour la minuterie chaque seconde
function updateTimer() {
  if (workDuration === 0 && breakDuration === 0) {
    clearInterval(timer);
    alert("Minuteries terminées.");
    return;
  }

  if (isWorking) {
    workDuration--;
  } else {
    breakDuration--;
  }

  displayTime(isWorking ? workDuration : breakDuration);

  if (workDuration === 0 && isWorking) {
    alert("Temps de travail terminé. Prenez une pause !");
    isWorking = false;
  } else if (breakDuration === 0 && !isWorking) {
    alert("Pause terminée. Revenez au travail !");
    isWorking = true;
  }
}

// Initialisation de la minuterie au chargement de la page
window.onload = function () {
  displayTime(workDuration);
  document
    .getElementById("start-stop")
    .addEventListener("click", startStopTimer);
};
// Sélectionnez le bouton "Settings"
const settingsButton = document.getElementById("settings");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton "Settings"
settingsButton.addEventListener("click", showSettingsDialog);

// Fonction pour afficher la boîte de dialogue des paramètres
function showSettingsDialog() {
  const newWorkDuration = parseInt(
    prompt("Nouvelle durée de travail en minutes :", workDuration / 60)
  );
  if (!isNaN(newWorkDuration)) {
    workDuration = newWorkDuration * 60;
  }

  const newBreakDuration = parseInt(
    prompt("Nouvelle durée de pause en minutes :", breakDuration / 60)
  );
  if (!isNaN(newBreakDuration)) {
    breakDuration = newBreakDuration * 60;
  }

  displayTime(isWorking ? workDuration : breakDuration);
}
