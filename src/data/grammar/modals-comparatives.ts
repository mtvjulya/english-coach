import type { GrammarTopic } from '../../types';

export const modals: GrammarTopic = {
  id: 'modal-verbs',
  title: 'Модальные глаголы: can, must, should, have to',
  level: 'B1',
  passScore: 0.8,
  theory: {
    explanation: [
      'Модальные глаголы выражают отношение к действию: умение (can), необходимость (must, have to), совет (should), возможность (may, might).',
      'Главные правила: после модального — голый инфинитив без to (can swim, must go); модальные не меняются по лицам (he can — без -s); вопрос строится без do (Can you…? Must I…?).',
      'must vs have to: must — сильная необходимость от говорящего/правила («You must stop»); have to — внешняя необходимость по обстоятельствам («I have to wear a uniform» — такие правила на работе). В речи часто взаимозаменимы.',
      'should — совет/рекомендация («You should see a doctor»). mustn\'t = запрещено; don\'t have to = не нужно (но можно). Разница критична!',
    ],
    formulas: {
      positive: [
        'модальный + V₁ → I can swim. / She must go. / You should rest.',
        'have to меняется как обычный глагол → I have to work. / She has to work.',
      ],
      negative: [
        "модальный + not + V₁ → can't, mustn't, shouldn't + V₁",
        "don't/doesn't have to + V₁ → You don't have to come.",
      ],
      question: [
        'Модальный + подлежащее + V₁? → Can you swim? / Should I call her?',
        'Do/Does + … have to …? → Do I have to sign this?',
      ],
    },
    examples: [
      { en: 'I can speak three languages.', ru: 'Я умею говорить на трёх языках.' },
      { en: 'You mustn\'t park here.', ru: 'Здесь нельзя парковаться (запрещено).' },
      { en: 'You don\'t have to come — it\'s optional.', ru: 'Тебе не обязательно приходить — это по желанию.' },
      { en: 'She has to work on Saturdays.', ru: 'Ей приходится работать по субботам.' },
      { en: 'You should see a doctor about that cough.', ru: 'Тебе стоит показать кашель врачу.' },
    ],
    comparison: [
      {
        title: 'mustn\'t vs don\'t have to',
        points: [
          { aspect: 'Смысл', this: 'запрещено', other: 'не обязательно (но можно)' },
          { aspect: 'Пример', this: "You mustn't smoke here. (нельзя!)", other: "You don't have to smoke. (не обязан)" },
        ],
      },
      {
        title: 'must vs have to',
        points: [
          { aspect: 'Источник необходимости', this: 'говорящий / внутреннее', other: 'внешние обстоятельства' },
          { aspect: 'Пример', this: 'I must lose weight. (я решил)', other: 'I have to wear a uniform. (правила работы)' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'I can to swim.', right: 'I can swim.', note: 'После can — инфинитив без to.' },
      { wrong: 'He cans drive.', right: 'He can drive.', note: 'Модальные не получают -s.' },
      { wrong: 'Do you can help me?', right: 'Can you help me?', note: 'Вопрос с модальным — без do.' },
      { wrong: 'You mustn\'t come — it\'s optional.', right: 'You don\'t have to come — it\'s optional.', note: '«Не обязательно» = don\'t have to, а mustn\'t = «запрещено».' },
    ],
    quiz: [
      {
        question: '«She ___ play the piano very well.»',
        options: ['can', 'cans', 'can to', 'is can'],
        correct: 0,
        explanation: 'can не изменяется по лицам: she can.',
      },
      {
        question: '«You ___ smoke in the hospital — it\'s forbidden.»',
        options: ["don't have to", "mustn't", "shouldn't have", "can't to"],
        correct: 1,
        explanation: 'Запрет → mustn\'t.',
      },
      {
        question: 'Что значит «You don\'t have to come»?',
        options: ['тебе запрещено приходить', 'ты не должен приходить', 'можешь не приходить', 'ты не сможешь прийти'],
        correct: 2,
        explanation: 'don\'t have to = нет необходимости, по желанию.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Выберите модальный глагол',
      sentence: 'You ___ park here — look at the sign! (запрещено)',
      options: ["don't have to", "mustn't", "can't to", "should"],
      answer: 1,
      explanation: 'Запрет → mustn\'t.',
      errorTag: 'verb-form',
    },
    {
      type: 'gap',
      sentence: 'I ___ (умею) swim very well.',
      answers: ['can'],
      explanation: 'Умение → can + V₁ без to.',
    },
    {
      type: 'gap',
      sentence: 'She ___ work on Saturdays. (вынуждена по графику)',
      answers: ['has to'],
      explanation: 'Внешняя необходимость, 3-е лицо → has to.',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      wrong: 'He cans play football.',
      answers: ['He can play football.'],
      explanation: 'Модальный глагол не получает -s.',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      wrong: 'Do you can speak French?',
      answers: ['Can you speak French?'],
      explanation: 'Вопрос: Can + подлежащее + V — без do.',
      errorTag: 'word-order',
    },
    {
      type: 'choice',
      prompt: 'mustn\'t или don\'t have to?',
      sentence: 'You ___ wear a suit — the dress code is casual.',
      options: ["mustn't", "don't have to", "can't", "shouldn't"],
      answer: 1,
      explanation: '«Не обязательно» → don\'t have to.',
    },
    {
      type: 'translate',
      ru: 'Тебе стоит пойти к врачу.',
      answers: ['You should see a doctor.', 'You should go to a doctor.', 'You should visit a doctor.'],
      explanation: 'Совет → should + V₁.',
    },
    {
      type: 'translate',
      ru: 'Я умею говорить на трёх языках.',
      answers: ['I can speak three languages.'],
      explanation: 'Умение → can speak.',
    },
    {
      type: 'compose',
      prompt: 'Дайте совет другу, который плохо спит (should/shouldn\'t).',
      mustContain: ['should'],
      samples: ["You shouldn't drink coffee at night.", 'You should go to bed earlier.'],
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Здесь нельзя курить.',
      answers: ["You mustn't smoke here.", "You can't smoke here.", 'Smoking is forbidden here.'],
      explanation: 'Запрет → mustn\'t.',
    },
    {
      kind: 'ru2en',
      prompt: 'Мне не нужно работать в воскресенье.',
      answers: ["I don't have to work on Sunday.", "I don't have to work on Sundays."],
    },
    {
      kind: 'en2ru',
      prompt: 'You should drink more water and rest.',
      answers: ['Тебе стоит пить больше воды и отдыхать.', 'Вам следует пить больше воды и отдыхать.'],
      keywordsRu: ['стоит', 'следует', 'вод', 'отдых'],
    },
    {
      kind: 'listen',
      prompt: 'Do I have to sign this form?',
      answers: ['Мне нужно подписать эту форму?', 'Я должен подписать эту форму?'],
      keywordsRu: ['подписать', 'форм'],
    },
    {
      kind: 'speak',
      prompt: 'Расскажите вслух о трёх правилах на вашей работе/учёбе (have to / mustn\'t / can).',
      answers: [],
      keywords: [],
      hint: 'I have to … / We mustn\'t … / We can …',
    },
  ],
};

export const comparatives: GrammarTopic = {
  id: 'comparatives',
  title: 'Сравнительная и превосходная степень',
  level: 'B1',
  passScore: 0.8,
  theory: {
    explanation: [
      'Короткие прилагательные (1–2 слога): сравнительная степень = -er + than (taller than), превосходная = the + -est (the tallest).',
      'Длинные прилагательные (3+ слога и большинство двусложных): more … than и the most … (more expensive, the most interesting).',
      'Орфография: big → bigger (удвоение согласной), happy → happier (y → i), nice → nicer (немая e отпадает).',
      'Неправильные формы: good → better → the best; bad → worse → the worst; far → further/farther → the furthest/farthest; many/much → more → the most.',
    ],
    formulas: {
      positive: [
        'V-er + than → My car is faster than yours.',
        'more + длинное прилаг. + than → This book is more interesting than that one.',
        'the + V-est / the most → He is the tallest in the class.',
      ],
      negative: ['as … as для равенства → I\'m not as tall as my brother. / not as … as'],
      question: ['Which is …er, A or B? → Which is cheaper, the bus or the train?'],
    },
    examples: [
      { en: 'My house is bigger than yours.', ru: 'Мой дом больше твоего.' },
      { en: 'This film is more interesting than the book.', ru: 'Этот фильм интереснее книги.' },
      { en: 'She is the best student in our class.', ru: 'Она лучшая ученица в классе.' },
      { en: 'Today is colder than yesterday.', ru: 'Сегодня холоднее, чем вчера.' },
      { en: 'I\'m not as busy as you.', ru: 'Я не так занят, как ты.' },
    ],
    comparison: [
      {
        title: '-er/-est vs more/most',
        points: [
          { aspect: 'Короткие прилагательные', this: 'fast → faster → the fastest', other: '—' },
          { aspect: 'Длинные прилагательные', this: '—', other: 'expensive → more expensive → the most expensive' },
          { aspect: 'Неправильные', this: 'good → better → the best', other: 'bad → worse → the worst' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'more faster', right: 'faster', note: 'Нельзя more + -er одновременно.' },
      { wrong: 'the most big', right: 'the biggest', note: 'Короткие прилагательные — без most.' },
      { wrong: 'good → gooder', right: 'good → better', note: 'Неправильная форма: better/the best.' },
      { wrong: 'My car is more fast than yours.', right: 'My car is faster than yours.', note: 'Короткое прилагательное → -er.' },
      { wrong: 'He is more tall than me.', right: 'He is taller than me.', note: 'tall → taller.' },
    ],
    quiz: [
      {
        question: '«This exercise is ___ than the last one.»',
        options: ['difficulter', 'more difficult', 'most difficult', 'difficult'],
        correct: 1,
        explanation: 'difficult — длинное → more difficult.',
      },
      {
        question: '«She is ___ student in the class.»',
        options: ['the best', 'the better', 'best', 'more good'],
        correct: 0,
        explanation: 'Превосходная степень good → the best.',
      },
      {
        question: '«My flat is ___ than yours.»',
        options: ['more small', 'smaller', 'smallest', 'small'],
        correct: 1,
        explanation: 'Короткое прилагательное → smaller.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Выберите правильную форму',
      sentence: 'This test was ___ than I expected.',
      options: ['more easy', 'easier', 'easiest', 'most easy'],
      answer: 1,
      explanation: 'easy — двусложное на -y → easier.',
    },
    {
      type: 'gap',
      sentence: 'My car is ___ (fast) than yours.',
      answers: ['faster'],
      explanation: 'fast → faster + than.',
    },
    {
      type: 'gap',
      sentence: 'She is ___ (good) singer in the school.',
      answers: ['the best'],
      explanation: 'good → the best (неправильная форма).',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      wrong: 'This book is more better than that one.',
      answers: ['This book is better than that one.'],
      explanation: 'better уже сравнительная степень — more не нужен.',
    },
    {
      type: 'fix',
      wrong: 'He is the most tall boy in the class.',
      answers: ['He is the tallest boy in the class.'],
      explanation: 'Короткое прилагательное → the tallest.',
    },
    {
      type: 'choice',
      prompt: 'as … as',
      sentence: 'I\'m not ___ tall ___ my brother.',
      options: ['as / than', 'as / as', 'so / than', '— / as'],
      answer: 1,
      explanation: 'Равенство/неравенство: not as … as.',
    },
    {
      type: 'translate',
      ru: 'Сегодня холоднее, чем вчера.',
      answers: ['Today is colder than yesterday.', 'It is colder today than yesterday.'],
      explanation: 'cold → colder + than.',
    },
    {
      type: 'translate',
      ru: 'Это самый интересный фильм в году.',
      answers: ['It is the most interesting film of the year.', 'This is the most interesting film of the year.'],
      explanation: 'the most + длинное прилагательное.',
    },
    {
      type: 'compose',
      prompt: 'Сравните два города или два предмета, которые вы знаете (1–2 предложения с -er/more … than).',
      mustContain: ['than'],
      samples: ['Dublin is smaller than London but more expensive.'],
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Мой дом больше твоего.',
      answers: ['My house is bigger than yours.', 'My house is bigger than your house.'],
    },
    {
      kind: 'en2ru',
      prompt: 'Flying is faster but more expensive than the train.',
      answers: ['Самолёт быстрее, но дороже поезда.', 'Лететь быстрее, но дороже, чем ехать поездом.'],
      keywordsRu: ['быстр', 'дорож', 'поезд'],
    },
    {
      kind: 'listen',
      prompt: 'She is the best student in our group.',
      answers: ['Она лучшая студентка в нашей группе.', 'Она лучшая ученица в нашей группе.'],
      keywordsRu: ['лучш', 'групп'],
    },
    {
      kind: 'ru2en',
      prompt: 'Я не так занят, как ты.',
      answers: ["I'm not as busy as you.", 'I am not as busy as you.'],
      explanation: 'not as … as — «не так … как».',
    },
    {
      kind: 'speak',
      prompt: 'Расскажите вслух: что у вас лучше/хуже, чем у друга/коллеги (2 предложения со сравнениями).',
      answers: [],
      keywords: ['than'],
      hint: 'My … is …er than his/hers. / … is more … than …',
    },
  ],
};
