import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day09: Question[] = [
  q({
    n: 1,
    day: 9,
    topic: 'records',
    stem: 'Que génère implicitement un record ?',
    code: `record Point(int x, int y) {}`,
    choices: [
      'Uniquement un constructeur canonique',
      'Constructeur canonique, accessors x()/y(), equals, hashCode, toString',
      'Setters x/y et champs public mutables',
      'extends Object et implements Cloneable obligatoirement exposé',
    ],
    correct: 1,
    correctWhy:
      'Un record fournit le constructeur canonique, les accessors (même nom que les composants), equals/hashCode/toString basés sur l’état.',
    wrongWhy:
      'Pas de setters : état final. Cloneable n’est pas imposé.',
    javaRule:
      'record = data carrier immuable avec API générée pour les composants.',
    trap: 'Attendre des setters style JavaBean.',
  }),
  q({
    n: 2,
    day: 9,
    topic: 'records',
    stem: 'Compact constructor — rôle ?',
    code: `record User(String name, int age) {
  public User {
    if (age < 0) throw new IllegalArgumentException();
    name = name.trim();
  }
}`,
    choices: [
      'Il remplace totalement le constructeur canonique sans assigner les champs',
      'Il s’exécute avant l’affectation des champs ; peut valider/normaliser les paramètres',
      'Il doit contenir this.name = name explicitement',
      'Il est appelé après equals',
    ],
    correct: 1,
    correctWhy:
      'Le compact ctor valide/normalise les paramètres ; l’affectation aux champs final est générée à la fin. Assigner this.name = name dedans est interdit.',
    wrongWhy:
      'Pas d’affectation explicite aux composants dans le compact constructor.',
    javaRule:
      'Compact constructor : corps sans assignations des champs ; puis assignation automatique.',
    trap: 'Écrire this.x = x dans un compact constructor.',
  }),
  q({
    n: 3,
    day: 9,
    topic: 'records',
    stem: 'Résultat equals ?',
    code: `record P(int x, int y) {}
var a = new P(1, 2);
var b = new P(1, 2);
System.out.println(a.equals(b) + " " + (a == b));`,
    choices: ['true true', 'true false', 'false false', 'false true'],
    correct: 1,
    correctWhy:
      'equals de record compare les composants ⇒ true. == compare l’identité ⇒ false pour deux instances.',
    wrongWhy:
      'Les records ne sont pas internés automatiquement.',
    javaRule:
      'Record.equals : même type runtime de record + composants égaux.',
    trap: 'Confondre equals record et ==.',
  }),
  q({
    n: 4,
    day: 9,
    topic: 'records',
    stem: 'Laquelle est interdite pour un record ?',
    choices: [
      'implémenter une interface',
      'déclarer une méthode d’instance supplémentaire',
      'étendre une autre classe (autre que java.lang.Record)',
      'déclarer un champ static',
    ],
    correct: 2,
    correctWhy:
      'Un record est implicitement final et étend java.lang.Record : pas d’autre extends. implements OK ; méthodes et static OK.',
    wrongWhy:
      'Interfaces, méthodes additionnelles et static sont permis.',
    javaRule:
      'record R ... extends Record ; final ; may implement interfaces.',
    trap: 'Écrire record R extends Base.',
  }),
  q({
    n: 5,
    day: 9,
    topic: 'records',
    stem: 'Accessors — piège de nommage ?',
    code: `record Person(String name) {}
Person p = new Person("Ada");
// quel appel est correct ?`,
    choices: [
      'p.getName()',
      'p.name()',
      'p.Name()',
      'Person.name(p)',
    ],
    correct: 1,
    correctWhy:
      'L’accessor généré porte le nom du composant : name(), pas getName().',
    wrongWhy:
      'Ce n’est pas la convention JavaBean getX sauf si vous l’écrivez vous-même.',
    javaRule:
      'Record accessor = componentName().',
    trap: 'Appeler getName() comme sur un POJO.',
  }),
  q({
    n: 6,
    day: 9,
    topic: 'records',
    stem: 'Record et mutabilité profonde — problème ?',
    code: `record Bag(List<String> items) {}
var list = new ArrayList<String>();
list.add("a");
var bag = new Bag(list);
list.add("b");
System.out.println(bag.items().size());`,
    choices: ['1', '2', '0', 'Erreur de compilation'],
    correct: 1,
    correctWhy:
      'Le record rend la référence items final, pas le contenu de la List. La liste partagée mute → size 2.',
    wrongWhy:
      'Immutabilité superficielle ≠ immutabilité profonde.',
    javaRule:
      'Pour un record vraiment sûr : List.copyOf dans un compact constructor.',
    trap: 'Croire qu’un record rend tout graphe d’objets immuable.',
  }),
  q({
    n: 7,
    day: 9,
    topic: 'records',
    stem: 'Constructeur canonique explicite — valide ?',
    code: `record R(int x) {
  public R(int x) {
    if (x < 0) x = 0;
    this.x = x;
  }
}`,
    choices: [
      'Erreur : this.x = x interdit',
      'Valide : constructeur canonique explicite doit assigner tous les champs',
      'Valide seulement en compact form',
      'Erreur : paramètres non final',
    ],
    correct: 1,
    correctWhy:
      'Un constructeur canonique explicite (signature = composants) doit assigner chaque champ this.comp. Ici c’est correct.',
    wrongWhy:
      'L’interdiction this.x=x concerne le compact constructor, pas la forme canonique complète.',
    javaRule:
      'Canonical constructor explicite : assignations obligatoires ; compact : assignations générées.',
    trap: 'Mélanger les règles compact vs canonique explicite.',
  }),
  q({
    n: 8,
    day: 9,
    topic: 'sealed',
    stem: 'À quoi sert sealed ?',
    choices: [
      'À rendre la classe abstraite automatiquement',
      'À restreindre les sous-types directs à une liste permits',
      'À interdire toute méthode nouvelle dans les sous-classes',
      'À remplacer final dans tous les cas',
    ],
    correct: 1,
    correctWhy:
      'sealed (classe ou interface) limite les sous-types autorisés via permits (ou sous-types same-file).',
    wrongWhy:
      'Les sous-types listés peuvent ajouter des membres (sauf autres contraintes). final est un cas extrême (0 sous-type).',
    javaRule:
      'sealed + permits ; chaque sous-type direct doit être final, sealed ou non-sealed.',
    trap: 'Omettre final/sealed/non-sealed sur un sous-type permis.',
  }),
  q({
    n: 9,
    day: 9,
    topic: 'sealed',
    stem: 'Lequel compile ?',
    code: `public sealed class Shape permits Circle, Rect {}
// candidats de sous-types`,
    choices: [
      'public class Circle extends Shape {}',
      'public final class Circle extends Shape {}',
      'public class Triangle extends Shape {}',
      'public non-sealed class Circle {} // sans extends',
    ],
    correct: 1,
    correctWhy:
      'Circle doit être dans permits et déclaré final, sealed ou non-sealed, et extends Shape. Triangle n’est pas permis.',
    wrongWhy:
      'Sans modificateur final/sealed/non-sealed → erreur. Hors permits → erreur.',
    javaRule:
      'Direct subclass of sealed: listed in permits + final|sealed|non-sealed.',
    trap: 'Écrire une sous-classe « normale » sans final/sealed/non-sealed.',
  }),
  q({
    n: 10,
    day: 9,
    topic: 'sealed',
    stem: 'permits omis — quand est-ce légal ?',
    code: `public sealed interface Node /* permits ? */ {
  record Leaf(int v) implements Node {}
  record Branch(Node left, Node right) implements Node {}
}`,
    choices: [
      'Toujours illégal sans permits',
      'Légal : sous-types dans la même unité de compilation (ici nested) ⇒ permits inféré',
      'Légal seulement pour sealed class, pas interface',
      'Légal seulement avec non-sealed',
    ],
    correct: 1,
    correctWhy:
      'Si tous les sous-types sont dans le même fichier, permits peut être omis et est inféré.',
    wrongWhy:
      'Les sealed interfaces existent. non-sealed n’est pas requis pour Leaf/Branch records (records sont final).',
    javaRule:
      'Same compilation unit ⇒ permits optionnel / inféré.',
    trap: 'Toujours exiger permits explicite même en nested types.',
  }),
  q({
    n: 11,
    day: 9,
    topic: 'sealed',
    stem: 'non-sealed signifie ?',
    choices: [
      'La classe ne peut plus être étendue',
      'La branche rouvre l’héritage : sous-classes hors de la hiérarchie sealed d’origine possibles',
      'Équivalent à final',
      'Interdit sur les interfaces',
    ],
    correct: 1,
    correctWhy:
      'non-sealed sur un sous-type permis rouvre l’extension au-delà du ensemble sealed initial.',
    wrongWhy:
      'final ferme ; non-sealed ouvre. Interfaces sealed peuvent avoir des sous-interfaces non-sealed.',
    javaRule:
      'Triade des sous-types directs : final | sealed | non-sealed.',
    trap: 'Confondre non-sealed et final.',
  }),
  q({
    n: 12,
    day: 9,
    topic: 'records',
    stem: 'Peut-on déclarer des champs d’instance supplémentaires ?',
    code: `record R(int x) {
  private final int y = 1;
}`,
    choices: [
      'Oui, librement',
      'Non : seuls les composants du header sont des champs d’instance (pas de champ d’instance extra)',
      'Oui si non-final',
      'Oui si static retiré de y',
    ],
    correct: 1,
    correctWhy:
      'Un record ne peut pas déclarer de champs d’instance autres que ses composants. Les static sont OK.',
    wrongWhy:
      'y comme champ d’instance additionnel est illégal, final ou non.',
    javaRule:
      'Instance state of a record = its components only.',
    trap: 'Ajouter un cache d’instance non-static dans le corps du record.',
  }),
  q({
    n: 13,
    day: 9,
    topic: 'records',
    stem: 'Override equals dans un record — attention ?',
    choices: [
      'Interdit totalement',
      'Autorisé, mais doit rester cohérent avec hashCode et le contrat ; on perd souvent le bénéfice généré',
      'Obligatoire si plus d’un composant',
      'Doit appeler super.equals seulement',
    ],
    correct: 1,
    correctWhy:
      'On peut redéfinir equals/hashCode/toString, mais la cohérence du contrat reste requise.',
    wrongWhy:
      'Ce n’est pas interdit. super.equals sur Record n’est pas le modèle usuel à « seulement ».',
    javaRule:
      'Records allow overriding Object methods carefully.',
    trap: 'Casser hashCode en customisant equals.',
  }),
  q({
    n: 14,
    day: 9,
    topic: 'sealed',
    stem: 'Packages et permits — contrainte ?',
    choices: [
      'Les sous-types permis peuvent être n’importe où sur le classpath sans autre règle',
      'Sous-types nommés dans permits : même module (et si package sealed non exporté / règles de accessibilité) — en pratique même package souvent exigé pour accessibilité',
      'Ils doivent être dans un autre module obligatoirement',
      'permits accepte des classes private d’un autre package librement',
    ],
    correct: 1,
    correctWhy:
      'Les classes listées dans permits doivent être accessibles et, avec les modules, dans le même module ; souvent co-localisées (même package) pour des hiérarchies sealed propres.',
    wrongWhy:
      'On ne peut pas « permits » une classe inaccessible / hors règles de modularité.',
    javaRule:
      'Sealed hierarchy is closed and co-located in the same module; accessibility applies.',
    trap: 'permits com.other.Hidden sans accessibilité.',
  }),
  q({
    n: 15,
    day: 9,
    topic: 'records',
    stem: 'Record nested / static — lequel est vrai ?',
    choices: [
      'Un record déclaré dans une classe est implicitement static',
      'Un record d’instance (inner) capture this de l’enclosing',
      'record local interdit',
      'record ne peut pas être nested',
    ],
    correct: 0,
    correctWhy:
      'Les records imbriqués dans une classe sont implicitement static (pas d’outer this).',
    wrongWhy:
      'Les records locaux sont autorisés (Java 16+). Pas d’inner record non-static.',
    javaRule:
      'Nested records ⇒ static implicitly.',
    trap: 'Attendre une capture de l’instance englobante.',
  }),
  q({
    n: 16,
    day: 9,
    topic: 'sealed',
    stem: 'Switch exhaustif + sealed — intérêt exam ?',
    code: `sealed interface Expr permits Const, Add {}
record Const(int v) implements Expr {}
record Add(Expr l, Expr r) implements Expr {}
int eval(Expr e) {
  return switch (e) {
    case Const c -> c.v();
    case Add a -> eval(a.l()) + eval(a.r());
  };
}`,
    choices: [
      'N’compile pas sans default',
      'Compile : hiérarchie sealed + tous les sous-types couverts ⇒ exhaustif',
      'Compile seulement si Expr est enum',
      'Erreur : records interdits dans permits',
    ],
    correct: 1,
    correctWhy:
      'Le compilateur connaît tous les sous-types de Expr : le switch pattern est exhaustif sans default.',
    wrongWhy:
      'Records peuvent implémenter une sealed interface. default optionnel si exhaustif.',
    javaRule:
      'Sealed + pattern switch ⇒ exhaustiveness checking.',
    trap: 'Ajouter default inutile qui cache une constante/sous-type manquant plus tard.',
  }),
  q({
    n: 17,
    day: 9,
    topic: 'records',
    stem: 'Annotation sur composant — cible ?',
    code: `record Person(@NotNull String name) {}`,
    choices: [
      'L’annotation ne peut rien cibler',
      'Selon ses @Target, elle peut s’appliquer au paramètre du ctor, au champ, à l’accessor…',
      'Toujours uniquement sur le champ',
      'Interdite sur les composants de record',
    ],
    correct: 1,
    correctWhy:
      'Les annotations de composant sont propagées aux éléments générés selon les meta-annotations @Target applicables.',
    wrongWhy:
      'Ce n’est ni interdit ni limité au seul champ dans tous les cas.',
    javaRule:
      'Record component annotations propagate to generated members per target.',
    trap: 'Croire qu’aucune annotation n’est reportée sur l’accessor.',
  }),
  q({
    n: 18,
    day: 9,
    topic: 'sealed',
    stem: 'Interface sealed et classe — OK ?',
    code: `public sealed interface Pet permits Dog {}
public final class Dog implements Pet {}
public final class Cat implements Pet {}`,
    choices: [
      'OK pour Dog et Cat',
      'Erreur : Cat n’est pas dans permits',
      'Erreur : une interface sealed ne peut pas être implemented',
      'Erreur : Dog doit être non-sealed',
    ],
    correct: 1,
    correctWhy:
      'Seuls les types listés (Dog) peuvent implémenter Pet. Cat hors permits ⇒ erreur. Dog final est correct.',
    wrongWhy:
      'Les sealed interfaces s’implementent. final est un choix valide pour Dog.',
    javaRule:
      'implements/extends hors permits interdit.',
    trap: 'Ajouter une implémentation « oubliée » hors permits.',
  }),
  q({
    n: 19,
    day: 9,
    topic: 'records',
    stem: 'Serialisation des records — idée clé ?',
    choices: [
      'Comme les beans : setters appelés',
      'Désérialisation via le constructeur canonique (composants), pas de reflection des champs comme avant',
      'Impossible de sérialiser un record',
      'Nécessite obligatoirement serialVersionUID custom sinon erreur',
    ],
    correct: 1,
    correctWhy:
      'Les records sérialisables utilisent le mécanisme basé sur les composants / constructeur canonique, ce qui préserve les invariants du compact ctor.',
    wrongWhy:
      'Serializable est possible. serialVersionUID n’est pas une obligation de compilation.',
    javaRule:
      'Record serialization is component-based.',
    trap: 'Compter sur readObject custom style ancien sans comprendre le modèle record.',
  }),
  q({
    n: 20,
    day: 9,
    topic: 'records',
    stem: 'Que compile ?',
    code: `record Pair<T>(T a, T b) {
  static <T> Pair<T> of(T a, T b) { return new Pair<>(a, b); }
}`,
    choices: [
      'Erreur : records non génériques',
      'Erreur : static method interdite',
      'Compile : records génériques + méthodes static OK',
      'Compile seulement sans méthode static',
    ],
    correct: 2,
    correctWhy:
      'Les records peuvent être génériques et déclarer des factories static.',
    wrongWhy:
      'Ni les génériques ni les static ne sont interdits.',
    javaRule:
      'Generic records allowed; static members allowed.',
    trap: 'Interdire les génériques sur les records par analogie avec enum.',
  }),
]
