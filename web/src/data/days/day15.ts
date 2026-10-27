import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day15: Question[] = [
  q({
    n: 1,
    day: 15,
    topic: 'collections',
    stem: 'Quelle interface n’étend pas Collection ?',
    choices: ['List', 'Set', 'Queue', 'Map'],
    correct: 3,
    correctWhy: 'Map est une hiérarchie séparée (clé/valeur). List, Set, Queue étendent Collection.',
    wrongWhy: 'Deque étend Queue ⊂ Collection ; Map non.',
    javaRule: 'Collection vs Map : deux racines dans java.util.',
    trap: 'Appeler add sur une Map (c’est put).',
  }),
  q({
    n: 2,
    day: 15,
    topic: 'collections',
    stem: 'List.of(1, 2, 3) : laquelle est vraie ?',
    choices: [
      'Renvoie un ArrayList mutable',
      'Liste immuable ; add → UnsupportedOperationException',
      'Autorise les éléments null',
      'Triée automatiquement',
    ],
    correct: 1,
    correctWhy: 'List.of / Set.of / Map.of = factories immuables ; null interdit.',
    wrongWhy: 'Pas un ArrayList ; pas de null ; pas de sort implicite.',
    javaRule: 'List.copyOf(coll) aussi unmodifiable ; distinct de Arrays.asList.',
    trap: 'List.of(null) → NPE.',
  }),
  q({
    n: 3,
    day: 15,
    topic: 'collections',
    stem: 'Que produit ce code ?',
    code: `List<String> list = new ArrayList<>();
list.add("a");
list.add("b");
list.add("a");
System.out.println(list.size() + list.get(0));`,
    choices: ['2a', '3a', '3b', 'Erreur'],
    correct: 1,
    correctWhy: 'List autorise doublons et ordre d’insertion ; size 3, get(0)="a".',
    wrongWhy: 'Ce n’est pas un Set.',
    javaRule: 'List : index, doublons OK. ArrayList = tableau dynamique ; LinkedList = nœuds.',
    trap: 'Croire qu’ArrayList déduplique.',
  }),
  q({
    n: 4,
    day: 15,
    topic: 'collections',
    stem: 'HashSet et equals :',
    code: `var set = new HashSet<String>();
set.add("java");
set.add(new String("java"));
System.out.println(set.size());`,
    choices: ['2', '1', '0', 'Erreur'],
    correct: 1,
    correctWhy: 'String.equals / hashCode basés sur le contenu → le second add est ignoré.',
    wrongWhy: 'Set refuse les doublons selon equals, pas ==.',
    javaRule: 'Set.add renvoie false si déjà présent (equals).',
    trap: 'Utiliser un type mutable comme élément de HashSet.',
  }),
  q({
    n: 5,
    day: 15,
    topic: 'collections',
    stem: 'TreeSet sans Comparable :',
    code: `class Box { int n; Box(int n){this.n=n;} }
var ts = new TreeSet<Box>();
ts.add(new Box(1));`,
    choices: [
      'OK : ordonné par identité',
      'ClassCastException (Box non Comparable, pas de Comparator)',
      'Erreur de compilation obligatoire',
      'NullPointerException',
    ],
    correct: 1,
    correctWhy: 'TreeSet trie via Comparable naturel ou Comparator ; sinon CCE à l’insertion.',
    wrongWhy: 'La compilation peut passer ; l’échec est runtime.',
    javaRule: 'SortedSet/TreeMap exigent un ordre total (Comparable ou Comparator).',
    trap: 'Comparable incohérent avec equals → comportement de Set trompeur.',
  }),
  q({
    n: 6,
    day: 15,
    topic: 'collections',
    stem: 'Map : que produit ?',
    code: `Map<String, Integer> m = new HashMap<>();
m.put("a", 1);
m.put("a", 2);
m.put(null, 3);
System.out.println(m.size() + " " + m.get("a"));`,
    choices: ['2 2', '3 2', '2 1', 'NPE'],
    correct: 0,
    correctWhy: 'put remplace la valeur pour la même clé ; HashMap autorise une clé null. size=2, get("a")=2.',
    wrongWhy: 'Pas de NPE sur null key dans HashMap (contrairement à Hashtable).',
    javaRule: 'HashMap : 1 null key, valeurs null OK. Hashtable/ConcurrentHashMap : pas de null.',
    trap: 'Confondre HashMap et Hashtable sur null.',
  }),
  q({
    n: 7,
    day: 15,
    topic: 'collections',
    stem: 'getOrDefault avec valeur null déjà présente :',
    code: `Map<String, Integer> m = new HashMap<>();
m.put("x", null);
System.out.println(m.getOrDefault("x", 5));
System.out.println(m.putIfAbsent("x", 7));
System.out.println(m.get("x"));`,
    choices: [
      '5 / null / 7',
      'null / null / 7',
      'null / 7 / 7',
      '5 / 7 / 7',
    ],
    correct: 1,
    correctWhy: 'Clé présente → getOrDefault renvoie null (pas 5). putIfAbsent remplace null par 7 et renvoie l’ancienne valeur null.',
    wrongWhy: 'getOrDefault ne traite pas une valeur null comme une absence de mapping.',
    javaRule: 'Presence = containsKey ; null value ≠ missing key. putIfAbsent écrit si absent ou null.',
    trap: 'Utiliser getOrDefault pour « corriger » les null stockés.',
  }),
  q({
    n: 8,
    day: 15,
    topic: 'collections',
    stem: 'equals sur List :',
    code: `List<String> a = List.of("a", "b");
List<String> b = new ArrayList<>(a);
System.out.println(a.equals(b));`,
    choices: ['false', 'true', 'Erreur de compilation', 'ClassCastException'],
    correct: 1,
    correctWhy: 'List.equals compare type List, taille, et éléments equals dans le même ordre — indépendamment de l’implémentation.',
    wrongWhy: 'Pas besoin d’être la même classe concrète.',
    javaRule: 'List/Set/Map définissent des contrats equals/hashCode sur le contenu.',
    trap: 'Comparer avec == des collections structurellement égales.',
  }),
  q({
    n: 9,
    day: 15,
    topic: 'collections',
    stem: 'Set.equals ignore l’ordre :',
    code: `Set<Integer> a = new LinkedHashSet<>(List.of(1, 2));
Set<Integer> b = new HashSet<>(List.of(2, 1));
System.out.println(a.equals(b));`,
    choices: ['false', 'true', 'Erreur', 'NPE'],
    correct: 1,
    correctWhy: 'Set.equals : même taille et chaque élément de A dans B (equals), sans regarder l’ordre.',
    wrongWhy: 'LinkedHashSet garde l’ordre d’itération mais equals reste ensembliste.',
    javaRule: 'Set.equals ≠ List.equals (qui exige le même ordre).',
    trap: 'Assumer que LinkedHashSet.equals exige le même ordre.',
  }),
  q({
    n: 10,
    day: 15,
    topic: 'collections',
    stem: 'Génériques : laquelle compile sans warning « unchecked » majeur / est valide ?',
    code: `List<String> names = new ArrayList<>();`,
    choices: [
      'names.add(42);',
      'names = new ArrayList<Object>();',
      'List<Object> objs = names;',
      'names.add("Ada");',
    ],
    correct: 3,
    correctWhy: 'ArrayList<> diamond + add(String) est le cas nominal. List<String> n’est pas List<Object> (invariance).',
    wrongWhy: 'Génériques invariants : pas d’assignation String→Object ni add(Integer).',
    javaRule: 'Generics are invariant : List<String> ≰ List<Object>. Utiliser <? extends>/< ? super>.',
    trap: 'Traiter les génériques comme les tableaux covariants.',
  }),
  q({
    n: 11,
    day: 15,
    topic: 'collections',
    stem: 'PECS : que compile ?',
    code: `List<? extends Number> ex = List.of(1, 2.5);
List<? super Integer> su = new ArrayList<Number>();`,
    choices: [
      'ex.add(3);',
      'Number n = ex.get(0); et su.add(3);',
      'su.add("x");',
      'Integer i = su.get(0); // sans cast',
    ],
    correct: 1,
    correctWhy: 'extends → producteur : get en Number OK, add interdit (sauf null). super → consommateur : add(Integer) OK ; get → Object.',
    wrongWhy: 'ex.add(3) ne compile pas ; su.get typé Object ; "x" n’est pas Integer.',
    javaRule: 'PECS : Producer Extends, Consumer Super.',
    trap: 'add sur List<? extends T>.',
  }),
  q({
    n: 12,
    day: 15,
    topic: 'collections',
    stem: 'Diamond et var :',
    code: `var list = new ArrayList<>();
list.add("x");
list.add(1);`,
    choices: [
      'Erreur : diamond sans cible',
      'Compile : list est ArrayList<Object> (raw-like inference) et accepte les deux',
      'Compile seulement le String',
      'list est ArrayList<String>',
    ],
    correct: 1,
    correctWhy: 'var + new ArrayList<>() infère ArrayList<Object> (Java 10+) ; add(String) et add(Integer) OK.',
    wrongWhy: 'Sans var, ArrayList<>() a besoin d’un type cible à gauche.',
    javaRule: 'Diamond dépend du contexte de cible ; var fournit Object par défaut ici.',
    trap: 'Croire que le premier add fige ArrayList<String>.',
  }),
  q({
    n: 13,
    day: 15,
    topic: 'collections',
    stem: 'Iterator.remove pendant parcours :',
    code: `List<String> list = new ArrayList<>(List.of("a", "b", "c"));
for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
  if (it.next().equals("b")) it.remove();
}
System.out.println(list);`,
    choices: ['[a, b, c]', '[a, c]', 'ConcurrentModificationException', '[a, b]'],
    correct: 1,
    correctWhy: 'Iterator.remove() est la façon sûre de supprimer pendant une itération fail-fast.',
    wrongWhy: 'list.remove dans un for-each → ConcurrentModificationException.',
    javaRule: 'Fail-fast iterators ; remove via Iterator/ListIterator ou removeIf.',
    trap: 'Modifier la collection directement dans un for-each.',
  }),
  q({
    n: 14,
    day: 15,
    topic: 'collections',
    stem: 'Que se passe-t-il ?',
    code: `List<String> list = new ArrayList<>(List.of("a", "b"));
for (String s : list) {
  list.remove(s);
}`,
    choices: [
      'Liste vide',
      'ConcurrentModificationException (typiquement)',
      'Compile error',
      '[b]',
    ],
    correct: 1,
    correctWhy: 'for-each utilise un Iterator fail-fast ; remove structurel concurrent → CME.',
    wrongWhy: 'Même sur ArrayList single-thread.',
    javaRule: 'Préférer removeIf(predicate) ou Iterator.remove.',
    trap: '« Ça marche parfois » selon timing — comportement non fiable.',
  }),
  q({
    n: 15,
    day: 15,
    topic: 'collections',
    stem: 'Map.ofEntries / clés dupliquées :',
    code: `Map.of("a", 1, "a", 2)`,
    choices: [
      'Garde 2',
      'Garde 1',
      'IllegalArgumentException (doublon)',
      'NPE',
    ],
    correct: 2,
    correctWhy: 'Map.of et Map.ofEntries refusent les clés dupliquées → IllegalArgumentException.',
    wrongWhy: 'Contrairement à HashMap.put qui écrase.',
    javaRule: 'Factories immuables : pas de null, pas de doublons de clés.',
    trap: 'Migrer un put successif vers Map.of sans vérifier l’unicité.',
  }),
  q({
    n: 16,
    day: 15,
    topic: 'collections',
    stem: 'keySet / values / entrySet :',
    code: `Map<String, Integer> m = new HashMap<>();
m.put("x", 1);
m.keySet().remove("x");
System.out.println(m.size());`,
    choices: ['1', '0', 'UnsupportedOperationException', 'ConcurrentModificationException'],
    correct: 1,
    correctWhy: 'keySet est une vue : remove sur la vue retire l’entrée de la Map.',
    wrongWhy: 'Pour Map.of immuable, remove serait UnsupportedOperationException.',
    javaRule: 'Views : keySet, values, entrySet reflètent et peuvent muter la map sous-jacente (si mutable).',
    trap: 'Modifier entrySet pendant une itération sans Iterator.',
  }),
  q({
    n: 17,
    day: 15,
    topic: 'collections',
    stem: 'computeIfAbsent :',
    code: `Map<String, List<String>> m = new HashMap<>();
m.computeIfAbsent("k", k -> new ArrayList<>()).add("v");
System.out.println(m.get("k"));`,
    choices: ['null', '[v]', '[]', 'NPE'],
    correct: 1,
    correctWhy: 'Si clé absente, la fonction crée la liste ; add("v") s’applique au résultat → [v].',
    wrongWhy: 'Idiome classique multi-map.',
    javaRule: 'compute / merge / putIfAbsent : API Map Java 8+ à connaître pour l’OCP.',
    trap: 'get puis put non atomique (courses en concurrent).',
  }),
  q({
    n: 18,
    day: 15,
    topic: 'collections',
    stem: 'Raw type piège :',
    code: `List raw = new ArrayList();
raw.add("x");
List<Integer> ints = raw;
Integer i = ints.get(0);`,
    choices: [
      'i vaut null',
      'ClassCastException au get (cast synthétique vers Integer)',
      'Erreur de compilation stricte toujours',
      'i == 0',
    ],
    correct: 1,
    correctWhy: 'Les raw types cassent la sécurité : get(0) insère un cast vers Integer sur un String → CCE.',
    wrongWhy: 'Le compilateur émet souvent un unchecked warning ; l’échec est à l’exécution.',
    javaRule: 'Éviter les raw types ; erasure + cast de bordure.',
    trap: 'Mélanger raw et paramétré « pour aller vite ».',
  }),
  q({
    n: 19,
    day: 15,
    topic: 'collections',
    stem: 'LinkedList comme Deque/List :',
    choices: [
      'LinkedList n’implémente que List',
      'LinkedList implémente List et Deque (donc Queue)',
      'LinkedList est un Set ordonné',
      'LinkedList interdit les null',
    ],
    correct: 1,
    correctWhy: 'LinkedList : List + Deque → addFirst/addLast, offer, poll, etc.',
    wrongWhy: 'null éléments autorisés ; ce n’est pas un Set.',
    javaRule: 'Choisir ArrayList (accès index) vs LinkedList (inserts aux extrémités / Deque).',
    trap: 'Utiliser LinkedList pour des get(i) fréquents au milieu.',
  }),
  q({
    n: 20,
    day: 15,
    topic: 'collections',
    stem: 'HashMap equals des clés :',
    code: `record Point(int x, int y) {}
var m = new HashMap<Point, String>();
m.put(new Point(1, 2), "A");
System.out.println(m.get(new Point(1, 2)));`,
    choices: ['null', 'A', 'NPE', 'Erreur : record interdit en clé'],
    correct: 1,
    correctWhy: 'Les records fournissent equals/hashCode sur les composants → get retrouve "A".',
    wrongWhy: 'Sans equals/hashCode (classe naive), get renverrait null.',
    javaRule: 'Clés de HashMap : equals + hashCode stables et cohérents (records/immuables idéaux).',
    trap: 'Clé mutable modifiée après put → entrée perdue.',
  }),
]
