//A la fin du chargement de la page
window.onload = function(){  
    let boutonCommande = document.getElementById('commander');
        //Si le bouton Commander est cliqué
        boutonCommande.addEventListener('click', commande, true);
        //On lance la fonction
    function commande(){
    var champs = document.getElementsByTagName("input");
    //On crée une variable boléenne de valeur true
    let valid = true;
        for (var i = 0; i < champs.length; i++) {
            //Si certains champs input sont vides et donc ne sont pas conformes à required,
            //la méthode reportValidity() n'est pas true
            if(!champs[i].reportValidity()){
                //La variable est équivalent à false, cela déclenche l'alerte required
                valid = false;
            }
        }
        //Si aucun champ input n'est vide
            if(valid){
            //On récupère la valeur des input
            let mail = document.getElementById('email').value;
            let nom = document.getElementById('nom').value;
            let prenom = document.getElementById('prenom').value;
            let addresse = document.getElementById('adresse').value;
            let ville = document.getElementById('ville').value;
            //On crée une constante avec les attentes attendues par controllers/camera.js
            const order = {
            //Soit les données des inputs
            contact:{
                firstName: nom,
                lastName: prenom,
                address: addresse,
                city: ville,
                email: mail
            },
            //Et le contenu du localstorage (produits dans le panier)
            products: init()
            };
            let urlPostMongo = "http://localhost:3000/api/cameras/order";
            //On envoie via la promise une requête POST à la BD Mongo, 
            //avec l'url indiqué dans le MVP, 
            // la constante sérialisée en JSON
            //ainsi que le type de contenu (JSON)

            request("POST", urlPostMongo, JSON.stringify(order), 'application/json').then(function (results) {
                //On lit la réponse de BD Mongo
                let donneesPost = JSON.parse(results);
            // console.log(donneesPost.orderId);
            //On charge la page commande.html en lui mettant en paramètre la reponse de l'order_id de MongoDB
            window.location.assign(`/public/pages/commande.html?orderId=${donneesPost.orderId}`);
            }).catch(function(error){
                console.error(error);
              // let donneesPost = JSON.parse(error);
               //console.log(donneesPost.orderId);
              // window.location.assign(`/public/pages/commande.html?orderId=${donneesPost.orderId}`);
            });

        }
    }
}

