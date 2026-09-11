//Lors du click sur le bouton
function itineraire(btn) {
    titrePanneau.innerHTML = "Calcul du trajet...";
    //Arrêt du suivi
    arretLocalisation();
    //Sort les données dans un tableau X,Y
    let coordoneesStr = btn.value.split(",");
    let coordonnesFloat = [parseFloat(coordoneesStr[1]), parseFloat(coordoneesStr[0])];
    //Trouve la position de l'usager
    if (dernierePositionUsagerYX != null) {
        titrePanneau.innerHTML = `Trajet ${coordoneesStr[2]}`;
        rechercheItineraire(dernierePositionUsagerYX, coordonnesFloat);
        //messagePanneau.innerHTML = "Temps: ";
    } else {
         titrePanneau.innerHTML = "Trajet";
        messagePanneau.innerHTML = "Problème avec la localisation";
    }

}


//Requête Ajax pour récupérer les données GeoJSON et l'affichage
async function rechercheItineraire(positionSource, positionDestination) {
    let URL = `https://router.project-osrm.org/route/v1/foot/${positionSource[1]},${positionSource[0]};${positionDestination[1]},${positionDestination[0]}?steps=true`;
    const response = await fetch(URL); //Pour utilisation locale
    const data = await response.json();
    distanceDestinationTouristique.innerHTML = (data.routes[0].distance/1000).toFixed(1) + " km"; 
    messagePanneau.innerHTML = "Temps: " + (data.routes[0].duration/60).toFixed(0) + " min.";
    constructionItineraire(data.routes[0].legs[0].steps);
}

function constructionItineraire(steps){
    groupeEtapes.clearLayers();
    ligneCoords = [];
    let nbSteps = parseInt(steps.length);
    //Pour chaque points de l'itinéraire
    for(let i = 0; i<nbSteps; i++){
        console.log(steps[i].name);
        //Fabrication de la ligne
        let point = [steps[i].intersections[0].location[1],steps[i].intersections[0].location[0]];
        ligneCoords.push(point);

        //Fabrication du Popup
        let msgPopup = document.createElement('div');
        msgPopup.textContent = traduction(steps[i].maneuver.modifier) + " "  + steps[i].name;
        L.marker(point).bindPopup(msgPopup).addTo(groupeEtapes);
    }
    let polyline = L.polyline(ligneCoords, {color: 'blue'}).addTo(groupeEtapes);
    console.log(steps);
}


