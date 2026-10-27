import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day02: Question[] = [
  q({
    n: 1,
    day: 2,
    topic: 'math',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println(Math.min(3, 5));
    System.out.println(Math.max(3.2, 3.20));
    System.out.println(Math.round(3.5));
    System.out.println(Math.round(-3.5));
  }
}`,
    choices: [
      '3 puis 3.2 puis 4 puis -3',
      '3 puis 3.20 puis 4 puis -4',
      '3 puis 3.2 puis 3 puis -3',
      '5 puis 3.2 puis 4 puis -4',
    ],
    correct: 0,
    correctWhy: 'min→3. max sur doubles égaux→3.2. round(3.5)→4 (floor(x+0.5)). round(-3.5)→floor(-3.0)=−3.',
    wrongWhy: 'round n’utilise pas « away from zero » pour les .5 négatifs ; -3.5 devient -3.',
    javaRule: 'Math.round(double) : (long)Math.floor(a + 0.5). Affichage 3.20 vs 3.2 : même double, println affiche 3.2.',
    trap: 'Attendre -4 pour Math.round(-3.5).',
  }),
  q({
    n: 2,
    day: 2,
    topic: 'math',
    stem: 'Que produit ce code ?',
    code: `System.out.println(Math.ceil(2.1));
System.out.println(Math.floor(2.9));
System.out.println(Math.ceil(-2.1));
System.out.println(Math.floor(-2.1));`,
    choices: [
      '3.0 2.0 -2.0 -3.0',
      '3.0 2.0 -3.0 -2.0',
      '2.0 2.0 -2.0 -2.0',
      '3 2 -2 -3',
    ],
    correct: 0,
    correctWhy: 'ceil = plus petit entier ≥ x ; floor = plus grand entier ≤ x. Résultats en double : 3.0, 2.0, −2.0, −3.0.',
    wrongWhy: 'Pour les négatifs, ceil(-2.1)=−2.0 et floor(-2.1)=−3.0 — souvent inversés par erreur.',
    javaRule: 'ceil / floor renvoient double. Vers +∞ pour ceil, vers −∞ pour floor.',
    trap: 'Inverser ceil/floor sur les nombres négatifs.',
  }),
  q({
    n: 3,
    day: 2,
    topic: 'math',
    stem: 'Quelle affirmation est vraie ?',
    choices: [
      'Math.abs(Integer.MIN_VALUE) renvoie Integer.MIN_VALUE (négatif)',
      'Math.abs(Integer.MIN_VALUE) renvoie Integer.MAX_VALUE',
      'Math.abs(Integer.MIN_VALUE) lance ArithmeticException',
      'Math.abs ne s’applique qu’aux double',
    ],
    correct: 0,
    correctWhy: '−Integer.MIN_VALUE n’est pas représentable en int ; abs(MIN_VALUE) reste MIN_VALUE (overflow silencieux).',
    wrongWhy: 'Pas d’exception pour Math.abs(int) ; le résultat n’est pas MAX_VALUE.',
    javaRule: 'Overflow silencieux sur int/long aussi pour Math.abs aux valeurs minimales.',
    trap: 'Supposer que abs renvoie toujours une valeur ≥ 0.',
  }),
  q({
    n: 4,
    day: 2,
    topic: 'math',
    stem: 'Quelle est la sortie ?',
    code: `System.out.println(Math.pow(2, 3));
System.out.println(Math.sqrt(16));
System.out.println((int)Math.pow(2, 3));`,
    choices: ['8.0 4.0 8', '8 4 8', '8.0 4 8', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'pow et sqrt renvoient double → 8.0 et 4.0. Le cast (int) tronque 8.0 → 8.',
    wrongWhy: 'Sans cast, println affiche 8.0 pas 8.',
    javaRule: 'Math.pow / Math.sqrt → double.',
    trap: 'Attendre des int pour pow/sqrt.',
  }),
  q({
    n: 5,
    day: 2,
    topic: 'string',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    String a = "java";
    String b = "java";
    String c = new String("java");
    System.out.println(a == b);
    System.out.println(a == c);
    System.out.println(a.equals(c));
  }
}`,
    choices: [
      'true false true',
      'true true true',
      'false false true',
      'false true true',
    ],
    correct: 0,
    correctWhy: 'Littéraux "java" partagent le pool → a==b true. new String crée une nouvelle instance → a==c false. equals compare le contenu → true.',
    wrongWhy: '== compare les références ; equals le contenu.',
    javaRule: 'String internées (littéraux) vs new String(...).',
    trap: 'Utiliser == pour comparer le contenu des String.',
  }),
  q({
    n: 6,
    day: 2,
    topic: 'string',
    stem: 'Que produit ce programme ?',
    code: `public class Main {
  public static void main(String[] args) {
    String s = "abc";
    s.toUpperCase();
    s.concat("XYZ");
    System.out.println(s);
  }
}`,
    choices: ['abc', 'ABC', 'abcXYZ', 'ABCXYZ'],
    correct: 0,
    correctWhy: 'String est immuable : toUpperCase/concat renvoient de nouvelles chaînes ignorées ici. s reste "abc".',
    wrongWhy: 'Sans réaffectation (s = ...), l’objet original ne change pas.',
    javaRule: 'Toute « modification » de String produit une nouvelle instance.',
    trap: 'Oublier de réassigner le résultat des méthodes String.',
  }),
  q({
    n: 7,
    day: 2,
    topic: 'string',
    stem: 'Quelle est la sortie ?',
    code: `String s = "hello";
System.out.println(s.substring(1, 4));
System.out.println(s.charAt(1));
System.out.println(s.indexOf('l'));
System.out.println(s.indexOf('L'));`,
    choices: [
      'ell e 2 -1',
      'ell e 3 -1',
      'ello e 2 -1',
      'ell l 2 2',
    ],
    correct: 0,
    correctWhy: 'substring(1,4) → indices [1,4) = "ell". charAt(1)=\'e\'. indexOf(\'l\')=2. \'L\' absent → -1 (sensible à la casse).',
    wrongWhy: 'La borne de fin de substring est exclusive. indexOf est case-sensitive.',
    javaRule: 'substring(begin, end) : begin inclus, end exclus. indexOf renvoie -1 si absent.',
    trap: 'Inclure l’index de fin dans substring ou croire que indexOf ignore la casse.',
  }),
  q({
    n: 8,
    day: 2,
    topic: 'string',
    stem: 'Quelle est la sortie ?',
    code: `String s = "a" + "b" + 1 + 2;
String t = 1 + 2 + "a" + "b";
System.out.println(s);
System.out.println(t);`,
    choices: ['ab12 puis 3ab', 'ab3 puis 3ab', 'ab12 puis 12ab', '3ab puis ab12'],
    correct: 0,
    correctWhy: 'Associativité gauche : "a"+"b"→"ab", +"1"→"ab1", +"2"→"ab12". Pour t : 1+2=3 puis "3"+"a"+"b"="3ab".',
    wrongWhy: 'Dès qu’un opérande est String, + devient concaténation ; avant cela, + reste numérique.',
    javaRule: '+ s’évalue de gauche à droite ; le type change le sens (somme vs concat).',
    trap: 'Calculer 1+2 après le début de la concaténation dans s.',
  }),
  q({
    n: 9,
    day: 2,
    topic: 'string',
    stem: 'Que se passe-t-il ?',
    code: `String s = null;
System.out.println(s + "x");
System.out.println("x".concat(s));`,
    choices: [
      'nullx puis NullPointerException',
      'nullx puis nullx',
      'NPE puis NPE',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 's+"x" convertit null en "null" → "nullx". concat(null) exige une String non null → NPE.',
    wrongWhy: '+ tolère null (texte "null") ; concat non.',
    javaRule: 'Concaténation + avec null → "null". String.concat(null) → NullPointerException.',
    trap: 'Traiter + et concat comme équivalents face à null.',
  }),
  q({
    n: 10,
    day: 2,
    topic: 'string',
    stem: 'Quelle est la sortie ?',
    code: `String s = "banana";
System.out.println(s.replace('a', 'o'));
System.out.println(s.replace("an", "o"));
System.out.println(s);`,
    choices: [
      'bonono bono banana',
      'bonono bono bono',
      'bonono banana banana',
      'Erreur : replace ne prend pas char',
    ],
    correct: 0,
    correctWhy: "replace('a','o') → \"bonono\". replace(\"an\",\"o\") remplace chaque \"an\" → \"bono\". s immuable reste \"banana\".",
    wrongWhy: 'Les résultats ne sont pas réassignés à s.',
    javaRule: 'replace existe pour CharSequence et pour char ; String reste immuable.',
    trap: 'Croire que s est muté par replace.',
  }),
  q({
    n: 11,
    day: 2,
    topic: 'string',
    stem: 'Quelle expression est true ?',
    code: `String s = "Java";
String t = "java";`,
    choices: [
      's.equalsIgnoreCase(t)',
      's == t.toLowerCase()',
      's.equals(t)',
      's.compareTo(t) == 0',
    ],
    correct: 0,
    correctWhy: 'equalsIgnoreCase ignore la casse → true. equals et compareTo==0 exigent la même casse. == compare des références.',
    wrongWhy: 't.toLowerCase() crée souvent une nouvelle String ≠ s en référence, et le contenu diffère encore en casse pour equals.',
    javaRule: 'equalsIgnoreCase pour comparaison insensible à la casse ; compareTo pour l’ordre lexicographique.',
    trap: 'Utiliser == après toLowerCase()/intern() sans réflexion.',
  }),
  q({
    n: 12,
    day: 2,
    topic: 'stringbuilder',
    stem: 'Quelle est la sortie ?',
    code: `StringBuilder sb = new StringBuilder("abc");
sb.append("de").insert(0, "X").delete(2, 4);
System.out.println(sb);`,
    choices: ['Xade', 'Xabde', 'Xabcde', 'ade'],
    correct: 0,
    correctWhy: 'append→"abcde" ; insert(0,"X")→"Xabcde" ; delete(2,4) retire indices 2 et 3 (\'b\',\'c\') → "Xade".',
    wrongWhy: 'delete(start,end) : end exclusif. insert décale les caractères suivants.',
    javaRule: 'StringBuilder est mutable ; append/insert/delete renvoient this (chaînage).',
    trap: 'Mal compter les indices après insert.',
  }),
  q({
    n: 13,
    day: 2,
    topic: 'stringbuilder',
    stem: 'Que produit ce code ?',
    code: `StringBuilder a = new StringBuilder("hi");
StringBuilder b = new StringBuilder("hi");
System.out.println(a.equals(b));
System.out.println(a.toString().equals(b.toString()));`,
    choices: ['false true', 'true true', 'false false', 'true false'],
    correct: 0,
    correctWhy: 'StringBuilder n’override pas equals : equals = identité (==) → false. toString() puis equals String → true.',
    wrongWhy: 'Contrairement à String, deux StringBuilder au même contenu ne sont pas equals.',
    javaRule: 'StringBuilder/StringBuffer héritent equals d’Object (référence).',
    trap: 'Comparer des StringBuilder avec equals comme des String.',
  }),
  q({
    n: 14,
    day: 2,
    topic: 'stringbuilder',
    stem: 'Quelle est la sortie ?',
    code: `StringBuilder sb = new StringBuilder(5);
sb.append("abcdef");
System.out.println(sb.capacity() >= 6);
System.out.println(sb.length());`,
    choices: [
      'true puis 6',
      'false puis 6',
      'true puis 5',
      'Erreur : capacité fixe à 5',
    ],
    correct: 0,
    correctWhy: 'La capacité initiale 5 s’agrandit automatiquement si besoin. length() = nombre de caractères = 6.',
    wrongWhy: 'Dépasser la capacité n’est pas une erreur ; le buffer croît.',
    javaRule: 'capacity = taille du buffer interne ; length = caractères utilisés. Expansion automatique.',
    trap: 'Confondre capacity et length, ou croire à une borne dure.',
  }),
  q({
    n: 15,
    day: 2,
    topic: 'stringbuilder',
    stem: 'Que se passe-t-il ?',
    code: `StringBuilder sb = new StringBuilder("012345");
sb.setLength(3);
System.out.println(sb);
sb.setLength(5);
System.out.println(sb.length() + ":" + sb.charAt(3));`,
    choices: [
      '012 puis 5 et caractère nul (\\u0000)',
      '012 puis 3 et exception',
      '012345 puis 5',
      'Erreur de compilation sur setLength',
    ],
    correct: 0,
    correctWhy: 'setLength(3) tronque → "012". setLength(5) étend avec \\u0000 ; length=5, charAt(3)=\\u0000.',
    wrongWhy: 'L’extension ne restaure pas les anciens caractères au-delà de la nouvelle longueur précédente.',
    javaRule: 'setLength tronque ou pad avec le caractère nul.',
    trap: 'Croire que setLength(5) récupère "01234" ou "012345".',
  }),
  q({
    n: 16,
    day: 2,
    topic: 'string',
    stem: 'Quelle est la sortie ?',
    code: `String s = "  Ja va  ";
System.out.println("[" + s.strip() + "]");
System.out.println("[" + s.trim() + "]");
System.out.println(s.isBlank());`,
    choices: [
      '[Ja va] [Ja va] false',
      '[Ja va] [Ja va] true',
      '[Java] [Java] false',
      '[ Ja va ] [Ja va] false',
    ],
    correct: 0,
    correctWhy: 'strip/trim retirent les espaces de début/fin mais pas l’espace intérieur. isBlank() false car il reste des caractères non blancs.',
    wrongWhy: 'strip ≠ suppression de tous les espaces. isBlank est true seulement si vide ou que des blancs.',
    javaRule: 'strip (Unicode) vs trim (≤ U+0020). isBlank depuis Java 11.',
    trap: 'Attendre "Java" sans espace central, ou isBlank true.',
  }),
  q({
    n: 17,
    day: 2,
    topic: 'string',
    stem: 'Quelle est la sortie ?',
    code: `String s = "one.two.three";
String[] p = s.split("\\.");
System.out.println(p.length + " " + p[1]);`,
    choices: ['3 two', '1 one.two.three', '3 .', 'Erreur : pattern invalide'],
    correct: 0,
    correctWhy: 'split prend une regex. "\\." échappe le point → découpe en 3 parties ; p[1]="two".',
    wrongWhy: 'Avec ".", le point signifie « n’importe quel caractère » en regex — d’où l’échappement.',
    javaRule: 'String.split(regex). Le point doit être échappé : "\\\\." dans le littéral Java.',
    trap: 'Utiliser split(".") et obtenir un résultat inattendu.',
  }),
  q({
    n: 18,
    day: 2,
    topic: 'stringbuilder',
    stem: 'Quelle est la sortie ?',
    code: `StringBuilder sb = new StringBuilder("ABCDE");
sb.reverse().deleteCharAt(0).append("Z");
System.out.println(sb);`,
    choices: ['DCBAZ', 'EDCBAZ', 'EDCBZ', 'ABCDEZ'],
    correct: 0,
    correctWhy: 'reverse→"EDCBA" ; deleteCharAt(0) retire E →"DCBA" ; append Z →"DCBAZ".',
    wrongWhy: 'deleteCharAt après reverse agit sur le début de la chaîne inversée.',
    javaRule: 'Chaînage mutable : reverse, deleteCharAt, append modifient le même objet.',
    trap: 'Oublier l’effet de reverse sur les indices.',
  }),
  q({
    n: 19,
    day: 2,
    topic: 'math',
    stem: 'Que renvoie toujours Math.random() ?',
    choices: [
      'Un double d tel que 0.0 <= d < 1.0',
      'Un double d tel que 0.0 <= d <= 1.0',
      'Un int entre 0 et 1',
      'Un float entre 0 et 100',
    ],
    correct: 0,
    correctWhy: 'La spécification garantit [0.0, 1.0) : 0 inclus, 1.0 exclu. Le type de retour est double.',
    wrongWhy: '1.0 n’est jamais renvoyé. Ce n’est ni int ni float, ni une échelle 0–100.',
    javaRule: 'Math.random() : double pseudo-aléatoire dans [0.0, 1.0).',
    trap: 'Inclure 1.0 dans l’intervalle, ou confondre avec Random.nextInt.',
  }),
  q({
    n: 20,
    day: 2,
    topic: 'string',
    stem: 'Quelle est la sortie ?',
    code: `String a = "hel" + "lo";
String b = "hello";
String c = "hel";
String d = c + "lo";
System.out.println(a == b);
System.out.println(d == b);
System.out.println(d.intern() == b);`,
    choices: [
      'true false true',
      'true true true',
      'false false true',
      'true false false',
    ],
    correct: 0,
    correctWhy: 'Concaténation de littéraux constants à la compile → a et b dans le pool, a==b true. c+"lo" à l’exécution → nouvelle String, d==b false. intern() ramène au pool → true.',
    wrongWhy: 'La concaténation avec une variable n’est pas forcément internée automatiquement.',
    javaRule: 'Constant folding des littéraux String ; intern() force le pool.',
    trap: 'Assumer que toute concaténation partage le pool.',
  }),
]
