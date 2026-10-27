import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day11: Question[] = [
  q({
    n: 1,
    day: 11,
    topic: 'oop',
    stem: 'Quelle affirmation sur les classes imbriquées est correcte ?',
    code: `public class Outer {
  private int x = 1;
  static class Nested { }
  class Inner { }
}`,
    choices: [
      'Nested peut accéder à x sans instance de Outer',
      'Inner détient une référence implicite vers une instance de Outer',
      'Nested et Inner sont toutes deux des classes top-level',
      'Inner peut être instanciée sans Outer : new Inner()',
    ],
    correct: 1,
    correctWhy: 'Une classe interne (non static) possède une référence cachée vers l’instance englobante ; une nested static n’en a pas.',
    wrongWhy: 'Nested (static) n’accède pas aux membres d’instance de Outer sans référence explicite ; Inner nécessite new Outer().new Inner().',
    javaRule: 'static nested class = pas de this englobant ; inner class = this$0 implicite vers Outer.',
    trap: 'Confondre nested static et inner : seul Inner « voit » automatiquement les champs d’instance.',
  }),
  q({
    n: 2,
    day: 11,
    topic: 'oop',
    stem: 'Que produit ce programme ?',
    code: `public class Outer {
  private static int s = 10;
  private int i = 20;
  static class Nested {
    void print() {
      System.out.print(s);
      // System.out.print(i); // ?
    }
  }
  public static void main(String[] args) {
    new Nested().print();
  }
}`,
    choices: [
      '10 puis erreur si on décommente l’accès à i',
      '1020',
      'Erreur de compilation sur s',
      'NullPointerException',
    ],
    correct: 0,
    correctWhy: 'Nested static accède aux membres static de Outer (s). L’accès à i (instance) sans Outer ne compile pas.',
    wrongWhy: 's est accessible ; i n’est pas un membre static. Pas de NPE ici.',
    javaRule: 'Une nested static class n’accède qu’aux membres static de la classe englobante (sauf via une référence Outer).',
    trap: 'Croire qu’une nested static voit tous les private de Outer, y compris d’instance.',
  }),
  q({
    n: 3,
    day: 11,
    topic: 'oop',
    stem: 'Quelle ligne compile pour créer une Inner ?',
    code: `public class Outer {
  class Inner { }
  public static void main(String[] args) {
    // ?
  }
}`,
    choices: [
      'Inner in = new Inner();',
      'Outer.Inner in = new Outer.Inner();',
      'Outer.Inner in = new Outer().new Inner();',
      'Inner in = Outer.new Inner();',
    ],
    correct: 2,
    correctWhy: 'Depuis un contexte static, il faut une instance Outer puis new Inner() lié à cette instance.',
    wrongWhy: 'Sans Outer, new Inner() / new Outer.Inner() échouent ; Outer.new Inner() n’est pas une syntaxe valide.',
    javaRule: 'Syntaxe : outerInstance.new InnerType() pour instancier une inner class.',
    trap: 'Écrire new Outer.Inner() comme pour une nested static.',
  }),
  q({
    n: 4,
    day: 11,
    topic: 'oop',
    stem: 'À propos des classes locales et anonymes, laquelle est vraie ?',
    choices: [
      'Une classe locale peut être static',
      'Une classe anonyme peut étendre une classe ou implémenter une interface',
      'Une classe anonyme peut avoir un constructeur nommé',
      'Une classe locale peut être déclarée public',
    ],
    correct: 1,
    correctWhy: 'Une anonyme = sous-classe d’une classe concrète/abstraite OU implémentation d’une interface, en une seule expression.',
    wrongWhy: 'Pas de modificateur static/public sur une locale ; une anonyme n’a pas de constructeur nommé (seulement un bloc d’init).',
    javaRule: 'Local/anonymous classes : portée limitée, capture de variables effectively final, pas de constructeur nommé pour les anonymes.',
    trap: 'Croire qu’on peut déclarer un constructeur public dans une classe anonyme.',
  }),
  q({
    n: 5,
    day: 11,
    topic: 'oop',
    stem: 'Que se passe-t-il ?',
    code: `void m(int x) {
  x = 5;
  class Local {
    void print() { System.out.println(x); }
  }
  new Local().print();
}`,
    choices: [
      'Affiche 5',
      'Affiche la valeur initiale de x passée à m',
      'Erreur de compilation : x n’est plus effectively final',
      'Erreur à l’exécution',
    ],
    correct: 2,
    correctWhy: 'Après x = 5, x n’est plus effectively final ; la classe locale ne peut plus le capturer.',
    wrongWhy: 'Ce n’est pas un problème d’exécution : le compilateur refuse la capture.',
    javaRule: 'Les variables locales capturées par local/anonymous/lambda doivent être final ou effectively final.',
    trap: 'Penser que seule la déclaration final compte, pas la réaffectation après.',
  }),
  q({
    n: 6,
    day: 11,
    topic: 'oop',
    stem: 'Quel contrat equals/hashCode est violé ici ?',
    code: `class Point {
  int x, y;
  public boolean equals(Object o) {
    if (!(o instanceof Point p)) return false;
    return x == p.x && y == p.y;
  }
  // pas de hashCode
}`,
    choices: [
      'Aucun : hashCode est optionnel si equals est redéfini',
      'Objets égaux peuvent avoir des hashCode différents (défaut Object)',
      'equals n’est pas réflexif',
      'instanceof est interdit dans equals',
    ],
    correct: 1,
    correctWhy: 'Si a.equals(b), alors a.hashCode() == b.hashCode(). Sans override, Object.hashCode() casse ce contrat pour des Points égaux.',
    wrongWhy: 'instanceof (pattern) est courant et valide ; le problème est l’absence de hashCode cohérent.',
    javaRule: 'Toujours redéfinir hashCode avec equals ; objets égaux ⇒ même hashCode.',
    trap: 'Oublier hashCode et placer l’objet dans HashSet/HashMap (doublons « invisibles »).',
  }),
  q({
    n: 7,
    day: 11,
    topic: 'oop',
    stem: 'Que contient le Set après exécution ?',
    code: `class Id {
  int id;
  Id(int id) { this.id = id; }
  public boolean equals(Object o) {
    return o instanceof Id other && id == other.id;
  }
  public int hashCode() { return id; }
}
var set = new HashSet<Id>();
var a = new Id(1);
set.add(a);
a.id = 2;
set.add(new Id(1));
System.out.println(set.size());`,
    choices: ['1', '2', '0', 'Erreur de compilation'],
    correct: 1,
    correctWhy: 'Après mutation de a.id, a est « perdu » dans le bucket HashSet ; new Id(1) est ajouté. size() vaut 2.',
    wrongWhy: 'equals/hashCode basés sur un champ mutable + mutation après insertion = comportement cassé, pas size 1.',
    javaRule: 'Ne jamais muter des champs participant à equals/hashCode tant que l’objet est dans un hash-based collection.',
    trap: 'Croire que HashSet détecte automatiquement le changement de clé.',
  }),
  q({
    n: 8,
    day: 11,
    topic: 'oop',
    stem: 'Quelle propriété d’equals est violée ?',
    code: `class A {
  public boolean equals(Object o) { return o instanceof A; }
}
class B extends A {
  public boolean equals(Object o) { return o instanceof B; }
}
A a = new A(); B b = new B();
System.out.println(a.equals(b) + " " + b.equals(a));`,
    choices: [
      'Réflexivité',
      'Symétrie',
      'Transitivité seulement',
      'Aucune : le code est correct',
    ],
    correct: 1,
    correctWhy: 'a.equals(b) est true (b instanceof A) mais b.equals(a) est false (a n’est pas instanceof B) → asymétrie.',
    wrongWhy: 'Le couple (a,b) casse la symétrie du contrat Object.equals.',
    javaRule: 'equals doit être réflexif, symétrique, transitif, consistant, et false pour null.',
    trap: 'Utiliser instanceof + héritage sans getClass() ni design sealed/composition → symétrie cassée.',
  }),
  q({
    n: 9,
    day: 11,
    topic: 'immutability',
    stem: 'Cette classe est-elle profondément immuable ?',
    code: `public final class Person {
  private final String name;
  private final List<String> hobbies;
  public Person(String name, List<String> hobbies) {
    this.name = name;
    this.hobbies = hobbies;
  }
  public String getName() { return name; }
  public List<String> getHobbies() { return hobbies; }
}`,
    choices: [
      'Oui : final class + champs final',
      'Non : la List reçue et renvoyée reste mutable de l’extérieur',
      'Non : String est mutable',
      'Oui si hobbies n’est jamais null',
    ],
    correct: 1,
    correctWhy: 'Le constructeur stocke la référence telle quelle et le getter l’expose : l’appelant peut modifier la liste.',
    wrongWhy: 'String est immuable ; final sur la référence ne fige pas le contenu de la List.',
    javaRule: 'Immutabilité profonde : copie défensive (ou List.copyOf / unmodifiable) à l’entrée et à la sortie.',
    trap: 'Croire que private final List suffit pour l’immutabilité.',
  }),
  q({
    n: 10,
    day: 11,
    topic: 'immutability',
    stem: 'Quelle version rend Person réellement immuable (contenu de hobbies) ?',
    code: `// hobbies est List<String>`,
    choices: [
      'this.hobbies = hobbies; return hobbies;',
      'this.hobbies = List.copyOf(hobbies); return hobbies;',
      'this.hobbies = List.copyOf(hobbies); return this.hobbies;',
      'this.hobbies = new ArrayList<>(hobbies); return this.hobbies;',
    ],
    correct: 2,
    correctWhy: 'List.copyOf crée une copie non modifiable ; renvoyer this.hobbies n’expose plus une liste mutable.',
    wrongWhy: 'Renvoyer la liste d’origine (ou un ArrayList interne) laisse la mutation possible.',
    javaRule: 'List.copyOf refuse null et produit une liste unmodifiable (et copie si nécessaire).',
    trap: 'Copier en entrée mais renvoyer le paramètre original dans le getter.',
  }),
  q({
    n: 11,
    day: 11,
    topic: 'immutability',
    stem: 'Que produit ce code ?',
    code: `var src = new ArrayList<String>();
src.add("a");
var copy = List.copyOf(src);
src.add("b");
System.out.println(copy + " " + copy.getClass().getSimpleName());`,
    choices: [
      '[a, b] ArrayList',
      '[a] quelque chose comme ImmutableCollections$ListN / List12',
      'Erreur : copyOf n’accepte pas ArrayList',
      '[a, b] ListN',
    ],
    correct: 1,
    correctWhy: 'copyOf photographie le contenu au moment de l’appel ; les ajouts ultérieurs à src n’affectent pas copy.',
    wrongWhy: 'Ce n’est pas une vue live sur ArrayList.',
    javaRule: 'List.copyOf / Set.copyOf / Map.copyOf : copies unmodifiable indépendantes (sauf si déjà immutable de confiance).',
    trap: 'Confondre copyOf avec une vue unmodifiableList enveloppe.',
  }),
  q({
    n: 12,
    day: 11,
    topic: 'immutability',
    stem: 'Pourquoi ce « immutable » échoue encore ?',
    code: `public final class Box {
  private final StringBuilder sb;
  public Box(StringBuilder sb) { this.sb = sb; }
  public StringBuilder getSb() { return sb; }
}`,
    choices: [
      'StringBuilder ne peut pas être un champ final',
      'final empêche toute mutation de sb',
      'L’état interne de StringBuilder reste mutable via la référence partagée',
      'Il manque equals/hashCode',
    ],
    correct: 2,
    correctWhy: 'final fige la référence, pas l’objet pointé. L’appelant garde/reçoit le StringBuilder et peut append.',
    wrongWhy: 'Champ final + type mutable ≠ immutabilité profonde.',
    javaRule: 'Pour l’immutabilité : préférer des types immuables (String) ou exposer une copie / CharSequence défensive.',
    trap: 'Assimiler « final » à « immuable ».',
  }),
  q({
    n: 13,
    day: 11,
    topic: 'inheritance',
    stem: 'Que compile / affiche ce code ?',
    code: `class Parent {
  protected int value = 1;
  int get() { return value; }
}
class Child extends Parent {
  protected int value = 2;
  int get() { return value; }
}
Parent p = new Child();
System.out.println(p.value + " " + p.get());`,
    choices: ['1 1', '2 2', '1 2', '2 1'],
    correct: 2,
    correctWhy: 'Les champs ne sont pas polymorphiques : p.value voit Parent.value (1). get() est overridé → Child.value (2).',
    wrongWhy: 'Pas de dynamic binding sur les fields, seulement sur les méthodes d’instance.',
    javaRule: 'Field hiding ≠ method overriding. Accès champ = type de la référence ; méthode = type runtime.',
    trap: 'Croire que les champs sont overridés comme les méthodes.',
  }),
  q({
    n: 14,
    day: 11,
    topic: 'inheritance',
    stem: 'Lequel est un override valide (covariant return) ?',
    code: `class Animal { }
class Dog extends Animal { }
class Breeder {
  Animal breed() { return new Animal(); }
}`,
    choices: [
      'class D extends Breeder { Dog breed() { return new Dog(); } }',
      'class D extends Breeder { String breed() { return "x"; } }',
      'class D extends Breeder { Animal breed(String n) { return new Dog(); } }',
      'class D extends Breeder { private Animal breed() { return new Dog(); } }',
    ],
    correct: 0,
    correctWhy: 'Dog est un sous-type de Animal : return type covariant autorisé pour l’override.',
    wrongWhy: 'String n’est pas un sous-type d’Animal ; breed(String) est une surcharge ; private réduit la visibilité (interdit).',
    javaRule: 'Override : même signature, return covariant OK, accessibilité non réduite, exceptions checked non élargies.',
    trap: 'Confondre surcharge (paramètres différents) et override.',
  }),
  q({
    n: 15,
    day: 11,
    topic: 'inheritance',
    stem: 'Que se passe-t-il ?',
    code: `class Super {
  static String id() { return "S"; }
}
class Sub extends Super {
  static String id() { return "B"; }
}
Super s = new Sub();
System.out.println(s.id());`,
    choices: ['B', 'S', 'Erreur de compilation', 'NullPointerException'],
    correct: 1,
    correctWhy: 'Les méthodes static sont résolues sur le type de la référence (Super), pas le runtime — hiding, pas override.',
    wrongWhy: 'Pas de polymorphisme pour static.',
    javaRule: 'static / private / final ne s’overrident pas ; static est masqué (hide).',
    trap: 'Appeler une static via une instance et s’attendre à un dispatch dynamique.',
  }),
  q({
    n: 16,
    day: 11,
    topic: 'oop',
    stem: 'Quelle déclaration d’equals respecte le plus le style Java moderne (pattern matching) ?',
    choices: [
      'public boolean equals(Point o) { ... }',
      'public boolean equals(Object o) { return o instanceof Point p && x == p.x; }',
      'public boolean equals(Object o) { return this == o; } // seulement',
      'public static boolean equals(Object a, Object b) { ... }',
    ],
    correct: 1,
    correctWhy: 'La signature doit être equals(Object). Le pattern instanceof Point p est idiomatique depuis Java 16+.',
    wrongWhy: 'equals(Point) surcharge sans overrider Object.equals ; == seul ignore l’égalité de valeur.',
    javaRule: 'Override : public boolean equals(Object o). instanceof pattern évite le cast séparé.',
    trap: 'Écrire equals(Point) et croire qu’HashSet l’utilisera (il appelle equals(Object)).',
  }),
  q({
    n: 17,
    day: 11,
    topic: 'immutability',
    stem: 'Collections.unmodifiableList(list) : quelle affirmation est vraie ?',
    choices: [
      'Crée toujours une copie profonde indépendante',
      'Renvoie une vue : mutations via list d’origine sont visibles ; mutations via la vue échouent',
      'Rend list elle-même définitivement immuable',
      'Autorise add sur la vue mais pas remove',
    ],
    correct: 1,
    correctWhy: 'C’est une vue décoratrice : lecture reflète la liste de fond ; toute mutation via la vue → UnsupportedOperationException.',
    wrongWhy: 'Ce n’est pas une copie ; la liste originale reste mutable.',
    javaRule: 'unmodifiable* = vue ; List.copyOf = copie unmodifiable (souvent préférable pour l’encapsulation).',
    trap: 'Utiliser unmodifiableList et garder une référence mutable à la liste source.',
  }),
  q({
    n: 18,
    day: 11,
    topic: 'oop',
    stem: 'Inner class et membres private : que compile ?',
    code: `public class Outer {
  private int secret = 42;
  class Inner {
    int read() { return secret; }
  }
}`,
    choices: [
      'Erreur : Inner ne peut pas lire secret',
      'Compile : nested/inner accèdent aux private de Outer (et réciproquement)',
      'Compile seulement si secret est package-private',
      'Compile seulement si Inner est static',
    ],
    correct: 1,
    correctWhy: 'Les classes imbriquées font partie de la même top-level class pour le contrôle d’accès private.',
    wrongWhy: 'private n’isole pas Outer d’Inner ; le compilateur génère des accessors de package si besoin.',
    javaRule: 'Nestmates : Outer et ses nested classes partagent l’accès private.',
    trap: 'Appliquer la même règle private qu’entre deux top-level classes du même package.',
  }),
  q({
    n: 19,
    day: 11,
    topic: 'inheritance',
    stem: 'Que affiche ce programme ?',
    code: `class A {
  A() { System.out.print("A"); }
}
class B extends A {
  B() { System.out.print("B"); }
}
class C extends B {
  C() { System.out.print("C"); }
}
new C();`,
    choices: ['CBA', 'ABC', 'CAB', 'Erreur : constructeurs non chaînés'],
    correct: 1,
    correctWhy: 'Chaque constructeur appelle implicitement super() : A puis B puis C.',
    wrongWhy: 'Le chaînage remonte d’abord à Object/A, puis redescend.',
    javaRule: 'Construction : super() (explicite ou implicite) avant le corps du constructeur.',
    trap: 'Penser que le constructeur de la sous-classe s’exécute en premier.',
  }),
  q({
    n: 20,
    day: 11,
    topic: 'oop',
    stem: 'hashCode cohérent : laquelle est une bonne pratique OCP ?',
    choices: [
      'return (int) (Math.random() * 100);',
      'Utiliser les mêmes champs significatifs que equals, via Objects.hash(...)',
      'return 42; toujours (légal mais inutilement collisionnaire)',
      'Ne jamais overrider hashCode si la classe est immuable',
    ],
    correct: 1,
    correctWhy: 'Objects.hash(champs…) aligne hashCode sur equals avec une distribution acceptable.',
    wrongWhy: 'Aléatoire viole la consistance ; constant 42 est légal mais dégrade HashMap ; immuable n’exempte pas du contrat.',
    javaRule: 'hashCode déterministe, cohérent avec equals, de préférence stable si l’objet est dans une collection hash.',
    trap: 'Inclure dans hashCode un champ ignoré par equals (ou l’inverse).',
  }),
]
