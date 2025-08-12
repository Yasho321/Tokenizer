import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  tokenize, 
  encode, 
  decode, 
  calculateStats, 
  Vocabulary 
} from '../lib/tokenizer.js';

// Create vocabulary instance
const vocabulary = new Vocabulary();

export const useTokenizerStore = create(
  devtools(
    (set, get) => ({
      // State
      inputText: '',
      tokens: [],
      encodedTokens: [],
      stats: {
        totalTokens: 0,
        words: 0,
        numbers: 0,
        punctuation: 0,
        whitespace: 0,
        special: 0,
        characters: 0,
        charactersWithoutSpaces: 0,
        vocabularySize: 0,
        totalVocabularySize: 0
      },
      decodeInput: '',
      decodedText: '',
      vocabulary: vocabulary,

      // Actions
      setInputText: (text) => {
        const tokens = tokenize(text);
        const encodedTokens = encode(tokens, vocabulary);
        const stats = calculateStats(tokens, text, vocabulary);

        set({
          inputText: text,
          tokens,
          encodedTokens,
          stats
        });
      },

      clearInput: () => {
        set({
          inputText: '',
          tokens: [],
          encodedTokens: [],
          stats: {
            totalTokens: 0,
            words: 0,
            numbers: 0,
            punctuation: 0,
            whitespace: 0,
            special: 0,
            characters: 0,
            charactersWithoutSpaces: 0,
            vocabularySize: 0,
            totalVocabularySize: vocabulary.size
          }
        });
      },

      setDecodeInput: (input) => {
        set({ decodeInput: input });
        
        // Parse comma-separated IDs and decode
        try {
          const ids = input
            .split(',')
            .map(id => parseInt(id.trim()))
            .filter(id => !isNaN(id) && id > 0);
          
          const decodedText = decode(ids, vocabulary);
          set({ decodedText });
        } catch {
          set({ decodedText: '' });
        }
      },

      resetVocabulary: () => {
        vocabulary.reset();
        const { inputText } = get();
        
        // Re-tokenize with fresh vocabulary
        const tokens = tokenize(inputText);
        const encodedTokens = encode(tokens, vocabulary);
        const stats = calculateStats(tokens, inputText, vocabulary);

        set({
          tokens,
          encodedTokens,
          stats,
          decodedText: '',
          decodeInput: ''
        });
      },

      // Utility actions
      getEncodedIds: () => {
        const { encodedTokens } = get();
        return encodedTokens.map(token => token.id);
      },

      getUniqueTokensInInput: () => {
        const { tokens } = get();
        return [...new Set(tokens.map(token => token.text))];
      },

      copyToClipboard: async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch {
          return false;
        }
      },

      // Example texts for quick testing
      loadExample: (exampleText) => {
        get().setInputText(exampleText);
      }
    }),
    {
      name: 'tokenizer-store',
    }
  )
);

// Example texts
export const EXAMPLE_TEXTS = [
  "Hello, world!",
  "Chai > Coffee? Let's tokenize this.",
  "Price: 199.99 INR.",
  "The quick brown fox jumps over the lazy dog.",
  "AI models use tokens to understand text. 🤖",
  "नमस्ते! How are you today?",
  "console.log('Hello, world!');",
  "user@example.com bought 3 items for $45.99"
];