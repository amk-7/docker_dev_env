// Tableau des concerts avec leur prix
const concerts = [
	{nom: "Dadju", prix: 10000},
	{nom: "Damso", prix: 30000},
	{nom: "Youssoufa", prix: 50000}
];

// Fonction pour charger les concerts dans le select
function chargerConcerts() {
	// Sélection du select
	const select = document.getElementById("concert");

	// Boucle sur les concerts et ajout d'une option pour chacun
	for (const concert of concerts) {
		const option = document.createElement("option");
		option.value = concert.nom;
		option.textContent = concert.nom + " (" + concert.prix + " FCFA)";
		select.appendChild(option);
	}
}

// Fonction pour afficher le ticket
function afficherTicket(nom, prenom, concert, prix) {
	// Sélection de la div pour afficher le ticket
	const resultatDiv = document.getElementById("resultat");

	// Suppression des anciens résultats
	resultatDiv.innerHTML = "";

	// Création du HTML pour le ticket
	const ticketDiv = document.createElement("div");
	ticketDiv.classList.add("ticket");

	const titre = document.createElement("h3");
	titre.textContent = "Ticket acheté pour le concert " + concert;
	ticketDiv.appendChild(titre);

	const nomP = document.createElement("p");
	nomP.textContent = "Nom : " + nom;
	ticketDiv.appendChild(nomP);

    const prenomP = document.createElement("p");
	prenomP.textContent = "Prénom : " + prenom;
	ticketDiv.appendChild(prenomP);

	const dateP = document.createElement("p");
	dateP.textContent = "Date de naissance : " + document.getElementById("date-naissance").value;
	ticketDiv.appendChild(dateP);

	const prixP = document.createElement("p");
	prixP.textContent = "Prix : " + prix + " FCFA";
	ticketDiv.appendChild(prixP);

	resultatDiv.appendChild(ticketDiv);
}

// Événement de soumission du formulaire
document.getElementById("ticket-form").addEventListener("submit", function(event) {
	// Empêche la soumission normale du formulaire
	event.preventDefault();

	// Récupération des valeurs du formulaire
	const nom = document.getElementById("nom").value;
	const prenom = document.getElementById("prenom").value;
	const dateNaissance = new Date(document.getElementById("date-naissance").value);
	const concertNom = document.getElementById("concert").value;

	// Recherche du concert dans le tableau
	const concert = concerts.find(c => c.nom === concertNom);

	// Calcul de l'âge à partir de la date de naissance
	const maintenant = new Date();
	let age = maintenant.getFullYear() - dateNaissance.getFullYear();
	if (maintenant.getMonth() < dateNaissance.getMonth() || (maintenant.getMonth() === dateNaissance.getMonth() && maintenant.getDate() < dateNaissance.getDate())) {
		age--;
	}

	// Vérification de l'âge
	if (age < 16) {
		alert("Vous êtes trop jeune pour acheter un ticket !");
	} else {
		// Affichage du ticket
		afficherTicket(nom, prenom, concert.nom, concert.prix);
	}
});

document.getElementById("imprimerBtn").addEventListener("click", function() {
    // Récupération du contenu HTML du ticket
    const ticketDiv = document.getElementById("resultat");
    const html = ticketDiv.innerHTML;
  
    // Création d'un nouveau document PDF
    const doc = new jsPDF();
  
    // Ajout du contenu HTML au document PDF
    doc.fromHTML(html, 15, 15);
  
    // Téléchargement du document PDF
    doc.save("ticket.pdf");
});
  

// Chargement des concerts dans le select
chargerConcerts();

