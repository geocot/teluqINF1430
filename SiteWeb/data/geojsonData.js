        //Bind popup des données geojson
        function onEachFeature(feature, layer) {
            let popupContent = "";
            if(feature.properties.url == "Aucun"){
              popupContent = `<div class="divPopup"><p class="popupTitle">${feature.properties.nom}</p><p>Info: ${feature.properties.info}</p></div>`;
            } else {
              popupContent = `<div class="divPopup"><p class="popupTitle">${feature.properties.nom}</p><p>Info: ${feature.properties.info}</p><p><a href="${feature.properties.url}" target="_blank">Lien</p></div>`;
            }
            layer.bindPopup(popupContent);
        }

        //Icone pour les données GeoJSON
        const tourismeIcon = L.icon({
		iconUrl: 'images/map-pin.png',
		iconSize: [32, 37],
		iconAnchor: [16, 37],
		popupAnchor: [0, -28]
	    });

        //Requête Ajax pour récupérer les données GeoJSON et l'affichage
        async function addGeoJson() {
            //const response = await fetch("poi.geojson"); //Pour utilisation locale
            const response = await fetch("data/geojson.php"); //Pour utilisation web
            const data = await response.json();
            L.geoJson(data, {
                pointToLayer(feature, latlng) {
                    ajoutPoints(feature);  //AJout des points Turf pour les traitements de géomatique
                    return L.marker(latlng, { icon: tourismeIcon });
                },
                onEachFeature: onEachFeature
            }).addTo(carte);
            creationFeatureCollectionPointTurf() //Création de la FeatureCollection de points Turf. 
        }

        