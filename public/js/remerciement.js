let remerciement = function(){
return new Promise(function(resolve, reject){   
//On récupère url
const query = new URLSearchParams(window.location.search);
//On récupère le paramètre insérer dans la partie get prod
let id = query.get('orderId'); 
//On crée une variable qui mène vers le produit dont le _id est celui récupéré 
let urlPostMongo = "http://localhost:3000/api/cameras/order/"+id;
//On envoie la promise request
    request('GET', urlPostMongo).then(function (reponse) {
        let element = JSON.parse(reponse);
        resolve(element);
        console.log(element);

    }).catch(function (error) {
        //Sinon, 
        let msgError = 'La commande n\'a pas pu être effectuée';
        reject(msgError);       
     });
     });
}
//Si la promise et résolue
remerciement().then(function(element){
    console.log(element.firstname);
});