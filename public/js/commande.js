//A la fin du chargement de la page
window.onload = () => {  
    const buttonOrdered = document.getElementById('commander');
    //Si le bouton Commander est cliqué
    buttonOrdered.addEventListener('click', ordered, true);
    //On lance la fonction ordered
    function ordered() {
        const inputs = document.getElementsByTagName('input');
        //On crée une variable boléenne de valeur true pour les iputs remplis
        let valid = true;
        for (let numberOfInputs = 0; numberOfInputs < inputs.length; numberOfInputs++) {
            //Si certains champs input sont vides et donc ne sont pas conformes à required,
            //la méthode reportValidity() n'est pas true
            if (!inputs[numberOfInputs].reportValidity()) {
                //La variable est équivalent à false, cela déclenche l'alerte required en page html
                valid = false;
            }
        }
        //Si aucun champ input n'est vide
        if (valid) {
            //On récupère la valeur des input
            let mailValue = document.getElementById('email').value;
            let firstnameValue = document.getElementById('nom').value;
            let lastnameValue = document.getElementById('prenom').value;
            let addressValue = document.getElementById('adresse').value;
            let cityValue = document.getElementById('ville').value;
            //On crée une constante avec l'objet' attendu par controllers/camera.js
            const order = {
            //Soit les données des inputs sous forme d'objet
                contact:{
                    firstName: firstnameValue,
                    lastName: lastnameValue,
                    address: addressValue,
                    city: cityValue,
                    email: mailValue
                },
                //Et le contenu du localstorage (value dans key basquet) sous forme de tableau
                // eslint-disable-next-line no-undef
                products: init()
            };
            const urlPostMongo = 'http://localhost:3000/api/cameras/order';
            //On envoie via la promise une requête POST à la BD Mongo, 
            //avec l'url indiqué dans le MVP, 
            // la constante sérialisée en JSON
            //ainsi que le type de contenu (JSON)
            // eslint-disable-next-line no-undef
            callToMongoDB('POST', urlPostMongo, JSON.stringify(order), 'application/json').then((results) => {
                //On lit la réponse de BD Mongo
                let datasPost = JSON.parse(results);
                // console.log(donneesPost.orderId);
                //On charge la page commande.html en lui mettant en paramètre la reponse de l'order_id de MongoDB
                window.location.assign(`commande.html?orderId=${datasPost.orderId}`);
            }).catch(() => {
                alert('La commande n\'a pu être enregistrée');
            });
        }
    }
};

