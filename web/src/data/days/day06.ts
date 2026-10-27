import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day06: Question[] = [
  q({
    n: 1,
    day: 6,
    topic: 'oop',
    stem: 'Que se passe-t-il à la compilation et à l’exécution ?',
    code: `public class Box {
  private int value;
  public Box(int value) {
    this.value = value;
  }
  public static void main(String[] args) {
    Box b = new Box(10);
    System.out.println(b.value);
  }
}`,
    choices: [
      'Affiche 10',
      'Erreur de compilation : value est private',
      'Erreur d’exécution : IllegalAccessError',
      'Affiche 0',
    ],
    correct: 0,
    correctWhy:
      'main est dans la même classe Box : les membres private sont accessibles depuis n’importe quel code de la classe, y compris les méthodes static.',
    wrongWhy:
      'private ne bloque pas l’accès intra-classe. Ce n’est pas une erreur d’exécution.',
    javaRule:
      'Le modificateur private autorise l’accès depuis tout le corps de la classe déclarante (instance et static).',
    trap: 'Croire que private empêche toute lecture hors d’une méthode d’instance.',
  }),
  q({
    n: 2,
    day: 6,
    topic: 'oop',
    stem: 'Quel est le résultat ?',
    code: `class Counter {
  int n;
  Counter() {
    this(1);
  }
  Counter(int n) {
    this.n = n;
  }
  public static void main(String[] args) {
    System.out.println(new Counter().n);
  }
}`,
    choices: ['0', '1', 'Erreur de compilation', 'null'],
    correct: 1,
    correctWhy:
      'Le constructeur sans argument délègue via this(1) au constructeur Counter(int), qui initialise n à 1.',
    wrongWhy:
      'Sans this(1), n vaudrait 0 (défaut). Ici la délégation fixe n à 1. Pas d’erreur de compilation.',
    javaRule:
      'this(...) doit être la première instruction d’un constructeur et permet de chaîner les constructeurs de la même classe.',
    trap: 'Oublier que this(args) remplace l’initialisation par défaut.',
  }),
  q({
    n: 3,
    day: 6,
    topic: 'oop',
    stem: 'Ce code compile-t-il ?',
    code: `class Point {
  int x, y;
  Point(int x, int y) {
    x = x;
    y = y;
  }
  public static void main(String[] args) {
    Point p = new Point(3, 4);
    System.out.println(p.x + "," + p.y);
  }
}`,
    choices: [
      'Affiche 3,4',
      'Affiche 0,0',
      'Erreur de compilation',
      'Affiche null,null',
    ],
    correct: 1,
    correctWhy:
      'x = x et y = y assignent les paramètres à eux-mêmes ; les champs d’instance restent à 0. Il fallait this.x = x.',
    wrongWhy:
      'Le code compile (shadowing). Les champs ne sont jamais mis à jour.',
    javaRule:
      'Un paramètre masque (shadow) un champ du même nom ; this.champ désigne le champ d’instance.',
    trap: 'Penser que l’affectation x = x met à jour le champ automatiquement.',
  }),
  q({
    n: 4,
    day: 6,
    topic: 'oop',
    stem: 'Quelle affirmation est vraie ?',
    code: `class A {
  private int secret = 42;
  boolean same(A other) {
    return this.secret == other.secret;
  }
}`,
    choices: [
      'Erreur : other.secret est inaccessible',
      'Compile : private est au niveau classe, pas instance',
      'Compile seulement si other == this',
      'Erreur : secret doit être package-private',
    ],
    correct: 1,
    correctWhy:
      'private est une restriction au niveau de la classe : toute méthode de A peut lire secret sur n’importe quelle instance de A.',
    wrongWhy:
      'Ce n’est pas limité à this. package-private n’est pas requis.',
    javaRule:
      'L’encapsulation private protège hors de la classe, pas entre instances de la même classe.',
    trap: 'Confondre « private par instance » (inexistant en Java) avec private de classe.',
  }),
  q({
    n: 5,
    day: 6,
    topic: 'oop',
    stem: 'Que produit ce programme ?',
    code: `class Init {
  int a = 1;
  Init() {
    a = 2;
  }
  {
    a = 3;
  }
  public static void main(String[] args) {
    System.out.println(new Init().a);
  }
}`,
    choices: ['1', '2', '3', 'Erreur de compilation'],
    correct: 1,
    correctWhy:
      'Ordre : champs / blocs d’instance dans l’ordre du source (a=1 puis a=3), puis corps du constructeur (a=2). Résultat : 2.',
    wrongWhy:
      'Le bloc d’instance s’exécute avant le corps du constructeur, pas après.',
    javaRule:
      'Initialiseurs d’instance et blocs {} s’exécutent dans l’ordre textuel, puis le constructeur.',
    trap: 'Inverser l’ordre bloc d’instance / constructeur.',
  }),
  q({
    n: 6,
    day: 6,
    topic: 'oop',
    stem: 'Quel modificateur d’accès convient pour un champ destiné uniquement aux sous-classes du même package et d’autres packages ?',
    choices: ['private', 'default (package-private)', 'protected', 'public'],
    correct: 2,
    correctWhy:
      'protected donne accès au package et aux sous-classes (y compris hors package).',
    wrongWhy:
      'private : classe seule. package-private : package seul. public : tout le monde.',
    javaRule:
      'protected = package + sous-classes ; default = package uniquement.',
    trap: 'Croire que package-private suffit pour les sous-classes hors package.',
  }),
  q({
    n: 7,
    day: 6,
    topic: 'immutability',
    stem: 'Cette classe est-elle immuable ?',
    code: `public final class ImmutableName {
  private final String name;
  public ImmutableName(String name) {
    this.name = name;
  }
  public String getName() { return name; }
}`,
    choices: [
      'Oui, strictement immuable dans tous les cas',
      'Oui si name n’est jamais null',
      'Non, car String est mutable',
      'Oui pour l’état exposé : String est immuable et le champ est final',
    ],
    correct: 3,
    correctWhy:
      'Classe final, champ final, pas de setter, String immuable : l’état visible ne peut pas changer après construction.',
    wrongWhy:
      'String n’est pas mutable. null n’empêche pas l’immutabilité de l’objet.',
    javaRule:
      'Immutabilité de base : pas de mutateurs, champs final, pas de fuite d’état mutable, classe souvent final.',
    trap: 'Confondre String (immuable) avec StringBuilder.',
  }),
  q({
    n: 8,
    day: 6,
    topic: 'immutability',
    stem: 'Pourquoi cette classe n’est-elle pas vraiment immuable ?',
    code: `public final class Holder {
  private final int[] data;
  public Holder(int[] data) {
    this.data = data;
  }
  public int[] getData() { return data; }
}`,
    choices: [
      'Parce que le tableau est final',
      'Parce que le constructeur et le getter partagent / exposent le tableau mutable',
      'Parce que final est interdit sur les tableaux',
      'Parce qu’il manque equals/hashCode',
    ],
    correct: 1,
    correctWhy:
      'final fixe la référence, pas le contenu. L’appelant peut muter le tableau passé ou celui retourné par getData().',
    wrongWhy:
      'final sur un tableau est légal. equals/hashCode ne définissent pas l’immutabilité.',
    javaRule:
      'Pour une immutabilité défensive : copier (clone / Arrays.copyOf) en entrée et en sortie.',
    trap: 'Croire que private final int[] rend le contenu immuable.',
  }),
  q({
    n: 9,
    day: 6,
    topic: 'oop',
    stem: 'Quel est le résultat ?',
    code: `class T {
  static int s = 0;
  int i = 0;
  T() {
    s++;
    i++;
  }
  public static void main(String[] args) {
    new T();
    new T();
    System.out.println(T.s + " " + new T().i);
  }
}`,
    choices: ['2 1', '3 1', '3 3', '2 3'],
    correct: 1,
    correctWhy:
      'Deux new T() portent s à 2 ; le troisième dans println porte s à 3 et i vaut 1 sur cette nouvelle instance.',
    wrongWhy:
      'i est d’instance : chaque objet repart de 0 puis i++ → 1.',
    javaRule:
      'Champs static partagés ; champs d’instance propres à chaque objet.',
    trap: 'Additionner i comme s’il était static.',
  }),
  q({
    n: 10,
    day: 6,
    topic: 'oop',
    stem: 'Ce constructeur est-il valide ?',
    code: `class C {
  int x;
  C() {
    System.out.println(x);
    this(5);
  }
  C(int x) { this.x = x; }
}`,
    choices: [
      'Oui, affiche 0 puis initialise x',
      'Non : this(...) doit être la première instruction',
      'Oui si x est final',
      'Non : surcharge de constructeur interdite',
    ],
    correct: 1,
    correctWhy:
      'L’appel this(5) n’est pas en première instruction → erreur de compilation.',
    wrongWhy:
      'La surcharge de constructeurs est autorisée ; la règle porte sur la position de this(...).',
    javaRule:
      'this(...) ou super(...) doit être la toute première instruction du constructeur.',
    trap: 'Mettre du code « de log » avant this(...).',
  }),
  q({
    n: 11,
    day: 6,
    topic: 'oop',
    stem: 'Que compile et affiche ce code ?',
    code: `class P {
  protected int v = 1;
}
class Q {
  public static void main(String[] args) {
    P p = new P();
    System.out.println(p.v);
  }
}`,
    choices: [
      '1 si P et Q sont dans le même package',
      'Toujours 1',
      'Erreur : protected inaccessible hors sous-classe',
      'Erreur d’exécution',
    ],
    correct: 0,
    correctWhy:
      'protected est visible dans le même package même sans héritage. Hors package, Q devrait être sous-classe et respecter les règles d’accès protected.',
    wrongWhy:
      'Ce n’est pas « sous-classe uniquement ». Pas d’erreur d’exécution si ça compile.',
    javaRule:
      'protected = package ∪ sous-classes (avec restrictions hors package sur le type statique).',
    trap: 'Réduire protected aux seules sous-classes.',
  }),
  q({
    n: 12,
    day: 6,
    topic: 'immutability',
    stem: 'Quelle pratique rend Holder réellement plus sûr ?',
    code: `public final class Holder {
  private final List<String> items;
  public Holder(List<String> items) {
    this.items = /* ??? */;
  }
  public List<String> getItems() {
    return /* ??? */;
  }
}`,
    choices: [
      'this.items = items; return items;',
      'this.items = items; return Collections.unmodifiableList(items);',
      'this.items = List.copyOf(items); return Collections.unmodifiableList(items);',
      'this.items = List.copyOf(items); return this.items;',
    ],
    correct: 3,
    correctWhy:
      'List.copyOf stocke une copie immuable indépendante de la liste appelante ; la retourner (this.items) n’expose aucun état mutable. (copyOf refuse null / éléments null.)',
    wrongWhy:
      'Partager items laisse l’appelant muter l’interne. unmodifiableList(items) enveloppe encore la liste externe (ou une autre référence) au lieu de garantir la copie interne seule.',
    javaRule:
      'Copies défensives (List.copyOf) à l’entrée ; ne jamais exposer une référence mutable interne.',
    trap: 'unmodifiableList sans copie défensive à l’entrée.',
  }),
  q({
    n: 13,
    day: 6,
    topic: 'oop',
    stem: 'Résultat ?',
    code: `class S {
  static { System.out.print("S"); }
  S() { System.out.print("s"); }
  public static void main(String[] args) {
    new S();
    new S();
  }
}`,
    choices: ['SsSs', 'SSss', 'Sss', 'ssS'],
    correct: 2,
    correctWhy:
      'Le bloc static s’exécute une fois au chargement de la classe (S), puis chaque constructeur (s s) → Sss.',
    wrongWhy:
      'Le static initializer ne se répète pas à chaque new.',
    javaRule:
      'Initialiseurs static : une fois par ClassLoader au premier usage actif de la classe.',
    trap: 'Réexécuter le static à chaque instanciation.',
  }),
  q({
    n: 14,
    day: 6,
    topic: 'oop',
    stem: 'Laquelle compile ?',
    code: `class Bean {
  private final int id;
  // constructeurs candidats
}`,
    choices: [
      'Bean() { }  // id non assigné',
      'Bean(int id) { this.id = id; }',
      'Bean(int id) { id = id; }',
      'Bean() { this.id = 0; this.id = 1; }',
    ],
    correct: 1,
    correctWhy:
      'Un champ final d’instance doit être assigné exactement une fois dans chaque constructeur (ou initialiseur). this.id = id est correct.',
    wrongWhy:
      'Sans affectation, id = id (shadow), ou double affectation de final : erreur de compilation.',
    javaRule:
      'blank final d’instance : une affectation definite assignment par chemin de construction.',
    trap: 'Oublier this. sur un final, ou le réassigner.',
  }),
  q({
    n: 15,
    day: 6,
    topic: 'oop',
    stem: 'Que fait ce code ?',
    code: `class Ref {
  int x = 5;
  void bump(Ref r) {
    r.x++;
    r = new Ref();
    r.x = 100;
  }
  public static void main(String[] args) {
    Ref a = new Ref();
    a.bump(a);
    System.out.println(a.x);
  }
}`,
    choices: ['5', '6', '100', 'Erreur de compilation'],
    correct: 1,
    correctWhy:
      'r.x++ mute l’objet pointé par a (5→6). Ensuite r = new Ref() ne change que la copie locale de la référence ; a reste sur l’objet à 6.',
    wrongWhy:
      'Les paramètres objet sont passés par valeur de référence : réassigner r ne réassigne pas a.',
    javaRule:
      'Java passe les arguments par valeur ; pour les objets, c’est la valeur de la référence.',
    trap: 'Penser que r = new Ref() remplace a.',
  }),
  q({
    n: 16,
    day: 6,
    topic: 'immutability',
    stem: 'Pour une classe immuable, quelle affirmation est la plus exacte ?',
    choices: [
      'Tous les champs doivent être public final',
      'La classe doit être final ou les méthodes sensibles final, et l’état mutable encapsulé',
      'Il suffit de ne pas écrire de setters',
      'Il faut implémenter Cloneable',
    ],
    correct: 1,
    correctWhy:
      'Sans final sur la classe, une sous-classe peut ajouter de l’état mutable. L’état interne mutable doit être encapsulé / copié.',
    wrongWhy:
      'Pas de setters ne suffit pas (fuite de références, héritage). Cloneable n’est pas requis.',
    javaRule:
      'Immutabilité robuste : final + encapsulation + copies défensives.',
    trap: 'Se contenter de « pas de setters ».',
  }),
  q({
    n: 17,
    day: 6,
    topic: 'oop',
    stem: 'Résultat de la compilation / exécution ?',
    code: `class Demo {
  private Demo() {}
  public static Demo create() {
    return new Demo();
  }
}
class Client {
  public static void main(String[] args) {
    Demo d = new Demo();
  }
}`,
    choices: [
      'Compile et crée Demo',
      'Erreur dans Client : constructeur private inaccessible',
      'Erreur dans Demo.create',
      'Erreur d’exécution seulement',
    ],
    correct: 1,
    correctWhy:
      'Le constructeur private n’est utilisable que dans Demo (ex. factory create). Client ne peut pas faire new Demo().',
    wrongWhy:
      'create() est valide dans Demo. L’échec est à la compilation chez Client.',
    javaRule:
      'Constructeur private : pattern factory / singleton / contrôle d’instanciation.',
    trap: 'Croire que public class implique un constructeur public.',
  }),
  q({
    n: 18,
    day: 6,
    topic: 'oop',
    stem: 'Quelle ligne provoque une erreur de compilation ?',
    code: `class A {
  int x = 1;
  static void m() {
    // ligne ?
  }
}`,
    choices: [
      'System.out.println(A.class);',
      'System.out.println(new A().x);',
      'System.out.println(x);',
      'A a = null; System.out.println(a);',
    ],
    correct: 2,
    correctWhy:
      'Depuis une méthode static, on ne peut pas référencer le champ d’instance x sans une référence d’instance.',
    wrongWhy:
      'new A().x et les autres lignes sont valides dans un contexte static.',
    javaRule:
      'Contexte static : pas d’accès direct aux membres d’instance.',
    trap: 'Utiliser this ou un champ d’instance dans static sans objet.',
  }),
  q({
    n: 19,
    day: 6,
    topic: 'oop',
    stem: 'Que produit ce programme ?',
    code: `class Over {
  void m(int x) { System.out.print("I"); }
  void m(Integer x) { System.out.print("W"); }
  public static void main(String[] args) {
    Over o = new Over();
    o.m(1);
    o.m(Integer.valueOf(1));
  }
}`,
    choices: ['II', 'WW', 'IW', 'WI'],
    correct: 2,
    correctWhy:
      '1 (int) choisit m(int) sans boxing. Integer valueOf choisit m(Integer). Affiche IW.',
    wrongWhy:
      'La surcharge résout la méthode la plus spécifique sans conversion inutile.',
    javaRule:
      'Surcharge : phase sans boxing avant boxing/unboxing ; puis varargs.',
    trap: 'Toujours boxer les littéraux int vers Integer.',
  }),
  q({
    n: 20,
    day: 6,
    topic: 'immutability',
    stem: 'Quel est le piège ici pour l’immutabilité ?',
    code: `public final class Person {
  private final String name;
  private final LocalDate birth;
  public Person(String name, LocalDate birth) {
    this.name = name;
    this.birth = birth;
  }
  public String getName() { return name; }
  public LocalDate getBirth() { return birth; }
}`,
    choices: [
      'LocalDate est mutable, donc Person ne l’est pas',
      'String est mutable',
      'Aucun : String et LocalDate sont immuables ; design correct pour ces types',
      'Il faut synchroniser les getters',
    ],
    correct: 2,
    correctWhy:
      'java.time.LocalDate et String sont immuables : les retourner est sûr. La classe final + champs final + pas de mutateur → immuable.',
    wrongWhy:
      'LocalDate n’est pas un Calendar mutable. La synchro n’est pas le sujet de l’immutabilité structurelle.',
    javaRule:
      'Types immuables JDK (String, LocalDate, Integer…) peuvent être exposés sans copie.',
    trap: 'Traiter toute date JDK comme un java.util.Date mutable.',
  }),
]
