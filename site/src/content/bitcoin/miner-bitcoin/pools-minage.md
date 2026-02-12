---
title: "Pools de minage Bitcoin : fonctionnement, choix et stratégies en 2026"
description: "Comment fonctionnent les pools de minage Bitcoin ? Comparatif des pools, modes de rémunération (FPPS, PPLNS), frais et stratégies pour optimiser vos revenus de minage."
type: guide
branch: minage
parent: miner-bitcoin
order: 3
image: "/images/bitcoin/pools-minage.webp"
readingTime: "12 min"
---

Un mineur solo avec un ASIC dernière génération a aujourd'hui moins de 0,001 % de chances de valider un bloc. Avec 900 millions de TH/s de hashrate global et une difficulté autour de 125 800 milliards début 2026, trouver la solution d'un bloc seul relève de la loterie. C'est pour ça que 99 % des mineurs rejoignent un pool : vous combinez votre puissance avec des milliers d'autres machines, les récompenses sont partagées, et vos revenus deviennent prévisibles.

Ce guide détaille le fonctionnement des pools, les modes de rémunération, les critères de choix et la répartition actuelle du hashrate entre les principaux acteurs du secteur.

## Pourquoi les pools de minage existent

Bitcoin fonctionne sur un principe simple : le premier mineur qui trouve un hash valide pour un bloc empoche 3,125 BTC (récompense post-halving avril 2024) plus les frais de transaction. Ce mécanisme crée une compétition mondiale. Plus le hashrate global monte, plus vos chances individuelles baissent.

Prenons un exemple concret. Un Antminer S21+ affiche 216 TH/s. Le hashrate global tourne autour de 900 millions de TH/s (900 000 000 TH/s). Votre part du réseau : 0,000024 %. Un bloc est trouvé toutes les 10 minutes en moyenne, soit 144 blocs par jour. Vos probabilités de trouver un bloc seul : environ 0,03 bloc par jour. Autrement dit, vous toucheriez une récompense tous les 30 jours en moyenne... si vous avez de la chance. Et pendant ces 30 jours, vous payez l'électricité sans rien gagner.

> [!NOTE]
> Avec un seul ASIC moderne (216 TH/s), un mineur solo a environ 0,03 % de chance de valider un bloc par jour. Les pools divisent ce risque et lissent les revenus quotidiennement.

Les pools résolvent ce problème. Vous mutualisez la puissance. Si le pool contrôle 30 % du hashrate global, il trouve environ 43 blocs par jour. Vous recevez une fraction de ces récompenses proportionnelle à votre contribution. Résultat : un paiement quotidien stable au lieu d'une loterie mensuelle.

## Le fonctionnement technique d'un pool

Un pool de minage ne se contente pas d'additionner les hashs. Il doit coordonner des milliers de machines, mesurer la contribution de chacune et distribuer les récompenses équitablement. Le système repose sur deux mécanismes : les shares (parts) et le protocole Stratum.

### Le système de shares

Quand vous minez dans un pool, vous ne cherchez pas directement le hash du bloc Bitcoin. Le pool vous assigne une tâche plus simple : trouver un hash qui respecte une difficulté réduite. Chaque hash valide que vous soumettez s'appelle une share (part). Le pool comptabilise vos shares pour calculer votre contribution.

Voici le processus détaillé. Le pool définit une difficulté de share bien inférieure à la difficulté Bitcoin réelle. Par exemple, si la difficulté Bitcoin est de 125 000 milliards, le pool peut fixer la difficulté de share à 1 million. Vous envoyez au pool tous les hashs qui battent ce seuil de 1 million. Le pool accumule des millions de shares de tous ses mineurs. Statistiquement, parmi ces millions de shares, certaines battront aussi la vraie difficulté Bitcoin et valideront un bloc.

> [!TIP]
> Les shares permettent au pool de mesurer votre travail sans attendre la validation d'un bloc. Plus vous soumettez de shares valides, plus votre part de récompense augmente.

La difficulté des shares s'adapte à votre hashrate. Un ASIC de 216 TH/s reçoit une difficulté de share plus élevée qu'un modèle de 50 TH/s. Ça évite de surcharger les serveurs du pool avec trop de soumissions. Vous envoyez typiquement entre 10 et 60 shares par minute selon votre machine.

### Le protocole Stratum

Les pools utilisent le protocole Stratum pour communiquer avec vos ASIC. C'est un protocole léger, conçu spécifiquement pour le minage. Votre machine se connecte au serveur du pool (via TCP, port 3333 en général), reçoit le travail en cours, calcule des hashs et renvoie les shares valides. Si le pool trouve un bloc, il broadcast la solution au réseau Bitcoin et prépare le bloc suivant.

Stratum gère aussi la latence. Vous recevez le nouveau bloc à miner quelques millisecondes après sa validation. Cette rapidité compte : chaque seconde perdue sur un ancien bloc, c'est du hashrate gaspillé.

## Les modes de rémunération : FPPS, PPLNS, PPS et Solo

Tous les pools ne paient pas leurs mineurs de la même façon. Le mode de rémunération détermine combien vous gagnez, quand vous le recevez et qui porte le risque de variance.

### FPPS (Full Pay Per Share)

Le FPPS est devenu le standard en 2025-2026. Le pool vous paie un montant fixe pour chaque share valide que vous soumettez, que le pool trouve un bloc ou non. Le calcul intègre la récompense de bloc (3,125 BTC) et les frais de transaction moyens.

Concrètement, le pool estime les revenus théoriques attendus sur une période (par exemple, un bloc trouvé toutes les 3 heures avec 30 % du hashrate) et vous verse votre fraction immédiatement. Si le pool traverse une mauvaise passe et trouve moins de blocs que prévu, c'est lui qui assume la perte. Si au contraire il a de la chance, il garde le surplus.

Avantages : revenus stables et prévisibles, paiements quotidiens, aucune variance. Inconvénients : frais légèrement plus élevés (le pool facture la prise en charge du risque), vous ne profitez pas des pics de frais de transaction.

Les pools AntPool, F2Pool, ViaBTC proposent le FPPS. C'est le choix recommandé si vous avez besoin de revenus réguliers pour couvrir vos factures d'électricité.

### PPLNS (Pay Per Last N Shares)

Le PPLNS paie uniquement quand le pool trouve un bloc. Le calcul se base sur les N dernières shares soumises (par exemple, les 10 millions de shares précédant la validation du bloc). Si vous avez contribué 1000 shares sur ces 10 millions, vous recevez 0,01 % de la récompense du bloc.

Ce mode introduit de la variance. Certains jours, le pool trouve 5 blocs et vous touchez gros. D'autres jours, il ne trouve rien et vous recevez zéro. Sur le long terme (plusieurs semaines), les revenus convergent vers la moyenne, souvent légèrement supérieure au FPPS car les frais du pool sont plus bas.

> [!WARNING]
> Le PPLNS génère une variance importante. Prévoyez une trésorerie pour couvrir vos coûts d'électricité pendant les périodes creuses (plusieurs jours sans paiement possible).

Avantages : frais réduits (1-2 %), vous profitez à 100 % des blocs riches en frais de transaction. Inconvénients : revenus imprévisibles à court terme, risque de plusieurs jours sans paiement.

ViaBTC et quelques pools plus petits offrent le PPLNS. C'est adapté si vous minez à long terme et que vous pouvez absorber la variance.

### PPS (Pay Per Share)

Le PPS classique paie un montant fixe par share, mais ne compte que la récompense de bloc (3,125 BTC). Les frais de transaction sont exclus. C'est l'ancêtre du FPPS. Aujourd'hui, la plupart des pools ont migré vers le FPPS qui offre de meilleurs revenus.

### Solo mining dans un pool

Certains pools (ViaBTC, CKPool) proposent un mode solo. Vous minez comme si vous étiez seul, mais vous utilisez l'infrastructure du pool. Si votre machine trouve le bloc, vous empoche 100 % de la récompense (moins 1-2 % de frais pool). Si elle ne trouve rien pendant des mois, vous gagnez zéro.

C'est un pari. Avec un seul ASIC, vos chances sont infimes. Des mineurs avec des fermes de 50+ machines tentent parfois le solo pour éviter les frais de pool. Pour un particulier, c'est déconseillé.

## Les principaux pools en 2026

Le paysage des pools a évolué depuis le ban chinois de 2021. Foundry USA domine, AntPool reste un géant, et plusieurs acteurs régionaux émergent.

### Foundry USA

Fondé en 2020, Foundry a pris la tête du classement. Il contrôle environ 30 % du hashrate global en février 2026. Basé aux États-Unis, il fournit aussi du financement et du matériel aux mineurs nord-américains. Le mode de paiement est le FPPS avec des frais intégrés (structure de frais non publique, mais estimée autour de 0-1 %). Fondry cible les mineurs institutionnels et les grosses fermes.

### AntPool

AntPool appartient à Bitmain, le fabricant des Antminer. Il représente 18-20 % du hashrate. Le pool propose FPPS et PPLNS, avec des frais variables selon le mode (1 % en FPPS, 0 % en PPLNS mais partage des frais de transaction). Interface en plusieurs langues, serveurs répartis dans le monde entier. AntPool accepte les mineurs de toutes tailles.

### F2Pool

L'un des plus anciens pools (créé en 2013), F2Pool conserve environ 12 % du hashrate. Mode FPPS, frais de 2,5 %. Le pool est connu pour sa transparence et son historique sans incidents majeurs. Interface claire, paiements quotidiens automatiques dès que vous atteignez 0,005 BTC.

### ViaBTC

ViaBTC affiche environ 10 % du hashrate. Le pool propose trois modes : FPPS (4 % de frais), PPLNS (1 % de frais) et Solo (1 % de frais). C'est l'un des rares pools à maintenir une offre PPLNS compétitive. Les mineurs apprécient la flexibilité et les frais transparents.

### Luxor

Luxor cible les mineurs nord-américains et européens avec un focus sur la transparence. Part de hashrate : environ 3 %. Mode FPPS, frais de 1 %. Le pool propose aussi des outils d'analyse avancés (Hashrate Index, statistiques en temps réel, optimisation de revenus). Interface soignée, support réactif.

### Autres acteurs

Binance Pool, Poolin, Braiins Pool, MARA Pool et SBI Crypto complètent le tableau. Chacun contrôle entre 1 et 5 % du hashrate. Certains pools (Braiins) se démarquent par leur soutien au protocole Stratum V2, qui améliore la décentralisation et la sécurité.

> [!IMPORTANT]
> Les cinq premiers pools (Foundry, AntPool, F2Pool, ViaBTC, Luxor) concentrent environ 75 % du hashrate global. Vérifiez la répartition actuelle sur des sites comme BTC.com ou Blockchain.com avant de choisir.

## Comment choisir son pool de minage

Le pool idéal dépend de votre situation : taille de votre opération, tolérance à la variance, priorité aux revenus ou à la décentralisation. Voici les critères qui comptent.

### Frais et mode de paiement

Comparez les frais affichés et le mode de rémunération. Un FPPS à 1 % peut rapporter plus qu'un PPLNS à 0 % si vous ne supportez pas la variance. Calculez vos revenus nets sur plusieurs semaines pour voir la différence réelle.

### Part de hashrate et fréquence de blocs

Un pool avec 30 % du hashrate trouve environ 43 blocs par jour. Vos paiements arrivent toutes les heures. Un pool avec 1 % du hashrate trouve 1,5 bloc par jour. Vous attendez plusieurs heures entre chaque paiement. Plus le pool est gros, plus vos revenus sont lissés.

Mais attention : si les cinq premiers pools contrôlent 75 % du hashrate, on s'éloigne de la décentralisation voulue par Bitcoin. Rejoindre un pool plus petit (Braiins, Luxor) aide à répartir le pouvoir, même si vos revenus auront un peu plus de variance.

### Localisation des serveurs

La latence compte. Si vous minez en Europe et que le pool a des serveurs uniquement en Asie, chaque share met 200-300 ms à arriver. Sur des millions de shares, ce délai réduit votre efficacité. Choisissez un pool avec un serveur proche de votre ferme (Europe, USA, Asie).

### Transparence et réputation

Vérifiez l'historique du pool. A-t-il déjà eu des incidents (piratage, non-paiement, downtime prolongé) ? Les forums comme Bitcointalk et Reddit conservent la mémoire. Lisez les retours d'autres mineurs. Un pool qui cache ses frais ou ne publie pas de statistiques détaillées mérite votre méfiance.

### Seuil de paiement

Les pools fixent un minimum avant de vous verser vos BTC. Typiquement : 0,001 à 0,01 BTC. Si vous minez avec une seule machine, ça peut représenter plusieurs jours ou semaines de travail. Vérifiez que le seuil correspond à votre hashrate. Certains pools offrent des paiements via Lightning Network pour réduire les frais et accélérer les transferts.

## Optimiser ses revenus de pool

Une fois votre pool choisi, quelques réglages peuvent améliorer vos gains.

### Ajuster la difficulté des shares

Certains pools permettent de personnaliser la difficulté des shares (vardiff). Une difficulté trop basse surcharge le serveur avec des millions de shares inutiles. Une difficulté trop haute réduit la précision de mesure de votre contribution. La plupart des pools ajustent automatiquement, mais vous pouvez forcer une valeur si vous avez une raison technique.

### Surveiller les rejected shares

Les shares rejetées (rejected ou stale) ne comptent pas pour vos revenus. Causes fréquentes : latence réseau élevée, ASIC mal configuré, firmware obsolète. Un taux de rejet normal : sous 1 %. Au-dessus de 2 %, cherchez le problème (testez un autre serveur du pool, vérifiez votre connexion internet, mettez à jour le firmware).

### Tester plusieurs pools

Rien ne vous empêche de miner sur deux pools différents avec des machines séparées, ou de basculer d'un pool à l'autre après quelques semaines. Comparez vos revenus nets réels. Les calculateurs en ligne donnent des estimations, mais la vraie rentabilité se mesure sur votre relevé de paiements.

### Profiter des périodes de frais élevés

Quand le réseau Bitcoin est congestionné (bull run, inscriptions Ordinals), les frais de transaction explosent. Un bloc peut rapporter 5 à 10 BTC au lieu de 3,3 BTC. En FPPS, le pool lisse ces pics et vous ne voyez pas de grosse différence. En PPLNS, vous empoche directement ces surplus. Si vous anticipez une phase de congestion, passer temporairement en PPLNS peut booster vos revenus.

## Les risques et limites des pools

Les pools résolvent le problème de variance, mais ils introduisent d'autres risques.

### Centralisation du hashrate

Si trois pools contrôlent 51 % du hashrate, ils pourraient théoriquement censurer des transactions ou réorganiser la blockchain. En pratique, les opérateurs de pools n'ont aucun intérêt à détruire Bitcoin (leur business dépend de sa valeur), mais le risque théorique existe. C'est pour ça que certains mineurs choisissent volontairement des pools plus petits.

### Dépendance à un tiers

Vous confiez votre hashrate au pool. Si le pool ferme du jour au lendemain (ça arrive : Poolin a suspendu les retraits en 2022), vous perdez vos BTC non encore versés. Choisissez des pools établis avec plusieurs années d'opération et retirez régulièrement vos gains.

### Frais cachés

Certains pools affichent "0 % de frais" mais gardent une part des frais de transaction ou appliquent des conditions opaques. Lisez les conditions, vérifiez vos revenus réels contre les calculateurs indépendants (WhatToMine, NiceHash calculator). Si vos gains sont 10-15 % inférieurs aux prévisions sans raison claire, posez des questions au support ou changez de pool.

> [!CAUTION]
> Les pools peuvent suspendre les paiements en cas de difficultés financières (Poolin 2022). Retirez vos BTC dès que vous atteignez le seuil de paiement, ne laissez pas de gros montants accumulés sur votre compte pool.

## Stratum V2 : le futur des pools

Le protocole Stratum d'origine date de 2012. Il a des failles : les pools contrôlent entièrement le contenu des blocs, les mineurs sont de simples exécutants, et le protocole est vulnérable à certaines attaques (man-in-the-middle, hashrate hijacking).

Stratum V2, développé par Braiins et d'autres contributeurs, corrige ces problèmes. Les mineurs peuvent choisir eux-mêmes les transactions à inclure dans un bloc (au lieu de recevoir un bloc tout fait du pool). Le protocole utilise un chiffrement pour sécuriser les communications. Le hashrate est authentifié, ce qui empêche le vol de puissance de calcul.

Début 2026, quelques pools supportent Stratum V2 (Braiins Pool notamment), mais l'adoption reste limitée. La plupart des ASIC tournent encore sur Stratum V1. Le passage à V2 nécessite une mise à jour firmware et une configuration plus technique. À moyen terme, Stratum V2 pourrait redonner du pouvoir aux mineurs et renforcer la décentralisation de Bitcoin.

## Pool vs solo : quand choisir quoi

Pour 99 % des mineurs, le pool est la bonne réponse. Le solo reste une option de niche.

Rejoignez un pool si vous avez moins de 100 ASIC, si vous avez besoin de revenus réguliers pour couvrir vos coûts, si vous débutez dans le minage. Le pool lisse la variance, simplifie la comptabilité (paiements quotidiens au lieu d'une grosse somme tous les six mois) et réduit le stress.

Tentez le solo si vous avez une ferme de 200+ ASIC (hashrate supérieur à 50 PH/s), si vous pouvez tenir plusieurs mois sans revenus, si vous cherchez l'adrénaline du jackpot. Certains mineurs nostalgiques gardent une machine en solo "pour le fun" tout en mettant le reste de leur ferme dans un pool.

Les revenus sur le long terme (un an) convergent. Pool ou solo, vous gagnez statistiquement la même chose (moins les frais de pool). La différence, c'est la régularité : pool = salaire mensuel, solo = loto.

## Conclusion : le pool comme infrastructure critique

Les pools de minage sont devenus l'infrastructure qui fait tourner Bitcoin. Ils coordonnent 900 millions de TH/s répartis sur toute la planète, valident 144 blocs par jour et distribuent environ 450 BTC de récompenses quotidiennes (3,125 BTC x 144 blocs).

Le choix du pool impacte directement votre rentabilité. Un mauvais pool peut vous coûter 10-20 % de revenus à cause de frais élevés, de latence ou de shares rejetées. Un bon pool vous paie rapidement, de façon transparente, avec une infrastructure fiable.

Les critères de décision : mode de rémunération adapté à votre tolérance au risque (FPPS pour la stabilité, PPLNS pour maximiser les gains), frais nets réels (calculez sur plusieurs semaines), localisation des serveurs (latence), réputation du pool (historique de paiements). Et si vous voulez soutenir la décentralisation, évitez les pools qui dépassent 20 % du hashrate global.

Les pools ne vont nulle part. Même en 2140, quand le dernier bitcoin sera miné, les mineurs continueront à se regrouper pour valider les transactions et partager les frais. Le pool est là pour durer.