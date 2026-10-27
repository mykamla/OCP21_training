import type { Question } from '../../types/quiz'
import { q } from './_helpers'

export const day03: Question[] = [
  q({
    n: 1,
    day: 3,
    topic: 'text-blocks',
    stem: 'Quelle est la sortie (contenu exact) ?',
    code: `String tb = """
              Hello
              World
              """;
System.out.print(tb);`,
    choices: [
      'Hello\\nWorld\\n (indentation incidente retirée)',
      '              Hello\\n              World\\n',
      'Hello World',
      'Erreur de compilation : guillemets illégaux',
    ],
    correct: 0,
    correctWhy: 'Le text block retire l’indentation incidente alignée sur le délimiteur fermant """. Contenu typique : Hello\\nWorld\\n.',
    wrongWhy: 'Les espaces d’indentation communs ne font pas partie de la chaîne. Il y a bien des retours à la ligne.',
    javaRule: 'Text blocks (""") : strip incidental whitespace selon la position de la ligne fermante.',
    trap: 'Compter toute l’indentation source comme faisant partie de la String.',
  }),
  q({
    n: 2,
    day: 3,
    topic: 'text-blocks',
    stem: 'Lequel est vrai pour les text blocks ?',
    choices: [
      'Un line terminator est obligatoire juste après le """ ouvrant',
      'String s = """abc"""; compile (tout sur une ligne)',
      'Les " dans le contenu doivent toujours être échappés en \\"',
      'Un text block ne peut pas contenir de newline final',
    ],
    correct: 0,
    correctWhy: 'La grammaire exige un saut de ligne immédiatement après le délimiteur ouvrant """. Le contenu commence à la ligne suivante.',
    wrongWhy: '"""abc""" sur une seule ligne ne compile pas. Les " simples n’ont pas besoin d’échappement. Le newline final dépend de la position du """ fermant.',
    javaRule: 'Text block = """ + LineTerminator + characters + """.',
    trap: 'Écrire un text block « inline » sur une seule ligne.',
  }),
  q({
    n: 3,
    day: 3,
    topic: 'text-blocks',
    stem: 'Que fait l’échappement \\s en fin de ligne dans un text block ?',
    code: `String s = """
           red  \\s
           green
           """;`,
    choices: [
      'Conserve les espaces avant \\s (espace explicite)',
      'Supprime toute la ligne',
      'Insère un tab',
      'Est illégal hors text block seulement — ici erreur',
    ],
    correct: 0,
    correctWhy: '\\s est un escape d’espace : il empêche le strip des espaces de fin de ligne que le compilateur appliquerait sinon.',
    wrongWhy: '\\s ne supprime pas la ligne et n’est pas un tab (\\t).',
    javaRule: 'Échappements nouveaux liés aux text blocks : \\s (espace), \\<line-terminator> (continuation de ligne).',
    trap: 'Croire que les espaces de fin de ligne d’un text block sont toujours préservés sans \\s.',
  }),
  q({
    n: 4,
    day: 3,
    topic: 'text-blocks',
    stem: 'Quelle est la sortie ?',
    code: `String s = """
           line1\\
           line2
           """;
System.out.print(s.replace("\\n", "#"));`,
    choices: [
      'line1line2#  (pas de newline entre line1 et line2)',
      'line1#line2#',
      'line1\\line2#',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'Le \\ juste avant le fin de ligne joint la ligne suivante sans inclure le line terminator → "line1line2\\n".',
    wrongWhy: 'Ce n’est pas un caractère backslash littéral dans le résultat ; c’est une continuation de ligne.',
    javaRule: '\\ suivi du line terminator dans un text block = line continuation (échappe le saut de ligne).',
    trap: 'Attendre un \\ visible ou un newline entre line1 et line2.',
  }),
  q({
    n: 5,
    day: 3,
    topic: 'text-blocks',
    stem: 'Que renvoie ce code ?',
    code: `String a = """
           Hi
           """;
String b = "Hi\\n";
System.out.println(a.equals(b));`,
    choices: [
      'true (si l’indentation incidente est bien gérée)',
      'false toujours',
      'Erreur de compilation',
      'true seulement avec a.intern()',
    ],
    correct: 0,
    correctWhy: 'Avec le """ fermant aligné, le text block vaut typiquement "Hi\\n", égal à b.',
    wrongWhy: 'Pas besoin d’intern pour equals. equals compare le contenu.',
    javaRule: 'Un text block est un littéral String (souvent interné comme les autres littéraux) ; equals teste le contenu.',
    trap: 'Supposer qu’un text block diffère toujours d’une String classique équivalente.',
  }),
  q({
    n: 6,
    day: 3,
    topic: 'text-blocks',
    stem: 'Où placer le """ fermant pour que la chaîne se termine SANS newline final ?',
    choices: [
      'Sur la même ligne que le dernier contenu : ...dernier"""',
      'Toujours sur une ligne seule après le contenu',
      'Impossible : les text blocks finissent toujours par \\n',
      'En utilisant stripIndent() uniquement',
    ],
    correct: 0,
    correctWhy: 'Si """ est sur la même ligne que le dernier texte, aucun line terminator n’est ajouté après ce texte.',
    wrongWhy: 'Un """ seul sur la ligne suivante inclut le newline de la dernière ligne de contenu.',
    javaRule: 'La position du délimiteur fermant contrôle le newline final et l’indentation incidente.',
    trap: 'Toujours mettre """ seul et s’étonner du \\n final.',
  }),
  q({
    n: 7,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle est la sortie ?',
    code: `LocalDate d = LocalDate.of(2024, 1, 31);
System.out.println(d.plusMonths(1));`,
    choices: [
      '2024-02-29 (année bissextile, ajustement de fin de mois)',
      '2024-02-31',
      '2024-03-03',
      'DateTimeException',
    ],
    correct: 0,
    correctWhy: 'Jan 31 + 1 mois → février ; 31 n’existe pas → ajusté au dernier jour de février 2024 (29, bissextile).',
    wrongWhy: 'Pas d’exception pour plusMonths ; LocalDate.of(2024,2,31) serait invalide, mais ici c’est une addition.',
    javaRule: 'plusMonths/plusYears ajustent les jours invalides vers le dernier jour du mois cible.',
    trap: 'Attendre une exception ou 2024-02-31.',
  }),
  q({
    n: 8,
    day: 3,
    topic: 'datetime',
    stem: 'Que se passe-t-il ?',
    code: `LocalDate d = LocalDate.of(2025, 2, 29);`,
    choices: [
      'DateTimeException à l’exécution (2025 non bissextile)',
      'Crée 2025-02-28',
      'Crée 2025-03-01',
      'Erreur de compilation',
    ],
    correct: 0,
    correctWhy: 'of(year,month,day) valide strictement la date : 29/02/2025 invalide → DateTimeException.',
    wrongWhy: 'Contrairement à plusMonths, of ne « corrige » pas silencieusement.',
    javaRule: 'LocalDate.of exige une date calendaire valide.',
    trap: 'Confondre le comportement strict de of avec l’ajustement de plusMonths.',
  }),
  q({
    n: 9,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle affirmation est correcte ?',
    choices: [
      'Period mesure des années/mois/jours ; Duration des secondes/nanos (temps)',
      'Period et Duration sont interchangeables pour LocalDate',
      'Duration.between sur deux LocalDate compile',
      'Period.ofDays(1).plus(Duration.ofHours(1)) est l’API recommandée',
    ],
    correct: 0,
    correctWhy: 'Period = unités date (Y/M/D). Duration = temps machine (seconds/nanos). LocalDate travaille avec Period, pas Duration.',
    wrongWhy: 'Duration.between(LocalDate, LocalDate) ne compile pas (pas Temporal avec secondes). Period/Duration ne se mélangent pas librement.',
    javaRule: 'Utiliser Period avec LocalDate ; Duration avec Instant/LocalTime/LocalDateTime (temps).',
    trap: 'Ajouter une Duration à un LocalDate.',
  }),
  q({
    n: 10,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle est la sortie ?',
    code: `LocalDate d1 = LocalDate.of(2024, 1, 1);
LocalDate d2 = LocalDate.of(2024, 3, 1);
Period p = Period.between(d1, d2);
System.out.println(p.getMonths() + " " + p.getDays());`,
    choices: ['2 0', '0 60', '1 30', '2 1'],
    correct: 0,
    correctWhy: 'Period.between normalise en années, mois, jours : de 1 janv. à 1 mars → 2 mois, 0 jours.',
    wrongWhy: 'Ce n’est pas le nombre total de jours (60) ; getDays() n’est que la composante « jours » du Period.',
    javaRule: 'Period.between calcule un Period normalisé, pas une durée totale en jours.',
    trap: 'Lire getDays() comme « jours totaux ».',
  }),
  q({
    n: 11,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle est la sortie ?',
    code: `LocalTime t = LocalTime.of(23, 30);
System.out.println(t.plusHours(2));
LocalDateTime dt = LocalDateTime.of(2024, 1, 1, 23, 30);
System.out.println(dt.plusHours(2).toLocalDate());`,
    choices: [
      '01:30 puis 2024-01-02',
      '25:30 puis 2024-01-01',
      'DateTimeException puis 2024-01-02',
      '01:30 puis 2024-01-01',
    ],
    correct: 0,
    correctWhy: 'LocalTime wrap autour de minuit → 01:30. LocalDateTime avance aussi la date → 2 janv.',
    wrongWhy: 'LocalTime n’affiche pas 25:30 ; pas d’exception pour plusHours.',
    javaRule: 'LocalTime est cyclique sur 24h ; LocalDateTime propage le dépassement à la date.',
    trap: 'Oublier que seul LocalDateTime change le jour.',
  }),
  q({
    n: 12,
    day: 3,
    topic: 'datetime',
    stem: 'Que produit ce code ?',
    code: `LocalDate d = LocalDate.of(2024, 6, 15);
d.plusDays(5);
System.out.println(d);`,
    choices: ['2024-06-15', '2024-06-20', '2024-06-10', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Les types java.time sont immuables : plusDays renvoie une nouvelle instance ignorée ici.',
    wrongWhy: 'Sans réaffectation, d reste inchangé.',
    javaRule: 'LocalDate/LocalTime/LocalDateTime/Period/... sont immuables.',
    trap: 'Même piège que String : oublier d = d.plusDays(5).',
  }),
  q({
    n: 13,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle est la sortie ?',
    code: `Duration dur = Duration.ofHours(25);
System.out.println(dur.toHours() + " " + dur.toDays());
System.out.println(Period.ofDays(25).getDays());`,
    choices: [
      '25 1 puis 25',
      '25 25 puis 25',
      '1 1 puis 25',
      '25 1 puis 0',
    ],
    correct: 0,
    correctWhy: '25 heures → toHours=25, toDays=1 (division entière). Period.ofDays(25) stocke 25 jours (non normalisé en mois).',
    wrongWhy: 'toDays() sur Duration ne renvoie pas 25. getDays() sur ce Period est 25.',
    javaRule: 'Duration.toDays() = secondes/86400. Period.ofDays ne convertit pas automatiquement en mois.',
    trap: 'Confondre toDays() de Duration avec getDays() de Period.',
  }),
  q({
    n: 14,
    day: 3,
    topic: 'datetime',
    stem: 'Lequel compile et s’exécute sans exception ?',
    choices: [
      'LocalDate.parse("2024-05-01")',
      'LocalDate.parse("01/05/2024")',
      'LocalDate.of(2024, 13, 1)',
      'LocalTime.of(24, 0)',
    ],
    correct: 0,
    correctWhy: 'Le format ISO-8601 yyyy-MM-dd est le défaut de LocalDate.parse.',
    wrongWhy: 'dd/MM/yyyy exige un DateTimeFormatter. Mois 13 et heure 24 sont invalides → DateTimeException.',
    javaRule: 'parse sans formatter attend l’ISO. of valide les champs.',
    trap: 'Parser une date locale française sans formatter.',
  }),
  q({
    n: 15,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle est la sortie ?',
    code: `ZonedDateTime z = ZonedDateTime.of(
  LocalDateTime.of(2024, 3, 10, 2, 30),
  ZoneId.of("America/New_York"));
System.out.println(z.getHour());`,
    choices: [
      'Souvent 3 (ajustement DST printemps : 2:30 n’existe pas)',
      'Toujours 2',
      'DateTimeException obligatoire',
      '0',
    ],
    correct: 0,
    correctWhy: 'Au passage à l’heure d’été US, 02:30 est dans le « gap » ; Java ajuste typiquement à 03:30 (heure 3).',
    wrongWhy: 'ZonedDateTime.of corrige plutôt que de toujours échouer pour un gap DST.',
    javaRule: 'Les transitions DST créent gaps/overlaps ; l’API java.time résout selon des règles définies.',
    trap: 'Ignorer le fuseau et traiter LocalDateTime comme universel.',
  }),
  q({
    n: 16,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle est la sortie ?',
    code: `Instant i1 = Instant.parse("2024-01-01T00:00:00Z");
Instant i2 = i1.plus(Duration.ofDays(1));
System.out.println(Duration.between(i1, i2).toHours());`,
    choices: ['24', '1', '0', 'Erreur de compilation'],
    correct: 0,
    correctWhy: 'Un jour de Duration = 24 heures exactes sur Instant (échelle temps machine UTC).',
    wrongWhy: 'Pas de notion de DST sur Instant ; between → 24 heures.',
    javaRule: 'Instant + Duration = temps absolu. Preferer Instant pour timestamps.',
    trap: 'Mélanger Period avec Instant (Period ne s’applique pas directement comme Duration).',
  }),
  q({
    n: 17,
    day: 3,
    topic: 'text-blocks',
    stem: 'Quelle est la sortie ?',
    code: `String s = """
           "quoted"
           """;
System.out.print(s.trim());`,
    choices: [
      '"quoted"',
      '\\"quoted\\"',
      'quoted',
      'Erreur : " interdit dans un text block',
    ],
    correct: 0,
    correctWhy: 'Les " simples n’ont pas besoin d’être échappés dans un text block. trim() retire le newline final → "quoted".',
    wrongWhy: 'Pas d’erreur ; les guillemets font partie du contenu.',
    javaRule: 'Dans un text block, " est littéral ; séquence """ doit être gérée (ex. escape) si elle apparaît dans le contenu.',
    trap: 'Échapper inutilement tous les guillemets comme en String classique.',
  }),
  q({
    n: 18,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle est la sortie ?',
    code: `LocalDate d = LocalDate.of(2024, 1, 1);
System.out.println(d.withDayOfMonth(20).withMonth(2));`,
    choices: ['2024-02-20', '2024-01-20', '2024-02-01', 'DateTimeException'],
    correct: 0,
    correctWhy: 'withDayOfMonth(20) → 20 janv. ; withMonth(2) → 20 févr. Chaînage sur valeurs de retour immuables.',
    wrongWhy: 'Les with* retournent de nouvelles instances ; l’ordre ici reste valide.',
    javaRule: 'withXxx ajuste un champ et renvoie une nouvelle date.',
    trap: 'Appeler with sans utiliser la valeur retournée (non illustré ici mais classique).',
  }),
  q({
    n: 19,
    day: 3,
    topic: 'datetime',
    stem: 'Que se passe-t-il ?',
    code: `LocalDate d = LocalDate.of(2024, 1, 31);
System.out.println(d.withMonth(2));`,
    choices: [
      '2024-02-29 (ajustement)',
      '2024-02-31',
      'DateTimeException',
      '2024-03-02',
    ],
    correct: 0,
    correctWhy: 'withMonth(2) sur 31 janv. ajuste au dernier jour valide de février 2024 → 29.',
    wrongWhy: 'Comme plusMonths, withMonth ajuste plutôt que de lancer une exception ici.',
    javaRule: 'Les ajustements de champs invalides sur LocalDate sont résolus (dernier jour du mois).',
    trap: 'Attendre une exception pour withMonth comme pour of(2024,2,31).',
  }),
  q({
    n: 20,
    day: 3,
    topic: 'datetime',
    stem: 'Quelle comparaison est true ?',
    code: `LocalDate a = LocalDate.of(2024, 5, 1);
LocalDate b = LocalDate.of(2024, 5, 10);`,
    choices: [
      'a.isBefore(b)',
      'a.isAfter(b)',
      'a.compareTo(b) > 0',
      'a.equals(b)',
    ],
    correct: 0,
    correctWhy: '1 mai est avant 10 mai → isBefore true. compareTo serait < 0.',
    wrongWhy: 'isAfter/equals sont faux ; compareTo > 0 serait l’ordre inverse.',
    javaRule: 'isBefore/isAfter/equals et compareTo pour ordonner les Temporal dates.',
    trap: 'Utiliser < sur LocalDate (ne compile pas : pas de primitives).',
  }),
]
