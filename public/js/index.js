//https://www.grafikart.fr/tutoriels/ajax-780
//Connection à mongodb
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
//On attend que les données soient chargées
    if (request.readyState === 4) {
        //On vide le sstitre en page d'accueil
        let sstitre = document.getElementById('index--sstitre');
        sstitre.innerHTML = '';
        //On vérifie qu'il n'y pas d'erreur dan l'adresse url
        if(request.status === 200) {
            //C'est ok 
        //On remmplit le sous-titre
        sstitre.innerHTML = 'Caméras vintages';           
        // On convertit le json en js sous forme de tableau
        let results = JSON.parse(request.responseText);
        // document.getElementById('name1').innerHTML = request.responseText;
        let result = document.getElementById('liste');
        //On vide le ul en page d'accueil
        result.innerHTML = '';

//https://www.xul.fr/html5/innerhtml.php


         for(let i = 0; i < results.length; i++) {
             //Voir tous les résultats
             //console.log(results[i]);
             let li = document.createElement('li');
             li.id = results[i]._id;
             li.classList = 'col-12 col-sm-12 col-lg-6 text-center cursor';
             li.innerHTML = '<div class="col-12"><img class="index--img" id="imageUr_'+i+'" src="'+results[i].imageUrl+'" alt="'+results[i].name+'" title="'+results[i].name+'" /><h3>'+results[i].name+'</h3></div>';
             //On remplit à chaque occuence le ul
             result.appendChild(li);
         }
        }
        //Si on ne peut se connecter à la base de données
        else {           
        //On remmplit le sous-titre
        sstitre.innerHTML = 'Aucune caméra vintage n\'est disponible';
        }
    }
   // let a = request;
   // debugger;
}
request.open('GET', 'http://localhost:3000/api/cameras', true);

request.send();