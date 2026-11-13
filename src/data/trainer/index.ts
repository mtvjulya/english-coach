import type { DrillExercise, DrillItem, DrillSection } from '../../types';

// ===== Тренажёр по грамматике: структура школьного пособия (5–11 класс) =====
// Разделы идут от простого к сложному; внутри — пронумерованные упражнения
// по нарастанию трудности, как в печатном тренажёре.

const it = (task: string, ...answers: string[]): DrillItem => ({ task, answers });
const ex = (num: number, title: string, items: DrillItem[]): DrillExercise => ({ num, title, items });

const articles: DrillSection = {
  id: 'article',
  title: 'Артикль',
  grades: '5–6 кл.',
  level: 'A1',
  rules: [
    'a — перед согласным звуком: a book, a university [ju:]',
    'an — перед гласным звуком: an apple, an hour [auə]',
    'the — конкретный, уже известный или единственный предмет: the sun, the book I bought',
    'Без артикля: имена, приёмы пищи, языки, виды спорта, школьные предметы',
  ],
  errorTag: 'article',
  exercises: [
    ex(1, 'Вставьте артикль a или an.', [
      it('___ apple', 'an'),
      it('___ dog', 'a'),
      it('___ umbrella', 'an'),
      it('___ university', 'a'),
      it('___ hour', 'an'),
      it('___ elephant', 'an'),
      it('___ chair', 'a'),
    ]),
    ex(2, 'Вставьте a/an или the.', [
      it('This is ___ pen. The pen is blue.', 'a'),
      it('I see a cat in the garden. ___ cat is black.', 'The'),
      it('She has ___ new bike.', 'a'),
      it('___ sun is hot today.', 'The'),
      it('Open ___ door, please.', 'the'),
      it('He is ___ engineer.', 'an'),
      it('___ moon is bright tonight.', 'The'),
    ]),
    ex(3, 'Вставьте a/an, the или напишите NO, если артикль не нужен.', [
      it('___ London is a big city.', 'NO'),
      it('We have ___ lunch at one o’clock.', 'NO'),
      it('___ water in the glass is cold.', 'The'),
      it('She speaks ___ English very well.', 'NO'),
      it('I bought ___ interesting book yesterday.', 'an'),
      it('___ children like to play outside.', 'NO'),
      it('This is ___ best day of my life!', 'the'),
    ]),
  ],
};

const plurals: DrillSection = {
  id: 'plural',
  title: 'Имя существительное: множественное число',
  grades: '5–6 кл.',
  level: 'A1',
  rules: [
    'Обычно + s: cat → cats, dog → dogs',
    'После -s, -ss, -sh, -ch, -x, -o → + es: box → boxes, potato → potatoes',
    'Согласная + y → ies: baby → babies (но: day → days)',
    'f/fe → ves: leaf → leaves, knife → knives',
    'Исключения: man–men, woman–women, child–children, foot–feet, tooth–teeth, mouse–mice, sheep–sheep, fish–fish',
  ],
  errorTag: 'verb-form',
  exercises: [
    ex(1, 'Напишите существительное во множественном числе.', [
      it('cat →', 'cats'),
      it('box →', 'boxes'),
      it('baby →', 'babies'),
      it('leaf →', 'leaves'),
      it('child →', 'children'),
      it('mouse →', 'mice'),
      it('foot →', 'feet'),
      it('potato →', 'potatoes'),
    ]),
    ex(2, 'Вставьте is или are.', [
      it('There ___ two cats in the room.', 'are'),
      it('My family ___ big.', 'is'),
      it('The news ___ good.', 'is'),
      it('His trousers ___ new.', 'are'),
      it('There ___ some milk in the fridge.', 'is'),
      it('The children ___ at school.', 'are'),
    ]),
    ex(3, 'Исправьте ошибку во множественном числе.', [
      it('two childs', 'two children'),
      it('three boxs', 'three boxes'),
      it('many sheeps', 'many sheep'),
      it('five tomatos', 'five tomatoes'),
      it('two womans', 'two women'),
      it('knifes on the table', 'knives on the table'),
    ]),
  ],
};

const pronouns: DrillSection = {
  id: 'pronouns',
  title: 'Местоимения',
  grades: '5–6 кл.',
  level: 'A1',
  rules: [
    'Личные (кто?): I, you, he, she, it, we, they — подлежащее',
    'Объектные (кого?): me, you, him, her, it, us, them — дополнение',
    'Притяжательные прилаг.: my, your, his, her, its, our, their + существительное',
    'Абсолютные: mine, yours, his, hers, ours, theirs — без существительного',
  ],
  errorTag: 'vocabulary',
  exercises: [
    ex(1, 'Вставьте личное местоимение вместо выделенного слова.', [
      it('My mum is a doctor. ___ works at a hospital.', 'She'),
      it('Tom and I are friends. ___ go to school together.', 'We'),
      it('The dog is hungry. ___ wants to eat.', 'It'),
      it('My parents live in Minsk. ___ are teachers.', 'They'),
      it('Peter is my friend. ___ is eleven.', 'He'),
      it('Anna and Kate are sisters. ___ are twins.', 'They'),
    ]),
    ex(2, 'Вставьте притяжательное местоимение.', [
      it('I have a bike. ___ bike is new.', 'My'),
      it('She has a cat. ___ cat is fluffy.', 'Her'),
      it('We like ___ house. It is cosy.', 'our'),
      it('They have a garden. ___ garden is big.', 'Their'),
      it('He loves ___ mother very much.', 'his'),
      it('You have a nice bag. I like ___ bag.', 'your'),
    ]),
    ex(3, 'Вставьте объектное местоимение.', [
      it('I like Tom. I play with ___ every day.', 'him'),
      it('This is my sister. Do you know ___?', 'her'),
      it('We are friends. They often help ___.', 'us'),
      it('The book is interesting. I am reading ___ now.', 'it'),
      it('My parents are kind. I love ___ very much.', 'them'),
      it('Can you help ___, please?', 'me'),
    ]),
  ],
};

const thereIs: DrillSection = {
  id: 'there-is',
  title: 'Конструкция There is / There are',
  grades: '6 кл.',
  level: 'A2',
  rules: [
    'There is + ед.ч.: There is a chair in the room.',
    'There are + мн.ч.: There are two chairs.',
    'Отрицание: There is not / isn’t; There are not / aren’t; или There is no…',
    'Вопрос: Is there…? / Are there…? + some→any',
    'При перечислении смотрим на ПЕРВЫЙ предмет: There is a pen and two books.',
  ],
  errorTag: 'verb-form',
  exercises: [
    ex(1, 'Вставьте is или are.', [
      it('There ___ a book on the table.', 'is'),
      it('There ___ three windows in the room.', 'are'),
      it('There ___ some juice in the glass.', 'is'),
      it('There ___ a pen and two pencils in my bag.', 'is'),
      it('There ___ many pupils in our school.', 'are'),
      it('___ there any bread left?', 'Is'),
    ]),
    ex(2, 'Сделайте предложение отрицательным.', [
      it('There is a picture on the wall.', 'There isn’t a picture on the wall', 'There is no picture on the wall', 'There is not a picture on the wall'),
      it('There are five pupils in the class.', 'There aren’t five pupils in the class', 'There are not five pupils in the class'),
      it('There is some milk in the glass.', 'There isn’t any milk in the glass', 'There is no milk in the glass'),
      it('There is a shop near my house.', 'There isn’t a shop near my house', 'There is no shop near my house'),
    ]),
    ex(3, 'Постройте вопрос из предложения.', [
      it('There is some milk in the fridge.', 'Is there any milk in the fridge'),
      it('There are two parks in our town.', 'Are there two parks in your town', 'Are there two parks in the town'),
      it('There is a computer on the desk.', 'Is there a computer on the desk'),
      it('There are apples on the table.', 'Are there any apples on the table'),
    ]),
  ],
};

const numerals: DrillSection = {
  id: 'numerals',
  title: 'Числительные',
  grades: '6–7 кл.',
  level: 'A2',
  rules: [
    'Десятки пишутся через дефис: twenty-one, thirty-five',
    'Порядковые: the first, the second, the third, the fifth, the twelfth, the twentieth',
    'Даты: the fifth of May / May the fifth; читается “the fifth of May”',
    'hundred/thousand/million в ед.ч. без -s: two hundred, three thousand',
  ],
  errorTag: 'spelling',
  exercises: [
    ex(1, 'Напишите число словами.', [
      it('3', 'three'),
      it('15', 'fifteen'),
      it('40', 'forty'),
      it('21', 'twenty-one'),
      it('58', 'fifty-eight'),
      it('100', 'a hundred', 'one hundred'),
      it('1000', 'a thousand', 'one thousand'),
    ]),
    ex(2, 'Напишите порядковое числительное.', [
      it('1st', 'first', 'the first'),
      it('2nd', 'second', 'the second'),
      it('3rd', 'third', 'the third'),
      it('5th', 'fifth', 'the fifth'),
      it('9th', 'ninth', 'the ninth'),
      it('12th', 'twelfth', 'the twelfth'),
      it('20th', 'twentieth', 'the twentieth'),
    ]),
    ex(3, 'Напишите дату словами, как её произносят.', [
      it('4 May', 'the fourth of May'),
      it('12 June', 'the twelfth of June'),
      it('1 September', 'the first of September'),
      it('25 December', 'the twenty-fifth of December'),
      it('1990 (год)', 'nineteen ninety'),
      it('2005 (год)', 'two thousand and five', 'two thousand five'),
    ]),
  ],
};

const comparison: DrillSection = {
  id: 'comparison',
  title: 'Степени сравнения прилагательных и наречий',
  grades: '6–8 кл.',
  level: 'A2',
  rules: [
    'Короткие прилагательные: tall → taller → the tallest; big → bigger → the biggest',
    'Длинные: beautiful → more beautiful → the most beautiful',
    'Исключения: good–better–the best; bad–worse–the worst; many/much–more–the most; little–less–the least; far–further–the furthest',
    'Сравнение: taller than; равенство: as tall as; отрицание: not as/so tall as',
  ],
  errorTag: 'verb-form',
  exercises: [
    ex(1, 'Образуйте сравнительную степень.', [
      it('tall →', 'taller'),
      it('big →', 'bigger'),
      it('happy →', 'happier'),
      it('beautiful →', 'more beautiful'),
      it('good →', 'better'),
      it('bad →', 'worse'),
      it('far →', 'further', 'farther'),
      it('carefully →', 'more carefully'),
    ]),
    ex(2, 'Образуйте превосходную степень.', [
      it('high →', 'the highest'),
      it('small →', 'the smallest'),
      it('interesting →', 'the most interesting'),
      it('good →', 'the best'),
      it('bad →', 'the worst'),
      it('hot →', 'the hottest'),
      it('easy →', 'the easiest'),
    ]),
    ex(3, 'Вставьте правильную форму прилагательного.', [
      it('My brother is ___ (tall) than me.', 'taller'),
      it('This is ___ (good) film I have ever seen.', 'the best'),
      it('Maths is ___ (difficult) than English for me.', 'more difficult'),
      it('She is ___ (old) pupil in our class.', 'the oldest'),
      it('Today is ___ (cold) day of the year.', 'the coldest'),
      it('My bag is ___ (heavy) than yours.', 'heavier'),
      it('He runs ___ (fast) than his friend.', 'faster'),
    ]),
  ],
};

const prepositions: DrillSection = {
  id: 'prepositions',
  title: 'Предлоги',
  grades: '6–8 кл.',
  level: 'A2',
  rules: [
    'Время: at + часы (at 5), on + дни/даты (on Monday, on 5 May), in + месяцы/годы/сезоны (in July, in 2020, in summer)',
    'Место: at + точка (at school, at home), on + поверхность (on the table), in + пространство (in the box, in Minsk)',
    'Устойчивые сочетания: listen to, look at, wait for, depend on, belong to, good at, interested in, afraid of, fond of, proud of',
  ],
  errorTag: 'preposition',
  exercises: [
    ex(1, 'Вставьте предлог времени at, on или in.', [
      it('___ five o’clock', 'at'),
      it('___ Monday', 'on'),
      it('___ July', 'in'),
      it('___ the morning', 'in'),
      it('___ 7 September', 'on'),
      it('___ night', 'at'),
      it('___ winter', 'in'),
      it('___ Friday evening', 'on'),
    ]),
    ex(2, 'Вставьте предлог места at, on или in.', [
      it('The books are ___ the shelf.', 'on'),
      it('She lives ___ Minsk.', 'in'),
      it('He is waiting ___ the bus stop.', 'at'),
      it('There is a picture ___ the wall.', 'on'),
      it('The children are ___ the garden.', 'in'),
      it('We met ___ the station.', 'at'),
      it('The cat is sleeping ___ the sofa.', 'on'),
    ]),
    ex(3, 'Вставьте подходящий предлог.', [
      it('Listen ___ the teacher!', 'to'),
      it('She is good ___ dancing.', 'at'),
      it('We are interested ___ history.', 'in'),
      it('He is afraid ___ spiders.', 'of'),
      it('It depends ___ the weather.', 'on'),
      it('Look ___ this photo!', 'at'),
      it('I am waiting ___ my friend.', 'for'),
      it('She is fond ___ reading.', 'of'),
    ]),
  ],
};

const presentSimple: DrillSection = {
  id: 'present-simple',
  title: 'Present Simple',
  grades: '5–7 кл.',
  level: 'A1',
  rules: [
    'Факт, привычка, расписание: every day, usually, always, often, never',
    '3 лицо ед.ч. → + s/es: he plays, she watches, it rains',
    'Отрицание: do/does + not + V (does not → -s убираем!)',
    'Вопрос: Do/Does + подлежащее + V?',
  ],
  errorTag: 'third-person-s',
  exercises: [
    ex(1, 'Раскройте скобки, поставив глагол в Present Simple.', [
      it('She ___ (like) tea.', 'likes'),
      it('They ___ (go) to school every day.', 'go'),
      it('He ___ (watch) TV in the evening.', 'watches'),
      it('My father ___ (work) in an office.', 'works'),
      it('We ___ (play) tennis on Sundays.', 'play'),
      it('The cat ___ (sleep) a lot.', 'sleeps'),
      it('She ___ (study) English twice a week.', 'studies'),
    ]),
    ex(2, 'Вставьте do или does.', [
      it('___ you like ice cream?', 'Do'),
      it('___ she play the piano?', 'Does'),
      it('___ they live in Minsk?', 'Do'),
      it('___ he go to school by bus?', 'Does'),
      it('___ it often rain in autumn?', 'Does'),
      it('___ we have English on Monday?', 'Do'),
    ]),
    ex(3, 'Сделайте предложение отрицательным.', [
      it('He plays football every day.', 'He doesn’t play football every day', 'He does not play football every day'),
      it('I like coffee.', 'I don’t like coffee', 'I do not like coffee'),
      it('She goes to school on Saturdays.', 'She doesn’t go to school on Saturdays', 'She does not go to school on Saturdays'),
      it('They watch TV in the morning.', 'They don’t watch TV in the morning', 'They do not watch TV in the morning'),
      it('My friend speaks French.', 'My friend doesn’t speak French', 'My friend does not speak French'),
    ]),
  ],
};

const presentContinuous: DrillSection = {
  id: 'present-continuous',
  title: 'Present Continuous',
  grades: '6–7 кл.',
  level: 'A2',
  rules: [
    'Действие прямо сейчас: now, at the moment, Look!, Listen!',
    'am/is/are + V-ing: I am reading, she is cooking',
    'He→is, they→are; write→writing, run→running, lie→lying',
    'Не употребляется с глаголами состояния: know, like, want, see, understand, believe',
  ],
  errorTag: 'tense',
  exercises: [
    ex(1, 'Раскройте скобки, поставив глагол в Present Continuous.', [
      it('I ___ (read) a book now.', 'am reading'),
      it('She ___ (cook) dinner at the moment.', 'is cooking'),
      it('They ___ (play) football in the yard.', 'are playing'),
      it('Look! The baby ___ (sleep).', 'is sleeping'),
      it('We ___ (write) a test now.', 'are writing'),
      it('He ___ (run) in the park at the moment.', 'is running'),
      it('Listen! The birds ___ (sing).', 'are singing'),
    ]),
    ex(2, 'Выберите время: Simple или Continuous? Впишите глагол.', [
      it('Every day she ___ (cook) dinner.', 'cooks'),
      it('Now she ___ (cook) dinner.', 'is cooking'),
      it('He usually ___ (go) to school by bus.', 'goes'),
      it('Look! He ___ (go) to school on foot today.', 'is going'),
      it('They ___ (visit) their granny every Sunday.', 'visit'),
      it('At the moment they ___ (visit) their granny.', 'are visiting'),
    ]),
    ex(3, 'Глаголы состояния: исправьте ошибку.', [
      it('I am knowing the answer.', 'I know the answer'),
      it('She is liking chocolate.', 'She likes chocolate'),
      it('He is wanting a new bike.', 'He wants a new bike'),
      it('I am seeing a bird in the tree.', 'I see a bird in the tree'),
      it('We are understanding the rule.', 'We understand the rule'),
    ]),
  ],
};

const pastSimple: DrillSection = {
  id: 'past-simple',
  title: 'Past Simple',
  grades: '7–8 кл.',
  level: 'A2',
  rules: [
    'Завершённое действие в прошлом: yesterday, last week, ago, in 2010',
    'Правильные глаголы + ed; неправильные — вторая форма: go→went, see→saw',
    'Отрицание и вопрос: did + V₁ (вторая форма возвращается в первую!)',
    'be: was (I/he/she/it), were (you/we/they)',
  ],
  errorTag: 'tense',
  exercises: [
    ex(1, 'Напишите вторую форму глагола.', [
      it('go →', 'went'),
      it('buy →', 'bought'),
      it('see →', 'saw'),
      it('take →', 'took'),
      it('write →', 'wrote'),
      it('read →', 'read'),
      it('eat →', 'ate'),
      it('bring →', 'brought'),
    ]),
    ex(2, 'Раскройте скобки, поставив глагол в Past Simple.', [
      it('Yesterday we ___ (visit) our grandmother.', 'visited'),
      it('She ___ (buy) a new dress last week.', 'bought'),
      it('They ___ (go) to the seaside in summer.', 'went'),
      it('I ___ (see) him two days ago.', 'saw'),
      it('He ___ (write) a letter yesterday.', 'wrote'),
      it('We ___ (be) at home last night.', 'were'),
      it('It ___ (rain) all day yesterday.', 'rained'),
    ]),
    ex(3, 'Постройте вопрос или отрицание в Past Simple.', [
      it('You saw him yesterday. (вопрос)', 'Did you see him yesterday'),
      it('She came home late. (отрицание)', 'She didn’t come home late', 'She did not come home late'),
      it('They went to the cinema. (вопрос)', 'Did they go to the cinema'),
      it('He was at school. (отрицание)', 'He wasn’t at school', 'He was not at school'),
      it('We played tennis. (вопрос)', 'Did you play tennis', 'Did we play tennis'),
    ]),
  ],
};

const future: DrillSection = {
  id: 'future',
  title: 'Future Simple и be going to',
  grades: '7–8 кл.',
  level: 'A2',
  rules: [
    'will + V: решение в момент речи, обещание, прогноз-мнение',
    'be going to + V: план, намерение, предсказание по признакам',
    'Отрицание: won’t / am not going to; вопрос: Will…? / Is…going to…?',
    'shall I/we…? — предложение помочь: Shall I open the window?',
  ],
  errorTag: 'tense',
  exercises: [
    ex(1, 'Раскройте скобки с will.', [
      it('Tomorrow I ___ (help) you.', 'will help', "'ll help"),
      it('She ___ (be) twelve next month.', 'will be', "'ll be"),
      it('We ___ (not/go) to school tomorrow.', 'won’t go', 'will not go'),
      it('___ you ___ (come) to my party?', 'Will you come', 'will you come'),
      it('I think it ___ (rain) tomorrow.', 'will rain', "'ll rain"),
    ]),
    ex(2, 'Will или going to? Впишите глагол.', [
      it('Look at the clouds! It ___ (rain).', 'is going to rain', "'s going to rain"),
      it('I’ve bought a ticket. I ___ (fly) to London tomorrow.', 'am going to fly', "'m going to fly"),
      it('The phone is ringing! I ___ (answer) it.', 'will answer', "'ll answer"),
      it('Watch out! You ___ (drop) your phone.', 'are going to drop', "'re going to drop"),
      it('We ___ (visit) grandma on Sunday — it is planned.', 'are going to visit', "'re going to visit"),
    ]),
    ex(3, 'Сделайте предложение отрицательным или вопросом.', [
      it('He will come tomorrow. (отрицание)', 'He won’t come tomorrow', 'He will not come tomorrow'),
      it('She is going to study medicine. (вопрос)', 'Is she going to study medicine'),
      it('They will be late. (отрицание)', 'They won’t be late', 'They will not be late'),
      it('You are going to help me. (вопрос)', 'Are you going to help me', 'Are you going to help me?'),
      it('Предложите помощь: «Открыть окно?»', 'Shall I open the window'),
    ]),
  ],
};

const presentPerfect: DrillSection = {
  id: 'present-perfect',
  title: 'Present Perfect',
  grades: '8–9 кл.',
  level: 'B1',
  rules: [
    'have/has + V₃: результат к настоящему моменту, опыт, just/already/yet/ever/never',
    'since + точка отсчёта (since 2010, since Monday); for + период (for five years)',
    'Маркеры already/just — в середине; yet — в конце вопроса и отрицания',
    'НЕ с yesterday/ago/last year — там Past Simple!',
  ],
  errorTag: 'tense',
  exercises: [
    ex(1, 'Раскройте скобки, поставив глагол в Present Perfect.', [
      it('I ___ (finish) my homework.', 'have finished', "'ve finished"),
      it('She ___ (just/call) me.', 'has just called', 'has just called me', 'just called me', "'s just called me", "'s just called"),
      it('They ___ (never/be) to London.', 'have never been', "'ve never been"),
      it('He ___ (lose) his keys.', 'has lost', "'s lost"),
      it('We ___ (already/eat).', 'have already eaten', "'ve already eaten"),
      it('___ you ___ (see) this film?', 'Have you seen'),
    ]),
    ex(2, 'Вставьте since или for.', [
      it('I have lived here ___ 2015.', 'since'),
      it('She has known him ___ ten years.', 'for'),
      it('We have been friends ___ school.', 'since'),
      it('He has worked there ___ a long time.', 'for'),
      it('They have been married ___ June.', 'since'),
      it('I haven’t seen you ___ ages!', 'for'),
    ]),
    ex(3, 'Исправьте ошибку.', [
      it('I have seen him yesterday.', 'I saw him yesterday'),
      it('She has gone to school in 2010.', 'She went to school in 2010'),
      it('Have you ever been to London? — Yes, I have been.', 'Yes, I have', 'Yes I have been'),
      it('He has wrote a letter.', 'He has written a letter'),
      it('I didn’t finished my work yet.', 'I haven’t finished my work yet', 'I have not finished my work yet'),
    ]),
  ],
};

const modals: DrillSection = {
  id: 'modals',
  title: 'Модальные глаголы',
  grades: '8–9 кл.',
  level: 'B1',
  rules: [
    'can/could — умение, возможность, разрешение; must — долг (обязан) / mustn’t — запрещено',
    'have to — вынужден (внешние обстоятельства); should — совет; may — официальное разрешение',
    'После модальных — V₁ без to; 3 лицо без -s: he must go, she can swim',
    'Вежливость: Could you…? / Would you mind…?',
  ],
  errorTag: 'verb-form',
  exercises: [
    ex(1, 'Вставьте can, must или may.', [
      it('You ___ cross the road here — it is dangerous. (запрещено)', 'mustn’t', 'must not'),
      it('___ I come in? (официально)', 'May'),
      it('She ___ swim very well. (умение)', 'can'),
      it('Pupils ___ wear a uniform at our school. (обязаны)', 'must'),
      it('___ you help me, please? (просьба)', 'Can', 'Could'),
      it('You ___ smoke in hospital. (запрещено)', 'mustn’t', 'must not', 'can’t', 'cannot'),
    ]),
    ex(2, 'Вставьте should, must или have to.', [
      it('You look tired. You ___ go to bed earlier. (совет)', 'should'),
      it('I ___ get up at 7 every day — school starts at 8. (вынужден)', 'have to'),
      it('You ___ tell lies — it is wrong. (нельзя)', 'mustn’t', 'must not', 'shouldn’t', 'should not'),
      it('She ___ wear a helmet — it is the law.', 'has to', 'must'),
      it('You ___ eat more vegetables — the doctor said so.', 'should', 'must'),
      it('We ___ hurry or we’ll miss the bus.', 'must', 'have to', 'should'),
    ]),
    ex(3, 'Исправьте ошибку.', [
      it('He musts go now.', 'He must go now'),
      it('She can to swim.', 'She can swim'),
      it('You should to see a doctor.', 'You should see a doctor'),
      it('I have go to school.', 'I have to go to school'),
      it('Does he must come?', 'Does he have to come', 'Must he come'),
    ]),
  ],
};

const passive: DrillSection = {
  id: 'passive',
  title: 'Пассивный залог',
  grades: '9–10 кл.',
  level: 'B1',
  rules: [
    'be + V₃: The cake was eaten. Фокус на действии, а не на исполнителе',
    'Времена: is done (Pr.S.), was done (Past S.), will be done (Fut.), has been done (Pr.Perf.), is being done (Pr.Cont.)',
    'Исполнитель через by (если важен): written by Pushkin',
    'Active→Passive: объект активного становится подлежащим пассивного',
  ],
  errorTag: 'verb-form',
  exercises: [
    ex(1, 'Переделайте предложение в пассивный залог.', [
      it('They built the house in 1990.', 'The house was built in 1990'),
      it('She writes a letter every week.', 'A letter is written every week', 'A letter is written by her every week'),
      it('The cat broke the vase.', 'The vase was broken by the cat', 'The vase was broken'),
      it('They sell fresh bread here.', 'Fresh bread is sold here'),
      it('He will finish the work tomorrow.', 'The work will be finished tomorrow'),
    ]),
    ex(2, 'Раскройте скобки, поставив глагол в пассивный залог.', [
      it('The letter ___ (send) yesterday.', 'was sent'),
      it('English ___ (speak) all over the world.', 'is spoken'),
      it('The new school ___ (build) next year.', 'will be built'),
      it('The room ___ (clean) every day.', 'is cleaned'),
      it('The car ___ (repair) at the moment.', 'is being repaired'),
      it('The tickets ___ (already/sell).', 'have already been sold', 'have been already sold'),
    ]),
    ex(3, 'Исправьте ошибку в пассиве.', [
      it('The book was wrote by a child.', 'The book was written by a child'),
      it('The house is build every year.', 'The house is built every year'),
      it('The songs was sung beautifully.', 'The songs were sung beautifully'),
      it('The work has being done.', 'The work has been done'),
      it('The cake is be eat.', 'The cake is being eaten', 'The cake was eaten'),
    ]),
  ],
};

const reported: DrillSection = {
  id: 'reported-speech',
  title: 'Косвенная речь и сложное дополнение',
  grades: '10–11 кл.',
  level: 'B2',
  rules: [
    'Косвенная речь: сдвиг времен назад (am→was, will→would, has→had)',
    'He said (that)… / She told me (that)…; вопросы: asked if/whether, asked what/where + прямой порядок слов',
    'Просьбы и приказания: told/asked + объект + to-infinitive: She told me to wait.',
    'Сложное дополнение: want/expect/would like + объект + to-infinitive: I want him to come. see/hear + объект + V/-ing: I saw him leave/leaving.',
  ],
  errorTag: 'tense',
  exercises: [
    ex(1, 'Переведите прямую речь в косвенную.', [
      it('He said, “I am tired.”', 'He said he was tired', 'He said that he was tired'),
      it('She said, “I will help you.”', 'She said she would help me', 'She said that she would help me'),
      it('Tom said, “I have finished.”', 'Tom said he had finished', 'Tom said that he had finished'),
      it('They said, “We are leaving tomorrow.”', 'They said they were leaving the next day', 'They said that they were leaving the next day', 'They said they were leaving tomorrow'),
      it('She said, “I can’t come.”', 'She said she couldn’t come', 'She said that she could not come'),
    ]),
    ex(2, 'Переведите просьбу/приказ в косвенную речь (told/asked … to).', [
      it('“Open the door,” she said to me.', 'She told me to open the door', 'She asked me to open the door'),
      it('“Don’t be late,” he said to us.', 'He told us not to be late', 'He asked us not to be late'),
      it('“Help me, please,” the boy said.', 'The boy asked to help him', 'The boy asked me to help him'),
      it('“Don’t touch it!” mum said.', 'Mum told me not to touch it', 'Mum told us not to touch it'),
      it('“Sit down,” the teacher said.', 'The teacher told us to sit down', 'The teacher told me to sit down'),
    ]),
    ex(3, 'Сложное дополнение: раскройте скобки.', [
      it('I want ___ (he/come) to my party.', 'him to come'),
      it('She expects ___ (they/arrive) soon.', 'them to arrive'),
      it('We would like ___ (you/stay) longer.', 'you to stay'),
      it('I saw ___ (she/leave) the house.', 'her leave', 'her leaving'),
      it('He heard ___ (I/sing) in the shower.', 'me sing', 'me singing'),
      it('Do you want ___ (I/help) you?', 'me to help'),
    ]),
  ],
};

const conditionals: DrillSection = {
  id: 'conditionals',
  title: 'Условные предложения',
  grades: '10–11 кл.',
  level: 'B1',
  rules: [
    'Zero (факты): If + Present, Present — If you heat ice, it melts.',
    'First (реальное будущее): If + Present, will + V — If it rains, we will stay home.',
    'Second (нереальное): If + Past, would + V — If I were rich, I would travel. (were для всех!)',
    'Third (сожаление о прошлом): If + Past Perfect, would have + V₃ — If I had known, I would have come.',
  ],
  errorTag: 'tense',
  exercises: [
    ex(1, 'Раскройте скобки (First Conditional).', [
      it('If it ___ (rain), we will stay at home.', 'rains'),
      it('If you study hard, you ___ (pass) the exam.', 'will pass', "'ll pass"),
      it('If she ___ (call) me, I will help her.', 'calls'),
      it('We ___ (go) to the park if the weather is fine.', 'will go', "'ll go"),
      it('If they ___ (hurry), they won’t miss the train.', 'hurry'),
    ]),
    ex(2, 'Раскройте скобки (Second Conditional).', [
      it('If I ___ (be) rich, I would buy a big house.', 'were'),
      it('If she ___ (know) the answer, she would tell us.', 'knew'),
      it('If we lived in Italy, we ___ (eat) pasta every day.', 'would eat'),
      it('If he ___ (have) more time, he would learn Spanish.', 'had'),
      it('I ___ (help) you if I could.', 'would help'),
      it('If I were you, I ___ (apologize).', 'would apologize', "'d apologize"),
    ]),
    ex(3, 'Раскройте скобки (Third Conditional).', [
      it('If I ___ (know) it earlier, I would have told you.', 'had known'),
      it('If they had left earlier, they ___ (catch) the train.', 'would have caught'),
      it('If she ___ (study) harder, she would have passed.', 'had studied'),
      it('We ___ (go) to the beach if it hadn’t rained.', 'would have gone'),
      it('If you had called me, I ___ (come).', 'would have come', "'d have come"),
    ]),
  ],
};

const wordFormation: DrillSection = {
  id: 'word-formation',
  title: 'Словообразование',
  grades: '10–11 кл.',
  level: 'B2',
  rules: [
    'Суффиксы существительных: -tion/-sion (educate→education), -ment (develop→development), -ness (happy→happiness), -er/-or (teach→teacher, act→actor)',
    'Суффиксы прилагательных: -ful (care→careful), -less (help→helpless), -ous (danger→dangerous), -able/-ible, -ive, -y',
    'Отрицательные приставки: un- (happy→unhappy), im- (possible→impossible), dis- (like→dislike), in-/il-/ir- (legal→illegal, regular→irregular)',
    'Наречия: -ly (quick→quickly); глаголы: -ize/-ise, en- (large→enlarge)',
  ],
  errorTag: 'vocabulary',
  exercises: [
    ex(1, 'Образуйте существительное от данного слова.', [
      it('teach → (учитель)', 'teacher'),
      it('happy → (счастье)', 'happiness'),
      it('develop → (развитие)', 'development'),
      it('invent → (изобретение)', 'invention'),
      it('kind → (доброта)', 'kindness'),
      it('act → (актёр)', 'actor'),
      it('educate → (образование)', 'education'),
    ]),
    ex(2, 'Добавьте отрицательную приставку.', [
      it('happy →', 'unhappy'),
      it('possible →', 'impossible'),
      it('legal →', 'illegal'),
      it('like →', 'dislike'),
      it('patient →', 'impatient'),
      it('regular →', 'irregular'),
      it('lucky →', 'unlucky'),
      it('responsible →', 'irresponsible'),
    ]),
    ex(3, 'Вставьте слово в нужной форме (как в ЕГЭ).', [
      it('She is a famous ___ (sing).', 'singer'),
      it('The film was really ___ (bore).', 'boring'),
      it('He gave me a very ___ (use) piece of advice.', 'useful'),
      it('It is ___ (danger) to swim here.', 'dangerous'),
      it('The test was ___ (believe) easy.', 'unbelievably'),
      it('She looked at me ___ (angry).', 'angrily'),
      it('We had a ___ (wonder) time at the party.', 'wonderful'),
    ]),
  ],
};

export const DRILL_SECTIONS: DrillSection[] = [
  articles,
  plurals,
  pronouns,
  thereIs,
  numerals,
  comparison,
  prepositions,
  presentSimple,
  presentContinuous,
  pastSimple,
  future,
  presentPerfect,
  modals,
  passive,
  reported,
  conditionals,
  wordFormation,
];

export const getSectionById = (id: string): DrillSection | undefined =>
  DRILL_SECTIONS.find((s) => s.id === id);
