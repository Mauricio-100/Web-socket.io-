// Connexion au serveur dès que la page est chargée
const socket = io();

// Récupération des éléments du HTML
const statusDiv = document.getElementById('status');
const actionsList = document.getElementById('actions-recues');

// ---- GESTION DES ÉVÉNEMENTS SOCKET.IO ----

// Confirme la connexion au serveur
socket.on('connect', () => {
    statusDiv.textContent = 'Statut : Connecté au serveur ✅';
    statusDiv.style.color = '#34c759'; // Vert
});

// Gère une éventuelle déconnexion
socket.on('disconnect', () => {
    statusDiv.textContent = 'Statut : Déconnecté ❌';
    statusDiv.style.color = '#ff3b30'; // Rouge
});

// Écoute les actions envoyées par le serveur (venant de l'autre joueur)
socket.on('action_recue', (message) => {
    console.log(`Action reçue : ${message}`);

    // Crée un nouvel élément de liste pour afficher l'action
    const listItem = document.createElement('li');
    listItem.textContent = `Action reçue : ${message}`;

    // Ajoute l'action en haut de la liste pour voir la plus récente
    actionsList.prepend(listItem);
});

// ---- FONCTIONS GLOBALES ----

// Fonction appelée par les boutons pour envoyer une action au serveur
function sendAction(action) {
    if (socket.connected) {
        console.log(`Envoi de l'action : ${action}`);
        socket.emit('action_jeu', action);
    } else {
        console.error("Impossible d'envoyer l'action : non connecté au serveur.");
    }
}
