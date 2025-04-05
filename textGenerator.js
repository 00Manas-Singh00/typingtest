const words = {
  nouns: [
    'forest', 'mountain', 'river', 'ocean', 'sky', 'star', 'moon', 'sun', 'cloud', 'tree',
    'flower', 'bird', 'fish', 'animal', 'person', 'city', 'house', 'book', 'computer', 'phone',
    'car', 'bike', 'road', 'path', 'garden', 'desert', 'island', 'beach', 'valley', 'cave'
  ],
  verbs: [
    'run', 'walk', 'jump', 'swim', 'fly', 'dance', 'sing', 'play', 'write', 'read',
    'think', 'dream', 'create', 'build', 'grow', 'change', 'move', 'travel', 'explore', 'discover',
    'learn', 'teach', 'help', 'work', 'rest', 'sleep', 'wake', 'eat', 'drink', 'laugh'
  ],
  adjectives: [
    'beautiful', 'mysterious', 'ancient', 'modern', 'bright', 'dark', 'quiet', 'loud', 'fast', 'slow',
    'happy', 'sad', 'brave', 'shy', 'strong', 'weak', 'smart', 'funny', 'serious', 'kind',
    'wild', 'calm', 'colorful', 'plain', 'simple', 'complex', 'soft', 'hard', 'smooth', 'rough'
  ],
  adverbs: [
    'quickly', 'slowly', 'carefully', 'happily', 'sadly', 'bravely', 'shyly', 'strongly', 'weakly', 'smartly',
    'funnily', 'seriously', 'kindly', 'wildly', 'calmly', 'colorfully', 'plainly', 'simply', 'complexly', 'softly'
  ],
  conjunctions: ['and', 'but', 'or', 'so', 'because', 'while', 'although', 'since', 'unless', 'until'],
  prepositions: ['in', 'on', 'at', 'by', 'with', 'to', 'from', 'of', 'about', 'through'],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  symbols: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '"', "'", ',', '.', '<', '>', '/', '?', '\\', '|'],
  codeKeywords: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'try', 'catch', 'throw', 'new', 'this', 'super', 'extends', 'implements', 'interface', 'type', 'enum', 'namespace', 'module', 'require', 'default', 'async', 'await', 'promise', 'resolve', 'reject', 'then', 'catch', 'finally']
};

function getRandomWord(type) {
  const wordList = words[type];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function generateSentence() {
  const sentenceTypes = [
    // Simple sentence
    () => `${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('adverbs')}.`,
    // Compound sentence
    () => `${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('adverbs')} ${getRandomWord('conjunctions')} ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')}.`,
    // Complex sentence
    () => `While ${getRandomWord('nouns')} ${getRandomWord('verbs')}, ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('adverbs')}.`,
    // Prepositional phrase sentence
    () => `${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('prepositions')} the ${getRandomWord('adjectives')} ${getRandomWord('nouns')}.`
  ];

  const randomType = Math.floor(Math.random() * sentenceTypes.length);
  return sentenceTypes[randomType]();
}

function generateParagraph() {
  const sentences = [];
  const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-5 sentences per paragraph
  
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  
  return sentences.join(' ');
}

function generateHardSentence() {
  const sentenceTypes = [
    // Complex sentence with multiple clauses
    () => `While ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('adverbs')}, ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('prepositions')} the ${getRandomWord('adjectives')} ${getRandomWord('nouns')}, ${getRandomWord('conjunctions')} ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')}.`,
    // Long compound sentence
    () => `${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('adverbs')} ${getRandomWord('conjunctions')} ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('prepositions')} the ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('conjunctions')} ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')}.`,
    // Sentence with multiple adjectives
    () => `${getRandomWord('adjectives')}, ${getRandomWord('adjectives')}, and ${getRandomWord('adjectives')} ${getRandomWord('nouns')} ${getRandomWord('verbs')} ${getRandomWord('adverbs')} ${getRandomWord('prepositions')} the ${getRandomWord('adjectives')} ${getRandomWord('nouns')}.`
  ];

  const randomType = Math.floor(Math.random() * sentenceTypes.length);
  return sentenceTypes[randomType]();
}

function generateNumbersParagraph() {
  const numbers = [];
  const length = Math.floor(Math.random() * 50) + 50; // 50-100 numbers
  for (let i = 0; i < length; i++) {
    numbers.push(getRandomWord('numbers'));
  }
  return numbers.join(' ');
}

function generateSymbolsParagraph() {
  const symbols = [];
  const length = Math.floor(Math.random() * 50) + 50; // 50-100 symbols
  for (let i = 0; i < length; i++) {
    symbols.push(getRandomWord('symbols'));
  }
  return symbols.join(' ');
}

function generateCodeParagraph() {
  const codeLines = [];
  const lineCount = Math.floor(Math.random() * 5) + 3; // 3-7 lines
  for (let i = 0; i < lineCount; i++) {
    const lineType = Math.floor(Math.random() * 3);
    switch (lineType) {
      case 0: // Function declaration
        codeLines.push(`function ${getRandomWord('codeKeywords')}(${getRandomWord('codeKeywords')}) {`);
        break;
      case 1: // Variable declaration
        codeLines.push(`const ${getRandomWord('codeKeywords')} = ${getRandomWord('codeKeywords')};`);
        break;
      case 2: // Control structure
        codeLines.push(`if (${getRandomWord('codeKeywords')}) {`);
        break;
    }
  }
  return codeLines.join('\n');
}

function generateUniqueParagraph(mode = 'normal') {
  let paragraph;
  switch (mode) {
    case 'hard':
      paragraph = generateHardSentence();
      break;
    case 'numbers':
      paragraph = generateNumbersParagraph();
      break;
    case 'symbols':
      paragraph = generateSymbolsParagraph();
      break;
    case 'code':
      paragraph = generateCodeParagraph();
      break;
    default:
      paragraph = generateParagraph();
  }

  // Ensure the paragraph is between 100-200 characters
  while (paragraph.length < 100 || paragraph.length > 200) {
    switch (mode) {
      case 'hard':
        paragraph = generateHardSentence();
        break;
      case 'numbers':
        paragraph = generateNumbersParagraph();
        break;
      case 'symbols':
        paragraph = generateSymbolsParagraph();
        break;
      case 'code':
        paragraph = generateCodeParagraph();
        break;
      default:
        paragraph = generateParagraph();
    }
  }
  return paragraph;
} 