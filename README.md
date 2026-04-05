# Read-y

> **Boils down the Web into pure Markdown. Ready to Yank.**

**Read-y** (pronounced /ˈriːdi/) — A portmanteau of **Read**able, **Ready** to yank, and the spirit of a **Leady** partner for AI.

## 💡 Concept

1.  **Context Ready**: Transform any webpage into LLM-readable Markdown with a single click, optimizing it for high-quality AI prompts.
2.  **Read-y (Readable + Yank)**: A literal implementation of its name—cleaning the DOM with `Readability.js` and immediately **yanking** (copying) the content to your clipboard.
3.  **Leady**: A partner tool designed to **lead** AI models toward more accurate responses by providing high-fidelity, noise-free context.

## 🚀 Features

- **Semantic Extraction**: Leverages `Readability.js` to strip away ads, navigation bars, and sidebars, preserving only the essential semantic content.
- **Markdown Conversion**: Uses `turndown.js` to transform sanitized HTML into clean, structured Markdown—optimizing token usage for LLMs.
- **Zero-Footprint & Private**: Absolutely no data collection or tracking. Safely process sensitive documents, such as vulnerability reports or internal memos, entirely within your local environment.
- **One-Click Yank**: Instantly copies processed text to the clipboard, making it ready to be pasted into ChatGPT, Gemini, or Claude without manual formatting.

## 🛠 Architecture

Read-y builds a robust pipeline to extract "what you see" without breaking the document's semantic structure.

1.  **Readability.js**: Analyzes the DOM to extract the "Main Content" segment and generates sanitized, semantic HTML.
2.  **Turndown.js**: Converts the sanitized HTML into a lean, structural Markdown format.
3.  **Clipboard API**: Automatically yanks the final Markdown to the system clipboard.

## 🛡 Privacy Policy

- **Zero Data Collection**: We do not collect, store, or monitor your browsing history, inputs, or generated Markdown.
- **100% Local Processing**: All processing occurs strictly within the browser's sandbox environment on your machine.
- **No External Communications**: The extension makes zero network requests to external servers.

---

Developed with ❤️ for a cleaner web context.
