import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day05: Question[] = [
  q({
    n: 1,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int i = 0;
while (i < 3) {
  System.out.print(i);
  i++;
}`,
    choices: ['012', '123', '0123', 'boucle infinie'],
    correct: 0,
    correctWhy: 'i vaut 0,1,2 puis la condition échoue. Affiche 012.',
    wrongWhy: 'i++ est après l’affichage ; on n’affiche pas 3.',
    javaRule: 'while (condition) : teste avant chaque itération.',
    trap: 'Off-by-one sur la borne.',
  }),
  q({
    n: 2,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int i = 0;
do {
  System.out.print(i);
  i++;
} while (i < 0);`,
    choices: ['0', 'rien', 'boucle infinie', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'do-while exécute le corps au moins une fois, puis teste : i<0 faux → stop. Affiche 0.',
    wrongWhy: 'Ce n’est pas while : le corps tourne même si la condition est initialement fausse.',
    javaRule: 'do { } while (cond); : corps puis test.',
    trap: 'Croire qu’aucune itération n’a lieu si cond est false.',
  }),
  q({
    n: 3,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `for (int i = 0; i < 3; i++) {
  if (i == 1) continue;
  System.out.print(i);
}`,
    choices: ['02', '012', '0', '01'],
    correct: 0,
    correctWhy: 'Quand i==1, continue saute l’affichage et va à i++. Affiche 0 puis 2.',
    wrongWhy: 'continue ne quitte pas la boucle (ce serait break).',
    javaRule: 'continue : passe à l’itération suivante (update du for inclus).',
    trap: 'Confondre continue et break.',
  }),
  q({
    n: 4,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `for (int i = 0; i < 5; i++) {
  if (i == 3) break;
  System.out.print(i);
}`,
    choices: ['012', '0123', '01234', '3'],
    correct: 0,
    correctWhy: 'break quitte la boucle quand i==3, avant l’affichage de 3. Affiche 012.',
    wrongWhy: '3 n’est pas imprimé ; la boucle ne va pas jusqu’à 4.',
    javaRule: 'break sort de la boucle (ou switch) la plus interne.',
    trap: 'Inclure la valeur du test break dans la sortie.',
  }),
  q({
    n: 5,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `outer:
for (int i = 0; i < 3; i++) {
  for (int j = 0; j < 3; j++) {
    if (i == 1 && j == 1) break outer;
    System.out.print(i + "" + j + " ");
  }
}`,
    choices: [
      '00 01 02 10 ',
      '00 01 02 10 11 12 20 21 22 ',
      '00 01 02 10 12 20 21 22 ',
      '00 01 02 ',
    ],
    correct: 0,
    correctWhy: 'break outer quitte les deux boucles dès i==1,j==1, après avoir imprimé 00 01 02 10.',
    wrongWhy: 'Un break sans label ne sortirait que de la boucle j.',
    javaRule: 'labeled break quitte le statement étiqueté (ici la boucle outer).',
    trap: 'Oublier le label et calculer une sortie partielle de la boucle interne seulement.',
  }),
  q({
    n: 6,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `outer:
for (int i = 0; i < 3; i++) {
  for (int j = 0; j < 3; j++) {
    if (j == 1) continue outer;
    System.out.print(i + "" + j + " ");
  }
}`,
    choices: [
      '00 10 20 ',
      '00 02 10 12 20 22 ',
      '00 01 02 10 11 12 20 21 22 ',
      '00 ',
    ],
    correct: 0,
    correctWhy: 'Quand j==1, continue outer saute le reste de la boucle i (donc j=2) et passe à i++. Seuls 00, 10, 20 s’affichent.',
    wrongWhy: 'continue outer n’est pas un continue sur j seulement.',
    javaRule: 'labeled continue reprend l’itération suivante du statement étiqueté.',
    trap: 'Traiter continue outer comme continue simple.',
  }),
  q({
    n: 7,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int[] a = {1, 2, 3};
for (int n : a) {
  n = n * 10;
}
System.out.println(a[0] + " " + a[1] + " " + a[2]);`,
    choices: ['1 2 3', '10 20 30', '0 0 0', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Dans for-each, n est une copie de la valeur (primitif) ; l’affecter ne modifie pas le tableau.',
    wrongWhy: 'Réassigner la variable de boucle ne réécrit pas a[i].',
    javaRule: 'enhanced for : la variable est une copie (valeur ou référence). Pour primitifs, mutation impossible via n=...',
    trap: 'Croire que n = ... met à jour le tableau.',
  }),
  q({
    n: 8,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `String[] a = {"x", "y"};
for (String s : a) {
  s = s.toUpperCase();
}
System.out.println(a[0] + a[1]);`,
    choices: ['xy', 'XY', 'xY', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 's référence chaque élément, mais s = ... rebind la variable locale, pas a[i]. Le tableau reste "x","y".',
    wrongWhy: 'Pour modifier le tableau : a[i] = ... dans un for indexé.',
    javaRule: 'for-each ne fournit pas d’index ; réassigner la variable ne remplace pas l’élément.',
    trap: 'Même piège que pour les primitifs, avec des références.',
  }),
  q({
    n: 9,
    day: 5,
    topic: 'control-flow',
    stem: 'Que se passe-t-il ?',
    code: `for (int i = 0; i < 10; i++)
  System.out.print(i);
  System.out.print("X");`,
    choices: [
      '0123456789X',
      '0123456789',
      'X dix fois',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Sans {}, seul le premier print est dans le for. Ensuite "X" s’affiche une fois.',
    wrongWhy: 'L’indentation n’ajoute pas "X" dans la boucle.',
    javaRule: 'Comme if, for/while sans {} n’englobent qu’une instruction.',
    trap: 'Lire l’indentation comme des accolades.',
  }),
  q({
    n: 10,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int i = 0;
for ( ; i < 3; ) {
  System.out.print(i++);
}`,
    choices: ['012', '123', 'Erreur : for invalide', 'boucle infinie'],
    correct: 0,
    correctWhy: 'Init et update du for peuvent être omis. Affiche 0,1,2 via i++ post-incrément.',
    wrongWhy: 'La syntaxe for ( ; cond; ) est légale.',
    javaRule: 'for (init; condition; update) — chaque partie est optionnelle.',
    trap: 'Croire que les trois clauses sont obligatoires.',
  }),
  q({
    n: 11,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int sum = 0;
for (int i = 1, j = 10; i < 3; i++, j--) {
  sum += i + j;
}
System.out.println(sum);`,
    choices: ['22', '11', '33', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'i=1,j=10 → +11 ; i=2,j=9 → +11 ; somme 22. Puis i=3 stop.',
    wrongWhy: 'Plusieurs variables dans init/update sont autorisées (même type dans init).',
    javaRule: 'for peut déclarer plusieurs variables du même type : int i=1, j=10.',
    trap: 'Mal suivre les deux compteurs simultanés.',
  }),
  q({
    n: 12,
    day: 5,
    topic: 'control-flow',
    stem: 'Que se passe-t-il ?',
    code: `for (int i = 0; i < 5; i++) {
  System.out.print(i);
}
System.out.print(i);`,
    choices: [
      'Erreur de compilation (i hors scope)',
      '012345',
      '01234 5',
      '01234 4',
    ],
    correct: 0,
    correctWhy: 'i déclaré dans le for n’existe que dans le scope de la boucle.',
    wrongWhy: 'Ce n’est pas accessible après le for.',
    javaRule: 'La portée d’une variable déclarée dans for (init) est le for entier.',
    trap: 'Réutiliser i après la boucle sans le déclarer avant.',
  }),
  q({
    n: 13,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int i = 0;
for (i = 0; i < 3; i++) { }
System.out.println(i);`,
    choices: ['3', '2', '0', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Après la dernière itération réussie (i=2), i++ fait i=3 ; le test échoue. i vaut 3.',
    wrongWhy: 'La variable déclarée hors du for reste visible et conserve la valeur post-boucle.',
    javaRule: 'En sortie normale d’un for, la variable de contrôle a souvent dépassé la borne.',
    trap: 'Attendre i==2 après la boucle.',
  }),
  q({
    n: 14,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int x = 0;
while (true) {
  if (x >= 2) break;
  System.out.print(x);
  x++;
}
System.out.print(":" + x);`,
    choices: ['01:2', '012:3', '01:1', 'boucle infinie'],
    correct: 0,
    correctWhy: 'Affiche 0,1 puis break quand x>=2. x vaut 2 → "01:2".',
    wrongWhy: 'break termine while(true) ; pas d’infini ici.',
    javaRule: 'while(true) + break est un motif courant de boucle contrôlée.',
    trap: 'Oublier d’incrémenter et provoquer une vraie boucle infinie (non le cas ici).',
  }),
  q({
    n: 15,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `stop: {
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (i * j > 1) break stop;
      System.out.print(i + "" + j + " ");
    }
  }
  System.out.print("end");
}
System.out.print(" after");`,
    choices: [
      '00 01 02 10 11 12 20  after',
      '00 01 02 10 11 12 20 21 22 end after',
      '00 01 02 10 11 12 20 end after',
      'Erreur : label sur bloc interdit',
    ],
    correct: 0,
    correctWhy: 'Quand i=2,j=1 : 2*1>1 → break stop quitte le bloc labeled, donc saute "end". Puis " after".',
    wrongWhy: 'Les labels peuvent porter sur des blocs, pas seulement des boucles. break stop ne va pas à end.',
    javaRule: 'labeled break quitte le statement nommé (boucle ou bloc).',
    trap: 'Croire que break stop se comporte comme break simple ou goto vers le label.',
  }),
  q({
    n: 16,
    day: 5,
    topic: 'control-flow',
    stem: 'Lequel est vrai ?',
    choices: [
      'continue ne peut pas cibler un label de simple bloc {} (non boucle/switch)',
      'break ne peut jamais cibler un label de bloc {}',
      'goto existe en Java et est recommandé',
      'Les labels sont obligatoires sur tout for imbriqué',
    ],
    correct: 0,
    correctWhy: 'continue label exige que le statement étiqueté soit une boucle. break label peut quitter un bloc quelconque.',
    wrongWhy: 'goto est un mot réservé inutilisé. Labels optionnels.',
    javaRule: 'break label : tout statement. continue label : uniquement loop statements.',
    trap: 'Utiliser continue sur un label de bloc non-boucle.',
  }),
  q({
    n: 17,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `List<String> list = new ArrayList<>(List.of("a", "b", "c"));
for (String s : list) {
  if (s.equals("b")) list.remove(s);
}
System.out.println(list);`,
    choices: [
      'ConcurrentModificationException (fail-fast)',
      '[a, c]',
      '[a, b, c]',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Modifier une collection pendant un for-each (iterator fail-fast) → ConcurrentModificationException.',
    wrongWhy: 'Il faut Iterator.remove() ou removeIf, pas list.remove dans le for-each.',
    javaRule: 'Les itérateurs fail-fast détectent les modifications structurelles concurrentes (même thread).',
    trap: 'Supprimer dans un enhanced for sur ArrayList.',
  }),
  q({
    n: 18,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int n = 0;
for (int i = 0; i < 4; i++) {
  switch (i) {
    case 0:
    case 1: n++; break;
    case 2: n += 10; break;
    default: n += 100;
  }
}
System.out.println(n);`,
    choices: ['112', '12', '111', '102'],
    correct: 0,
    correctWhy: 'i=0 et 1 : n++ → n=2 ; i=2 : +10 → 12 ; i=3 default +100 → 112.',
    wrongWhy: 'case 0 fall-through vers case 1 mais break après n++ une seule fois par i.',
    javaRule: 'switch dans une boucle : break sort du switch, pas de la boucle.',
    trap: 'Croire que break quitte aussi le for.',
  }),
  q({
    n: 19,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int i = 5;
while (i --> 0) {
  System.out.print(i);
}`,
    choices: ['43210', '54321', '543210', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'i-->0 se parse en (i--) > 0. Chaque test utilise la valeur puis décrémente : 5>0 (i→4) affiche 4 ; … ; 1>0 (i→0) affiche 0 ; puis 0>0 stop. Sortie : 43210.',
    wrongWhy: 'Ce n’est pas un opérateur --> ; c’est i-- et >.',
    javaRule: 'Le lexer décompose --> en -- et >.',
    trap: 'Croire à un opérateur « goes to » magique sans analyser i--.',
  }),
  q({
    n: 20,
    day: 5,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int count = 0;
for (int i = 0; i < 3; i++) {
  inner:
  for (int j = 0; j < 3; j++) {
    if (j == 1) continue inner;
    count++;
  }
}
System.out.println(count);`,
    choices: ['6', '9', '3', '0'],
    correct: 0,
    correctWhy: 'Pour chaque i, j=0 et j=2 incrémentent count (j==1 continue). 3 * 2 = 6.',
    wrongWhy: 'continue inner saute seulement j==1, pas toute la boucle i.',
    javaRule: 'continue label sur la boucle interne = continue simple ici (même effet).',
    trap: 'Compter 9 en ignorant le continue, ou 3 en pensant quitter trop tôt.',
  }),
]
