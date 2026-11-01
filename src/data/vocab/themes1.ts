import type { VocabTheme } from '../../types';

export const everyday: VocabTheme = {
  id: 'everyday-life',
  title: 'Повседневная жизнь',
  description: 'Дом, распорядок, базовые действия',
  level: 'A1',
  words: [
    {
      id: 'w-routine', en: 'routine', ru: 'распорядок, рутина', pos: 'noun',
      transcription: '/ruːˈtiːn/', plural: 'routines',
      example: 'My morning routine starts at seven.', exampleRu: 'Мой утренний распорядок начинается в семь.',
      collocations: ['daily routine', 'morning routine', 'follow a routine'],
    },
    {
      id: 'w-chores', en: 'chores', ru: 'домашние дела', pos: 'noun',
      transcription: '/tʃɔːz/', plural: 'chores',
      example: 'I do my chores on Saturday.', exampleRu: 'Я занимаюсь домашними делами в субботу.',
      collocations: ['do chores', 'household chores'],
    },
    {
      id: 'w-groceries', en: 'groceries', ru: 'продукты (покупки)', pos: 'noun',
      transcription: '/ˈɡrəʊsəriz/', plural: 'groceries',
      example: 'I buy groceries twice a week.', exampleRu: 'Я покупаю продукты дважды в неделю.',
      collocations: ['buy groceries', 'grocery shopping'],
    },
    {
      id: 'w-commute', en: 'to commute', ru: 'ездить на работу и обратно', pos: 'verb',
      transcription: '/kəˈmjuːt/', forms: ['commute', 'commuted', 'commuted'],
      example: 'I commute to work by bus.', exampleRu: 'Я езжу на работу на автобусе.',
      collocations: ['commute to work', 'a long commute'],
    },
    {
      id: 'w-convenient', en: 'convenient', ru: 'удобный', pos: 'adj',
      transcription: '/kənˈviːniənt/',
      example: 'The bus stop near my house is very convenient.', exampleRu: 'Остановка возле дома — очень удобно.',
      collocations: ['convenient for', 'convenient location'],
    },
    {
      id: 'w-neighbourhood', en: 'neighbourhood', ru: 'район, окрестность', pos: 'noun',
      transcription: '/ˈneɪbəhʊd/', plural: 'neighbourhoods',
      example: 'Our neighbourhood is quiet and safe.', exampleRu: 'Наш район тихий и безопасный.',
      collocations: ['quiet neighbourhood', 'in the neighbourhood'],
    },
    {
      id: 'w-appointment', en: 'appointment', ru: 'запись, назначенная встреча', pos: 'noun',
      transcription: '/əˈpɔɪntmənt/', plural: 'appointments',
      example: 'I have a doctor\'s appointment at three.', exampleRu: 'У меня запись к врачу на три часа.',
      collocations: ['make an appointment', 'cancel an appointment', "doctor's appointment"],
    },
    {
      id: 'w-errand', en: 'errand', ru: 'поручение, дело (по мелочи)', pos: 'noun',
      transcription: '/ˈerənd/', plural: 'errands',
      example: 'I need to run some errands after work.', exampleRu: 'Мне нужно сделать пару дел после работы.',
      collocations: ['run errands', 'do errands'],
    },
    {
      id: 'w-tidy', en: 'to tidy (up)', ru: 'убирать(ся), приводить в порядок', pos: 'verb',
      transcription: '/ˈtaɪdi/', forms: ['tidy', 'tidied', 'tidied'],
      example: 'I tidy up the flat every evening.', exampleRu: 'Я убираю квартиру каждый вечер.',
      collocations: ['tidy up the room', 'keep tidy'],
    },
    {
      id: 'w-comfortable', en: 'comfortable', ru: 'удобный, комфортный', pos: 'adj',
      transcription: '/ˈkʌmftəbl/',
      example: 'This sofa is very comfortable.', exampleRu: 'Этот диван очень удобный.',
      collocations: ['comfortable chair', 'feel comfortable'],
      alt: [{ ru: 'спокойный, непринуждённый', example: 'I feel comfortable with my colleagues.', exampleRu: 'Мне спокойно с коллегами.' }],
    },
  ],
};

export const work: VocabTheme = {
  id: 'work-career',
  title: 'Работа и карьера',
  description: 'Офис, собеседования, обязанности',
  level: 'A2',
  words: [
    {
      id: 'w-colleague', en: 'colleague', ru: 'коллега', pos: 'noun',
      transcription: '/ˈkɒliːɡ/', plural: 'colleagues',
      example: 'My colleagues are very friendly.', exampleRu: 'Мои коллеги очень дружелюбные.',
      collocations: ['work with colleagues', 'close colleague'],
    },
    {
      id: 'w-deadline', en: 'deadline', ru: 'крайний срок, дедлайн', pos: 'noun',
      transcription: '/ˈdedlaɪn/', plural: 'deadlines',
      example: 'We have to finish the project before the deadline.', exampleRu: 'Нам нужно закончить проект до дедлайна.',
      collocations: ['meet a deadline', 'miss a deadline', 'tight deadline'],
    },
    {
      id: 'w-responsible', en: 'responsible for', ru: 'ответственный за', pos: 'adj',
      transcription: '/rɪˈspɒnsəbl/',
      example: 'I am responsible for the sales team.', exampleRu: 'Я отвечаю за команду продаж.',
      collocations: ['responsible for', 'responsible person'],
    },
    {
      id: 'w-salary', en: 'salary', ru: 'зарплата (оклад)', pos: 'noun',
      transcription: '/ˈsæləri/', plural: 'salaries',
      example: 'The salary is paid at the end of the month.', exampleRu: 'Зарплату платят в конце месяца.',
      collocations: ['high salary', 'monthly salary'],
    },
    {
      id: 'w-interview', en: 'interview', ru: 'собеседование', pos: 'noun',
      transcription: '/ˈɪntəvjuː/', plural: 'interviews',
      example: 'I have a job interview on Friday.', exampleRu: 'У меня собеседование в пятницу.',
      collocations: ['job interview', 'go for an interview', 'pass an interview'],
    },
    {
      id: 'w-resign', en: 'to resign', ru: 'уволиться (по своему желанию)', pos: 'verb',
      transcription: '/rɪˈzaɪn/', forms: ['resign', 'resigned', 'resigned'],
      example: 'She resigned from her job last month.', exampleRu: 'Она уволилась с работы в прошлом месяце.',
      collocations: ['resign from', 'hand in your resignation'],
    },
    {
      id: 'w-meeting', en: 'meeting', ru: 'встреча, совещание', pos: 'noun',
      transcription: '/ˈmiːtɪŋ/', plural: 'meetings',
      example: 'We have a team meeting at ten.', exampleRu: 'У нас совещание команды в десять.',
      collocations: ['have a meeting', 'attend a meeting', 'cancel a meeting'],
    },
    {
      id: 'w-experience', en: 'experience', ru: 'опыт', pos: 'noun',
      transcription: '/ɪkˈspɪəriəns/',
      example: 'I have five years of experience in sales.', exampleRu: 'У меня пять лет опыта в продажах.',
      collocations: ['work experience', 'gain experience'],
      alt: [{ ru: 'впечатление, переживание', example: 'It was a great experience.', exampleRu: 'Это был отличный опыт/впечатление.' }],
    },
    {
      id: 'w-promotion', en: 'promotion', ru: 'повышение (в должности)', pos: 'noun',
      transcription: '/prəˈməʊʃn/', plural: 'promotions',
      example: 'He got a promotion after two years.', exampleRu: 'Он получил повышение через два года.',
      collocations: ['get a promotion', 'apply for a promotion'],
    },
    {
      id: 'w-part-time', en: 'part-time / full-time', ru: 'неполный / полный рабочий день', pos: 'adv',
      example: 'She works part-time while studying.', exampleRu: 'Она работает неполный день, пока учится.',
      collocations: ['part-time job', 'full-time position'],
    },
  ],
};

export const family: VocabTheme = {
  id: 'family-relationships',
  title: 'Семья и отношения',
  description: 'Родственники, характер, отношения',
  level: 'A2',
  words: [
    {
      id: 'w-relatives', en: 'relatives', ru: 'родственники', pos: 'noun',
      transcription: '/ˈrelətɪvz/', plural: 'relatives',
      example: 'We visit our relatives at Christmas.', exampleRu: 'Мы навещаем родственников на Рождество.',
      collocations: ['close relatives', 'distant relatives'],
    },
    {
      id: 'w-marriage', en: 'marriage', ru: 'брак, супружество', pos: 'noun',
      transcription: '/ˈmærɪdʒ/', plural: 'marriages',
      example: 'They have a happy marriage.', exampleRu: 'У них счастливый брак.',
      collocations: ['happy marriage', 'marriage proposal'],
    },
    {
      id: 'w-support', en: 'to support', ru: 'поддерживать', pos: 'verb',
      transcription: '/səˈpɔːt/', forms: ['support', 'supported', 'supported'],
      example: 'My family always supports me.', exampleRu: 'Моя семья всегда меня поддерживает.',
      collocations: ['support a family', 'emotional support'],
    },
    {
      id: 'w-argue', en: 'to argue', ru: 'спорить, ссориться', pos: 'verb',
      transcription: '/ˈɑːɡjuː/', forms: ['argue', 'argued', 'argued'],
      example: 'They argue about money sometimes.', exampleRu: 'Они иногда ссорятся из-за денег.',
      collocations: ['argue about', 'argue with'],
    },
    {
      id: 'w-close', en: 'close (friend)', ru: 'близкий', pos: 'adj',
      transcription: '/kləʊs/',
      example: 'She is my closest friend.', exampleRu: 'Она моя самая близкая подруга.',
      collocations: ['close friend', 'close family'],
      alt: [{ ru: 'закрывать (глагол)', example: 'Close the door, please.', exampleRu: 'Закрой дверь, пожалуйста.' }],
    },
    {
      id: 'w-trust', en: 'to trust', ru: 'доверять', pos: 'verb',
      transcription: '/trʌst/', forms: ['trust', 'trusted', 'trusted'],
      example: 'I trust my best friend completely.', exampleRu: 'Я полностью доверяю лучшему другу.',
      collocations: ['trust someone', 'mutual trust'],
    },
    {
      id: 'w-proud', en: 'proud of', ru: 'гордый (кем-то/чем-то)', pos: 'adj',
      transcription: '/praʊd/',
      example: 'I am proud of my children.', exampleRu: 'Я горжусь своими детьми.',
      collocations: ['proud of', 'very proud'],
    },
    {
      id: 'w-bring-up', en: 'to bring up', ru: 'воспитывать (детей)', pos: 'phrasal',
      transcription: '/brɪŋ ʌp/', forms: ['bring up', 'brought up', 'brought up'],
      example: 'She brought up three children alone.', exampleRu: 'Она одна воспитала троих детей.',
      collocations: ['bring up children', 'well-brought-up'],
    },
    {
      id: 'w-reliable', en: 'reliable', ru: 'надёжный', pos: 'adj',
      transcription: '/rɪˈlaɪəbl/',
      example: 'He is a very reliable person.', exampleRu: 'Он очень надёжный человек.',
      collocations: ['reliable person', 'reliable friend'],
    },
    {
      id: 'w-honest', en: 'honest', ru: 'честный', pos: 'adj',
      transcription: '/ˈɒnɪst/',
      example: 'Be honest with me.', exampleRu: 'Будь со мной честен.',
      collocations: ['honest person', 'to be honest'],
    },
  ],
};

export const shopping: VocabTheme = {
  id: 'shopping',
  title: 'Магазины и покупки',
  description: 'Покупки, цены, возвраты',
  level: 'A2',
  words: [
    {
      id: 'w-receipt', en: 'receipt', ru: 'чек', pos: 'noun',
      transcription: '/rɪˈsiːt/', plural: 'receipts',
      example: 'Keep the receipt in case you return it.', exampleRu: 'Сохрани чек на случай возврата.',
      collocations: ['keep the receipt', 'show the receipt'],
    },
    {
      id: 'w-refund', en: 'refund', ru: 'возврат денег', pos: 'noun',
      transcription: '/ˈriːfʌnd/', plural: 'refunds',
      example: 'I asked for a refund for the broken phone.', exampleRu: 'Я попросил вернуть деньги за сломанный телефон.',
      collocations: ['ask for a refund', 'get a refund', 'full refund'],
    },
    {
      id: 'w-discount', en: 'discount', ru: 'скидка', pos: 'noun',
      transcription: '/ˈdɪskaʊnt/', plural: 'discounts',
      example: 'They offer a 20% discount for students.', exampleRu: 'Они дают скидку 20% студентам.',
      collocations: ['get a discount', 'student discount'],
    },
    {
      id: 'w-size', en: 'size', ru: 'размер', pos: 'noun',
      transcription: '/saɪz/', plural: 'sizes',
      example: 'What size do you wear?', exampleRu: 'Какой размер вы носите?',
      collocations: ['clothes size', 'try a different size'],
    },
    {
      id: 'w-fit', en: 'to fit', ru: 'подходить по размеру', pos: 'verb',
      transcription: '/fɪt/', forms: ['fit', 'fitted', 'fitted'],
      example: 'These jeans don\'t fit me.', exampleRu: 'Эти джинсы мне не подходят.',
      collocations: ['fit well', "doesn't fit"],
      alt: [{ ru: 'подходить, влезать', example: 'The sofa won\'t fit through the door.', exampleRu: 'Диван не пройдёт в дверь.' }],
    },
    {
      id: 'w-bargain', en: 'bargain', ru: 'выгодная покупка', pos: 'noun',
      transcription: '/ˈbɑːɡɪn/', plural: 'bargains',
      example: 'This coat was a real bargain.', exampleRu: 'Это пальто было выгодной покупкой.',
      collocations: ['a real bargain', 'good bargain'],
    },
    {
      id: 'w-change', en: 'change', ru: 'сдача', pos: 'noun',
      transcription: '/tʃeɪndʒ/',
      example: 'Here is your change — five euros.', exampleRu: 'Ваша сдача — пять евро.',
      collocations: ['keep the change', 'small change'],
      alt: [{ ru: 'изменение', example: 'A lot of change this year.', exampleRu: 'Много перемен в этом году.' }],
    },
    {
      id: 'w-sold-out', en: 'sold out', ru: 'распродано', pos: 'phrase',
      example: 'The tickets are sold out.', exampleRu: 'Билеты распроданы.',
      collocations: ['completely sold out', 'be sold out'],
    },
    {
      id: 'w-queue', en: 'queue', ru: 'очередь', pos: 'noun',
      transcription: '/kjuː/', plural: 'queues',
      example: 'There was a long queue at the checkout.', exampleRu: 'У кассы была длинная очередь.',
      collocations: ['stand in a queue', 'long queue'],
    },
    {
      id: 'w-try-on', en: 'to try on', ru: 'примерять', pos: 'phrasal',
      forms: ['try on', 'tried on', 'tried on'],
      example: 'Can I try on this jacket?', exampleRu: 'Можно мне примерить эту куртку?',
      collocations: ['try on clothes', 'try it on'],
    },
  ],
};
