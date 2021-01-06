//On crée une fonction qui recevra la méthode (GET ou POST) les paramètres de connection à la base de données
//Et les paramètres lors de l'envoi de données (data et contentType) facultatifs via = null
let request = function (method, url, data=null, contentType=null) {
    //On crée une promise qui se résoudra plus tard (asyncrone)
    return new Promise(function(resolve, reject){
        //On crée un objet permettant d'interagir avec une bd
        let request = new XMLHttpRequest();
        //On écoute les changements d'état de request
        request.onreadystatechange = function () {
            //Si le dernier état est l'étape 4 : (0)création puis (1)appel de open(), (2)appel de send(), (3)téléchargement via responseText, (4) Fin de l'opération 
                if (request.readyState === 4) {
                        //On vérifie qu'il n'y pas d'erreur dans le statut de la promise vers mongodb (200 pour Get et 201 pour Post)
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