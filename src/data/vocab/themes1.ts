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
      collocations: [
        { en: 'daily routine', ru: 'ежедневный распорядок' },
        { en: 'morning routine', ru: 'утренний распорядок' },
        { en: 'follow a routine', ru: 'придерживаться распорядка' },
      ],
    },
    {
      id: 'w-chores', en: 'chores', ru: 'домашние дела', pos: 'noun',
      transcription: '/tʃɔːz/', plural: 'chores',
      example: 'I do my chores on Saturday.', exampleRu: 'Я занимаюсь домашними делами в субботу.',
      collocations: [
        { en: 'do chores', ru: 'делать домашние дела' },
        { en: 'household chores', ru: 'домашняя работа' },
      ],
    },
    {
      id: 'w-groceries', en: 'groceries', ru: 'продукты (покупки)', pos: 'noun',
      transcription: '/ˈɡrəʊsəriz/', plural: 'groceries',
      example: 'I buy groceries twice a week.', exampleRu: 'Я покупаю продукты дважды в неделю.',
      collocations: [
        { en: 'buy groceries', ru: 'покупать продукты' },
        { en: 'grocery shopping', ru: 'покупка продуктов' },
      ],
    },
    {
      id: 'w-commute', en: 'to commute', ru: 'ездить на работу и обратно', pos: 'verb',
      transcription: '/kəˈmjuːt/', forms: ['commute', 'commuted', 'commuted'],
      example: 'I commute to work by bus.', exampleRu: 'Я езжу на работу на автобусе.',
      collocations: [
        { en: 'commute to work', ru: 'ездить на работу' },
        { en: 'a long commute', ru: 'долгая дорога на работу' },
      ],
    },
    {
      id: 'w-convenient', en: 'convenient', ru: 'удобный', pos: 'adj',
      transcription: '/kənˈviːniənt/',
      example: 'The bus stop near my house is very convenient.', exampleRu: 'Остановка возле дома — очень удобно.',
      collocations: [
        { en: 'convenient for', ru: 'удобный для' },
        { en: 'convenient location', ru: 'удобное расположение' },
      ],
    },
    {
      id: 'w-neighbourhood', en: 'neighbourhood', ru: 'район, окрестность', pos: 'noun',
      transcription: '/ˈneɪbəhʊd/', plural: 'neighbourhoods',
      example: 'Our neighbourhood is quiet and safe.', exampleRu: 'Наш район тихий и безопасный.',
      collocations: [
        { en: 'quiet neighbourhood', ru: 'тихий район' },
        { en: 'in the neighbourhood', ru: 'по соседству, в районе' },
      ],
    },
    {
      id: 'w-appointment', en: 'appointment', ru: 'запись, назначенная встреча', pos: 'noun',
      transcription: '/əˈpɔɪntmənt/', plural: 'appointments',
      example: 'I have a doctor\'s appointment at three.', exampleRu: 'У меня запись к врачу на три часа.',
      collocations: [
        { en: 'make an appointment', ru: 'записаться на приём' },
        { en: 'cancel an appointment', ru: 'отменить запись' },
        { en: "doctor's appointment", ru: 'приём у врача' },
      ],
    },
    {
      id: 'w-errand', en: 'errand', ru: 'поручение, дело (по мелочи)', pos: 'noun',
      transcription: '/ˈerənd/', plural: 'errands',
      example: 'I need to run some errands after work.', exampleRu: 'Мне нужно сделать пару дел после работы.',
      collocations: [
        { en: 'run errands', ru: 'делать дела, бегать по делам' },
        { en: 'do errands', ru: 'выполнять поручения' },
      ],
    },
    {
      id: 'w-tidy', en: 'to tidy (up)', ru: 'убирать(ся), приводить в порядок', pos: 'verb',
      transcription: '/ˈtaɪdi/', forms: ['tidy', 'tidied', 'tidied'],
      example: 'I tidy up the flat every evening.', exampleRu: 'Я убираю квартиру каждый вечер.',
      collocations: [
        { en: 'tidy up the room', ru: 'убрать комнату' },
        { en: 'keep tidy', ru: 'держать в порядке' },
      ],
    },
    {
      id: 'w-comfortable', en: 'comfortable', ru: 'удобный, комфортный', pos: 'adj',
      transcription: '/ˈkʌmftəbl/',
      example: 'This sofa is very comfortable.', exampleRu: 'Этот диван очень удобный.',
      collocations: [
        { en: 'comfortable chair', ru: 'удобное кресло' },
        { en: 'feel comfortable', ru: 'чувствовать себя комфортно' },
      ],
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
      collocations: [
        { en: 'work with colleagues', ru: 'работать с коллегами' },
        { en: 'close colleague', ru: 'близкий коллега' },
      ],
    },
    {
      id: 'w-deadline', en: 'deadline', ru: 'крайний срок, дедлайн', pos: 'noun',
      transcription: '/ˈdedlaɪn/', plural: 'deadlines',
      example: 'We have to finish the project before the deadline.', exampleRu: 'Нам нужно закончить проект до дедлайна.',
      collocations: [
        { en: 'meet a deadline', ru: 'уложиться в срок' },
        { en: 'miss a deadline', ru: 'сорвать срок' },
        { en: 'tight deadline', ru: 'жёсткий дедлайн' },
      ],
    },
    {
      id: 'w-responsible', en: 'responsible for', ru: 'ответственный за', pos: 'adj',
      transcription: '/rɪˈspɒnsəbl/',
      example: 'I am responsible for the sales team.', exampleRu: 'Я отвечаю за команду продаж.',
      collocations: [
        { en: 'responsible for', ru: 'ответственный за' },
        { en: 'responsible person', ru: 'ответственный человек' },
      ],
    },
    {
      id: 'w-salary', en: 'salary', ru: 'зарплата (оклад)', pos: 'noun',
      transcription: '/ˈsæləri/', plural: 'salaries',
      example: 'The salary is paid at the end of the month.', exampleRu: 'Зарплату платят в конце месяца.',
      collocations: [
        { en: 'high salary', ru: 'высокая зарплата' },
        { en: 'monthly salary', ru: 'месячная зарплата' },
      ],
    },
    {
      id: 'w-interview', en: 'interview', ru: 'собеседование', pos: 'noun',
      transcription: '/ˈɪntəvjuː/', plural: 'interviews',
      example: 'I have a job interview on Friday.', exampleRu: 'У меня собеседование в пятницу.',
      collocations: [
        { en: 'job interview', ru: 'собеседование' },
        { en: 'go for an interview', ru: 'идти на собеседование' },
        { en: 'pass an interview', ru: 'пройти собеседование' },
      ],
    },
    {
      id: 'w-resign', en: 'to resign', ru: 'уволиться (по своему желанию)', pos: 'verb',
      transcription: '/rɪˈzaɪn/', forms: ['resign', 'resigned', 'resigned'],
      example: 'She resigned from her job last month.', exampleRu: 'Она уволилась с работы в прошлом месяце.',
      collocations: [
        { en: 'resign from', ru: 'уволиться из' },
        { en: 'hand in your resignation', ru: 'подать заявление об увольнении' },
      ],
    },
    {
      id: 'w-meeting', en: 'meeting', ru: 'встреча, совещание', pos: 'noun',
      transcription: '/ˈmiːtɪŋ/', plural: 'meetings',
      example: 'We have a team meeting at ten.', exampleRu: 'У нас совещание команды в десять.',
      collocations: [
        { en: 'have a meeting', ru: 'проводить встречу' },
        { en: 'attend a meeting', ru: 'присутствовать на встрече' },
        { en: 'cancel a meeting', ru: 'отменить встречу' },
      ],
    },
    {
      id: 'w-experience', en: 'experience', ru: 'опыт', pos: 'noun',
      transcription: '/ɪkˈspɪəriəns/',
      example: 'I have five years of experience in sales.', exampleRu: 'У меня пять лет опыта в продажах.',
      collocations: [
        { en: 'work experience', ru: 'опыт работы' },
        { en: 'gain experience', ru: 'набраться опыта' },
      ],
      alt: [{ ru: 'впечатление, переживание', example: 'It was a great experience.', exampleRu: 'Это был отличный опыт/впечатление.' }],
    },
    {
      id: 'w-promotion', en: 'promotion', ru: 'повышение (в должности)', pos: 'noun',
      transcription: '/prəˈməʊʃn/', plural: 'promotions',
      example: 'He got a promotion after two years.', exampleRu: 'Он получил повышение через два года.',
      collocations: [
        { en: 'get a promotion', ru: 'получить повышение' },
        { en: 'apply for a promotion', ru: 'претендовать на повышение' },
      ],
    },
    {
      id: 'w-part-time', en: 'part-time / full-time', ru: 'неполный / полный рабочий день', pos: 'adv',
      example: 'She works part-time while studying.', exampleRu: 'Она работает неполный день, пока учится.',
      collocations: [
        { en: 'part-time job', ru: 'работа на неполный день' },
        { en: 'full-time position', ru: 'должность на полный день' },
      ],
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
      collocations: [
        { en: 'close relatives', ru: 'близкие родственники' },
        { en: 'distant relatives', ru: 'дальние родственники' },
      ],
    },
    {
      id: 'w-marriage', en: 'marriage', ru: 'брак, супружество', pos: 'noun',
      transcription: '/ˈmærɪdʒ/', plural: 'marriages',
      example: 'They have a happy marriage.', exampleRu: 'У них счастливый брак.',
      collocations: [
        { en: 'happy marriage', ru: 'счастливый брак' },
        { en: 'marriage proposal', ru: 'предложение руки и сердца' },
      ],
    },
    {
      id: 'w-support', en: 'to support', ru: 'поддерживать', pos: 'verb',
      transcription: '/səˈpɔːt/', forms: ['support', 'supported', 'supported'],
      example: 'My family always supports me.', exampleRu: 'Моя семья всегда меня поддерживает.',
      collocations: [
        { en: 'support a family', ru: 'содержать семью' },
        { en: 'emotional support', ru: 'эмоциональная поддержка' },
      ],
    },
    {
      id: 'w-argue', en: 'to argue', ru: 'спорить, ссориться', pos: 'verb',
      transcription: '/ˈɑːɡjuː/', forms: ['argue', 'argued', 'argued'],
      example: 'They argue about money sometimes.', exampleRu: 'Они иногда ссорятся из-за денег.',
      collocations: [
        { en: 'argue about', ru: 'спорить о' },
        { en: 'argue with', ru: 'спорить с' },
      ],
    },
    {
      id: 'w-close', en: 'close (friend)', ru: 'близкий', pos: 'adj',
      transcription: '/kləʊs/',
      example: 'She is my closest friend.', exampleRu: 'Она моя самая близкая подруга.',
      collocations: [
        { en: 'close friend', ru: 'близкий друг' },
        { en: 'close family', ru: 'близкие родственники' },
      ],
      alt: [{ ru: 'закрывать (глагол)', example: 'Close the door, please.', exampleRu: 'Закрой дверь, пожалуйста.' }],
    },
    {
      id: 'w-trust', en: 'to trust', ru: 'доверять', pos: 'verb',
      transcription: '/trʌst/', forms: ['trust', 'trusted', 'trusted'],
      example: 'I trust my best friend completely.', exampleRu: 'Я полностью доверяю лучшему другу.',
      collocations: [
        { en: 'trust someone', ru: 'доверять кому-то' },
        { en: 'mutual trust', ru: 'взаимное доверие' },
      ],
    },
    {
      id: 'w-proud', en: 'proud of', ru: 'гордый (кем-то/чем-то)', pos: 'adj',
      transcription: '/praʊd/',
      example: 'I am proud of my children.', exampleRu: 'Я горжусь своими детьми.',
      collocations: [
        { en: 'proud of', ru: 'гордый чем-то/кем-то' },
        { en: 'very proud', ru: 'очень гордый' },
      ],
    },
    {
      id: 'w-bring-up', en: 'to bring up', ru: 'воспитывать (детей)', pos: 'phrasal',
      transcription: '/brɪŋ ʌp/', forms: ['bring up', 'brought up', 'brought up'],
      example: 'She brought up three children alone.', exampleRu: 'Она одна воспитала троих детей.',
      collocations: [
        { en: 'bring up children', ru: 'воспитывать детей' },
        { en: 'well-brought-up', ru: 'хорошо воспитанный' },
      ],
    },
    {
      id: 'w-reliable', en: 'reliable', ru: 'надёжный', pos: 'adj',
      transcription: '/rɪˈlaɪəbl/',
      example: 'He is a very reliable person.', exampleRu: 'Он очень надёжный человек.',
      collocations: [
        { en: 'reliable person', ru: 'надёжный человек' },
        { en: 'reliable friend', ru: 'надёжный друг' },
      ],
    },
    {
      id: 'w-honest', en: 'honest', ru: 'честный', pos: 'adj',
      transcription: '/ˈɒnɪst/',
      example: 'Be honest with me.', exampleRu: 'Будь со мной честен.',
      collocations: [
        { en: 'honest person', ru: 'честный человек' },
        { en: 'to be honest', ru: 'честно говоря' },
      ],
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
      collocations: [
        { en: 'keep the receipt', ru: 'сохранить чек' },
        { en: 'show the receipt', ru: 'показать чек' },
      ],
    },
    {
      id: 'w-refund', en: 'refund', ru: 'возврат денег', pos: 'noun',
      transcription: '/ˈriːfʌnd/', plural: 'refunds',
      example: 'I asked for a refund for the broken phone.', exampleRu: 'Я попросил вернуть деньги за сломанный телефон.',
      collocations: [
        { en: 'ask for a refund', ru: 'просить возврат денег' },
        { en: 'get a refund', ru: 'получить возврат' },
        { en: 'full refund', ru: 'полный возврат' },
      ],
    },
    {
      id: 'w-discount', en: 'discount', ru: 'скидка', pos: 'noun',
      transcription: '/ˈdɪskaʊnt/', plural: 'discounts',
      example: 'They offer a 20% discount for students.', exampleRu: 'Они дают скидку 20% студентам.',
      collocations: [
        { en: 'get a discount', ru: 'получить скидку' },
        { en: 'student discount', ru: 'студенческая скидка' },
      ],
    },
    {
      id: 'w-size', en: 'size', ru: 'размер', pos: 'noun',
      transcription: '/saɪz/', plural: 'sizes',
      example: 'What size do you wear?', exampleRu: 'Какой размер вы носите?',
      collocations: [
        { en: 'clothes size', ru: 'размер одежды' },
        { en: 'try a different size', ru: 'примерить другой размер' },
      ],
    },
    {
      id: 'w-fit', en: 'to fit', ru: 'подходить по размеру', pos: 'verb',
      transcription: '/fɪt/', forms: ['fit', 'fitted', 'fitted'],
      example: 'These jeans don\'t fit me.', exampleRu: 'Эти джинсы мне не подходят.',
      collocations: [
        { en: 'fit well', ru: 'хорошо сидит' },
        { en: "doesn't fit", ru: 'не подходит' },
      ],
      alt: [{ ru: 'подходить, влезать', example: 'The sofa won\'t fit through the door.', exampleRu: 'Диван не пройдёт в дверь.' }],
    },
    {
      id: 'w-bargain', en: 'bargain', ru: 'выгодная покупка', pos: 'noun',
      transcription: '/ˈbɑːɡɪn/', plural: 'bargains',
      example: 'This coat was a real bargain.', exampleRu: 'Это пальто было выгодной покупкой.',
      collocations: [
        { en: 'a real bargain', ru: 'настоящая находка' },
        { en: 'good bargain', ru: 'выгодная покупка' },
      ],
    },
    {
      id: 'w-change', en: 'change', ru: 'сдача', pos: 'noun',
      transcription: '/tʃeɪndʒ/',
      example: 'Here is your change — five euros.', exampleRu: 'Ваша сдача — пять евро.',
      collocations: [
        { en: 'keep the change', ru: 'оставьте сдачу себе' },
        { en: 'small change', ru: 'мелочь' },
      ],
      alt: [{ ru: 'изменение', example: 'A lot of change this year.', exampleRu: 'Много перемен в этом году.' }],
    },
    {
      id: 'w-sold-out', en: 'sold out', ru: 'распродано', pos: 'phrase',
      example: 'The tickets are sold out.', exampleRu: 'Билеты распроданы.',
      collocations: [
        { en: 'completely sold out', ru: 'полностью распродано' },
        { en: 'be sold out', ru: 'быть распроданным' },
      ],
    },
    {
      id: 'w-queue', en: 'queue', ru: 'очередь', pos: 'noun',
      transcription: '/kjuː/', plural: 'queues',
      example: 'There was a long queue at the checkout.', exampleRu: 'У кассы была длинная очередь.',
      collocations: [
        { en: 'stand in a queue', ru: 'стоять в очереди' },
        { en: 'long queue', ru: 'длинная очередь' },
      ],
    },
    {
      id: 'w-try-on', en: 'to try on', ru: 'примерять', pos: 'phrasal',
      forms: ['try on', 'tried on', 'tried on'],
      example: 'Can I try on this jacket?', exampleRu: 'Можно мне примерить эту куртку?',
      collocations: [
        { en: 'try on clothes', ru: 'примерять одежду' },
        { en: 'try it on', ru: 'примерить это' },
      ],
    },
  ],
};
