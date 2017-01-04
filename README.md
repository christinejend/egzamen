# egzamen

> Specs for final RIA test

* * *

**Note:** the school where the course is given, the [HEPL](http://www.provincedeliege.be/hauteecole) from Liège, Belgium, is a french-speaking school. From this point, the instructions will be in french. Sorry.

* * *

## Énoncé de l'examen de RIA

Le présent document contient toutes les informations pour réaliser l'examen pour le cours de RIA de **janvier de l'année scolaire 2016-2017**.

### Contenu

Sur base des données brutes contenues dans le fichier `data/export.json`, vous allez créer une API REST et une petite interface client qui aura pour but de lister les _fast-food_ les plus proches de l'utilisateur, en fonction de sa position géographique.

Votre travail comportera trois parties : votre workflow, votre code serveur (votre API REST), et votre code client (avec VUE.js).

#### Environnement/Workflow

J'attends de vous une machine virtuelle **Vagrant** basée sur la box `leny/etab`. Pour rappel, vous pouvez installer cette box via la commande suivante : 

```
vagrant box add --name leny/etab http://vagrant.flatland.be/etab-2016-11-19.box
```

J'attends également la présence d'un workflow **Grunt** ou **Gulp** contenant les tâches utiles à votre travail (compilation des sources ES2015, import des données JSON dans MongoDB, etc).

#### API REST

Votre API sera bien sûr développée _via_ **node.js** et le serveur **Express**.

À vous de structurer convenablement vos routes et leurs paramètres. Votre API doit me permettre de faire les actions suivantes : 

* lister les fast-food les plus proche à partir d'une position géographique donnée (cette opération ne retournera que les *noms*, *slugs*, *adresses* et *positions* des éléments) 
* consulter les détails d'un fast-food en particulier (cette opération retournera les infos complètes, incluant les *horaires d'ouverture* et un booléen indiquant si le fast-food est *ouvert* au moment de la requête.
* ajouter un nouveau fast-food
* modifier les données (adresse, position, heures d'ouverture) d'un fast-food en particulier
* supprimer un fast-food

#### Code client

En utilisant la librairie **Vue.js** (et les outils de votre choix si vous jugez en avoir besoin), développer une petite _one-page app_ qui affichera : 

* la liste des fast-food les plus proches (uniquement *noms*, *adresses* et *état d'ouverture*)
* les détails d'un fast-food sélectionné (toutes les infos, y compris les *horaires d'ouverture*, dans une présentation *lisible par un humain*)

Le sujet du cours ne porte pas sur le _design_, mais l'ajout de quelques éléments de mise en page sera **fortement apprécié** (même s'il s'agit d'utiliser une librairie comme Bootstrap).

### Modalités

Votre travail devra être accessible sur GitHub pour le **25 janvier 2017**, date de l'examen. Votre repo devra contenir tout ce qu'il me faut pour pouvoir tester votre code (gulp/gruntfile, config vagrant, etc).

N'oubliez pas de **documenter** votre workflow !

Le jour de l'examen, suivant l'horaire établi, vous viendrez chacun me présenter votre travail _fonctionnel_ sur la machine de votre choix (votre ordinateur ou une machine de labo) : nous regarderons ensemble le résultat et je vous poserai l'une ou l'autre question sur des aspects techniques de votre travail.

**Note:** afin de me permettre de tester votre API sur votre machine, n'oubliez pas d'installer [Insomnia](https://insomnia.rest/) ou [Postman](https://www.getpostman.com/) !

* * *

Bon travail.