# 📚 Goodreads CSV Importer — plugin Obsidian

Importe votre bibliothèque Goodreads dans Obsidian à partir de l'export CSV officiel : une note par livre, avec frontmatter complet (titre, auteur, notes, dates, étagères, critique…) et couvertures récupérées via Open Library.

Le fichier CSV en question est un fichier unique lié à la personne, via un compte Goodreads

The uploaded files on this git include both the Zip files (containing the JavaScript code and the TypeScript code) as well as the individual files themselves. I'm unsure about the industry practices, but this is my first experience using git.

## ⚠️ Avant tout : qui fait ça ?

Je ne suis **pas développeur**. C'est mon **tout premier projet** de ce genre, réalisé en apprenant sur le tas. Le plugin fonctionne (le code compile et passe une série de tests), mais attendez-vous à des maladresses : le code n'est probablement pas ce qu'un vrai dev aurait écrit.

Du coup :
- 🐛 si vous trouvez un bug, ouvrez une issue, même pour un détail — ça m'aide énormément ;
- 🤝 les pull requests, conseils et critiques sont plus que bienvenus ;
- 📖 soyez indulgents, je découvre encore TypeScript et l'API d'Obsidian.

## 🚀 Installation

Le plugin n'est pas (encore ?) dans la liste des plugins communautaires, donc installation manuelle :

1. Téléchargez les trois fichiers de la dernière release : `main.js`, `manifest.json` et `styles.css`et `srs` (ou le zip `goodreads-csv-importer-plugin.zip` et décompressez-le).
2. Dans votre vault Obsidian, créez le dossier :
   `<votre vault>/.obsidian/plugins/goodreads-csv-importer/`
   *(le dossier `.obsidian` est caché — activez l'affichage des fichiers cachés si besoin)*
3. Placez-y les trois fichiers.
4. Dans Obsidian : **Réglages → Plugins communautaires** → désactivez le mode restreint si demandé → rechargez la liste → activez **Goodreads CSV Importer**.

## 📖 Utilisation

1. Sur Goodreads : **My Books → Tools → Import and export → Export Library** → téléchargez le CSV.
2. Dans Obsidian : cliquez sur l'icône 📖 dans la barre latérale (ou commande *Import Goodreads CSV export*).
3. Sélectionnez le CSV → un aperçu s'affiche → filtrez par étagère si vous voulez → **Importer**.

Les options (dossier de destination, template personnalisé, couvertures, écrasement des notes existantes) sont dans les réglages du plugin.

## 🔮 Il reste beaucoup à faire

C'est un début, pas un produit fini. Dans les cartons :
- [ ] couvertures par titre + auteur quand l'ISBN manque (ebooks Kindle notamment)
- [ ] import incrémental (ne traiter que les nouveaux livres)
- [ ] détection des doublons par identifiant plutôt que par nom de fichier
- [ ] note d'index automatique groupée par étagère
- [ ] traduction de l'interface
- [ ] …et sûrement corriger tout ce que vous allez trouver 🙂

## 🙏 Merci

Merci à tous ceux qui testeront, signaleront des bugs ou proposeront des améliorations. Chaque retour compte pour quelqu'un qui débute.

Licence:  faites-en ce que vous voulez.
