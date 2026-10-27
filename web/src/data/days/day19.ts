import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day19: Question[] = [
  q({
    n: 1,
    day: 19,
    topic: 'streams',
    stem: 'Que produit ce collect ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<String> list = Stream.of("a", "b", "a")
      .collect(Collectors.toList());
    list.add("c");
    System.out.println(list);
  }
}`,
    choices: ['[a, b, a, c]', '[a, b, a]', 'UnsupportedOperationException', '[a, b, c]', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Collectors.toList() produit une liste mutable (typiquement ArrayList) ; add("c") OK.',
    wrongWhy: 'Stream.toList() (Java 16+) est en revanche non modifiable.',
    javaRule: 'toList() collector ≈ mutable ; Stream.toList() = unmodifiable.',
    trap: 'Confondre Collectors.toList() et Stream.toList().',
  }),
  q({
    n: 2,
    day: 19,
    topic: 'streams',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.stream.*;
public class Main {
  public static void main(String[] args) {
    var list = Stream.of("a", "b").toList();
    list.add("c");
  }
}`,
    choices: [
      'UnsupportedOperationException',
      '[a, b, c]',
      'Erreur de compilation',
      'NullPointerException',
      'Ignore silencieusement',
    ],
    correct: 0,
    correctWhy: 'Stream.toList() renvoie une liste non modifiable → add lance UOE.',
    wrongWhy: 'Ce n’est pas la même chose que Collectors.toList().',
    javaRule: 'Stream.toList() : unmodifiable RandomAccess list (Java 16+).',
    trap: 'Muter le résultat de toList().',
  }),
  q({
    n: 3,
    day: 19,
    topic: 'streams',
    stem: 'Que produit joining ?',
    code: `import java.util.stream.*;
import java.util.stream.Collectors;
public class Main {
  public static void main(String[] args) {
    String s = Stream.of("a", "b", "c")
      .collect(Collectors.joining("-", "[", "]"));
    System.out.println(s);
  }
}`,
    choices: ['[a-b-c]', 'a-b-c', '[a, b, c]', 'abc', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'joining(delimiter, prefix, suffix) → "[a-b-c]".',
    wrongWhy: 'Sans prefix/suffix ce serait "a-b-c".',
    javaRule: 'Collectors.joining(CharSequence delim, prefix, suffix).',
    trap: 'Confondre avec String.join qui n’ajoute pas prefix/suffix ainsi.',
  }),
  q({
    n: 4,
    day: 19,
    topic: 'streams',
    stem: 'Que produit groupingBy ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<Integer, List<String>> map =
      Stream.of("a", "bb", "ccc", "dd")
        .collect(Collectors.groupingBy(String::length));
    System.out.println(map.get(2));
  }
}`,
    choices: ['[bb, dd]', '[a]', '[ccc]', 'null', '[bb]'],
    correct: 0,
    correctWhy: 'Groupement par longueur : 2 → "bb" et "dd".',
    wrongWhy: 'groupingBy rassemble toutes les valeurs de même clé.',
    javaRule: 'Collectors.groupingBy(classifier) → Map<K, List<T>>.',
    trap: 'Attendre un seul élément par groupe.',
  }),
  q({
    n: 5,
    day: 19,
    topic: 'streams',
    stem: 'Que produit partitioningBy ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<Boolean, List<Integer>> map =
      Stream.of(1, 2, 3, 4)
        .collect(Collectors.partitioningBy(n -> n % 2 == 0));
    System.out.println(map.get(false) + " " + map.size());
  }
}`,
    choices: ['[1, 3] 2', '[2, 4] 2', '[1, 3] 1', 'null 2', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'partitioningBy crée toujours les clés true et false ; impairs → [1,3] ; size=2.',
    wrongWhy: 'Même si un côté est vide, les deux clés existent.',
    javaRule: 'partitioningBy(Predicate) → Map<Boolean, List<T>> avec 2 entrées.',
    trap: 'Croire que seule la partition non vide est présente.',
  }),
  q({
    n: 6,
    day: 19,
    topic: 'streams',
    stem: 'Que produit flatMap ici ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<String> result = Stream.of(List.of("a", "b"), List.of("c"))
      .flatMap(List::stream)
      .toList();
    System.out.println(result);
  }
}`,
    choices: ['[a, b, c]', '[[a, b], [c]]', '[a, b]', 'Erreur de compilation', '[abc]'],
    correct: 0,
    correctWhy: 'flatMap(List::stream) aplatit Stream<List<String>> → Stream<String>.',
    wrongWhy: 'map(List::stream) donnerait Stream<Stream<String>>.',
    javaRule: 'flatMap pour aplatir une structure 1:N.',
    trap: 'Utiliser map au lieu de flatMap sur des collections imbriquées.',
  }),
  q({
    n: 7,
    day: 19,
    topic: 'streams',
    stem: 'Que produit groupingBy avec downstream counting ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<String, Long> map =
      Stream.of("a", "b", "a", "c", "b", "a")
        .collect(Collectors.groupingBy(s -> s, Collectors.counting()));
    System.out.println(map.get("a"));
  }
}`,
    choices: ['3', '1', '6', 'null', 'Optional[3]'],
    correct: 0,
    correctWhy: '"a" apparaît 3 fois ; counting() → Long 3.',
    wrongWhy: 'counting retourne Long, pas Optional.',
    javaRule: 'groupingBy(classifier, downstream) pour compter, sommer, etc.',
    trap: 'Attendre Integer ou Optional.',
  }),
  q({
    n: 8,
    day: 19,
    topic: 'streams',
    stem: 'Que produit toMap en cas de clé dupliquée sans merge function ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Stream.of("a", "b", "a")
      .collect(Collectors.toMap(s -> s, String::length));
  }
}`,
    choices: [
      'IllegalStateException (duplicate key)',
      '{a=1, b=1}',
      'NullPointerException',
      'Erreur de compilation',
      '{a=2, b=1}',
    ],
    correct: 0,
    correctWhy: 'toMap sans merge function échoue sur clé dupliquée → IllegalStateException.',
    wrongWhy: 'Il faut fournir une merge function : toMap(k, v, (a,b)->...).',
    javaRule: 'Collectors.toMap(keyMapper, valueMapper[, mergeFunction[, mapSupplier]]).',
    trap: 'Oublier la merge function quand les clés ne sont pas uniques.',
  }),
  q({
    n: 9,
    day: 19,
    topic: 'streams',
    stem: 'Que produit ce toMap avec merge ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<String, Integer> map =
      Stream.of("aa", "b", "ccc", "dd")
        .collect(Collectors.toMap(
          s -> String.valueOf(s.length()),
          s -> 1,
          Integer::sum));
    System.out.println(map.get("2"));
  }
}`,
    choices: ['2', '1', 'null', '4', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Longueur 2 : "aa" et "dd" → merge sum → 2.',
    wrongWhy: 'Sans merge ce serait une duplicate key exception.',
    javaRule: 'mergeFunction combine les valeurs pour une même clé.',
    trap: 'Lire la clé comme le contenu de la chaîne, pas sa longueur.',
  }),
  q({
    n: 10,
    day: 19,
    topic: 'streams',
    stem: 'Que produit mapping dans groupingBy ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<Integer, List<String>> map =
      Stream.of("a", "bb", "c")
        .collect(Collectors.groupingBy(
          String::length,
          Collectors.mapping(String::toUpperCase, Collectors.toList())));
    System.out.println(map.get(1));
  }
}`,
    choices: ['[A, C]', '[a, c]', '[A]', '[1]', 'null'],
    correct: 0,
    correctWhy: 'Groupe longueur 1 : "a","c" mappés en "A","C".',
    wrongWhy: 'mapping applique une fonction avant le collector downstream.',
    javaRule: 'Collectors.mapping(fn, downstream) transforme les éléments du groupe.',
    trap: 'Oublier que mapping change les valeurs, pas les clés.',
  }),
  q({
    n: 11,
    day: 19,
    topic: 'streams',
    stem: 'Que produit collectingAndThen ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    int size = Stream.of(1, 2, 3)
      .collect(Collectors.collectingAndThen(
        Collectors.toList(), List::size));
    System.out.println(size);
  }
}`,
    choices: ['3', '[1, 2, 3]', 'Optional[3]', 'Erreur de compilation', '6'],
    correct: 0,
    correctWhy: 'collect toList puis List::size → 3.',
    wrongWhy: 'collectingAndThen applique un finisher après le collector.',
    javaRule: 'collectingAndThen(downstream, finisher) pour post-traiter le résultat.',
    trap: 'Attendre encore une List en sortie.',
  }),
  q({
    n: 12,
    day: 19,
    topic: 'streams',
    stem: 'Que produit teeing (Java 12+) ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    String result = Stream.of(1, 2, 3, 4)
      .collect(Collectors.teeing(
        Collectors.summingInt(i -> i),
        Collectors.counting(),
        (sum, count) -> sum + ":" + count));
    System.out.println(result);
  }
}`,
    choices: ['10:4', '10:10', '4:4', 'Erreur de compilation', '1:4'],
    correct: 0,
    correctWhy: 'teeing combine summingInt=10 et counting=4 → "10:4".',
    wrongWhy: 'Deux collectors en parallèle sur le même stream, puis merger.',
    javaRule: 'Collectors.teeing(c1, c2, merger) — utile pour stats multiples.',
    trap: 'Penser qu’il faut deux passages sur le stream.',
  }),
  q({
    n: 13,
    day: 19,
    topic: 'streams',
    stem: 'Que produit flatMapping (downstream de groupingBy) conceptuellement ?',
    choices: [
      'Pour chaque élément du groupe, ouvre un Stream et aplatit avant le collector aval',
      'Remplace flatMap du Stream source uniquement',
      'Convertit la Map en List',
      'Est une opération terminale du Stream',
    ],
    correct: 0,
    correctWhy: 'Collectors.flatMapping(mapper, downstream) aplatit au niveau collector.',
    wrongWhy: 'Ce n’est pas un remplacement global de Stream.flatMap hors collector.',
    javaRule: 'flatMapping utile quand chaque élément expose une collection à aplatir dans un groupe.',
    trap: 'Mélanger Stream.flatMap et Collectors.flatMapping.',
  }),
  q({
    n: 14,
    day: 19,
    topic: 'streams',
    stem: 'Que produit ce code ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<Boolean, Long> map =
      Stream.of(1, 2, 3, 4, 5)
        .collect(Collectors.partitioningBy(
          n -> n > 3, Collectors.counting()));
    System.out.println(map);
  }
}`,
    choices: [
      '{false=3, true=2}',
      '{true=2}',
      '{false=3}',
      '{false=[1, 2, 3], true=[4, 5]}',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: '≤3 : trois éléments ; >3 : deux ; counting sur chaque partition.',
    wrongWhy: 'Les deux clés Boolean sont toujours présentes.',
    javaRule: 'partitioningBy(pred, downstream) comme groupingBy sur Boolean.',
    trap: 'Attendre des List alors que counting → Long.',
  }),
  q({
    n: 15,
    day: 19,
    topic: 'streams',
    stem: 'Que produit averagingInt ?',
    code: `import java.util.stream.*;
import java.util.stream.Collectors;
public class Main {
  public static void main(String[] args) {
    double avg = Stream.of("a", "bbb", "cc")
      .collect(Collectors.averagingInt(String::length));
    System.out.println(avg);
  }
}`,
    choices: ['2.0', '3.0', '6', '2', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Longueurs 1,3,2 → moyenne 2.0 (double).',
    wrongWhy: 'averagingInt retourne Double/double, pas la somme.',
    javaRule: 'averagingInt/Long/Double → moyenne en double.',
    trap: 'Afficher 2 (int) ou la somme 6.',
  }),
  q({
    n: 16,
    day: 19,
    topic: 'streams',
    stem: 'Que produit groupingBy avec TreeMap supplier ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<String, List<Integer>> map =
      Stream.of(3, 1, 2)
        .collect(Collectors.groupingBy(
          i -> i % 2 == 0 ? "even" : "odd",
          TreeMap::new,
          Collectors.toList()));
    System.out.println(map.keySet());
  }
}`,
    choices: ['[even, odd]', '[odd, even]', '[3, 1, 2]', 'Erreur de compilation', '[odd]'],
    correct: 0,
    correctWhy: 'TreeMap ordonne les clés : "even" puis "odd" (ordre naturel String).',
    wrongWhy: 'HashMap n’aurait pas d’ordre garanti ; ici TreeMap impose l’ordre.',
    javaRule: 'groupingBy(classifier, mapFactory, downstream).',
    trap: 'Ignorer l’effet du mapFactory sur l’ordre des clés.',
  }),
  q({
    n: 17,
    day: 19,
    topic: 'streams',
    stem: 'Que produit reducing comme downstream ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<Integer, Optional<String>> map =
      Stream.of("a", "bb", "c", "dd")
        .collect(Collectors.groupingBy(
          String::length,
          Collectors.reducing((s, t) -> s + t)));
    System.out.println(map.get(1).orElse(""));
  }
}`,
    choices: ['ac', 'a', 'c', 'Optional[ac]', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Groupe longueur 1 : "a" et "c" réduits en "ac" dans un Optional.',
    wrongWhy: 'orElse déballe ; sans orElse on verrait Optional[ac].',
    javaRule: 'Collectors.reducing(BinaryOperator) → Optional<T> comme downstream.',
    trap: 'Oublier que reducing sans identité enveloppe dans Optional.',
  }),
  q({
    n: 18,
    day: 19,
    topic: 'streams',
    stem: 'Que produit ce flatMap sur des Optional ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<String> list = Stream.of("a", null, "b")
      .map(Optional::ofNullable)
      .flatMap(Optional::stream)
      .toList();
    System.out.println(list);
  }
}`,
    choices: ['[a, b]', '[a, null, b]', '[Optional[a], Optional.empty, Optional[b]]', 'NullPointerException', '[a]'],
    correct: 0,
    correctWhy: 'Optional.stream() : 1 élément si présent, 0 si empty → null filtré → [a,b].',
    wrongWhy: 'C’est l’idiome moderne pour aplatir des Optional dans un Stream.',
    javaRule: 'Optional.stream() (Java 9+) facilite flatMap(Optional::stream).',
    trap: 'map(Optional::stream) sans flatMap → Stream<Stream<...>>.',
  }),
  q({
    n: 19,
    day: 19,
    topic: 'streams',
    stem: 'Que produit summarizingInt ?',
    code: `import java.util.stream.*;
import java.util.stream.Collectors;
public class Main {
  public static void main(String[] args) {
    var stats = Stream.of("a", "bbb", "cc")
      .collect(Collectors.summarizingInt(String::length));
    System.out.println(stats.getSum() + " " + stats.getMax());
  }
}`,
    choices: ['6 3', '3 3', '6 2', '2.0 3', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Longueurs 1+3+2=6 ; max=3.',
    wrongWhy: 'IntSummaryStatistics expose count/sum/min/max/average.',
    javaRule: 'summarizingInt/Long/Double → *SummaryStatistics.',
    trap: 'Confondre getSum et getAverage.',
  }),
  q({
    n: 20,
    day: 19,
    topic: 'streams',
    stem: 'Quelle est la sortie ?',
    code: `import java.util.stream.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    Set<String> set = Stream.of("b", "a", "b")
      .collect(Collectors.toCollection(TreeSet::new));
    System.out.println(set);
  }
}`,
    choices: ['[a, b]', '[b, a, b]', '[b, a]', '[a, b, b]', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'TreeSet déduplique et trie → [a, b].',
    wrongWhy: 'toCollection permet de choisir Set/List concrète.',
    javaRule: 'Collectors.toCollection(Supplier<C>) pour un type de collection précis.',
    trap: 'Attendre des doublons dans un Set.',
  }),
]
