//On crée une fonction
let produit = function(){
return new Promise(function(resolve, reject){   
//On récupère url
const query = new URLSearchParams(window.location.search);
//On récupère le paramètre insérer dans la partie get prod
let id = query.get('prod'); 
//On crée une variable qui mène vers le produit dont le _id est celui récupéré   
let urlMongo = 'http://localhost:3000/api/cameras/'+id;
//On envoie la promise request
    request('GET', urlMongo).then(function (reponse) {
//S'il y a une réponse, on la récupère sous forme d'objet JS
        let element = JSON.parse(reponse);
        resolve(element);
    }).catch(function (error) {
        //Sinon, 
        let msgError = 'Cette caméra vintage n\'est disponible';
        reject(msgError);       
     });
    });
}
//Si la promise et résolue
produit().then(function(element){
    //console.log(element);
    //On renseigne le nombre d'élément dans le panier
    let idsPanier = init();
    let nbProd = idsPanier.length;
    //alert(nbProd);
    let nbPanier = document.getElementById('panier--nb');
    nbPanier.innerHTML = nbProd;
    //On prépare le remplissage des infos
    let result = document.getElementById('produit');
    let article = document.createElement('article');
    //On met article en premier dans la section
    result.prepend(article);
    article.id = element._id;
    article.classList = 'col-12 col-sm-12 col-lg-8';
    let articleInnerHTML = `<div class="col-12 col-sm-12 col-lg-8 name">
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
    <div class="col-12 pr-4" id="partie--description"><h3>Description</h3>
    <p id="description">${element.description}</p>
    </div></div></div></div>`;      
    article.innerHTML = articleInnerHTML;
        //on renseigne le select des lentilles  
   let select = document.getElementById('lentilles');
    //On fait une boucle contenant les les lentilles dans MongoDB de cet objet
   for (let lense of element.lenses){
        let option = document.createElement('option');
        option.innerHTML = lense;                   
        select.appendChild(option);    
    }    
    //On renseigne le formulaire pour le post 
    let form = document.getElementById('form--prod');
    let titleProd = document.createElement('h2');
    titleProd.innerHTML = `Souhaitez-vous ajouter la caméra ${element.name} à votre panier ?`;
    form.prepend(titleProd);
    //On indique le id du produit dans le formulaire (input caché)
    let idProd = document.getElementById('idp');
    idProd.value = element._id;
    
    let bouton = document.getElementById('ajoutPanier');
    //alert(bouton.innerHTML);
        //Si le bouton est cliqué
        bouton.addEventListener('click', toStorage, true);
    function toStorage(){
                let idProd = document.getElementById('idp').value;
                //On vérifie que la value l'input caché n'est pas vide
                if(idProd !=''){
                    //alert(idProd);
                //S'il est rempli, on ajoute la valeur (id du produit) dans le panier
                //via le script gestionpanier, en appelant la fonction add()
                    add(idProd);
                  // On ajoute 1 au nombre de produits affichés dans le header
                    let nbPanier = document.getElementById('panier--nb').innerHTML;
                    let nbProd = Number(nbPanier) + 1;
                    document.getElementById('panier--nb').innerHTML = nbProd;
                    //On retourne en page d'accueil
                    document.location.href = "../index.html";
               }
               else {}          
        }
}).catch(function(msgError){
         //On prépare le remplissage des infos
         let result = document.getElementById('produit');
         let article = document.createElement('article');
         //On met article en premier dans la section
         result.prepend(article);
         //On affiche le message d'erreur
         article.innerHTML = msgError;
});




