/* eslint-disable no-undef */
const subtitle = document.getElementById('index--sstitre');
//On crée une fonction
const getCameraList = () => {
    return new Promise((resolve, reject) => {
    //On crée une variable qui mène vers la liste des caméras   
        const urlMongo = 'http://localhost:3000/api/cameras/';
        //On envoie la promise request
        callToMongoDB('GET', urlMongo).then((reponse) => {
            //S'il y a une réponse, on la récupère sous forme d'objet JS
            resolve(JSON.parse(reponse));
        }).catch(() => {
            //Sinon, 
            const msgError = 'Cette caméra vintage n\'est disponible';
            reject(msgError);       
        });
    });
};
//Si la promise et résolue
getCameraList().then(products => {
    //On indique le nombre de produits dans le panier, dans le header de index.html
    const numberInBasket = document.getElementById('panier--nb');
    numberInBasket.innerHTML = numberOfProducts;
    //On remmplit le sous-titre ???
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
        window.location.href = './pages/produit.html?idProduct=' + this.id;
    };        
    for (let clickLI=0; clickLI < allLi.length; clickLI++) {
    //On écoute les événements qui ont lieu sur les li, si click, on utilise la fonction goToPageProduit
        allLi[clickLI].addEventListener('click', goToPageProduit);
    }
}).catch(() => {
    //On remmplit le sous-titre si on reçoit une erreur
    subtitle.innerHTML = 'Aucune caméra vintage n\'est disponibles';
});