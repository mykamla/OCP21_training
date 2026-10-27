import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day18: Question[] = [
  q({
    n: 1,
    day: 18,
    topic: 'streams',
    stem: 'Que produit ce pipeline ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    var result = Stream.of("a", "bb", "ccc")
      .filter(s -> s.length() > 1)
      .map(String::toUpperCase)
      .toList();
    System.out.println(result);
  }
}`,
    choices: ['[BB, CCC]', '[A, BB, CCC]', '[bb, ccc]', '[BB]', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'filter garde "bb","ccc" ; map → "BB","CCC" ; toList() (Java 16+) retourne une liste.',
    wrongWhy: '"a" est filtré (longueur 1).',
    javaRule: 'filter/map sont intermédiaires lazy ; toList() est terminal.',
    trap: 'Croire que map s’exécute avant filter dans l’ordre source.',
  }),
  q({
    n: 2,
    day: 18,
    topic: 'streams',
    stem: 'Quelle affirmation est exacte ?',
    choices: [
      'Les opérations intermédiaires sont lazy ; rien ne s’exécute sans terminal',
      'map est toujours une opération terminale',
      'filter force immédiatement le parcours de toute la source',
      'Un Stream peut être réutilisé après un forEach',
    ],
    correct: 0,
    correctWhy: 'Sans opération terminale, le pipeline ne consomme pas la source.',
    wrongWhy: 'map/filter sont intermédiaires ; un Stream est consumable une seule fois.',
    javaRule: 'Intermediate = Stream→Stream (lazy). Terminal = résultat ou effet (eager).',
    trap: 'Réutiliser un Stream déjà consommé → IllegalStateException.',
  }),
  q({
    n: 3,
    day: 18,
    topic: 'streams',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    Stream<String> s = Stream.of("a", "b");
    s.forEach(System.out::print);
    s.forEach(System.out::print);
  }
}`,
    choices: [
      'IllegalStateException',
      'abab',
      'ab',
      'Erreur de compilation',
      'Rien',
    ],
    correct: 0,
    correctWhy: 'Un Stream ne peut être consommé qu’une fois ; le 2e forEach lance IllegalStateException.',
    wrongWhy: 'Le premier forEach réussit ; le second échoue.',
    javaRule: 'Stream = one-shot. Recréer la source pour un nouveau parcours.',
    trap: 'Réutiliser la même référence Stream.',
  }),
  q({
    n: 4,
    day: 18,
    topic: 'streams',
    stem: 'Que produit ce code (piège peek) ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    Stream.of(1, 2, 3)
      .peek(System.out::print)
      .filter(n -> n > 2)
      .count();
  }
}`,
    choices: ['123', '3', '12', 'Rien', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'count() est terminal et doit parcourir les éléments ; peek voit 1,2,3 avant filter → "123".',
    wrongWhy: 'filter ne limite pas ce que peek a déjà observé en amont dans le pipeline.',
    javaRule: 'peek est intermédiaire (debug) ; son effet a lieu quand un terminal tire les éléments.',
    trap: 'Croire que peek après filter ou que count court-circuite sans tirer la source (ici non).',
  }),
  q({
    n: 5,
    day: 18,
    topic: 'streams',
    stem: 'Avec findFirst et short-circuit, que s’affiche ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    Stream.of("a", "b", "c")
      .peek(System.out::print)
      .filter(s -> s.equals("b"))
      .findFirst();
  }
}`,
    choices: ['ab', 'abc', 'b', 'a', 'Rien'],
    correct: 0,
    correctWhy: 'findFirst short-circuit : tire jusqu’à trouver "b" → peek imprime a puis b.',
    wrongWhy: '"c" n’est pas tiré grâce au court-circuit.',
    javaRule: 'findFirst/findAny/anyMatch/allMatch/noneMatch/limit peuvent short-circuiter.',
    trap: 'Assumer que peek imprime toujours toute la source.',
  }),
  q({
    n: 6,
    day: 18,
    topic: 'streams',
    stem: 'Que produit ce programme ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Optional<String> o = Optional.of("hi");
    System.out.println(o.get() + o.isPresent());
  }
}`,
    choices: ['hitrue', 'hi false', 'Optional[hi]true', 'Erreur à l’exécution', 'nulltrue'],
    correct: 0,
    correctWhy: 'get() renvoie "hi" ; isPresent() true → concaténation "hitrue".',
    wrongWhy: 'of(null) lancerait NPE ; ici la valeur est non-null.',
    javaRule: 'Optional.of(x) refuse null ; ofNullable accepte null → empty.',
    trap: 'Utiliser get() sans isPresent/orElse — anti-pattern exam.',
  }),
  q({
    n: 7,
    day: 18,
    topic: 'streams',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Optional<String> o = Optional.empty();
    System.out.println(o.get());
  }
}`,
    choices: [
      'NoSuchElementException',
      'null',
      'Optional.empty',
      'Erreur de compilation',
      '""',
    ],
    correct: 0,
    correctWhy: 'get() sur Optional vide → NoSuchElementException.',
    wrongWhy: 'Préférer orElse, orElseGet, orElseThrow, ifPresent.',
    javaRule: 'Optional.get() seulement si présent ; sinon exception.',
    trap: 'Appeler get() « pour voir » sans garde.',
  }),
  q({
    n: 8,
    day: 18,
    topic: 'streams',
    stem: 'Quelle est la sortie ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    String s = Optional.ofNullable(null)
      .orElse("default");
    System.out.println(s);
  }
}`,
    choices: ['default', 'null', 'Optional.empty', 'NullPointerException', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'ofNullable(null) → empty ; orElse fournit "default".',
    wrongWhy: 'of(null) aurait lancé NPE ; ofNullable non.',
    javaRule: 'ofNullable + orElse/orElseGet pour les valeurs absentes.',
    trap: 'Utiliser Optional.of(null).',
  }),
  q({
    n: 9,
    day: 18,
    topic: 'streams',
    stem: 'Que produit reduce ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    System.out.println(
      Stream.of(1, 2, 3).reduce(0, Integer::sum));
  }
}`,
    choices: ['6', 'Optional[6]', '123', '0', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'reduce avec identité 0 et sum → 0+1+2+3 = 6 (int/Integer, pas Optional).',
    wrongWhy: 'reduce sans identité retourne Optional ; avec identité retourne T.',
    javaRule: 'reduce(identity, op) → U ; reduce(op) → Optional<T>.',
    trap: 'Attendre Optional alors qu’une identité est fournie.',
  }),
  q({
    n: 10,
    day: 18,
    topic: 'streams',
    stem: 'Que produit ce code ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    System.out.println(
      Stream.<Integer>empty().reduce(Integer::sum));
  }
}`,
    choices: ['Optional.empty', '0', 'null', 'Optional[0]', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'reduce sans identité sur stream vide → Optional.empty (toString "Optional.empty").',
    wrongWhy: 'Sans identité, pas de zéro magique.',
    javaRule: 'reduce(BinaryOperator) → Optional.empty si aucun élément.',
    trap: 'Confondre avec reduce(0, Integer::sum) qui donnerait 0.',
  }),
  q({
    n: 11,
    day: 18,
    topic: 'streams',
    stem: 'Quelle opération est terminale ?',
    choices: [
      'collect(Collectors.toList())',
      'map(String::trim)',
      'filter(Objects::nonNull)',
      'peek(System.out::println)',
      'distinct()',
    ],
    correct: 0,
    correctWhy: 'collect est terminale ; map/filter/peek/distinct sont intermédiaires.',
    wrongWhy: 'Les intermédiaires retournent un Stream et restent lazy.',
    javaRule: 'Terminaux courants : forEach, collect, reduce, count, find*, match*, min/max, toList.',
    trap: 'Prendre peek pour un terminal parce qu’il « imprime ».',
  }),
  q({
    n: 12,
    day: 18,
    topic: 'streams',
    stem: 'Que produit ce pipeline ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    long n = Stream.of(1, 2, 2, 3)
      .distinct()
      .count();
    System.out.println(n);
  }
}`,
    choices: ['3', '4', '2', '1', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'distinct retire le doublon 2 → 1,2,3 → count = 3.',
    wrongWhy: 'count après distinct compte les uniques.',
    javaRule: 'distinct() selon equals/hashCode (étatful intermediate).',
    trap: 'Compter avant distinct mentalement.',
  }),
  q({
    n: 13,
    day: 18,
    topic: 'streams',
    stem: 'Quelle est la sortie ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    Stream.iterate(1, n -> n + 1)
      .limit(3)
      .forEach(System.out::print);
  }
}`,
    choices: ['123', '012', '111', 'Boucle infinie', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'iterate(1, n→n+1) avec limit(3) → 1,2,3.',
    wrongWhy: 'Sans limit, le stream est infini ; ici limit borne le tirage.',
    javaRule: 'Stream.iterate / generate sont souvent infinis → limit/find*/match obligatoires.',
    trap: 'Oublier limit sur iterate/generate.',
  }),
  q({
    n: 14,
    day: 18,
    topic: 'streams',
    stem: 'Que produit anyMatch sur un stream vide ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    System.out.println(Stream.empty().anyMatch(x -> true));
    System.out.println(Stream.empty().allMatch(x -> false));
    System.out.println(Stream.empty().noneMatch(x -> true));
  }
}`,
    choices: [
      'false / true / true',
      'true / true / true',
      'false / false / false',
      'false / true / false',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Vide : anyMatch→false ; allMatch→true (vacuous) ; noneMatch→true.',
    wrongWhy: 'allMatch/noneMatch sur vide sont vrai par convention logique.',
    javaRule: 'Sur stream vide : anyMatch false ; allMatch et noneMatch true.',
    trap: 'Croire que allMatch(false pred) sur vide est false.',
  }),
  q({
    n: 15,
    day: 18,
    topic: 'streams',
    stem: 'Que produit ce code Optional + map ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Optional<String> o = Optional.of("java")
      .map(String::toUpperCase)
      .filter(s -> s.length() > 10);
    System.out.println(o.orElse("none"));
  }
}`,
    choices: ['none', 'JAVA', 'java', 'Optional.empty', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'map → "JAVA" ; filter longueur>10 échoue → empty → orElse "none".',
    wrongWhy: 'filter sur Optional vide/échoué produit empty, pas la valeur filtrée.',
    javaRule: 'Optional.map/flatMap/filter renvoient Optional ; chaînage idiomatique.',
    trap: 'Utiliser get() après filter sans vérifier.',
  }),
  q({
    n: 16,
    day: 18,
    topic: 'streams',
    stem: 'Quelle est la différence entre map et flatMap sur Stream ?',
    choices: [
      'flatMap aplatit un Stream de Streams (ou de collections via stream()) en un Stream',
      'map aplatit toujours les listes imbriquées',
      'flatMap est une opération terminale',
      'map interdit les types génériques',
    ],
    correct: 0,
    correctWhy: 'flatMap(Function<T, Stream<R>>) fusionne les streams internes.',
    wrongWhy: 'map(Function<T,R>) enveloppe chaque résultat ; une List reste un élément.',
    javaRule: 'map → 1:1 ; flatMap → 1:N aplati.',
    trap: 'Faire map(List::stream) et obtenir Stream<Stream<...>>.',
  }),
  q({
    n: 17,
    day: 18,
    topic: 'streams',
    stem: 'Que produit ce programme ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    var v = Stream.of("x", "y")
      .findAny()
      .orElse("z");
    System.out.println(v.length());
  }
}`,
    choices: ['1', '0', 'z', 'Erreur de compilation', '2'],
    correct: 0,
    correctWhy: 'findAny sur stream séquentiel non vide renvoie un élément ("x" ou "y") ; length = 1.',
    wrongWhy: 'orElse n’est pas utilisé car Optional est présent.',
    javaRule: 'findAny peut être non déterministe en parallèle ; séquentiel → souvent le premier.',
    trap: 'Assumer findAny → "z" ou une longueur de chaîne concaténée.',
  }),
  q({
    n: 18,
    day: 18,
    topic: 'streams',
    stem: 'Que se passe-t-il avec sorted et Comparator null ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    Stream.of("b", "a", "c")
      .sorted()
      .forEach(System.out::print);
  }
}`,
    choices: ['abc', 'bac', 'cba', 'Erreur de compilation', 'ClassCastException'],
    correct: 0,
    correctWhy: 'sorted() sans argument utilise l’ordre naturel Comparable → a,b,c.',
    wrongWhy: 'L’ordre d’insertion n’est pas préservé après sorted.',
    javaRule: 'sorted() / sorted(Comparator) sont intermédiaires stateful.',
    trap: 'Attendre l’ordre d’origine après sorted().',
  }),
  q({
    n: 19,
    day: 18,
    topic: 'streams',
    stem: 'Pourquoi ce code est-il problématique à l’exam ?',
    code: `List<String> side = new ArrayList<>();
Stream.of("a", "b").peek(side::add).count();`,
    choices: [
      'peek pour des effets de bord métier est déconseillé / non fiable (surtout parallèle)',
      'count() ne déclenche jamais peek',
      'ArrayList ne peut pas être capturée',
      'Le code ne compile pas',
    ],
    correct: 0,
    correctWhy: 'peek est prévu pour le debug ; s’y fier pour muter un état partagé est un piège (parallèle, optimisation).',
    wrongWhy: 'Le code compile et count tire les éléments, mais le style est un anti-pattern.',
    javaRule: 'Préférer forEach (terminal) pour les effets ; garder peek pour le diagnostic.',
    trap: 'Construire une logique métier critique dans peek.',
  }),
  q({
    n: 20,
    day: 18,
    topic: 'streams',
    stem: 'Que produit min sur des chaînes ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    System.out.println(
      Stream.of("bb", "a", "ccc")
        .min(String::compareTo)
        .orElse("none"));
  }
}`,
    choices: ['a', 'bb', 'ccc', 'none', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Ordre lexicographique : "a" < "bb" < "ccc" → min = "a".',
    wrongWhy: 'min selon longueur demanderait Comparator.comparingInt(String::length).',
    javaRule: 'min/max(Comparator) → Optional<T> ; stream vide → empty.',
    trap: 'Confondre ordre naturel et tri par longueur.',
  }),
]
