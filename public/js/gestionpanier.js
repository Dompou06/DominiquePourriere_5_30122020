function init() {
    //On récupère toutes les données déjà intégrées dans la clé cart du localStorage
    const cart = localStorage.getItem('cart');
    if (cart !== null) {
        //Si le panier n'est pas vide, on parse les values contenues dans la key cart (on transforme le JSON en objet JS)
        return JSON.parse(cart);
    } else {
        //Sinon, on retourne un tableau vide mais avec la création de la key cart
        return [];
    }
}
//Ajouter des values dans un key (cart) : localStorage.setItem('key', value);
// eslint-disable-next-line no-unused-vars
function add(idProduct) {
    //On lance la fonction init
    const cart = init();
    //Méthode pour ajouter un nouvel item à la fin du tableau de la key cart parsé
    cart.push(idProduct);
    //On sérialise le nouvel tableau (on transforme les objets JS en chaîne JSON)
    localStorage.setItem('cart', JSON.stringify(cart));
}
//On supprime un item des valeurs du tableau de la clé cart dans le localStorage
// eslint-disable-next-line no-unused-vars
function remove(idProduct) {
    let cart = init();
    //On filtre tous les éléments du tableau
    let cartFilter = cart.filter(function (product) {
        //On retourne ceux qui ne sont pas ce {
        //On retourne ceux qui ne sont pas celui a supprimé (idProduct)
        return product != this;
    }, idProduct);
    //On les réinjecte dans le localStorage sous forme d'un JSOM
    localStorage.setItem('cart', JSON.stringify(cartFilter));
}
//On supprime la clé cart et donc le tableau qui s'y relie, quand on arrive à la page commande.html
// eslint-disable-next-line no-unused-vars
function clear() {
    localStorage.removeItem('cart');
}