import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day10: Question[] = [
  q({
    n: 1,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Pattern matching for instanceof — résultat ?',
    code: `Object o = "hi";
if (o instanceof String s) {
  System.out.println(s.toUpperCase());
}`,
    choices: [
      'Erreur : s non déclaré',
      'HI',
      'hi',
      'ClassCastException',
    ],
    correct: 1,
    correctWhy:
      'Si o est un String, la variable de pattern s est liée et utilisable dans le bloc true → HI.',
    wrongWhy:
      'Pas besoin de cast manuel. Pas de CCE si le pattern matche.',
    javaRule:
      'instanceof Type var : test + binding conditionnel.',
    trap: 'Refaire (String) o après un instanceof pattern.',
  }),
  q({
    n: 2,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Portée de la variable de pattern — lequel compile ?',
    code: `Object o = "x";
if (!(o instanceof String s)) {
  return;
}
System.out.println(s.length());`,
    choices: [
      'Erreur : s hors de portée après le if',
      'Compile : flow scoping — après le return, s est surement un String',
      'Compile seulement si s est final explicitement',
      'Erreur : pattern interdit avec !',
    ],
    correct: 1,
    correctWhy:
      'Avec négation + return, le compilateur applique le flow scoping : au-delà, o est String et s est in scope.',
    wrongWhy:
      'Les patterns avec ! sont valides ; la portée suit l’analyse de flux.',
    javaRule:
      'Pattern variables are in scope where the compiler proves the match.',
    trap: 'Redeclarer String s = (String) o inutilement.',
  }),
  q({
    n: 3,
    day: 10,
    topic: 'pattern-matching',
    stem: 'null et instanceof pattern ?',
    code: `Object o = null;
System.out.println(o instanceof String s);`,
    choices: [
      'true et s = null',
      'false (null ne matche aucun type pattern)',
      'NullPointerException',
      'Erreur de compilation',
    ],
    correct: 1,
    correctWhy:
      'instanceof sur null vaut toujours false ; la variable de pattern n’est pas liée.',
    wrongWhy:
      'Pas de NPE sur instanceof. s n’est pas assigné à null via un match réussi.',
    javaRule:
      'null instanceof Type ≡ false.',
    trap: 'Croire qu’un pattern « capture » null comme String.',
  }),
  q({
    n: 4,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Switch patterns — résultat ?',
    code: `Object o = 42;
String r = switch (o) {
  case Integer i -> "I:" + i;
  case String s -> "S:" + s;
  default -> "other";
};
System.out.println(r);`,
    choices: ['I:42', 'S:42', 'other', 'Erreur de compilation'],
    correct: 0,
    correctWhy:
      '42 est un Integer (boxing du case / type réel Integer) → case Integer i.',
    wrongWhy:
      'Ce n’est pas un String. default non atteint.',
    javaRule:
      'Type patterns in switch select the first matching case.',
    trap: 'Comparer o à int primitif sans comprendre le boxing de l’objet.',
  }),
  q({
    n: 5,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Dominance / ordre des cases — problème ?',
    code: `Object o = "a";
switch (o) {
  case CharSequence cs -> System.out.print("CS");
  case String s -> System.out.print("S");
  default -> System.out.print("D");
}`,
    choices: [
      'Affiche S',
      'Affiche CS',
      'Erreur de compilation : case String dominé par CharSequence',
      'Affiche D',
    ],
    correct: 2,
    correctWhy:
      'String ⊂ CharSequence : le case String est inaccessible (dominated) après CharSequence → erreur de compilation.',
    wrongWhy:
      'Ce n’est pas un choix à l’exécution : le compilateur refuse.',
    javaRule:
      'Un case est dominé s’il ne peut plus matcher après un case plus large précédent.',
    trap: 'Mettre le type parent avant le type enfant dans un switch pattern.',
  }),
  q({
    n: 6,
    day: 10,
    topic: 'pattern-matching',
    stem: 'case null — Java 21 ?',
    code: `String s = null;
System.out.println(switch (s) {
  case null -> "N";
  case String x when x.isEmpty() -> "E";
  case String x -> "S:" + x;
});`,
    choices: [
      'NullPointerException',
      'N',
      'E',
      'S:null',
    ],
    correct: 1,
    correctWhy:
      'Avec case null explicite, null est géré et affiche N (pas de NPE du switch).',
    wrongWhy:
      'Sans case null, un switch sur référence null peut jeter NPE. Ici null est couvert.',
    javaRule:
      'Switch peut lister case null ; sinon null sur selector référence ⇒ NPE.',
    trap: 'Oublier case null et s’étonner du NPE.',
  }),
  q({
    n: 7,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Guarded pattern (when) — résultat ?',
    code: `Object o = "abcd";
String r = switch (o) {
  case String s when s.length() > 5 -> "long";
  case String s -> "short:" + s.length();
  default -> "?";
};
System.out.println(r);`,
    choices: ['long', 'short:4', '?', 'Erreur : double case String'],
    correct: 1,
    correctWhy:
      'length 4 ≯ 5 : le premier case échoue, le second case String matche → short:4. Deux cases String sont OK si le premier est gardé (pas de dominance totale).',
    wrongWhy:
      'Un when false ne domine pas le case suivant du même type.',
    javaRule:
      'case Type v when condition ; fall-through sémantique de sélection du premier match.',
    trap: 'Croire que deux case String sont toujours illégaux.',
  }),
  q({
    n: 8,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Record patterns — résultat ?',
    code: `record Point(int x, int y) {}
Object o = new Point(3, 4);
if (o instanceof Point(int x, int y)) {
  System.out.println(x + y);
}`,
    choices: ['7', '34', 'Erreur de compilation', '0'],
    correct: 0,
    correctWhy:
      'Le record pattern déstructure Point et lie x=3, y=4 → 7.',
    wrongWhy:
      'Ce n’est pas une concaténation String. Le pattern record est valide en Java 21.',
    javaRule:
      'instanceof Point(int x, int y) ≡ type test + accessors.',
    trap: 'Utiliser p.x champs publics (records exposent x() pas x public).',
  }),
  q({
    n: 9,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Record pattern imbriqué ?',
    code: `record Path(Point from, Point to) {}
record Point(int x, int y) {}
Object o = new Path(new Point(1, 2), new Point(3, 4));
if (o instanceof Path(Point(int x1, int y1), Point(int x2, int y2))) {
  System.out.println(x1 + x2);
}`,
    choices: ['4', '1', 'Erreur', 'null'],
    correct: 0,
    correctWhy:
      'Patterns imbriqués : x1=1, x2=3 → 4.',
    wrongWhy:
      'La déstructuration nested est supportée.',
    javaRule:
      'Nested record patterns allowed.',
    trap: 'Extraire manuellement via accessors en cascade uniquement.',
  }),
  q({
    n: 10,
    day: 10,
    topic: 'pattern-matching',
    stem: 'var dans un record pattern ?',
    code: `record Box(String s) {}
Object o = new Box("z");
if (o instanceof Box(var s)) {
  System.out.println(s);
}`,
    choices: [
      'Erreur : var interdit dans les patterns',
      'z — var infère String',
      'Object z',
      'null',
    ],
    correct: 1,
    correctWhy:
      'var dans un pattern de composant infère le type du composant (String) → affiche z.',
    wrongWhy:
      'var est autorisé dans les record patterns / type patterns selon le contexte Java 21.',
    javaRule:
      'var in patterns = inferred pattern variable type.',
    trap: 'Refuser var par habitude « var only locals ».',
  }),
  q({
    n: 11,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Switch + sealed exhaustif sans default — déjà vu, variante piège :',
    code: `sealed interface I permits A, B {}
final class A implements I {}
final class B implements I {}
I i = new A();
switch (i) {
  case A a -> System.out.print("A");
  case B b -> System.out.print("B");
}`,
    choices: [
      'Erreur sans default',
      'Affiche A',
      'Affiche B',
      'NPE',
    ],
    correct: 1,
    correctWhy:
      'Hiérarchie sealed couverte : switch statement pattern exhaustif, affiche A.',
    wrongWhy:
      'default non requis si exhaustif. Pas NPE.',
    javaRule:
      'Exhaustiveness for sealed types in pattern switches.',
    trap: 'Ajouter default → "impossible" qui masque l’évolution de permits.',
  }),
  q({
    n: 12,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Unnamed pattern / variable (Java 22+ close to exam topics) — pour 21, underscore ?',
    code: `record Pair(int a, int b) {}
Object o = new Pair(1, 2);
// Java 21 : faut-il nommer les deux composants ?`,
    choices: [
      'En Java 21, les composants matchés doivent être liés à des variables nommées (pas encore de _ unnamed officiel finalisé comme en 22)',
      'On peut toujours écrire Pair(_, _) en Java 17',
      'Record patterns n’existent qu’en preview éternelle',
      'Il faut écrire Pair(int, int) sans identifiants',
    ],
    correct: 0,
    correctWhy:
      'Les record patterns sont finals en 21 avec variables nommées. Les unnamed patterns `_` sont une évolution ultérieure (22). Pour l’exam 21, compter sur des bindings nommés.',
    wrongWhy:
      'Record patterns ne sont plus mere preview en 21. Pair(int, int) sans noms n’est pas la syntaxe 21 usuelle.',
    javaRule:
      'OCP 21 : named pattern variables ; connaître la trajectoire unnamed pour ne pas confondre.',
    trap: 'Mélanger syntaxe Java 22 `_` dans un prep strict 21.',
  }),
  q({
    n: 13,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Pattern et généricité — attention ?',
    code: `Object o = List.of(1, 2);
if (o instanceof List<Integer> list) {
  System.out.println(list.get(0));
}`,
    choices: [
      'Toujours sûr et sans warning',
      'Compile avec unchecked / limitations : instanceof ne peut pas vérifier pleinement les arguments de type à runtime (erasure)',
      'Affiche forcément ClassCastException',
      'Interdit : instanceof List interdit',
    ],
    correct: 1,
    correctWhy:
      'À cause de l’effacement, instanceof List<Integer> ne vérifie pas les éléments ; le compilateur signale unchecked. List.of(1,2) fonctionne ici mais le test n’est pas reifiable.',
    wrongWhy:
      'Ce n’est pas interdit, mais ce n’est pas un check runtime complet des type args.',
    javaRule:
      'Reifiable types only for full runtime instanceof checks; generics erased.',
    trap: 'Croire que instanceof List<Integer> valide chaque élément.',
  }),
  q({
    n: 14,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Que produit ce switch (null + type pattern) ?',
    code: `Object o = null;
String r = switch (o) {
  case String s -> "S";
  case null -> "N";
  default -> "D";
};
System.out.println(r);`,
    choices: [
      'S',
      'N',
      'D',
      'NullPointerException',
    ],
    correct: 1,
    correctWhy:
      'null ne matche pas le type pattern String ; case null est présent donc pas de NPE → "N".',
    wrongWhy:
      'Sans case null, switch(null) lèverait NPE. default n’est pas utilisé pour null quand case null existe.',
    javaRule:
      'Type patterns reject null ; handle null via case null (or case null, Type t).',
    trap: 'Croire que case String s capture null.',
  }),
  q({
    n: 15,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Résultat avec case null, String ?',
    code: `Object o = null;
System.out.println(switch (o) {
  case null, String s -> "empty-or-string";
  default -> "other";
});`,
    choices: [
      'NPE',
      'empty-or-string',
      'other',
      'Erreur de compilation',
    ],
    correct: 1,
    correctWhy:
      'case null, String s combine null et String : o null matche → empty-or-string. (s non utilisé pour null.)',
    wrongWhy:
      'Pas de NPE grâce à case null. default non atteint.',
    javaRule:
      'Case labels can be comma-combined including null.',
    trap: 'Utiliser s quand le match vient de null.',
  }),
  q({
    n: 16,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Boolean switch pattern — compile ?',
    code: `Object o = true;
switch (o) {
  case Boolean b when b -> System.out.print("T");
  case Boolean b -> System.out.print("F");
  default -> System.out.print("?");
}`,
    choices: ['T', 'F', '?', 'Erreur'],
    correct: 0,
    correctWhy:
      'o est Boolean.TRUE : premier case when b → T.',
    wrongWhy:
      'default non atteint. Deux Boolean avec garde sont OK.',
    javaRule:
      'Guards distinguish same type patterns.',
    trap: 'case true primitif sur Object selector sans pattern.',
  }),
  q({
    n: 17,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Record pattern dans switch — résultat ?',
    code: `record Id(String code) {}
Object o = new Id("X");
System.out.println(switch (o) {
  case Id(String c) -> c;
  default -> "?";
});`,
    choices: ['X', 'Id[X]', '?', 'Erreur'],
    correct: 0,
    correctWhy:
      'case Id(String c) déstructure et renvoie le composant code "X".',
    wrongWhy:
      'Ce n’est pas toString du record. Pattern valide.',
    javaRule:
      'Record patterns as switch case labels.',
    trap: 'Écrire case Id i -> i.code sans connaître la déstructuration.',
  }),
  q({
    n: 18,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Dominance avec interface sealed ?',
    code: `sealed interface Animal permits Dog, Cat {}
final class Dog implements Animal {}
final class Cat implements Animal {}
Animal a = new Dog();
switch (a) {
  case Animal an -> System.out.print("A");
  case Dog d -> System.out.print("D");
}`,
    choices: [
      'Affiche D',
      'Affiche A',
      'Erreur : Dog dominé / inatteignable après Animal',
      'Erreur : switch sur interface interdit',
    ],
    correct: 2,
    correctWhy:
      'case Animal couvre tout (y compris Dog) : case Dog est dominé → erreur de compilation.',
    wrongWhy:
      'Le switch sur interface sealed est autorisé ; le problème est l’ordre/dominance.',
    javaRule:
      'Broader type pattern dominates narrower subsequent patterns.',
    trap: 'Mettre le type racine avant les sous-types.',
  }),
  q({
    n: 19,
    day: 10,
    topic: 'pattern-matching',
    stem: 'instanceof et binding réutilisé — illégal ?',
    code: `Object a = "x";
Object b = "y";
if (a instanceof String s && b instanceof String s) {
  System.out.println(s);
}`,
    choices: [
      'Affiche y',
      'Affiche x',
      'Erreur de compilation : s déclaré deux fois / scopes conflictuels',
      'Affiche xy',
    ],
    correct: 2,
    correctWhy:
      'On ne peut pas redeclaring la même pattern variable s dans les deux instanceof ainsi ; conflit de portée / redefinition.',
    wrongWhy:
      'Ce n’est pas un « dernier gagne » à l’exécution : ça ne compile pas.',
    javaRule:
      'Pattern variables follow definite scope / uniqueness rules like locals.',
    trap: 'Réutiliser le même nom s sur plusieurs patterns dans la même expression.',
  }),
  q({
    n: 20,
    day: 10,
    topic: 'pattern-matching',
    stem: 'Synthèse exam — quelle affirmation est vraie en Java 21 ?',
    choices: [
      'Les switch patterns remplacent totalement if/instanceof partout sans exhaustivité',
      'Patterns : instanceof + switch type/record/null/when ; sealed aide l’exhaustivité ; null ne matche pas un type pattern',
      'Record patterns exigent que les composants soient public fields',
      'when peut figurer sur default',
    ],
    correct: 1,
    correctWhy:
      'Récap correct : outils de pattern matching 21, exhaustivité (sealed/enum), null≠type pattern, when sur case typés.',
    wrongWhy:
      'default n’a pas de when. Les records utilisent des accessors, pas des champs public obligatoires.',
    javaRule:
      'Master pattern matching + sealed exhaustiveness for 1Z0-830.',
    trap: 'Ignorer null et dominance dans les QCM switch.',
  }),
]
