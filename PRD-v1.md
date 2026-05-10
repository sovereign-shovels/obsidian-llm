---
repo: obsidian-llm
rank: 10
score: 0.59
sprint: 4
substrate_anchor: Obsidian
build_estimate: "3–4 weeks for v0.1"
status: planned
---

# PRD v1.0 — obsidian-llm

> **One-liner:** The only Obsidian-AI plugin that doesn't require a vendor account.
>
> **Substrate:** Obsidian / Logseq selfhost crowd who want AI without vendor lock-in
> **Launch channels:** r/ObsidianMD, r/logseq, r/PKMS, Obsidian community forums, HN
> **Build estimate (v0.1):** 3–4 weeks for v0.1

---

## What problem does this solve

Every Obsidian AI plugin requires you to bring an Anthropic key, an OpenAI key, or sign up for a paid service. The Obsidian community prides itself on self-hosting, sovereignty, and local-first computing. obsidian-llm is the plugin that respects that — works fully with local Ollama, accepts any OpenAI-compatible endpoint, never indexes your vault to anyone.

## Why this is a shovel and not a product

Sovereignty IS the differentiator in this space. Obsidian's existing AI plugins are all vendor-locked. Buildable. Scope-evolves into Logseq support, smart connections, embedded chat.

---

## v0.1 — what ships

Obsidian community plugin. BYO endpoint (Ollama, Claude, GPT, anything OpenAI-compatible). Two-way sync between vault notes and AI conversation logs. Summarize, ask-vault-questions, generate-from-context.

### Acceptance criteria for v0.1

A v0.1 release is publishable to GitHub when ALL of these are true:

- [ ] Core functionality described above works on the primary developer machine.
- [ ] At least one local-only configuration is documented and tested (no cloud required).
- [ ] BYO endpoint / BYO key configuration is documented.
- [ ] README explains: what it is, who it's for, how to install, how to configure, what it doesn't do.
- [ ] LICENSE present (Apache 2.0 unless overridden).
- [ ] No hardcoded keys or vendor URLs anywhere.
- [ ] No telemetry / phone-home.
- [ ] At least one passing test for the main code path.
- [ ] CI green.
- [ ] AGENTS.md compliance reviewed.

## v0.5 — first major evolution

Logseq adapter. Smart connections (graph-aware AI suggestions). Custom prompt templates per vault folder.

## v1.0 — fuller scope

Multi-vault federation. Embedded conversational interface inside the vault graph view.

---

## Architecture sketch

### Stack

Standard Obsidian plugin (TS). API client supports any OpenAI-compatible endpoint. Streaming via SSE. Conversation logs stored as vault markdown.

### Provider abstraction

The shovel MUST expose a provider abstraction even if v0.1 only uses one
provider. Suggested shape:

```
interface Provider {
  name: string;
  endpoint: URL;
  apiKeyEnvVar: string;
  call(input: ProviderInput): Promise<ProviderOutput>;
}
```

The default config in v0.1 must point to a free, local provider where
applicable, and document how to swap in any other.

### Configuration

Configuration order of precedence (highest to lowest):

1. Command-line flags
2. Environment variables (prefix: `OBSIDIAN_LLM_*`)
3. User config file (`~/.config/obsidian-llm/config.toml` on Linux/Mac, equivalent on Windows)
4. Default config (shipped, but never with secrets)

---

## Anti-scope (do NOT build)

Not a replacement for Obsidian. Not a writing assistant. Not a graph-rendering tool. AI integration only.

---

## Tombstone risk and mitigation

**Risk:** Existing Obsidian AI plugins (Smart Connections, Copilot for Obsidian) shipping sovereign mode. Possible — the differentiator is ONLY sovereignty.

**Mitigation:** Ship fast (v0.1 in 3–4 weeks for v0.1). Build community early
(launch on r/ObsidianMD, r/logseq, r/PKMS, Obsidian community forums, HN). Even if upstream absorbs the feature, accumulated
stars and the community are the audience-build payoff.

**Kill signal:** Obsidian themselves shipping a first-party AI feature. Watch their roadmap.

If the kill signal triggers, the maintainer must announce within one week and
either (a) refocus on a remaining gap, (b) merge gracefully into upstream if
they're receptive, or (c) mark the repo as archived with a clear pointer to the
replacement.

---

## Launch plan

### Pre-launch checklist

- [ ] Repo on GitHub at `github.com/sovereign-shovels/obsidian-llm`
- [ ] README polished (see template in `_templates/`)
- [ ] At least 3 issues / discussions seeded (real ones, not placeholder)
- [ ] LICENSE, CODE_OF_CONDUCT, CONTRIBUTING present
- [ ] Demo asset (gif, screenshot, or short video — depending on category)
- [ ] First-launch post drafted for primary launch channel

### Day-1 launch

Post to: r/ObsidianMD, r/logseq, r/PKMS, Obsidian community forums, HN

Subject template (adjust per channel):
- Show HN: `Show HN: obsidian-llm – The only Obsidian-AI plugin that doesn't require a vendor account.`
- Reddit: `[OSS] The only Obsidian-AI plugin that doesn't require a vendor account.` with full post explaining the gap and the build
- Twitter/X: thread leading with the demo gif

### Week-1 follow-up

- Respond to every issue and comment within 24h.
- Ship at least one bugfix release based on launch feedback.
- Cross-post to secondary channels.

### Month-1 review

- Assess star velocity and community formation.
- If kill signal triggered, follow tombstone protocol above.
- If trajectory is healthy, plan v0.5.

---

## Cross-references

- Constitution: [[AGENTS]]
- Public README: [[README]]
- Progress frontmatter: [[progress]]
- Internal knowledge graph: [[knowledge-graph]]
