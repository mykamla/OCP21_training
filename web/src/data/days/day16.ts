import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day16: Question[] = [
  q({
    n: 1,
    day: 16,
    topic: 'collections',
    stem: 'Que produit ce programme ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Deque<String> d = new ArrayDeque<>();
    d.offerFirst("A");
    d.offerLast("B");
    d.push("C");
    System.out.println(d.pop() + d.pollLast());
  }
}`,
    choices: ['CB', 'CA', 'AB', 'BA', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'push ajoute en tête → [C,A,B]. pop retire C ; pollLast retire B → "CB".',
    wrongWhy: 'push/pop agissent sur le front ; pollLast retire l’autre extrémité.',
    javaRule: 'Deque : push/pop = LIFO sur le front ; offerFirst/Last et pollFirst/Last nomment clairement les bouts.',
    trap: 'Confondre push (front) avec offerLast (back).',
  }),
  q({
    n: 2,
    day: 16,
    topic: 'collections',
    stem: 'Quelle affirmation sur Queue est exacte ?',
    code: `Queue<Integer> q = new LinkedList<>();
q.offer(1);
q.add(2);`,
    choices: [
      'offer et add échouent de la même façon si la file est pleine',
      'offer retourne false si l’insertion échoue ; add lance une exception',
      'add retourne false si l’insertion échoue ; offer lance une exception',
      'Ni offer ni add ne peuvent échouer',
    ],
    correct: 1,
    correctWhy: 'Pour une capacité limitée : offer → false ; add → IllegalStateException.',
    wrongWhy: 'Les deux méthodes réussissent ici (LinkedList illimitée), mais leur contrat d’échec diffère.',
    javaRule: 'Queue : offer/poll/peek (valeurs spéciales) vs add/remove/element (exceptions).',
    trap: 'Assimiler offer et add comme strictement synonymes.',
  }),
  q({
    n: 3,
    day: 16,
    topic: 'collections',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Queue<String> q = new ArrayDeque<>();
    System.out.println(q.poll() + " " + q.peek());
  }
}`,
    choices: ['null null', 'Erreur à l’exécution', 'Erreur de compilation', '"" null', 'null ""'],
    correct: 0,
    correctWhy: 'poll et peek retournent null sur une file vide (pas d’exception).',
    wrongWhy: 'remove()/element() lanceraient NoSuchElementException ; pas poll/peek.',
    javaRule: 'poll/peek → null si vide ; remove/element → exception.',
    trap: 'Croire que toute opération sur une Queue vide lance une exception.',
  }),
  q({
    n: 4,
    day: 16,
    topic: 'collections',
    stem: 'Quel Comparator trie les chaînes par longueur croissante, puis alphabétiquement ?',
    choices: [
      'Comparator.comparing(String::length).thenComparing(Comparator.naturalOrder())',
      'Comparator.comparing(String::length).reversed()',
      'String::compareToIgnoreCase',
      'Comparator.comparingInt(String::length).reversed().thenComparing(String::compareTo)',
    ],
    correct: 0,
    correctWhy: 'comparing(length) puis thenComparing(naturalOrder) donne longueur puis ordre naturel.',
    wrongWhy: 'reversed() inverse le critère ; compareToIgnoreCase ignore la longueur.',
    javaRule: 'Comparator.comparing + thenComparing enchaîne les critères ; naturalOrder() = Comparable.',
    trap: 'Oublier thenComparing et ne trier que sur la longueur.',
  }),
  q({
    n: 5,
    day: 16,
    topic: 'collections',
    stem: 'Que produit ce code ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<String> list = Arrays.asList("b", "a", "c");
    list.sort(Comparator.reverseOrder());
    System.out.println(list);
  }
}`,
    choices: ['[c, b, a]', '[a, b, c]', '[b, a, c]', 'Erreur de compilation', 'UnsupportedOperationException'],
    correct: 0,
    correctWhy: 'reverseOrder() trie en ordre naturel décroissant → c, b, a. Arrays.asList autorise set/sort.',
    wrongWhy: 'asList n’autorise pas add/remove, mais sort (via set) est permis.',
    javaRule: 'Comparator.reverseOrder() = ordre naturel inversé ; List.sort mutes la liste.',
    trap: 'Penser que Arrays.asList est entièrement immuable (add/remove oui interdit, set/sort non).',
  }),
  q({
    n: 6,
    day: 16,
    topic: 'collections',
    stem: 'Quelle est la sortie ?',
    code: `import java.util.*;
record Person(String name, int age) {}
public class Main {
  public static void main(String[] args) {
    var people = new ArrayList<>(List.of(
      new Person("Ann", 30), new Person("Bob", 20)));
    people.sort(Comparator.comparingInt(Person::age));
    System.out.println(people.get(0).name());
  }
}`,
    choices: ['Bob', 'Ann', 'Erreur de compilation', '20', 'null'],
    correct: 0,
    correctWhy: 'Tri par âge croissant → Bob (20) en premier.',
    wrongWhy: 'comparingInt utilise la propriété age, pas name.',
    javaRule: 'Comparator.comparingInt(ToIntFunction) évite le boxing inutile.',
    trap: 'Confondre l’ordre des champs du record avec l’ordre de tri.',
  }),
  q({
    n: 7,
    day: 16,
    topic: 'collections',
    stem: 'Que se passe-t-il à l’exécution ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<String> list = new ArrayList<>(List.of("a", "b", "c"));
    for (String s : list) {
      if (s.equals("b")) list.remove(s);
    }
    System.out.println(list);
  }
}`,
    choices: [
      'ConcurrentModificationException',
      '[a, c]',
      '[a, b, c]',
      '[a]',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Modifier la ArrayList pendant un for-each (Iterator fail-fast) → ConcurrentModificationException.',
    wrongWhy: 'remove via Iterator.remove() serait sûr ; list.remove pendant for-each ne l’est pas.',
    javaRule: 'Les collections non concurrentes sont fail-fast : modif structurelle hors Iterator.remove → CME.',
    trap: 'Croire que CME n’arrive que multi-thread.',
  }),
  q({
    n: 8,
    day: 16,
    topic: 'collections',
    stem: 'Comment retirer « b » sans ConcurrentModificationException ?',
    code: `List<String> list = new ArrayList<>(List.of("a", "b", "c"));`,
    choices: [
      'Iterator<String> it = list.iterator(); while (it.hasNext()) { if (it.next().equals("b")) it.remove(); }',
      'for (String s : list) { if (s.equals("b")) list.remove(s); }',
      'list.stream().filter(s -> !s.equals("b"));',
      'for (int i = 0; i < list.size(); i++) list.remove("b");',
    ],
    correct: 0,
    correctWhy: 'Iterator.remove() est le moyen sûr de modifier pendant le parcours.',
    wrongWhy: 'for-each + list.remove → CME ; stream().filter sans collect ne mute pas ; la boucle indexée remove("b") est fragile/incorrecte ici.',
    javaRule: 'Iterator.remove() ou removeIf(Predicate) pour une suppression sûre.',
    trap: 'Utiliser for-each + Collection.remove.',
  }),
  q({
    n: 9,
    day: 16,
    topic: 'collections',
    stem: 'Que produit ce programme ?',
    code: `import java.util.concurrent.*;
import java.util.*;
public class Main {
  public static void main(String[] args) {
    List<String> list = new CopyOnWriteArrayList<>(List.of("a", "b"));
    for (String s : list) {
      list.add(s + s);
    }
    System.out.println(list);
  }
}`,
    choices: ['[a, b, aa, bb]', '[a, b]', 'ConcurrentModificationException', '[aa, bb]', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'CopyOnWriteArrayList : l’itérateur voit un snapshot ; les add réussissent sans CME → [a,b,aa,bb].',
    wrongWhy: 'Pas de CME sur COWAL ; l’itérateur ne voit pas les ajouts faits pendant son parcours.',
    javaRule: 'CopyOnWriteArrayList : lectures/itérations sur snapshot ; écritures copient le tableau.',
    trap: 'Attendre une ConcurrentModificationException comme avec ArrayList.',
  }),
  q({
    n: 10,
    day: 16,
    topic: 'collections',
    stem: 'Quelle affirmation sur ConcurrentHashMap est correcte ?',
    choices: [
      'null n’est autorisé ni en clé ni en valeur',
      'Une seule null-clé est autorisée, comme HashMap',
      'Les valeurs null sont OK, pas les clés',
      'putIfAbsent accepte une valeur null',
    ],
    correct: 0,
    correctWhy: 'ConcurrentHashMap interdit null pour clés et valeurs (contrairement à HashMap).',
    wrongWhy: 'HashMap autorise une clé null et des valeurs null ; CHM non.',
    javaRule: 'ConcurrentHashMap : pas de null ; opérations atomiques putIfAbsent, compute, merge.',
    trap: 'Transposer le contrat HashMap (null OK) à ConcurrentHashMap.',
  }),
  q({
    n: 11,
    day: 16,
    topic: 'collections',
    stem: 'Que produit ce code ?',
    code: `import java.util.concurrent.*;
public class Main {
  public static void main(String[] args) {
    var map = new ConcurrentHashMap<String, Integer>();
    map.put("a", 1);
    Integer v = map.putIfAbsent("a", 99);
    Integer w = map.putIfAbsent("b", 2);
    System.out.println(v + " " + w + " " + map.get("a"));
  }
}`,
    choices: ['1 null 1', 'null 2 99', '1 2 1', '99 null 99', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'putIfAbsent renvoie l’ancienne valeur (1) si la clé existe, sinon null ; "a" reste 1.',
    wrongWhy: 'putIfAbsent ne remplace pas une valeur déjà présente.',
    javaRule: 'putIfAbsent(K,V) : insert si absent ; retourne l’ancien mapping (ou null).',
    trap: 'Croire que putIfAbsent écrase toujours comme put.',
  }),
  q({
    n: 12,
    day: 16,
    topic: 'collections',
    stem: 'Quelle structure convient le mieux à une file bornée producteur/consommateur thread-safe ?',
    choices: [
      'ArrayBlockingQueue',
      'ArrayDeque',
      'LinkedList',
      'CopyOnWriteArrayList',
      'HashMap',
    ],
    correct: 0,
    correctWhy: 'ArrayBlockingQueue est une BlockingQueue bornée, conçue pour ce pattern.',
    wrongWhy: 'ArrayDeque/LinkedList ne sont pas thread-safe ; COWAL est pour lectures massives, pas une file bloquante.',
    javaRule: 'BlockingQueue (Array/Linked/Priority/Synchronous/Delay) pour producteur-consommateur.',
    trap: 'Utiliser ArrayDeque partagée sans synchronisation.',
  }),
  q({
    n: 13,
    day: 16,
    topic: 'collections',
    stem: 'Que se passe-t-il ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    NavigableSet<Integer> set = new TreeSet<>();
    set.add(10); set.add(20); set.add(30);
    System.out.println(set.lower(20) + " " + set.floor(20) + " " + set.ceiling(25));
  }
}`,
    choices: ['10 20 30', '20 20 30', '10 10 30', 'null 20 30', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'lower = strictement < → 10 ; floor = ≤ → 20 ; ceiling = ≥ 25 → 30.',
    wrongWhy: 'lower exclut l’égal ; floor l’inclut.',
    javaRule: 'NavigableSet : lower/floor/ceiling/higher — strict vs inclusif.',
    trap: 'Confondre lower et floor.',
  }),
  q({
    n: 14,
    day: 16,
    topic: 'collections',
    stem: 'Quel code compile et trie une List<String> en ignorant la casse ?',
    choices: [
      'list.sort(String.CASE_INSENSITIVE_ORDER);',
      'list.sort(Comparator.comparing(String::toLowerCase).reversed().reversed().reversed());',
      'Collections.sort(list, (a, b) -> a = b);',
      'list.stream().sorted(String::compareToIgnoreCase).toList().sort(null);',
    ],
    correct: 0,
    correctWhy: 'String.CASE_INSENSITIVE_ORDER est un Comparator<? super String> prêt à l’emploi.',
    wrongWhy: 'Les autres options sont incorrectes, absurdes ou ne font pas le tri demandé proprement.',
    javaRule: 'List.sort(Comparator) ; CASE_INSENSITIVE_ORDER compare sans tenir compte de la casse.',
    trap: 'Réinventer un comparator fragile au lieu d’utiliser la constante API.',
  }),
  q({
    n: 15,
    day: 16,
    topic: 'collections',
    stem: 'Que produit ce programme ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Deque<Integer> d = new ArrayDeque<>();
    d.add(1);
    d.addLast(2);
    d.addFirst(0);
    System.out.println(d.removeFirst() + d.removeLast() + d.remove());
  }
}`,
    choices: ['3', '012', '0', 'Erreur de compilation', 'NoSuchElementException'],
    correct: 0,
    correctWhy: 'Deque = [0,1,2]. removeFirst→0, removeLast→2, remove()=removeFirst→1 ; 0+2+1=3 (unboxing).',
    wrongWhy: 'Les + entre Integer unboxés additionnent, ils ne concatènent pas.',
    javaRule: 'Deque étend Queue : remove() = removeFirst() ; + sur Integer → addition primitive.',
    trap: 'Lire le + comme concaténation de chaînes.',
  }),
  q({
    n: 16,
    day: 16,
    topic: 'collections',
    stem: 'Quelle différence clé entre PriorityQueue et TreeSet ?',
    choices: [
      'PriorityQueue autorise les doublons ; TreeSet non (selon compare)',
      'Les deux interdisent toujours les doublons',
      'PriorityQueue itère toujours en ordre trié strict',
      'TreeSet n’accepte pas de Comparator personnalisé',
    ],
    correct: 0,
    correctWhy: 'PriorityQueue est un tas : doublons OK ; TreeSet = SortedSet sans doublons (compare==0).',
    wrongWhy: 'L’itérateur de PriorityQueue n’est pas trié ; seul poll() suit la priorité.',
    javaRule: 'PriorityQueue : heap, doublons OK, iterator non ordonné. TreeSet : unique, navigable.',
    trap: 'for-each sur PriorityQueue en s’attendant à l’ordre de priorité.',
  }),
  q({
    n: 17,
    day: 16,
    topic: 'collections',
    stem: 'Que produit ce code ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    PriorityQueue<String> pq = new PriorityQueue<>();
    pq.offer("C"); pq.offer("A"); pq.offer("B");
    System.out.print(pq.poll());
    System.out.print(pq.peek());
  }
}`,
    choices: ['AB', 'CA', 'AC', 'BA', 'CB'],
    correct: 0,
    correctWhy: 'Ordre naturel : A puis B puis C. poll→A ; peek→B → "AB".',
    wrongWhy: 'L’ordre d’insertion (C,A,B) n’est pas l’ordre de sortie.',
    javaRule: 'PriorityQueue : tête = moindre élément selon Comparable/Comparator.',
    trap: 'Confondre ordre d’insertion et ordre de priorité.',
  }),
  q({
    n: 18,
    day: 16,
    topic: 'collections',
    stem: 'Que fait Collections.unmodifiableList(list) ?',
    code: `List<String> list = new ArrayList<>(List.of("a"));
List<String> um = Collections.unmodifiableList(list);
list.add("b");`,
    choices: [
      'um reflète "b" ; um.add lance UnsupportedOperationException',
      'um reste [a] ; une copie défensive a été faite',
      'list.add lance UnsupportedOperationException',
      'um.add("c") réussit silencieusement',
    ],
    correct: 0,
    correctWhy: 'La vue est non modifiable directement, mais reflète les mutations de la liste backing.',
    wrongWhy: 'Ce n’est pas une copie défensive (contrairement à List.copyOf).',
    javaRule: 'unmodifiable* = vue lecture seule ; List.copyOf / Set.copyOf = copie immuable découplée.',
    trap: 'Croire qu’unmodifiableList fige aussi la liste d’origine.',
  }),
  q({
    n: 19,
    day: 16,
    topic: 'collections',
    stem: 'Quel appel est thread-safe pour incrémenter une valeur dans ConcurrentHashMap ?',
    code: `ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("x", 0);`,
    choices: [
      'map.merge("x", 1, Integer::sum);',
      'map.put("x", map.get("x") + 1);',
      'map.get("x")++;',
      'int v = map.get("x"); map.put("x", v + 1);',
    ],
    correct: 0,
    correctWhy: 'merge applique atomiquement la fonction de remapping.',
    wrongWhy: 'get puis put n’est pas atomique : race possible entre threads.',
    javaRule: 'Préférer compute/merge/putIfAbsent sur ConcurrentHashMap plutôt que get+put.',
    trap: 'check-then-act (get puis put) sur une map concurrente.',
  }),
  q({
    n: 20,
    day: 16,
    topic: 'collections',
    stem: 'Que produit ce programme ?',
    code: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Map<String, Integer> map = new TreeMap<>(Comparator.reverseOrder());
    map.put("b", 2); map.put("a", 1); map.put("c", 3);
    System.out.println(map.keySet());
  }
}`,
    choices: ['[c, b, a]', '[a, b, c]', '[b, a, c]', '[c, a, b]', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'TreeMap avec reverseOrder trie les clés décroissantes → c, b, a.',
    wrongWhy: 'L’ordre d’insertion est ignoré ; TreeMap suit le Comparator.',
    javaRule: 'TreeMap/TreeSet ordonnent selon Comparable ou Comparator fourni au constructeur.',
    trap: 'Attendre l’ordre d’insertion (comme LinkedHashMap).',
  }),
]
