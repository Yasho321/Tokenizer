export const TOKEN_TYPES = {
  WORD: 'word',
  NUMBER: 'number', 
  PUNCTUATION: 'punctuation',
  WHITESPACE: 'whitespace',
  SPECIAL: 'special'
};

/**
 * Determines the type of a character
 * @param {string} char - Single character
 * @returns {string} Token type
 */
function getCharType(char) {
  if (/[a-zA-Z]/.test(char)) return TOKEN_TYPES.WORD;
  if (/[0-9]/.test(char)) return TOKEN_TYPES.NUMBER;
  if (/\s/.test(char)) return TOKEN_TYPES.WHITESPACE;
  if (/[.,!?;:'"()-]/.test(char)) return TOKEN_TYPES.PUNCTUATION;
  return TOKEN_TYPES.SPECIAL;
}

/**
 * Tokenizes text into an array of tokens with metadata
 * @param {string} text - Input text to tokenize
 * @returns {Array} Array of token objects
 */
export function tokenize(text) {
  if (!text) return [];

  const tokens = [];
  let currentToken = '';
  let currentType = null;
  let startIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charType = getCharType(char);

    if (currentType === null) {
      // Start new token
      currentToken = char;
      currentType = charType;
      startIndex = i;
    } else if (currentType === charType) {
      // Continue current token
      currentToken += char;
    } else {
      // Finish current token and start new one
      tokens.push({
        text: currentToken,
        type: currentType,
        start: startIndex,
        end: i - 1
      });

      currentToken = char;
      currentType = charType;
      startIndex = i;
    }
  }

  // Add final token
  if (currentToken) {
    tokens.push({
      text: currentToken,
      type: currentType,
      start: startIndex,
      end: text.length - 1
    });
  }

  return tokens;
}

/**
 * Vocabulary management using localStorage
 */
export class Vocabulary {
  constructor() {
    this.storageKey = 'tokenizer-vocabulary';
    this.vocabulary = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.vocabulary));
    } catch {
      // Handle storage errors silently
    }
  }

  getTokenId(tokenText) {
    if (!(tokenText in this.vocabulary)) {
      // Assign new ID (starting from 1)
      const maxId = Math.max(0, ...Object.values(this.vocabulary));
      this.vocabulary[tokenText] = maxId + 1;
      this.saveToStorage();
    }
    return this.vocabulary[tokenText];
  }

  getTokenText(id) {
    const entry = Object.entries(this.vocabulary).find(([, tokenId]) => tokenId === id);
    return entry ? entry[0] : '[UNK]';
  }

  reset() {
    this.vocabulary = {};
    this.saveToStorage();
  }

  get size() {
    return Object.keys(this.vocabulary).length;
  }

  get allTokens() {
    return Object.keys(this.vocabulary);
  }
}

/**
 * Encodes tokens into IDs
 * @param {Array} tokens - Array of token objects
 * @param {Vocabulary} vocabulary - Vocabulary instance
 * @returns {Array} Array of token objects with IDs
 */
export function encode(tokens, vocabulary) {
  return tokens.map(token => ({
    ...token,
    id: vocabulary.getTokenId(token.text)
  }));
}

/**
 * Decodes IDs back to text
 * @param {Array} ids - Array of token IDs
 * @param {Vocabulary} vocabulary - Vocabulary instance
 * @returns {string} Decoded text
 */
export function decode(ids, vocabulary) {
  return ids.map(id => vocabulary.getTokenText(id)).join('');
}

/**
 * Calculates statistics from tokens
 * @param {Array} tokens - Array of token objects
 * @param {string} originalText - Original input text
 * @param {Vocabulary} vocabulary - Vocabulary instance
 * @returns {Object} Statistics object
 */
export function calculateStats(tokens, originalText, vocabulary) {
  const stats = {
    totalTokens: tokens.length,
    words: 0,
    numbers: 0,
    punctuation: 0,
    whitespace: 0,
    special: 0,
    characters: originalText.length,
    charactersWithoutSpaces: originalText.replace(/\s/g, '').length,
    vocabularySize: new Set(tokens.map(t => t.text)).size,
    totalVocabularySize: vocabulary.size
  };

  tokens.forEach(token => {
    stats[token.type]++;
  });

  return stats;
}