const fre: typeof import("./en").default = {
  KEY: {
    CCREG: {
      WELCOME: {
        TITLE:
          "Commencez à utiliser les Services bancaires en ligne et mobiles",
        COPY1:
          "Pour vous faciliter la tâche, veuillez avoir votre carte de crédit de BMO à portée de main.",
        COPY2:
          "Vous devrez entrer les renseignements figurant sur votre carte, créer un mot de passe et établir des questions d’authentification.",
        INFO_TEXT_HEADER: "Avis :",
        INFO_TEXT:
          " Vous avez déjà inscrit votre carte de débit? Pas besoin d’inscrire votre carte de crédit. Vous êtes prêts à ouvrir une session!"
      },
      ACCOUNT_DETAILS: {
        TITLE: "Commençons par quelques renseignements",
        COPY: "Veuillez entrer les renseignements de votre carte de crédit :",
        CARD_NUMBER_TEXT: "Numéro de carte de crédit de BMO",
        EXPIRY_DATE_TEXT: "Date d’expiration",
        CVC_NUMBER_TEXT: "Numéro de validation",
        INFO_TEXT_HEADER: "Rappel :",
        INFO_TEXT:
          " Ce sont les trois chiffres qui figurent à   côté de votre signature au verso de votre carte."
      },
      IDENTIFICATION: {
        TITLE: "Vérifions qu’il s’agit bien de vous",
        COPY:
          "Pour protéger votre compte, nous voulons nous assurer que vous êtes bien la personne qui tape. Veuillez nous fournir quelques renseignements :",
        DATE_OF_BIRTH_TEXT: "Votre date de naissance",
        POSTAL_CODE_TEXT: "Votre code postal",
        EMAIL_TEXT: "Your email address[fr]",
        HOME_PHONE_NUMBER_TEXT: "Votre numéro de téléphone à la maison",
        BUSINESS_PHONE_NUMBER_TEXT: "Votre numéro de téléphone au travail"
      },
      PASSWORD: {
        TITLE: "Créez un mot de passe",
        COPY1: "Choisissez-en un difficile à deviner pour ce compte. Évitez les dates d’anniversaire, votre nom ou votre adresse.",
        COPY2: "Vous ne l’utiliserez que pour les Services bancaires en ligne ou mobiles.",
        COPY3: "Oh, et une dernière chose : N’oubliez pas de le mémoriser!",
        COPY4: "Votre mot de passe doit comporter: ",
        NEW_PASS: "Votre nouveau mot de passe",
        CONFIRM: "Confirmez votre mot de passe",        
        API_ERROR: "API_ERROR_FR",
        VALIDATION: {
          ERROR: {
            NOT_SAME: "Hum! les mots de passe ne correspondent pas. Réessayez.",
            REQUIRED: "Champ obligatoire, mot de passe, votre mot de passe est protégé.",
          },
          RULES: {
            MIN_LENGTH: "au moins huit caractères",
            UPPERCASE_LOWERCASE: "une lettre majuscule et une lettre minuscule",
            ONE_NUMBER: "un chiffre",
            ONE_SPECIAL_CHARACTER: "un caractère spécial",
          }
        }
      },
      CONFIRMATION: {
        "TITLE": "Inscription terminée! Sécurisons maintenant votre compte.",
        "COPY1": "Merci d’avoir pris le temps de vous inscrire. Comme dernière étape, vous devez établir trois questions d’authentification.",
        "COPY2": "Cela augmentera le niveau de sécurité de votre compte et ne prendra que quelques minutes. Ouvrez une session maintenant pour commencer."
      },
      BUTTON: {
        NEXT: "SUIVANT",
        CANCEL: "ANNULER",
        SIGN_IN: "OUVERTURE DE SESSIO"
      },
      STEP: {
        ONE: "Étape 1 de 3",
        TWO: "Étape 2 de 3",
        THREE: "Étape 3 de 3"
      },
      FOOTER: {
        CONTACT_US_TEXT: "Nous joindre",
        PRIVACY_TEXT: "Confidentialité",
        LEGAL_TEXT: "Mentions légales",
        SECURITY_TEXT: "Sécurité",
        CDIC_MEMBER_TEXT: "Information SADC",
        CONTACT_US: "https://www.bmo.com/principal/contactez-nous",
        PRIVACY: "https://www.bmo.com/accueil/a-propos-de-bmo/services-bancaires/confidentialite-securite/notre-code-de-confidentialite",
        LEGAL: "https://www.bmo.com/accueil/popups/global/legal",
        SECURITY: "https://www.bmo.com/accueil/a-propos-de-bmo/services-bancaires/confidentialite-securite/comment-nous-vous-protegeons",
        CDIC_MEMBER: "https://www.bmo.com/accueil/popups/global/sadc",
        CDIC_LINK: "https://www.cdic.ca/SiteAssets/communaute-financiere/protection-de-vos-depots.aspx",
        CDIC_LOGO_TEXT: "Votre protection sadc"
      },
      DATEPICKER: {
        PICKER_MONTH_LABEL: "Mois",
        CLOSE: "Fermer",
        BACK: "Retour",
        NEXT_DECADE: "Décennie suivante",
        PREV_DECADE: "Décennie précédente",
        DECADE_SUFFIX: ""
      }
    }
  }
};
export default fre;
