// ===== Приложения: справочные материалы тренажёра =====

export interface Appendix {
  id: string;
  title: string;
  intro: string;
  blocks: { heading: string; rows: { left: string; right: string }[] }[];
}

export const edRules: Appendix = {
  id: 'ed-rules',
  title: 'Приложение 1. Окончание -ed',
  intro: 'Как пишется и читается окончание -ed у правильных глаголов и прилагательных.',
  blocks: [
    {
      heading: 'Правила добавления -ed',
      rows: [
        { left: 'Обычно + ed', right: 'play → played, call → called' },
        { left: 'На немое -e → + d', right: 'live → lived, dance → danced' },
        { left: 'Согласная + y → ied', right: 'study → studied, cry → cried' },
        { left: 'Гласная + y → + ed', right: 'play → played, stay → stayed' },
        { left: 'Ударный слог с 1 гласной + 1 согласной → удвоение', right: 'stop → stopped, plan → planned' },
        { left: 'Без удвоения: -w, -x и 2+ гласные', right: 'show → showed, fix → fixed, seem → seemed' },
      ],
    },
    {
      heading: 'Правила чтения -ed',
      rows: [
        { left: '[t] — после глухих (кроме t)', right: 'worked, stopped, helped, watched' },
        { left: '[d] — после звонких и гласных (кроме d)', right: 'played, cleaned, lived, answered' },
        { left: '[ɪd] — после t и d', right: 'wanted, needed, waited, decided' },
      ],
    },
  ],
};

export const ingRules: Appendix = {
  id: 'ing-rules',
  title: 'Приложение 2. Окончание -ing',
  intro: 'Как прибавляется -ing к глаголам: когда буквы удваиваются и когда отбрасываются.',
  blocks: [
    {
      heading: 'Правила добавления -ing',
      rows: [
        { left: 'Обычно + ing', right: 'read → reading, work → working' },
        { left: 'Немая -e отбрасывается', right: 'write → writing, make → making' },
        { left: '-ee, -oe, -ye сохраняются', right: 'see → seeing, hoe → hoeing, dye → dyeing' },
        { left: '-ie → -y', right: 'lie → lying, die → dying, tie → tying' },
        { left: 'Ударный слог с 1 гласной + 1 согласной → удвоение', right: 'run → running, sit → sitting, begin → beginning' },
        { left: 'Без удвоения: -w, -x, -y и 2+ гласные/согласные', right: 'draw → drawing, fix → fixing, play → playing, eat → eating' },
        { left: '-c → -ck перед -ing', right: 'panic → panicking, picnic → picnicking' },
      ],
    },
  ],
};

export const tenseTable: Appendix = {
  id: 'tense-table',
  title: 'Приложение 3. Сводная таблица времен',
  intro: 'Все 12 временных форм английского глагола: формула, маркеры и пример.',
  blocks: [
    {
      heading: 'Simple (Indefinite)',
      rows: [
        { left: 'Present Simple — V/Vs', right: 'every day, usually · She works.' },
        { left: 'Past Simple — V₂', right: 'yesterday, ago · She worked.' },
        { left: 'Future Simple — will + V', right: 'tomorrow, next week · She will work.' },
      ],
    },
    {
      heading: 'Continuous (Progressive)',
      rows: [
        { left: 'Present Cont. — am/is/are + V-ing', right: 'now, at the moment · She is working.' },
        { left: 'Past Cont. — was/were + V-ing', right: 'at 5 yesterday, while · She was working.' },
        { left: 'Future Cont. — will be + V-ing', right: 'this time tomorrow · She will be working.' },
      ],
    },
    {
      heading: 'Perfect',
      rows: [
        { left: 'Present Perfect — have/has + V₃', right: 'ever, never, just, since · She has worked.' },
        { left: 'Past Perfect — had + V₃', right: 'before, by the time · She had worked.' },
        { left: 'Future Perfect — will have + V₃', right: 'by 2030, by then · She will have worked.' },
      ],
    },
    {
      heading: 'Perfect Continuous',
      rows: [
        { left: 'Present Perf. Cont. — have/has been + V-ing', right: 'for 2 hours, all day · She has been working.' },
        { left: 'Past Perf. Cont. — had been + V-ing', right: 'for a year before · She had been working.' },
        { left: 'Future Perf. Cont. — will have been + V-ing', right: 'by June… for 5 years · She will have been working.' },
      ],
    },
  ],
};

export const irregularVerbs: Appendix = {
  id: 'irregular-verbs',
  title: 'Приложение 4. Неправильные глаголы',
  intro: 'Основные неправильные глаголы: V₁ — V₂ — V₃ и перевод.',
  blocks: [
    {
      heading: 'Самые частотные',
      rows: [
        { left: 'be — was/were — been', right: 'быть' },
        { left: 'begin — began — begun', right: 'начинать' },
        { left: 'break — broke — broken', right: 'ломать' },
        { left: 'bring — brought — brought', right: 'приносить' },
        { left: 'build — built — built', right: 'строить' },
        { left: 'buy — bought — bought', right: 'покупать' },
        { left: 'catch — caught — caught', right: 'ловить' },
        { left: 'choose — chose — chosen', right: 'выбирать' },
        { left: 'come — came — come', right: 'приходить' },
        { left: 'cost — cost — cost', right: 'стоить' },
        { left: 'do — did — done', right: 'делать' },
        { left: 'drink — drank — drunk', right: 'пить' },
        { left: 'drive — drove — driven', right: 'водить' },
        { left: 'eat — ate — eaten', right: 'есть' },
        { left: 'fall — fell — fallen', right: 'падать' },
        { left: 'feel — felt — felt', right: 'чувствовать' },
        { left: 'find — found — found', right: 'находить' },
        { left: 'fly — flew — flown', right: 'летать' },
        { left: 'forget — forgot — forgotten', right: 'забывать' },
        { left: 'get — got — got/gotten', right: 'получать' },
      ],
    },
    {
      heading: 'Часть 2',
      rows: [
        { left: 'give — gave — given', right: 'давать' },
        { left: 'go — went — gone', right: 'идти' },
        { left: 'grow — grew — grown', right: 'расти' },
        { left: 'have — had — had', right: 'иметь' },
        { left: 'hear — heard — heard', right: 'слышать' },
        { left: 'keep — kept — kept', right: 'держать, хранить' },
        { left: 'know — knew — known', right: 'знать' },
        { left: 'leave — left — left', right: 'покидать' },
        { left: 'lose — lost — lost', right: 'терять' },
        { left: 'make — made — made', right: 'делать' },
        { left: 'meet — met — met', right: 'встречать' },
        { left: 'pay — paid — paid', right: 'платить' },
        { left: 'put — put — put', right: 'класть' },
        { left: 'read — read — read', right: 'читать' },
        { left: 'run — ran — run', right: 'бежать' },
        { left: 'say — said — said', right: 'сказать' },
        { left: 'see — saw — seen', right: 'видеть' },
        { left: 'sell — sold — sold', right: 'продавать' },
        { left: 'send — sent — sent', right: 'отправлять' },
        { left: 'sing — sang — sung', right: 'петь' },
      ],
    },
    {
      heading: 'Часть 3',
      rows: [
        { left: 'sit — sat — sat', right: 'сидеть' },
        { left: 'sleep — slept — slept', right: 'спать' },
        { left: 'speak — spoke — spoken', right: 'говорить' },
        { left: 'spend — spent — spent', right: 'тратить' },
        { left: 'stand — stood — stood', right: 'стоять' },
        { left: 'steal — stole — stolen', right: 'красть' },
        { left: 'swim — swam — swum', right: 'плавать' },
        { left: 'take — took — taken', right: 'брать' },
        { left: 'teach — taught — taught', right: 'учить' },
        { left: 'tell — told — told', right: 'рассказывать' },
        { left: 'think — thought — thought', right: 'думать' },
        { left: 'throw — threw — thrown', right: 'бросать' },
        { left: 'understand — understood — understood', right: 'понимать' },
        { left: 'wake — woke — woken', right: 'просыпаться' },
        { left: 'wear — wore — worn', right: 'носить (одежду)' },
        { left: 'win — won — won', right: 'выигрывать' },
        { left: 'write — wrote — written', right: 'писать' },
      ],
    },
  ],
};

export const APPENDICES: Appendix[] = [edRules, ingRules, tenseTable, irregularVerbs];

export const getAppendixById = (id: string): Appendix | undefined =>
  APPENDICES.find((a) => a.id === id);
