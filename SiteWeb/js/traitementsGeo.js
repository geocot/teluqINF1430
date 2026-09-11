let listePointsTurf = [];
let featureCollectionPointTurf;

function calcDistance2Pts(pt1, pt2) {
    //Calcul la distance entre 2 points
    var options = { units: "meters" };
    return turf.distance(pt1, pt2, options);
}

function ajoutPoints(feature){
    listePointsTurf.push(turf.point([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], { nom: feature.properties.nom}))
}

function creationFeatureCollectionPointTurf(){
    featureCollectionPointTurf = turf.featureCollection(listePointsTurf);
    console.log(featureCollectionPointTurf);
}

function pointTourismePlusProcheUsager(positionUsager){
    pointTurfUsager = turf.point([positionUsager[0],positionUsager[1]]);
    var nearest = turf.nearestPoint(pointTurfUsager, featureCollectionPointTurf);
    let trajetPlusProche = L.polyline([[nearest.geometry.coordinates[1], nearest.geometry.coordinates[0]], [positionUsager[1],positionUsager[0]]], {color: 'yellow'});

    groupeTrajet.clearLayers();
    groupeTrajet.addLayer(trajetPlusProche);
    messagePanneau.innerHTML = nearest.properties.nom;
    distanceDestinationTouristique.innerHTML = nearest.properties.distanceToPoint.toFixed(2) + " km"; 
}

