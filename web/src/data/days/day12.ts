import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day12: Question[] = [
  q({
    n: 1,
    day: 12,
    topic: 'exceptions',
    stem: 'Laquelle est une checked exception ?',
    choices: [
      'NullPointerException',
      'IllegalArgumentException',
      'IOException',
      'ArithmeticException',
    ],
    correct: 2,
    correctWhy: 'IOException étend Exception (pas RuntimeException) → checked : doit être gérée ou déclarée.',
    wrongWhy: 'NPE, IAE et ArithmeticException sont des RuntimeException (unchecked).',
    javaRule: 'Checked = Exception et sous-types hors RuntimeException. Unchecked = RuntimeException + Error.',
    trap: 'Classer Error comme checked (Error est unchecked, rare à catch).',
  }),
  q({
    n: 2,
    day: 12,
    topic: 'exceptions',
    stem: 'Que faut-il pour compiler ?',
    code: `void read() {
  throw new IOException("fail");
}`,
    choices: [
      'Rien : IOException est unchecked',
      'throws IOException ou un try/catch autour du throw',
      'Uniquement un catch de RuntimeException',
      'extends Throwable sur la méthode',
    ],
    correct: 1,
    correctWhy: 'IOException est checked : handle (try/catch) or declare (throws).',
    wrongWhy: 'Sans clause throws ni catch, le compilateur refuse.',
    javaRule: 'Règle handle-or-declare pour les checked exceptions.',
    trap: 'Oublier l’import java.io.IOException et croire que le seul problème est throws.',
  }),
  q({
    n: 3,
    day: 12,
    topic: 'exceptions',
    stem: 'Que produit ce code ?',
    code: `try {
  System.out.print("A");
  throw new RuntimeException();
} catch (RuntimeException e) {
  System.out.print("B");
} finally {
  System.out.print("C");
}
System.out.print("D");`,
    choices: ['ABCD', 'ABC', 'ACD', 'AB puis crash'],
    correct: 0,
    correctWhy: 'Exception catchée → finally s’exécute → le flux continue avec D.',
    wrongWhy: 'finally ne remplace pas la suite du code si l’exception est absorbée.',
    javaRule: 'finally s’exécute toujours (sauf JVM halt / System.exit / crash natif), puis reprise si catch a géré.',
    trap: 'Croire que finally empêche l’exécution du code après le try/catch.',
  }),
  q({
    n: 4,
    day: 12,
    topic: 'exceptions',
    stem: 'Ordre des catch : lequel compile ?',
    code: `try {
  throw new FileNotFoundException();
} catch (/* ? */) { }`,
    choices: [
      'catch (Exception e) {} catch (IOException e) {}',
      'catch (IOException e) {} catch (Exception e) {}',
      'catch (IOException e) {} catch (FileNotFoundException e) {}',
      'catch (RuntimeException e) {} catch (FileNotFoundException e) {} // OK car unrelated',
    ],
    correct: 1,
    correctWhy: 'Du plus spécifique au plus général : IOException puis Exception.',
    wrongWhy: 'Exception avant IOException / FNFE après IOException = unreachable catch (erreur de compilation). FNFE n’est pas RuntimeException.',
    javaRule: 'Un catch plus large ne doit pas précéder un catch plus spécifique du même arbre.',
    trap: 'Inverser Exception et IOException.',
  }),
  q({
    n: 5,
    day: 12,
    topic: 'exceptions',
    stem: 'Multi-catch : quelle déclaration est valide ?',
    choices: [
      'catch (IOException | Exception e)',
      'catch (FileNotFoundException | IOException e)',
      'catch (NullPointerException | IllegalArgumentException e)',
      'catch (IOException e1 | SQLException e2)',
    ],
    correct: 2,
    correctWhy: 'NPE et IAE sont siblings (RuntimeException) : multi-catch OK. Le paramètre est implicitly final.',
    wrongWhy: 'IOException | Exception : Exception est parent de IOException → interdit. FNFE | IOException : parent/enfant interdit. Une seule variable e.',
    javaRule: 'Multi-catch : alternatives disjointes (aucune ne sous-type l’autre) ; e est final.',
    trap: 'Combiner une checked et sa super-classe dans le même multi-catch.',
  }),
  q({
    n: 6,
    day: 12,
    topic: 'exceptions',
    stem: 'Que se passe-t-il dans ce multi-catch ?',
    code: `try {
  // may throw IOException or SQLException
} catch (IOException | SQLException e) {
  e = new IOException(); // ?
}`,
    choices: [
      'Compile et remplace e',
      'Erreur de compilation : e est effectively final',
      'Compile mais NPE',
      'SQLException ne peut pas être avec IOException',
    ],
    correct: 1,
    correctWhy: 'Le paramètre d’un multi-catch est implicitly final ; réaffectation interdite.',
    wrongWhy: 'IOException et SQLException sont bien siblings sous Exception.',
    javaRule: 'Multi-catch parameter = final. Catch simple : e n’est pas final par défaut.',
    trap: 'Réassigner e dans un multi-catch comme dans un catch classique.',
  }),
  q({
    n: 7,
    day: 12,
    topic: 'exceptions',
    stem: 'try-with-resources : laquelle est vraie ?',
    code: `try (var in = new FileInputStream("a.txt")) {
  // ...
}`,
    choices: [
      'close() est appelé seulement en cas d’exception',
      'close() est appelé automatiquement à la fin du try, succès ou échec',
      'Il faut un finally { in.close(); } obligatoire',
      'FileInputStream n’est pas AutoCloseable',
    ],
    correct: 1,
    correctWhy: 'TWR appelle close() sur les ressources déclarées dans try (...), même si le bloc se termine normalement ou avec exception.',
    wrongWhy: 'FileInputStream implémente Closeable ⊂ AutoCloseable ; finally manuel est redondant.',
    javaRule: 'try-with-resources = AutoCloseable ; fermeture en ordre inverse de déclaration.',
    trap: 'Ajouter un close() manuel dans finally et provoquer une double fermeture confuse.',
  }),
  q({
    n: 8,
    day: 12,
    topic: 'exceptions',
    stem: 'Ordre de fermeture TWR ?',
    code: `try (var a = openA(); var b = openB(); var c = openC()) {
  // ...
}`,
    choices: [
      'a, b, c',
      'c, b, a',
      'Ordre indéterminé',
      'Seule c est fermée',
    ],
    correct: 1,
    correctWhy: 'Les ressources sont fermées en ordre inverse de leur déclaration : c puis b puis a.',
    wrongWhy: 'Comme une pile (LIFO).',
    javaRule: 'TWR close order = reverse declaration order.',
    trap: 'Supposer l’ordre croissant a→b→c.',
  }),
  q({
    n: 9,
    day: 12,
    topic: 'exceptions',
    stem: 'Quelle ressource peut être utilisée dans try-with-resources ?',
    choices: [
      'Toute classe avec une méthode close()',
      'Toute classe implémentant AutoCloseable (ou Closeable)',
      'Uniquement les classes du package java.io',
      'Uniquement Closeable, pas AutoCloseable',
    ],
    correct: 1,
    correctWhy: 'Le compilateur exige AutoCloseable. Closeable étend AutoCloseable (close throws IOException).',
    wrongWhy: 'Une méthode close() « orpheline » sans interface ne suffit pas.',
    javaRule: 'TWR type must be AutoCloseable. AutoCloseable.close() throws Exception ; Closeable throws IOException.',
    trap: 'Confondre Closeable et AutoCloseable (les deux marchent ; Closeable ⊂ AutoCloseable).',
  }),
  q({
    n: 10,
    day: 12,
    topic: 'exceptions',
    stem: 'Variable effectivement finale dans TWR (Java 9+) :',
    code: `var reader = new BufferedReader(new FileReader("f.txt"));
try (reader) {
  System.out.println(reader.readLine());
}`,
    choices: [
      'Erreur : la ressource doit être déclarée dans les parenthèses',
      'Valide si reader est final ou effectively final',
      'Valide même si on réassigne reader après',
      'Interdit depuis Java 21',
    ],
    correct: 1,
    correctWhy: 'Depuis Java 9, on peut référencer une variable existante effectively final dans try (...).',
    wrongWhy: 'Réassigner reader casse effectively final → ne compile plus.',
    javaRule: 'TWR resource : déclaration dans try, ou variable finale/effectively final préexistante.',
    trap: 'Modifier la variable ressource après le try (ou avant de façon à casser effectively final).',
  }),
  q({
    n: 11,
    day: 12,
    topic: 'exceptions',
    stem: 'Que compile pour une méthode qui déclare throws IOException ?',
    code: `void m() throws IOException { /* ... */ }
void caller() {
  // ?
}`,
    choices: [
      'm(); sans rien',
      'try { m(); } catch (IOException e) { }',
      'try { m(); } catch (Exception e) { } // interdit car trop large',
      'caller() doit extends Exception',
    ],
    correct: 1,
    correctWhy: 'caller doit catch IOException (ou super-type Exception) ou déclarer throws IOException.',
    wrongWhy: 'catch (Exception) est autorisé (large mais compile). Sans handle/declare → erreur.',
    javaRule: 'Les checked propagées par un appel doivent être gérées ou redéclarées.',
    trap: 'Penser que catch (Exception) est illégal pour une IOException.',
  }),
  q({
    n: 12,
    day: 12,
    topic: 'exceptions',
    stem: 'Override et throws : lequel est valide ?',
    code: `class Base {
  void m() throws IOException { }
}`,
    choices: [
      'class Sub extends Base { void m() throws Exception { } }',
      'class Sub extends Base { void m() throws FileNotFoundException { } }',
      'class Sub extends Base { void m() throws SQLException { } }',
      'class Sub extends Base { void m() throws Throwable { } }',
    ],
    correct: 1,
    correctWhy: 'FileNotFoundException ⊂ IOException : affiner les checked lancées est OK. On peut aussi n’en lancer aucune.',
    wrongWhy: 'Exception / Throwable / SQLException élargissent ou changent l’arbre checked → override invalide.',
    javaRule: 'L’override ne peut pas ajouter de nouvelles checked plus larges ; unchecked libres ; narrowing OK.',
    trap: 'Ajouter throws Exception sur l’override « pour être large ».',
  }),
  q({
    n: 13,
    day: 12,
    topic: 'exceptions',
    stem: 'Que produit ce code ?',
    code: `String s = null;
try {
  return "try";
} finally {
  return "finally";
}`,
    choices: [
      'try',
      'finally',
      'null',
      'Erreur de compilation : double return',
    ],
    correct: 1,
    correctWhy: 'Le return du finally remplace la valeur du try (anti-pattern exam).',
    wrongWhy: 'Les deux return compilent ; finally gagne.',
    javaRule: 'Un return/throw dans finally écrase le return/exception du try/catch.',
    trap: 'Mettre return dans finally (masque l’exception ou la valeur).',
  }),
  q({
    n: 14,
    day: 12,
    topic: 'exceptions',
    stem: 'catch (Exception e) capture-t-il Error ?',
    choices: [
      'Oui, toujours',
      'Non : Error n’étend pas Exception',
      'Oui seulement OutOfMemoryError',
      'Oui via multi-catch obligatoire',
    ],
    correct: 1,
    correctWhy: 'Throwable a deux branches : Exception et Error. catch (Exception) ignore Error.',
    wrongWhy: 'OutOfMemoryError ⊂ Error, pas Exception.',
    javaRule: 'catch (Throwable) ou catch (Error) pour les Error (rarement recommandé).',
    trap: 'catch (Exception e) et croire couvrir tout Throwable.',
  }),
  q({
    n: 15,
    day: 12,
    topic: 'exceptions',
    stem: 'Quel est le résultat ?',
    code: `try {
  throw new Exception("E");
} catch (Exception e) {
  throw new RuntimeException("R");
} finally {
  System.out.print("F");
}`,
    choices: [
      'Affiche F puis RuntimeException(R) se propage',
      'Exception(E) se propage, F non exécuté',
      'Compile error',
      'Affiche F puis Exception(E)',
    ],
    correct: 0,
    correctWhy: 'finally s’exécute avant la propagation de la RuntimeException lancée dans catch.',
    wrongWhy: 'L’exception d’origine E est remplacée/perdue (sauf suppressed si TWR — ici simple throw).',
    javaRule: 'finally avant sortie du bloc try ; une nouvelle exception dans catch devient la primaire.',
    trap: 'Penser que finally est sauté quand catch rethrow.',
  }),
  q({
    n: 16,
    day: 12,
    topic: 'exceptions',
    stem: 'Assertions vs exceptions : pour l’examen OCP, laquelle est vraie ?',
    choices: [
      'assert est toujours activé en production',
      'assert x > 0; lance AssertionError (unchecked) si désactivé… non, si activé et faux',
      'assert remplace les checked exceptions',
      'assert IllegalArgumentException',
    ],
    correct: 1,
    correctWhy: 'assert condition : si -ea et condition false → AssertionError. Par défaut les asserts sont off.',
    wrongWhy: 'Pas un substitut du validation métier publique ; AssertionError ⊂ Error.',
    javaRule: 'Assertions = contrôles internes optionnels (-ea), pas la validation d’API publique.',
    trap: 'Utiliser assert pour valider les arguments publics (préférer IAE/NPE documentés).',
  }),
  q({
    n: 17,
    day: 12,
    topic: 'exceptions',
    stem: 'try-with-resources avec catch et finally : ordre ?',
    code: `try (Resource r = ...) {
  // body
} catch (Exception e) {
  // catch
} finally {
  // finally
}`,
    choices: [
      'body → catch → close → finally',
      'body → close → catch (si besoin) → finally',
      'close → body → catch → finally',
      'body → finally → close → catch',
    ],
    correct: 1,
    correctWhy: 'À la sortie du try, close() d’abord ; ensuite catch si une exception reste ; puis finally.',
    wrongWhy: 'La fermeture précède le traitement catch du try-with-resources.',
    javaRule: 'TWR: resources closed before catch/finally of the same statement.',
    trap: 'Supposer que catch voit la ressource encore ouverte.',
  }),
  q({
    n: 18,
    day: 12,
    topic: 'exceptions',
    stem: 'Lequel compile sans throws sur main ?',
    code: `public static void main(String[] args) {
  // ?
}`,
    choices: [
      'throw new IOException();',
      'throw new Exception();',
      'throw new NullPointerException();',
      'throw new SQLException();',
    ],
    correct: 2,
    correctWhy: 'NPE est unchecked : pas besoin de throws sur main.',
    wrongWhy: 'IOException, Exception, SQLException sont checked.',
    javaRule: 'Unchecked : RuntimeException et Error — pas de handle-or-declare obligatoire.',
    trap: 'Ajouter throws Exception partout « au cas où ».',
  }),
  q({
    n: 19,
    day: 12,
    topic: 'exceptions',
    stem: 'Que fait ce catch ?',
    code: `try {
  Files.readString(Path.of("missing.txt"));
} catch (IOException e) {
  throw new UncheckedIOException(e);
}`,
    choices: [
      'Illegal : on ne peut pas wrapper une checked',
      'Transforme une checked en unchecked en conservant la cause',
      'Perd toujours la stack trace',
      'Compile seulement avec multi-catch',
    ],
    correct: 1,
    correctWhy: 'UncheckedIOException enveloppe IOException ; l’appelant n’est plus forcé de déclarer throws IOException.',
    wrongWhy: 'Pattern courant des API modernes ; getCause() retrouve l’IOException.',
    javaRule: 'Wrapper checked→unchecked via constructeur (cause) pour les lambdas / streams.',
    trap: 'throw e; après catch en perdant le typage, ou new RuntimeException() sans cause.',
  }),
  q({
    n: 20,
    day: 12,
    topic: 'exceptions',
    stem: 'Bloc try sans catch ni finally : valide ?',
    code: `try (var w = Files.newBufferedWriter(path)) {
  w.write("x");
}`,
    choices: [
      'Non : try exige catch ou finally',
      'Oui : try-with-resources peut omettre catch et finally',
      'Oui seulement si write ne lance rien',
      'Non depuis Java 21',
    ],
    correct: 1,
    correctWhy: 'Un try « classique » exige catch ou finally ; un TWR peut se suffire des ressources (close implicite).',
    wrongWhy: 'write lance IOException checked : soit catch, soit throws sur la méthode englobante — mais la forme TWR sans catch/finally est syntaxiquement OK.',
    javaRule: 'try { } seul = illegal ; try (resources) { } = legal (modulo checked du body).',
    trap: 'Confondre la règle du try classique avec celle du TWR.',
  }),
]
