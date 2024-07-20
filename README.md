# Projet chat

## Objectif du projet

L'objectif du projet est de créer un service de chat en ligne. L'application est décomposée en deux parties :
- Un projet Spring : Cette partie implémente l'interface d'administration afin de pouvoir administrer les utilisateurs de l'application.
- Un projet React : Cette partie correspond à l'interface de chat : elle est la même pour les utilisateurs et les administrateurs. C'est ici qu'on choisit un chat et où l'on discute avec les autres utilisateurs du chat.

**Ici, on s'intéressera uniquement à la partie React du projet**

## Fonctionnement

- Pour lancer le projet, il faut **IMPERATIVEMENT** se connecter en VPN au réseau de l'UTC, sinon le serveur plantera car il n'arrivera pas à se connecter à la base de données.
- Dans Webstorm, on lance la commande `npm install` pour installer les dépendances nécessaires.
- Dans un second temps, on lance `npm audit fix --force` afin que l'application puisse se lancer.
  - _Note : il est parfois nécessaire de lancer plusieurs fois la commande d'affilée. Généralement, il faut s'arrêter lorsqu'on a plus que "8 vulnerabilities"._
- La dernière étape est de lancer l'application avec `npm start`.
- Une fois cela fait, il faut ouvrir un navigateur et aller à l'URL suivante :
  - _http://localhost:3000/_
- Une fois sur l'URL : on peut se connecter avec le compte suivant :
  - **User** : _john.smith@example.com_
  - **Mot de passe** : _Password1_
- Dans un autre navigateur, on peut se connecter avec le compte suivant :
  - **User** : _michael.johnson@example.com_
  - **Mot de passe** : _mdp1_
- On pourra ensuite tester le fonctionnement de la communication via le chat N°12 qui comporte ces deux utilisateurs.

## Architecture de l'interface d'administration

L'architecture est de type One Single Page, qui communique via API REST avec le serveur.

## Sécurité

Pour cette partie, on a implémenté l'authentification via JWToken. Lorsqu'on s'identifie, une requête est réalisée côté serveur. Si les identifiants sont corrects, un jeton est alors envoyé au client dans l'entête HTTP de réponse. Celui-ci sera ajouté automatiquement au navigateur du client pour que, par la suite, à chaque fois que celui-ci fait une requête, il soit envoyé au serveur dans l'entête HTTP.  
Les seules pages accessibles sans jeton sont la page d'authentification et la page de connexion. Pour les autres pages, il est nécessaire de posséder un jeton.
