import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day01: Question[] = [
  q({
    n: 1,
    day: 1,
    topic: 'primitives',
    stem: 'Que produit ce programme ?',
    code: `public class Main {
  public static void main(String[] args) {
    byte b = 127;
    b++;
    System.out.println(b);
  }
}`,
    choices: ['127', '-128', '128', 'Erreur de compilation'],
    correct: 1,
    correctWhy: 'byte est signé sur 8 bits (−128..127). Après 127, ++ provoque un wrap-around vers −128.',
    wrongWhy: '128 dépasse la plage byte et n’est pas stocké tel quel ; le code compile car l’incrément se fait sur la variable déjà typée byte.',
    javaRule: 'Les types entiers primitifs (byte, short, int, long) sont en complément à deux et débordent silencieusement (wrap-around).',
    trap: 'Croire que b++ lance une exception ou refuse de dépasser 127.',
  }),
  q({
    n: 2,
    day: 1,
    topic: 'primitives',
    stem: 'Lequel compile sans cast explicite ?',
    code: `int i = 10;
long L = 20L;
float f = 1.0f;
double d = 2.0;`,
    choices: ['i = L;', 'L = i;', 'f = d;', 'i = f;'],
    correct: 1,
    correctWhy: 'int → long est une conversion widening sûre ; aucune perte de précision n’est attendue.',
    wrongWhy: 'long→int, double→float et float→int sont narrowing et exigent un cast explicite.',
    javaRule: 'Widening : byte→short→int→long→float→double (et char→int). Narrowing : cast obligatoire.',
    trap: 'Oublier que float/double peuvent recevoir un long en widening, mais qu’assigner un float à un int exige un cast.',
  }),
  q({
    n: 3,
    day: 1,
    topic: 'primitives',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    int x = 5;
    int y = x++ + ++x;
    System.out.println(x + " " + y);
  }
}`,
    choices: ['7 12', '7 11', '6 11', '6 12'],
    correct: 0,
    correctWhy: 'x++ utilise 5 puis x=6 ; ++x incrémente à 7 puis utilise 7. y=5+7=12, x finit à 7.',
    wrongWhy: 'Confondre post-incrément (valeur avant) et pré-incrément (valeur après) mène à 11 ou un mauvais x.',
    javaRule: 'Postfixincrément : valeur courante puis +1. Pré-incrément : +1 puis valeur.',
    trap: 'Calculer y comme 5+6 ou 6+6 au lieu de 5+7.',
  }),
  q({
    n: 4,
    day: 1,
    topic: 'primitives',
    stem: 'Que se passe-t-il ?',
    code: `char c = 'A';
int n = c + 1;
System.out.println(n);
System.out.println((char)n);`,
    choices: [
      'Affiche 66 puis B',
      'Erreur de compilation sur c + 1',
      'Affiche A1 puis B',
      'Affiche 65 puis A',
    ],
    correct: 0,
    correctWhy: "'A' a le code Unicode 65 ; 65+1=66. Le cast (char)66 donne 'B'.",
    wrongWhy: 'char + int promeut en int (pas de concaténation String). 65 serait sans le +1.',
    javaRule: 'char est un type numérique non signé 16 bits ; les opérations arithmétiques promeuvent au moins en int.',
    trap: 'Penser que char + int concatène comme String.',
  }),
  q({
    n: 5,
    day: 1,
    topic: 'primitives',
    stem: 'Lequel est vrai concernant les littéraux ?',
    choices: [
      'int x = 1_000_000; compile',
      'double d = 1_.5; compile',
      'long L = 1000_; compile',
      'int b = 0b_1010; compile',
    ],
    correct: 0,
    correctWhy: 'Les underscores sont autorisés entre chiffres : 1_000_000 est un littéral int valide.',
    wrongWhy: 'Un underscore ne peut pas être en début/fin de partie numérique, ni adjacent au point décimal, ni juste après 0b/0x.',
    javaRule: 'Depuis Java 7, _ sépare les chiffres dans les littéraux, avec des positions interdites précises.',
    trap: 'Accepter 1_.5 ou 0b_1010 alors qu’ils sont illégaux.',
  }),
  q({
    n: 6,
    day: 1,
    topic: 'primitives',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println(10 / 3);
    System.out.println(10.0 / 3);
    System.out.println(10 % 3);
  }
}`,
    choices: [
      '3 puis ~3.333... puis 1',
      '3.333... trois fois',
      '3 puis 3 puis 1',
      'Erreur : division entière impossible',
    ],
    correct: 0,
    correctWhy: '10/3 est une division entière → 3. 10.0/3 est en double → ~3.333. 10%3 → reste 1.',
    wrongWhy: 'Sans littéral flottant, / sur int tronque vers zéro ; ce n’est pas une erreur.',
    javaRule: 'Sur entiers, / tronque vers zéro ; % donne le reste. Si un opérande est flottant, le résultat est flottant.',
    trap: 'Attendre 3.33 pour 10/3 en int.',
  }),
  q({
    n: 7,
    day: 1,
    topic: 'primitives',
    stem: 'Que produit ce code ?',
    code: `public class Main {
  public static void main(String[] args) {
    float f = 0.1f;
    double d = 0.1;
    System.out.println(f == 0.1);
    System.out.println(d == 0.1);
  }
}`,
    choices: [
      'false puis true',
      'true puis true',
      'false puis false',
      'true puis false',
    ],
    correct: 0,
    correctWhy: '0.1 littéral est un double. f==0.1 compare float promu en double à 0.1d → souvent false. d==0.1 compare deux doubles égaux → true.',
    wrongWhy: 'Le float 0.1f n’a pas exactement la même représentation binaire que le double 0.1.',
    javaRule: 'Les littéraux décimaux sans suffixe sont double. Comparer float et double avec == est trompeur à cause de la précision.',
    trap: 'Assumer que 0.1f == 0.1 est toujours true.',
  }),
  q({
    n: 8,
    day: 1,
    topic: 'wrappers',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    Integer a = 127;
    Integer b = 127;
    Integer c = 128;
    Integer d = 128;
    System.out.println((a == b) + " " + (c == d));
  }
}`,
    choices: ['true true', 'true false', 'false false', 'false true'],
    correct: 1,
    correctWhy:
      'Étape par étape : (1) a == b et c == d comparent des références d’objets Integer, pas la valeur numérique. ' +
      '(2) L’écriture Integer a = 127 est un autoboxing via Integer.valueOf(127). Pour les valeurs de −128 à 127, valueOf réutilise toujours la même instance mise en cache → a et b pointent vers le même objet, donc a == b vaut true. ' +
      '(3) 128 est hors de cette plage : valueOf(128) peut créer (et crée ici) deux instances distinctes → c et d ne sont pas le même objet, donc c == d vaut false. Sortie : true false. ' +
      'Pour comparer la valeur, utilisez a.equals(b) ou a.intValue() == b.intValue() (attention au null).',
    wrongWhy:
      '== entre deux références Integer ne compare pas « est-ce le même nombre ? », mais « est-ce le même objet en mémoire ? ». ' +
      'On confond souvent avec int == int (primitives), où == compare bien les valeurs. Ici a, b, c et d sont des Integer.',
    javaRule:
      'Integer.valueOf (et donc l’autoboxing) met en cache au moins la plage −128..127 : une même valeur dans cette plage → même instance. ' +
      'Au-delà, de nouvelles instances sont autorisées. Pour comparer la valeur de deux Integer, utilisez equals (pas ==).',
    trap:
      'Écrire == entre des Integer hors du cache (−128..127) : deux autoboxings de 128 (ou 1000, etc.) donnent souvent false alors que la valeur est la même.',
  }),
  q({
    n: 9,
    day: 1,
    topic: 'wrappers',
    stem: 'Que se passe-t-il à l’exécution ?',
    code: `public class Main {
  public static void main(String[] args) {
    Integer x = null;
    int y = x;
    System.out.println(y);
  }
}`,
    choices: [
      'NullPointerException',
      'Affiche 0',
      'Affiche null',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'L’unboxing de x (null) en int appelle intValue() sur null → NPE.',
    wrongWhy: 'Le code compile grâce à l’unboxing automatique ; null ne devient pas 0.',
    javaRule: 'Unboxing = appel de xxxValue() sur le wrapper. Si la référence est null → NullPointerException.',
    trap: 'Croire que null unboxé donne 0 ou que le compilateur refuse l’affectation.',
  }),
  q({
    n: 10,
    day: 1,
    topic: 'wrappers',
    stem: 'Quelle affirmation est correcte ?',
    choices: [
      'Boolean.parseBoolean("true") renvoie true (ignorer la casse)',
      'Boolean.parseBoolean("yes") renvoie true',
      'Integer.parseInt(" 42 ") ignore les espaces et renvoie 42',
      'Double.valueOf("1.0").equals(1) est toujours true',
    ],
    correct: 0,
    correctWhy: 'parseBoolean ne renvoie true que pour la chaîne "true" en ignorant la casse ; sinon false (pas d’exception).',
    wrongWhy: '"yes" → false. parseInt n’accepte pas les espaces autour. equals entre Double et Integer est false (types différents).',
    javaRule: 'parseXxx analyse une String vers un primitif ; valueOf renvoie souvent un wrapper. Les règles d’acceptation varient selon le type.',
    trap: 'Croire que toute chaîne « affirmative » parse en true pour Boolean.',
  }),
  q({
    n: 11,
    day: 1,
    topic: 'wrappers',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    Integer i = Integer.valueOf(10);
    Integer j = Integer.valueOf(10);
    System.out.println(i.equals(j));
    System.out.println(i == j);
  }
}`,
    choices: [
      'true puis true (cache)',
      'true puis false toujours',
      'false puis false',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'equals compare la valeur → true. valueOf(10) utilise le cache → même référence → == true.',
    wrongWhy: 'Ce n’est pas « toujours false » pour == dans la plage cache ; new Integer(10) (déprécié) créerait des instances distinctes.',
    javaRule: 'Préférer equals pour la valeur. == ne teste l’identité que pour les références.',
    trap: 'Généraliser « == est toujours faux sur les wrappers ».',
  }),
  q({
    n: 12,
    day: 1,
    topic: 'primitives',
    stem: 'Lequel ne compile pas ?',
    code: `byte b = 1;
short s = 2;
char c = 3;`,
    choices: [
      'byte r = b + s;',
      'int r = b + s;',
      'long r = b + c;',
      'double r = s + c;',
    ],
    correct: 0,
    correctWhy: 'b+s promeut les opérandes en int ; assigner le résultat int à byte exige un cast.',
    wrongWhy: 'Les autres cibles (int, long, double) acceptent le résultat int (éventuellement via widening).',
    javaRule: 'Les opérandes byte/short/char sont promus en int pour +, -, *, /, %, etc.',
    trap: 'Penser que byte + short donne un byte.',
  }),
  q({
    n: 13,
    day: 1,
    topic: 'wrappers',
    stem: 'Que produit ce code ?',
    code: `public class Main {
  static void test(long x) { System.out.print("long "); }
  static void test(Integer x) { System.out.print("Integer "); }
  public static void main(String[] args) {
    test(10);
  }
}`,
    choices: [
      'long ',
      'Integer ',
      'Erreur de compilation (ambigu)',
      'Erreur à l’exécution',
    ],
    correct: 0,
    correctWhy: 'Pour un littéral int, le widening vers long est préféré au boxing vers Integer.',
    wrongWhy: 'Ce n’est pas ambigu : widening gagne sur boxing dans la résolution de surcharge.',
    javaRule: 'Ordre de préférence (résumé OCP) : widening > boxing > varargs.',
    trap: 'Choisir Integer parce que « 10 est un objet » ou croire à une ambiguïté.',
  }),
  q({
    n: 14,
    day: 1,
    topic: 'primitives',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    short s = 10;
    s += 1;
    // s = s + 1; // ligne commentée
    System.out.println(s);
  }
}`,
    choices: [
      '11 — et s = s + 1 ne compilerait pas sans cast',
      '11 — et s = s + 1 compilerait aussi',
      'Erreur de compilation sur s += 1',
      '12',
    ],
    correct: 0,
    correctWhy: 'Les opérateurs composés (+=) incluent un cast implicite vers le type de la variable. s = s + 1 produit un int → refuse sans cast.',
    wrongWhy: 's += 1 compile ; l’affectation simple s = s + 1 ne compile pas.',
    javaRule: 'E1 op= E2 est équivalent à E1 = (T)(E1 op E2) où T est le type de E1.',
    trap: 'Traiter += et = … + … comme strictement équivalents pour les petits entiers.',
  }),
  q({
    n: 15,
    day: 1,
    topic: 'wrappers',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    Boolean b1 = Boolean.valueOf("TrUe");
    Boolean b2 = Boolean.valueOf("yes");
    System.out.println(b1 + " " + b2);
  }
}`,
    choices: ['true false', 'true true', 'false false', 'NullPointerException'],
    correct: 0,
    correctWhy: 'valueOf/parseBoolean : seul "true" (casse ignorée) → true ; toute autre chaîne → false.',
    wrongWhy: '"yes" n’est pas reconnu comme true. Pas de NPE ici.',
    javaRule: 'Boolean.valueOf(String) et parseBoolean : true uniquement pour "true" ignoreCase.',
    trap: 'Mapper "yes"/"1"/"on" vers true.',
  }),
  q({
    n: 16,
    day: 1,
    topic: 'primitives',
    stem: 'Que compile-t-on sans erreur ?',
    choices: [
      'long L = 2_147_483_648;',
      'long L = 2_147_483_648L;',
      'int i = 2_147_483_648;',
      'byte b = 128;',
    ],
    correct: 1,
    correctWhy: 'Sans L, le littéral est int et 2_147_483_648 dépasse Integer.MAX_VALUE. Avec L, c’est un long valide.',
    wrongWhy: 'Le littéral int trop grand ne compile pas, même si la cible est long. byte 128 est hors plage.',
    javaRule: 'Un littéral entier sans suffixe est int. Suffixe L/l pour long. Les bornes du type du littéral s’appliquent avant l’affectation.',
    trap: 'Écrire un grand nombre sans L en pensant que la variable long « sauve » le littéral.',
  }),
  q({
    n: 17,
    day: 1,
    topic: 'wrappers',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    Integer a = 200;
    Integer b = 200;
    System.out.println(a.equals(b));
    System.out.println(a.intValue() == b.intValue());
  }
}`,
    choices: ['true true', 'false false', 'true false', 'false true'],
    correct: 0,
    correctWhy: 'equals compare les valeurs int → true. intValue() unboxe → comparaison primitive 200==200 → true. (== sur références serait souvent false hors cache.)',
    wrongWhy: 'Ici on ne compare pas a==b ; equals et intValue sont fiables pour la valeur.',
    javaRule: 'Pour la valeur numérique des wrappers : equals ou comparaison après unboxing explicite/implicite.',
    trap: 'Confondre avec a==b qui peut être false pour 200.',
  }),
  q({
    n: 18,
    day: 1,
    topic: 'primitives',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    int a = 5;
    int b = 2;
    double r = a / b;
    System.out.println(r);
  }
}`,
    choices: ['2.0', '2.5', '2', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'a/b est d’abord calculé en int (2), puis élargi en double → 2.0.',
    wrongWhy: 'Le type de la variable cible ne change pas le type du calcul a/b.',
    javaRule: 'Le type du résultat d’une opération dépend des opérandes, pas de la variable d’affectation.',
    trap: 'Attendre 2.5 parce que r est double.',
  }),
  q({
    n: 19,
    day: 1,
    topic: 'wrappers',
    stem: 'Que se passe-t-il ?',
    code: `public class Main {
  public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.remove(1);
    System.out.println(list.size());
  }
}`,
    choices: [
      'IndexOutOfBoundsException',
      '0',
      '1',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'remove(1) résout vers remove(int index), pas remove(Object). L’index 1 n’existe pas (seul index 0) → IOOBE.',
    wrongWhy: 'Pour retirer la valeur 1 : remove(Integer.valueOf(1)). size() ne s’affiche pas car l’exception est levée avant.',
    javaRule: 'Surcharge List.remove(int) vs remove(Object) : un littéral int choisit l’index.',
    trap: 'Penser que remove(1) retire l’élément Integer 1.',
  }),
  q({
    n: 20,
    day: 1,
    topic: 'wrappers',
    stem: 'Quelle est la sortie ?',
    code: `public class Main {
  public static void main(String[] args) {
    Integer i = 10;
    Double d = 10.0;
    System.out.println(i.equals(d));
    System.out.println(i.doubleValue() == d);
  }
}`,
    choices: ['false true', 'true true', 'false false', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Integer.equals exige un Integer (instanceof) → false avec Double. Après doubleValue(), 10.0==10.0 → true.',
    wrongWhy: 'equals des wrappers n’est pas une égalité numérique multi-types.',
    javaRule: 'Number.equals compare type + valeur ; pas d’égalité transversale Integer/Double.',
    trap: 'Croire que equals fait une comparaison numérique comme == après promotion.',
  }),
]
