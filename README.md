# Tokenizer — Web Demo

A tiny browser-first tokenizer that learns a vocab, encodes text → token IDs, and decodes IDs → text.
Demo: **\[[Link](https://tokenizer-gamma.vercel.app/)]** · 



## Quick Setup

**No setup required.** Open the demo link in a modern browser.
To run locally (optional):

```bash
git clone <repo-url>
cd tokenizer-app
npm install
npm run dev
```

## How to use

1. Paste or type text in the **Input** panel.
2. Right panel shows tokens + assigned IDs.
3. Click **Copy IDs**, paste the comma-separated IDs into **Decode**.
4. Decoded text appears below.

## Features

* Rule-based tokenization (word/number/punctuation/whitespace/special)
* On-the-fly vocabulary with persistent `localStorage` IDs
* Encode (text → IDs) and Decode (IDs → text) round-trip
* Example inputs, reset vocabulary, copy to clipboard

## Notes

* Decoding expects valid IDs for the *current* vocabulary (resetting vocab changes IDs).
* `localStorage` required for persistence.
* To improve: add subword/BPE tokenization and O(1) reverse lookups.

## Examples / Screenshots

* Tokenization view: ![Tokenization image](./src/assets/Screenshot%202025-08-12%20190852.png)
* Decode round-trip: ![Decoding Image](./src/assets/Screenshot%202025-08-12%20191025.png)



