import type { GrammarTopic } from '../../types';

// ===== Продвинутая грамматика B2–C2 =====

export const passiveReporting: GrammarTopic = {
  id: 'passive-reporting',
  title: 'Passive Voice и have something done',
  level: 'B2',
  passScore: 0.8,
  theory: {
    explanation: [
      'Passive Voice (страдательный залог) нужен, когда важно действие, а не исполнитель: «The bridge was built in 1900» — кто строил, неважно. Образуется: be + V₃ (причастие), где be несёт время.',
      'Пассив существует во всех временах: is built (Present), was built (Past), will be built (Future), has been built (Perfect), is being built (Continuous). Меняется только форма be — V₃ всегда постоянно.',
      'Исполнителя можно назвать через by: «The novel was written by a young author». Если исполнитель очевиден или неизвестен — by-фразу опускают.',
      'Отдельная конструкция — have/get something done: действие делают ДЛЯ вас другие люди. «I had my hair cut» — мне подстригли волосы (не я сам). «She gets her car serviced every year» — ей обслуживают машину.',
    ],
    formulas: {
      positive: [
        'подлежащее + be + V₃ → The report was sent yesterday.',
        'be + being + V₃ (Continuous) → The house is being painted.',
        'have/has + been + V₃ (Perfect) → The files have been deleted.',
        'have + объект + V₃ → I had my eyes tested.',
      ],
      negative: [
        'be + not + V₃ → The letter was not delivered.',
        "haven't/hasn't + been + V₃ → The tickets haven't been sold.",
      ],
      question: [
        'Be + подлежащее + V₃ …? → Was the film made in 2020?',
        'Have + подлежащее + объект + V₃ …? → Did you have your car repaired?',
      ],
    },
    examples: [
      { en: 'This cathedral was built in the 15th century.', ru: 'Этот собор был построен в XV веке.' },
      { en: 'The results will be announced tomorrow.', ru: 'Результаты объявят завтра.' },
      { en: 'My car is being repaired at the moment.', ru: 'Мою машину сейчас ремонтируют.' },
      { en: 'The documents have already been signed.', ru: 'Документы уже подписаны.' },
      { en: 'I had my phone fixed last week.', ru: 'Мне починили телефон на прошлой неделе.' },
      { en: 'She gets her nails done every month.', ru: 'Она делает маникюр каждый месяц.' },
    ],
    comparison: [
      {
        title: 'Active vs Passive',
        points: [
          { aspect: 'Фокус', this: 'на действии и результате', other: 'на исполнителе' },
          { aspect: 'Пример', this: 'The window was broken.', other: 'The kids broke the window.' },
          { aspect: 'Исполнитель', this: 'часто неизвестен/неважен (by — опционально)', other: 'всегда назван' },
        ],
      },
      {
        title: 'did it myself vs had it done',
        points: [
          { aspect: 'Кто выполняет', this: 'другой человек (за меня)', other: 'я сам' },
          { aspect: 'Пример', this: 'I had my hair cut.', other: 'I cut my hair.' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'The house was build in 1990.', right: 'The house was built in 1990.', note: 'Нужна третья форма глагола (V₃): built.' },
      { wrong: 'The film is being showed now.', right: 'The film is being shown now.', note: 'show → showed → shown.' },
      { wrong: 'I had my hair to cut.', right: 'I had my hair cut.', note: 'have + объект + V₃ без to.' },
      { wrong: 'The letter has sent yesterday.', right: 'The letter was sent yesterday.', note: 'Вчера → Past Passive: was sent.' },
    ],
    quiz: [
      {
        question: '«Эту книгу перевели на двадцать языков.»',
        options: ['This book has been translated into twenty languages.', 'This book has translated into twenty languages.', 'This book was translate into twenty languages.'],
        correct: 0,
        explanation: 'Результат к настоящему → Present Perfect Passive: has been translated.',
      },
      {
        question: '«Мне каждый год делают проверку зрения» — как сказать «делают мне»?',
        options: ['I check my eyes every year.', 'I have my eyes checked every year.', 'My eyes check every year.'],
        correct: 1,
        explanation: 'Действие выполняет другой → have something done.',
      },
      {
        question: 'В каком предложении правильная форма?',
        options: ['The car is being wash.', 'The car is being washed.', 'The car is being washing.'],
        correct: 1,
        explanation: 'Continuous Passive: is being + V₃ (washed).',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Выберите правильную форму',
      sentence: 'The new shopping centre ___ last month.',
      options: ['opened', 'was opened', 'has opened', 'is opened'],
      answer: 1,
      explanation: 'Открыли (его) в прошлом → Past Passive: was opened.',
      errorTag: 'verb-form',
    },
    {
      type: 'choice',
      prompt: 'Актив или пассив?',
      sentence: 'All the tickets ___ already, I’m afraid.',
      options: ['sold', 'have sold', 'have been sold', 'are sold'],
      answer: 2,
      explanation: 'Билеты проданы к настоящему моменту → Present Perfect Passive.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      prompt: 'Впишите пассивную форму глагола make',
      sentence: 'These jeans ___ in Italy.',
      answers: ['are made', 'were made'],
      explanation: 'Постоянный факт → are made; если про прошлое партии → were made.',
      errorTag: 'verb-form',
    },
    {
      type: 'gap',
      prompt: 'have something done',
      sentence: 'We ___ our kitchen ___ last summer. (remodel — переделали нам кухню)',
      answers: ['had our kitchen remodelled', 'had our kitchen remodeled'],
      explanation: 'Работу делала бригада → had + объект + V₃.',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      prompt: 'Исправьте ошибку',
      wrong: 'My bike was steal last night.',
      answers: ['My bike was stolen last night', 'My bike was stolen last night.'],
      explanation: 'steal → stole → stolen. Нужна форма V₃.',
      errorTag: 'verb-form',
    },
    {
      type: 'translate',
      ru: 'Мне стригут волосы раз в два месяца.',
      answers: [
        'I have my hair cut every two months',
        'I get my hair cut every two months',
        'I have my hair cut every 2 months',
      ],
      explanation: 'Стригут мне → have/get my hair cut.',
      errorTag: 'verb-form',
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Отчёт был отправлен вчера вечером.',
      answers: ['The report was sent yesterday evening', 'The report was sent last night', 'The report was sent last evening'],
      explanation: 'Вчера → Past Passive: was sent.',
    },
    {
      kind: 'ru2en',
      prompt: 'Ей делают причёску в этом салоне.',
      answers: ['She has her hair done in this salon', 'She gets her hair done at this salon', 'She has her hair done at this salon'],
      explanation: 'Делают ей → have/get her hair done.',
    },
    {
      kind: 'en2ru',
      prompt: 'The road is being repaired, so traffic is slow.',
      answers: ['дорогу ремонтируют', 'дорога ремонтируется'],
      keywordsRu: ['ремонт', 'дорог'],
      explanation: 'is being repaired — ремонтируют прямо сейчас (Continuous Passive).',
    },
    {
      kind: 'speak',
      prompt: 'Расскажите вслух, что делают ДЛЯ вас другие: стрижка, машина, документы (30–45 сек)',
      answers: [],
      keywords: ['have', 'my', 'done', 'fixed', 'cut', 'serviced'],
      hint: 'I have my hair cut… / I get my car serviced… / I had my documents translated…',
      explanation: 'Используйте have/get something done минимум дважды.',
    },
  ],
};

export const conditionalsAdvanced: GrammarTopic = {
  id: 'conditionals-advanced',
  title: 'Mixed и инвертированные условные',
  level: 'B2',
  passScore: 0.8,
  theory: {
    explanation: [
      'Смешанные условные (mixed conditionals) соединяют разное время в двух частях. Самая частая комбинация: прошлое условие → результат сейчас. «If I had studied medicine, I would be a doctor now» — не учил (прошлое), поэтому сейчас не врач.',
      'Обратная комбинация тоже возможна: постоянное условие → прошлый результат. «If she weren’t so stubborn, she would have apologized» — она всегда упряма, поэтому тогда не извинилась.',
      'В формальной и книжной речи if можно убрать, а вспомогательный глагол поставить перед подлежащим — инверсия: Had I known… = If I had known; Were I rich… = If I were rich; Should you need help… = If you should need help.',
      'Инвертированные условные звучат официально или литературно: «Should you have any questions, please contact us» — типичная фраза деловых писем.',
    ],
    formulas: {
      positive: [
        'If + Past Perfect, would + V₁ (сейчас) → If I had slept, I wouldn’t be tired now.',
        'If + Past Simple, would have + V₃ → If she were taller, she would have joined the team.',
        'Had + подл. + V₃, would have + V₃ → Had I known, I would have come.',
        'Were + подл. + to + V₁, would + V₁ → Were it to rain, the match would be cancelled.',
      ],
      negative: [
        "Had + подл. + not + V₃ → Had I not seen the sign, I'd be lost.",
        'If + подл. + hadn’t + V₃ → If they hadn’t left early, they wouldn’t be here.',
      ],
      question: [
        'Should + подл. + V₁ …? → Should you need help, call me. (развёрнутый вопрос: What should I do if…?)',
        'Had + подл. + V₃ …? → Had he asked, would you have helped?',
      ],
    },
    examples: [
      { en: 'If I had taken that job, I would be living in London now.', ru: 'Если бы я взял ту работу, сейчас бы жил в Лондоне.' },
      { en: 'If she weren’t so shy, she would have spoken at the meeting.', ru: 'Если бы она не была такой стеснительной, она бы выступила на собрании.' },
      { en: 'Had I known about the traffic, I would have left earlier.', ru: 'Знай я про пробки, я бы вышел раньше.' },
      { en: 'Were I you, I would apologize immediately.', ru: 'На твоём месте я бы сразу извинился.' },
      { en: 'Should you require further information, email our office.', ru: 'Если вам понадобятся сведения, напишите в наш офис.' },
    ],
    comparison: [
      {
        title: 'if-форма vs инверсия',
        points: [
          { aspect: 'Стиль', this: 'нейтральный/устный', other: 'формальный, книжный, деловой' },
          { aspect: 'Пример', this: 'If I had known…', other: 'Had I known…' },
          { aspect: 'Типичность', this: 'разговор, письма', other: 'официальные письма, литература' },
        ],
      },
      {
        title: '3-й тип vs смешанный',
        points: [
          { aspect: 'Результат', this: 'в прошлом', other: 'в настоящем' },
          { aspect: 'Пример', this: 'If I had studied, I would have passed.', other: 'If I had studied, I would be a lawyer now.' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'If I would have known, I would tell you.', right: 'If I had known, I would have told you.', note: 'Would в if-части не ставится.' },
      { wrong: 'Had I knew it, I would come.', right: 'Had I known it, I would have come.', note: 'После had — V₃ (known), результат — would have come.' },
      { wrong: 'If I had studied, I would be passed.', right: 'If I had studied, I would be a graduate now.', note: 'Смешанный тип: would + V₁ для настоящего результата, не would be passed.' },
      { wrong: 'Should you will need help, call me.', right: 'Should you need help, call me.', note: 'После should в условии — чистая форма глагола.' },
    ],
    quiz: [
      {
        question: '«If I had gone to bed earlier, I ___ tired now.» — смешанный тип',
        options: ['wouldn’t have been', 'wouldn’t be', 'won’t be'],
        correct: 1,
        explanation: 'Прошлое условие → настоящий результат: wouldn’t be.',
      },
      {
        question: '«Had I known» значит…',
        options: ['Если я знал', 'Знай я (раньше)', 'Я знал'],
        correct: 1,
        explanation: 'Инверсия = If I had known (прошлое).',
      },
      {
        question: 'Выберите формальный вариант «If you need anything…»',
        options: ['Need you anything…', 'Should you need anything…', 'Do you should need anything…'],
        correct: 1,
        explanation: 'Should + подлежащее + V₁ — формальный условный заход.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Смешанный условный',
      sentence: 'If they had booked earlier, the hotel ___ cheaper now.',
      options: ['would have been', 'would be', 'will be', 'was'],
      answer: 1,
      explanation: 'Прошлое условие → цена сейчас: would be.',
      errorTag: 'tense',
    },
    {
      type: 'choice',
      prompt: 'Инверсия',
      sentence: '___ it not for your help, I would have failed.',
      options: ['Had', 'Were', 'Should', 'If'],
      answer: 0,
      explanation: 'Had it not been for… = If it had not been for… — «если бы не».',
      errorTag: 'verb-form',
    },
    {
      type: 'gap',
      prompt: 'Перепишите без if (инверсия)',
      sentence: 'If you should see Anna, give her my regards. → ___ you see Anna, give her my regards.',
      answers: ['Should', 'should'],
      explanation: 'If you should see → Should you see.',
      errorTag: 'word-order',
    },
    {
      type: 'gap',
      prompt: 'Смешанный тип',
      sentence: 'If I ___ (learn) to cook years ago, I would eat better now.',
      answers: ['had learned', 'had learnt'],
      explanation: 'Прошлое условие → Past Perfect: had learned.',
      errorTag: 'tense',
    },
    {
      type: 'fix',
      prompt: 'Исправьте ошибку',
      wrong: 'If she would have called, I would answer.',
      answers: ['If she had called, I would have answered', 'If she had called, I would have answered.'],
      explanation: 'Двойная ошибка: had called + would have answered.',
      errorTag: 'verb-form',
    },
    {
      type: 'translate',
      ru: 'Если бы я знал, я бы помог. (инверсия)',
      answers: ['Had I known, I would have helped', 'Had I known, I would have helped.'],
      explanation: 'Had + подлежащее + V₃; would have + V₃.',
      errorTag: 'word-order',
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Если бы она взяла зонт, сейчас была бы сухой.',
      answers: [
        'If she had taken an umbrella, she would be dry now',
        'If she had taken the umbrella, she would be dry now',
      ],
      explanation: 'Прошлое условие → результат сейчас: would be.',
    },
    {
      kind: 'ru2en',
      prompt: 'Если вам понадобится помощь, позвоните мне. (формально, без if)',
      answers: ['Should you need help, call me', 'Should you need any help, call me'],
      explanation: 'Should + подлежащее + V₁ — формальный вариант условия.',
    },
    {
      kind: 'en2ru',
      prompt: 'Were it not for the traffic, we would have been on time.',
      answers: ['если бы не пробки', 'не будь пробок'],
      keywordsRu: ['пробк', 'вовремя'],
      explanation: 'Were it not for… — «если бы не…» (о настоящем/постоянном).',
    },
    {
      kind: 'speak',
      prompt: 'Вслух: две вещи, которые вы бы изменили в прошлом, и чем это отразилось бы на сейчас (30–60 сек)',
      answers: [],
      keywords: ['if', 'had', 'would', 'now'],
      hint: 'If I had started English earlier, I would speak fluently now.',
      explanation: 'Смешанный тип: прошлое условие → результат сейчас.',
    },
  ],
};

export const inversionEmphasis: GrammarTopic = {
  id: 'inversion-emphasis',
  title: 'Инверсия и эмфатические конструкции',
  level: 'C1',
  passScore: 0.8,
  theory: {
    explanation: [
      'Когда отрицательный наречный оборот стоит в начале предложения (Never, Seldom, Rarely, Hardly, No sooner, Not only, Under no circumstances), английский требует инверсии — порядка слов как в вопросе: «Never have I seen such beauty».',
      'Hardly/Scarcely … when и No sooner … than описывают события «как только, едва»: «Hardly had I sat down when the phone rang» — едва сел, как зазвонил телефон. Обычно с Past Perfect в первой части.',
      '«Not only … but also» при выносе вперёд тоже даёт инверсию: «Not only did she apologize, but she also offered to help».',
      'Второй способ выделить важное — расщеплённые предложения (cleft sentences): «It was John who called» (именно Джон) и «What I need is a holiday» (то, что мне нужно). Они переносят фокус на нужную часть фразы без инверсии.',
    ],
    formulas: {
      positive: [
        'Отриц. наречие + вспом. глагол + подл. + V → Never have I felt so happy.',
        'Hardly/No sooner + had + подл. + V₃ → No sooner had we arrived than it started to rain.',
        'Not only + инверсия + but also → Not only is it cheap, but it is also reliable.',
        'It + be + фокус + who/that → It was Maria who told me.',
        'What + клауза + be + фокус → What surprises me is his honesty.',
      ],
      negative: [
        'Under no circumstances + вспом. + подл. + V → Under no circumstances should you open the door.',
        'Not until + время + вспом. + подл. + V → Not until Monday did I feel better.',
      ],
      question: [
        'Даёт ли фраза инверсию? — зависит от первого слова: Only later did I realise…',
      ],
    },
    examples: [
      { en: 'Never have I tasted such delicious coffee.', ru: 'Никогда я не пробовал такого вкусного кофе.' },
      { en: 'Hardly had she closed her eyes when the alarm went off.', ru: 'Едва она закрыла глаза, как сработал будильник.' },
      { en: 'Not only is he a talented musician, but he also writes poetry.', ru: 'Он не только талантливый музыкант, но и пишет стихи.' },
      { en: 'It was the ending that disappointed me most.', ru: 'Больше всего меня разочаровал финал.' },
      { en: 'What really matters is your attitude.', ru: 'Действительно важно — твоё отношение.' },
      { en: 'Under no circumstances should you share your password.', ru: 'Ни при каких обстоятельствах не сообщайте пароль.' },
    ],
    comparison: [
      {
        title: 'Обычный порядок vs инверсия',
        points: [
          { aspect: 'Стиль', this: 'нейтральный', other: 'выразительный, книжный, торжественный' },
          { aspect: 'Пример', this: 'I have never seen it.', other: 'Never have I seen it.' },
          { aspect: 'Где встречается', this: 'разговор', other: 'письменная речь, речи, экзамены' },
        ],
      },
      {
        title: 'It-cleft vs What-cleft',
        points: [
          { aspect: 'Фокус', this: 'человек/вещь/обстоятельство', other: 'действие или «то, что»' },
          { aspect: 'Пример', this: 'It was Tom who won.', other: 'What he won was respect.' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'Never I have seen such a view.', right: 'Never have I seen such a view.', note: 'После never в начале — вспомогательный перед подлежащим.' },
      { wrong: 'Hardly I had arrived when it rained.', right: 'Hardly had I arrived when it started to rain.', note: 'Инверсия: had + подлежащее.' },
      { wrong: 'No sooner had she left when he called.', right: 'No sooner had she left than he called.', note: 'Пара — than (не when). У Hardly/Scarcely — when.' },
      { wrong: 'What I need it is rest.', right: 'What I need is rest.', note: 'Лишнее it после клаузы не нужно.' },
    ],
    quiz: [
      {
        question: '«Hardly ___ the station when the train left.»',
        options: ['I had reached', 'had I reached', 'I reached'],
        correct: 1,
        explanation: 'Hardly + had + подлежащее + V₃ … when …',
      },
      {
        question: 'Как выделить, что именно ЗВОНОК разбудил?',
        options: ['The call woke me up loudly.', 'It was the call that woke me up.', 'The call, it woke me up.'],
        correct: 1,
        explanation: 'It-cleft: It was … that …',
      },
      {
        question: 'Пара для «No sooner …»',
        options: ['when', 'then', 'than'],
        correct: 2,
        explanation: 'No sooner … than. Hardly/Scarcely … when.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Инверсия после отрицательного наречия',
      sentence: 'Seldom ___ such dedication in young employees.',
      options: ['I see', 'I have seen', 'do I see', 'I do see'],
      answer: 2,
      explanation: 'Seldom в начале → вспомогательный do перед подлежащим.',
      errorTag: 'word-order',
    },
    {
      type: 'choice',
      prompt: 'Выберите пару союзов',
      sentence: 'No sooner had we sat down ___ the meeting was interrupted.',
      options: ['when', 'than', 'then', 'as'],
      answer: 1,
      explanation: 'No sooner … than.',
      errorTag: 'word-order',
    },
    {
      type: 'gap',
      prompt: 'Поставьте инверсию',
      sentence: 'Not until the next day ___ I ___ (realise) my mistake.',
      answers: ['did I realise', 'did I realize'],
      explanation: 'Not until + время → вспомогательный did перед подлежащим, глагол в базовой форме.',
      errorTag: 'word-order',
    },
    {
      type: 'gap',
      prompt: 'Cleft sentence',
      sentence: 'It was the noise ___ kept me awake all night.',
      answers: ['that'],
      explanation: 'It was … that … — классическая расщеплённая конструкция.',
      errorTag: 'word-order',
    },
    {
      type: 'fix',
      prompt: 'Исправьте ошибку',
      wrong: 'Under no circumstances you should leave the building.',
      answers: ['Under no circumstances should you leave the building', 'Under no circumstances should you leave the building.'],
      explanation: 'После «under no circumstances» — инверсия: should you.',
      errorTag: 'word-order',
    },
    {
      type: 'translate',
      ru: 'Едва мы вышли из дома, как пошёл дождь.',
      answers: [
        'Hardly had we left the house when it started to rain',
        'No sooner had we left the house than it started to rain',
        'Scarcely had we left the house when it started to rain',
      ],
      explanation: 'Hardly had + подл. + V₃ … when … / No sooner … than …',
      errorTag: 'word-order',
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Никогда я не был так счастлив. (начните с Never)',
      answers: ['Never have I been so happy', 'Never have I felt so happy'],
      explanation: 'Never + have + подлежащее + V₃.',
    },
    {
      kind: 'ru2en',
      prompt: 'Именно цена меня удивила. (It was …)',
      answers: ['It was the price that surprised me', 'It was the price that surprised me.'],
      explanation: 'It was + фокус + that …',
    },
    {
      kind: 'en2ru',
      prompt: 'What surprised us most was the total silence.',
      answers: ['больше всего нас удивила полная тишина', 'то, что удивило нас больше всего — полная тишина'],
      keywordsRu: ['удив', 'тишин'],
      explanation: 'What-cleft: What … was … — «то, что…».',
    },
    {
      kind: 'speak',
      prompt: 'Вслух перескажите 2–3 факта о себе с инверсией или cleft (30–60 сек)',
      answers: [],
      keywords: ['never', 'it was', 'what'],
      hint: 'Never have I been to Japan. / What I love most is coffee in the morning. / It was my teacher who inspired me.',
      explanation: 'Используйте хотя бы одну инверсию и одну cleft-конструкцию.',
    },
  ],
};

export const subjunctiveWish: GrammarTopic = {
  id: 'subjunctive-wish',
  title: 'Subjunctive, wish и гипотетическая речь',
  level: 'C2',
  passScore: 0.8,
  theory: {
    explanation: [
      'Сослагательное наклонение (subjunctive) после глаголов требования и рекомендации (suggest, insist, recommend, demand, propose, essential/important that) ставит глагол в базовую форму без -s и без do: «I suggest that he see a doctor» — не sees, не should see (хотя британцы добавляют should).',
      'wish/if only + Past Simple — сожаление о настоящем: «I wish I lived near the sea». wish + Past Perfect — сожаление о прошлом: «If only I had listened». wish + would — раздражение о привычке другого человека: «I wish he would stop interrupting» (о себе would нельзя!).',
      'It’s (high) time + Past Simple — «давно пора»: «It’s high time we left». Виртуальность: глагол прошедший, смысл о будущем. As if/As though + Past — «как будто» о нереальном: «He talks as if he knew everything».',
      'Would rather + Past Simple о другом человеке: «I’d rather you didn’t smoke here». Формальная альтернатива условным: «Were it not for…», «But for your help…» — «если бы не…».',
    ],
    formulas: {
      positive: [
        'suggest/insist + (that) + подл. + V₁ (без -s) → They insisted that he resign.',
        'wish/if only + Past Simple → I wish it were Friday. (were для всех лиц!)',
        'wish + Past Perfect → If only I had known earlier.',
        "It's high time + подл. + Past → It's high time we went.",
        'as if/though + Past Simple/Perfect → She behaves as if nothing had happened.',
      ],
      negative: [
        'wish + would + not → I wish it wouldn’t rain tomorrow.',
        "I'd rather + подл. + didn't + V → I'd rather you didn't tell anyone.",
      ],
      question: [
        'Do you wish + Past …? → Do you wish you had taken the offer?',
        'Would you rather + V₁ / подл. + Past → Would you rather I stayed?',
      ],
    },
    examples: [
      { en: 'The doctor recommended that he take a week off.', ru: 'Врач рекомендовал, чтобы он взял неделю отдыха.' },
      { en: 'It is essential that every applicant submit the form.', ru: 'Необходимо, чтобы каждый кандидат подал форму.' },
      { en: 'I wish I were taller.', ru: 'Жаль, что я не выше (о настоящем).' },
      { en: 'If only I had saved more money.', ru: 'Если бы только я откладывал больше денег (о прошлом).' },
      { en: 'I wish the neighbours would stop making noise.', ru: 'Хотелось бы, чтобы соседи перестали шуметь (раздражение).' },
      { en: "It's high time you got a proper job.", ru: 'Тебе давно пора найти нормальную работу.' },
      { en: 'He talks as if he owned the place.', ru: 'Он говорит так, будто это всё его.' },
      { en: 'But for your warning, we would have been robbed.', ru: 'Если бы не ваше предупреждение, нас бы ограбили.' },
    ],
    comparison: [
      {
        title: 'wish + время',
        points: [
          { aspect: 'О настоящем', this: 'wish + Past Simple (I wish I had a car)', other: '' },
          { aspect: 'О прошлом', this: 'wish + Past Perfect (I wish I had gone)', other: '' },
          { aspect: 'Чужая привычка', this: 'wish + would (I wish you would listen)', other: '' },
        ],
      },
      {
        title: 'Subjunctive vs обычная форма',
        points: [
          { aspect: '3 лицо', this: 'that he go (без -s)', other: 'he goes' },
          { aspect: 'Стиль', this: 'формальный амер.; в Британии часто + should', other: 'обычная речь' },
        ],
      },
    ],
    mistakes: [
      { wrong: 'I suggest that he goes home.', right: 'I suggest that he go home.', note: 'Subjunctive: базовая форма, без -s.' },
      { wrong: 'I wish I would have more time.', right: 'I wish I had more time.', note: 'О себе — wish + Past; would только о чужих действиях.' },
      { wrong: 'If only I knew it yesterday.', right: 'If only I had known it yesterday.', note: 'О прошлом — Past Perfect.' },
      { wrong: "It's high time you will leave.", right: "It's high time you left.", note: 'После it’s high time — Past Simple.' },
    ],
    quiz: [
      {
        question: '«The boss insisted that the report ___ by Friday.»',
        options: ['is finished', 'be finished', 'was finished'],
        correct: 1,
        explanation: 'Subjunctive: be finished (пассив тоже в базовой форме).',
      },
      {
        question: '«I wish ___ harder at school.» (сожаление о прошлом)',
        options: ['I studied', 'I had studied', 'I would study'],
        correct: 1,
        explanation: 'Прошлое сожаление → Past Perfect.',
      },
      {
        question: '«I wish the dog ___ barking!» — соседский пёс надоел',
        options: ['stopped', 'would stop', 'stop'],
        correct: 1,
        explanation: 'Чужое раздражающее действие → would.',
      },
    ],
  },
  exercises: [
    {
      type: 'choice',
      prompt: 'Subjunctive',
      sentence: 'It is vital that every participant ___ present.',
      options: ['is', 'be', 'was', 'were'],
      answer: 1,
      explanation: 'После it is vital that — базовая форма: be.',
      errorTag: 'verb-form',
    },
    {
      type: 'choice',
      prompt: 'wish',
      sentence: 'I wish I ___ that email yesterday. It was a mistake.',
      options: ["didn't send", "hadn't sent", "wouldn't send", "don't send"],
      answer: 1,
      explanation: 'Сожаление о прошлом действии → Past Perfect.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      prompt: 'It’s high time',
      sentence: "It's high time the government ___ (do) something about prices.",
      answers: ['did'],
      explanation: 'It’s high time + Past Simple: did.',
      errorTag: 'tense',
    },
    {
      type: 'gap',
      prompt: 'as if',
      sentence: 'She treats me as if I ___ (be) a child.',
      answers: ['were'],
      explanation: 'As if + were (нереально — я не ребёнок).',
      errorTag: 'verb-form',
    },
    {
      type: 'fix',
      prompt: 'Исправьте ошибку',
      wrong: 'I wish it will stop raining.',
      answers: ['I wish it would stop raining', 'I wish it would stop raining.'],
      explanation: 'Желание об изменении — would, не will.',
      errorTag: 'verb-form',
    },
    {
      type: 'translate',
      ru: 'Жаль, что я раньше не начал учить английский.',
      answers: ['I wish I had started learning English earlier', 'If only I had started learning English earlier', 'I wish I had started English earlier'],
      explanation: 'Сожаление о прошлом → wish + Past Perfect.',
      errorTag: 'tense',
    },
  ],
  translation: [
    {
      kind: 'ru2en',
      prompt: 'Важно, чтобы все пришли вовремя. (It is important that…)',
      answers: ['It is important that everyone be on time', 'It is important that everyone arrive on time', 'It is important that everyone arrives on time'],
      explanation: 'Subjunctive: базовая форма (be/arrive); с -s тоже приемлемо в британском варианте.',
    },
    {
      kind: 'ru2en',
      prompt: 'Хотелось бы, чтобы ты перестал опаздывать.',
      answers: ['I wish you would stop being late', 'I wish you would stop coming late'],
      explanation: 'Раздражение о привычке другого → wish + would.',
    },
    {
      kind: 'en2ru',
      prompt: "I'd rather we didn't discuss it at dinner.",
      answers: ['я бы предпочёл, чтобы мы не обсуждали это за ужином', 'лучше бы нам не обсуждать это за ужином'],
      keywordsRu: ['ужин', 'обсужд'],
      explanation: 'Would rather + подлежащее + Past — вежливая просьба к другому.',
    },
    {
      kind: 'speak',
      prompt: 'Вслух: три «wish» о настоящем, прошлом и чужой привычке (30–60 сек)',
      answers: [],
      keywords: ['wish', 'had', 'would'],
      hint: 'I wish I lived closer to work. / I wish I had travelled more. / I wish my phone would stop ringing.',
      explanation: 'Три разных времени wish: Past Simple, Past Perfect, would.',
    },
  ],
};
