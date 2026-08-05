        //Bind popup des données geojson
        function onEachFeature(feature, layer) {
            let popupContent = "";
            if(feature.properties.url == "Aucun"){
              console.log(`${feature.properties.url}`);
              popupContent = `<div class="divPopup"><p>Info: ${feature.properties.info}</p></div>`;
            } else {
              popupContent = `<div class="divPopup"><p>Info: ${feature.properties.info}</p><p><a href="${feature.properties.url}" target="_blank">Lien</p></div>`;
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
            const response = await fetch("poi.geojson");
            const data = await response.json();
            L.geoJson(data, {
                pointToLayer(feature, latlng) {
                    return L.marker(latlng, { icon: tourismeIcon });
                },
                onEachFeature: onEachFeature
            }).addTo(carte);
        }
