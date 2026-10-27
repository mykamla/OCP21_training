import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day14: Question[] = [
  q({
    n: 1,
    day: 14,
    topic: 'arrays',
    stem: 'Que vaut a[0] après création ?',
    code: `int[] a = new int[3];
System.out.println(a[0]);`,
    choices: ['null', '0', '1', 'ArrayIndexOutOfBoundsException'],
    correct: 1,
    correctWhy: 'Les éléments d’un int[] sont initialisés à 0 (valeur par défaut du primitif).',
    wrongWhy: 'null est pour les références ; pas d’AIOOBE sur un index valide.',
    javaRule: 'new T[n] : éléments = default (0, 0.0, false, null).',
    trap: 'Croire que les tableaux de primitifs démarrent à null.',
  }),
  q({
    n: 2,
    day: 14,
    topic: 'arrays',
    stem: 'Lequel compile ?',
    choices: [
      'int[] a = new int[];',
      'int[] a = new int[2]{1, 2};',
      'int[] a = {1, 2, 3};',
      'int a[] = new int[2]{1, 2};',
    ],
    correct: 2,
    correctWhy: 'L’initialiseur raccourci { } est valide à la déclaration. new int[2]{1,2} est illégal (taille + liste).',
    wrongWhy: 'new int[] sans taille ni liste est invalide ; combiner [n] et { } est interdit.',
    javaRule: 'new int[]{1,2} OK ; int[] a = {1,2} OK à la déclaration ; pas new int[2]{...}.',
    trap: 'Écrire new int[3]{1,2,3} comme en C.',
  }),
  q({
    n: 3,
    day: 14,
    topic: 'arrays',
    stem: 'Que produit ce code ?',
    code: `String[] a = new String[2];
System.out.println(a[0] + " " + a.length);`,
    choices: ['null 2', ' 2', 'Erreur de compilation', 'NullPointerException'],
    correct: 0,
    correctWhy: 'Éléments String = null ; length est un champ final = 2. "null" concaténé s’affiche.',
    wrongWhy: 'Pas de NPE sur a[0] pour println via concaténation String.',
    javaRule: 'array.length (champ) vs String.length() / List.size().',
    trap: 'Écrire a.length() sur un tableau.',
  }),
  q({
    n: 4,
    day: 14,
    topic: 'arrays',
    stem: 'Anonym array en argument :',
    code: `void m(int[] xs) { }
m(/* ? */);`,
    choices: [
      'm({1, 2});',
      'm(new int[]{1, 2});',
      'm(new int[2]{1, 2});',
      'm(int[]{1, 2});',
    ],
    correct: 1,
    correctWhy: 'Hors déclaration de variable, le raccourci {1,2} seul est interdit ; new int[]{1,2} est requis.',
    wrongWhy: 'm({1,2}) ne compile pas.',
    javaRule: 'Anonymous array = new Type[]{ ... }.',
    trap: 'Réutiliser la forme { } hors déclaration.',
  }),
  q({
    n: 5,
    day: 14,
    topic: 'arrays',
    stem: 'Arrays.equals vs == :',
    code: `int[] a = {1, 2};
int[] b = {1, 2};
System.out.println(a == b);
System.out.println(Arrays.equals(a, b));`,
    choices: ['true true', 'false false', 'false true', 'true false'],
    correct: 2,
    correctWhy: '== compare les références (deux objets) ; Arrays.equals compare le contenu 1D.',
    wrongWhy: 'Pas d’égalité structurelle avec ==.',
    javaRule: 'Arrays.equals pour 1D ; Arrays.deepEquals pour tableaux imbriqués.',
    trap: 'Utiliser a.equals(b) : Array hérite de Object.equals (référence) → false.',
  }),
  q({
    n: 6,
    day: 14,
    topic: 'arrays',
    stem: 'Que faut-il pour comparer des String[][] par contenu ?',
    code: `String[][] x = {{"a"}};
String[][] y = {{"a"}};`,
    choices: [
      'Arrays.equals(x, y)',
      'Arrays.deepEquals(x, y)',
      'x.equals(y)',
      'Objects.equals(x, y) suffit toujours',
    ],
    correct: 1,
    correctWhy: 'equals 1D s’arrête aux références des sous-tableaux ; deepEquals descend récursivement.',
    wrongWhy: 'Arrays.equals(x,y) → false ici car x[0] != y[0] en référence.',
    javaRule: 'deepEquals / deepHashCode / deepToString pour structures multi-niveaux.',
    trap: 'Arrays.equals sur int[][] ou Object[][].',
  }),
  q({
    n: 7,
    day: 14,
    topic: 'arrays',
    stem: 'System.arraycopy : résultat ?',
    code: `int[] src = {1, 2, 3, 4};
int[] dst = new int[4];
System.arraycopy(src, 1, dst, 0, 2);
System.out.println(Arrays.toString(dst));`,
    choices: ['[1, 2, 0, 0]', '[2, 3, 0, 0]', '[2, 3, 4, 0]', '[0, 1, 2, 3]'],
    correct: 1,
    correctWhy: 'Copie 2 éléments depuis src index 1 → dst index 0 : 2 et 3 ; le reste reste 0.',
    wrongWhy: 'srcPos=1 saute la valeur 1.',
    javaRule: 'arraycopy(src, srcPos, dest, destPos, length) — native, rapide, plages exclusives.',
    trap: 'Inverser srcPos et destPos.',
  }),
  q({
    n: 8,
    day: 14,
    topic: 'arrays',
    stem: 'Arrays.copyOf vs clone :',
    code: `String[] a = {"x", "y"};
String[] b = Arrays.copyOf(a, 3);
System.out.println(Arrays.toString(b));`,
    choices: ['[x, y]', '[x, y, null]', '[x, y, x]', 'Erreur'],
    correct: 1,
    correctWhy: 'copyOf agrandit à length 3 et remplit avec la valeur par défaut (null pour String).',
    wrongWhy: 'clone() garde la même taille ; copyOf peut tronquer ou étendre.',
    javaRule: 'Arrays.copyOf(original, newLength) ; copyOfRange(from, to) bornes type String.substring.',
    trap: 'Oublier que les nouvelles cases sont default-initialized.',
  }),
  q({
    n: 9,
    day: 14,
    topic: 'arrays',
    stem: 'Copie superficielle :',
    code: `StringBuilder[] a = { new StringBuilder("z") };
StringBuilder[] b = a.clone();
b[0].append("!");
System.out.println(a[0]);`,
    choices: ['z', 'z!', 'null', 'Erreur de compilation : clone protected'],
    correct: 1,
    correctWhy: 'clone()/arraycopy sur Object[] copient les références : même StringBuilder mutable.',
    wrongWhy: 'Les tableaux exposent clone() public ; ce n’est pas une deep copy.',
    javaRule: 'Shallow copy : éléments référence partagés ; deep copy manuelle si mutation.',
    trap: 'Croire que clone() de tableau clone aussi les éléments.',
  }),
  q({
    n: 10,
    day: 14,
    topic: 'arrays',
    stem: 'Déclaration multidimensionnelle : laquelle est valide ?',
    choices: [
      'int[][] m = new int[][3];',
      'int[][] m = new int[2][];',
      'int[][] m = new int[][];',
      'int[[]] m = new int[2][3];',
    ],
    correct: 1,
    correctWhy: 'On doit fixer au moins la première dimension : new int[2][] crée 2 lignes null.',
    wrongWhy: 'new int[][3] et new int[][] sont illégaux.',
    javaRule: 'Java = tableaux de tableaux (ragged OK) ; seule la taille de gauche est obligatoire à la création.',
    trap: 'new int[][3] calqué sur d’autres langages.',
  }),
  q({
    n: 11,
    day: 14,
    topic: 'arrays',
    stem: 'Que produit ce programme ?',
    code: `int[][] m = new int[2][];
m[0] = new int[]{1, 2};
m[1] = new int[]{3};
System.out.println(m[0].length + " " + m[1].length);`,
    choices: ['2 3', '2 1', '2 2', 'NullPointerException'],
    correct: 1,
    correctWhy: 'Ragged array : lignes de longueurs 2 et 1.',
    wrongWhy: 'Pas de rectangle forcé.',
    javaRule: 'Chaque m[i] est un int[] indépendant (ou null).',
    trap: 'Accéder m[1][1] → AIOOBE.',
  }),
  q({
    n: 12,
    day: 14,
    topic: 'arrays',
    stem: 'Arrays.sort et Arrays.binarySearch :',
    code: `int[] a = {3, 1, 2};
Arrays.sort(a);
System.out.println(Arrays.binarySearch(a, 1));`,
    choices: ['0', '1', '-1', 'Résultat indéfini'],
    correct: 0,
    correctWhy: 'Après sort → [1,2,3] ; 1 est à l’index 0.',
    wrongWhy: 'binarySearch exige un tableau trié selon le même ordre ; sinon résultat indéfini.',
    javaRule: 'binarySearch : tri préalable ; insertion point = -insertPoint-1 si absent.',
    trap: 'binarySearch sans sort.',
  }),
  q({
    n: 13,
    day: 14,
    topic: 'arrays',
    stem: 'binarySearch élément absent :',
    code: `int[] a = {1, 3, 5};
System.out.println(Arrays.binarySearch(a, 4));`,
    choices: ['2', '-2', '-3', '3'],
    correct: 2,
    correctWhy: '4 s’insérerait à l’index 2 → valeur de retour = -2-1 = -3.',
    wrongWhy: 'Formule : -(insertion point) - 1.',
    javaRule: 'Résultat négatif ≠ simple « -1 » générique.',
    trap: 'Tester == -1 pour « absent » après binarySearch.',
  }),
  q({
    n: 14,
    day: 14,
    topic: 'arrays',
    stem: 'Varargs et tableaux :',
    code: `void v(String... s) {
  System.out.println(s.length);
}
v("a", "b");
v(new String[]{"a", "b", "c"});`,
    choices: ['2 puis 3', '2 puis 1', 'Erreur sur le second appel', '3 puis 3'],
    correct: 0,
    correctWhy: 'String... est un String[] ; passer un tableau existant fournit les éléments tels quels.',
    wrongWhy: 'Le second appel n’enveloppe pas encore une fois le tableau.',
    javaRule: 'varargs = sucre syntaxique sur tableau ; un seul varargs, en dernier paramètre.',
    trap: 'v(null) : ambigu / NPE selon contexte — piège fréquent.',
  }),
  q({
    n: 15,
    day: 14,
    topic: 'arrays',
    stem: 'Que se passe-t-il ?',
    code: `Object[] objs = new String[2];
objs[0] = "ok";
objs[1] = 42;`,
    choices: [
      'Compile et s’exécute',
      'Erreur de compilation sur 42',
      'Compile ; ArrayStoreException à l’exécution sur 42',
      'ClassCastException sur 42',
    ],
    correct: 2,
    correctWhy: 'Le type runtime du tableau est String[] : stocker Integer → ArrayStoreException.',
    wrongWhy: 'La covariance des tableaux est vérifiée dynamiquement (pas à la compile sur Object[]).',
    javaRule: 'Arrays are covariant ; generics are invariant — d’où ArrayStoreException.',
    trap: 'Confondre avec ArrayIndexOutOfBoundsException ou ClassCastException.',
  }),
  q({
    n: 16,
    day: 14,
    topic: 'arrays',
    stem: 'Arrays.fill et Arrays.setAll :',
    code: `int[] a = new int[3];
Arrays.fill(a, 7);
System.out.println(Arrays.toString(a));`,
    choices: ['[0, 0, 0]', '[7, 7, 7]', '[7, 0, 0]', 'Erreur'],
    correct: 1,
    correctWhy: 'fill remplit toutes les positions avec 7.',
    wrongWhy: 'setAll(i -> ...) permet une valeur dépendant de l’index (Java 8+).',
    javaRule: 'fill, setAll, parallelSetAll, mismatch font partie de java.util.Arrays.',
    trap: 'Boucler manuellement sans connaître fill.',
  }),
  q({
    n: 17,
    day: 14,
    topic: 'arrays',
    stem: 'Conversion List ↔ array :',
    code: `List<String> list = List.of("a", "b");
String[] arr = list.toArray(new String[0]);
System.out.println(arr.length);`,
    choices: ['0', '2', '1', 'Erreur : taille 0'],
    correct: 1,
    correctWhy: 'toArray(new String[0]) alloue un tableau de taille adéquate (idiome moderne) ; length 2.',
    wrongWhy: 'Le tableau passé sert de type/réceptacle ; s’il est trop petit, un nouveau est créé.',
    javaRule: 'Collection.toArray(T[]) ; List.of → tableau via toArray ; Arrays.asList ↔ vue (taille fixe).',
    trap: 'Arrays.asList(...).add(...) → UnsupportedOperationException.',
  }),
  q({
    n: 18,
    day: 14,
    topic: 'arrays',
    stem: 'Arrays.asList et set :',
    code: `String[] a = {"p", "q"};
List<String> view = Arrays.asList(a);
view.set(0, "z");
System.out.println(a[0] + view.get(0));`,
    choices: ['pz', 'zz', 'pp', 'UnsupportedOperationException'],
    correct: 1,
    correctWhy: 'asList renvoie une vue taille fixe sur le tableau : set propage vers a[0].',
    wrongWhy: 'add/remove unsupported ; set est OK.',
    javaRule: 'Arrays.asList = fixed-size backed list ; List.of = immutable (pas de set).',
    trap: 'Confondre asList (mutable éléments) et List.of (immuable).',
  }),
  q({
    n: 19,
    day: 14,
    topic: 'arrays',
    stem: 'Char arrays vs String :',
    code: `char[] c = {'a', 'b'};
System.out.println(c.toString().contains("ab"));
System.out.println(new String(c).equals("ab"));`,
    choices: ['true true', 'false true', 'true false', 'false false'],
    correct: 1,
    correctWhy: 'Object.toString() sur char[] → Class@hash, pas le contenu ; new String(c) construit "ab".',
    wrongWhy: 'Utiliser String.valueOf(c) ou new String(c) pour le contenu.',
    javaRule: 'Arrays.toString(c) pour affichage debug des tableaux.',
    trap: 'println(array) sans Arrays.toString (sauf char[] avec certaines surcharges PrintStream — attention : println(char[]) affiche le contenu !).',
  }),
  q({
    n: 20,
    day: 14,
    topic: 'arrays',
    stem: 'PrintStream.println(char[]) piège :',
    code: `char[] c = {'O', 'K'};
System.out.println(c);
System.out.println(Arrays.toString(c));`,
    choices: [
      'Les deux affichent [O, K]',
      'OK puis [O, K]',
      '[O, K] puis OK',
      'Adresse mémoire deux fois',
    ],
    correct: 1,
    correctWhy: 'println(char[]) a une surcharge qui écrit les caractères ; Arrays.toString formate avec crochets.',
    wrongWhy: 'Contrairement à int[], char[] n’affiche pas Type@hash via println.',
    javaRule: 'Surcharge PrintStream.println(char[]) ≠ println(Object).',
    trap: 'Généraliser le comportement de println des tableaux à partir de char[].',
  }),
]
