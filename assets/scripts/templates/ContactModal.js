/**
 * Nom du fichier : assets\scripts\templates\ContactModal.js
 * Fonction :  Afficher le formulaire de contact
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class ContactModal {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.classList.add('modal-wrapper__contact');
    this.$modalWrapper = document.querySelector('.modal-wrapper');
    this.$contactMe = document.querySelector('#contact-me');
    
    this.patternText = /^[^<>(){}[\]\\,.;:@&%!?§*$£µ~#^+=|"'`_]+$/;
    this.patternEmail = /^(([^<>(){}[\]\\,.;:\s@&%!?§*$£µ~#^+=|"'`]+)(\.[^^<>(){}[\]\\,.;:\s@&%!?§*$£µ~#^+=|"'`]+)*)@(([a-zA-Z\-0-9_]+\.)+[a-zA-Z]{2,})$/;

  }

  /* Au clic sur le bouton contactez-moi */
  onContactButton() {
    this.$contactMe.addEventListener('click', () => {
        this.$modalWrapper.classList.add('modal-contact-on');
      });
  }



   /*** Fonction de contrôle des champs prénom ou nom à la saisie ***/
   ControlNameSeizure = (field, error) => {
    if (field.value != "" || field.value.length >= 3 || field.value.length <= 30) {  //if empty string or characters are between 3 and 30
      error.style.visibility = "hidden";  
      error.innerHTML = "";
      field.style.border = "";
    }
  }


  /*** Fonction de validation du prénom ou du nom ***/
  validateName = (field, error, event) => {
      const patternTextResult = this.patternText.test(field.value.toString());

    if (field.value == "" || field.value.length < 3 || field.value.length > 30) { //if empty string or characters are not between 3 and 30
      error.style.visibility = "visible";  
      error.innerHTML = "Veuillez saisir entre 3 et 30 caractères.";
      field.style.border = "3px solid #901C1C";
      field.focus();
      event.preventDefault();  // prevents the modal form closure 
      return false;  // prevents the form validation at the level of this field & stops the propagation of the error messages
    } else if (patternTextResult == false) {  //if the user types a wrong character
      error.style.visibility = "visible";  
      error.innerHTML = "Seuls les caractères alphanumériques, les traits d'union et les espaces sont autorisés.";
      field.style.border = "3px solid #901C1C";
      field.focus();
      event.preventDefault();  // prevents the modal form closure 
      return false;  //prevents the form validation at the level of this field & stops the propagation of the error messages
    } else {
      error.style.visibility = "hidden";  
      error.innerHTML = "";   //cancels error message
      field.style.border = "3px solid #00FF00";
    }
    return true;  //allows to control each field of the form
  }


  /*** Fonction de contrôle du prénom ou du nom en sortie du champ respectif ***/
  validateNameOnBlur = (field) => {
    const patternTextResult = this.patternText.test(field.value.toString());
  
    if (field.value != "" && field.value.length >= 3 && field.value.length <= 30 && patternTextResult == true) {
      field.style.border = "3px solid #00FF00";
    }
  }


  /*** Fonction de contrôle à la saisie des champs E-mail et Message ***/
  ControlSeizure = (field, error) => {
    if (!(field.value == "")) {  //if not empty string 
      error.style.visibility = "hidden";  
      error.innerHTML = ""; 
      field.style.border = "";
    }
  }


  /*** Fonction de validation du champ Email ***/
  validateEmail = (field, error, event) => {
    const patternEmailResult = this.patternEmail.test(String(field.value).toLowerCase());

    if (field.value == "" || patternEmailResult == false) { 
      error.style.visibility = "visible";  
      error.innerHTML = "Veuillez entrer une adresse email valide.";
      field.style.border = "3px solid #901C1C";
      field.focus();
      event.preventDefault();
      return false;
    } else {
      error.style.visibility = "hidden";  
      error.innerHTML = "";   //cancels error message
      field.style.border = "3px solid #00FF00";
    }
    return true;
  }


  /*** Fonction de contrôle de l'email en sortie du champ ***/
  validateEmailOnBlur = (field) => {
    const patternEmailResult = this.patternEmail.test(String(field.value).toLowerCase());
  
    if (field.value != "" && patternEmailResult == true) {
      field.style.border = "3px solid #00FF00";
    }
  }



  /**********************************DEBUT*****************************************************/

  /*** Fonction de validation du champ Message ***/
  validateMessage = (field, error, event) => {
      if (field.value == "" || field.value.length < 3) { 
      error.style.visibility = "visible";  
      error.innerHTML = "Veuillez saisir un message d'au moins 3 caractères.";
      field.style.border = "3px solid #901C1C";
      field.focus();
      event.preventDefault();
      return false;
    } else {
      error.style.visibility = "hidden";  
      error.innerHTML = "";   //cancels error message
      field.style.border = "3px solid #00FF00";
    }
    return true;
  }


  /*** Fonction de contrôle du message en sortie du champ ***/
  validateMessageOnBlur = (field) => {
    if (field.value != "") {
      field.style.border = "3px solid #00FF00";
    }
  }


  /****************************************FIN***********************************************/

  /*** Enlève les bordures vertes des champs ***/
  clearGreenBorder = () => {
    this.$firstName.style.border = "";
    this.$lastName.style.border = "";
    this.$email.style.border = "";
    this.$message.style.border = "";
  }


  /*** Test de récupération des données ***/
  collectData = () => {
    const prenom = this.$firstName.value;
    const nom = this.$lastName.value;
    const adrEmail = this.$email.value;
    const message = this.$message.value;
     
    console.log("Prénom: "+prenom);
    console.log("Nom: "+nom);
    console.log("E-mail: "+adrEmail);
    console.log("Message: "+message);
  }

  /* Contrôle des données sasies */
  controlData() {
    this.$contactForm = this.$wrapper.querySelector('#contact-form');
    this.$firstName = this.$wrapper.querySelector("#first");
    this.$lastName = this.$wrapper.querySelector("#last");
    this.$email = this.$wrapper.querySelector("#email");
    this.$message = this.$wrapper.querySelector("#message");
    this.$errorFirstName = this.$wrapper.querySelector("#error-fname");
    this.$errorLastName = this.$wrapper.querySelector("#error-lname");
    this.$errorEmail = this.$wrapper.querySelector("#error-email");
    this.$errorMessage = this.$wrapper.querySelector("#error-message");

    
    /*** Contrôle du champ prénom à la saisie ***/
    this.$firstName.addEventListener("input", () => {
      this.ControlNameSeizure(this.$firstName, this.$errorFirstName);
    });

    /*** Contrôle du champ nom à la saisie ***/
    this.$lastName.addEventListener("input", () => {
      this.ControlNameSeizure(this.$lastName, this.$errorLastName);
    });

    /*** Contrôle du champ prénom en sortie du champ ***/
    this.$firstName.addEventListener("blur", () => {
      this.validateNameOnBlur(this.$firstName);
    });

    /*** Contrôle du champ nom en sortie du champ ***/
    this.$lastName.addEventListener("blur", () => {
      this.validateNameOnBlur(this.$lastName);
    });

    
    /*** Contrôle du champ Email à la saisie ***/
    this.$email.addEventListener("input", () => {
      this.ControlSeizure(this.$email, this.$errorEmail);
    });

    /*** Contrôle du champ E-mail en sortie du champ ***/
    this.$email.addEventListener("blur", () => {
      this.validateEmailOnBlur(this.$email);
    });


     /*** Contrôle du champ Message à la saisie ***/
     this.$message.addEventListener("input", () => {
      this.ControlSeizure(this.$message, this.$errorMessage);
    });

    /*** Contrôle du champ Message en sortie du champ ***/
    this.$message.addEventListener("blur", () => {
      this.validateMessageOnBlur(this.$message);
    });

    /*** Contrôle du bouton Envoyer ***/
    this.$wrapper
      .querySelector('#send-form')
      .addEventListener("click", (e) => { 
      if (this.validateName(this.$firstName, this.$errorFirstName, e) && 
          this.validateName(this.$lastName, this.$errorLastName, e) && 
          this.validateEmail(this.$email, this.$errorEmail, e) && 
          this.validateMessage(this.$message, this.$errorMessage, e)) {
        this.collectData();
        this.clearGreenBorder();
        this.$modalWrapper.classList.remove('modal-contact-on');
        this.$contactForm.reset();  //reset the form
        e.preventDefault();   //prevent the modal thanks to close automatically
      }

    });

  }

  /* On the clic on the contact modal */
  onCloseButton() {
    this.$wrapper
      .querySelector('.close-btn')
      .addEventListener('click', () => {
        this.$modalWrapper.classList.remove('modal-contact-on');
      });
  }



  createFormContact() {
    const formBody = `
      <header>
      <h2>Contactez-moi</h2>
      <img class="close-btn" src="assets/images/icons/close.svg">
      </header>
      <form name="contact" action="photographer.html" method="get" id="contact-form">
        <div>
          <label for="first">Prénom</label><br>
          <input
            type="text"
            id="first"
            name="first"
            minlength="2"
            maxlength="30"
            placeholder="Entrez votre prénom entre 3 et 30 caractères"  
          />
          <span class="error" id="error-fname"></span>
        </div>

        <div>
          <label for="last">Nom</label><br>
          <input
            type="text"
            id="last"
            name="last"
            minlength="2"
            maxlength="30"
            placeholder="Entrez votre nom entre 3 et 30 caractères"
          />
          <span class="error" id="error-lname"></span>
        </div>

        <div>
          <label for="email">E-mail</label><br>
          <input
            type="email"
            id="email"
            name="email"
            maxlength="80"
            placeholder="Entrez une adresse E-mail valide"
          />
          <span class="error" id="error-email"></span>
        </div>

        <div>
          <label for="message">Votre message</label>
          <textarea name="message" id="message"></textarea>
          <span class="error" id="error-message"></span>
        </div>

        <input 
          type="submit" 
          class="contact-button" 
          id="send-form" 
          value="Envoyer"
        />
      </form>
    `;

    this.$wrapper.innerHTML = formBody;
    this.$modalWrapper.appendChild(this.$wrapper);

    this.onContactButton();
    this.controlData();
    this.onCloseButton();

  }

  render() {
      this.createFormContact();
  }
  

}