import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day30: Question[] = [
  q({
    n: 1,
    day: 30,
    topic: 'wrappers',
    stem: 'Piège d’identité — que produit ce code ?',
    code: `Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;
System.out.println(a == b);
System.out.println(c == d);`,
    choices: [
      'true puis false (cache −128..127)',
      'true puis true',
      'false puis false',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Autoboxing utilise Integer.valueOf qui cache −128..127 par défaut. 127 partagé → == true ; 128 nouvelles instances → == false. equals serait true dans les deux cas.',
    wrongWhy: 'Le cache n’est pas infini ; 128 n’est pas garanti partagé.',
    javaRule: 'Comparer les wrappers avec equals, pas == (sauf cas pédagogiques du cache).',
    trap: 'Généraliser a == b pour tous les Integer « égaux ».',
  }),
  q({
    n: 2,
    day: 30,
    topic: 'stringbuilder',
    stem: 'Que se passe-t-il ?',
    code: `StringBuilder sb = new StringBuilder("abc");
String s = "abc";
System.out.println(sb.equals(s));
System.out.println(sb.toString().equals(s));`,
    choices: [
      'false puis true — StringBuilder n’override pas equals sur le contenu',
      'true puis true',
      'false puis false',
      'Compile error : equals interdit entre types différents',
    ],
    correct: 0,
    correctWhy: 'StringBuilder hérite equals d’Object (identité). sb.equals(s) → false même si contenu identique. toString().equals compare le contenu String → true.',
    wrongWhy: 'equals compile entre Object ; le résultat n’est pas true pour sb.equals(s).',
    javaRule: 'StringBuffer/Builder : comparer via toString() ou contenu manuel.',
    trap: 'Utiliser equals sur StringBuilder comme sur String.',
  }),
  q({
    n: 3,
    day: 30,
    topic: 'math',
    stem: 'Math.round / floorDiv — lequel est vrai ?',
    code: `System.out.println(Math.round(-2.5));
System.out.println(Math.floorDiv(-5, 2));`,
    choices: [
      '-2 puis -3',
      '-3 puis -2',
      '-2 puis -2',
      '2 puis 3',
    ],
    correct: 0,
    correctWhy: 'Math.round(double) ≈ floor(x+0.5) : -2.5 + 0.5 = -2.0 → -2. floorDiv vers −∞ : -5/2 → -3 (pas trunc vers zéro comme / sur int qui donnerait -2).',
    wrongWhy: 'La division entière Java tronque vers zéro ; floorDiv non. round(-2.5) n’est pas -3 en Java (contrairement à certaines intuitions « half away »).',
    javaRule: 'round half-up vers +∞ sur le calcul floor(x+0.5) ; floorDiv/floorMod distincts de / et %.',
    trap: 'Appliquer les règles scolaires de l’arrondi « away from zero » à Math.round.',
  }),
  q({
    n: 4,
    day: 30,
    topic: 'control-flow',
    stem: 'switch avec null (Java 21 patterns) — classic trap pré-pattern :',
    code: `String s = null;
switch (s) {
  case "a" -> System.out.print("a");
  default -> System.out.print("d");
}`,
    choices: [
      'NullPointerException en évaluant le sélecteur (sauf case null géré explicitement en switch pattern)',
      'Affiche d sans erreur toujours',
      'Affiche a',
      'Erreur de compilation : null interdit comme valeur de variable',
    ],
    correct: 0,
    correctWhy: 'Un switch classique sur une référence null lance NPE. Avec pattern matching switch, case null -> peut être géré explicitement. Ici pas de case null → NPE avant default.',
    wrongWhy: 'default ne « rattrape » pas le null du sélecteur dans le modèle classique.',
    javaRule: 'Java 21 : case null, case String s, guards when — mais null doit être couvert pour éviter NPE.',
    trap: 'Croire que default gère null comme un case.',
  }),
  q({
    n: 5,
    day: 30,
    topic: 'inheritance',
    stem: 'Que compile / s’exécute ?',
    code: `class A {
  static void s() { System.out.print("A"); }
  void i() { System.out.print("a"); }
}
class B extends A {
  static void s() { System.out.print("B"); }
  @Override void i() { System.out.print("b"); }
}
A x = new B();
x.s();
x.i();`,
    choices: [
      'Ab — static lié au type de la référence ; instance overriden',
      'Bb',
      'Aa',
      'Erreur : static ne peut pas être redéclaré',
    ],
    correct: 0,
    correctWhy: 'Les static ne s’overrident pas : appel via référence A → A.s(). Les méthodes d’instance sont virtuelles → B.i(). Affiche Ab.',
    wrongWhy: 'Hide ≠ override pour static ; @Override sur static échouerait.',
    javaRule: 'Dispatch dynamique = instance ; static/private = hide / bind statique.',
    trap: 'Attendre Bb parce que new B().',
  }),
  q({
    n: 6,
    day: 30,
    topic: 'pattern-matching',
    stem: 'Record pattern — résultat ?',
    code: `record Pair(int a, int b) {}
Object o = new Pair(1, 2);
if (o instanceof Pair(int x, int y) && x + y == 3) {
  System.out.println(x + ":" + y);
} else {
  System.out.println("no");
}`,
    choices: [
      '1:2',
      'no',
      'Erreur de compilation : record patterns interdits dans instanceof',
      'ClassCastException',
    ],
    correct: 0,
    correctWhy: 'Record patterns dans instanceof (Java 21) déstructurent Pair. 1+2==3 → true → 1:2. Pas de cast manuel.',
    wrongWhy: 'Les record patterns sont supportés ; pas de CCE.',
    javaRule: 'Nested record patterns + switch patterns = outil d’examen moderne.',
    trap: 'Réécrire avec casts (Pair)o et getters en pensant que le pattern est illégal.',
  }),
  q({
    n: 7,
    day: 30,
    topic: 'exceptions',
    stem: 'multi-catch — lequel compile ?',
    choices: [
      'catch (IOException | SQLException e) { System.out.println(e); }',
      'catch (IOException | Exception e) {} // Exception super-type de IOException',
      'catch (IOException e | SQLException e) {}',
      'catch (IOException | SQLException e) { e = null; }',
    ],
    correct: 0,
    correctWhy: 'multi-catch : types alternatives disjoints (pas sous-type l’un de l’autre), une seule variable effectivement final (pas de réassignation e = …).',
    wrongWhy: 'IOException | Exception est redondant/illégal ; une seule déclaration e ; e est final effectivement.',
    javaRule: 'Alternatives multi-catch incompatibles par sous-typage ; variable final.',
    trap: 'Réassigner e dans le multi-catch.',
  }),
  q({
    n: 8,
    day: 30,
    topic: 'arrays',
    stem: 'Piège Arrays.asList + remove :',
    code: `var list = Arrays.asList("a", "b", "c");
list.remove(1);`,
    choices: [
      'UnsupportedOperationException — liste de taille fixe adossée au tableau',
      'Enlève "b" sans erreur',
      'Erreur de compilation',
      'Enlève l’index 1 du tableau d’origine silencieusement sans exception',
    ],
    correct: 0,
    correctWhy: 'Arrays.asList est fixed-size : set OK, add/remove → UnsupportedOperationException. Ce n’est pas List.of (immuable total) ni ArrayList.',
    wrongWhy: 'remove n’est pas supporté ; ce n’est pas qu’un warning de compilation.',
    javaRule: 'asList = bridge tableau↔List taille fixe ; new ArrayList<>(asList) pour mutabilité structurelle.',
    trap: 'Confondre asList avec List.of (null policy / immuabilité différente).',
  }),
  q({
    n: 9,
    day: 30,
    topic: 'collections',
    stem: 'TreeMap avec clés mutables / compareTo inconsistent equals — risque ?',
    choices: [
      'Comportement de recherche/ordre incorrect si compareTo ≠ equals ou si la clé mute après insertion',
      'TreeMap ignore compareTo et n’utilise que hashCode',
      'Le compilateur refuse les clés non String',
      'Aucune contrainte : equals suffit toujours',
    ],
    correct: 0,
    correctWhy: 'SortedMap s’appuie sur compareTo (ou Comparator). Le contrat recommande compareTo cohérent avec equals. Muter un champ servant au tri après put casse la structure.',
    wrongWhy: 'TreeMap n’est pas hash-based (HashMap) ; les clés ne sont pas limitées à String.',
    javaRule: 'HashMap : equals/hashCode ; TreeMap : ordering contract.',
    trap: 'Utiliser TreeSet d’objets dont compareTo dit 0 mais equals false (éléments « perdus »).',
  }),
  q({
    n: 10,
    day: 30,
    topic: 'streams',
    stem: 'Piège peek / findAny parallèle :',
    code: `List.of(1,2,3).parallelStream()
  .peek(System.out::print)
  .filter(x -> x > 1)
  .findAny();`,
    choices: [
      'findAny peut renvoyer 2 ou 3 ; peek peut s’afficher hors ordre / partiel selon short-circuit',
      'Toujours 3 et peek imprime forcément 123 dans l’ordre',
      'Compile error : peek interdit en parallèle',
      'findAny renvoie toujours Optional.empty en parallèle',
    ],
    correct: 0,
    correctWhy: 'findAny est non déterministe en parallèle. Short-circuit peut éviter de peeker tous les éléments. L’ordre d’affichage n’est pas garanti.',
    wrongWhy: 'peek est autorisé mais non fiable pour la logique métier ; findAny ≠ findFirst.',
    javaRule: 'Ne pas utiliser peek pour des effets critiques ; préférer findFirst si ordre source compte.',
    trap: 'Assumer un ordre encounter strict sur parallelStream.',
  }),
  q({
    n: 11,
    day: 30,
    topic: 'streams',
    stem: 'Optional — que compile et est idiomatique pour « valeur ou lever » ?',
    choices: [
      'opt.orElseThrow(() -> new IllegalStateException("missing"))',
      'opt.getOrThrow()',
      'opt.orElse(throw new IllegalStateException())',
      'opt.orElseThrow("missing")',
    ],
    correct: 0,
    correctWhy: 'orElseThrow(Supplier) (et orElseThrow() sans arg → NoSuchElementException). get() existe mais est découragé. orElse attend une valeur, pas un throw statement. Pas getOrThrow ni orElseThrow(String).',
    wrongWhy: 'Les autres signatures sont inventées ou syntaxiquement invalides.',
    javaRule: 'orElse vs orElseGet vs orElseThrow — lazy Supplier quand coût/exception.',
    trap: 'orElse(computeExpensive()) toujours évalué même si Optional plein.',
  }),
  q({
    n: 12,
    day: 30,
    topic: 'modules',
    stem: 'exports vs opens — distinction fine :',
    choices: [
      'exports = accès compile-time aux types publics ; opens = réflexion deep runtime (setAccessible) sur le package',
      'opens remplace exports à la compilation',
      'exports autorise uniquement la réflexion, pas le code client',
      'open module ferme tous les packages',
    ],
    correct: 0,
    correctWhy: 'Sans opens/open, la réflexion forte sur non-exported/non-open échoue (InaccessibleObjectException). exports rend l’API utilisable au compile/runtime normal. open module ouvre tous les packages à la réflexion.',
    wrongWhy: 'opens ne suffit pas comme substitut d’exports pour l’usage typé compile-time.',
    javaRule: 'exports [to] ; opens [to] ; open module ; --add-opens (ops).',
    trap: 'Exporter un package et s’étonner que des fields private restent inaccessibles sans opens.',
  }),
  q({
    n: 13,
    day: 30,
    topic: 'concurrency',
    stem: 'volatile vs synchronized — affirmation exacte ?',
    choices: [
      'volatile assure visibilité/ordre pour une variable ; pas d’atomicité compound (i++)',
      'volatile rend i++ atomique sur int',
      'synchronized n’offre jamais de happens-before',
      'volatile remplace tous les locks depuis Java 21',
    ],
    correct: 0,
    correctWhy: 'volatile → visibilité. Les updates compound (read-modify-write) restent non atomiques → AtomicInteger / locks. synchronized fournit exclusion mutuelle + happens-before.',
    wrongWhy: 'i++ n’est pas atomique avec volatile seul.',
    javaRule: 'Choisir volatile (flags) vs atomic/locks (compteurs).',
    trap: 'Compteur volatile++ en concurrent et « ça marche sur mon laptop ».',
  }),
  q({
    n: 14,
    day: 30,
    topic: 'virtual-threads',
    stem: 'Pinning — scénario typique ?',
    choices: [
      'Virtual thread bloqué longtemps dans synchronized / native peut pinnner le carrier thread',
      'Tout appel System.out.println pin définitivement la JVM',
      'Pinning = erreur de compilation checked',
      'Pinning n’existe que sur Windows',
    ],
    correct: 0,
    correctWhy: 'Dans synchronized (ou code natif), un virtual thread peut rester collé à son carrier → scalabilité réduite. Préférer locks java.util.concurrent quand c’est critique. Ce n’est pas une erreur de compilation.',
    wrongWhy: 'println n’est pas « pin forever » conceptuel d’examen ; pas OS-only Windows.',
    javaRule: 'Virtual threads + moniteurs lourds = anti-pattern de perf.',
    trap: 'Envelopper toute l’I/O dans un gros synchronized « pour la sécurité ».',
  }),
  q({
    n: 15,
    day: 30,
    topic: 'nio',
    stem: 'toRealPath vs normalize — piège :',
    code: `Path p = Path.of("missing/../x.txt");
p.normalize();
p.toRealPath();`,
    choices: [
      'normalize OK (syntaxe) ; toRealPath exige en général l’existence réelle → NoSuchFileException possible',
      'Les deux échouent toujours si missing n’existe pas',
      'toRealPath ne lance jamais d’exception',
      'normalize modifie p in-place',
    ],
    correct: 0,
    correctWhy: 'Path est immuable : normalize renvoie un nouveau Path (résultat ignoré ici). toRealPath résout les liens et vérifie l’existence (sauf option NOFOLLOW selon cas) → NoSuchFileException si absent.',
    wrongWhy: 'normalize ne touche pas le disque ; Path immuable.',
    javaRule: 'Toujours récupérer le retour des transformations Path.',
    trap: 'Appeler normalize/toAbsolutePath sans utiliser la valeur retournée.',
  }),
  q({
    n: 16,
    day: 30,
    topic: 'serialization',
    stem: 'Sous-classe Serializable, superclasse avec état, sans no-arg :',
    choices: [
      'Désérialisation peut échouer (InvalidClassException) faute de no-arg accessible sur la super non-Serializable',
      'Toujours OK : le flux restaure aussi la super automatiquement',
      'NotSerializableException sur la sous-classe même si elle implémente Serializable',
      'Le compilateur refuse implements Serializable',
    ],
    correct: 0,
    correctWhy: 'Si la super n’est pas Serializable, elle doit exposer un no-arg accessible pour la désérialisation. Sinon InvalidClassException. La sous-classe peut compiler avec implements Serializable.',
    wrongWhy: 'L’état super non-Serializable n’est pas dans le flux ; ce n’est pas NotSerializableException systématique à l’écriture si la sous l’est (écriture OK, lecture problématique).',
    javaRule: 'Chaîne de constructeurs à la désérialisation jusqu’à Object via supers non-ser.',
    trap: 'Tester seulement writeObject et croire le round-trip OK.',
  }),
  q({
    n: 17,
    day: 30,
    topic: 'localization',
    stem: 'Apostrophe MessageFormat — que se passe-t-il ?',
    code: `MessageFormat.format("L'item {0}", 5);`,
    choices: [
      'L’apostrophe quote le pattern : {0} peut ne pas être substitué comme attendu',
      "Toujours « L'item 5 » garanti sur toutes versions sans subtilité",
      'Compile error',
      'MissingResourceException',
    ],
    correct: 0,
    correctWhy: "Dans MessageFormat, ' démarre une citation. Une apostrophe simple peut « manger » les placeholders. Il faut souvent '' (deux apostrophes) pour une apostrophe littérale. C’est un piège classique OCP.",
    wrongWhy: 'Ce n’est pas une ressource bundle ; ça compile.',
    javaRule: 'Doubler les apostrophes littérales dans les patterns MessageFormat.',
    trap: 'Patterns FR avec L’… et placeholders invisibles.',
  }),
  q({
    n: 18,
    day: 30,
    topic: 'enums',
    stem: 'enum et constructeur / switch — piège :',
    code: `enum Color { R, G, B;
  Color() { System.out.print("x"); }
}
System.out.print(Color.R.ordinal());`,
    choices: [
      'Affiche xxx0 — constructeur appelé une fois par constante à l’init',
      'Affiche 0 seulement — constructeur jamais appelé',
      'Affiche x0',
      'Erreur : constructeur enum doit être public',
    ],
    correct: 0,
    correctWhy: 'Chaque constante appelle le constructeur (implicite private). Trois constantes → xxx puis ordinal de R = 0. Les constructeurs d’enum sont private (explicite ou implicite), jamais public.',
    wrongWhy: 'Pas un seul appel ; public constructor illégal sur enum.',
    javaRule: 'ordinal/name/values/valueOf ; constructeurs private ; enums = Serializable spéciaux.',
    trap: 'Mettre un constructeur public sur enum.',
  }),
  q({
    n: 19,
    day: 30,
    topic: 'immutability',
    stem: 'Classe « immuable » avec champ List — faille ?',
    code: `final class Imm {
  private final List<String> items;
  Imm(List<String> items) { this.items = items; }
  public List<String> getItems() { return items; }
}`,
    choices: [
      'Pas profondément immuable : fuite de référence mutable (entrée + getter)',
      'Immuable totale car final class + final field',
      'Compile error : List interdit dans type immuable',
      'Thread-safe automatiquement sans publication safe',
    ],
    correct: 0,
    correctWhy: 'Il faut defensive copy à l’entrée et sortie (ou List.copyOf / unmodifiable). Sinon l’appelant mute la liste partagée. final empêche la réassignation du champ, pas la mutation du contenu.',
    wrongWhy: 'final ≠ immutable deep ; List est autorisée.',
    javaRule: 'Immutabilité défensive + ne pas exposer de vues mutables.',
    trap: 'Croire que private final List suffit.',
  }),
  q({
    n: 20,
    day: 30,
    topic: 'mixed',
    stem: 'Mélange sealed + switch exhaustif — que compile sans default ?',
    code: `sealed interface S permits A, B {}
final class A implements S {}
final class B implements S {}
S s = new A();
int n = switch (s) {
  case A a -> 1;
  case B b -> 2;
};`,
    choices: [
      'Compile : couverture totale des permits ; n == 1',
      'Échoue toujours sans default même si sealed complet',
      'n == 2',
      'Erreur : pattern switch interdit sur interfaces',
    ],
    correct: 0,
    correctWhy: 'Pour un type sealed dont tous les permits sont couverts par des case patterns, le switch expression est exhaustif sans default. s est A → 1.',
    wrongWhy: 'Un default n’est pas obligatoire si exhaustif ; ce n’est pas B.',
    javaRule: 'Sealed + pattern switch = exhaustivité vérifiée par le compilateur.',
    trap: 'Ajouter un nouveau permit et oublier le case → casse la compilation (souhaitable).',
  }),
]
