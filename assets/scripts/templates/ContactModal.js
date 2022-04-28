/**
 * Nom du fichier : assets\scripts\templates\ContactModal.js
 * Fonction :  Afficher le formulaire de contact
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class ContactModal {
  /**
   * @param {object} photographer
  **/

  constructor(photographer) {
    this._photographer = photographer;
    this._patternText = /^[^<>(){}[\]\\,.;:@&%!?§*$£µ~#^+=|"'`_]+$/;
    this._patternEmail = /^(([^<>(){}[\]\\,.;:\s@&%!?§*$£µ~#^+=|"'`]+)(\.[^^<>(){}[\]\\,.;:\s@&%!?§*$£µ~#^+=|"'`]+)*)@(([a-zA-Z\-0-9_]+\.)+[a-zA-Z]{2,})$/;

    this.$wrapper = document.createElement('div');
    this.$wrapper.classList.add('modal-wrapper__contact');
    this.$wrapper.ariaHidden = "true";
    this.$wrapper.role = "dialog";
    this.$modalWrapper = document.querySelector('.modal-wrapper');
    this.$contactMe = document.querySelector('#contact-me');
    this.$main = document.querySelector('#main');
    }

  /* Au clic sur le bouton contactez-moi */
  onContactButton() {
    const that = this;

    this.$contactMe.addEventListener('click', function() {
        that.$modalWrapper.classList.add('modal-contact-on');
        that.$wrapper.style.display = "block";
        that.$main.ariaHidden = "true";
        that.$wrapper.ariaHidden = "false";
        that.$wrapper.querySelector('#contact-me').focus();
      });
  }



   /*** Fonction de contrôle des champs prénom ou nom à la saisie ***/
   ControlNameSeizure = (field, error) => {
    if (field.value != "" || field.value.length >= 3 || field.value.length <= 30) {  //if not empty string or characters are between 3 and 30
      error.style.visibility = "hidden";  
      error.innerHTML = "";
      field.style.border = "";
    }
  }


  /*** Fonction de validation du prénom ou du nom ***/
  validateName = (field, error, event) => {
      const patternTextResult = this._patternText.test(field.value.toString());

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
    const patternTextResult = this._patternText.test(field.value.toString());
  
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
    const patternEmailResult = this._patternEmail.test(String(field.value).toLowerCase());

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
    const patternEmailResult = this._patternEmail.test(String(field.value).toLowerCase());
  
    if (field.value != "" && patternEmailResult == true) {
      field.style.border = "3px solid #00FF00";
    }
  }


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
    if (field.value != "" && field.value.length >= 3) {
      field.style.border = "3px solid #00FF00";
    }
  }


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
    const that = this;


    /*** Contrôle du champ prénom à la saisie ***/
    this.$firstName.addEventListener("input", function() {
      that.ControlNameSeizure(that.$firstName, that.$errorFirstName);
    });

    /*** Contrôle du champ nom à la saisie ***/
    this.$lastName.addEventListener("input", function() {
      that.ControlNameSeizure(that.$lastName, that.$errorLastName);
    });

    /*** Contrôle du champ prénom en sortie du champ ***/
    this.$firstName.addEventListener("blur", function() {
      that.validateNameOnBlur(that.$firstName);
    });

    /*** Contrôle du champ nom en sortie du champ ***/
    this.$lastName.addEventListener("blur", function() {
      that.validateNameOnBlur(that.$lastName);
    });

    
    /*** Contrôle du champ Email à la saisie ***/
    this.$email.addEventListener("input", function() {
      that.ControlSeizure(that.$email, that.$errorEmail);
    });

    /*** Contrôle du champ E-mail en sortie du champ ***/
    this.$email.addEventListener("blur", function() {
      that.validateEmailOnBlur(that.$email);
    });


     /*** Contrôle du champ Message à la saisie ***/
     this.$message.addEventListener("input", function() {
      that.ControlSeizure(that.$message, that.$errorMessage);
    });

    /*** Contrôle du champ Message en sortie du champ ***/
    this.$message.addEventListener("blur", function() {
      that.validateMessageOnBlur(that.$message);
    });

    /*** Contrôle du bouton Envoyer ***/
    this.$wrapper
      .querySelector('#send-btn')
      .addEventListener("click", function(e) { 
      if (that.validateName(that.$firstName, that.$errorFirstName, e) && 
          that.validateName(that.$lastName, that.$errorLastName, e) && 
          that.validateEmail(that.$email, that.$errorEmail, e) && 
          that.validateMessage(that.$message, that.$errorMessage, e)) {
        that.collectData();
        that.clearGreenBorder();
        that.$wrapper.style.display = "none";
        that.$modalWrapper.classList.remove('modal-contact-on');
        that.$contactForm.reset();  //reset the form
        e.preventDefault();   //prevent the modal thanks to close automatically
      }
    });
  }

  /* On the clic on the contact modal */
  onCloseButton() {
    const that = this;

    this.$wrapper
      .querySelector('.close-btn')
      .addEventListener('click', function() {
        that.$wrapper.style.display = "none";
        that.$modalWrapper.classList.remove('modal-contact-on');
        that.$wrapper.ariaHidden = "true";
        that.$main.ariaHidden = "false";
      });

    this.$wrapper
      .querySelector('.close-btn')
      .addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
          that.$wrapper.style.display = "none";
          that.$modalWrapper.classList.remove('modal-contact-on');
          that.$wrapper.ariaHidden = "true";
          that.$main.ariaHidden = "false";
        }
      });

    this.$wrapper
    .addEventListener('keydown', function(e) {
      if (e.key === "Escape") {
        that.$wrapper.style.display = "none";
        that.$modalWrapper.classList.remove('modal-contact-on');
        that.$wrapper.ariaHidden = "true";
        that.$main.ariaHidden = "false";
      }
    });
  }

  
   /* Tab management for the contact modal */
  onTabOutContactModal() {
    const that = this;

    this.$wrapper
      .querySelector('#contact-me')
      .addEventListener('keydown', function(e) {                
        if (e.key === "Tab" && e.shiftKey) {
          e.preventDefault();
          that.$wrapper.querySelector('#send-btn').focus();
        }
      });

    this.$wrapper
    .querySelector('#send-btn')
    .addEventListener('keydown', function(e) {
      if (e.key === "Tab") {
        e.preventDefault();
        that.$wrapper.querySelector('#contact-me').focus();
      }
      
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        that.$wrapper.querySelector('#message').focus();
      }
    });
  }
  


  createFormContact() {
    const formBody = `
      <header>
        <h2 id="contact-me" tabindex="2">Contactez-moi <br>${this._photographer.name}</h2>
        <img tabindex="2" class="close-btn" aria-label="Fermer la fenêtre" src="assets/images/icons/close.svg">
      </header>
      <form name="contact" action="photographer.html" method="get" id="contact-form">
        <div>
          <label for="first">Prénom</label><br>
          <input
            type="text"
            id="first"
            name="first"
            minlength="3"
            maxlength="30"
            autocomplete="given-name"
            aria-required="true"
            aria-describedby="error-fname" 
            placeholder="Entrez votre prénom entre 3 et 30 caractères."
            tabindex="2"
          />
          <span class="error" id="error-fname" role="alert"></span>
        </div>

        <div>
          <label for="last">Nom</label><br>
          <input
            type="text"
            id="last"
            name="last"
            minlength="3"
            maxlength="30"
            autocomplete="family-name"
            aria-required="true"
            aria-describedby="error-lname" 
            placeholder="Entrez votre nom entre 3 et 30 caractères."
            tabindex="2"
          />
          <span class="error" id="error-lname" role="alert"></span>
        </div>

        <div>
          <label for="email">E-mail</label><br>
          <input
            type="email"
            id="email"
            name="email"
            maxlength="80"
            autocomplete="email"
            aria-required="true"
            aria-describedby="error-email" 
            placeholder="Entrez une adresse E-mail valide."
            tabindex="2"
          />
          <span class="error" id="error-email" role="alert"></span>
        </div>

        <div>
          <label for="message">Votre message</label>
          <textarea 
            name="message" 
            id="message" 
            aria-required="true" 
            aria-invalid="true"
            aria-describedby="error-message" 
            placeholder="Écrivez votre message d'au moins 3 caractères." 
            tabindex="2" 
          /></textarea>
          <span class="error" id="error-message" role="alert"></span>
        </div>

        <button
          class="contact-button" 
          id="send-btn"
          value="Envoyer" 
          tabindex="2"
        />Envoyer</button>
      </form>
    `;

    this.$wrapper.innerHTML = formBody;
    this.$modalWrapper.appendChild(this.$wrapper);
    this.onContactButton();
    this.controlData();
    this.onCloseButton();
    this.onTabOutContactModal();
  }

  render() {
      this.createFormContact();
  }
  
}

//export default ContactModal;