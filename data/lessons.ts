export type LessonItem = {
  italian: string;
  english: string;
  pronunciation?: string;
};

export type QuizQuestion = {
  question: string; // Italian text
  correctAnswer: string; // English
  options: string[]; // 4 English options
};

export type Lesson = {
  id: string;
  level: number;
  category: string;
  items: LessonItem[];
  quiz: QuizQuestion[];
};

export const lessons: Lesson[] = [
  // Level 1: Basics
  {
    id: 'numbers',
    level: 1,
    category: 'Numbers',
    items: [
      { italian: 'Uno', english: 'One' },
      { italian: 'Due', english: 'Two' },
      { italian: 'Tre', english: 'Three' },
      { italian: 'Quattro', english: 'Four' },
      { italian: 'Cinque', english: 'Five' },
      { italian: 'Sei', english: 'Six' },
      { italian: 'Sette', english: 'Seven' },
      { italian: 'Otto', english: 'Eight' },
      { italian: 'Nove', english: 'Nine' },
      { italian: 'Dieci', english: 'Ten' },
      { italian: 'Venti', english: 'Twenty' },
      { italian: 'Trenta', english: 'Thirty' },
      { italian: 'Quaranta', english: 'Forty' },
      { italian: 'Cinquanta', english: 'Fifty' },
      { italian: 'Sessanta', english: 'Sixty' },
      { italian: 'Settanta', english: 'Seventy' },
      { italian: 'Ottanta', english: 'Eighty' },
      { italian: 'Novanta', english: 'Ninety' },
      { italian: 'Cento', english: 'One Hundred' },
    ],
    quiz: [
      {
        question: 'Cinque',
        correctAnswer: 'Five',
        options: ['Five', 'Four', 'Six', 'Seven'],
      },
      {
        question: 'Dieci',
        correctAnswer: 'Ten',
        options: ['Ten', 'Twenty', 'Thirty', 'Eleven'],
      },
      {
        question: 'Cento',
        correctAnswer: 'One Hundred',
        options: ['One Hundred', 'Fifty', 'Two Hundred', 'Ninety'],
      },
      {
        question: 'Sette',
        correctAnswer: 'Seven',
        options: ['Six', 'Seven', 'Eight', 'Nine'],
      },
    ],
  },
  {
    id: 'alphabet',
    level: 1,
    category: 'Alphabet',
    items: [
      { italian: 'A', english: 'A (ah)' },
      { italian: 'B', english: 'B (bee)' },
      { italian: 'C', english: 'C (chee)' },
      { italian: 'D', english: 'D (dee)' },
      { italian: 'E', english: 'E (eh)' },
      { italian: 'F', english: 'F (effe)' },
      { italian: 'G', english: 'G (jee)' },
      { italian: 'H', english: 'H (acca)' },
      { italian: 'I', english: 'I (ee)' },
      { italian: 'J', english: 'J (jay)' },
      { italian: 'K', english: 'K (kappa)' },
      { italian: 'L', english: 'L (elle)' },
      { italian: 'M', english: 'M (emme)' },
      { italian: 'N', english: 'N (enne)' },
      { italian: 'O', english: 'O (oh)' },
      { italian: 'P', english: 'P (pee)' },
      { italian: 'Q', english: 'Q (koo)' },
      { italian: 'R', english: 'R (erre)' },
      { italian: 'S', english: 'S (esse)' },
      { italian: 'T', english: 'T (tee)' },
      { italian: 'U', english: 'U (oo)' },
      { italian: 'V', english: 'V (vee)' },
      { italian: 'W', english: 'W (doppia vee)' },
      { italian: 'X', english: 'X (eeks)' },
      { italian: 'Y', english: 'Y (ee greca)' },
      { italian: 'Z', english: 'Z (zeta)' },
    ],
    quiz: [
      {
        question: 'C',
        correctAnswer: 'C (chee)',
        options: ['C (chee)', 'C (see)', 'C (kee)', 'C (zee)'],
      },
      {
        question: 'R',
        correctAnswer: 'R (erre)',
        options: ['R (ar)', 'R (erre)', 'R (ree)', 'R (er)'],
      },
      {
        question: 'Z',
        correctAnswer: 'Z (zeta)',
        options: ['Z (zee)', 'Z (zed)', 'Z (zeta)', 'Z (zet)'],
      },
    ],
  },
  {
    id: 'days',
    level: 1,
    category: 'Days of the Week',
    items: [
      { italian: 'Lunedì', english: 'Monday' },
      { italian: 'Martedì', english: 'Tuesday' },
      { italian: 'Mercoledì', english: 'Wednesday' },
      { italian: 'Giovedì', english: 'Thursday' },
      { italian: 'Venerdì', english: 'Friday' },
      { italian: 'Sabato', english: 'Saturday' },
      { italian: 'Domenica', english: 'Sunday' },
    ],
    quiz: [
      {
        question: 'Lunedì',
        correctAnswer: 'Monday',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      },
      {
        question: 'Venerdì',
        correctAnswer: 'Friday',
        options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
      {
        question: 'Domenica',
        correctAnswer: 'Sunday',
        options: ['Saturday', 'Sunday', 'Monday', 'Friday'],
      },
    ],
  },
  {
    id: 'months',
    level: 1,
    category: 'Months of the Year',
    items: [
      { italian: 'Gennaio', english: 'January' },
      { italian: 'Febbraio', english: 'February' },
      { italian: 'Marzo', english: 'March' },
      { italian: 'Aprile', english: 'April' },
      { italian: 'Maggio', english: 'May' },
      { italian: 'Giugno', english: 'June' },
      { italian: 'Luglio', english: 'July' },
      { italian: 'Agosto', english: 'August' },
      { italian: 'Settembre', english: 'September' },
      { italian: 'Ottobre', english: 'October' },
      { italian: 'Novembre', english: 'November' },
      { italian: 'Dicembre', english: 'December' },
    ],
    quiz: [
      {
        question: 'Gennaio',
        correctAnswer: 'January',
        options: ['January', 'February', 'March', 'April'],
      },
      {
        question: 'Luglio',
        correctAnswer: 'July',
        options: ['June', 'July', 'August', 'September'],
      },
      {
        question: 'Dicembre',
        correctAnswer: 'December',
        options: ['October', 'November', 'December', 'January'],
      },
    ],
  },
  {
    id: 'greetings',
    level: 1,
    category: 'Basic Greetings',
    items: [
      { italian: 'Ciao', english: 'Hello / Hi / Bye' },
      { italian: 'Buongiorno', english: 'Good morning' },
      { italian: 'Buonasera', english: 'Good evening' },
      { italian: 'Buonanotte', english: 'Good night' },
      { italian: 'Arrivederci', english: 'Goodbye' },
      { italian: 'Come stai?', english: 'How are you?' },
      { italian: 'Sto bene', english: "I'm fine" },
      { italian: 'Grazie', english: 'Thank you' },
      { italian: 'Prego', english: "You're welcome" },
      { italian: 'Per favore', english: 'Please' },
    ],
    quiz: [
      {
        question: 'Buongiorno',
        correctAnswer: 'Good morning',
        options: ['Good morning', 'Good evening', 'Good night', 'Goodbye'],
      },
      {
        question: 'Grazie',
        correctAnswer: 'Thank you',
        options: ['Please', 'Thank you', "You're welcome", 'Hello'],
      },
      {
        question: 'Come stai?',
        correctAnswer: 'How are you?',
        options: ['How are you?', "I'm fine", 'Hello', 'Goodbye'],
      },
    ],
  },
  {
    id: 'colors',
    level: 1,
    category: 'Colors',
    items: [
      { italian: 'Rosso', english: 'Red' },
      { italian: 'Blu', english: 'Blue' },
      { italian: 'Verde', english: 'Green' },
      { italian: 'Giallo', english: 'Yellow' },
      { italian: 'Arancione', english: 'Orange' },
      { italian: 'Viola', english: 'Purple' },
      { italian: 'Rosa', english: 'Pink' },
      { italian: 'Nero', english: 'Black' },
      { italian: 'Bianco', english: 'White' },
      { italian: 'Grigio', english: 'Gray' },
      { italian: 'Marrone', english: 'Brown' },
    ],
    quiz: [
      {
        question: 'Verde',
        correctAnswer: 'Green',
        options: ['Green', 'Blue', 'Yellow', 'Red'],
      },
      {
        question: 'Arancione',
        correctAnswer: 'Orange',
        options: ['Red', 'Orange', 'Yellow', 'Pink'],
      },
      {
        question: 'Nero',
        correctAnswer: 'Black',
        options: ['Black', 'White', 'Gray', 'Brown'],
      },
    ],
  },
  // Level 2: Essentials
  {
    id: 'phrases',
    level: 2,
    category: 'Common Phrases',
    items: [
      { italian: 'Mi scusi', english: 'Excuse me' },
      { italian: 'Mi dispiace', english: "I'm sorry" },
      { italian: 'Non capisco', english: "I don't understand" },
      { italian: 'Parli inglese?', english: 'Do you speak English?' },
      { italian: 'Dove sono?', english: 'Where am I?' },
      { italian: 'Aiuto!', english: 'Help!' },
      { italian: 'Quanto costa?', english: 'How much does it cost?' },
      { italian: 'Dov\'è il bagno?', english: "Where's the bathroom?" },
      { italian: 'Ho fame', english: "I'm hungry" },
      { italian: 'Ho sete', english: "I'm thirsty" },
    ],
    quiz: [
      {
        question: 'Mi scusi',
        correctAnswer: 'Excuse me',
        options: ['Excuse me', "I'm sorry", 'Thank you', 'Please'],
      },
      {
        question: 'Quanto costa?',
        correctAnswer: 'How much does it cost?',
        options: ['How much does it cost?', 'Where is it?', 'What time is it?', 'How are you?'],
      },
      {
        question: 'Ho fame',
        correctAnswer: "I'm hungry",
        options: ["I'm hungry", "I'm thirsty", "I'm tired", "I'm fine"],
      },
    ],
  },
  {
    id: 'family',
    level: 2,
    category: 'Family Members',
    items: [
      { italian: 'Famiglia', english: 'Family' },
      { italian: 'Madre', english: 'Mother' },
      { italian: 'Padre', english: 'Father' },
      { italian: 'Figlio', english: 'Son' },
      { italian: 'Figlia', english: 'Daughter' },
      { italian: 'Fratello', english: 'Brother' },
      { italian: 'Sorella', english: 'Sister' },
      { italian: 'Nonno', english: 'Grandfather' },
      { italian: 'Nonna', english: 'Grandmother' },
      { italian: 'Zio', english: 'Uncle' },
      { italian: 'Zia', english: 'Aunt' },
    ],
    quiz: [
      {
        question: 'Madre',
        correctAnswer: 'Mother',
        options: ['Mother', 'Father', 'Sister', 'Brother'],
      },
      {
        question: 'Nonna',
        correctAnswer: 'Grandmother',
        options: ['Grandmother', 'Grandfather', 'Aunt', 'Uncle'],
      },
      {
        question: 'Fratello',
        correctAnswer: 'Brother',
        options: ['Brother', 'Sister', 'Son', 'Daughter'],
      },
    ],
  },
  {
    id: 'body',
    level: 2,
    category: 'Body Parts',
    items: [
      { italian: 'Testa', english: 'Head' },
      { italian: 'Occhio', english: 'Eye' },
      { italian: 'Naso', english: 'Nose' },
      { italian: 'Bocca', english: 'Mouth' },
      { italian: 'Orecchio', english: 'Ear' },
      { italian: 'Collo', english: 'Neck' },
      { italian: 'Braccio', english: 'Arm' },
      { italian: 'Mano', english: 'Hand' },
      { italian: 'Gamba', english: 'Leg' },
      { italian: 'Piede', english: 'Foot' },
    ],
    quiz: [
      {
        question: 'Occhio',
        correctAnswer: 'Eye',
        options: ['Eye', 'Ear', 'Nose', 'Mouth'],
      },
      {
        question: 'Mano',
        correctAnswer: 'Hand',
        options: ['Hand', 'Foot', 'Arm', 'Leg'],
      },
      {
        question: 'Testa',
        correctAnswer: 'Head',
        options: ['Head', 'Neck', 'Shoulder', 'Back'],
      },
    ],
  },
  {
    id: 'food',
    level: 2,
    category: 'Food and Drinks',
    items: [
      { italian: 'Pane', english: 'Bread' },
      { italian: 'Acqua', english: 'Water' },
      { italian: 'Vino', english: 'Wine' },
      { italian: 'Caffè', english: 'Coffee' },
      { italian: 'Formaggio', english: 'Cheese' },
      { italian: 'Pasta', english: 'Pasta' },
      { italian: 'Pizza', english: 'Pizza' },
      { italian: 'Frutta', english: 'Fruit' },
      { italian: 'Carne', english: 'Meat' },
      { italian: 'Pesce', english: 'Fish' },
      { italian: 'Gelato', english: 'Ice cream' },
    ],
    quiz: [
      {
        question: 'Acqua',
        correctAnswer: 'Water',
        options: ['Water', 'Wine', 'Coffee', 'Juice'],
      },
      {
        question: 'Gelato',
        correctAnswer: 'Ice cream',
        options: ['Ice cream', 'Cake', 'Cookie', 'Candy'],
      },
      {
        question: 'Formaggio',
        correctAnswer: 'Cheese',
        options: ['Cheese', 'Butter', 'Milk', 'Yogurt'],
      },
    ],
  },
  // Level 3: Conversational
  {
    id: 'verbs',
    level: 3,
    category: 'Verbs (Present Tense)',
    items: [
      { italian: 'Essere', english: 'To be' },
      { italian: 'Avere', english: 'To have' },
      { italian: 'Andare', english: 'To go' },
      { italian: 'Venire', english: 'To come' },
      { italian: 'Fare', english: 'To do / To make' },
      { italian: 'Dire', english: 'To say' },
      { italian: 'Vedere', english: 'To see' },
      { italian: 'Sapere', english: 'To know' },
      { italian: 'Volere', english: 'To want' },
      { italian: 'Potere', english: 'To be able to / Can' },
    ],
    quiz: [
      {
        question: 'Essere',
        correctAnswer: 'To be',
        options: ['To be', 'To have', 'To go', 'To do'],
      },
      {
        question: 'Volere',
        correctAnswer: 'To want',
        options: ['To want', 'To need', 'To like', 'To love'],
      },
      {
        question: 'Vedere',
        correctAnswer: 'To see',
        options: ['To see', 'To watch', 'To look', 'To find'],
      },
    ],
  },
  {
    id: 'questions',
    level: 3,
    category: 'Questions and Answers',
    items: [
      { italian: 'Chi?', english: 'Who?' },
      { italian: 'Cosa?', english: 'What?' },
      { italian: 'Dove?', english: 'Where?' },
      { italian: 'Quando?', english: 'When?' },
      { italian: 'Perché?', english: 'Why?' },
      { italian: 'Come?', english: 'How?' },
      { italian: 'Quanto?', english: 'How much?' },
      { italian: 'Quale?', english: 'Which?' },
      { italian: 'Sì', english: 'Yes' },
      { italian: 'No', english: 'No' },
    ],
    quiz: [
      {
        question: 'Dove?',
        correctAnswer: 'Where?',
        options: ['Where?', 'When?', 'Why?', 'How?'],
      },
      {
        question: 'Perché?',
        correctAnswer: 'Why?',
        options: ['What?', 'Why?', 'When?', 'How?'],
      },
      {
        question: 'Quanto?',
        correctAnswer: 'How much?',
        options: ['How much?', 'How many?', 'How?', 'Which?'],
      },
    ],
  },
  {
    id: 'directions',
    level: 3,
    category: 'Directions',
    items: [
      { italian: 'Destra', english: 'Right' },
      { italian: 'Sinistra', english: 'Left' },
      { italian: 'Dritto', english: 'Straight' },
      { italian: 'Qui', english: 'Here' },
      { italian: 'Là', english: 'There' },
      { italian: 'Vicino', english: 'Near' },
      { italian: 'Lontano', english: 'Far' },
      { italian: 'Nord', english: 'North' },
      { italian: 'Sud', english: 'South' },
      { italian: 'Est', english: 'East' },
      { italian: 'Ovest', english: 'West' },
    ],
    quiz: [
      {
        question: 'Destra',
        correctAnswer: 'Right',
        options: ['Right', 'Left', 'Straight', 'Back'],
      },
      {
        question: 'Vicino',
        correctAnswer: 'Near',
        options: ['Near', 'Far', 'Here', 'There'],
      },
      {
        question: 'Nord',
        correctAnswer: 'North',
        options: ['North', 'South', 'East', 'West'],
      },
    ],
  },
  {
    id: 'time',
    level: 3,
    category: 'Time and Dates',
    items: [
      { italian: 'Ora', english: 'Hour / Now' },
      { italian: 'Minuto', english: 'Minute' },
      { italian: 'Giorno', english: 'Day' },
      { italian: 'Settimana', english: 'Week' },
      { italian: 'Mese', english: 'Month' },
      { italian: 'Anno', english: 'Year' },
      { italian: 'Oggi', english: 'Today' },
      { italian: 'Ieri', english: 'Yesterday' },
      { italian: 'Domani', english: 'Tomorrow' },
      { italian: 'Che ora è?', english: "What time is it?" },
    ],
    quiz: [
      {
        question: 'Oggi',
        correctAnswer: 'Today',
        options: ['Today', 'Tomorrow', 'Yesterday', 'Now'],
      },
      {
        question: 'Settimana',
        correctAnswer: 'Week',
        options: ['Week', 'Month', 'Year', 'Day'],
      },
      {
        question: 'Che ora è?',
        correctAnswer: "What time is it?",
        options: ["What time is it?", "What day is it?", "What date is it?", "How are you?"],
      },
    ],
  },
];


