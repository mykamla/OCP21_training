import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day08: Question[] = [
  q({
    n: 1,
    day: 8,
    topic: 'interfaces',
    stem: 'Que peut contenir une interface Java SE 21 ?',
    choices: [
      'Uniquement des méthodes abstract public',
      'Méthodes abstract, default, static, private ; champs public static final',
      'Champs d’instance non final',
      'Constructeurs d’instance',
    ],
    correct: 1,
    correctWhy:
      'Depuis Java 8/9 : default, static, private (et private static). Les champs d’interface sont implicitement public static final. Pas de constructeur d’instance.',
    wrongWhy:
      'Les champs ne sont pas d’instance mutables. Pas de constructeurs d’interface.',
    javaRule:
      'Interface = contrats + helpers (default/static/private) ; champs constants.',
    trap: 'Rester figé sur le modèle Java 7 « abstract only ».',
  }),
  q({
    n: 2,
    day: 8,
    topic: 'interfaces',
    stem: 'Résultat ?',
    code: `interface I {
  default String id() { return "I"; }
}
class C implements I {
  public String id() { return "C"; }
  public static void main(String[] args) {
    I x = new C();
    System.out.println(x.id());
  }
}`,
    choices: ['I', 'C', 'Erreur de compilation', 'Erreur d’exécution'],
    correct: 1,
    correctWhy:
      'La classe implémente/override la default method : appel polymorphe → C.',
    wrongWhy:
      'default n’est qu’un repli si la classe ne fournit pas d’implémentation.',
    javaRule:
      'Une méthode d’instance de la classe prime sur la default method d’interface.',
    trap: 'Toujours exécuter le default malgré l’override.',
  }),
  q({
    n: 3,
    day: 8,
    topic: 'interfaces',
    stem: 'Conflit de default methods — que faut-il ?',
    code: `interface A {
  default void m() { System.out.print("A"); }
}
interface B {
  default void m() { System.out.print("B"); }
}
class C implements A, B {
  // ?
}`,
    choices: [
      'Rien : A gagne toujours',
      'Rien : B gagne toujours',
      'C doit override m() (sinon erreur de compilation)',
      'C doit être abstract obligatoirement et ne peut pas override',
    ],
    correct: 2,
    correctWhy:
      'Deux default methods de même signature ⇒ la classe concrète doit fournir une override explicite (souvent via A.super.m()).',
    wrongWhy:
      'Il n’y a pas de gagnant automatique entre A et B.',
    javaRule:
      'Règle du conflit de default : la classe doit trancher.',
    trap: 'Compter sur un ordre d’implements pour départager.',
  }),
  q({
    n: 4,
    day: 8,
    topic: 'interfaces',
    stem: 'Classe + interface — qui gagne ?',
    code: `class Super {
  public void m() { System.out.print("S"); }
}
interface I {
  default void m() { System.out.print("I"); }
}
class Sub extends Super implements I {}
// new Sub().m()`,
    choices: ['I', 'S', 'Erreur de compilation', 'Ambiguïté à l’exécution'],
    correct: 1,
    correctWhy:
      'La méthode d’instance héritée de la classe prime toujours sur une default method d’interface.',
    wrongWhy:
      'Pas d’ambiguïté : règle « class wins ».',
    javaRule:
      'Concrete class method > default interface method.',
    trap: 'Traiter classe et default comme un conflit à résoudre manuellement.',
  }),
  q({
    n: 5,
    day: 8,
    topic: 'interfaces',
    stem: 'Méthodes static d’interface — laquelle est vraie ?',
    code: `interface Util {
  static int twice(int x) { return x * 2; }
}
class Demo {
  public static void main(String[] args) {
    // appels candidats
  }
}`,
    choices: [
      'Demo peut faire Util.twice(2)',
      'Demo hérite twice et peut écrire twice(2)',
      'new Demo() peut faire ((Util) null).twice(2) via instance',
      'twice est overridable dans Demo',
    ],
    correct: 0,
    correctWhy:
      'Les static d’interface s’appellent via le nom de l’interface ; elles ne sont pas héritées par les classes implementors.',
    wrongWhy:
      'Pas d’héritage ni d’override des static d’interface. L’appel via instance n’est pas le modèle (et via référence interface pour static n’est pas comme les classes).',
    javaRule:
      'Interface static methods : pas héritées ; appel InterfaceName.method(...).',
    trap: 'Appeler une static d’interface comme une static de classe héritée.',
  }),
  q({
    n: 6,
    day: 8,
    topic: 'interfaces',
    stem: 'À quoi servent les méthodes private dans une interface ?',
    choices: [
      'À être appelées depuis les classes implementors',
      'À factoriser du code entre default/static de la même interface',
      'À remplacer protected',
      'À être overridées en private dans la classe',
    ],
    correct: 1,
    correctWhy:
      'private (et private static) dans une interface sont des helpers internes pour default/static de cette interface.',
    wrongWhy:
      'Invisibles hors de l’interface ; pas un mécanisme d’héritage pour les classes.',
    javaRule:
      'Java 9+ : private methods in interfaces for code reuse inside the interface.',
    trap: 'Exposer ou override une private d’interface depuis une classe.',
  }),
  q({
    n: 7,
    day: 8,
    topic: 'interfaces',
    stem: 'Que se passe-t-il ?',
    code: `interface A {
  default void m() { System.out.print("A"); }
}
interface B extends A {
  default void m() { System.out.print("B"); }
}
class C implements B {}
// new C().m()`,
    choices: ['A', 'B', 'Erreur de compilation', 'AB'],
    correct: 1,
    correctWhy:
      'B override le default de A ; C hérite du default le plus spécifique (B).',
    wrongWhy:
      'Pas de conflit : sous-interface plus spécifique gagne.',
    javaRule:
      'Default la plus spécifique dans la hiérarchie d’interfaces l’emporte.',
    trap: 'Forcer une override dans C alors que B a déjà tranché.',
  }),
  q({
    n: 8,
    day: 8,
    topic: 'enums',
    stem: 'Quelle affirmation sur les enum est correcte ?',
    choices: [
      'On peut faire new MonEnum() hors de l’enum',
      'Les constantes sont public static final ; constructeur implicitement private',
      'Une enum peut extends une autre classe',
      'ordinal() est stable après réordonnancement source sans recompilation des clients',
    ],
    correct: 1,
    correctWhy:
      'Les constantes d’enum sont créées par la JVM ; constructeurs private (explicite ou non). Pas de new externe. Une enum extends java.lang.Enum (pas une autre classe).',
    wrongWhy:
      'extends autre classe interdit. ordinal dépend de l’ordre de déclaration — fragile.',
    javaRule:
      'enum E extends Enum<E> ; constantes = instances uniques ; ctor private.',
    trap: 'Utiliser ordinal() comme clé de persistance.',
  }),
  q({
    n: 9,
    day: 8,
    topic: 'enums',
    stem: 'Résultat ?',
    code: `enum Level {
  LOW(1), HIGH(2);
  private final int code;
  Level(int code) { this.code = code; }
  int code() { return code; }
}
public class Test {
  public static void main(String[] args) {
    System.out.println(Level.LOW.code() + Level.HIGH.ordinal());
  }
}`,
    choices: ['2', '3', '1', 'Erreur de compilation'],
    correct: 0,
    correctWhy:
      'LOW.code()=1 ; HIGH.ordinal()=1 (deuxième constante, index 0-based) → 1+1=2.',
    wrongWhy:
      'ordinal de HIGH est 1, pas 2. Le constructeur enum est valide.',
    javaRule:
      'ordinal() : position 0-based dans la déclaration. Champs/méthodes d’enum autorisés.',
    trap: 'Confondre code métier et ordinal().',
  }),
  q({
    n: 10,
    day: 8,
    topic: 'enums',
    stem: 'Méthodes abstract sur constantes — lequel compile ?',
    code: `enum Op {
  PLUS { int apply(int a, int b) { return a + b; } },
  MINUS { int apply(int a, int b) { return a - b; } };
  abstract int apply(int a, int b);
}`,
    choices: [
      'Compile : chaque constante fournit apply',
      'Erreur : enum ne peut pas avoir abstract',
      'Erreur : corps de constante interdits',
      'Compile seulement sans abstract (default vide)',
    ],
    correct: 0,
    correctWhy:
      'Pattern classique : méthode abstract sur l’enum + corps de classe par constante.',
    wrongWhy:
      'Les enum peuvent déclarer des méthodes abstract si toutes les constantes les implémentent.',
    javaRule:
      'Constant-specific class bodies pour spécialiser le comportement.',
    trap: 'Interdire abstract dans une enum par habitude.',
  }),
  q({
    n: 11,
    day: 8,
    topic: 'enums',
    stem: 'Que produit ce switch (Java 21 style classique enum) ?',
    code: `enum Color { R, G, B }
Color c = Color.G;
switch (c) {
  case R -> System.out.print("r");
  case G -> System.out.print("g");
  case B -> System.out.print("b");
}`,
    choices: ['r', 'g', 'b', 'Erreur : default obligatoire'],
    correct: 1,
    correctWhy:
      'c vaut G → affiche g. Pour un switch expression couvrant toutes les constantes, default peut être omis ; ici c’est un switch statement avec flèches, toutes les constantes sont couvertes.',
    wrongWhy:
      'default n’est pas obligatoire si tous les cas enum sont listés (surtout en expression).',
    javaRule:
      'Switch sur enum : exhaustivité possible sans default.',
    trap: 'Exiger systématiquement default pour compiler.',
  }),
  q({
    n: 12,
    day: 8,
    topic: 'enums',
    stem: 'valueOf / values — piège ?',
    code: `enum Day { MON, TUE }
System.out.println(Day.valueOf("mon"));`,
    choices: [
      'Affiche MON',
      'Affiche mon',
      'IllegalArgumentException (sensible à la casse)',
      'null',
    ],
    correct: 2,
    correctWhy:
      'Enum.valueOf exige le nom exact de la constante (case-sensitive) : "mon" ≠ "MON".',
    wrongWhy:
      'Pas de conversion automatique de casse. Pas null.',
    javaRule:
      'valueOf(String) : nom exact ; sinon IllegalArgumentException.',
    trap: 'Normaliser la casse sans le faire explicitement.',
  }),
  q({
    n: 13,
    day: 8,
    topic: 'interfaces',
    stem: 'Champs d’interface — que compile / signifie ?',
    code: `interface Conf {
  int MAX = 10;
  // équivalent à :
}`,
    choices: [
      'protected static int MAX = 10;',
      'public static final int MAX = 10;',
      'private final int MAX = 10;',
      'public int MAX = 10; // d’instance',
    ],
    correct: 1,
    correctWhy:
      'Tout champ d’interface est implicitement public static final.',
    wrongWhy:
      'Pas protected/private ni d’instance sur les champs d’interface.',
    javaRule:
      'Interface fields ⇒ public static final constants.',
    trap: 'Déclarer un champ d’instance dans une interface.',
  }),
  q({
    n: 14,
    day: 8,
    topic: 'interfaces',
    stem: 'implements multiple — abstract methods homonymes ?',
    code: `interface A { void m(); }
interface B { void m(); }
class C implements A, B {
  public void m() { System.out.print("C"); }
}`,
    choices: [
      'Erreur : signatures identiques conflictuelles',
      'Compile : une seule implémentation satisfait A et B',
      'Il faut deux méthodes m distinctes',
      'Il faut default dans A et B',
    ],
    correct: 1,
    correctWhy:
      'Deux méthodes abstract de même signature sont fusionnées ; une implémentation suffit.',
    wrongWhy:
      'Le conflit apparaît surtout avec deux default divergents, pas deux abstract identiques.',
    javaRule:
      'Same erasure/signature abstract methods ⇒ une implémentation commune.',
    trap: 'Appliquer la règle du conflit default aux abstract pures.',
  }),
  q({
    n: 15,
    day: 8,
    topic: 'enums',
    stem: 'Enum et interfaces — valide ?',
    code: `interface Named { String name(); }
enum Planet implements Named {
  EARTH;
  public String name() { return "Earth"; } // attention: name() déjà final sur Enum ?
}`,
    choices: [
      'Toujours OK : name() d’Enum est overridable',
      'Problème : Enum.name() est final — on ne peut pas override name() ; choisir un autre nom de méthode',
      'Une enum ne peut jamais implements',
      'OK seulement si Planet est abstract',
    ],
    correct: 1,
    correctWhy:
      'java.lang.Enum déclare name() final. Une enum peut implements une interface, mais pas override name(). Il faut p.ex. displayName().',
    wrongWhy:
      'implements est autorisé pour les enum. abstract enum n’est pas la solution à name().',
    javaRule:
      'Enum peut implémenter des interfaces ; méthodes finales d’Enum (name, ordinal…) non overridables.',
    trap: 'Mapper une interface Named.name() sur Enum.name().',
  }),
  q({
    n: 16,
    day: 8,
    topic: 'enums',
    stem: 'compareTo des enum — base ?',
    code: `enum Sz { S, M, L }
System.out.println(Sz.S.compareTo(Sz.L));`,
    choices: [
      'Basé sur equals des champs',
      'Basé sur ordinal (négatif ici car S avant L)',
      'Toujours 0',
      'IllegalArgumentException',
    ],
    correct: 1,
    correctWhy:
      'Enum.compareTo compare les ordinal : S < L ⇒ résultat négatif.',
    wrongWhy:
      'Ce n’est pas une comparaison de champs custom. Types différents d’enum ⇒ CCE, pas ici.',
    javaRule:
      'Enum implements Comparable<E> via ordinal.',
    trap: 'Comparer des enums de types différents ou se fier à compareTo métier.',
  }),
  q({
    n: 17,
    day: 8,
    topic: 'interfaces',
    stem: 'Que se passe-t-il à la compilation ?',
    code: `interface I {
  default void m() { helper(); }
  private void helper() { System.out.print("h"); }
}
class C implements I {
  public static void main(String[] args) {
    new C().helper();
  }
}`,
    choices: [
      'Affiche h',
      'Erreur : helper private inaccessible depuis C',
      'Affiche rien',
      'Erreur dans l’interface : private interdit',
    ],
    correct: 1,
    correctWhy:
      'helper est private à l’interface : C ne peut pas l’appeler. m() le peut, depuis l’interface.',
    wrongWhy:
      'private dans interface est légal (Java 9+) mais encapsulé dans l’interface.',
    javaRule:
      'private interface methods : scope = interface body only.',
    trap: 'Traiter private d’interface comme protected pour les implementors.',
  }),
  q({
    n: 18,
    day: 8,
    topic: 'interfaces',
    stem: 'Annotation @FunctionalInterface — condition ?',
    choices: [
      'Exactement une méthode abstract (SAM), default/static illimitées',
      'Aucune méthode',
      'Uniquement des default methods',
      'Au moins deux abstract methods',
    ],
    correct: 0,
    correctWhy:
      'Une functional interface a une seule méthode abstract ; default et static ne comptent pas dans le SAM.',
    wrongWhy:
      'Zéro ou deux+ abstract ⇒ pas fonctionnelle (pour @FunctionalInterface).',
    javaRule:
      'SAM = Single Abstract Method ; public methods de Object n’entrent pas en compte.',
    trap: 'Compter les default comme abstract.',
  }),
  q({
    n: 19,
    day: 8,
    topic: 'enums',
    stem: 'Switch expression exhaustif sur enum — lequel compile sans default ?',
    code: `enum Coin { H, T }
int v = switch (coin) {
  case H -> 1;
  case T -> 0;
  // default ?
};`,
    choices: [
      'Obligatoire d’avoir default',
      'Sans default OK si tous les cas enum sont couverts',
      'Interdit d’utiliser switch expression sur enum',
      'OK seulement avec yield',
    ],
    correct: 1,
    correctWhy:
      'Pour un switch expression sur enum, l’exhaustivité des constantes permet d’omettre default.',
    wrongWhy:
      'yield sert aux blocs, pas obligatoire avec des flèches simples.',
    javaRule:
      'Switch expressions must be exhaustive ; enum+all constants suffit.',
    trap: 'Ajouter un default mort qui masque l’oubli d’une nouvelle constante.',
  }),
  q({
    n: 20,
    day: 8,
    topic: 'enums',
    stem: 'Que produit values() ?',
    code: `enum E { A, B }
E[] x = E.values();
E[] y = E.values();
System.out.println(x == y);
x[0] = null;
System.out.println(E.values()[0]);`,
    choices: [
      'true puis null',
      'false puis A',
      'false puis null',
      'true puis A',
    ],
    correct: 1,
    correctWhy:
      'values() renvoie une nouvelle copie du tableau à chaque appel (x != y). Muter x n’altère pas les constantes : E.values()[0] reste A.',
    wrongWhy:
      'Ce n’est pas le même tableau partagé (sinon mutabilité dangereuse des constantes).',
    javaRule:
      'Enum.values() defensive copy ; ne pas s’y fier pour == d’identité de tableau.',
    trap: 'Muter le tableau de values() en croyant changer l’enum.',
  }),
]
