//On crée une fonction
let liste = function(){
    return new Promise(function(resolve, reject){
//On crée une variable qui mène vers la liste des caméras   
let urlMongo = 'http://localhost:3000/api/cameras/';
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
};
//Si la promise et résolue
liste().then(function(produits){
    //console.log(produits);
    //console.log(produits.length);
        //On renseigne le nombre d'élément dans le panier
        let idsPanier = init();
        let nbProd = idsPanier.length;
       // console.log(nbProd);
        let nbPanier = document.getElementById('panier--nb');
        nbPanier.innerHTML = nbProd;
    //On remmplit le sous-titre
    let sstitre = document.getElementById('index--sstitre');
    sstitre.innerHTML = 'Caméras vintages'; 
    let ulListe = document.getElementById('liste');
    //On vide le ul en page d'accueil
    ulListe.innerHTML = '';
    for(let i = 0; i < produits.length; i++) {
    //Voir tous les résultats
    //console.log(produits[i].name);
   let li = document.createElement('li');
   li.id = produits[i]._id;
   li.classList = 'col-12 col-sm-6 col-lg-6 text-center cursor';
   li.innerHTML = `<div class="col-12">
   <img class="index--img" id="imageUr_${i}" src="${produits[i].imageUrl}" alt="${produits[i].name}" title="${produits[i].name}" />
   <h3>${produits[i].name}</h3>
   </div>`;
   //On remplit à chaque occurence le ul
   ulListe.appendChild(li);
    }    
   //On vise tous les <li></li>
    let lis = document.querySelectorAll('ul > li');
    //console.log(lis.length);
    //Si click on envoie vers la page Produit.html avec le id du produit
    let goToProd = function () {
       // console.log(this.id);
        window.location.href = "./pages/produit.html?prod="+this.id;
    }        
    for (i=0; i<lis.length; i++) {
    //On écoute les événements qui ont lieu = click
    lis[i].addEventListener('click', goToProd);
    }
}).catch(function(error){
    //console.log(error);
   //On remmplit le sous-titre si on reçoit une erreur
    let sstitre = document.getElementById('index--sstitre');
   sstitre.innerHTML = 'Aucune caméra vintage n\'est disponibles';
});