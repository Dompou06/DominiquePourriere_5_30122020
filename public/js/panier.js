//On récupère le tableau contenu dans LocalStorage
let idsPanier = init();
// console.log(idsPanier);
//On initialise une variable du total général
let total = 0;
//On fait une boucle sur le tableau en localStorage
//Pour chaque id de produit
idsPanier.forEach(function (panierId) {
  //On crée une variable contenant l'API Mongodb avec comme paramètre les éléments dans le panier 
  let urlMongo = "http://localhost:3000/api/cameras/" + panierId;
  //On envoie via la promise une requête GET à la BD Mongo
  request("GET", urlMongo).then(function (result) {
    //On transforme la chaîne reçue en objet JS
      let idDB = JSON.parse(result);
    let panierUL = document.getElementById("panier--ul");
    let panierLi = document.createElement("li");
    panierLi.id = 'id_'+idDB._id;
    panierLi.innerHTML = `<div class="row">
    <div class="col-4">
    <img src="${idDB.imageUrl}" alt="${idDB.name}" title="${idDB.name}" />
    </div>
    <div class="col-8 pt-0">
    <h4 class="name">${idDB.name}</h4>
    <div class="row pl-3">
    <select id="select_${idDB._id}" class="col-6 form-control quantite" onchange="newPrix(this.id, this.value)">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    </select>
    <div id="${idDB._id}" class="icon-bin cursor" onClick="supprimer(this.id)"></div>
    </div>
    <input type="hidden" id="pu_${idDB._id}" value="${idDB.price}" />
    <p>Prix : <span id="price_${idDB._id}" class="price">${idDB.price / 100}</span> €</p>
    </div>
    </div>`;
    panierUL.appendChild(panierLi);
    total += idDB.price / 100;
    document.getElementById('price--total').innerHTML = total.toFixed(2);   
  //On renseigne le nombre d'élément dans le panier
let nbProd = idsPanier.length;
let nbPanier = document.getElementById('panier--nb');
nbPanier.innerHTML = nbProd;
  });
});
function newPrix(idSelect, quantite){
  let totalPrix = document.getElementById('price--total').innerHTML;
 //On change le prix en rapport de la quantité
  let id = idSelect.slice(7);
  let idPrice = 'price_'+id;
  //On récupère l'ancien prix
  let price = document.getElementById(idPrice).innerHTML;
  //alert (price);
  //On le supprime du total en centimes
  let totalPrixIntermediaire = (Number(totalPrix) * 100) - (Number(price) * 100);
  //On récupère le prix unitaire
  let pu = document.getElementById('pu_'+id).value;
  //On calcule le nouveau prix
  let newPrice = Number(pu) * quantite;
  document.getElementById(idPrice).innerHTML = newPrice / 100;
  //On change le prix total
  document.getElementById('price--total').innerHTML = ((totalPrixIntermediaire + newPrice)/100).toFixed(2);
}
function supprimer(idProd){
  //On récupère l'id et on utilise la function dans gestionpanier.js pour supprimer l'élément
  remove(idProd);
  //On recharge la page
  document.location.reload();
}



