import type { SentencePack } from '../../types';

// ===== Пакеты «Построение предложений» =====
// Каждый пакет развивает одну и ту же мысль по уровням:
// 1. Основа → 2. Детали → 3. Соединение → 4. Зависимые части → 5. Продвинутая речь.

export const STEP_LEVELS = ['Основа', 'Детали', 'Соединение', 'Зависимые части', 'Продвинутая речь'] as const;

const weather: SentencePack = {
  id: 'weather',
  title: 'Погода и планы',
  level: 'A1',
  skills: ['Безличное it is', 'Обстоятельства места и времени', 'Союз but', 'Придаточные с although', 'Present Perfect в клаузе'],
  grammarTopicIds: ['present-simple', 'present-continuous', 'present-perfect'],
  steps: [
    {
      en: 'It is cold.',
      ru: 'Холодно.',
      chunks: [
        { text: 'It', role: 'subject', ru: 'безличное «it»' },
        { text: 'is', role: 'predicate' },
        { text: 'cold', role: 'complement' },
      ],
      accepts: ["It's cold"],
      grammarNote: 'База: подлежащее + сказуемое + именная часть. О погоде говорят безличным «it is» — без «it» предложения нет.',
    },
    {
      en: 'It is quite cold outside today.',
      ru: 'Сегодня на улице довольно холодно.',
      chunks: [
        { text: 'It', role: 'subject' },
        { text: 'is', role: 'predicate' },
        { text: 'quite cold', role: 'complement', ru: 'довольно холодно' },
        { text: 'outside', role: 'adverbial', ru: 'на улице' },
        { text: 'today', role: 'adverbial', ru: 'сегодня' },
      ],
      accepts: ["It's quite cold outside today", 'Today it is quite cold outside', 'It is quite cold today outside'],
      grammarNote: 'Уровень «Детали»: наречие quite усиливает признак, outside и today — обстоятельства места и времени, их ставят в конец.',
      diffNote: 'Та же основа + детали: усилитель quite и два обстоятельства. Смысл точнее, структура не усложнилась.',
    },
    {
      en: 'It is cold, but the sun is shining.',
      ru: 'Холодно, но светит солнце.',
      chunks: [
        { text: 'It is cold,', role: 'clause' },
        { text: 'but', role: 'connector' },
        { text: 'the sun', role: 'subject' },
        { text: 'is shining', role: 'predicate', ru: 'светит (Present Continuous)' },
      ],
      accepts: ["It's cold, but the sun is shining", 'It is cold but the sun is shining'],
      grammarNote: 'Уровень «Соединение»: две мысли связывает союз but (противопоставление). Перед but ставится запятая.',
      diffNote: 'Одна мысль → две с противопоставлением. Предложение стало сложносочинённым, длина удвоилась.',
    },
    {
      en: 'Although it is cold, we are going out.',
      ru: 'Хотя холодно, мы идём гулять.',
      chunks: [
        { text: 'Although it is cold,', role: 'clause', ru: 'хотя холодно' },
        { text: 'we', role: 'subject' },
        { text: 'are going out', role: 'predicate', ru: 'идём гулять' },
      ],
      accepts: [
        "Although it's cold, we are going out",
        'We are going out although it is cold',
        'We are going out, although it is cold',
      ],
      grammarNote: 'Уровень «Зависимые части»: придаточное с although стоит в начале (тогда нужна запятая) или в конце. Although и but вместе не употребляются!',
      diffNote: 'Противопоставление теперь выражено придаточной частью — конструкция сложнее и звучит богаче.',
    },
    {
      en: 'Although the weather has been unusually cold this week, we are hoping for some sunshine at the weekend.',
      ru: 'Хотя погода на этой неделе непривычно холодная, мы надеемся на солнце в выходные.',
      chunks: [
        { text: 'Although the weather has been unusually cold this week,', role: 'clause' },
        { text: 'we', role: 'subject' },
        { text: 'are hoping for some sunshine', role: 'predicate', ru: 'надеемся на солнце' },
        { text: 'at the weekend', role: 'adverbial' },
      ],
      accepts: [
        'We are hoping for some sunshine at the weekend although the weather has been unusually cold this week',
        'Although the weather has been unusually cold this week we are hoping for some sunshine at the weekend',
      ],
      grammarNote: 'Продвинутая речь: в придаточной — Present Perfect (has been), в главной — фразовый hope for и обстоятельство at the weekend.',
      diffNote: 'Та же логика although, но лексика богаче: unusually, has been, hoping for. Стиль развёрнутый и естественный.',
    },
  ],
  compose: {
    prompt: 'Составьте своё предложение по модели: «Хотя + обстоятельство, мы/я + действие» — о погоде, усталости, планах.',
    mustContain: ['although'],
    samples: ['Although it is raining, we are going for a walk', 'Although I am tired, I will finish my work today'],
  },
  remedial: [
    {
      tag: 'word-order',
      title: 'Обстоятельства — в конец предложения',
      items: [
        { ru: 'Обычно я встаю рано.', answers: ['I usually wake up early'] },
        { ru: 'Вчера было очень холодно.', answers: ['It was very cold yesterday', 'Yesterday it was very cold'] },
        { ru: 'Она ездит на работу на автобусе.', answers: ['She goes to work by bus'] },
      ],
    },
    {
      tag: 'tense',
      title: 'Время в описании погоды',
      items: [
        { ru: 'Сейчас светит солнце.', answers: ['The sun is shining now', 'Now the sun is shining'] },
        { ru: 'Вчера шёл дождь.', answers: ['It rained yesterday', 'Yesterday it rained'] },
        { ru: 'На этой неделе было холодно.', answers: ['It has been cold this week', 'The weather has been cold this week'] },
      ],
    },
  ],
};

const morning: SentencePack = {
  id: 'morning',
  title: 'Утро и режим дня',
  level: 'A2',
  skills: ['Наречия частоты (usually)', 'Соединение действий через and', 'Придаточные с when', 'Причастный оборот'],
  grammarTopicIds: ['present-simple', 'prepositions-time-place'],
  steps: [
    {
      en: 'I wake up.',
      ru: 'Я просыпаюсь.',
      chunks: [
        { text: 'I', role: 'subject' },
        { text: 'wake up', role: 'predicate', ru: 'фразовый глагол' },
      ],
      grammarNote: 'Основа: подлежащее + фразовый глагол wake up. Частица up — часть глагола, не отдельное слово.',
    },
    {
      en: 'I usually wake up early.',
      ru: 'Я обычно просыпаюсь рано.',
      chunks: [
        { text: 'I', role: 'subject' },
        { text: 'usually', role: 'modifier', ru: 'обычно' },
        { text: 'wake up', role: 'predicate' },
        { text: 'early', role: 'adverbial' },
      ],
      accepts: ['Usually I wake up early', 'I usually get up early'],
      grammarNote: 'Наречия частоты (usually, often, always) стоят ПЕРЕД основным глаголом: I usually wake up.',
      diffNote: 'Добавились частота (usually) и деталь (early). Внимание к позиции usually — перед глаголом.',
    },
    {
      en: 'I wake up early and go for a run.',
      ru: 'Я рано просыпаюсь и иду на пробежку.',
      chunks: [
        { text: 'I', role: 'subject' },
        { text: 'wake up', role: 'predicate' },
        { text: 'early', role: 'adverbial' },
        { text: 'and', role: 'connector' },
        { text: 'go for a run', role: 'predicate', ru: 'иду на пробежку' },
      ],
      accepts: ['I wake up early and I go for a run', 'I wake up early, and go for a run'],
      grammarNote: 'Два действия одного подлежащего соединяются and — подлежащее второй раз повторять не нужно.',
      diffNote: 'Появилось второе действие через and. Подлежащее общее — предложение осталось простым, но длиннее.',
    },
    {
      en: 'When I wake up early, I go for a run in the park.',
      ru: 'Когда я просыпаюсь рано, я иду бегать в парк.',
      chunks: [
        { text: 'When I wake up early,', role: 'clause' },
        { text: 'I', role: 'subject' },
        { text: 'go for a run', role: 'predicate' },
        { text: 'in the park', role: 'adverbial' },
      ],
      accepts: ['I go for a run in the park when I wake up early', 'When I wake up early I go for a run in the park'],
      grammarNote: 'Придаточное времени с when: в нём — Present Simple, даже если смысл про привычное будущее.',
      diffNote: 'And превратился в придаточное с when — действия связаны явным «когда». Добавилось место: in the park.',
    },
    {
      en: 'Waking up before sunrise, I make myself a cup of coffee and plan the day ahead.',
      ru: 'Просыпаясь до рассвета, я готовлю себе кофе и планирую день.',
      chunks: [
        { text: 'Waking up before sunrise,', role: 'clause', ru: 'просыпаясь до рассвета' },
        { text: 'I', role: 'subject' },
        { text: 'make myself a cup of coffee', role: 'predicate' },
        { text: 'and plan the day ahead', role: 'predicate' },
      ],
      grammarNote: 'Причастный оборот (waking up…) — «взрослый» способ показать «когда» внутри одного предложения.',
      diffNote: 'When-придаточное сжато до причастного оборота — короче, плотнее, стилистически сильнее.',
    },
  ],
  compose: {
    prompt: 'Своё предложение по модели: «Когда я + утреннее действие, я + следующее действие» или причастный оборот.',
    mustContain: ['when|waking|getting'],
    samples: ['When I get up early, I have time for breakfast', 'Waking up at seven, I check my messages and drink tea'],
  },
  remedial: [
    {
      tag: 'word-order',
      title: 'Позиция наречий частоты',
      items: [
        { ru: 'Я всегда пью кофе утром.', answers: ['I always drink coffee in the morning'] },
        { ru: 'Она часто бегает вечером.', answers: ['She often runs in the evening', 'She often goes running in the evening'] },
        { ru: 'Мы никогда не опаздываем.', answers: ['We are never late', 'We never come late'] },
      ],
    },
    {
      tag: 'third-person-s',
      title: 'Окончание -s в 3-м лице',
      items: [
        { ru: 'Он просыпается поздно.', answers: ['He wakes up late'] },
        { ru: 'Она обычно планирует день.', answers: ['She usually plans her day', 'She usually plans the day'] },
        { ru: 'Мой брат идёт на пробежку утром.', answers: ['My brother goes for a run in the morning'] },
      ],
    },
  ],
};

const work: SentencePack = {
  id: 'work',
  title: 'Работа и офис',
  level: 'A2',
  skills: ['3-е лицо -s', 'Обстоятельство места', 'so и because', 'Perfect participle (having worked)'],
  grammarTopicIds: ['present-simple', 'present-perfect'],
  steps: [
    {
      en: 'She works.',
      ru: 'Она работает.',
      chunks: [
        { text: 'She', role: 'subject' },
        { text: 'works', role: 'predicate' },
      ],
      grammarNote: 'Не забудьте -s в 3-м лице ед. числа: she works.',
    },
    {
      en: 'She works in a big office.',
      ru: 'Она работает в большом офисе.',
      chunks: [
        { text: 'She', role: 'subject' },
        { text: 'works', role: 'predicate' },
        { text: 'in a big office', role: 'adverbial', ru: 'в большом офисе' },
      ],
      accepts: ['She works in a large office'],
      grammarNote: 'Обстоятельство места — после сказуемого: works in a big office.',
      diffNote: 'Добавилось место работы — предложение информативнее, порядок тот же.',
    },
    {
      en: 'She works in a big office, so she often gets home late.',
      ru: 'Она работает в большом офисе, поэтому часто возвращается домой поздно.',
      chunks: [
        { text: 'She works in a big office,', role: 'clause' },
        { text: 'so', role: 'connector', ru: 'поэтому' },
        { text: 'she', role: 'subject' },
        { text: 'often gets home late', role: 'predicate' },
      ],
      accepts: ['She works in a big office so she often gets home late'],
      grammarNote: 'So выражает следствие («поэтому») и соединяет два самостоятельных предложения.',
      diffNote: 'Появилось следствие через so: работа в офисе → позднее возвращение домой.',
    },
    {
      en: 'Because she works in a big office, she often stays late.',
      ru: 'Поскольку она работает в большом офисе, она часто задерживается.',
      chunks: [
        { text: 'Because she works in a big office,', role: 'clause' },
        { text: 'she', role: 'subject' },
        { text: 'often stays late', role: 'predicate', ru: 'часто задерживается' },
      ],
      accepts: ['She often stays late because she works in a big office'],
      grammarNote: 'Because выводит причину. Если придаточное в начале — после него запятая. Because и so вместе не ставятся.',
      diffNote: 'Следствие (so) заменено причиной (because) — акцент сместился на объяснение.',
    },
    {
      en: 'Having worked at the same company for ten years, she knows almost everyone in the building.',
      ru: 'Проработав в одной компании десять лет, она знает почти всех в здании.',
      chunks: [
        { text: 'Having worked at the same company for ten years,', role: 'clause' },
        { text: 'she', role: 'subject' },
        { text: 'knows', role: 'predicate' },
        { text: 'almost everyone', role: 'object' },
        { text: 'in the building', role: 'adverbial' },
      ],
      grammarNote: 'Perfect participle (having worked) показывает действие, завершившееся к моменту основного — замена длинному because-придаточному.',
      diffNote: 'Причина сжата в perfect participle — конструкция уровня B2+, типичная для письменной речи.',
    },
  ],
  compose: {
    prompt: 'Своё предложение по модели: «Потому что / проработав + обстоятельство, человек + следствие».',
    mustContain: ['because|having'],
    samples: ['Because he works from home, he saves time on commuting', 'Having worked abroad for five years, he speaks three languages'],
  },
  remedial: [
    {
      tag: 'third-person-s',
      title: 'Глагол в 3-м лице',
      items: [
        { ru: 'Он работает в банке.', answers: ['He works in a bank', 'He works at a bank'] },
        { ru: 'Она часто остаётся допоздна.', answers: ['She often stays late'] },
        { ru: 'Он знает всех коллег.', answers: ['He knows all his colleagues', 'He knows everyone'] },
      ],
    },
    {
      tag: 'aux-do',
      title: 'Do / does в отрицаниях и вопросах',
      items: [
        { ru: 'Она не работает по пятницам.', answers: ["She doesn't work on Fridays", 'She does not work on Fridays'] },
        { ru: 'Он работает в офисе?', answers: ['Does he work in an office?', 'Does he work in the office?'] },
      ],
    },
  ],
};

const travel: SentencePack = {
  id: 'travel',
  title: 'Путешествие',
  level: 'B1',
  skills: ['Past Simple', 'because', 'while + Past Continuous', 'Perfect participle', 'Придаточное why'],
  grammarTopicIds: ['past-simple', 'present-perfect'],
  steps: [
    {
      en: 'We travelled.',
      ru: 'Мы путешествовали.',
      chunks: [
        { text: 'We', role: 'subject' },
        { text: 'travelled', role: 'predicate' },
      ],
      accepts: ['We traveled'],
      grammarNote: 'Основа в прошедшем времени: travelled (брит.) / traveled (амер.).',
    },
    {
      en: 'We travelled to Spain last summer.',
      ru: 'Мы ездили в Испанию прошлым летом.',
      chunks: [
        { text: 'We', role: 'subject' },
        { text: 'travelled', role: 'predicate' },
        { text: 'to Spain', role: 'adverbial' },
        { text: 'last summer', role: 'adverbial', ru: 'прошлым летом' },
      ],
      accepts: ['We traveled to Spain last summer', 'Last summer we travelled to Spain'],
      grammarNote: 'Направление (to Spain) идёт сразу после глагола движения, время — в конец.',
      diffNote: 'Добавлены направление и время. Порядок: куда → когда.',
    },
    {
      en: 'We travelled to Spain because we wanted to see the sea.',
      ru: 'Мы поехали в Испанию, потому что хотели увидеть море.',
      chunks: [
        { text: 'We', role: 'subject' },
        { text: 'travelled to Spain', role: 'predicate' },
        { text: 'because', role: 'connector' },
        { text: 'we wanted to see the sea', role: 'clause', ru: 'хотели увидеть море' },
      ],
      accepts: ['We traveled to Spain because we wanted to see the sea', 'We travelled to Spain, because we wanted to see the sea'],
      grammarNote: 'Because-придаточное в конце предложения идёт без запятой.',
      diffNote: 'Добавлена причина — появилась мотивация, а не просто факт.',
    },
    {
      en: 'While we were travelling around Spain, we visited many small towns.',
      ru: 'Пока мы путешествовали по Испании, мы посетили много маленьких городов.',
      chunks: [
        { text: 'While we were travelling around Spain,', role: 'clause', ru: 'пока путешествовали' },
        { text: 'we', role: 'subject' },
        { text: 'visited', role: 'predicate' },
        { text: 'many small towns', role: 'object' },
      ],
      accepts: [
        'We visited many small towns while we were travelling around Spain',
        'While we were traveling around Spain we visited many small towns',
      ],
      grammarNote: 'While + Past Continuous — длительный фон, Past Simple — событие на этом фоне.',
      diffNote: 'Появился фон действия (while + Continuous): одно событие происходит на фоне другого.',
    },
    {
      en: 'Having spent two weeks travelling around Spain, we finally understood why people fall in love with it.',
      ru: 'Проведя две недели в путешествии по Испании, мы наконец поняли, почему в неё влюбляются.',
      chunks: [
        { text: 'Having spent two weeks travelling around Spain,', role: 'clause' },
        { text: 'we', role: 'subject' },
        { text: 'finally understood', role: 'predicate' },
        { text: 'why people fall in love with it', role: 'clause', ru: 'придаточное-дополнение' },
      ],
      grammarNote: 'Два уровня вложенности: perfect participle снаружи + придаточное why внутри — типичная сложная структура B1+.',
      diffNote: 'Фон превратился в завершённое действие (having spent), а результат — в косвенный вопрос why.',
    },
  ],
  compose: {
    prompt: 'Своё предложение по модели: «Пока/после того как мы + путешествие, мы + действие/вывод».',
    mustContain: ['while|having|because'],
    samples: ['While we were travelling in Italy, we tried a lot of local food', 'Having spent a week in the mountains, we felt completely relaxed'],
  },
  remedial: [
    {
      tag: 'tense',
      title: 'Past Simple и Past Continuous',
      items: [
        { ru: 'Когда мы приехали, шёл дождь.', answers: ['When we arrived, it was raining', 'It was raining when we arrived'] },
        { ru: 'Прошлым летом мы ездили в Италию.', answers: ['Last summer we travelled to Italy', 'We travelled to Italy last summer', 'We went to Italy last summer'] },
        { ru: 'Пока я гулял, я сделал много фото.', answers: ['While I was walking, I took many photos', 'I took many photos while I was walking'] },
      ],
    },
    {
      tag: 'preposition',
      title: 'Предлоги движения и места',
      items: [
        { ru: 'Мы поехали в горы.', answers: ['We went to the mountains', 'We travelled to the mountains'] },
        { ru: 'Они прилетели в Испанию вчера.', answers: ['They arrived in Spain yesterday', 'They flew to Spain yesterday'] },
      ],
    },
  ],
};

const house: SentencePack = {
  id: 'house',
  title: 'Дом и квартира',
  level: 'A2',
  skills: ['Прилагательные', 'Соединение через and', 'Относительные that', 'Participle clause'],
  grammarTopicIds: ['articles', 'past-simple'],
  steps: [
    {
      en: 'The house is big.',
      ru: 'Дом большой.',
      chunks: [
        { text: 'The house', role: 'subject' },
        { text: 'is', role: 'predicate' },
        { text: 'big', role: 'complement' },
      ],
      grammarNote: 'Именная часть после to be: is big. Артикль the — дом конкретный.',
    },
    {
      en: 'The new house is very big and bright.',
      ru: 'Новый дом очень большой и светлый.',
      chunks: [
        { text: 'The new house', role: 'subject', ru: 'новый дом' },
        { text: 'is', role: 'predicate' },
        { text: 'very big and bright', role: 'complement' },
      ],
      grammarNote: 'Определение (new) — перед существительным, признаки после is можно соединять and.',
      diffNote: 'Признак удвоился (big and bright) и появилось определение new перед существительным.',
    },
    {
      en: 'The house is big and it has a small garden.',
      ru: 'Дом большой, и у него есть небольшой сад.',
      chunks: [
        { text: 'The house is big', role: 'clause' },
        { text: 'and', role: 'connector' },
        { text: 'it has a small garden', role: 'clause', ru: 'у него есть сад' },
      ],
      accepts: ['The house is big, and it has a small garden'],
      grammarNote: '«У него есть сад» — literally it has a garden: конструкция have, а не «there is».',
      diffNote: 'Добавилась вторая часть с новым глаголом has — мысль про владение.',
    },
    {
      en: 'The house that we bought last year has a small garden.',
      ru: 'Дом, который мы купили в прошлом году, с небольшим садом.',
      chunks: [
        { text: 'The house', role: 'subject' },
        { text: 'that we bought last year', role: 'clause', ru: 'который купили' },
        { text: 'has', role: 'predicate' },
        { text: 'a small garden', role: 'object' },
      ],
      accepts: ['The house which we bought last year has a small garden', 'The house we bought last year has a small garden'],
      grammarNote: 'Относительное придаточное that we bought уточняет, о каком доме речь. That можно опустить.',
      diffNote: 'Определение выросло в целое придаточное — it-повтор исчез, структура компактнее.',
    },
    {
      en: 'Standing at the top of a hill, the house that we bought last year offers a wonderful view of the sea.',
      ru: 'Стоя на вершине холма, дом, который мы купили в прошлом году, открывает чудесный вид на море.',
      chunks: [
        { text: 'Standing at the top of a hill,', role: 'clause' },
        { text: 'the house', role: 'subject' },
        { text: 'that we bought last year', role: 'clause' },
        { text: 'offers', role: 'predicate', ru: 'открывает (вид)' },
        { text: 'a wonderful view of the sea', role: 'object' },
      ],
      grammarNote: 'Два «вкладыша» вокруг подлежащего: причастный оборот слева + относительное придаточное справа.',
      diffNote: 'Появился контекст местоположения (standing at the top) — предложение описательное, «кинематографичное».',
    },
  ],
  compose: {
    prompt: 'Своё предложение по модели: «Предмет + который/который мы + действие, + свойство/особенность».',
    mustContain: ['that|which'],
    samples: ['The flat that we rent has a nice balcony', 'The house which stands near the river is very old'],
  },
  remedial: [
    {
      tag: 'article',
      title: 'Артикли с домом и садом',
      items: [
        { ru: 'У дома есть сад.', answers: ['The house has a garden', 'The house has got a garden'] },
        { ru: 'Я купил новый дом.', answers: ['I bought a new house'] },
      ],
    },
    {
      tag: 'word-order',
      title: 'Определение перед существительным',
      items: [
        { ru: 'Это большой новый дом.', answers: ['It is a big new house', 'This is a big new house'] },
        { ru: 'Она живёт в маленькой квартире.', answers: ['She lives in a small flat', 'She lives in a small apartment'] },
      ],
    },
  ],
};

const film: SentencePack = {
  id: 'film',
  title: 'Фильм и впечатления',
  level: 'B1',
  skills: ['Отзыв и оценка', 'but / although', 'Бессоюзное придаточное', 'which-оборот', 'turn out'],
  grammarTopicIds: ['past-simple', 'present-perfect'],
  steps: [
    {
      en: 'I liked the film.',
      ru: 'Мне понравился фильм.',
      chunks: [
        { text: 'I', role: 'subject' },
        { text: 'liked', role: 'predicate' },
        { text: 'the film', role: 'object' },
      ],
      grammarNote: '«Мне понравился фильм» — наоборот: I liked the film, а не «the film liked me».',
    },
    {
      en: 'I really liked the film we saw yesterday.',
      ru: 'Мне очень понравился фильм, который мы вчера смотрели.',
      chunks: [
        { text: 'I', role: 'subject' },
        { text: 'really liked', role: 'predicate' },
        { text: 'the film', role: 'object' },
        { text: 'we saw yesterday', role: 'clause', ru: 'который смотрели вчера' },
      ],
      accepts: ['I really liked the film that we saw yesterday', 'I really liked the film which we saw yesterday'],
      grammarNote: 'Союз that/which можно опускать, когда он — дополнение придаточного: the film (that) we saw.',
      diffNote: 'Усилитель really + бессоюзное придаточное — короткий способ уточнить, о каком фильме речь.',
    },
    {
      en: 'I liked the film, but the ending was disappointing.',
      ru: 'Фильм понравился, но концовка разочаровала.',
      chunks: [
        { text: 'I liked the film,', role: 'clause' },
        { text: 'but', role: 'connector' },
        { text: 'the ending', role: 'subject' },
        { text: 'was disappointing', role: 'predicate' },
      ],
      accepts: ['I liked the film but the ending was disappointing'],
      grammarNote: 'But здесь субъективное «но» мнения — классический приём рецензии.',
      diffNote: 'Появилась оценка-контраст: хорошее впечатление vs слабая концовка.',
    },
    {
      en: 'Although I liked the film, the ending disappointed me.',
      ru: 'Хотя фильм понравился, концовка меня разочаровала.',
      chunks: [
        { text: 'Although I liked the film,', role: 'clause' },
        { text: 'the ending', role: 'subject' },
        { text: 'disappointed', role: 'predicate' },
        { text: 'me', role: 'object' },
      ],
      accepts: ['The ending disappointed me although I liked the film'],
      grammarNote: 'Disappoint — глагол-действие: the ending disappointed me (концовка разочаровала меня).',
      diffNote: 'Тот же контраст, но акцент смещён на разочарование — звучит эмоциональнее.',
    },
    {
      en: 'The film, which everyone had been talking about for weeks, turned out to be surprisingly boring.',
      ru: 'Фильм, о котором все говорили неделями, оказался на удивление скучным.',
      chunks: [
        { text: 'The film,', role: 'subject' },
        { text: 'which everyone had been talking about for weeks,', role: 'clause', ru: 'вставное уточнение' },
        { text: 'turned out to be', role: 'predicate', ru: 'оказался' },
        { text: 'surprisingly boring', role: 'complement' },
      ],
      accepts: ['The film which everyone had been talking about for weeks turned out to be surprisingly boring'],
      grammarNote: 'Вставное придаточное с which выделяется запятыми с двух сторон. Turn out to be — «оказалось, что».',
      diffNote: 'Максимальная сложность: вставное уточнение внутри подлежащего + идиоматичный оборот turn out.',
    },
  ],
  compose: {
    prompt: 'Своё предложение-рецензия: «Хотя мне понравилось X, Y меня разочаровало/удивило» или с turn out.',
    mustContain: ['although|but|turned out'],
    samples: ['Although I liked the actors, the plot disappointed me', 'The book, which I bought last week, turned out to be really good'],
  },
  remedial: [
    {
      tag: 'verb-form',
      title: 'Глаголы впечатлений: like, disappoint, turn out',
      items: [
        { ru: 'Фильм меня разочаровал.', answers: ['The film disappointed me'] },
        { ru: 'Книга оказалась интересной.', answers: ['The book turned out to be interesting', 'The book turned out interesting'] },
      ],
    },
    {
      tag: 'tense',
      title: 'Прошедшее время в отзывах',
      items: [
        { ru: 'Мы посмотрели фильм вчера.', answers: ['We watched the film yesterday', 'We saw the film yesterday'] },
        { ru: 'Все говорили об этом неделями.', answers: ['Everyone had been talking about it for weeks', 'Everybody was talking about it for weeks'] },
      ],
    },
  ],
};

export const SENTENCE_PACKS: SentencePack[] = [weather, morning, work, house, travel, film];

export const getPackById = (id: string): SentencePack | undefined =>
  SENTENCE_PACKS.find((p) => p.id === id);
