# obsidian-llm

> The only Obsidian-AI plugin that doesn't require a vendor account.

**Status:** v0.1 — ready to use.

**Sovereignty:** sovereign-by-construction. Works with local Ollama. No cloud required.

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

---

## License

Apache 2.0. See [LICENSE](./LICENSE).

## Part of sovereign-shovels

This repo is part of the [sovereign-shovels](https://github.com/sovereign-shovels) portfolio.
