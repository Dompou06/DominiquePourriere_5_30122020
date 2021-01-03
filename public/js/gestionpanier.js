function init(){
    //On récupère toutes les données déjà intégrées dans le localStorage
        let panier = localStorage.getItem('panier');
        if(panier != null){
            //On parse le panier (on transforme la chaîne en objet JS)
            return JSON.parse(panier);
        }
        else {
            return [];
        }
    }
    //Ajouter des values dans un key : localStorage.setItem('key', value);
    function add(idProd){
        let panier = init();
        //Méthode pour ajouter un nouvel item à la fin du tableau panier parsé
        panier.push(idProd);
        //On sérialise le nouvel objet tableau (on transforme les objets JS en chaîne JSON)
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    //On supprime un item du localStorage
    function remove(idProd){
        let panier = init();
        //On filtre tous les éléments du localStorage
        panier = panier.filter(function(produit){
            //On retourne ceux qui ne sont pas celui a supprimé (idProd)
            return produit != this;
        }, idProd);
        //On les réinjecte dans le localStorage sous forme d'un JSOM
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    //On supprime les items ayant la clé panier, quand on arrive à la page commande.html
    function clear(){
       localStorage.removeItem('panier');
    }