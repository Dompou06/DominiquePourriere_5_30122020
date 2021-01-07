//On récupère le tableau contenu dans LocalStorage
const idsBasket = init();
 //console.log(idsPanier);
//On initialise une variable du total général
let total = 0;
//Si le panier n'est pas vide
//console.log(idsPanier.length);
//On fait une boucle sur le tableau en localStorage
//Pour chaque id de produit
idsBasket.forEach(function (basketId) {
  //On crée une variable contenant l'API Mongodb avec comme paramètre les éléments dans le panier 
  const urlMongo = "http://localhost:3000/api/cameras/" + basketId;
  //On envoie via la promise une requête GET à la BD Mongo
  request("GET", urlMongo).then(function (result) {
    //On transforme la chaîne reçue en objet JS
      const idDB = JSON.parse(result);
      const basketUl = document.getElementById('panier--ul');
      //On crée un li pour chaque result et on y intègre les données de la db
      const basketUlLi = document.createElement('li');
      basketUlLi.id = 'id_'+idDB._id;
      basketUlLi.innerHTML = `<div class="row">
      <div class="col-4">
      <img src="${idDB.imageUrl}" alt="${idDB.name}" title="${idDB.name}" />
      </div>
      <div class="col-8 pt-0">
      <h4 class="name">${idDB.name}</h4>
      <div class="row pl-3">
      <select id="select_${idDB._id}" class="col-6 form-control quantite" onchange="newPrice(this.id, this.value)">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>
      <div id="${idDB._id}" class="icon-bin cursor" onClick="deleteProduct(this.id)"></div>
      </div>
      <input type="hidden" id="pu_${idDB._id}" value="${idDB.price}" />
      <p>Prix : <span id="price_${idDB._id}" class="price">${idDB.price / 100}</span> €</p>
      </div>
      </div>`;
      basketUl.appendChild(basketUlLi);
      //On ajoute au total le prix de la caméra
      total += idDB.price / 100;
      document.getElementById('price--total').innerHTML = total.toFixed(2);   
        //On renseigne le header de panier.html du nombre d'éléments dans le panier
        const numberOfProducts = idsBasket.length;
        const numberInBasket = document.getElementById('panier--nb');
        numberInBasket.innerHTML = numberOfProducts;
  });
});
function newPrice(idSelect, amount){
    const totalPrice = document.getElementById('price--total').innerHTML;
  //On change le prix en rapport de la quantité
    //On récupère le _id du produit via le id du select soit après les 7 premiers signes (select_)
    const idProduct = idSelect.slice(7);
    const idPrice = 'price_'+idProduct;
    //On récupère l'ancien prix
    const price = document.getElementById(idPrice).innerHTML;
    //On le supprime du total en centimes
    const totalPrixIntermediate = (Number(totalPrice) * 100) - (Number(price) * 100);
    //On récupère le prix unitaire
    const unitPrice = document.getElementById('pu_'+idProduct).value;
    //On calcule le nouveau prix
    let newPrice = Number(unitPrice) * amount;
    document.getElementById(idPrice).innerHTML = newPrice / 100;
    //On change le prix total
    document.getElementById('price--total').innerHTML = ((totalPrixIntermediate + newPrice)/100).toFixed(2);
};
function deleteProduct(idProduct){
  //On récupère l'id et on utilise la function dans gestionpanier.js pour supprimer l'élément
  remove(idProduct);
  //On recharge la page
  document.location.reload();
}





