import { Question, QuizCategory } from "../types";

export const QUESTION_BANK: Question[] = [
  // RAMAYANA
  {
    id: "ram_1",
    category: QuizCategory.RAMAYANA,
    questionText: "Who wrote the epic ancient scripture Ramayana in Sanskrit?",
    options: ["Sage Valmiki", "Sage Vyasa", "Tulsidas", "Kalidasa"],
    correctOptionIndex: 0,
    explanation: "The original Sanskrit Ramayana of 24,000 verses was composed by Sage Valmiki."
  },
  {
    id: "ram_2",
    category: QuizCategory.RAMAYANA,
    questionText: "What was the name of Lord Rama's bow that he strung to win Sita's hand in marriage?",
    options: ["Pinaka", "Gandiva", "Sharanga", "Vijaya"],
    correctOptionIndex: 0,
    explanation: "Pinaka was Lord Shiva's divine bow, which was kept at King Janaka's court, and Rama successfully broke it by stringing it."
  },
  {
    id: "ram_3",
    category: QuizCategory.RAMAYANA,
    questionText: "In which forest did Lord Rama, Sita, and Lakshmana live during their exile?",
    options: ["Naimisharanya", "Dandakaranya", "Panchavati", "Kamyaka Fan"],
    correctOptionIndex: 1,
    explanation: "They spent a large portion of their 14-year exile in the Dandakaranya forest."
  },
  {
    id: "ram_4",
    category: QuizCategory.RAMAYANA,
    questionText: "Who was the physician of Lanka who treated Lakshmana with the Sanjeevani herb?",
    options: ["Sushyna", "Charaka", "Sushena", "Dhanvantari"],
    correctOptionIndex: 2,
    explanation: "Sushena, the royal physician of Lanka, advised bringing the Sanjeevani herb from the Himalayas after Lakshmana was wounded."
  },

  // MAHABHARATA
  {
    id: "mah_1",
    category: QuizCategory.MAHABHARATA,
    questionText: "Which ancient epic is considered the longest in the world?",
    options: ["Ramayana", "Mahabharata", "Bhagavad Gita", "Upanishads"],
    correctOptionIndex: 1,
    explanation: "With over 100,000 shlokas (verses), the Mahabharata is the longest epic poem in the world."
  },
  {
    id: "mah_2",
    category: QuizCategory.MAHABHARATA,
    questionText: "What was the name of Arjuna's legendary bow?",
    options: ["Pinaka", "Gandiva", "Sharanga", "Kodanda"],
    correctOptionIndex: 1,
    explanation: "Gandiva was the celestial bow gifted of Lord Varuna to Arjuna to fight in the Kurukshetra war."
  },
  {
    id: "mah_3",
    category: QuizCategory.MAHABHARATA,
    questionText: "Who was the commander of the Kaurava army for the first 10 days of the Kurukshetra war?",
    options: ["Dronacharya", "Karna", "Bhishma", "Shalya"],
    correctOptionIndex: 2,
    explanation: "Bhishma Pitamah led the Kaurava forces for the initial 10 days of the battle, maintaining a strictly honorable code."
  },
  {
    id: "mah_4",
    category: QuizCategory.MAHABHARATA,
    questionText: "Who was the mother of the five Pandava brothers, Nakula and Sahadeva?",
    options: ["Kunti", "Madri", "Gandhari", "Satyavati"],
    correctOptionIndex: 1,
    explanation: "While Yudhisthira, Bhima, and Arjuna were born to Kunti, Nakula and Sahadeva were born to Madri, the second wife of King Pandu."
  },

  // BHAGAVAD GITA
  {
    id: "git_1",
    category: QuizCategory.BHAGAVAD_GITA,
    questionText: "How many chapters and verses make up the Bhagavad Gita?",
    options: ["18 chapters, 700 verses", "18 chapters, 1000 verses", "24 chapters, 700 verses", "12 chapters, 500 verses"],
    correctOptionIndex: 0,
    explanation: "The Bhagavad Gita consists of 18 chapters and 700 verses, nested within the Bhishma Parva of the Mahabharata."
  },
  {
    id: "git_2",
    category: QuizCategory.BHAGAVAD_GITA,
    questionText: "Which path of devotion or yoga emphasizes selfless action as a means of liberation?",
    options: ["Jnana Yoga", "Bhakti Yoga", "Karma Yoga", "Raja Yoga"],
    correctOptionIndex: 2,
    explanation: "Karma Yoga is the path of selfless action, executing one's duty without attachment to fruits or rewards."
  },
  {
    id: "git_3",
    category: QuizCategory.BHAGAVAD_GITA,
    questionText: "To whom does Lord Krishna deliver the sacred discourse of the Gita on the battlefield?",
    options: ["Arjuna", "Bhishma", "Karna", "Yudhisthira"],
    correctOptionIndex: 0,
    explanation: "The discourse is delivered to Arjuna, who falls into a state of profound moral despair before the battle starts."
  },
  {
    id: "git_4",
    category: QuizCategory.BHAGAVAD_GITA,
    questionText: "Which chapter of Bhagavad Gita is titled 'The Universal Form' (Vishwarupa Darshana)?",
    options: ["Chapter 2", "Chapter 9", "Chapter 11", "Chapter 18"],
    correctOptionIndex: 2,
    explanation: "In Chapter 11, Lord Krishna reveals His magnificent, infinite Cosmic Vision to Arjuna."
  },

  // INDIAN HISTORY
  {
    id: "his_1",
    category: QuizCategory.INDIAN_HISTORY,
    questionText: "Who was the founder of the Mauryan Empire in ancient India?",
    options: ["Ashoka the Great", "Chandragupta Maurya", "Samudragupta", "Harsha"],
    correctOptionIndex: 1,
    explanation: "Chandragupta Maurya founded the Mauryan Empire in 322 BCE, with the strategic advice of Chanakya."
  },
  {
    id: "his_2",
    category: QuizCategory.INDIAN_HISTORY,
    questionText: "The Harappan civilization flourished around the basin of which major river system?",
    options: ["River Ganges", "River Yamuna", "River Indus", "River Brahmaputra"],
    correctOptionIndex: 2,
    explanation: "The Harappan or Indus Valley Civilization (3300–1300 BCE) primarily flourished around the fertile Indus River basin."
  },
  {
    id: "his_3",
    category: QuizCategory.INDIAN_HISTORY,
    questionText: "Which Indian ruler belonged to the famous Chola Dynasty and built the majestic Brihadisvara Temple at Thanjavur?",
    options: ["Raja Raja Chola I", "Rajendra Chola I", "Karikala Chola", "Aditya Chola I"],
    correctOptionIndex: 0,
    explanation: "Raja Raja Chola I commissioned the magnificent Brihadisvara Temple completed in 1010 CE, a masterpiece of Dravidian architecture."
  },
  {
    id: "his_4",
    category: QuizCategory.INDIAN_HISTORY,
    questionText: "The First War of Indian Independence (Sepoy Mutiny) began in which historic year?",
    options: ["1857", "1757", "1942", "1919"],
    correctOptionIndex: 0,
    explanation: "The rebellion of 1857 against the British East India Company is widely regarded as India's First War of Independence."
  },

  // INDIAN CULTURE
  {
    id: "cul_1",
    category: QuizCategory.INDIAN_CULTURE,
    questionText: "Which classical Indian dance form originates from the state of Kerala and is famous for its elaborate green makeup and costumes?",
    options: ["Bharatanatyam", "Kathakali", "Kathak", "Kuchipudi"],
    correctOptionIndex: 1,
    explanation: "Kathakali originates in Kerala, combining devotion, stylized drama, elaborate mask-like makeup, and slow music."
  },
  {
    id: "cul_2",
    category: QuizCategory.INDIAN_CULTURE,
    questionText: "What is the ancient festival of Gurupurnima dedicated to celebrating?",
    options: ["The arrival of spring", "Teachers and spiritual mentors", "Harvest season", "Victory of good over evil"],
    correctOptionIndex: 1,
    explanation: "Gurupurnima is celebrated traditionally by Hindus, Buddhists, and Jains to honor and offer gratitude to spiritual and academic mentors (gurus)."
  },
  {
    id: "cul_3",
    category: QuizCategory.INDIAN_CULTURE,
    questionText: "Which ancient university list was a world-renowned center of Buddhist learning in Bihar from the 5th to the 12th century CE?",
    options: ["Takshashila", "Nalanda", "Vikramasila", "Vallabhi"],
    correctOptionIndex: 1,
    explanation: "Nalanda was a highly acclaimed ancient seat of higher education, attracting scholars from across Asia."
  },
  {
    id: "cul_4",
    category: QuizCategory.INDIAN_CULTURE,
    questionText: "The standard traditional greetings 'Namaste' literally translates from Sanskrit into what meaning?",
    options: ["I bow to the divine in you", "Welcome to my home", "May you live long", "Peace be with you"],
    correctOptionIndex: 0,
    explanation: "'Nama' means to bow, 'as' means I, and 'te' means to you. Together, it represents bowing to the infinite spirit inside another."
  },

  // SCIENCE
  {
    id: "sci_1",
    category: QuizCategory.SCIENCE,
    questionText: "Which Indian physicist won the Nobel Prize in Physics in 1930 for discovering the scattering of light?",
    options: ["Satyendra Nath Bose", "C. V. Raman", "Homi J. Bhabha", "Jagadish Chandra Bose"],
    correctOptionIndex: 1,
    explanation: "Sir C. V. Raman discovered the 'Raman Effect', explaining why light changes wavelength when scattered or passing through molecules."
  },
  {
    id: "sci_2",
    category: QuizCategory.SCIENCE,
    questionText: "What are the celestial structures studied by Subrahmanyan Chandrasekhar that earned him a Nobel Prize?",
    options: ["Black holes & Stellar evolution", "Sumerian constellations", "Neutron stars only", "Cosmic background microwave radiation"],
    correctOptionIndex: 0,
    explanation: "Dr. Chandrasekhar's research on stellar structure, black holes, and the Chandrasekhar Limit of stellar mass earned him the Nobel Prize in 1983."
  },
  {
    id: "sci_3",
    category: QuizCategory.SCIENCE,
    questionText: "The iconic instrument 'Crescograph', which measures microscopic plant growth, was invented by whom?",
    options: ["Jagadish Chandra Bose", "Har Gobind Khorana", "Birbal Sahni", "S. S. Bhatnagar"],
    correctOptionIndex: 0,
    explanation: "Sir Jagadish Chandra Bose invented the Crescograph to successfully demonstrate that plants possess sensitivity and feel pain/vitality."
  },
  {
    id: "sci_4",
    category: QuizCategory.SCIENCE,
    questionText: "What is the primary chemical compound found in turmeric that is famous for its natural medicinal and anti-inflammatory properties?",
    options: ["Capsaicin", "Curcumin", "Piperine", "Allicin"],
    correctOptionIndex: 1,
    explanation: "Curcumin is the active bioactive compound in turmeric responsible for its rich gold color and antioxidant properties."
  },

  // MATHEMATICS
  {
    id: "mat_1",
    category: QuizCategory.MATHEMATICS,
    questionText: "Which ancient Indian mathematician and astronomer introduced the numerical concept of 'Zero' (Shunya) as a formal mathematical element?",
    options: ["Aryabhata", "Brahmagupta", "Bhaskara II", "Madhava of Sangamagrama"],
    correctOptionIndex: 1,
    explanation: "While Aryabhata used zero in place-value, Brahmagupta was the first to establish arithmetic rules for computations using Zero in Brahmasphutasiddhanta."
  },
  {
    id: "mat_2",
    category: QuizCategory.MATHEMATICS,
    questionText: "The legendary genius Srinivasa Ramanujan discovered a unique class of numbers. Which of these is the famous Hardy-Ramanujan Taxicab number?",
    options: ["1729", "1250", "2048", "9999"],
    correctOptionIndex: 0,
    explanation: "1729 is the smallest number expressible as the sum of two positive cubes in two different ways: (10³ + 9³) and (12³ + 1³)."
  },
  {
    id: "mat_3",
    category: QuizCategory.MATHEMATICS,
    questionText: "Which ancient treatise contains the earliest statement of what is now known as the Pythagorean Theorem?",
    options: ["Brahmasphutasiddhanta", "Sulba Sutras", "Lilavati", "Aryabhatiya"],
    correctOptionIndex: 1,
    explanation: "Baudhayana's Sulba Sutras (written around 800-600 BCE) state the geometric theorem concerning the diagonal of a rectangle."
  },
  {
    id: "mat_4",
    category: QuizCategory.MATHEMATICS,
    questionText: "The Kerala School of Astronomy and Mathematics, led by Madhava, discovered which mathematical concept centuries before European calculus?",
    options: ["Infinite series expansion for Pi", "The Binomial Theorem", "Logarithms", "Matrix Multiplication"],
    correctOptionIndex: 0,
    explanation: "Madhava of Sangamagrama discovered infinite power series expansions of trigonometric functions and Pi in the 14th century."
  },

  // TECHNOLOGY
  {
    id: "tec_1",
    category: QuizCategory.TECHNOLOGY,
    questionText: "Which pioneering Indian technologist is widely recognized as the 'Father of Fiber Optics'?",
    options: ["Narinder Singh Kapany", "Vijay Bhatkar", "Sam Pitroda", "Vinod Dham"],
    correctOptionIndex: 0,
    explanation: "Narinder Singh Kapany coined the term 'fiber optics' and pioneered laser transmission through high-purity glass strands."
  },
  {
    id: "tec_2",
    category: QuizCategory.TECHNOLOGY,
    questionText: "What was the name of India's first supercomputer, designed and assembled indigenously in Pune in 1991?",
    options: ["Pratyush", "Mihir", "PARAM 8000", "Sahasrat"],
    correctOptionIndex: 2,
    explanation: "PARAM 8000, built by C-DAC in 1991, was India's first indigenously developed gigaflop-scale supercomputer."
  },
  {
    id: "tec_3",
    category: QuizCategory.TECHNOLOGY,
    questionText: "Which technology standard is primarily used for deep-space communication or lunar landing confirmation programs like Chandrayaan?",
    options: ["Deep Space Network (DSN) S-band", "Ultra-wide band WiFi", "Standard LORAN range", "Microwave Satellite WiMAX"],
    correctOptionIndex: 0,
    explanation: "Chandrayaan missions communicate using S-band and X-band microwave frequencies routed through ISRO's Deep Space Network."
  },
  {
    id: "tec_4",
    category: QuizCategory.TECHNOLOGY,
    questionText: "Who is the Indian inventor who designed the popular Universal Serial Bus (USB) data standard inside Intel?",
    options: ["Ajay Bhatt", "Vinod Dham", "Raj Reddy", "Sabeer Bhatia"],
    correctOptionIndex: 0,
    explanation: "Ajay Bhatt led the team that created the USB standard, which revolutionized computer device connections."
  },

  // GEOGRAPHY
  {
    id: "geo_1",
    category: QuizCategory.GEOGRAPHY,
    questionText: "What is the highest mountain peak located entirely within the territory of India?",
    options: ["Kanchenjunga", "Nanda Devi", "Mount Everest", "K2 (Godwin-Austen)"],
    correctOptionIndex: 0,
    explanation: "Kanchenjunga (8,586 m) is the highest peak in India, situated on the border between Sikkim and Nepal."
  },
  {
    id: "geo_2",
    category: QuizCategory.GEOGRAPHY,
    questionText: "Which is the largest cold desert region in India?",
    options: ["Thar Desert", "Ladakh", "Spiti Valley", "Rann of Kutch"],
    correctOptionIndex: 1,
    explanation: "Ladakh is India's largest and most famous high-altitude cold desert, situated rain-shadowed by Mt. Himalayas."
  },
  {
    id: "geo_3",
    category: QuizCategory.GEOGRAPHY,
    questionText: "The Majuli island, recognized as the world's largest freshwater river island, is set in which major river?",
    options: ["Ganga", "Brahmaputra", "Godavari", "Narmada"],
    correctOptionIndex: 1,
    explanation: "Majuli is a lush river island situated in the Brahmaputra River in Assam, famous for its neo-Vaishnavite culture."
  },
  {
    id: "geo_4",
    category: QuizCategory.GEOGRAPHY,
    questionText: "Which narrow channel of water separates India from Lanka?",
    options: ["Ten Degree Channel", "Palk Strait", "English Channel", "Drake Passage"],
    correctOptionIndex: 1,
    explanation: "The Palk Strait is a narrow strait of sea between Tamil Nadu state of India and Mannar district of Sri Lanka."
  },

  // GENERAL KNOWLEDGE
  {
    id: "gen_1",
    category: QuizCategory.GENERAL_KNOWLEDGE,
    questionText: "What is the motto featured below the Ashoka lions in India's National Emblem?",
    options: ["Satyameva Jayate", "Vande Mataram", "Jai Hind", "Inquilab Zindabad"],
    correctOptionIndex: 0,
    explanation: "'Satyameva Jayate' (Truth alone triumphs) is a sacred Sanskrit mantra taken from the Mundaka Upanishad."
  },
  {
    id: "gen_2",
    category: QuizCategory.GENERAL_KNOWLEDGE,
    questionText: "Who is the legendary ancient physician known as the 'Father of Indian Surgery'?",
    options: ["Patandjali", "Charaka", "Sushruta", "Dhanvantari"],
    correctOptionIndex: 2,
    explanation: "Sushruta composed the Sushruta Samhita, describing Rhinoplasty, ophthalmic operations, and over 120 surgical implements in ancient India."
  },
  {
    id: "gen_3",
    category: QuizCategory.GENERAL_KNOWLEDGE,
    questionText: "What is the national aquatic animal of India, inhabiting clean river segments?",
    options: ["Ganges River Dolphin", "Olive Ridley Sea Turtle", "Gharial Crocodile", "Dugong (Sea Cow)"],
    correctOptionIndex: 0,
    explanation: "The Ganges River Dolphin represents India's national aquatic animal, signifying the vital health of river ecosystems."
  },
  {
    id: "gen_4",
    category: QuizCategory.GENERAL_KNOWLEDGE,
    questionText: "Which is the official language system for standard administrative decrees of the Central Indian Union?",
    options: ["Hindi and English", "Sanskrit", "Tamil only", "Bengali"],
    correctOptionIndex: 0,
    explanation: "According to Article 343, Hindi written in Devanagari script and English serve as official working languages of the Union."
  }
];
