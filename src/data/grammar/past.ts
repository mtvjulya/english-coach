import type { GrammarTopic } from '../../types';

export const pastSimple: GrammarTopic = {
  id: 'past-simple',
  title: 'Past Simple',
  level: 'A2',
  passScore: 0.8,
  theory: {
    explanation: [
      'Past Simple — законченное действие в прошлом с известным временем: yesterday, last week, in 2010, two days ago.',
      'Правильные глаголы получают -ed (work → worked). Неправильные имеют особую форму (go → went, see → saw, buy → bought) — их надо учить.',
      'Отрицания и вопросы — через did: «I didn\'t go», «Did you see?». Важно: после did/didn\'t глагол возвращается в начальную форму — «Did you went?» — ошибка.',
      'Глагол to be — особый: was (I/he/she/it) и were (you/we/they). Вопросы без did: «Were you at home?».',
    ],
    formulas: {
      positive: [
        'Подлежащее + V₂ (V-ed или неправильная форма) → I worked / I went.',
        'was/were → She was tired. / They were at home.',
      ],
      negative: [
        'Подлежащее + didn\'t + V₁ → I didn\'t go.',
        'wasn\'t/weren\'t → He wasn\'t ready.',
      ],
      question: [
        'Did + подлежащее + V₁ …? → Did you call her?',
        'Was/Were + подлежащее …? → Was it cold?',
      ],
    },
    examples: [
      { en: 'I visited my grandmother last weekend.', ru: 'Я навещал бабушку на прошлых выходных.' },
      { en: 'She didn\'t come to work yesterday.', ru: 'Она вчера не пришла на работу.' },
      { en: 'Did you watch the film last night?', ru: 'Ты смотрел фильм вчера вечером?' },
      { en: 'They moved to Dublin in 2019.', ru: 'Они переехали в Дублин в 2019 году.' },
      { en: 'We were at the seaside two weeks ago.', ru: 'Мы были на море две недели назад.' },
    ],
    comparison: [
      {
        title: 'Past Simple vs Present Perfect',
        points: [
          { aspect: 'Связь с настоящим', this: 'действие завершено, время известно', other: 'результат важен сейчас, время не указано' },
          { aspect: 'Маркеры', this: 'yesterday, last year, in 2010', other: 'ever, never, just, already, yet' },
          { aspect: 'Пример', this: 'I saw that film yesterday.', other: 'I have seen that film. (когда — неважно)' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'Did you went home?', right: 'Did you go home?', note: 'После did — начальная форма go.' },
      { wrong: 'I didn\'t saw him.', right: 'I didn\'t see him.', note: 'didn\'t уже несёт прошедшее время.' },
      { wrong: 'She was go to school.', right: 'She went to school.', note: 'was + go не образует Past Simple — нужна форма went.' },
      { wrong: 'Where you was yesterday?', right: 'Where were you yesterday?', note: 'С you — were; и обратный порядок слов в вопросе.' },
    ],
    quiz: [
      {
        question: 'Какая форма правильная: «I ___ him yesterday.»',
        options: ['see', 'saw', 'seen', 'seeing'],
        correct: 1,
        explanation: 'see → saw (неправильный глагол, 2-я форма).',
      },
      {
        question: '«___ you at home last night?» Какой вспомогательный?',
        options: ['Did', 'Was', 'Were', 'Are'],
        correct: 2,
        explanation: '«Be» в прошлом: were you, was he — без did.',
      },
      {
        question: '«She didn\'t ___ the letter.»',
        options: ['wrote', 'write', 'written', 'writes'],
        correct: 1,
        explanation: 'После didn\'t — начальная форма write.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Выберите правильную форму',
      sentence: 'We ___ to Spain last summer.',
      options: ['go', 'goes', 'went', 'gone'],
      answer: 2,
      explanation: 'last summer → Past Simple; go → went.',
    },
    {
      type: 'gap',
      sentence: 'I ___ (not/see) him yesterday.',
      answers: ["didn't see", 'did not see'],
      explanation: 'didn\'t + начальная форма see.',
      errorTag: 'aux-do',
    },
    {
      type: 'gap',
      sentence: 'She ___ (buy) a new phone two days ago.',
      answers: ['bought'],
      explanation: 'buy → bought (неправильный глагол).',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      wrong: 'Did you watched the match?',
      answers: ['Did you watch the match?'],
      explanation: 'После did глагол без -ed: watch.',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      wrong: 'He was not came to the party.',
      answers: ['He did not come to the party.', "He didn't come to the party."],
      explanation: 'Отрицание обычного глагола — didn\'t + V₁, а не wasn\'t.',
      errorTag: 'aux-do',
    },
    {
      type: 'choice',
      prompt: 'Was или were?',
      sentence: 'There ___ a lot of people at the concert.',
      options: ['was', 'were', 'did', 'are'],
      answer: 1,
      explanation: 'a lot of people = множественное число → were.',
    },
    {
      type: 'translate',
      ru: 'Вчера я купил новую книгу.',
      answers: ['I bought a new book yesterday.', 'Yesterday I bought a new book.'],
      explanation: 'buy → bought; yesterday обычно в конце.',
    },
    {
      type: 'translate',
      ru: 'Ты был дома вчера вечером?',
      answers: ['Were you at home last night?', 'Were you at home yesterday evening?'],
      explanation: 'Вопрос с were — без did: Were you …?',
      errorTag: 'aux-do',
    },
    {
      type: 'compose',
      prompt: 'Расскажите одним предложением, что вы делали вчера (Past Simple, глагол в 2-й форме).',
      mustContain: ['yesterday'],
      samples: ['I visited my friend yesterday.', 'I worked from home yesterday.'],
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Она не пришла на работу вчера.',
      answers: ["She didn't come to work yesterday.", 'She did not come to work yesterday.'],
      explanation: 'didn\'t + come (начальная форма).',
    },
    {
      kind: 'ru2en',
      prompt: 'Когда они переехали в Дублин?',
      answers: ['When did they move to Dublin?'],
      explanation: 'Специальный вопрос: When + did + they + V₁?',
    },
    {
      kind: 'en2ru',
      prompt: 'I met an old friend in the city centre yesterday.',
      answers: ['Вчера в центре города я встретил старого друга.', 'Я встретил старого друга в центре города вчера.'],
      keywordsRu: ['встретил', 'друг', 'вчера', 'центр'],
    },
    {
      kind: 'listen',
      prompt: 'We were at the seaside last weekend.',
      answers: ['Мы были на море на прошлых выходных.', 'На прошлых выходных мы были на море.'],
      keywordsRu: ['были', 'мор', 'выходн'],
    },
    {
      kind: 'speak',
      prompt: 'Расскажите вслух, чем вы занимались в прошлые выходные (2–3 предложения, Past Simple).',
      answers: [],
      keywords: [],
      hint: 'On Saturday I … / Then we … / In the evening I …',
    },
  ],
};

export const presentPerfect: GrammarTopic = {
  id: 'present-perfect',
  title: 'Present Perfect',
  level: 'B1',
  passScore: 0.8,
  theory: {
    explanation: [
      'Present Perfect (have/has + V₃) связывает прошлое с настоящим: результат важен СЕЙЧАС, а когда именно это случилось — неважно или не указано.',
      'Типичные случаи: жизненный опыт (ever/never), только что случившееся (just), ещё не случившееся (yet), уже случившееся (already), действие «до сих пор» (for/since).',
      'Третья форма глагола: у правильных = -ed (worked), у неправильных — особая (seen, gone, written, been).',
      'Важно: с точным прошедшим временем (yesterday, in 2010) Present Perfect НЕ употребляется — там нужен Past Simple.',
    ],
    formulas: {
      positive: ['have/has + V₃ → I have finished. / She has left.'],
      negative: ["haven't/hasn't + V₃ → We haven't seen it."],
      question: ['Have/Has + подлежащее + V₃ …? → Have you ever been to London?'],
    },
    examples: [
      { en: 'I have just finished my report.', ru: 'Я только что закончил отчёт.' },
      { en: 'She has never been to Japan.', ru: 'Она никогда не была в Японии.' },
      { en: 'Have you done your homework yet?', ru: 'Ты уже сделал домашнее задание?' },
      { en: 'We have lived here for ten years.', ru: 'Мы живём здесь (уже) десять лет.' },
      { en: 'He has lost his keys.', ru: 'Он потерял ключи (результат: сейчас у него их нет).' },
    ],
    comparison: [
      {
        title: 'Present Perfect vs Past Simple',
        points: [
          { aspect: 'Время', this: 'не указано / до настоящего', other: 'точное прошедшее время' },
          { aspect: 'Пример', this: 'I have seen that film. (когда-то)', other: 'I saw that film yesterday.' },
          { aspect: 'Вопрос', this: 'Have you ever been…?', other: 'When did you go…?' },
        ],
      },
      {
        title: 'been vs gone',
        points: [
          { aspect: 'Смысл', this: 'has been to = был и вернулся', other: 'has gone to = уехал, ещё там' },
          { aspect: 'Пример', this: 'She has been to Paris twice.', other: 'She has gone to Paris. (сейчас в Париже)' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', note: 'С yesterday — Past Simple, не Perfect.' },
      { wrong: 'She has went home.', right: 'She has gone home.', note: 'has + V₃: gone, а не went.' },
      { wrong: 'I am working here since 2020.', right: 'I have worked here since 2020.', note: 'since + точка отсчёта → Present Perfect.' },
      { wrong: 'Did you ever try sushi?', right: 'Have you ever tried sushi?', note: 'Вопрос о жизненном опыте — Present Perfect + ever.' },
    ],
    quiz: [
      {
        question: 'С каким словом НЕ сочетается Present Perfect?',
        options: ['ever', 'just', 'yesterday', 'already'],
        correct: 2,
        explanation: 'yesterday — точное прошедшее время → Past Simple.',
      },
      {
        question: '«I ___ my keys. I can\'t open the door.»',
        options: ['lost', 'have lost', 'lose', 'am losing'],
        correct: 1,
        explanation: 'Результат важен сейчас (не могу открыть дверь) → have lost.',
      },
      {
        question: '«She has ___ to Italy three times.»',
        options: ['went', 'go', 'been', 'gone'],
        correct: 2,
        explanation: 'has been to — была и вернулась (три раза).',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Выберите правильную форму',
      sentence: 'I ___ never ___ sushi.',
      options: ['did / try', 'have / tried', 'am / trying', 'have / try'],
      answer: 1,
      explanation: 'never + Present Perfect для жизненного опыта: have tried.',
    },
    {
      type: 'choice',
      prompt: 'Past Simple или Present Perfect?',
      sentence: 'When ___ you ___ him? — I ___ him yesterday.',
      options: ['have / met / met', 'did / meet / met', 'did / meet / have met', 'have / met / have met'],
      answer: 1,
      explanation: 'When…? и yesterday → Past Simple в обоих случаях.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      sentence: 'She ___ (just/finish) her homework.',
      answers: ['has just finished'],
      explanation: 'has + just + V₃: has just finished.',
    },
    {
      type: 'gap',
      sentence: 'We ___ (live) here since 2015.',
      answers: ['have lived'],
      explanation: 'since 2015 → Present Perfect: have lived.',
      errorTag: 'tense',
    },
    {
      type: 'fix',
      wrong: 'I have seen him yesterday.',
      answers: ['I saw him yesterday.'],
      explanation: 'yesterday — точное время → Past Simple.',
      errorTag: 'tense',
    },
    {
      type: 'fix',
      wrong: 'Have you ever ate sushi?',
      answers: ['Have you ever eaten sushi?'],
      explanation: 'eat → eaten (3-я форма) после have.',
      errorTag: 'verb-form',
    },
    {
      type: 'translate',
      ru: 'Я никогда не был в Лондоне.',
      answers: ['I have never been to London.', "I've never been to London."],
      explanation: 'never + have been to.',
    },
    {
      type: 'translate',
      ru: 'Ты уже сделал домашнее задание?',
      answers: ['Have you done your homework yet?', 'Have you already done your homework?'],
      explanation: 'yet — в конце вопроса; already — в середине.',
    },
    {
      type: 'compose',
      prompt: 'Скажите одним предложением, что вы уже сделали сегодня (already/just + Present Perfect).',
      mustContain: ['have'],
      samples: ['I have already answered my emails.', "I've just had lunch."],
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Мы живём здесь десять лет.',
      answers: ['We have lived here for ten years.', "We've lived here for ten years."],
      explanation: 'for + период → Present Perfect.',
    },
    {
      kind: 'en2ru',
      prompt: 'Has she ever tried Indian food?',
      answers: ['Она когда-нибудь пробовала индийскую еду?', 'Она пробовала когда-нибудь индийскую еду?'],
      keywordsRu: ['когда', 'пробовала', 'индийск'],
    },
    {
      kind: 'listen',
      prompt: 'I have just received your message.',
      answers: ['Я только что получил ваше сообщение.', 'Я только что получил твоё сообщение.'],
      keywordsRu: ['только', 'получил', 'сообщени'],
    },
    {
      kind: 'ru2en',
      prompt: 'Он потерял ключи и не может попасть домой.',
      answers: ["He has lost his keys and can't get home.", 'He has lost his keys and cannot get home.', "He's lost his keys and can't get home."],
    },
    {
      kind: 'speak',
      prompt: 'Расскажите вслух о двух вещах, которые вы никогда не делали, но хотели бы попробовать.',
      answers: [],
      keywords: ['have', 'never'],
      hint: "I have never … but I'd like to …",
    },
  ],
};
