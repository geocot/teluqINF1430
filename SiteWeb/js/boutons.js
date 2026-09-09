//Extension de contrôle pour un bouton
//Aide: https://zestedesavoir.com/tutoriels/4053/leaflet-utilisation-avancee/creation-dune-interface-personnalisee/
let boutonStopLocalisation =  L.Control.extend({  
  options: {
    position: 'topleft'
  },
  
  onAdd: function(map) { //À l'ajout
    var div = L.DomUtil.create('div', 'leaflet-bar my-control');
    var bouton = L.DomUtil.create('button', 'my-button-class', div);
    let imageBouton = L.DomUtil.create('img', '', bouton);
    imageBouton.src = "images/stoplocation20.png";
    imageBouton.style = "margin-left:0px;width:20px;height:20px";
    L.DomEvent.on(bouton, 'click', function() {  arretLocalisation()}, this);
    return div;
  },
  onRemove: function(map) {
  }
});

let boutonStartLocalisation =  L.Control.extend({  
  options: {
    position: 'topleft'
  },
  
  onAdd: function(map) { //À l'ajout
    var div = L.DomUtil.create('div', 'leaflet-bar my-control');
    var bouton = L.DomUtil.create('button', 'my-button-class', div);
    let imageBouton = L.DomUtil.create('img', '', bouton);
    imageBouton.src = "images/location20.png";
    imageBouton.style = "margin-left:0px;width:20px;height:20px";
    L.DomEvent.on(bouton, 'click', function() {  localisation()}, this);
    return div;
  },
  onRemove: function(map) {
  }
});