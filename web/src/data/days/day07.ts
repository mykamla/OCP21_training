import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day07: Question[] = [
  q({
    n: 1,
    day: 7,
    topic: 'inheritance',
    stem: 'Quel est le résultat ?',
    code: `class Animal {
  String speak() { return "quiet"; }
}
class Dog extends Animal {
  @Override
  String speak() { return "woof"; }
}
public class Test {
  public static void main(String[] args) {
    Animal a = new Dog();
    System.out.println(a.speak());
  }
}`,
    choices: ['quiet', 'woof', 'Erreur de compilation', 'null'],
    correct: 1,
    correctWhy:
      'speak() est une méthode d’instance : liaison dynamique → Dog.speak() malgré le type statique Animal.',
    wrongWhy:
      'Le type de la référence ne fige pas la méthode d’instance overridable.',
    javaRule:
      'Le polymorphisme d’instance choisit l’implémentation selon le type réel à l’exécution.',
    trap: 'Confondre type statique et type dynamique.',
  }),
  q({
    n: 2,
    day: 7,
    topic: 'inheritance',
    stem: 'Que se passe-t-il ?',
    code: `class Animal {
  static String kind() { return "Animal"; }
}
class Dog extends Animal {
  static String kind() { return "Dog"; }
}
public class Test {
  public static void main(String[] args) {
    Animal a = new Dog();
    System.out.println(a.kind());
  }
}`,
    choices: ['Dog', 'Animal', 'Erreur de compilation', 'Erreur d’exécution'],
    correct: 1,
    correctWhy:
      'Les méthodes static ne s’override pas : elles se masquent (hiding). L’appel via une référence Animal résout Animal.kind().',
    wrongWhy:
      'Pas de liaison dynamique pour static. Le code compile (appel via instance déconseillé mais légal).',
    javaRule:
      'static : résolution à la compilation selon le type de la référence (hiding, pas overriding).',
    trap: 'Attendre du polymorphisme sur une méthode static.',
  }),
  q({
    n: 3,
    day: 7,
    topic: 'inheritance',
    stem: 'Quelle affirmation est correcte ?',
    code: `class Parent {
  Number value() { return 1; }
}
class Child extends Parent {
  @Override
  Integer value() { return 2; }
}`,
    choices: [
      'Erreur : le type de retour doit être identique',
      'Compile : retour covariant (Integer <: Number)',
      'Compile seulement sans @Override',
      'Erreur : Integer n’est pas un Number',
    ],
    correct: 1,
    correctWhy:
      'Depuis Java 5, une méthode overridée peut renvoyer un sous-type du type de retour de la méthode parente (covariant return).',
    wrongWhy:
      '@Override est optionnel mais recommandé. Integer est un Number.',
    javaRule:
      'Retours covariants autorisés pour l’override d’instance.',
    trap: 'Exiger l’égalité stricte des types de retour.',
  }),
  q({
    n: 4,
    day: 7,
    topic: 'inheritance',
    stem: 'Ce code compile-t-il ?',
    code: `class Base {
  void m() {}
}
class Sub extends Base {
  @Override
  void m() throws Exception {}
}`,
    choices: [
      'Oui',
      'Non : une checked exception plus large / nouvelle n’est pas autorisée à l’override',
      'Oui si Exception est unchecked',
      'Non à cause de @Override seulement',
    ],
    correct: 1,
    correctWhy:
      'À l’override, on ne peut pas ajouter de checked exceptions absentes (ou plus générales) de la méthode parente.',
    wrongWhy:
      'Exception est checked. @Override n’est pas la cause ; il révèle l’incompatibilité.',
    javaRule:
      'Override : exceptions checked ⊆ celles déclarées (ou non) par la méthode surchargée au sens override.',
    trap: 'Élargir throws à Exception sur une méthode sans throws.',
  }),
  q({
    n: 5,
    day: 7,
    topic: 'inheritance',
    stem: 'Résultat ?',
    code: `class A {
  A() { System.out.print("A"); }
}
class B extends A {
  B() { System.out.print("B"); }
}
class C extends B {
  C() { System.out.print("C"); }
  public static void main(String[] args) {
    new C();
  }
}`,
    choices: ['CBA', 'ABC', 'CAB', 'Erreur : super manquant'],
    correct: 1,
    correctWhy:
      'Chaque constructeur appelle implicitement super() : A puis B puis C → ABC.',
    wrongWhy:
      'super() implicite est valide si le parent a un constructeur sans argument accessible.',
    javaRule:
      'Construction : chaîne des super-constructeurs de la racine vers la classe concrète.',
    trap: 'Inverser l’ordre d’affichage des constructeurs.',
  }),
  q({
    n: 6,
    day: 7,
    topic: 'inheritance',
    stem: 'Que compile ?',
    code: `class Super {
  Super(int x) {}
}
class Sub extends Super {
  // ?
}`,
    choices: [
      'Sub() {}  // super() implicite',
      'Sub() { super(1); }',
      'Sub() { this(1); } sans autre constructeur',
      'Sub(int x) { } sans super',
    ],
    correct: 1,
    correctWhy:
      'Super n’a plus de constructeur no-arg ; Sub doit appeler explicitement super(int).',
    wrongWhy:
      'super() implicite échoue. this(1) sans constructeur Sub(int) échoue aussi.',
    javaRule:
      'Si la superclasse n’expose pas de constructeur accessible sans argument, appeler super(...) explicitement.',
    trap: 'Compter sur le constructeur par défaut du parent alors qu’un constructeur a été déclaré.',
  }),
  q({
    n: 7,
    day: 7,
    topic: 'oop',
    stem: 'Que produit equals ici ?',
    code: `class Id {
  int n;
  Id(int n) { this.n = n; }
}
public class Test {
  public static void main(String[] args) {
    Id a = new Id(1);
    Id b = new Id(1);
    System.out.println(a.equals(b) + " " + (a == b));
  }
}`,
    choices: ['true true', 'true false', 'false false', 'false true'],
    correct: 2,
    correctWhy:
      'Sans override, Object.equals compare l’identité (==). a et b sont des instances distinctes → false false.',
    wrongWhy:
      '== n’est true que pour la même référence. equals par défaut ≠ égalité structurelle.',
    javaRule:
      'Object.equals par défaut ≡ == ; override nécessaire pour l’égalité métier.',
    trap: 'Supposer qu’equals compare les champs automatiquement.',
  }),
  q({
    n: 8,
    day: 7,
    topic: 'inheritance',
    stem: 'Hiding vs overriding — résultat ?',
    code: `class P {
  int x = 1;
  int get() { return x; }
}
class C extends P {
  int x = 2;
  int get() { return x; }
}
public class Test {
  public static void main(String[] args) {
    P p = new C();
    System.out.println(p.x + " " + p.get());
  }
}`,
    choices: ['1 1', '2 2', '1 2', '2 1'],
    correct: 2,
    correctWhy:
      'Les champs se masquent : p.x utilise le type statique P → 1. get() est overridée → C.get() lit C.x → 2.',
    wrongWhy:
      'Pas de polymorphisme sur les champs.',
    javaRule:
      'Champs : hiding selon le type de la référence. Méthodes d’instance : overriding.',
    trap: 'Attendre p.x == 2 via polymorphisme.',
  }),
  q({
    n: 9,
    day: 7,
    topic: 'inheritance',
    stem: 'Laquelle est une erreur de compilation ?',
    code: `class Base {
  final void lock() {}
  static void s() {}
  private void hide() {}
}
class Child extends Base {
  // laquelle est invalide ?
}`,
    choices: [
      'void lock() {}  // tentative d’override',
      'static void s() {}  // hiding static',
      'void hide() {}  // nouvelle méthode',
      'Aucune : tout compile',
    ],
    correct: 0,
    correctWhy:
      'On ne peut pas override une méthode final. Les deux autres : hiding de static OK ; hide() private n’est pas visible donc Child.hide() est une nouvelle méthode.',
    wrongWhy:
      'private n’entre pas dans l’override. static se cache légalement.',
    javaRule:
      'final empêche l’override. private n’est pas héritée au sens override.',
    trap: 'Croire que redéclarer private hide() est un override invalide.',
  }),
  q({
    n: 10,
    day: 7,
    topic: 'inheritance',
    stem: 'Accessibilité à l’override : quelle paire est illégale ?',
    choices: [
      'Parent public → Child public',
      'Parent protected → Child public',
      'Parent public → Child protected',
      'Parent protected → Child protected',
    ],
    correct: 2,
    correctWhy:
      'À l’override, on ne peut pas réduire la visibilité : public → protected est interdit.',
    wrongWhy:
      'Élargir (protected → public) est autorisé ; garder le même niveau aussi.',
    javaRule:
      'Override : accessibilité Child ≥ Parent.',
    trap: 'Restreindre public en protected « pour encapsuler ».',
  }),
  q({
    n: 11,
    day: 7,
    topic: 'oop',
    stem: 'Que fait getClass() ici ?',
    code: `class A {}
class B extends A {}
public class Test {
  public static void main(String[] args) {
    A x = new B();
    System.out.println(x.getClass().getSimpleName());
  }
}`,
    choices: ['A', 'B', 'Object', 'Erreur de compilation'],
    correct: 1,
    correctWhy:
      'getClass() renvoie la Class de l’objet réel (runtime) : B.',
    wrongWhy:
      'Le type de la variable A n’est pas ce que getClass rapporte.',
    javaRule:
      'Object.getClass() → type dynamique ; final, non overridable.',
    trap: 'Confondre getClass() avec le type statique.',
  }),
  q({
    n: 12,
    day: 7,
    topic: 'inheritance',
    stem: 'abstract & héritage — lequel compile ?',
    code: `abstract class Shape {
  abstract double area();
}
// candidats`,
    choices: [
      'class Circle extends Shape { }',
      'abstract class Polygon extends Shape { }',
      'class Square extends Shape { double area; }',
      'final abstract class X extends Shape { abstract double area(); }',
    ],
    correct: 1,
    correctWhy:
      'Une sous-classe peut rester abstract sans implémenter area(). Circle/Square concrets doivent implémenter area(). final abstract est contradictoire.',
    wrongWhy:
      'Un champ area ne satisfait pas une méthode abstraite.',
    javaRule:
      'Classe concrète ⇒ toutes les méthodes abstract héritées implémentées. final et abstract s’excluent.',
    trap: 'Oublier d’implémenter abstract dans une classe concrète.',
  }),
  q({
    n: 13,
    day: 7,
    topic: 'inheritance',
    stem: 'Résultat ?',
    code: `class Parent {
  void show() { System.out.print("P"); }
}
class Child extends Parent {
  void show() { System.out.print("C"); }
  void print() {
    show();
    super.show();
  }
  public static void main(String[] args) {
    new Child().print();
  }
}`,
    choices: ['PP', 'CC', 'CP', 'PC'],
    correct: 2,
    correctWhy:
      'show() dans Child appelle la version overridée (C) ; super.show() appelle Parent (P) → CP.',
    wrongWhy:
      'super.méthode() contourne l’override pour appeler la version parente.',
    javaRule:
      'super.m() : invocation non virtuelle de la méthode de la superclasse.',
    trap: 'Penser que show() depuis Child appelle encore Parent.',
  }),
  q({
    n: 14,
    day: 7,
    topic: 'oop',
    stem: 'hashCode / equals — quelle règle est exigée par le contrat Object ?',
    choices: [
      'Si a.equals(b) alors a.hashCode() == b.hashCode()',
      'Si a.hashCode() == b.hashCode() alors a.equals(b)',
      'hashCode doit être unique pour chaque objet',
      'equals doit utiliser == en premier toujours',
    ],
    correct: 0,
    correctWhy:
      'Égalité true ⇒ mêmes hashCodes. L’inverse est faux (collisions). Unicité stricte non requise.',
    wrongWhy:
      'hashCode égal n’implique pas equals. Unicité globale n’est pas dans le contrat.',
    javaRule:
      'Contrat equals/hashCode : égalité ⇒ hash égal ; cohérence, réflexivité, symétrie, transitivité.',
    trap: 'Inverser l’implication hashCode ⇒ equals.',
  }),
  q({
    n: 15,
    day: 7,
    topic: 'inheritance',
    stem: 'Casts — que se passe-t-il ?',
    code: `class A {}
class B extends A {}
class C extends A {}
public class Test {
  public static void main(String[] args) {
    A a = new B();
    C c = (C) a;
  }
}`,
    choices: [
      'Compile et s’exécute',
      'Erreur de compilation',
      'Compile puis ClassCastException',
      'NullPointerException',
    ],
    correct: 2,
    correctWhy:
      'Le cast (C) est autorisé à la compilation (A peut être C) mais échoue à l’exécution car l’objet est un B.',
    wrongWhy:
      'Le compilateur n’interdit pas tout downcast sibling. NPE non concerné.',
    javaRule:
      'Downcast : vérifié à l’exécution ; ClassCastException si incompatible.',
    trap: 'Croire que tout cast entre sous-types d’A compile et réussit.',
  }),
  q({
    n: 16,
    day: 7,
    topic: 'inheritance',
    stem: 'Méthode package-private overridée hors package ?',
    code: `// package p1
public class Base {
  void m() { System.out.print("B"); } // package-private
}
// package p2
public class Sub extends p1.Base {
  void m() { System.out.print("S"); }
}`,
    choices: [
      'Sub.m override vraiment Base.m',
      'Sub.m ne override pas : Base.m n’est pas accessible pour override hors package',
      'Erreur : extends d’une classe public hors package interdit',
      'Les deux m fusionnent en une seule méthode',
    ],
    correct: 1,
    correctWhy:
      'Une méthode package-private n’est overridable que dans le même package. Hors package, Sub.m est une méthode distincte (pas un override ; @Override échouerait).',
    wrongWhy:
      'Étendre une classe public hors package est autorisé ; c’est la méthode package-private qui n’est pas héritée pour override.',
    javaRule:
      'Override requiert que la méthode soit visible/inherited ; sinon ce n’est pas un override.',
    trap: 'Ajouter @Override hors package sur une méthode package-private du parent.',
  }),
  q({
    n: 17,
    day: 7,
    topic: 'oop',
    stem: 'toString par défaut — forme typique ?',
    code: `class Thing {}
System.out.println(new Thing());`,
    choices: [
      'Thing@<hashHex> (nom de classe + @ + Integer.toHexString(hashCode()))',
      'Thing{}',
      'null',
      'Adresse mémoire native garantie',
    ],
    correct: 0,
    correctWhy:
      'Object.toString() ≈ getClass().getName() + "@" + Integer.toHexString(hashCode()).',
    wrongWhy:
      'Ce n’est pas une dump JSON. hashCode n’est pas une adresse native garantie.',
    javaRule:
      'toString par défaut basé sur le nom de classe et hashCode.',
    trap: 'Lire toString comme une adresse physique.',
  }),
  q({
    n: 18,
    day: 7,
    topic: 'inheritance',
    stem: 'constructeur et polymorphisme — piège classique. Affichage ?',
    code: `class Super {
  Super() { m(); }
  void m() { System.out.print("S"); }
}
class Sub extends Super {
  int x = 1;
  void m() { System.out.print(x); }
  public static void main(String[] args) {
    new Sub();
  }
}`,
    choices: ['S', '1', '0', 'Erreur de compilation'],
    correct: 2,
    correctWhy:
      'Pendant Super(), l’override Sub.m() est déjà dispatchée mais x n’est pas encore initialisé (défaut 0) → affiche 0.',
    wrongWhy:
      'Ce n’est pas Super.m() si m est overridable. x=1 arrive après le retour de super().',
    javaRule:
      'Éviter d’appeler des méthodes overridables depuis un constructeur.',
    trap: 'Attendre x==1 pendant la construction du parent.',
  }),
  q({
    n: 19,
    day: 7,
    topic: 'inheritance',
    stem: 'Laquelle empêche toute sous-classe ?',
    choices: [
      'abstract class A {}',
      'final class A {}',
      'class A { int x; }',
      'sealed class A permits B {}  (B existe)',
    ],
    correct: 1,
    correctWhy:
      'final class ne peut pas être étendue. abstract et sealed autorisent (voire exigent / listent) des sous-types.',
    wrongWhy:
      'sealed permet les sous-types déclarés dans permits. abstract est conçue pour l’héritage.',
    javaRule:
      'final class ⇒ pas de extends. sealed ⇒ sous-types listés seulement.',
    trap: 'Confondre abstract (ouverte à l’extension) et final.',
  }),
  q({
    n: 20,
    day: 7,
    topic: 'oop',
    stem: 'Que compile et affiche ?',
    code: `class Box<T> {
  T value;
  Box(T value) { this.value = value; }
}
public class Test {
  public static void main(String[] args) {
    Box<String> b = new Box<>("hi");
    Object o = b;
    System.out.println(((Box<?>) o).value);
  }
}`,
    choices: [
      'hi',
      'Erreur de compilation sur le cast',
      'ClassCastException',
      'null',
    ],
    correct: 0,
    correctWhy:
      'Le cast vers Box<?> est sûr ; value est String "hi" et println l’affiche. (Lecture via ? OK ; écriture serait bornée.)',
    wrongWhy:
      'Pas de CCE ici. Box<?> est le cast approprié après effacement.',
    javaRule:
      'Wildcards et casts génériques : Box<?> accepte toute Box ; get renvoie capture.',
    trap: 'Caster en Box<String> de façon non sûrement checkable — ici Box<?> suffit.',
  }),
]
