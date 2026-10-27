import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day17: Question[] = [
  q({
    n: 1,
    day: 17,
    topic: 'lambdas',
    stem: 'Quelle interface fonctionnelle correspond à (String s) -> s.length() > 0 ?',
    choices: [
      'Predicate<String>',
      'Function<String, Integer>',
      'Consumer<String>',
      'Supplier<Boolean>',
      'UnaryOperator<String>',
    ],
    correct: 0,
    correctWhy: 'Un Predicate<T> prend T et retourne boolean — ici test sur String.',
    wrongWhy: 'Function retournerait Integer ; Consumer ne retourne rien ; Supplier ne prend rien.',
    javaRule: 'Predicate<T> : T → boolean. Les interfaces java.util.function couvrent les cas courants.',
    trap: 'Choisir Function parce que length() retourne int.',
  }),
  q({
    n: 2,
    day: 17,
    topic: 'lambdas',
    stem: 'Que produit ce programme ?',
    code: `import java.util.function.*;
public class Main {
  public static void main(String[] args) {
    Function<String, Integer> f = String::length;
    System.out.println(f.apply("Java"));
  }
}`,
    choices: ['4', 'Java', 'Erreur de compilation', 'null', '5'],
    correct: 0,
    correctWhy: 'String::length est une method reference d’instance liée au type → length de "Java" = 4.',
    wrongWhy: 'apply exécute bien length() sur l’argument.',
    javaRule: 'Type::instanceMethod ≡ (x) -> x.instanceMethod() quand les signatures collent.',
    trap: 'Croire qu’il faut une instance concrète pour String::length.',
  }),
  q({
    n: 3,
    day: 17,
    topic: 'lambdas',
    stem: 'Lequel compile ?',
    code: `interface Op { int apply(int a, int b); }`,
    choices: [
      'Op add = (a, b) -> a + b;',
      'Op add = a, b -> a + b;',
      'Op add = (int a, b) -> a + b;',
      'Op add = (var a, b) -> a + b;',
    ],
    correct: 0,
    correctWhy: 'Les deux paramètres doivent être tous typés explicitement, tous en var, ou tous inférés — ici inférence OK.',
    wrongWhy: 'Mélanger types/omission, ou omettre les parenthèses pour 2 params, est illégal.',
    javaRule: 'Lambda : 0/1 param sans type peut omettre () ; ≥2 params → parenthèses. Pas de mélange var/explicite/inféré.',
    trap: 'Écrire (int a, b) ou (var a, b) en mélangeant les styles.',
  }),
  q({
    n: 4,
    day: 17,
    topic: 'lambdas',
    stem: 'Pourquoi ce code ne compile-t-il pas ?',
    code: `public class Main {
  public static void main(String[] args) {
    int x = 1;
    x++;
    Runnable r = () -> System.out.println(x);
  }
}`,
    choices: [
      'x n’est plus effectively final',
      'Runnable n’est pas une interface fonctionnelle',
      'println ne peut pas capturer d’int',
      'Il manque @FunctionalInterface',
    ],
    correct: 0,
    correctWhy: 'Après x++, la variable locale n’est plus effectively final ; la lambda ne peut pas la capturer.',
    wrongWhy: 'Runnable est bien fonctionnelle ; @FunctionalInterface est optionnelle.',
    javaRule: 'Variables locales capturées par une lambda/classe interne : final ou effectively final.',
    trap: 'Modifier une locale après (ou avant) sa capture dans une lambda.',
  }),
  q({
    n: 5,
    day: 17,
    topic: 'lambdas',
    stem: 'Que produit ce code ?',
    code: `import java.util.function.*;
public class Main {
  public static void main(String[] args) {
    int factor = 3;
    IntUnaryOperator op = n -> n * factor;
    System.out.println(op.applyAsInt(4));
  }
}`,
    choices: ['12', '4', '3', 'Erreur de compilation', '0'],
    correct: 0,
    correctWhy: 'factor est effectively final ; 4 * 3 = 12.',
    wrongWhy: 'La capture d’une locale effectively final est autorisée.',
    javaRule: 'Effectively final = assignée une seule fois, jamais réassignée ensuite.',
    trap: 'Croire que toute capture locale est interdite.',
  }),
  q({
    n: 6,
    day: 17,
    topic: 'lambdas',
    stem: 'Quelle method reference est équivalente à () -> new ArrayList<String>() ?',
    choices: [
      'ArrayList::new',
      'ArrayList<String>::new',
      'new ArrayList<>()',
      'List::of',
      'Collections::emptyList',
    ],
    correct: 0,
    correctWhy: 'ArrayList::new est une constructor reference ; le type cible fixe les paramètres de type.',
    wrongWhy: 'ArrayList<String>::new est une syntaxe invalide pour une method reference.',
    javaRule: 'ClassName::new référence un constructeur compatible avec l’interface cible (Supplier, Function…).',
    trap: 'Écrire ArrayList<String>::new (syntaxe incorrecte).',
  }),
  q({
    n: 7,
    day: 17,
    topic: 'lambdas',
    stem: 'Que produit ce programme ?',
    code: `import java.util.function.*;
public class Main {
  static String greet(String name) { return "Hi " + name; }
  public static void main(String[] args) {
    Function<String, String> f = Main::greet;
    System.out.println(f.apply("Ana"));
  }
}`,
    choices: ['Hi Ana', 'Ana', 'Hi ', 'Erreur de compilation', 'null'],
    correct: 0,
    correctWhy: 'Main::greet référence la méthode static greet → "Hi Ana".',
    wrongWhy: 'La signature static (String)→String colle à Function<String,String>.',
    javaRule: 'Class::staticMethod ≡ (args) -> Class.staticMethod(args).',
    trap: 'Penser qu’il faut une instance pour toute method reference.',
  }),
  q({
    n: 8,
    day: 17,
    topic: 'lambdas',
    stem: 'Quelle affirmation sur Consumer et BiConsumer est vraie ?',
    choices: [
      'accept ne retourne pas de valeur (void)',
      'Consumer doit retourner boolean',
      'BiConsumer prend trois arguments',
      'andThen n’existe que sur Function',
    ],
    correct: 0,
    correctWhy: 'Consumer/BiConsumer exposent accept(...) void ; andThen compose aussi les consumers.',
    wrongWhy: 'Predicate retourne boolean ; BiConsumer prend deux args ; andThen existe sur Consumer.',
    javaRule: 'Consumer<T>.accept(T) ; BiConsumer<T,U>.accept(T,U) — effets de bord, pas de résultat.',
    trap: 'Confondre Consumer avec Function ou Predicate.',
  }),
  q({
    n: 9,
    day: 17,
    topic: 'lambdas',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<String> list = new ArrayList<>(List.of("a", "b"));
    list.replaceAll(String::toUpperCase);
    System.out.println(list);
  }
}`,
    choices: ['[A, B]', '[a, b]', 'Erreur de compilation', 'UnsupportedOperationException', '[AA, BB]'],
    correct: 0,
    correctWhy: 'replaceAll attend UnaryOperator ; String::toUpperCase transforme chaque élément.',
    wrongWhy: 'ArrayList mutable : replaceAll est supporté.',
    javaRule: 'List.replaceAll(UnaryOperator<E>) mute la liste en place.',
    trap: 'Utiliser List.of directement (immuable) avec replaceAll → UOE.',
  }),
  q({
    n: 10,
    day: 17,
    topic: 'lambdas',
    stem: 'Lequel est un Supplier<String> valide ?',
    choices: [
      '() -> "ok"',
      's -> "ok"',
      '(String s) -> s',
      'x -> x.length()',
    ],
    correct: 0,
    correctWhy: 'Supplier<T> : () → T, aucun paramètre.',
    wrongWhy: 'Les autres ont un paramètre → Function/UnaryOperator/ToIntFunction, pas Supplier.',
    javaRule: 'Supplier<T>.get() ; IntSupplier/LongSupplier/BooleanSupplier pour les primitives.',
    trap: 'Ajouter un paramètre inutile à un Supplier.',
  }),
  q({
    n: 11,
    day: 17,
    topic: 'lambdas',
    stem: 'Que produit ce code ?',
    code: `import java.util.function.*;
public class Main {
  public static void main(String[] args) {
    BinaryOperator<Integer> op = Integer::sum;
    System.out.println(op.apply(2, 3));
  }
}`,
    choices: ['5', '23', 'Erreur de compilation', 'null', '2'],
    correct: 0,
    correctWhy: 'Integer.sum(2,3) via method reference → 5.',
    wrongWhy: 'BinaryOperator<T> extends BiFunction<T,T,T> ; Integer::sum colle parfaitement.',
    javaRule: 'BinaryOperator<T> : (T,T)→T. Utile pour reduce, merge, etc.',
    trap: 'Lire sum comme concaténation de String.',
  }),
  q({
    n: 12,
    day: 17,
    topic: 'lambdas',
    stem: 'Pourquoi ce code échoue à la compilation ?',
    code: `interface Two {
  void a();
  void b();
}
public class Main {
  public static void main(String[] args) {
    Two t = () -> System.out.println("x");
  }
}`,
    choices: [
      'Two n’est pas une interface fonctionnelle (deux méthodes abstraites)',
      'La lambda devrait retourner une valeur',
      'Il manque implements',
      'println est checked',
    ],
    correct: 0,
    correctWhy: 'Une interface fonctionnelle n’a qu’une seule méthode abstraite (SAM).',
    wrongWhy: 'Les méthodes default/static ne comptent pas ; ici a() et b() sont toutes deux abstraites.',
    javaRule: 'SAM : une seule abstract method. Object methods (equals…) ne comptent pas.',
    trap: 'Annoter @FunctionalInterface sur une interface à 2 abstracts (erreur de compilation).',
  }),
  q({
    n: 13,
    day: 17,
    topic: 'lambdas',
    stem: 'Quelle expression est équivalente à list.forEach(s -> System.out.println(s)) ?',
    choices: [
      'list.forEach(System.out::println)',
      'list.forEach(System.out.println)',
      'list.forEach(System::out.println)',
      'list.forEach(println)',
    ],
    correct: 0,
    correctWhy: 'System.out::println est une method reference sur l’instance PrintStream out.',
    wrongWhy: 'System.out.println sans :: n’est pas une référence ; System::out.println est invalide.',
    javaRule: 'instance::method — ici out est l’instance de PrintStream.',
    trap: 'Écrire System::out.println (syntaxe incorrecte).',
  }),
  q({
    n: 14,
    day: 17,
    topic: 'lambdas',
    stem: 'Que produit ce programme ?',
    code: `import java.util.function.*;
public class Main {
  public static void main(String[] args) {
    Predicate<String> p = s -> s.isEmpty();
    Predicate<String> q = Predicate.not(p);
    System.out.println(q.test("x") + " " + p.negate().test(""));
  }
}`,
    choices: ['true false', 'false true', 'true true', 'false false', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'q = not(isEmpty) → "x" non vide → true ; p.negate().test("") → !true → false.',
    wrongWhy: 'Predicate.not et negate inversent le test.',
    javaRule: 'Predicate.not(p) (Java 11+) ≡ p.negate() ; and/or pour composer.',
    trap: 'Se tromper sur negate() appliqué à une chaîne vide.',
  }),
  q({
    n: 15,
    day: 17,
    topic: 'lambdas',
    stem: 'Que se passe-t-il avec cette capture de champ ?',
    code: `public class Box {
  int value = 1;
  void run() {
    value++;
    Runnable r = () -> System.out.println(value);
    r.run();
  }
  public static void main(String[] args) { new Box().run(); }
}`,
    choices: ['Affiche 2', 'Erreur de compilation (value pas final)', 'Affiche 1', 'NullPointerException'],
    correct: 0,
    correctWhy: 'Les champs d’instance n’ont pas besoin d’être effectively final ; la lambda capture this.',
    wrongWhy: 'La règle effectively final ne s’applique qu’aux variables locales / paramètres.',
    javaRule: 'Lambda capture this implicitement pour les champs ; locales = effectively final.',
    trap: 'Appliquer la règle effectively final aux champs d’instance.',
  }),
  q({
    n: 16,
    day: 17,
    topic: 'lambdas',
    stem: 'Quelle Function compose correctement f puis g (g(f(x))) ?',
    code: `Function<Integer, Integer> f = x -> x + 1;
Function<Integer, Integer> g = x -> x * 2;`,
    choices: [
      'f.andThen(g)',
      'f.compose(g)',
      'g.andThen(f)',
      'Function.identity().compose(f).andThen(f)',
    ],
    correct: 0,
    correctWhy: 'andThen applique d’abord this (f) puis after (g) → g(f(x)).',
    wrongWhy: 'compose(g) ferait f(g(x)) ; g.andThen(f) ferait f(g(x)).',
    javaRule: 'f.andThen(g) = g∘f ; f.compose(g) = f∘g.',
    trap: 'Inverser andThen et compose.',
  }),
  q({
    n: 17,
    day: 17,
    topic: 'lambdas',
    stem: 'Que produit ce code ?',
    code: `import java.util.*;
import java.util.function.*;
public class Main {
  public static void main(String[] args) {
    BiFunction<String, String, String> join = String::concat;
    System.out.println(join.apply("X", "Y"));
  }
}`,
    choices: ['XY', 'YX', 'Erreur de compilation', 'X', 'null'],
    correct: 0,
    correctWhy: 'String::concat comme BiFunction → premier arg = récepteur, second = argument → "X".concat("Y").',
    wrongWhy: 'Pour une instance method, le 1er paramètre de la FI est l’instance.',
    javaRule: 'Type::instanceMethod avec BiFunction/BiConsumer : (instance, arg) → instance.method(arg).',
    trap: 'Inverser récepteur et argument dans la method reference.',
  }),
  q({
    n: 18,
    day: 17,
    topic: 'lambdas',
    stem: 'Lequel compile avec une lambda à corps d’expression retournant void ?',
    code: `interface Job { void run(String s); }`,
    choices: [
      'Job j = s -> System.out.println(s);',
      'Job j = s -> { return System.out.println(s); };',
      'Job j = (String s) -> return;',
      'Job j = s -> return System.out.println(s);',
    ],
    correct: 0,
    correctWhy: 'println retourne void ; en expression-body, c’est compatible avec void run.',
    wrongWhy: 'return System.out.println(...) est illégal (return d’une expression void).',
    javaRule: 'Lambda void : corps statement OK ; return expr interdit si expr est void.',
    trap: 'Écrire return System.out.println(x) dans une lambda.',
  }),
  q({
    n: 19,
    day: 17,
    topic: 'lambdas',
    stem: 'Que produit ce programme ?',
    code: `import java.util.function.*;
public class Main {
  public static void main(String[] args) {
    UnaryOperator<String> u = UnaryOperator.identity();
    System.out.println(u.apply("z").equals(Function.identity().apply("z")));
  }
}`,
    choices: ['true', 'false', 'Erreur de compilation', 'null', 'z'],
    correct: 0,
    correctWhy: 'identity() renvoie son argument ; les deux appliquent "z" → equals true.',
    wrongWhy: 'UnaryOperator.identity() et Function.identity() se comportent de même ici.',
    javaRule: 'Function.identity() / UnaryOperator.identity() : t → t.',
    trap: 'Comparer les références des fonctions plutôt que leurs résultats.',
  }),
  q({
    n: 20,
    day: 17,
    topic: 'lambdas',
    stem: 'Quelle est la sortie ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<Integer> nums = Arrays.asList(1, 2, 3);
    nums.replaceAll(n -> n * 2);
    nums.removeIf(n -> n > 4);
    System.out.println(nums);
  }
}`,
    choices: ['[2, 4]', '[1, 2, 3]', '[2, 4, 6]', '[4]', 'UnsupportedOperationException'],
    correct: 0,
    correctWhy: 'replaceAll → [2,4,6] ; removeIf(n>4) retire 6 → [2,4]. Arrays.asList autorise set/replaceAll/removeIf.',
    wrongWhy: 'asList interdit add/remove par index structurel via add, mais removeIf et replaceAll sont OK (set).',
    javaRule: 'removeIf(Predicate) / replaceAll(UnaryOperator) sur List concrète mutable.',
    trap: 'Confondre avec List.of (vraiment immuable) qui lancerait UOE.',
  }),
]
