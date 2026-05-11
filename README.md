# obsidian-llm

> The only Obsidian-AI plugin that doesn't require a vendor account.

**Status:** v0.1 — ready to use.

**Sovereignty:** sovereign-by-construction. Works with local Ollama. No cloud required.

---

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Obsidian      │────▶│  obsidian-   │────▶│   Ollama /      │
│   vault         │     │   llm        │     │   OpenRouter    │
│  (markdown      │     │  (TS plugin) │     │   / any LLM     │
│   notes)        │     └──────────────┘     └─────────────────┘
└─────────────────┘            │
                               ▼
                        ┌──────────────┐
                        │  Chat panel  │
                        │  Summarize   │
                        │  note        │
                        └──────────────┘
```

## What this is

Chat with your vault using any LLM endpoint. Ollama by default. No API keys required for local use. No subscription. Just your notes and your model.

## What this isn't

- Not a RAG system in v0.1 (full vault search comes in v0.5)
- Not a cloud sync service
- Not affiliated with Obsidian

---

## Install

1. Download `main.js` and `manifest.json` from the latest release.
2. Copy them to `.obsidian/plugins/obsidian-llm/` in your vault.
3. Enable the plugin in Obsidian Settings → Community Plugins.

## Build from source

```bash
git clone https://github.com/sovereign-shovels/obsidian-llm.git
cd obsidian-llm
npm install
npm run build
```

## Usage

- **Chat with LLM:** Open command palette → "Chat with LLM"
- **Summarize note:** Open command palette → "Summarize current note"
- **Configure:** Settings → Obsidian LLM → set endpoint, model, API key

Default endpoint: `http://localhost:11434/v1/chat/completions` (Ollama)

**Verified:** `npm run build` compiles cleanly with `tsc`. Install `main.js` + `manifest.json` into `.obsidian/plugins/obsidian-llm/` to use.

---

## License

Apache 2.0. See [LICENSE](./LICENSE).

## Part of sovereign-shovels

This repo is part of the [sovereign-shovels](https://github.com/sovereign-shovels) portfolio.
