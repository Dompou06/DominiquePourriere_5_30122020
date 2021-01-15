//A la fin du chargement de la page
window.onload = () => {  
    const buttonOrdered = document.getElementById('commander');
    //Si le bouton Commander est cliqué
    buttonOrdered.addEventListener('click', ordered, true);
    //On lance la fonction ordered
    function ordered() {
        const inputs = document.getElementsByTagName('input');
        //On crée une variable boléenne de valeur true pour les iputs remplis
        let valid = true;
        for (let numberOfInputs = 0; numberOfInputs < inputs.length; numberOfInputs++) {
            //Si certains champs input sont vides et donc ne sont pas conformes à required,
            //la méthode reportValidity() n'est pas true
            if (!inputs[numberOfInputs].reportValidity()) {
                //La variable est équivalent à false, cela déclenche l'alerte required en page html
                valid = false;
            }
        }
        //Si aucun champ input n'est vide
        if (valid) {            
            //On récupère la valeur des input
            let mailValue = document.getElementById('email').value;
            let firstnameValue = document.getElementById('nom').value;
            let lastnameValue = document.getElementById('prenom').value;
            let adressValue = document.getElementById('adresse').value;
            let cityValue = document.getElementById('ville').value;
            //On vérifie si les données dans les inputs correspondent aux expressions régulières voulues
            //input qui commence par une lettre (^), peut avoir un tiret(\-), doit contenir au moins plusieurs lettres (+) et en majuscule ou minuscule(i), 
            let regexLetters = /^[A-Za-z\-]+/i;
            //Tout caractère alphanumérique (\w)
            let regexAdress = /^[\w]+/i;
            let regexCity = /^[A-Za-z\-\/]+/i;
            let regexEmail = /^[\w\.]+@[a-z]+\.{1}[a-z]{2,3}/i;
            //Fonction vérifiant le input nom (lettres ou tiret)
                const promiseFirstname = function regexValidInnputLetters() {
                    return new Promise((resolve, reject) => {
                      if (firstnameValue.match(regexLetters)) {
                        resolve(firstnameValue);
                      } else {
                        reject('Le champ Nom doit commencer par une lettre');
                      }
                    });
                  };
                  const promiseLastname = function regexValidInnputLetters() {
                      return new Promise((resolve, reject) => {
                        if (lastnameValue.match(regexLetters)) {
                          resolve(firstnameValue);
                        } else {
                          reject('Le champ Prénom doit commencer par une lettre');
                        }
                      });
                    };
                  //Fonction vérifiant l'input adresse (alphanumérique)
                  const promiseAdress = function regexValidInnputAdress() {
                      return new Promise((resolve, reject) => {
                        if (adressValue.match(regexAdress)) {
                          resolve(adressValue);
                        } else {
                          reject('Le champ Adresse doit commencer par une lettre ou un chiffre');
                        }
                      });
                    };
                    //Fonction vérifiant l'input Ville (alphanumérique)
                    const promiseCity = function regexValidInnputCity() {
                        return new Promise((resolve, reject) => {
                          if (cityValue.match(regexCity)) {
                            resolve(cityValue);
                          } else {
                            reject('Le champ Ville doit commencer par une lettre');
                          }
                        });
                      };
                  const promiseEmail = function regexValidInputEmail() {
                      return new Promise((resolve, reject) => {
                        // réussir une fois sur deux
                        if (mailValue.match(regexEmail)) {
                          resolve(mailValue);
                        } else {
                          reject('L\'email n\'est pas valide');
                        }
                      });
                    };
                    promiseFirstname()
                    //On récupère les données des inputs nom, prénom et on lance la promise Adresse
                    .then(resultFirstname => promiseLastname(resultFirstname))
                    .then(resultLastname => promiseAdress(resultLastname))
                    .then(resultAdress => promiseCity(resultAdress))
                    .then(resultCity => promiseEmail(resultCity))
                    .then(resultEmail => {
                      const order = {
                        //Soit les données des inputs sous forme d'objet
                            contact:{
                                firstName: firstnameValue,
                                lastName: lastnameValue,
                                address: adressValue,
                                city: cityValue,
                                email: resultEmail
                            },
                            //Et le contenu du localstorage (value dans key cart) sous forme de tableau
                            // eslint-disable-next-line no-undef
                            products: init()
                        };
                        const urlPostMongo = 'http://localhost:3000/api/cameras/order';
                        //console.log(order);
                        //On appelle la promise de connexion.js
                        //On envoie en method POST en JSON l'objet order et on indique le conten-Type (JSON) 
                       callToMongoDB('POST', urlPostMongo, JSON.stringify(order), 'application/json')
                       .then((reponse) => {
                        //On lit la réponse de BD Mongo
                        let idReference = JSON.parse(reponse);
                        //console.log(donneesPost.orderId);
                        //On charge la page commande.html en lui mettant en paramètre la reponse de l'order_id de MongoDB
                        window.location.assign(`/commande.html?orderId=${idReference.orderId}`);
                    });                     
                    })
                   .catch(reject => {
                       alert(reject);
                    })
        }
    }
};

