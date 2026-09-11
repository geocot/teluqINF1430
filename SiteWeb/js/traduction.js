function traduction(mot) {
    motFr = "";
    switch (mot) {
        case "left":
            motFr = "Gauche";
            break;
        case "right":
            motFr = "Droite";
            break;
        case "straight":
            motFr = "Droit";
            break;
        case "slight right":
            motFr = "Légèrement gauche";
            break;
        case "slight right":
            motFr = "Légèrement droite";
            break;
    }

    return motFr;
}