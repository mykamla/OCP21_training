import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day20: Question[] = [
  q({
    n: 1,
    day: 20,
    topic: 'streams',
    stem: 'Que produit ce IntStream ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    System.out.println(IntStream.range(1, 4).sum());
  }
}`,
    choices: ['6', '10', '4', '3', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'range(1,4) = 1,2,3 (fin exclusive) → somme 6.',
    wrongWhy: 'rangeClosed(1,4) inclurait 4 → 10.',
    javaRule: 'IntStream.range(start, end) fin exclusive ; rangeClosed fin inclusive.',
    trap: 'Confondre range et rangeClosed.',
  }),
  q({
    n: 2,
    day: 20,
    topic: 'streams',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    Stream<Integer> s = IntStream.range(0, 3).mapToObj(i -> i);
    System.out.println(s.toList());
  }
}`,
    choices: ['[0, 1, 2]', '[0, 1, 2, 3]', 'Erreur de compilation', '0 1 2', '[I@...]'],
    correct: 0,
    correctWhy: 'mapToObj boxe chaque int en Integer → Stream<Integer> [0,1,2].',
    wrongWhy: 'map sur IntStream reste IntStream ; mapToObj passe en Stream<T>.',
    javaRule: 'mapToObj / mapToInt / mapToLong / mapToDouble convertissent entre streams.',
    trap: 'Appeler map(i -> i) en espérant un Stream<Integer> (reste IntStream).',
  }),
  q({
    n: 3,
    day: 20,
    topic: 'streams',
    stem: 'Quelle affirmation sur average() d’IntStream est vraie ?',
    code: `IntStream.empty().average()`,
    choices: [
      'Retourne OptionalDouble.empty',
      'Retourne 0.0',
      'Retourne Optional.empty',
      'Lance NoSuchElementException',
      'Retourne null',
    ],
    correct: 0,
    correctWhy: 'Les averages primitives retournent OptionalDouble/OptionalLong, pas Optional<T>.',
    wrongWhy: 'Pas de 0.0 magique ; pas Optional (référence).',
    javaRule: 'IntStream.average() → OptionalDouble ; sum() → int (0 si vide).',
    trap: 'Traiter average() comme un double brut sans OptionalDouble.',
  }),
  q({
    n: 4,
    day: 20,
    topic: 'streams',
    stem: 'Que produit ce code ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    System.out.println(
      IntStream.of(1, 2, 3).average().getAsDouble());
  }
}`,
    choices: ['2.0', '2', 'OptionalDouble[2.0]', 'Erreur de compilation', '6.0'],
    correct: 0,
    correctWhy: 'Moyenne 2.0 ; getAsDouble() déballe OptionalDouble.',
    wrongWhy: 'Sur empty, getAsDouble() lancerait NoSuchElementException.',
    javaRule: 'OptionalDouble.getAsDouble() ; préférer orElse/orElseGet.',
    trap: 'Appeler get() (n’existe pas) sur OptionalDouble.',
  }),
  q({
    n: 5,
    day: 20,
    topic: 'streams',
    stem: 'Piège parallel findAny : quelle affirmation est correcte ?',
    code: `List.of("a", "b", "c").parallelStream().findAny()`,
    choices: [
      'Le résultat peut être a, b ou c (non déterministe)',
      'C’est toujours "a"',
      'C’est toujours "c"',
      'Lance ConcurrentModificationException',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'findAny en parallèle n’offre aucune garantie d’ordre ; findFirst respecte l’ordre encounter.',
    wrongWhy: 'findFirst serait stable quant à l’élément le plus à gauche.',
    javaRule: 'Parallèle : findAny libre ; findFirst ordonné (peut coûter plus cher).',
    trap: 'Assumer findAny == premier élément en parallelStream.',
  }),
  q({
    n: 6,
    day: 20,
    topic: 'streams',
    stem: 'Que produit forEach sur un parallelStream ordonné ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    IntStream.rangeClosed(1, 3).parallel().forEach(System.out::print);
  }
}`,
    choices: [
      'Ordre non déterministe (ex. 213, 321…)',
      'Toujours 123',
      'Toujours 321',
      'Erreur de compilation',
      'ConcurrentModificationException',
    ],
    correct: 0,
    correctWhy: 'forEach ignore l’ordre encounter en parallèle ; forEachOrdered le respecte.',
    wrongWhy: 'Ne pas compter sur l’ordre d’impression avec forEach parallèle.',
    javaRule: 'forEach vs forEachOrdered sur streams parallèles.',
    trap: 'Déboguer avec forEach parallèle en s’attendant à l’ordre source.',
  }),
  q({
    n: 7,
    day: 20,
    topic: 'lambdas',
    stem: 'Pourquoi ce reduce parallèle est-il incorrect ?',
    code: `List<String> src = List.of("a", "b", "c");
List<String> out = src.parallelStream().reduce(
  new ArrayList<>(),
  (acc, s) -> { acc.add(s); return acc; },
  (a, b) -> { a.addAll(b); return a; });`,
    choices: [
      'L’identité ArrayList est partagée entre threads (mutation concurrente non sûre)',
      'reduce est interdit en parallèle',
      'List.of ne peut pas fournir de parallelStream',
      'addAll est interdit sur ArrayList',
    ],
    correct: 0,
    correctWhy: 'Le même ArrayList d’identité est réutilisé/combiné en parallèle → courses et corruption. Préférer collect(toList()) ou un supplier d’accumulators frais.',
    wrongWhy: 'parallelStream est autorisé ; le piège est l’identité mutable partagée.',
    javaRule: 'En parallèle : identité immutable ou accumulators indépendants ; opérations associatives sans état partagé.',
    trap: 'Réutiliser une collection mutable comme identité de reduce parallèle.',
  }),
  q({
    n: 8,
    day: 20,
    topic: 'streams',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.*;
import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    List<Integer> data = new ArrayList<>(List.of(1, 2, 3));
    data.parallelStream().forEach(data::add);
    System.out.println(data.size());
  }
}`,
    choices: [
      'Comportement indéfini / risque ConcurrentModificationException ou corruption',
      'Toujours size 6',
      'Toujours size 3',
      'Erreur de compilation',
      'Toujours size 0',
    ],
    correct: 0,
    correctWhy: 'Modifier la source pendant un parallelStream n’est pas thread-safe → CME ou résultats faux.',
    wrongWhy: 'Même en séquentiel, muter la source pendant le stream est une mauvaise idée.',
    javaRule: 'Ne pas modifier la collection source pendant le parcours Stream.',
    trap: 'Side-effects sur une structure non concurrente depuis parallelStream.',
  }),
  q({
    n: 9,
    day: 20,
    topic: 'streams',
    stem: 'Que produit boxed() ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    Stream<Integer> s = IntStream.of(1, 2).boxed();
    System.out.println(s.toList());
  }
}`,
    choices: ['[1, 2]', '[I@hash]', 'Erreur de compilation', '1 2', 'Optional[1, 2]'],
    correct: 0,
    correctWhy: 'boxed() convertit IntStream → Stream<Integer>.',
    wrongWhy: 'Sans boxed/mapToObj, toList() n’existe pas sur IntStream de la même façon (Java : IntStream a toArray, pas toList).',
    javaRule: 'boxed() = mapToObj(Integer::valueOf) pour Int/Long/DoubleStream.',
    trap: 'Appeler collect(Collectors.toList()) sans boxed sur IntStream sans mapper.',
  }),
  q({
    n: 10,
    day: 20,
    topic: 'streams',
    stem: 'Que produit summaryStatistics sur DoubleStream ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    var st = DoubleStream.of(1.5, 2.5).summaryStatistics();
    System.out.println(st.getCount() + " " + st.getSum());
  }
}`,
    choices: ['2 4.0', '2 4', '1 4.0', '2 2.0', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Deux éléments ; somme 4.0.',
    wrongWhy: 'getSum retourne double.',
    javaRule: 'summaryStatistics() sur streams primitifs → *SummaryStatistics.',
    trap: 'Utiliser getAsDouble sur SummaryStatistics (mauvaise API).',
  }),
  q({
    n: 11,
    day: 20,
    topic: 'streams',
    stem: 'Optional avancé : que produit or() ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Optional<String> o = Optional.<String>empty()
      .or(() -> Optional.of("fallback"));
    System.out.println(o.get());
  }
}`,
    choices: ['fallback', 'null', 'Optional.empty', 'NoSuchElementException', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'or(Supplier<Optional>) fournit un autre Optional si empty → "fallback".',
    wrongWhy: 'orElse fournit une valeur T ; or fournit un Optional alternatif.',
    javaRule: 'Optional.or(Supplier<? extends Optional<? extends T>>) — Java 9+.',
    trap: 'Confondre or et orElseGet.',
  }),
  q({
    n: 12,
    day: 20,
    topic: 'streams',
    stem: 'Que produit ifPresentOrElse ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Optional.empty().ifPresentOrElse(
      v -> System.out.print("V"),
      () -> System.out.print("E"));
    Optional.of(1).ifPresentOrElse(
      v -> System.out.print("V"),
      () -> System.out.print("E"));
  }
}`,
    choices: ['EV', 'VE', 'EE', 'VV', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Premier empty → runnable "E" ; second présent → consumer "V" → "EV".',
    wrongWhy: 'ifPresentOrElse(Consumer, Runnable) — Java 9+.',
    javaRule: 'Branche présente vs absente sans if explicite.',
    trap: 'Inverser consumer et runnable.',
  }),
  q({
    n: 13,
    day: 20,
    topic: 'streams',
    stem: 'Que produit Optional.flatMap ?',
    code: `import java.util.*;
public class Main {
  static Optional<String> find(String id) {
    return "x".equals(id) ? Optional.of("X") : Optional.empty();
  }
  public static void main(String[] args) {
    Optional<String> o = Optional.of("x").flatMap(Main::find);
    System.out.println(o.orElse("none"));
  }
}`,
    choices: ['X', 'Optional[X]', 'x', 'none', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'flatMap évite Optional<Optional<...>> ; résultat "X".',
    wrongWhy: 'map(Main::find) produirait Optional<Optional<String>>.',
    javaRule: 'map si fonction → U ; flatMap si fonction → Optional<U>.',
    trap: 'Chaîner map sur des méthodes retournant déjà Optional.',
  }),
  q({
    n: 14,
    day: 20,
    topic: 'lambdas',
    stem: 'Que produit ce IntUnaryOperator dans un map ?',
    code: `import java.util.stream.*;
import java.util.function.*;
public class Main {
  public static void main(String[] args) {
    IntUnaryOperator times2 = n -> n * 2;
    System.out.println(IntStream.of(1, 2, 3).map(times2).sum());
  }
}`,
    choices: ['12', '6', '123', 'Erreur de compilation', 'OptionalInt[12]'],
    correct: 0,
    correctWhy: 'map sur IntStream accepte IntUnaryOperator → 2+4+6=12.',
    wrongWhy: 'sum() retourne int, pas Optional.',
    javaRule: 'IntStream.map(IntUnaryOperator) ; mapToObj pour boxer.',
    trap: 'Passer une Function<Integer,Integer> sans adapter.',
  }),
  q({
    n: 15,
    day: 20,
    topic: 'streams',
    stem: 'Quelle est la sortie ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    boolean ok = IntStream.range(0, 0).allMatch(i -> false);
    boolean any = IntStream.range(0, 0).anyMatch(i -> true);
    System.out.println(ok + " " + any);
  }
}`,
    choices: ['true false', 'false false', 'true true', 'false true', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Stream primitif vide : allMatch true, anyMatch false — même règle que Stream.',
    wrongWhy: 'range(0,0) ne produit aucun élément.',
    javaRule: 'Vacuous truth pour allMatch/noneMatch sur vide.',
    trap: 'allMatch(false) → false même sur vide.',
  }),
  q({
    n: 16,
    day: 20,
    topic: 'streams',
    stem: 'Que produit asLongStream ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    System.out.println(IntStream.of(1, 2).asLongStream().sum());
  }
}`,
    choices: ['3', '3L affiché comme 3', '1.0', 'Erreur de compilation', 'OptionalLong[3]'],
    correct: 0,
    correctWhy: 'asLongStream élargit en LongStream ; sum() → long 3 affiché "3".',
    wrongWhy: 'sum() sur LongStream retourne long, pas OptionalLong (contrairement à min/max/find).',
    javaRule: 'asLongStream/asDoubleStream convertissent sans mapper explicite.',
    trap: 'Attendre OptionalLong pour sum().',
  }),
  q({
    n: 17,
    day: 20,
    topic: 'streams',
    stem: 'Optional : orElse vs orElseGet — quel piège ?',
    code: `Optional.of("ok").orElse(expensive())
Optional.of("ok").orElseGet(() -> expensive())`,
    choices: [
      'orElse évalue always expensive() ; orElseGet seulement si empty',
      'Les deux sont lazy',
      'Les deux sont eager',
      'orElseGet est eager ; orElse est lazy',
      'Les deux lancent si Optional présent',
    ],
    correct: 0,
    correctWhy: 'orElse(T) évalue l’argument immédiatement ; orElseGet(Supplier) est lazy.',
    wrongWhy: 'Même si Optional est présent, orElse a déjà calculé la valeur par défaut.',
    javaRule: 'Préférer orElseGet pour des défauts coûteux ou à effets.',
    trap: 'Passer une méthode coûteuse à orElse « pour faire joli ».',
  }),
  q({
    n: 18,
    day: 20,
    topic: 'streams',
    stem: 'Que produit ce parallel reduce correct ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    int sum = IntStream.rangeClosed(1, 100)
      .parallel()
      .reduce(0, Integer::sum);
    System.out.println(sum);
  }
}`,
    choices: ['5050', '100', '0', 'Résultat non déterministe', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Somme 1..100 = 5050 ; Integer::sum est associatif → parallèle OK.',
    wrongWhy: 'Contrairement à des accumulateurs mutables, sum est sûr.',
    javaRule: 'reduce parallèle exige associativité ; sum/min/max OK.',
    trap: 'Généraliser « parallèle = résultat aléatoire » même pour sum.',
  }),
  q({
    n: 19,
    day: 20,
    topic: 'lambdas',
    stem: 'Que produit ce code (capture + primitive stream) ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    int threshold = 2;
    long count = IntStream.of(1, 2, 3, 4)
      .filter(n -> n > threshold)
      .count();
    // threshold++; // interdit
    System.out.println(count);
  }
}`,
    choices: ['2', '3', '4', 'Erreur de compilation', '1'],
    correct: 0,
    correctWhy: 'threshold effectively final ; filtre >2 → 3,4 → count=2.',
    wrongWhy: 'Si on décommentait threshold++, la lambda ne compilerait plus.',
    javaRule: 'Les lambdas dans filter capturent des locales effectively final.',
    trap: 'Incrémenter threshold après la création du pipeline.',
  }),
  q({
    n: 20,
    day: 20,
    topic: 'streams',
    stem: 'Que produit Optional.ofNullable + stream + findFirst ?',
    code: `import java.util.*;
import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    String result = Stream.of(" ", "  x", null, "y")
      .map(Optional::ofNullable)
      .flatMap(Optional::stream)
      .map(String::trim)
      .filter(s -> !s.isEmpty())
      .findFirst()
      .orElse("none");
    System.out.println(result);
  }
}`,
    choices: ['x', 'y', 'none', '  x', 'NullPointerException'],
    correct: 0,
    correctWhy: 'null filtré via Optional.stream ; " " → trim vide filtré ; "  x" → "x" trouvé en findFirst.',
    wrongWhy: 'ofNullable + flatMap évite le NPE sur null.',
    javaRule: 'Pipeline Optional.stream pour nettoyer nulls avant trim/filter.',
    trap: 'map(String::trim) direct sur un élément null → NPE.',
  }),
]
