import type { VocabTheme } from '../../types';

// ===== Продвинутый словарь B2–C2 =====

export const academic: VocabTheme = {
  id: 'academic-abstract',
  title: 'Академическая и абстрактная лексика',
  description: 'Слова для эссе, новостей и серьёзных разговоров',
  level: 'B2',
  words: [
    { id: 'w-significant', en: 'significant', ru: 'значительный, существенный', pos: 'adj', example: 'There was a significant increase in prices.', exampleRu: 'Произошёл значительный рост цен.', collocations: [{ en: 'significant change', ru: 'существенное изменение' }, { en: 'statistically significant', ru: 'статистически значимый' }] },
    { id: 'w-controversial', en: 'controversial', ru: 'спорный, противоречивый', pos: 'adj', example: 'It is a highly controversial issue.', exampleRu: 'Это очень спорный вопрос.', collocations: [{ en: 'controversial decision', ru: 'спорное решение' }] },
    { id: 'w-facilitate', en: 'to facilitate', ru: 'облегчать, способствовать', pos: 'verb', example: 'The app facilitates communication between teams.', exampleRu: 'Приложение облегчает общение между командами.' },
    { id: 'w-imply', en: 'to imply', ru: 'подразумевать, намекать', pos: 'verb', example: 'Are you implying that I am wrong?', exampleRu: 'Вы намекаете, что я неправ?' },
    { id: 'w-acquire', en: 'to acquire', ru: 'приобретать, получать', pos: 'verb', example: 'She acquired the company in 2019.', exampleRu: 'Она приобрела компанию в 2019 году.', collocations: [{ en: 'acquire skills', ru: 'приобрести навыки' }, { en: 'newly acquired', ru: 'недавно приобретённый' }] },
    { id: 'w-perceive', en: 'to perceive', ru: 'воспринимать', pos: 'verb', example: 'He is perceived as a strong leader.', exampleRu: 'Его воспринимают как сильного лидера.' },
    { id: 'w-notion', en: 'notion', ru: 'понятие, представление', pos: 'noun', example: 'The notion of privacy has changed.', exampleRu: 'Понятие частной жизни изменилось.' },
    { id: 'w-crucial', en: 'crucial', ru: 'решающий, ключевой', pos: 'adj', example: 'Timing is crucial in this business.', exampleRu: 'В этом деле решающее значение имеет время.', collocations: [{ en: 'crucial role', ru: 'ключевая роль' }] },
    { id: 'w-substantial', en: 'substantial', ru: 'существенный, солидный', pos: 'adj', example: 'They made a substantial profit.', exampleRu: 'Они получили существенную прибыль.' },
    { id: 'w-assess', en: 'to assess', ru: 'оценивать, давать оценку', pos: 'verb', example: 'Experts assessed the damage.', exampleRu: 'Эксперты оценили ущерб.' },
    { id: 'w-assume', en: 'to assume', ru: 'предполагать', pos: 'verb', example: 'I assumed you knew about the meeting.', exampleRu: 'Я предполагал, что ты знаешь о собрании.', collocations: [{ en: 'it is safe to assume', ru: 'можно смело предположить' }] },
    { id: 'w-tend', en: 'to tend to', ru: 'иметь тенденцию', pos: 'verb', example: 'People tend to forget names.', exampleRu: 'Люди склонны забывать имена.' },
  ],
};

export const idioms: VocabTheme = {
  id: 'idioms-c1',
  title: 'Идиомы разговорной речи',
  description: 'Выражения, которые делают речь живой и носительной',
  level: 'C1',
  words: [
    { id: 'w-break-ice', en: 'to break the ice', ru: 'разрядить обстановку, растопить лёд', pos: 'phrase', example: 'He told a joke to break the ice.', exampleRu: 'Он рассказал шутку, чтобы разрядить обстановку.' },
    { id: 'w-nail-head', en: 'to hit the nail on the head', ru: 'попасть в самую точку', pos: 'phrase', example: 'You hit the nail on the head with that comment.', exampleRu: 'Этим замечанием ты попал в самую точку.' },
    { id: 'w-beat-bush', en: 'to beat around the bush', ru: 'ходить вокруг да около', pos: 'phrase', example: 'Stop beating around the bush and say it.', exampleRu: 'Хватит ходить вокруг да около — говори прямо.' },
    { id: 'w-blue-moon', en: 'once in a blue moon', ru: 'очень редко, раз в сто лет', pos: 'phrase', example: 'We eat out once in a blue moon.', exampleRu: 'Мы ходим в ресторан крайне редко.' },
    { id: 'w-arm-leg', en: 'to cost an arm and a leg', ru: 'стоить целое состояние', pos: 'phrase', example: 'The repair cost an arm and a leg.', exampleRu: 'Ремонт обошёлся в целое состояние.' },
    { id: 'w-cold-feet', en: 'to get cold feet', ru: 'струсить в последний момент', pos: 'phrase', example: 'He got cold feet before the wedding.', exampleRu: 'Он струсил перед свадьбой.' },
    { id: 'w-call-day', en: 'to call it a day', ru: 'закругляться на сегодня', pos: 'phrase', example: 'We have done enough — let’s call it a day.', exampleRu: 'Уже достаточно — закругляемся.' },
    { id: 'w-under-weather', en: 'under the weather', ru: 'нездоровится, не в форме', pos: 'phrase', example: 'I am a bit under the weather today.', exampleRu: 'Мне сегодня немного нездоровится.' },
    { id: 'w-spill-beans', en: 'to spill the beans', ru: 'проболтаться, выдать секрет', pos: 'phrase', example: 'Who spilled the beans about the party?', exampleRu: 'Кто проболтался про вечеринку?' },
    { id: 'w-ball-court', en: 'the ball is in your court', ru: 'ход за тобой, твой шаг', pos: 'phrase', example: 'I made my offer — the ball is in your court now.', exampleRu: 'Я сделал предложение — теперь ход за тобой.' },
    { id: 'w-stab-dark', en: 'a stab in the dark', ru: 'догадка наугад', pos: 'phrase', example: 'My answer was just a stab in the dark.', exampleRu: 'Мой ответ был просто догадкой наугад.' },
    { id: 'w-piece-cake', en: 'a piece of cake', ru: 'проще простого, раз плюнуть', pos: 'phrase', example: 'The exam was a piece of cake.', exampleRu: 'Экзамен был проще простого.' },
  ],
};

export const nuance: VocabTheme = {
  id: 'nuance-register',
  title: 'Тонкости и регистры речи',
  description: 'Слова уровня C2: точные оттенки и изысканная лексика',
  level: 'C2',
  words: [
    { id: 'w-ubiquitous', en: 'ubiquitous', ru: 'вездесущий, повсеместный', pos: 'adj', example: 'Smartphones have become ubiquitous.', exampleRu: 'Смартфоны стали повсеместными.' },
    { id: 'w-meticulous', en: 'meticulous', ru: 'дотошный, скрупулёзный', pos: 'adj', example: 'She keeps meticulous records.', exampleRu: 'Она ведёт скрупулёзные записи.', collocations: [{ en: 'meticulous attention to detail', ru: 'скрупулёзное внимание к деталям' }] },
    { id: 'w-quintessential', en: 'quintessential', ru: 'типичнейший, самый сущностный', pos: 'adj', example: 'It is the quintessential English village.', exampleRu: 'Это типичнейшая английская деревня.' },
    { id: 'w-ephemeral', en: 'ephemeral', ru: 'мимолётный, недолговечный', pos: 'adj', example: 'Fame on social media is ephemeral.', exampleRu: 'Слава в соцсетях мимолётна.' },
    { id: 'w-paradigm', en: 'paradigm', ru: 'парадигма, модель', pos: 'noun', example: 'The internet created a new paradigm of communication.', exampleRu: 'Интернет создал новую парадигму общения.', collocations: [{ en: 'paradigm shift', ru: 'смена парадигмы' }] },
    { id: 'w-nuance', en: 'nuance', ru: 'нюанс, тонкость', pos: 'noun', example: 'She understands every nuance of the language.', exampleRu: 'Она понимает каждый нюанс языка.' },
    { id: 'w-articulate-adj', en: 'articulate', ru: 'красноречивый, чётко выражающий', pos: 'adj', example: 'He is an articulate speaker.', exampleRu: 'Он красноречивый оратор.' },
    { id: 'w-pragmatic', en: 'pragmatic', ru: 'прагматичный, практичный', pos: 'adj', example: 'We need a pragmatic approach.', exampleRu: 'Нужен прагматичный подход.' },
    { id: 'w-eloquent', en: 'eloquent', ru: 'красноречивый, выразительный', pos: 'adj', example: 'An eloquent silence followed her words.', exampleRu: 'После её слов наступило красноречивое молчание.' },
    { id: 'w-subtle', en: 'subtle', ru: 'тонкий, неуловимый', pos: 'adj', example: 'There is a subtle difference between the two words.', exampleRu: 'Между этими словами тонкая разница.', collocations: [{ en: 'subtle hint', ru: 'тонкий намёк' }] },
    { id: 'w-nuanced', en: 'nuanced', ru: 'нюансированный, неоднозначный', pos: 'adj', example: 'It is a nuanced issue with no easy answer.', exampleRu: 'Это неоднозначный вопрос без простого ответа.' },
    { id: 'w-hedge', en: 'to hedge', ru: 'уклоняться от прямого ответа', pos: 'verb', example: 'The minister hedged when asked about taxes.', exampleRu: 'Министр уклонился от ответа о налогах.' },
  ],
};
