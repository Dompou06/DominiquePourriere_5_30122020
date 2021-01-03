//On crée une fonction qui recevra les paramètres de connection à la base de données
//Les paramètres lors de l'envoi (data et contentType) sont facultatif via = null
let request = function (method, url, data=null, contentType=null) {
    //On crée une promise qui se résoudra plus tard (asyncrone)
    return new Promise(function(resolve, reject){
        //On crée un objet permettant d'interagir avec une bd
        let request = new XMLHttpRequest();
        //On écoute les changement d'état de l'objet
        request.onreadystatechange = function () {
            //Si l'état arrive à étape 4 : (0)création puis (1)appel de open(), (2)appel de send(), (3)téléchargement via responseText, (4) Fin de l'opération 
                if (request.readyState === 4) {
                        //On vérifie qu'il n'y pas d'erreur dans l'adresse url vers mongodb
                        if(request.status === 200) {
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