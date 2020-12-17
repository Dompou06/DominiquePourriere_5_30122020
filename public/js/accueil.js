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
         for(let i = 0; i < results.length; i++) {
             //let li = document.createElement('li');
             let n = i + Number(1);
             let li = document.createElement('li');
             li.id = n;
             li.classList = 'col-12 col-sm-12 col-lg-6 text-center cursor';
             li.innerHTML = '<div class="col-12"></div>';
             let div = document.createElement('div');
             li.appendChild(div);
             //li.innerHTML = results[i].name;
             //On remplit à chaque occuence le ul
             result.appendChild(li);
         }
        }
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