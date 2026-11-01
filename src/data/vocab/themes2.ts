import type { VocabTheme } from '../../types';

export const travel: VocabTheme = {
  id: 'travel-transport',
  title: 'Путешествия и транспорт',
  description: 'Аэропорт, отель, поездки',
  level: 'A2',
  words: [
    {
      id: 'w-luggage', en: 'luggage', ru: 'багаж (неисч.)', pos: 'noun',
      transcription: '/ˈlʌɡɪdʒ/',
      example: 'I checked in my luggage at the airport.', exampleRu: 'Я сдал багаж в аэропорту.',
      collocations: ['hand luggage', 'heavy luggage', 'lost luggage'],
    },
    {
      id: 'w-boarding-pass', en: 'boarding pass', ru: 'посадочный талон', pos: 'noun',
      plural: 'boarding passes',
      example: 'Show your boarding pass at the gate.', exampleRu: 'Покажите посадочный талон у выхода на посадку.',
      collocations: ['show a boarding pass', 'mobile boarding pass'],
    },
    {
      id: 'w-delayed', en: 'delayed', ru: 'задержан (о рейсе/поезде)', pos: 'adj',
      transcription: '/dɪˈleɪd/',
      example: 'Our flight was delayed by two hours.', exampleRu: 'Наш рейс задержали на два часа.',
      collocations: ['flight delayed', 'delayed by'],
    },
    {
      id: 'w-accommodation', en: 'accommodation', ru: 'жильё, размещение', pos: 'noun',
      transcription: '/əˌkɒməˈdeɪʃn/',
      example: 'We booked cheap accommodation near the beach.', exampleRu: 'Мы забронировали недорогое жильё у пляжа.',
      collocations: ['book accommodation', 'find accommodation'],
    },
    {
      id: 'w-return-ticket', en: 'return ticket', ru: 'билет туда и обратно', pos: 'noun',
      plural: 'return tickets',
      example: 'A return ticket is cheaper than two singles.', exampleRu: 'Билет туда-обратно дешевле двух в один конец.',
      collocations: ['buy a return ticket', 'return ticket to London'],
    },
    {
      id: 'w-platform', en: 'platform', ru: 'платформа', pos: 'noun',
      transcription: '/ˈplætfɔːm/', plural: 'platforms',
      example: 'The train leaves from platform three.', exampleRu: 'Поезд отправляется с третьей платформы.',
      collocations: ['depart from platform', 'next platform'],
    },
    {
      id: 'w-check-in', en: 'to check in / check out', ru: 'зарегистрироваться / выписаться', pos: 'phrasal',
      forms: ['check in', 'checked in', 'checked in'],
      example: 'We checked in at the hotel at two.', exampleRu: 'Мы зарегистрировались в отеле в два.',
      collocations: ['check in online', 'check out of the hotel'],
    },
    {
      id: 'w-currency', en: 'currency', ru: 'валюта', pos: 'noun',
      transcription: '/ˈkʌrənsi/', plural: 'currencies',
      example: 'What currency do they use in Japan?', exampleRu: 'Какая валюта в Японии?',
      collocations: ['foreign currency', 'local currency'],
    },
    {
      id: 'w-sightseeing', en: 'sightseeing', ru: 'осмотр достопримечательностей', pos: 'noun',
      transcription: '/ˈsaɪtsiːɪŋ/',
      example: 'We spent the day sightseeing in Rome.', exampleRu: 'Мы провели день, осматривая Рим.',
      collocations: ['go sightseeing', 'sightseeing tour'],
    },
    {
      id: 'w-get-lost', en: 'to get lost', ru: 'заблудиться', pos: 'phrase',
      example: 'I got lost in the old town.', exampleRu: 'Я заблудился в старом городе.',
      collocations: ['get lost in', 'completely lost'],
    },
  ],
};

export const health: VocabTheme = {
  id: 'health',
  title: 'Здоровье и самочувствие',
  description: 'Симптомы, врач, лекарства',
  level: 'A2',
  words: [
    {
      id: 'w-symptom', en: 'symptom', ru: 'симптом', pos: 'noun',
      transcription: '/ˈsɪmptəm/', plural: 'symptoms',
      example: 'What are your symptoms?', exampleRu: 'Какие у вас симптомы?',
      collocations: ['flu symptoms', 'main symptom'],
    },
    {
      id: 'w-sore-throat', en: 'sore throat', ru: 'больное горло', pos: 'noun',
      example: 'I have a sore throat and a fever.', exampleRu: 'У меня болит горло и температура.',
      collocations: ['have a sore throat', 'terrible sore throat'],
    },
    {
      id: 'w-fever', en: 'fever', ru: 'температура (повышенная)', pos: 'noun',
      transcription: '/ˈfiːvə/', plural: 'fevers',
      example: 'The child has a high fever.', exampleRu: 'У ребёнка высокая температура.',
      collocations: ['high fever', 'have a fever'],
    },
    {
      id: 'w-prescription', en: 'prescription', ru: 'рецепт (от врача)', pos: 'noun',
      transcription: '/prɪˈskrɪpʃn/', plural: 'prescriptions',
      example: 'The doctor gave me a prescription for antibiotics.', exampleRu: 'Врач выписал мне рецепт на антибиотики.',
      collocations: ['write a prescription', 'get a prescription'],
    },
    {
      id: 'w-headache', en: 'headache', ru: 'головная боль', pos: 'noun',
      transcription: '/ˈhedeɪk/', plural: 'headaches',
      example: 'I have a terrible headache.', exampleRu: 'У меня ужасно болит голова.',
      collocations: ['have a headache', 'bad headache'],
    },
    {
      id: 'w-recover', en: 'to recover', ru: 'выздоравливать', pos: 'verb',
      transcription: '/rɪˈkʌvə/', forms: ['recover', 'recovered', 'recovered'],
      example: 'She recovered quickly after the flu.', exampleRu: 'Она быстро поправилась после гриппа.',
      collocations: ['recover from', 'fully recovered'],
    },
    {
      id: 'w-allergy', en: 'allergy', ru: 'аллергия', pos: 'noun',
      transcription: '/ˈælədʒi/', plural: 'allergies',
      example: 'I have an allergy to cats.', exampleRu: 'У меня аллергия на кошек.',
      collocations: ['have an allergy', 'food allergy'],
    },
    {
      id: 'w-painkiller', en: 'painkiller', ru: 'обезболивающее', pos: 'noun',
      transcription: '/ˈpeɪnkɪlə/', plural: 'painkillers',
      example: 'I took a painkiller for my headache.', exampleRu: 'Я принял обезболивающее от головы.',
      collocations: ['take a painkiller', 'strong painkiller'],
    },
    {
      id: 'w-cough', en: 'cough', ru: 'кашель; кашлять', pos: 'noun',
      transcription: '/kɒf/', plural: 'coughs',
      example: 'I can\'t stop coughing.', exampleRu: 'Я не могу перестать кашлять.',
      collocations: ['bad cough', 'dry cough'],
    },
    {
      id: 'w-appointment-h', en: 'to make an appointment', ru: 'записаться на приём', pos: 'phrase',
      example: 'I need to make an appointment with my GP.', exampleRu: 'Мне нужно записаться к терапевту.',
      collocations: ['make an appointment', 'book an appointment'],
    },
  ],
};

export const phrasal: VocabTheme = {
  id: 'phrasal-verbs',
  title: 'Фразовые глаголы',
  description: 'Самые употребимые в разговоре',
  level: 'B1',
  words: [
    {
      id: 'pv-look-after', en: 'to look after', ru: 'присматривать за', pos: 'phrasal',
      forms: ['look after', 'looked after', 'looked after'],
      example: 'She looks after her little brother.', exampleRu: 'Она присматривает за младшим братом.',
      collocations: ['look after children', 'look after the house'],
    },
    {
      id: 'pv-find-out', en: 'to find out', ru: 'выяснить, узнать', pos: 'phrasal',
      forms: ['find out', 'found out', 'found out'],
      example: 'I found out the train was cancelled.', exampleRu: 'Я выяснил, что поезд отменили.',
      collocations: ['find out about', 'find out the truth'],
    },
    {
      id: 'pv-get-on', en: 'to get on (with)', ru: 'ладить с кем-то; садиться в транспорт', pos: 'phrasal',
      forms: ['get on', 'got on', 'got on'],
      example: 'I get on well with my colleagues.', exampleRu: 'Я хорошо лажу с коллегами.',
      collocations: ['get on well with', 'get on the bus'],
      alt: [{ ru: 'садиться (в транспорт)', example: 'I got on the wrong bus.', exampleRu: 'Я сел не на тот автобус.' }],
    },
    {
      id: 'pv-put-off', en: 'to put off', ru: 'откладывать', pos: 'phrasal',
      forms: ['put off', 'put off', 'put off'],
      example: 'I keep putting off my dentist appointment.', exampleRu: 'Я всё откладываю визит к стоматологу.',
      collocations: ['put off doing', 'put off until later'],
    },
    {
      id: 'pv-run-out', en: 'to run out of', ru: 'закончиться (о запасе)', pos: 'phrasal',
      forms: ['run out of', 'ran out of', 'run out of'],
      example: 'We ran out of milk.', exampleRu: 'У нас закончилось молоко.',
      collocations: ['run out of time', 'run out of money'],
    },
    {
      id: 'pv-look-forward', en: 'to look forward to', ru: 'ждать с нетерпением', pos: 'phrasal',
      forms: ['look forward to', 'looked forward to', 'looked forward to'],
      example: 'I look forward to the weekend.', exampleRu: 'Я с нетерпением жду выходных.',
      collocations: ['look forward to meeting', 'looking forward to it'],
    },
    {
      id: 'pv-give-up', en: 'to give up', ru: 'бросить, сдаться', pos: 'phrasal',
      forms: ['give up', 'gave up', 'given up'],
      example: 'He gave up smoking last year.', exampleRu: 'Он бросил курить в прошлом году.',
      collocations: ['give up smoking', "don't give up"],
    },
    {
      id: 'pv-turn-out', en: 'to turn out', ru: 'оказаться', pos: 'phrasal',
      forms: ['turn out', 'turned out', 'turned out'],
      example: 'The weather turned out to be fine.', exampleRu: 'Погода оказалась хорошей.',
      collocations: ['turn out well', 'turned out to be'],
    },
    {
      id: 'pv-pick-up', en: 'to pick up', ru: 'подобрать; заехать за', pos: 'phrasal',
      forms: ['pick up', 'picked up', 'picked up'],
      example: 'I\'ll pick you up at the station.', exampleRu: 'Я заеду за тобой на вокзал.',
      collocations: ['pick up the phone', 'pick up someone'],
      alt: [{ ru: 'подхватить, выучить на ходу', example: 'She picked up Spanish quickly.', exampleRu: 'Она быстро освоила испанский.' }],
    },
    {
      id: 'pv-come-across', en: 'to come across', ru: 'случайно натолкнуться', pos: 'phrasal',
      forms: ['come across', 'came across', 'come across'],
      example: 'I came across an old photo yesterday.', exampleRu: 'Вчера я наткнулся на старую фотографию.',
      collocations: ['come across something', 'came across a good article'],
    },
  ],
};

export const expressions: VocabTheme = {
  id: 'expressions',
  title: 'Устойчивые выражения и разговорные конструкции',
  description: 'Естественная речь, вежливость, реакции',
  level: 'B1',
  words: [
    {
      id: 'e-it-depends', en: 'It depends', ru: 'По-разному, зависит от ситуации', pos: 'phrase',
      example: '— Do you like your job? — It depends on the day!', exampleRu: '— Тебе нравится работа? — Смотря какой день!',
      collocations: ['it depends on', 'well, it depends'],
    },
    {
      id: 'e-never-mind', en: 'Never mind', ru: 'Неважно, не бери в голову', pos: 'phrase',
      example: 'Never mind, I\'ll do it myself.', exampleRu: 'Неважно, я сам сделаю.',
      collocations: ['oh, never mind', 'never mind about that'],
    },
    {
      id: 'e-i-mean', en: 'I mean', ru: 'Я имею в виду, то есть', pos: 'phrase',
      example: 'She\'s nice. I mean, really kind.', exampleRu: 'Она милая. То есть, очень добрая.',
      collocations: ['what do you mean', 'I mean it'],
    },
    {
      id: 'e-would-you-mind', en: 'Would you mind…?', ru: 'Вы не против…? / Не могли бы вы…?', pos: 'phrase',
      example: 'Would you mind opening the window?', exampleRu: 'Вы не могли бы открыть окно?',
      collocations: ['would you mind if', 'would you mind doing'],
    },
    {
      id: 'e-sounds-good', en: 'Sounds good', ru: 'Звучит неплохо, идёт', pos: 'phrase',
      example: '— Let\'s meet at seven. — Sounds good!', exampleRu: '— Давай встретимся в семь. — Договорились!',
      collocations: ['sounds good to me', 'sounds like a plan'],
    },
    {
      id: 'e-no-wonder', en: 'No wonder', ru: 'Неудивительно', pos: 'phrase',
      example: 'No wonder you\'re tired — you worked all night!', exampleRu: 'Неудивительно, что ты устал — ты работал всю ночь!',
      collocations: ['no wonder (that)', 'it\'s no wonder'],
    },
    {
      id: 'e-by-the-way', en: 'By the way', ru: 'Кстати', pos: 'phrase',
      example: 'By the way, did you call your mum?', exampleRu: 'Кстати, ты звонил маме?',
      collocations: ['by the way', 'oh, by the way'],
    },
    {
      id: 'e-i-cant-help', en: "I can't help it", ru: 'Я ничего не могу поделать', pos: 'phrase',
      example: "I'm sorry I'm late — I can't help it, the bus was cancelled.", exampleRu: 'Прости за опоздание — ничего не мог поделать, автобус отменили.',
      collocations: ["can't help it", "can't help doing"],
    },
    {
      id: 'e-no-problem', en: 'No problem / No worries', ru: 'Нет проблем, без проблем', pos: 'phrase',
      example: '— Thanks for your help! — No problem!', exampleRu: '— Спасибо за помощь! — Без проблем!',
      collocations: ['no problem at all', 'no worries'],
    },
    {
      id: 'e-it-makes-sense', en: 'It makes sense', ru: 'Это имеет смысл, логично', pos: 'phrase',
      example: 'It makes sense to leave early to avoid traffic.', exampleRu: 'Логично выехать пораньше, чтобы избежать пробок.',
      collocations: ['it makes sense to', "doesn't make sense"],
    },
  ],
};
