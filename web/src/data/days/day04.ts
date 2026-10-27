import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day04: Question[] = [
  q({
    n: 1,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int x = 3;
if (x = 3) {
  System.out.println("yes");
} else {
  System.out.println("no");
}`,
    choices: [
      'Erreur de compilation',
      'yes',
      'no',
      'Exception à l’exécution',
    ],
    correct: 0,
    correctWhy: 'x = 3 est une affectation de type int ; la condition d’un if exige boolean. Donc ne compile pas.',
    wrongWhy: 'Contrairement au C, Java n’accepte pas un int comme condition.',
    javaRule: 'if/while/for exigent une expression boolean (ou Boolean avec unboxing).',
    trap: 'Écrire if (x = 3) par habitude C/C++.',
  }),
  q({
    n: 2,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int x = 5;
if (x < 10)
  System.out.println("A");
  System.out.println("B");
else
  System.out.println("C");`,
    choices: [
      'Erreur de compilation (else orphelin)',
      'A puis B',
      'A',
      'C',
    ],
    correct: 0,
    correctWhy: 'Sans accolades, seul le premier println appartient au if. Le second println casse la structure ; else n’a plus d’if associé → erreur.',
    wrongWhy: 'Ce n’est pas « A puis B » à l’exécution : le code ne compile pas.',
    javaRule: 'if/else sans {} ne lie qu’une seule instruction. else doit immédiatement suivre ce if.',
    trap: 'Indenter deux instructions sous un if sans {}.',
  }),
  q({
    n: 3,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int day = 2;
switch (day) {
  case 1: System.out.print("Mon");
  case 2: System.out.print("Tue");
  case 3: System.out.print("Wed"); break;
  default: System.out.print("Other");
}`,
    choices: ['TueWed', 'Tue', 'MonTueWed', 'Other'],
    correct: 0,
    correctWhy: 'case 2 matche, pas de break → fall-through vers case 3 qui imprime Wed puis break.',
    wrongWhy: 'Sans break, l’exécution continue dans les case suivants.',
    javaRule: 'switch classique à : : fall-through jusqu’à break/return/fin.',
    trap: 'Oublier le break et n’attendre que "Tue".',
  }),
  q({
    n: 4,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int day = 2;
String s = switch (day) {
  case 1 -> "Mon";
  case 2 -> "Tue";
  case 3 -> "Wed";
  default -> "Other";
};
System.out.println(s);`,
    choices: ['Tue', 'TueWed', 'Erreur de compilation', 'Other'],
    correct: 0,
    correctWhy: 'Les switch labels en -> n’ont pas de fall-through. case 2 → "Tue".',
    wrongWhy: 'Contrairement au switch à :, la flèche n’enchaîne pas les case.',
    javaRule: 'switch expression / arrow labels : pas de fall-through.',
    trap: 'Appliquer mentalement le fall-through aux flèches.',
  }),
  q({
    n: 5,
    day: 4,
    topic: 'control-flow',
    stem: 'Que se passe-t-il ?',
    code: `int n = 1;
String s = switch (n) {
  case 1 -> {
    System.out.println("one");
    "uno";
  }
  default -> "other";
};`,
    choices: [
      'Erreur de compilation (il faut yield)',
      'Affiche one et s = "uno"',
      's = "uno" sans afficher',
      'Erreur à l’exécution',
    ],
    correct: 0,
    correctWhy: 'Dans un bloc { } d’une switch expression, la valeur se produit avec yield, pas une expression « nue » ni return.',
    wrongWhy: 'return est interdit ici pour produire la valeur du switch ; "uno"; seul n’est pas un yield.',
    javaRule: 'yield valeur; dans un bloc de switch expression. return quitterait la méthode englobante.',
    trap: 'Écrire return ou une expression isolée au lieu de yield.',
  }),
  q({
    n: 6,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int n = 2;
int r = switch (n) {
  case 1, 2, 3 -> n * 10;
  default -> 0;
};
System.out.println(r);`,
    choices: ['20', '0', '2', 'Erreur : multi-case illégal'],
    correct: 0,
    correctWhy: 'case 1, 2, 3 regroupe les valeurs ; n=2 → 20.',
    wrongWhy: 'Les virgules dans un case arrow sont légales (Java 14+).',
    javaRule: 'Plusieurs constantes peuvent partager un même case (virgules).',
    trap: 'Croire qu’il faut encore case 1: case 2: case 3: pour regrouper.',
  }),
  q({
    n: 7,
    day: 4,
    topic: 'control-flow',
    stem: 'Lequel compile ?',
    code: `byte b = 1;`,
    choices: [
      'switch (b) { case 1 -> System.out.print(1); case 128 -> System.out.print(2); }',
      'switch (b) { case 1 -> System.out.print(1); case 2 -> System.out.print(2); }',
      'switch (b) { case "1" -> System.out.print(1); default -> {} }',
      'switch (b) { case null -> System.out.print(0); default -> {} }',
    ],
    correct: 1,
    correctWhy: 'Les case doivent être assignables au type du sélecteur. 128 n’entre pas dans byte. String/null ne matchent pas byte.',
    wrongWhy: 'case 128 est hors plage byte → erreur de compilation. null concerne les sélecteurs référence.',
    javaRule: 'Chaque case constant doit être compatible (et représentable) avec le type switché.',
    trap: 'Mettre une constante int trop grande pour un byte/short/char.',
  }),
  q({
    n: 8,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `String s = null;
System.out.println(switch (s) {
  case null -> "N";
  case "x" -> "X";
  default -> "D";
});`,
    choices: [
      'N',
      'NullPointerException',
      'D',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Depuis Java 21, case null est autorisé dans un switch ; il matche sans NPE.',
    wrongWhy: 'Historiquement switch(null) lançait NPE ; avec case null, le cas est géré.',
    javaRule: 'Java 21 : null-friendly switch avec case null (pattern matching / switch amélioré).',
    trap: 'Toujours attendre NPE sur switch(null) sans regarder case null.',
  }),
  q({
    n: 9,
    day: 4,
    topic: 'control-flow',
    stem: 'Que se passe-t-il ?',
    code: `Integer i = null;
switch (i) {
  case 1 -> System.out.println("one");
  default -> System.out.println("def");
}`,
    choices: [
      'NullPointerException (unboxing / null non géré)',
      'def',
      'one',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Sans case null, switch sur Integer null provoque NPE (évaluation du sélecteur / unboxing selon contexte).',
    wrongWhy: 'default ne rattrape pas null ici comme un case null le ferait.',
    javaRule: 'Sélectionneur wrapper null sans case null → NPE.',
    trap: 'Croire que default couvre null.',
  }),
  q({
    n: 10,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle affirmation sur les switch expressions est vraie ?',
    choices: [
      'Elles doivent être exhaustives (tous les cas couverts, souvent via default)',
      'Elles autorisent le fall-through entre arrow cases',
      'Elles ne peuvent pas renvoyer de valeur',
      'yield est interdit ; seul return est permis',
    ],
    correct: 0,
    correctWhy: 'Une switch expression doit produire une valeur dans tous les chemins : exhaustivité (enum complet, sealed, ou default).',
    wrongWhy: 'Pas de fall-through avec ->. yield produit la valeur dans un bloc ; return n’est pas le mécanisme du switch.',
    javaRule: 'Switch expressions : exhaustives, sans fall-through (arrow), valeur via expression ou yield.',
    trap: 'Omettre default sur un switch expression sur int/String.',
  }),
  q({
    n: 11,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `enum Color { R, G, B }
Color c = Color.G;
String s = switch (c) {
  case R -> "red";
  case G -> "green";
  case B -> "blue";
};
System.out.println(s);`,
    choices: ['green', 'Erreur : default obligatoire', 'null', 'G'],
    correct: 0,
    correctWhy: 'Tous les enum constants sont couverts → exhaustif sans default. case G → "green".',
    wrongWhy: 'Pour un enum complet, default n’est pas requis dans une switch expression.',
    javaRule: 'Exhaustivité : enum (tous les constants) ou default/case null selon le type.',
    trap: 'Toujours ajouter default « par habitude » et croire qu’il est obligatoire ici.',
  }),
  q({
    n: 12,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int x = 0;
System.out.println(x > 0 ? "pos" : x < 0 ? "neg" : "zero");`,
    choices: ['zero', 'pos', 'neg', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Opérateur ternaire imbriqué : x>0 faux → évalue x<0 ? ... : "zero" → aussi faux → "zero".',
    wrongWhy: 'Associativité à droite des ternaires ; ici la logique mène clairement à "zero".',
    javaRule: 'condition ? a : b — le ternaire est une expression (valeur).',
    trap: 'Mal parenthéser des ternaires imbriqués.',
  }),
  q({
    n: 13,
    day: 4,
    topic: 'control-flow',
    stem: 'Que compile-t-on ?',
    choices: [
      'int x = true ? 1 : 2.0;  // x en erreur : type du ternaire double',
      'double x = true ? 1 : 2.0;',
      'boolean b = 1 ? true : false;',
      'String s = true ? "a" : 2;',
    ],
    correct: 1,
    correctWhy: 'Le type du ternaire numeric est le type promu (double). Assignation à double OK. int x = ... double refuse sans cast.',
    wrongWhy: 'Condition non boolean illégale. "a" et 2 n’ont pas de type commun utilisable simplement (erreur).',
    javaRule: 'Les opérandes du ternaire doivent avoir un type compatible ; binary numeric promotion si besoin.',
    trap: 'Ignorer le type résultant du ternaire lors de l’affectation.',
  }),
  q({
    n: 14,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int n = 1;
switch (n) {
  case 1 -> {
    yield 10;
  }
  default -> 0;
}`,
    choices: [
      'Erreur de compilation (yield hors switch expression)',
      '10',
      '0',
      'Erreur à l’exécution',
    ],
    correct: 0,
    correctWhy: 'Ceci est un switch statement (pas d’affectation / pas utilisé comme expression). yield n’y est pas valide.',
    wrongWhy: 'yield sert uniquement à produire la valeur d’une switch expression.',
    javaRule: 'Distinguer switch statement vs switch expression ; yield uniquement dans les expressions.',
    trap: 'Mélanger syntaxe expression (yield) et statement.',
  }),
  q({
    n: 15,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `int n = 1;
int v = switch (n) {
  case 1: yield 10;
  case 2: yield 20;
  default: yield 0;
};
System.out.println(v);`,
    choices: ['10', 'Erreur : : interdit dans expression', '0', '20'],
    correct: 0,
    correctWhy: 'Les switch expressions peuvent utiliser des labels à : avec yield (pas de fall-through « silencieux » : chaque case doit yield ou throw).',
    wrongWhy: 'La forme case L: yield ...; est légale dans une switch expression.',
    javaRule: 'Dans une switch expression avec :, chaque case doit produire via yield (ou throw) — pas de fall-through de valeurs.',
    trap: 'Croire que seuls les -> sont autorisés dans les expressions.',
  }),
  q({
    n: 16,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `char c = 'a';
switch (c) {
  case 'a': System.out.print("A");
  case 'b': System.out.print("B"); break;
  case 'A': System.out.print("AA");
}`,
    choices: ['AB', 'A', 'AA', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'case \'a\' sans break → fall-through vers \'b\' → "AB".',
    wrongWhy: 'char est sensible à la casse : \'A\' est un case distinct non atteint ici.',
    javaRule: 'switch accepte char (parmi byte/short/int/char, wrappers, String, enum).',
    trap: 'Oublier le fall-through ou confondre \'a\' et \'A\'.',
  }),
  q({
    n: 17,
    day: 4,
    topic: 'control-flow',
    stem: 'Que se passe-t-il ?',
    code: `final int X = 10;
final int Y = X + 1;
int z = 11;
switch (z) {
  case X: System.out.print("X"); break;
  case Y: System.out.print("Y"); break;
}`,
    choices: [
      'Y',
      'Erreur : Y n’est pas une constante de compilation',
      'X',
      'Rien (pas de match)',
    ],
    correct: 0,
    correctWhy: 'X et Y sont final et initialisées avec des constantes de compile-time → case valides. z=11 → Y.',
    wrongWhy: 'Y = X + 1 avec X constante compile-time reste une constante compile-time.',
    javaRule: 'case exige des constant expressions (ou pattern). final + expression constante OK.',
    trap: 'Croire que seule une literal inline est autorisée en case.',
  }),
  q({
    n: 18,
    day: 4,
    topic: 'control-flow',
    stem: 'Que se passe-t-il ?',
    code: `int k = 2;
final int M;
M = 2;
switch (k) {
  case M: System.out.print("M");
}`,
    choices: [
      'Erreur de compilation (M pas constant expression)',
      'M',
      'Rien',
      'Exception',
    ],
    correct: 0,
    correctWhy: 'M est blank final assigné à l’exécution : ce n’est pas une constant expression → interdit en case.',
    wrongWhy: 'final seul ne suffit pas ; l’initialiseur doit être une constante de compilation.',
    javaRule: 'Constant expression : règles du JLS (literals, opérations sur constantes, etc.).',
    trap: 'Utiliser un blank final comme label case.',
  }),
  q({
    n: 19,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `boolean rain = true;
boolean wind = false;
if (rain)
  if (wind) System.out.print("storm");
  else System.out.print("wet");
else System.out.print("dry");`,
    choices: ['wet', 'storm', 'dry', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'else se lie au if le plus proche (if (wind)). rain true, wind false → "wet".',
    wrongWhy: 'Ce n’est pas le else du if (rain).',
    javaRule: 'dangling else : else s’associe au if intérieur le plus proche.',
    trap: 'Lire l’indentation plutôt que la règle de rattachement.',
  }),
  q({
    n: 20,
    day: 4,
    topic: 'control-flow',
    stem: 'Quelle est la sortie ?',
    code: `Object o = "hello";
String msg = switch (o) {
  case String s when s.length() > 3 -> "long:" + s;
  case String s -> "short:" + s;
  default -> "other";
};
System.out.println(msg);`,
    choices: [
      'long:hello',
      'short:hello',
      'other',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Pattern matching for switch : o est String de longueur 5 → garde when true → "long:hello".',
    wrongWhy: 'Le case String sans garde n’est atteint que si length ≤ 3.',
    javaRule: 'case Type var when condition → pattern + garde (Java 21).',
    trap: 'Inverser l’ordre des case String (le plus général avant le when) — ici l’ordre est correct.',
  }),
]
