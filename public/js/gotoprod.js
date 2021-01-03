//On crée une constatnte qui vise tous les <li></li>
let lis = document.querySelectorAll('ul > li');
console.log(lis.length)
//On crée une fonction
var goToProd = function () {
    console.log('yes');
}        
for (i=0; i<lis.length; i++) {
//On écoute les événements qui ont lieu = click
lis[i].addEventListener('click', goToProd);
}



