import type { ReadDialogue } from '../../types';

// ===== Библиотека подготовленных диалогов для чтения и аудирования =====
// Короткие естественные разговоры в стиле обучающих каналов.

const morning: ReadDialogue = {
  id: 'morning-routine',
  title: 'Доброе утро: завтрак и планы',
  topic: 'everyday',
  level: 'A1',
  durationMin: 1,
  lines: [
    { speaker: 'Anna', en: 'Good morning, Tom! Did you sleep well?', ru: 'Доброе утро, Том! Хорошо спал?' },
    { speaker: 'Tom', en: "Morning, Anna! Not really — the neighbour's dog was barking all night.", ru: 'Утро, Анна! Не очень — соседская собака лаяла всю ночь.' },
    { speaker: 'Anna', en: "Oh no, that's annoying. Do you want some coffee?", ru: 'О нет, как неприятно. Хочешь кофе?' },
    { speaker: 'Tom', en: 'Yes, please. And could you make some toast?', ru: 'Да, пожалуйста. А можешь сделать тост?' },
    { speaker: 'Anna', en: "Sure. We have to leave at eight, don't forget.", ru: 'Конечно. Нам нужно выйти в восемь, не забудь.' },
    { speaker: 'Tom', en: 'I know, I know. Is it raining outside?', ru: 'Знаю-знаю. На улице дождь?' },
    { speaker: 'Anna', en: 'Yeah, it looks like it. Take your umbrella.', ru: 'Да, похоже на то. Возьми зонт.' },
    { speaker: 'Tom', en: 'Good idea. See you downstairs in ten minutes!', ru: 'Хорошая идея. Увидимся внизу через десять минут!' },
  ],
  expressions: [
    { phrase: 'Did you sleep well?', ru: 'Хорошо спал?', note: 'Стандартный утренний вопрос близкому человеку.', example: { en: 'Did you sleep well, honey?', ru: 'Хорошо спала, дорогая?' } },
    { phrase: "that's annoying", ru: 'как неприятно / раздражает', note: 'Реакция на что-то мешающее.' },
    { phrase: 'could you make', ru: 'не мог бы ты сделать…', note: 'Вежливая просьба — мягче, чем «make».', example: { en: 'Could you make some tea, please?', ru: 'Можешь сделать чай, пожалуйста?' } },
    { phrase: "don't forget", ru: 'не забудь', note: 'Напоминание в конце фразы.' },
    { phrase: 'it looks like it', ru: 'похоже на то', note: '«Похоже, да» — короткий ответ.' },
    { phrase: 'See you downstairs', ru: 'увидимся внизу', note: 'See you + место/время — «увидимся…».' },
  ],
};

const grocery: ReadDialogue = {
  id: 'grocery-store',
  title: 'В продуктовом магазине',
  topic: 'shopping',
  level: 'A2',
  durationMin: 2,
  lines: [
    { speaker: 'Customer', en: 'Excuse me, where can I find the dairy products?', ru: 'Простите, где мне найти молочные продукты?' },
    { speaker: 'Assistant', en: "They're in the back, next to the bakery.", ru: 'В конце зала, рядом с пекарней.' },
    { speaker: 'Customer', en: 'Great, thanks. And do you sell fresh bread?', ru: 'Отлично, спасибо. А свежий хлеб у вас есть?' },
    { speaker: 'Assistant', en: 'Yes, it comes out of the oven at nine and three.', ru: 'Да, из печи — в девять и в три.' },
    { speaker: 'Customer', en: 'Perfect timing then. How much is this cheese?', ru: 'Отлично тогда. Сколько стоит этот сыр?' },
    { speaker: 'Assistant', en: "It's on sale today — four ninety-nine.", ru: 'Сегодня по акции — 4.99.' },
    { speaker: 'Customer', en: "Nice, I'll take it. Can I pay by card?", ru: 'Отлично, беру. Можно картой?' },
    { speaker: 'Assistant', en: 'Of course. Would you like a bag?', ru: 'Конечно. Пакет нужен?' },
    { speaker: 'Customer', en: 'No thanks, I brought my own.', ru: 'Нет, спасибо, я принёс свой.' },
    { speaker: 'Assistant', en: 'Have a nice day!', ru: 'Хорошего дня!' },
  ],
  expressions: [
    { phrase: 'where can I find', ru: 'где мне найти…', note: 'Вежливый вопрос про расположение товара.', example: { en: 'Where can I find the bread?', ru: 'Где мне найти хлеб?' } },
    { phrase: 'in the back', ru: 'в конце зала / в глубине', note: 'Про магазин — дальняя часть торгового зала.' },
    { phrase: 'comes out of the oven', ru: 'выходит из печи', note: 'Про свежую выпечку — «печётся к…».' },
    { phrase: 'on sale', ru: 'по акции, со скидкой', note: 'Не путать с «for sale» (продаётся).' },
    { phrase: "I'll take it", ru: 'беру', note: 'Решение о покупке.' },
    { phrase: 'pay by card', ru: 'платить картой', note: 'By + способ: by card, by cash нельзя — cash без by (in cash).' },
  ],
};

const weekend: ReadDialogue = {
  id: 'weekend-plans',
  title: 'Планы на выходные',
  topic: 'family',
  level: 'A2',
  durationMin: 2,
  lines: [
    { speaker: 'Mum', en: 'So, what are we doing this weekend?', ru: 'Итак, что мы делаем в эти выходные?' },
    { speaker: 'Dad', en: 'I was thinking we could visit grandma on Saturday.', ru: 'Я подумал — можно съездить к бабушке в субботу.' },
    { speaker: 'Mum', en: 'Good idea. The kids miss her. And Sunday?', ru: 'Хорошая идея, дети скучают. А воскресенье?' },
    { speaker: 'Dad', en: 'Sunday we could have a picnic if the weather is nice.', ru: 'В воскресенье можно устроить пикник, если погода будет хорошей.' },
    { speaker: 'Mum', en: 'I like that plan. Should we invite the neighbours?', ru: 'Нравится такой план. Позвать соседей?' },
    { speaker: 'Dad', en: 'Why not? The more, the merrier!', ru: 'Почему нет? Чем больше — тем веселее!' },
    { speaker: 'Mum', en: "Okay, I'll text them tonight.", ru: 'Ладно, напишу им вечером.' },
    { speaker: 'Dad', en: "And I'll call grandma to let her know.", ru: 'А я позвоню бабушке, чтобы предупредить.' },
    { speaker: 'Mum', en: "Perfect. It's going to be a busy weekend!", ru: 'Отлично. Выходные будут насыщенные!' },
  ],
  expressions: [
    { phrase: 'what are we doing', ru: 'что мы делаем / что будем делать', note: 'Present Continuous про договорённости.' },
    { phrase: 'I was thinking', ru: 'я подумал, что…', note: 'Мягкий способ предложить идею.', example: { en: 'I was thinking we could order pizza.', ru: 'Я подумал — можно заказать пиццу.' } },
    { phrase: 'have a picnic', ru: 'устроить пикник', note: 'Have a + событие: have a party, have a rest.' },
    { phrase: 'The more, the merrier', ru: 'чем больше — тем веселее', note: 'Крылатое выражение про компанию.' },
    { phrase: "I'll text them", ru: 'я напишу им (сообщение)', note: 'To text — «написать в мессенджере».' },
    { phrase: 'let her know', ru: 'сообщить ей', note: 'Let someone know — «дать знать».' },
  ],
};

const airport: ReadDialogue = {
  id: 'at-the-airport',
  title: 'Регистрация в аэропорту',
  topic: 'travel',
  level: 'A2',
  durationMin: 2,
  lines: [
    { speaker: 'Agent', en: 'Good morning. Can I see your passport, please?', ru: 'Доброе утро. Паспорт, пожалуйста.' },
    { speaker: 'Passenger', en: 'Here you are.', ru: 'Вот, пожалуйста.' },
    { speaker: 'Agent', en: 'Are you checking any bags today?', ru: 'Сдаёте багаж сегодня?' },
    { speaker: 'Passenger', en: "Just this one suitcase. I've got a carry-on too.", ru: 'Только этот чемодан. Ещё ручная кладь.' },
    { speaker: 'Agent', en: "Please put it on the scale. … That's fine — twenty kilos.", ru: 'Положите на весы… Нормально — двадцать кило.' },
    { speaker: 'Passenger', en: 'Can I have a window seat?', ru: 'Можно место у окна?' },
    { speaker: 'Agent', en: 'Let me check… Yes, seat 14A is free.', ru: 'Секунду… Да, место 14A свободно.' },
    { speaker: 'Passenger', en: 'Great. What time does boarding start?', ru: 'Отлично. Когда начинается посадка?' },
    { speaker: 'Agent', en: 'At ten forty-five at gate seven.', ru: 'В 10:45, выход номер семь.' },
    { speaker: 'Passenger', en: 'Thank you very much!', ru: 'Большое спасибо!' },
  ],
  expressions: [
    { phrase: 'Can I see your passport', ru: 'покажите паспорт', note: 'Официальная формулировка на стойке регистрации.' },
    { phrase: 'Here you are', ru: 'вот, пожалуйста', note: 'Говорим, когда что-то передаём.' },
    { phrase: 'carry-on', ru: 'ручная кладь', note: 'Багаж в салон (= hand luggage).' },
    { phrase: 'window seat', ru: 'место у окна', note: 'Аisle seat — у прохода.' },
    { phrase: 'Let me check', ru: 'секунду, проверю', note: 'Фраза-пауза перед поиском информации.' },
    { phrase: 'boarding start', ru: 'посадка начинается', note: 'Boarding — посадка в самолёт.' },
  ],
};

const deadline: ReadDialogue = {
  id: 'tight-deadline',
  title: 'Обсуждение дедлайна с коллегой',
  topic: 'work',
  level: 'B1',
  durationMin: 2,
  lines: [
    { speaker: 'Anna', en: 'Hey Mark, do you have a minute?', ru: 'Эй, Марк, есть минутка?' },
    { speaker: 'Mark', en: "Sure, what's up?", ru: 'Конечно, что случилось?' },
    { speaker: 'Anna', en: 'The client moved the deadline to Friday.', ru: 'Клиент передвинул дедлайн на пятницу.' },
    { speaker: 'Mark', en: "Friday? That doesn't give us much time.", ru: 'Пятница? Времени маловато.' },
    { speaker: 'Anna', en: 'I know. Can you finish your part by Thursday?', ru: 'Знаю. Сможешь закончить свою часть к четвергу?' },
    { speaker: 'Mark', en: "I'll do my best, but I might need help with the report.", ru: 'Постараюсь, но, может, понадобится помощь с отчётом.' },
    { speaker: 'Anna', en: "No problem — ask Kate, she's free this week.", ru: 'Без проблем — спроси Кейт, она свободна на этой неделе.' },
    { speaker: 'Mark', en: 'Will do. Should we tell the client it’s tight?', ru: 'Сделаю. Сказать клиенту, что впритык?' },
    { speaker: 'Anna', en: "Not yet. Let's see how it goes first.", ru: 'Пока нет. Сначала посмотрим, как пойдёт.' },
    { speaker: 'Mark', en: "Fair enough. I'll keep you posted.", ru: 'Справедливо. Буду держать тебя в курсе.' },
  ],
  expressions: [
    { phrase: 'do you have a minute', ru: 'есть минутка?', note: 'Стандартный заход к коллеге.', example: { en: 'Do you have a minute to talk?', ru: 'Есть минутка поговорить?' } },
    { phrase: "what's up", ru: 'что случилось? / как дела?', note: 'Неформальное приветствие или вопрос.' },
    { phrase: 'moved the deadline', ru: 'передвинул дедлайн', note: 'Move — «сдвинуть» дату.' },
    { phrase: "I'll do my best", ru: 'постараюсь', note: 'Обещание без гарантии.' },
    { phrase: 'Will do', ru: 'сделаю', note: 'Короткое «сделаю» в ответ на просьбу.' },
    { phrase: 'keep you posted', ru: 'держать в курсе', note: 'Сообщать новости по ходу дела.', example: { en: "I'll keep you posted about the project.", ru: 'Буду держать в курсе проекта.' } },
  ],
};

const officeKitchen: ReadDialogue = {
  id: 'office-kitchen',
  title: 'Смол-ток на кухне офиса',
  topic: 'social',
  level: 'B1',
  durationMin: 2,
  lines: [
    { speaker: 'Tom', en: 'Hi Sarah! How was your weekend?', ru: 'Привет, Сара! Как прошли выходные?' },
    { speaker: 'Sarah', en: 'Pretty good, thanks. We went hiking on Saturday.', ru: 'Неплохо, спасибо. Ходили в поход в субботу.' },
    { speaker: 'Tom', en: 'Nice! Where did you go?', ru: 'Класс! Куда ходили?' },
    { speaker: 'Sarah', en: 'Just outside the city, near the lake. The weather was perfect.', ru: 'За город, к озеру. Погода была идеальная.' },
    { speaker: 'Tom', en: 'Lucky you — it rained here all day.', ru: 'Повезло тебе — у нас весь день лил дождь.' },
    { speaker: 'Sarah', en: 'Oh really? We got lucky then. How about you — what did you get up to?', ru: 'Правда? Нам повезло. А ты чем занимался?' },
    { speaker: 'Tom', en: 'Nothing special — just caught up on some sleep and watched a series.', ru: 'Ничего особенного — выспался и посмотрел сериал.' },
    { speaker: 'Sarah', en: "Sometimes that's exactly what you need.", ru: 'Иногда именно это и нужно.' },
    { speaker: 'Tom', en: 'True. Anyway, back to work — got a meeting in five.', ru: 'Верно. Ладно, обратно к работе — совещание через пять минут.' },
    { speaker: 'Sarah', en: 'See you at lunch!', ru: 'Увидимся на обеде!' },
  ],
  expressions: [
    { phrase: 'How was your weekend', ru: 'как прошли выходные?', note: 'Классика смол-тока в понедельник.' },
    { phrase: 'went hiking', ru: 'ходили в поход', note: 'Go + -ing для активностей: go swimming, go shopping.' },
    { phrase: 'Lucky you', ru: 'повезло тебе', note: 'Лёгкая зависть-шутка.' },
    { phrase: 'what did you get up to', ru: 'чем занимался?', note: 'Get up to — «делать, заниматься» (разговорное).', example: { en: 'What did you get up to last night?', ru: 'Чем занимался вчера вечером?' } },
    { phrase: 'caught up on some sleep', ru: 'выспался, наверстал сон', note: 'Catch up on — «наверстать упущенное»: catch up on emails.' },
    { phrase: 'back to work', ru: 'обратно к работе', note: 'Мягкое завершение разговора.' },
  ],
};

const parentTeacher: ReadDialogue = {
  id: 'parent-teacher',
  title: 'Родитель и учитель',
  topic: 'school',
  level: 'A2',
  durationMin: 2,
  lines: [
    { speaker: 'Teacher', en: 'Hello, Mrs Lane. Thanks for coming in.', ru: 'Здравствуйте, миссис Лейн. Спасибо, что пришли.' },
    { speaker: 'Parent', en: 'Hello, Mr Carter. How is Emily doing?', ru: 'Здравствуйте, мистер Картер. Как дела у Эмили?' },
    { speaker: 'Teacher', en: "She's doing well in maths and English.", ru: 'Хорошо успевает по математике и английскому.' },
    { speaker: 'Parent', en: "That's good to hear. And what about her behaviour?", ru: 'Рад слышать. А как насчёт поведения?' },
    { speaker: 'Teacher', en: "She talks a bit too much in class, but she's very friendly.", ru: 'Болтает на уроках чуть больше, чем надо, но очень дружелюбная.' },
    { speaker: 'Parent', en: 'That sounds like Emily. Any problems with homework?', ru: 'Похоже на неё. Проблемы с домашними заданиями?' },
    { speaker: 'Teacher', en: 'She sometimes forgets her reading journal.', ru: 'Иногда забывает дневник чтения.' },
    { speaker: 'Parent', en: "I'll remind her at home. Thank you for letting me know.", ru: 'Напомню ей дома. Спасибо, что сообщили.' },
    { speaker: 'Teacher', en: "My pleasure. Keep encouraging her — she's a bright girl.", ru: 'Пожалуйста. Поддерживайте её — она способная девочка.' },
    { speaker: 'Parent', en: 'We will. Thanks again!', ru: 'Обязательно. Ещё раз спасибо!' },
  ],
  expressions: [
    { phrase: 'Thanks for coming in', ru: 'спасибо, что пришли', note: 'Вежливое начало встречи.' },
    { phrase: 'How is Emily doing', ru: 'как дела у Эмили?', note: 'How is smb doing — «как успехи/дела?»' },
    { phrase: 'doing well in', ru: 'хорошо успевает по', note: 'Do well in + предмет.', example: { en: 'She is doing well in maths.', ru: 'Она хорошо успевает по математике.' } },
    { phrase: 'a bit too much', ru: 'чуть больше, чем надо', note: 'Мягкая критика.' },
    { phrase: 'letting me know', ru: 'что сообщили / дали знать', note: 'Thank you for letting me know — вежливая благодарность.' },
    { phrase: 'Keep encouraging her', ru: 'продолжайте поддерживать её', note: 'Keep + -ing — «продолжать делать».' },
  ],
};

const oldFriends: ReadDialogue = {
  id: 'old-friends',
  title: 'Встреча старых друзей',
  topic: 'everyday',
  level: 'B1',
  durationMin: 2,
  lines: [
    { speaker: 'Jenny', en: "Mike? Is that you? I can't believe it!", ru: 'Майк? Это ты? Не могу поверить!' },
    { speaker: 'Mike', en: "Jenny! Wow, it's been ages! How have you been?", ru: 'Дженни! Ого, сколько лет! Как ты?' },
    { speaker: 'Jenny', en: 'Pretty good! What are you doing here in town?', ru: 'Хорошо! Ты что делаешь в городе?' },
    { speaker: 'Mike', en: 'I moved back last month — got a job downtown.', ru: 'Вернулся в прошлом месяце — получил работу в центре.' },
    { speaker: 'Jenny', en: "That's great! We should catch up properly sometime.", ru: 'Здорово! Надо как-нибудь нормально пообщаться.' },
    { speaker: 'Mike', en: 'Definitely. Are you still at the same number?', ru: 'Конечно. Твой номер прежний?' },
    { speaker: 'Jenny', en: "Same as always. Text me and we'll grab a coffee.", ru: 'Прежний. Напиши — сходим за кофе.' },
    { speaker: 'Mike', en: "It's a deal. Hey, say hi to your brother for me!", ru: 'Договорились. Передай привет брату!' },
    { speaker: 'Jenny', en: 'Will do. So good to see you, Mike!', ru: 'Обязательно. Так рада тебя видеть!' },
    { speaker: 'Mike', en: 'You too. Take care!', ru: 'Взаимно. Береги себя!' },
  ],
  expressions: [
    { phrase: "it's been ages", ru: 'сто лет не виделись', note: '«Прошла вечность» — при встрече после долгой паузы.', example: { en: "It's been ages since we last met.", ru: 'С нашей последней встречи прошла вечность.' } },
    { phrase: 'How have you been', ru: 'как ты (всё это время)?', note: 'Present Perfect — про период с последней встречи.' },
    { phrase: 'moved back', ru: 'вернулся (переехал обратно)', note: 'Move back — переезд назад.' },
    { phrase: 'catch up', ru: 'пообщаться, наверстать', note: 'Обменяться новостями после паузы.' },
    { phrase: 'grab a coffee', ru: 'сходить за кофе', note: 'Grab — «захватить, сбегать за» (разговорное).' },
    { phrase: 'Take care', ru: 'береги себя', note: 'Тёплое прощание.' },
  ],
};

const rentingCar: ReadDialogue = {
  id: 'renting-a-car',
  title: 'Аренда машины',
  topic: 'travel',
  level: 'B1',
  durationMin: 2,
  lines: [
    { speaker: 'Customer', en: 'Hi, I have a reservation under the name Petrov.', ru: 'Здравствуйте, у меня бронь на имя Петров.' },
    { speaker: 'Agent', en: 'Let me check… Yes, a compact car for three days?', ru: 'Секунду… Компакт-класс на три дня?' },
    { speaker: 'Customer', en: "That's right. Is insurance included in the price?", ru: 'Верно. Страховка включена в цену?' },
    { speaker: 'Agent', en: 'Basic cover is included, full cover is ten dollars a day extra.', ru: 'Базовая включена, полная — плюс десять долларов в день.' },
    { speaker: 'Customer', en: "I'll take the full cover, just in case.", ru: 'Возьму полную — на всякий случай.' },
    { speaker: 'Agent', en: 'Good choice. Can I see your driving licence?', ru: 'Хороший выбор. Ваши права, пожалуйста.' },
    { speaker: 'Customer', en: "Here you go — it's an international one.", ru: 'Вот, пожалуйста — международные.' },
    { speaker: 'Agent', en: "Perfect. The car is in bay twelve — here's the key.", ru: 'Отлично. Машина на месте двенадцать — вот ключ.' },
    { speaker: 'Customer', en: 'Thanks. Where do I return it?', ru: 'Спасибо. Куда её возвращать?' },
    { speaker: 'Agent', en: 'Same place — just fill up the tank before you bring it back.', ru: 'Сюда же — только заправьте бак перед возвратом.' },
  ],
  expressions: [
    { phrase: 'under the name', ru: 'на имя', note: 'Бронь/заказ «на имя …».', example: { en: 'I booked a table under the name Ivanov.', ru: 'Я забронировал столик на имя Иванов.' } },
    { phrase: 'included in the price', ru: 'включено в цену', note: 'Included — «входит в стоимость».' },
    { phrase: 'just in case', ru: 'на всякий случай', note: 'Причина перестраховки.' },
    { phrase: 'driving licence', ru: 'водительские права', note: 'Брит. вариант; амер. — driver’s license.' },
    { phrase: 'Here you go', ru: 'вот, пожалуйста', note: '= Here you are, при передаче вещи.' },
    { phrase: 'fill up the tank', ru: 'заправить бак', note: 'Fill up — «наполнить до верха».' },
  ],
};

const salaryTalk: ReadDialogue = {
  id: 'salary-talk',
  title: 'Разговор о повышении зарплаты',
  topic: 'work',
  level: 'B2',
  durationMin: 3,
  lines: [
    { speaker: 'Employee', en: 'Thanks for making time for me. I’d like to discuss my salary.', ru: 'Спасибо, что нашли время. Хотел бы обсудить мою зарплату.' },
    { speaker: 'Manager', en: 'Of course. What did you have in mind?', ru: 'Конечно. Что вы имеете в виду?' },
    { speaker: 'Employee', en: 'Over the past year I’ve taken on three extra projects and trained two new team members.', ru: 'За прошлый год я взял три дополнительных проекта и обучил двух новых сотрудников.' },
    { speaker: 'Manager', en: 'I appreciate your contribution. But budgets are tight this quarter.', ru: 'Ценю ваш вклад. Но бюджеты в этом квартале ограничены.' },
    { speaker: 'Employee', en: 'I understand. Still, given my results, I believe a ten per cent raise would be fair.', ru: 'Понимаю. И всё же, учитывая результаты, считаю справедливым повышение на десять процентов.' },
    { speaker: 'Manager', en: 'That’s a significant jump. How about five per cent now and a review in six months?', ru: 'Это серьёзный скачок. Как насчёт пяти процентов сейчас и пересмотра через полгода?' },
    { speaker: 'Employee', en: 'Could we make it seven per cent with the review in writing?', ru: 'Можем ли мы сделать семь процентов и зафиксировать пересмотр письменно?' },
    { speaker: 'Manager', en: 'That’s reasonable. I’ll put it in an email today.', ru: 'Это разумно. Отправлю письмо сегодня.' },
    { speaker: 'Employee', en: 'Great. I appreciate you hearing me out.', ru: 'Отлично. Спасибо, что выслушали меня.' },
    { speaker: 'Manager', en: 'You’ve earned it. Keep up the good work.', ru: 'Вы это заслужили. Продолжайте в том же духе.' },
  ],
  expressions: [
    { phrase: 'making time for me', ru: 'нашли для меня время', note: 'Make time — «выделить время».' },
    { phrase: 'taken on', ru: 'взял на себя', note: 'Take on — брать задачи/ответственность.', example: { en: 'She took on more responsibility.', ru: 'Она взяла на себя больше ответственности.' } },
    { phrase: 'budgets are tight', ru: 'бюджеты ограничены', note: 'Tight — «тугой, ограниченный» о деньгах и времени.' },
    { phrase: 'How about', ru: 'как насчёт', note: 'Предложение-встречное в переговорах.' },
    { phrase: 'in writing', ru: 'письменно, зафиксировано', note: 'Официальное подтверждение на бумаге/почте.' },
    { phrase: 'hearing me out', ru: 'выслушали меня до конца', note: 'Hear someone out — выслушать полностью.' },
  ],
};

const studyAbroad: ReadDialogue = {
  id: 'study-abroad',
  title: 'Обсуждение учёбы за границей',
  topic: 'school',
  level: 'C1',
  durationMin: 3,
  lines: [
    { speaker: 'Alex', en: 'So you’re seriously considering a master’s in the UK?', ru: 'Так ты всерьёз думаешь о магистратуре в Британии?' },
    { speaker: 'Dana', en: 'Yeah. The programme I want is world-renowned, but tuition fees are eye-watering.', ru: 'Да. Программа, которую я хочу, мирового уровня, но плата за обучение заоблачная.' },
    { speaker: 'Alex', en: 'Have you looked into scholarships? Some cover nearly everything.', ru: 'Ты изучала стипендии? Некоторые покрывают почти всё.' },
    { speaker: 'Dana', en: 'I’ve shortlisted three. The deadlines are brutal though — essays, references, the lot.', ru: 'Отобрала три. Правда, сроки жёсткие — эссе, рекомендации, всё сразу.' },
    { speaker: 'Alex', en: 'Worth the grind. Did you weigh up the cost of living there?', ru: 'Оно того стоит. А просчитывала стоимость жизни там?' },
    { speaker: 'Dana', en: 'Roughly. London would stretch me thin; Manchester looks more feasible.', ru: 'Примерно. Лондон меня разорит; Манчестер выглядит реальнее.' },
    { speaker: 'Alex', en: 'And homesickness? Being that far from everyone isn’t easy.', ru: 'А тоска по дому? Быть так далеко от всех нелегко.' },
    { speaker: 'Dana', en: 'That’s my main hesitation, to be honest. But opportunities like this don’t come twice.', ru: 'Это моё главное сомнение, если честно. Но такие возможности дважды не приходят.' },
    { speaker: 'Alex', en: 'Fair enough. Whatever you decide, I’m behind you.', ru: 'Справедливо. Что бы ты ни решила — я тебя поддерживаю.' },
    { speaker: 'Dana', en: 'That means a lot. I’ll keep you posted on the applications.', ru: 'Это очень много значит. Буду держать тебя в курсе по заявкам.' },
  ],
  expressions: [
    { phrase: 'world-renowned', ru: 'известный во всём мире', note: 'Составное прилагательное.' },
    { phrase: 'eye-watering', ru: 'заоблачный, глаза на лоб', note: 'Разговорное, о ценах.', example: { en: 'The repair bill was eye-watering.', ru: 'Счёт за ремонт был заоблачный.' } },
    { phrase: 'looked into', ru: 'изучала, разузнала', note: 'Look into — исследовать вариант.' },
    { phrase: 'Worth the grind', ru: 'стоит усилий', note: 'Grind — «тяжёлая рутина»; выражение «стоит потрудиться».' },
    { phrase: 'stretch me thin', ru: 'разорит, не потяну', note: 'Букв. «растянет тонко» — про деньги и силы.' },
    { phrase: 'don’t come twice', ru: 'не даются дважды', note: 'Об уникальных возможностях.' },
  ],
};

const bookClub: ReadDialogue = {
  id: 'book-club',
  title: 'Книжный клуб: тонкости сюжета',
  topic: 'social',
  level: 'C2',
  durationMin: 4,
  lines: [
    { speaker: 'Elena', en: 'So — the ending. Did anyone else find it deliberately ambiguous?', ru: 'Итак, финал. Кому-нибудь ещё показалось, что он намеренно двусмысленный?' },
    { speaker: 'Marcus', en: 'Ambiguous is putting it mildly. I’d call it downright evasive.', ru: '«Двусмысленный» — это мягко сказано. Я бы назвал его откровенно уклончивым.' },
    { speaker: 'Priya', en: 'I’d push back on that. The ambiguity mirrors the protagonist’s own uncertainty — it’s the whole point.', ru: 'Позволю себе не согласиться. Двусмысленность отражает неуверенность самой героини — в этом вся суть.' },
    { speaker: 'Elena', en: 'That’s a charitable reading. Still, the author withholds so much that it borders on withholding for its own sake.', ru: 'Это благосклонное прочтение. Но автор скрывает так много, что это граничит с утаиванием ради самого утаивания.' },
    { speaker: 'Marcus', en: 'Precisely. It smacks of a writer who couldn’t commit to an ending.', ru: 'Именно. Попахивает автором, который не смог определиться с финалом.' },
    { speaker: 'Priya', en: 'Or one who trusts the reader to sit with discomfort. Not everything needs resolution.', ru: 'Или тем, кто доверяет читателю остаться наедине с дискомфортом. Не всё требует развязки.' },
    { speaker: 'Elena', en: 'Fair enough — though I’d argue there’s a fine line between trusting and abandoning your reader.', ru: 'Справедливо, хотя, осмелюсь заметить, есть тонкая грань между доверием читателю и его бросанием.' },
    { speaker: 'Marcus', en: 'Whatever the intent, it certainly gave us plenty to chew on.', ru: 'Каков бы ни был замысел — пищи для размышлений он точно дал.' },
    { speaker: 'Priya', en: 'On that, at least, we can all agree.', ru: 'Вот в этом, по крайней мере, мы все согласны.' },
  ],
  expressions: [
    { phrase: 'putting it mildly', ru: 'мягко говоря', note: 'To put it mildly — смягчённая оценка.', example: { en: 'He was upset, to put it mildly.', ru: 'Он был расстроен, мягко говоря.' } },
    { phrase: 'push back on that', ru: 'не согласиться, возразить', note: 'Push back — аргументированно возразить.' },
    { phrase: 'the whole point', ru: 'в этом вся суть', note: 'Главная идея.' },
    { phrase: 'borders on', ru: 'граничит с', note: 'Border on — почти является чем-то.', example: { en: 'His rudeness borders on hostility.', ru: 'Его грубость граничит с враждебностью.' } },
    { phrase: 'smacks of', ru: 'попахивает, отдаёт', note: 'Smack of — иметь неприятный оттенок чего-то.' },
    { phrase: 'plenty to chew on', ru: 'много пищи для размышлений', note: 'Food for thought в разговорной форме.' },
  ],
};

export const READ_DIALOGUES: ReadDialogue[] = [
  morning,
  grocery,
  weekend,
  airport,
  parentTeacher,
  deadline,
  officeKitchen,
  oldFriends,
  rentingCar,
  salaryTalk,
  studyAbroad,
  bookClub,
];

export const getDialogueById = (id: string): ReadDialogue | undefined =>
  READ_DIALOGUES.find((d) => d.id === id);
