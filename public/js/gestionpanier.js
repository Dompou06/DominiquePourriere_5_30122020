function init() {
    //On récupère toutes les données déjà intégrées dans le localStorage
    const basket = localStorage.getItem('basket');
    if (basket != null) {
        //Si le panier n'est pas vide, on parse les values contenues dans la key basket (on transforme le JSON en objet JS)
        return JSON.parse(basket);
    } else {
        //Sinon, on retourne un tableau vide mais avec la création de la key basket
        return [];
    }
}
//Ajouter des values dans un key (basket) : localStorage.setItem('key', value);
// eslint-disable-next-line no-unused-vars
function add(idProduct) {
    //On lance la fonction init
    const basket = init();
    //Méthode pour ajouter un nouvel item à la fin du tableau de la key basket parsé
    basket.push(idProduct);
    //On sérialise le nouvel tableau (on transforme les objets JS en chaîne JSON)
    localStorage.setItem('basket', JSON.stringify(basket));
}
//On supprime un item des valeurs du tableau de la basket dans le localStorage
// eslint-disable-next-line no-unused-vars
function remove(idProduct) {
    let basket = init();
    //On filtre tous les éléments du tableau
    basket = basket.filter((product) => {
        //On retourne ceux qui ne sont pas celui a supprimé (idProduct)
        return product != this;
    }, idProduct);
    //On les réinjecte dans le localStorage sous forme d'un JSOM
    localStorage.setItem('basket', JSON.stringify(basket));
}
//On supprime la clé basket et donc le tableau qui s'y relie, quand on arrive à la page commande.html
// eslint-disable-next-line no-unused-vars
function clear() {
    localStorage.removeItem('basket');
}