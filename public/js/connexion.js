//On crée une fonction qui recevra la méthode (GET ou POST) les paramètres de connection à la base de données
//Et les paramètres lors de l'envoi de données (data et contentType) facultatifs via = null
let request = function (method, url, data=null, contentType=null) {
    //On crée une promise qui se résoudra plus tard (asyncrone)
    return new Promise(function(resolve, reject){
        //On crée un objet AJAX permettant d'obtenir ou envoyer des données JSON via HTTP
        let request = new XMLHttpRequest();
        //On écoute les changements d'état de XMLHttpRequest
        request.onreadystatechange = function () {
            //Si le dernier état du client XMLHttpRequest est l'étape 4 : (0)création puis (1)appel de open(), (2)appel de send(), (3)téléchargement via responseText, (4) Fin de l'opération 
            //https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest/readyState
            if (request.readyState === 4) {
                //On vérifie qu'il n'y pas d'erreur dans le statut de l'objet XMLHttpRequest (200 = tout est ok et 201  = tout est ok et une nouvelle ressource a été créée)
                if(request.status === 200 || request.status === 201) {
                    resolve(request.responseText);
                }
                //Si cela a échoué
                else{
                    reject(request.responseText);
                }
            }
        }
        //On ouvre la méthode (GET ou POST) et le paramèttre url indiqué dans then et manière asynchrone(true)
        request.open(method, url, true);
            //Si lors de l'appel de la fonction request le patamètre contentType est renseigné
            if(contentType != null){
                //On utilise la méthode setRequestHeader pour envoyer le type de contenu du corps de la requête
                request.setRequestHeader('Content-Type', contentType);
            }
        //On envoie la requête et s'il y a des données (data), elles sont aussi envoyées
        request.send(data);
    });
}