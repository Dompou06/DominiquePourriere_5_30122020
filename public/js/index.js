//On crée une fonction
const list = function() {
    return new Promise(function (resolve, reject) {
    //On crée une variable qui mène vers la liste des caméras   
    const urlMongo = 'http://localhost:3000/api/cameras/';
        //On envoie la promise request
        request('GET', urlMongo).then(function (reponse) {
            //S'il y a une réponse, on la récupère sous forme d'objet JS
        const element = JSON.parse(reponse);
        resolve(element);
    }).catch(function(error) {
        //Sinon, 
        const msgError = 'Cette caméra vintage n\'est disponible';
        reject(msgError);       
     });
    });
}
//Si la promise et résolue
list().then(function(products) {
    //console.log(products);
    //console.log(products.length);
        //On renseigne le nombre d'éléments contenus dans le tableau du panier, via appel fonction init() de gestionpanier.js
        const idsBasket = init();
        const numberOfProducts = idsBasket.length;
        //On indique le nombre dans le header de index.html
        const numberInBasket = document.getElementById('panier--nb');
        numberInBasket.innerHTML = numberOfProducts;
    //On remmplit le sous-titre
    const subtitle = document.getElementById('index--sstitre');
    subtitle.innerHTML = 'Caméras vintages'; 
    const ulList = document.getElementById('liste');
    //On vide le ul en page d'accueil
    ulList.innerHTML = '';
    //Boucle du nombre de produits contenus dans la bd
    for (let eachProduct = 0; eachProduct < products.length; eachProduct++) {
        //Création d'un li pour chaque produit
        let newLi = document.createElement('li');
        //Ajout d'un id avec le _id du produit
        newLi.id = products[eachProduct]._id;
        //Ajout de l'attribut class avec ses élément
        newLi.classList = 'col-12 col-sm-6 col-lg-6 text-center cursor';
        //Intégration du texte contenu dans le li
        newLi.innerHTML = `<div class="col-12">
        <img class="index--img" id="imageUr_${eachProduct}" src="${products[eachProduct].imageUrl}" alt="${products[eachProduct].name}" title="${products[eachProduct].name}" />
        <h3>${products[eachProduct].name}</h3>
        </div>`;
        //On ajoute le li dans le ul
        ulList.appendChild(newLi);
    }    
   //On vise tous les <li></li>
    const allLi = document.querySelectorAll('ul > li');
    //On envoie vers l'url de la page produit.html avec en paramètre (?) le id du produit
    const goToPageProduit = function() {
       // console.log(this.id);
        window.location.href = "./pages/produit.html?idProduct="+this.id;
    }        
    for (clickLI=0; clickLI < allLi.length; clickLI++) {
    //On écoute les événements qui ont lieu sur les li, si click, on utilise la fonction goToPageProduit
    allLi[clickLI].addEventListener('click', goToPageProduit);
    }
}).catch(function(error) {
   //On remmplit le sous-titre si on reçoit une erreur
    const subtitle = document.getElementById('index--sstitre');
   sstitre.innerHTML = 'Aucune caméra vintage n\'est disponibles';
});