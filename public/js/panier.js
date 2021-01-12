/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//On récupère le tableau contenu dans LocalStorage
// eslint-disable-next-line no-undef
const idsCart = init();
//On initialise une variable du total général
let total = 0;
//On fait une boucle sur le tableau en localStorage
//Pour chaque id de produit
idsCart.forEach(cartId => {
    //On crée une variable contenant l'API Mongodb avec comme paramètre les éléments dans le panier 
    const urlMongo = 'http://localhost:3000/api/cameras/' + cartId;
    //On envoie via la promise une requête GET à la BD Mongo
    callToMongoDB('GET', urlMongo).then(function(result) {
    //On transforme la chaîne reçue en objet JS
        const idDB = JSON.parse(result);
        const cartUl = document.getElementById('panier--ul');
        //On crée un li pour chaque result et on y intègre les données de la db
        const cartProduct = document.createElement('li');
        cartProduct.id = 'id_' + idDB._id;
        cartProduct.innerHTML = `<div class="row">
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
      <div id="deleteIdProduct_${idDB._id}" class="icon-bin cursor" onclick="deleteProduct(this.id)"></div>
      </div>
      <input type="hidden" id="pu_${idDB._id}" value="${idDB.price}" />
      <p>Prix : <span id="price_${idDB._id}" class="price">${idDB.price / 100}</span> €</p>
      </div>
      </div>`;
        cartUl.appendChild(cartProduct);
        //On ajoute au total le prix de la caméra
        total += idDB.price / 100;
        document.getElementById('price--total').innerHTML = total.toFixed(2);   
        //On renseigne le header de panier.html du nombre d'éléments dans le panier
        const numberOfProducts = idsCart.length;
        const numberInCart = document.getElementById('panier--nb');
        numberInCart.innerHTML = numberOfProducts;
    });
});
function newPrice(idSelect, amount) {
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
}
function deleteProduct(deleteIdProduct) {
    const idProduct = deleteIdProduct.slice(16);
    //On récupère l'id et on utilise la function dans gestionpanier.js pour supprimer l'élément
    remove(idProduct);
    //On recharge la page
    document.location.reload();
}





