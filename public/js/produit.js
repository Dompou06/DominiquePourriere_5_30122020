/* eslint-disable no-undef */
//On crée une fonction
const product = () => {
    return new Promise((resolve, reject) => {   
    //On récupère url
        const query = new URLSearchParams(window.location.search);
        //On récupère le paramètre insérer dans le paramètre get (idProduct) dans une constante
        const idProduct = query.get('idProduct'); 
        //On ajoute cette constante à l'url de base de données en get   
        const urlMongo = 'http://localhost:3000/api/cameras/' + idProduct;
        //On envoie la promise request
        callToMongoDB('GET', urlMongo).then((reponse) => {
            //On l'intègre dans le resolve de la promise en format JS
            resolve(JSON.parse(reponse));
        }).catch(() => {
            //Sinon... 
            let msgError = 'Cette caméra vintage n\'est disponible';
            reject(msgError);       
        });
    });
};
//Si la promise et résolue, on récupère la réponse de la bd
product().then((element) => {
    //On indique le nombre d'éléments actuels dans le panier, dans le header de index.html
    const numberInBasket = document.getElementById('panier--nb');
    numberInBasket.innerHTML = numberOfProducts;
    //On cible et crée les éléments html pour le remplissage des infos fournis par la bd
    const result = document.getElementById('produit');
    const article = document.createElement('article');    //On met article en premier dans la section
    result.prepend(article);
    article.id = element._id;
    article.classList = 'col-12 col-sm-12 col-lg-8';
    const articleInnerHTML = `<div class="col-12 col-sm-12 col-lg-8 name">
    <h2>${element.name}</h2></div>
    <div class="row"><div class="col-12 col-sm-12 col-lg-6">                            
    <img class="imageUr img--produit" src="${element.imageUrl}" alt="Appareil ${element.name}" title="Appareil ${element.name}" />                          
    </div>
    <div class="col-12 col-sm-12 col-lg-6"><div class="row">
    <label class="col-12 col-sm-12 col-lg-6" for="lentilles">Lentilles disponibles</label>
    <select class="col-11 col-sm-11 col-lg-5 ml-3" id="lentilles" name="lentilles" aria-label="Choisir une lentille">
    </select>
    <div class="col-12" id="prix">Prix unitaire : <span class="price">${element.price / 100}</span> €
    </div>
    <div class="col-12 pr-4" id="partie--description"><h4>Description</h4>
    <p id="description">${element.description}</p>
    </div></div></div></div>`;      
    article.innerHTML = articleInnerHTML;
    //On renseigne le select des lentilles  
    const selectLens = document.getElementById('lentilles');
    //On fait une boucle contenant les lentilles indiquées dans MongoDB pour cet caméra
    for (let lense of element.lenses) {
        const optionsOfSelectLens = document.createElement('option');
        optionsOfSelectLens.innerHTML = lense;                   
        selectLens.appendChild(optionsOfSelectLens);    
    }    
    //On renseigne le formulaire pour l'envoi vers le LocalStorag 
    const form = document.getElementById('form--prod');
    const titleForm = document.createElement('h4');
    titleForm.innerHTML = `Souhaitez-vous ajouter la caméra ${element.name} à votre panier ?`;
    form.prepend(titleForm);
    //On indique le id du produit dans un input caché du formulaire
    const inputForIdProduct = document.getElementById('idp');
    inputForIdProduct.value = element._id;
    
    const buttonAddBasket = document.getElementById('ajoutPanier');
    //Si le bouton est cliqué, on lance la fonction toStorage
    buttonAddBasket.addEventListener('click', toStorage, true);
    function toStorage() {
        const idProduct = document.getElementById('idp').value;
        //On vérifie que la value l'input caché n'est pas vide
        if (idProduct !=='') {
            //S'il est rempli, on ajoute la valeur (id du produit) dans le panier
            //via le script gestionpanier, en appelant la fonction add()
            add(idProduct);
            // On ajoute 1 au nombre de produits affichés dans le header
            const numberInCart = document.getElementById('panier--nb');
            const numberOfProducts = idsCart.length;
            numberInCart.innerHTML = Number(numberOfProducts) + 1;
            //On retourne en page d'accueil
            document.location.href = '../index.html';
        } else {
            alert('La caméra n\'est plus disponible');
        }          
    }
}).catch(() => {
    //On affiche le message d'erreur
    //On cible et crée les éléments html pour le remplissage des infos fournis par la bd
    const result = document.getElementById('produit');
    console.log(result);
    const article = document.createElement('article');
    result.prepend(article);
    article.classList = 'col-12 col-sm-12 col-lg-8';
    const articleInnerHTML = `<div class="col-12 col-sm-12 col-lg-8 name">
        <h2>Aucune caméra ne correspond à votre demande</h2></div></div>`;  
    article.innerHTML = articleInnerHTML;  
});




