import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day13: Question[] = [
  q({
    n: 1,
    day: 13,
    topic: 'exceptions',
    stem: 'Dans un try-with-resources, si le body lance Ex1 et close() lance Ex2, que voit l’appelant ?',
    choices: [
      'Ex2 seulement ; Ex1 est perdue',
      'Ex1 comme primaire ; Ex2 en suppressed sur Ex1',
      'Ex1 et Ex2 en multi-catch obligatoire',
      'Compilation impossible',
    ],
    correct: 1,
    correctWhy: 'L’exception du corps (ou primaire) reste principale ; celles de close() sont ajoutées via addSuppressed.',
    wrongWhy: 'Avant TWR, close() dans finally pouvait masquer Ex1 — c’est justement ce que TWR corrige.',
    javaRule: 'Primary exception = body (ou première) ; close failures → Throwable.getSuppressed().',
    trap: 'Croire que l’exception de close() remplace toujours celle du body.',
  }),
  q({
    n: 2,
    day: 13,
    topic: 'exceptions',
    stem: 'Comment lire les exceptions suppressed ?',
    code: `catch (Exception e) {
  // ?
}`,
    choices: [
      'e.getCause()',
      'e.getSuppressed()',
      'e.getNextException()',
      'System.suppressed(e)',
    ],
    correct: 1,
    correctWhy: 'getSuppressed() renvoie Throwable[] des exceptions attachées (souvent close() en TWR).',
    wrongWhy: 'getCause() = exception wrappée manuellement ; getNextException = SQLException spécifique.',
    javaRule: 'addSuppressed / getSuppressed depuis Java 7 (Throwable).',
    trap: 'Chercher la close-exception dans getCause() au lieu de getSuppressed().',
  }),
  q({
    n: 3,
    day: 13,
    topic: 'exceptions',
    stem: 'Deux ressources : close de b lance B, close de a lance A ; body OK. Que se passe-t-il ?',
    code: `try (var a = ra(); var b = rb()) { /* ok */ }`,
    choices: [
      'A primaire, B suppressed',
      'B primaire, A suppressed',
      'A et B fusionnées en une seule',
      'Aucune exception',
    ],
    correct: 1,
    correctWhy: 'Fermeture inverse : b puis a. La première exception de close (B) est primaire ; A est suppressed.',
    wrongWhy: 'L’ordre LIFO de close détermine la primaire.',
    javaRule: 'Première exception rencontrée en fermeture = primaire ; suivantes = suppressed.',
    trap: 'Inverser a/b en pensant à l’ordre de déclaration, pas de fermeture.',
  }),
  q({
    n: 4,
    day: 13,
    topic: 'exceptions',
    stem: 'AutoCloseable.close() : signature typique ?',
    choices: [
      'void close() throws IOException',
      'void close() throws Exception',
      'boolean close()',
      'void close() // jamais d’exception',
    ],
    correct: 1,
    correctWhy: 'AutoCloseable.close() déclare throws Exception. Closeable raffine en throws IOException.',
    wrongWhy: 'Closeable ⊂ AutoCloseable avec IOException ; AutoCloseable est plus large.',
    javaRule: 'Préférer Closeable pour les I/O ; AutoCloseable pour ressources non-I/O (ex. JDBC).',
    trap: 'Assumer que tout close() ne lance que IOException.',
  }),
  q({
    n: 5,
    day: 13,
    topic: 'exceptions',
    stem: 'Cette classe peut-elle servir en TWR ?',
    code: `class Door implements AutoCloseable {
  public void close() { System.out.print("C"); }
}
try (Door d = new Door()) {
  System.out.print("T");
}`,
    choices: ['TC', 'CT', 'Erreur : close doit throws Exception', 'Erreur : Door non Closeable'],
    correct: 0,
    correctWhy: 'Implémenter AutoCloseable suffit ; close() peut omettre throws. Affiche T puis C.',
    wrongWhy: 'Closeable n’est pas requis ; throws Exception n’est pas obligatoire à l’implémentation si non lancé.',
    javaRule: 'L’implémentation peut restreindre les exceptions déclarées (ne pas lancer).',
    trap: 'Exiger Closeable pour tout TWR.',
  }),
  q({
    n: 6,
    day: 13,
    topic: 'exceptions',
    stem: 'Piège : close() idempotent ?',
    choices: [
      'Le langage garantit qu’appeler close() deux fois est toujours sûr',
      'Bonne pratique AutoCloseable : close() idempotent ; double close ne doit pas exploser',
      'TWR appelle close() exactement deux fois',
      'close() ne doit jamais être appelé par TWR si le body échoue',
    ],
    correct: 1,
    correctWhy: 'La doc AutoCloseable recommande l’idempotence ; TWR n’appelle close() qu’une fois par ressource, mais le code client peut le faire aussi.',
    wrongWhy: 'Pas de garantie langage magique ; TWR = une fermeture automatique par ressource déclarée.',
    javaRule: 'Design close() pour supporter un second appel sans effet / sans erreur fatale.',
    trap: 'Lancer une exception agressive au second close() alors que le client a aussi un finally.',
  }),
  q({
    n: 7,
    day: 13,
    topic: 'exceptions',
    stem: 'Que se passe-t-il ?',
    code: `try (var r = open()) {
  throw new IllegalStateException("body");
} catch (IllegalStateException e) {
  for (Throwable t : e.getSuppressed()) {
    System.out.print(t.getClass().getSimpleName());
  }
}
// suppose open().close() throws IOException`,
    choices: [
      'Rien n’est imprimé : IOException n’est pas attached car catch absorbe trop tôt',
      'IOException apparaît dans getSuppressed() de IllegalStateException',
      'Erreur de compilation',
      'Seule IOException se propage',
    ],
    correct: 1,
    correctWhy: 'close() s’exécute avant catch ; IOException est suppressed sur l’ISE du body, visible dans catch.',
    wrongWhy: 'La primaire reste celle du body ; catch la reçoit déjà enrichie.',
    javaRule: 'Suppressed attachées avant l’entrée dans catch/finally du TWR.',
    trap: 'Catcher seulement IOException et rater l’ISE primaire.',
  }),
  q({
    n: 8,
    day: 13,
    topic: 'exceptions',
    stem: 'finally manuel qui masque : classique pré-TWR',
    code: `InputStream in = null;
try {
  in = new FileInputStream("f");
  throw new IOException("read");
} finally {
  in.close(); // suppose que close lance aussi IOException
}`,
    choices: [
      'Les deux IOException sont toujours suppressed l’une sur l’autre automatiquement',
      'Sans TWR, l’exception de close() peut masquer celle de read',
      'Impossible : finally ne peut pas lancer',
      'Seule read survit toujours',
    ],
    correct: 1,
    correctWhy: 'Dans un finally classique, une exception (ou return) peut écraser l’exception en cours — d’où TWR + suppressed.',
    wrongWhy: 'addSuppressed n’est pas automatique hors TWR (sauf si vous l’appelez).',
    javaRule: 'Préférer TWR pour ne pas perdre l’exception primaire.',
    trap: 'finally { close(); } sans null-check ni gestion de masking.',
  }),
  q({
    n: 9,
    day: 13,
    topic: 'exceptions',
    stem: 'Lequel est un piège d’examen sur catch (Exception e) { throw e; } ?',
    code: `void m() /* ? */ {
  try {
    throw new IOException();
  } catch (Exception e) {
    throw e;
  }
}`,
    choices: [
      'Ne compile jamais',
      'Depuis Java 7, le compilateur peut analyse rethrow : throws IOException suffit',
      'Il faut obligatoirement throws Exception',
      'throw e; transforme en unchecked',
    ],
    correct: 1,
    correctWhy: 'Rethrow précis : si e n’est pas modifié, le compilateur propage le type effectif (IOException).',
    wrongWhy: 'Pas de promotion magique en unchecked.',
    javaRule: 'More precise rethrow (Java 7+) : catch (Exception e) { throw e; } avec throws IOException.',
    trap: 'Croire qu’il faut throws Exception dès qu’on catch Exception.',
  }),
  q({
    n: 10,
    day: 13,
    topic: 'exceptions',
    stem: 'e modifié avant rethrow :',
    code: `catch (Exception e) {
  e = new IOException();
  throw e;
}`,
    choices: [
      'Toujours OK avec throws IOException seulement',
      'Le typage précis est perdu : souvent throws Exception requis',
      'Interdit : e est toujours final',
      'Compile en RuntimeException',
    ],
    correct: 1,
    correctWhy: 'Réassigner e annule l’analyse de rethrow précis ; le type statique redevient Exception.',
    wrongWhy: 'Dans un catch simple, e n’est pas final (contrairement au multi-catch).',
    javaRule: 'Ne pas réassigner e si on veut le rethrow précis.',
    trap: 'Mélanger multi-catch (e final) et catch simple.',
  }),
  q({
    n: 11,
    day: 13,
    topic: 'exceptions',
    stem: 'Custom exception : bonne pratique OCP ?',
    choices: [
      'Toujours extends Throwable directement',
      'Métier recoverable → checked (Exception) ; erreurs de programmation → RuntimeException',
      'Toujours unchecked seulement',
      'Jamais de constructeur avec cause',
    ],
    correct: 1,
    correctWhy: 'Guideline classique : checked pour l’appelant qui peut récupérer ; unchecked pour préconditions/bugs.',
    wrongWhy: 'Fournir (String), (Throwable), (String, Throwable) est recommandé pour le chaînage.',
    javaRule: 'Choisir la super-classe selon le contrat d’API ; conserver la cause.',
    trap: 'Créer une checked pour chaque erreur de null trivial.',
  }),
  q({
    n: 12,
    day: 13,
    topic: 'exceptions',
    stem: 'Que compile ?',
    code: `class Boom extends RuntimeException {
  Boom(String m, Throwable c) { /* ? */ }
}`,
    choices: [
      'super(m, c);',
      'this.cause = c; seulement',
      'addSuppressed(c); dans le constructeur à la place de cause',
      'Rien : RuntimeException n’a pas de constructeur (String, Throwable)',
    ],
    correct: 0,
    correctWhy: 'Throwable/Exception/RuntimeException exposent super(message, cause).',
    wrongWhy: 'cause est géré par Throwable ; addSuppressed ≠ cause.',
    javaRule: 'getCause() vs getSuppressed() : rôles distincts (wrapper vs TWR close).',
    trap: 'Utiliser addSuppressed pour wrapper une cause métier.',
  }),
  q({
    n: 13,
    day: 13,
    topic: 'exceptions',
    stem: 'Ressource null dans TWR ?',
    code: `AutoCloseable r = null;
try (r) {
  System.out.print("X");
}`,
    choices: [
      'NPE dès l’entrée du try',
      'Affiche X ; close non appelé sur null (pas de NPE)',
      'Erreur de compilation : null interdit',
      'Affiche X puis NPE sur close',
    ],
    correct: 1,
    correctWhy: 'Une ressource null est autorisée ; TWR ignore close() si la référence est null.',
    wrongWhy: 'Pas de NPE automatique pour null resource.',
    javaRule: 'TWR null-friendly : if (resource != null) resource.close();',
    trap: 'Sur-ingénierier un null-check autour du TWR.',
  }),
  q({
    n: 14,
    day: 13,
    topic: 'exceptions',
    stem: 'Piège switch / return dans finally :',
    code: `int m() {
  try {
    throw new RuntimeException();
  } finally {
    return 1;
  }
}`,
    choices: [
      'RuntimeException se propage',
      'Retourne 1 ; l’exception est avalée',
      'Ne compile pas',
      'Retourne 0',
    ],
    correct: 1,
    correctWhy: 'return dans finally supprimer la propagation de l’exception du try.',
    wrongWhy: 'Anti-pattern majeur ; l’examen adore ce piège.',
    javaRule: 'Éviter return/throw dans finally.',
    trap: '« Nettoyer » avec return 0/1 dans finally.',
  }),
  q({
    n: 15,
    day: 13,
    topic: 'exceptions',
    stem: 'Closeable vs AutoCloseable pour JDBC Statement ?',
    choices: [
      'Statement n’est ni l’un ni l’autre',
      'Statement étend AutoCloseable (TWR OK) ; close peut lancer SQLException',
      'Seulement Closeable avec IOException',
      'TWR interdit pour JDBC',
    ],
    correct: 1,
    correctWhy: 'Depuis Java 7, Connection/Statement/ResultSet sont AutoCloseable → try-with-resources recommandé.',
    wrongWhy: 'SQLException est checked ; le close JDBC n’est pas limité à IOException.',
    javaRule: 'TWR + JDBC = pattern d’examen / best practice.',
    trap: 'Fermer ResultSet seulement et oublier Statement/Connection (ordre TWR).',
  }),
  q({
    n: 16,
    day: 13,
    topic: 'exceptions',
    stem: 'Que se passe-t-il si close() lance une unchecked pendant que le body avait déjà une checked ?',
    choices: [
      'La unchecked devient toujours primaire et la checked est perdue',
      'La checked du body reste primaire ; la unchecked de close est suppressed',
      'Les deux deviennent RuntimeException',
      'Deadlock JVM',
    ],
    correct: 1,
    correctWhy: 'Même règle TWR : primaire = exception du body ; close → suppressed, quel que soit checked/unchecked.',
    wrongWhy: 'Le caractère checked/unchecked ne change pas la politique suppressed.',
    javaRule: 'Suppressed list peut contenir checked et unchecked.',
    trap: 'Penser que RuntimeException de close « gagne » toujours.',
  }),
  q({
    n: 17,
    day: 13,
    topic: 'exceptions',
    stem: 'Lequel est un mauvais catch « pokemon » déconseillé à l’examen ?',
    choices: [
      'catch (IOException e) { log(e); throw e; }',
      'catch (Exception e) { /* vide */ }',
      'catch (FileNotFoundException e) { ... } catch (IOException e) { ... }',
      'catch (SQLException | IOException e) { log(e); }',
    ],
    correct: 1,
    correctWhy: 'Avaler Exception sans log ni rethrow cache les bugs ; piège de conception.',
    wrongWhy: 'Les autres options gèrent ou déclarent explicitement.',
    javaRule: 'Ne catch que ce que vous savez traiter ; sinon laisser propager / wrapper.',
    trap: 'catch (Exception e) {} pour « faire compiler ».',
  }),
  q({
    n: 18,
    day: 13,
    topic: 'exceptions',
    stem: 'Stack walking : e.printStackTrace() affiche-t-il les suppressed ?',
    choices: [
      'Non jamais',
      'Oui : printStackTrace liste aussi les suppressed (Suppressed: ...)',
      'Seulement avec -XX:+ShowSuppressed',
      'Seulement getCause()',
    ],
    correct: 1,
    correctWhy: 'printStackTrace() standard affiche les suppressed indentées sous Suppressed:.',
    wrongWhy: 'Pas besoin de flag spécial pour le listing de base.',
    javaRule: 'Logger la primaire et parcourir getSuppressed() en prod structurée.',
    trap: 'Ignorer les lignes Suppressed: dans une stack d’examen / log.',
  }),
  q({
    n: 19,
    day: 13,
    topic: 'exceptions',
    stem: 'Déclarer throws Exception sur close() custom : impact TWR ?',
    code: `class R implements AutoCloseable {
  public void close() throws Exception { throw new Exception("c"); }
}
void m() {
  try (R r = new R()) { }
}`,
    choices: [
      'm compile sans throws / catch',
      'm doit gérer Exception (catch ou throws) car close() checked peut se propager',
      'Exception de close est toujours unchecked',
      'TWR convertit en Error',
    ],
    correct: 1,
    correctWhy: 'Si close() déclare une checked, le compilateur oblige handle-or-declare sur la méthode qui contient le TWR.',
    wrongWhy: 'Pas de conversion automatique en unchecked.',
    javaRule: 'Les exceptions checked de close() font partie de la surface du TWR.',
    trap: 'Implémenter close() throws Exception alors que Closeable/IOException suffirait.',
  }),
  q({
    n: 20,
    day: 13,
    topic: 'exceptions',
    stem: 'Synthèse piège OCP : laquelle est correcte ?',
    choices: [
      'Error doit être catchée dans tout main',
      'catch (Throwable t) est toujours préférable à catch précis',
      'TWR + getSuppressed explique close failures sans perdre le body failure',
      'Multi-catch permet parent | child',
    ],
    correct: 2,
    correctWhy: 'Le duo TWR / suppressed est un objectif central du chapitre exceptions avancé.',
    wrongWhy: 'catch Throwable trop large ; multi-catch refuse parent/enfant ; Error rarement catché.',
    javaRule: 'Maîtriser primary vs suppressed, AutoCloseable, multi-catch disjoint, rethrow précis.',
    trap: 'Mémoriser les API sans comprendre l’ordre close / catch / finally.',
  }),
]
