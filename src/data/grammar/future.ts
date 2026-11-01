import type { GrammarTopic } from '../../types';

export const futureForms: GrammarTopic = {
  id: 'future-forms',
  title: 'Future: will и going to',
  level: 'A2',
  passScore: 0.8,
  theory: {
    explanation: [
      'Два главных способа говорить о будущем: will и be going to. Выбор зависит от смысла, а не от «правильности».',
      'will — решение, принятое в момент речи («I\'ll help you» — решил только что), обещания, предсказания-мнения (I think it will rain).',
      'be going to — план/намерение, принятое заранее («I\'m going to visit Anna tomorrow» — уже договорился), и предсказание по явным признакам («Look at the sky — it\'s going to rain»).',
      'Расписания и распорядки (поезда, кино, уроки) — Present Simple: «The train leaves at 9». Договорённости с конкретным временем — Present Continuous: «I\'m meeting Sam at 6».',
    ],
    formulas: {
      positive: [
        'will + V₁ → I will call you tomorrow.',
        'am/is/are + going to + V₁ → She is going to study medicine.',
      ],
      negative: [
        "won't + V₁ → I won't be late.",
        'am/is/are + not + going to + V₁ → We aren\'t going to stay.',
      ],
      question: [
        'Will + подлежащее + V₁ …? → Will you help me?',
        'Am/Is/Are + подлежащее + going to + V₁ …? → Are you going to come?',
      ],
    },
    examples: [
      { en: "I'll carry that bag for you.", ru: 'Я понесу эту сумку за тебя (решение сейчас).' },
      { en: 'We are going to buy a house next year.', ru: 'Мы собираемся купить дом в следующем году (план).' },
      { en: 'Look at those clouds — it is going to rain.', ru: 'Посмотри на тучи — будет дождь (видно по признакам).' },
      { en: 'I think he will pass the exam.', ru: 'Думаю, он сдаст экзамен (мнение).' },
      { en: "The film starts at 8.", ru: 'Фильм начинается в 8 (расписание).' },
    ],
    comparison: [
      {
        title: 'will vs going to',
        points: [
          { aspect: 'Решение', this: 'в момент речи', other: 'принято заранее' },
          { aspect: 'Предсказание', this: 'мнение (I think…)', other: 'видимые признаки (Look!…)' },
          { aspect: 'Пример', this: "I'll answer the phone.", other: "I'm going to answer — it's my mum." },
        ],
      },
    ],
    mistakes: [
      { wrong: 'I going to visit her.', right: 'I am going to visit her.', note: 'Нужен am/is/are перед going to.' },
      { wrong: 'I will to help you.', right: 'I will help you.', note: 'После will — глагол без to.' },
      { wrong: 'She wills come.', right: 'She will come.', note: 'will не изменяется по лицам.' },
      { wrong: 'I am going to buying a car.', right: 'I am going to buy a car.', note: 'going to + начальная форма, не -ing.' },
    ],
    quiz: [
      {
        question: '«О, телефон звонит!» — «I ___ it.» Что выбрать?',
        options: ['will answer', 'am going to answer', 'answer', 'answering'],
        correct: 0,
        explanation: 'Решение в момент речи → will.',
      },
      {
        question: '«Мы купили билеты — мы ___ в Италию в июле.»',
        options: ['will fly', 'are going to fly', 'flies', 'fly'],
        correct: 1,
        explanation: 'План, решённый заранее (билеты уже куплены) → going to.',
      },
      {
        question: '«Автобус ___ в 7 утра.» (расписание)',
        options: ['will leave', 'is going to leave', 'leaves', 'leaving'],
        correct: 2,
        explanation: 'Расписание → Present Simple: leaves.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'will или going to?',
      sentence: 'A: I\'ve decided to learn Spanish. B: Great! I ___ help you.',
      options: ['will', 'am going to', 'going to', 'would'],
      answer: 0,
      explanation: 'Решение «помогу» принято сейчас, в момент речи → will.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      sentence: 'Look at the sky! It ___ (rain).',
      answers: ['is going to rain', "'s going to rain"],
      explanation: 'Предсказание по видимым признакам → going to.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      sentence: 'I promise I ___ (not/be) late.',
      answers: ["won't be", 'will not be'],
      explanation: 'Обещание → will; отрицание won\'t.',
    },
    {
      type: 'fix',
      wrong: 'I am going to visiting my grandma tomorrow.',
      answers: ['I am going to visit my grandma tomorrow.'],
      explanation: 'going to + начальная форма глагола: visit.',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      wrong: 'She will comes to the party.',
      answers: ['She will come to the party.'],
      explanation: 'will + V₁ без -s: will come.',
      errorTag: 'verb-form',
    },
    {
      type: 'choice',
      prompt: 'Выберите правильную форму',
      sentence: 'The train ___ at 6.30 tomorrow morning.',
      options: ['will leave', 'is going to leave', 'leaves', 'leaving'],
      answer: 2,
      explanation: 'Расписание → Present Simple: leaves.',
      errorTag: 'tense',
    },
    {
      type: 'translate',
      ru: 'Мы собираемся купить машину в следующем году.',
      answers: ['We are going to buy a car next year.', "We're going to buy a car next year."],
      explanation: 'План на будущее → going to.',
    },
    {
      type: 'translate',
      ru: 'Я тебе помогу.',
      answers: ["I'll help you.", 'I will help you.'],
      explanation: 'Решение/обещание в момент речи → will.',
    },
    {
      type: 'compose',
      prompt: 'Расскажите о своих планах на ближайшие выходные (1–2 предложения с going to).',
      mustContain: ['going to'],
      samples: ["I'm going to visit my parents this weekend."],
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Думаю, завтра будет дождь.',
      answers: ['I think it will rain tomorrow.', "I think it'll rain tomorrow."],
      explanation: 'Мнение о будущем → I think … will.',
    },
    {
      kind: 'en2ru',
      prompt: "We're going to visit our friends this weekend.",
      answers: ['Мы собираемся навестить друзей в эти выходные.', 'Мы собираемся в гости к друзьям в эти выходные.'],
      keywordsRu: ['собираемся', 'друз', 'выходн'],
    },
    {
      kind: 'listen',
      prompt: "I'll carry that bag for you.",
      answers: ['Я понесу эту сумку за тебя.', 'Я помогу тебе с сумкой.'],
      keywordsRu: ['сумк', 'понесу'],
    },
    {
      kind: 'ru2en',
      prompt: 'Фильм начинается в восемь.',
      answers: ['The film starts at eight.', 'The film starts at 8.'],
      explanation: 'Расписание → Present Simple.',
    },
    {
      kind: 'speak',
      prompt: 'Расскажите вслух о своих планах на следующий год (2–3 предложения с going to и will).',
      answers: [],
      keywords: ['going to'],
      hint: "I'm going to … / I think I will …",
    },
  ],
};

export const conditionals: GrammarTopic = {
  id: 'conditionals-0-1',
  title: 'Условные предложения (0 и 1 тип)',
  level: 'B1',
  passScore: 0.8,
  theory: {
    explanation: [
      'Zero Conditional (If + Present, … Present) — законы и факты, всегда истинные: «If you heat ice, it melts».',
      'First Conditional (If + Present, … will + V) — реальное условие в будущем: «If it rains, we\'ll stay home».',
      'Главная ловушка: после if НЕ ставится will! «If it will rain» — ошибка. Условие — в Present Simple, результат — с will.',
      'If-клауза может стоять первой или второй: «We\'ll stay home if it rains» — запятая не нужна, когда if в середине.',
    ],
    formulas: {
      positive: [
        'Zero: If + Present Simple, Present Simple → If you mix red and blue, you get purple.',
        'First: If + Present Simple, will + V₁ → If I have time, I\'ll call you.',
      ],
      negative: ["If + don't/doesn't, won't + V₁ → If she doesn't hurry, she won't catch the bus."],
      question: ['Will + подлежащее + V₁ + if + Present? → Will you come if I invite you?'],
    },
    examples: [
      { en: 'If you heat water to 100 degrees, it boils.', ru: 'Если нагреть воду до 100 градусов, она закипает.' },
      { en: 'If it rains tomorrow, we\'ll stay at home.', ru: 'Если завтра будет дождь, мы останемся дома.' },
      { en: 'I\'ll call you if I need help.', ru: 'Я позвоню тебе, если мне понадобится помощь.' },
      { en: 'If you don\'t eat breakfast, you get hungry.', ru: 'Если не завтракаешь — проголодаешься.' },
      { en: 'Will you help me if I ask nicely?', ru: 'Ты поможешь мне, если я вежливо попрошу?' },
    ],
    comparison: [
      {
        title: 'Zero vs First Conditional',
        points: [
          { aspect: 'Реальность', this: 'всегда истинно (факт)', other: 'возможное будущее' },
          { aspect: 'Формула', this: 'If + Present, Present', other: 'If + Present, will + V' },
          { aspect: 'Пример', this: 'If I drink coffee at night, I can\'t sleep.', other: 'If I drink coffee now, I won\'t sleep tonight.' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'If it will rain, we\'ll stay home.', right: 'If it rains, we\'ll stay home.', note: 'После if — Present, а не will.' },
      { wrong: 'If I will have time, I help you.', right: 'If I have time, I\'ll help you.', note: 'Результат — с will, условие — без.' },
      { wrong: 'If you will heat ice, it melts.', right: 'If you heat ice, it melts.', note: 'Zero Conditional: Present в обеих частях.' },
      { wrong: 'I will call you if I will need help.', right: 'I will call you if I need help.', note: 'if-часть всегда в Present.' },
    ],
    quiz: [
      {
        question: '«If it ___ tomorrow, we\'ll stay home.»',
        options: ['will rain', 'rains', 'rain', 'raining'],
        correct: 1,
        explanation: 'Условие → Present Simple: rains.',
      },
      {
        question: 'Zero Conditional описывает…',
        options: ['нереальное прошлое', 'возможное будущее', 'факты и законы', 'сожаления'],
        correct: 2,
        explanation: 'Zero = If + Present, Present — всегда истинные утверждения.',
      },
      {
        question: '«If you ___ ice, it melts.»',
        options: ['will heat', 'heated', 'heat', 'heating'],
        correct: 2,
        explanation: 'Факт → Present Simple в обеих частях.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Выберите правильную форму',
      sentence: 'If I ___ time tonight, I\'ll watch that film.',
      options: ['will have', 'have', 'had', 'having'],
      answer: 1,
      explanation: 'If + Present Simple для будущего условия: have.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      sentence: 'If she ___ (not/hurry), she\'ll miss the bus.',
      answers: ["doesn't hurry", 'does not hurry'],
      explanation: 'she → doesn\'t + hurry; вторая часть с will.',
      errorTag: 'aux-do',
    },
    {
      type: 'fix',
      wrong: 'If it will rain, we will stay home.',
      answers: ['If it rains, we will stay home.', 'If it rains, we\'ll stay home.'],
      explanation: 'После if не ставится will — только Present.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      sentence: 'If you ___ (mix) red and white, you get pink.',
      answers: ['mix'],
      explanation: 'Факт → Zero Conditional: Present в обеих частях.',
    },
    {
      type: 'choice',
      prompt: 'Zero или First?',
      sentence: 'If you ___ the button, the machine stops.',
      options: ['will press', 'press', 'pressed', 'pressing'],
      answer: 1,
      explanation: 'Машина всегда останавливается — факт → Zero: press.',
    },
    {
      type: 'translate',
      ru: 'Если ты попросишь, я помогу.',
      answers: ['If you ask, I\'ll help.', 'If you ask me, I\'ll help you.', 'I\'ll help you if you ask.'],
      explanation: 'If + Present → will в основной части.',
    },
    {
      type: 'translate',
      ru: 'Я позвоню тебе, если опоздаю.',
      answers: ["I'll call you if I'm late.", 'I will call you if I am late.'],
      explanation: 'if-часть в Present: if I\'m late.',
      errorTag: 'tense',
    },
    {
      type: 'compose',
      prompt: 'Составьте предложение First Conditional о планах на выходные (погода/деньги/время).',
      mustContain: ['if'],
      samples: ["If it's sunny, we'll go to the beach."],
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Если будет дождь, мы останемся дома.',
      answers: ['If it rains, we\'ll stay at home.', 'If it rains, we will stay at home.', "We'll stay at home if it rains."],
    },
    {
      kind: 'en2ru',
      prompt: 'If you don\'t water the plants, they die.',
      answers: ['Если не поливать растения, они погибают.', 'Если ты не поливаешь растения, они умирают.'],
      keywordsRu: ['не', 'поливать', 'растени', 'умира'],
    },
    {
      kind: 'listen',
      prompt: "I'll text you when I arrive.",
      answers: ['Я напишу тебе, когда приеду.', 'Я напишу, когда приеду.'],
      keywordsRu: ['напишу', 'когда', 'приеду'],
      explanation: 'when-часть тоже в Present — как с if.',
    },
    {
      kind: 'ru2en',
      prompt: 'Что ты будешь делать, если опоздаешь на автобус?',
      answers: ['What will you do if you miss the bus?', 'What will you do if you are late for the bus?'],
    },
    {
      kind: 'speak',
      prompt: 'Придумайте вслух два условных предложения о своих планах (If…, I\'ll…).',
      answers: [],
      keywords: ['if'],
      hint: 'If the weather is good, I\'ll … / If I have time, …',
    },
  ],
};
