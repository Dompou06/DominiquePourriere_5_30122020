//Au chargement de la page
window.onload = function() {
    //On récupère le paramètre insérer la partie get orderId
    let params = window.location.search;
    //console.log(params);
    //On récupère le contenu de orderId
    let searchParams = new URLSearchParams(params);
    let id = searchParams.get("orderId");
    //console.log(id);
    ///On indique la référence (ordrerId)
    document.getElementById('id-commande').innerHTML = id;
    //On récupère le tableau contenu dans LocalStorage
    let idsPanier = init();
    // console.log(idsPanier);
    //On initialise une variable du total général
    let total = 0;
        idsPanier.forEach(function(panierId) {
            //On crée une variable contenant l'API Mongodb avec comme paramètre les éléments dans le panier 
            let urlMongo = "http://localhost:3000/api/cameras/" + panierId;
            //On envoie via la promise une requête GET à la BD Mongo
            request("GET", urlMongo).then(function(result) {
                //On transforme la chaîne reçue en objet JS
                let idDB = JSON.parse(result);
                total += idDB.price / 100;
                document.getElementById('montant-commande').innerHTML = total.toFixed(2);   
                //On renseigne le nombre d'élément dans le panier
                //On vide le localStorage
                clear(idsPanier);
            });   
        });
}



