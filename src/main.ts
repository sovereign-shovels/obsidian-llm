import { App, Modal, Plugin, PluginSettingTab, Setting, Notice } from "obsidian";

interface ObsidianLLMSettings {
  endpoint: string;
  model: string;
  apiKey: string;
}

const DEFAULT_SETTINGS: ObsidianLLMSettings = {
  endpoint: "http://localhost:11434/v1/chat/completions",
  model: "llama3.2",
  apiKey: "",
};

export default class ObsidianLLM extends Plugin {
  settings: ObsidianLLMSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "chat-with-llm",
      name: "Chat with LLM",
      callback: () => {
        new ChatModal(this.app, this.settings).open();
      },
    });

    this.addCommand({
      id: "summarize-note",
      name: "Summarize current note",
      editorCallback: (editor) => {
        const text = editor.getValue();
        this.callLLM(`Summarize this note in 3 bullets:\n\n${text}`).then((result) => {
          new Notice("Summary generated!");
          editor.setValue(`${text}\n\n---\n\n## AI Summary\n\n${result}`);
        }).catch((e) => {
          new Notice(`Error: ${e.message}`);
        });
      },
    });

    this.addSettingTab(new ObsidianLLMSettingTab(this.app, this));
  }

  async callLLM(prompt: string): Promise<string> {
    const res = await fetch(this.settings.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.settings.apiKey ? { Authorization: `Bearer ${this.settings.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: this.settings.model,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response";
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class ChatModal extends Modal {
  settings: ObsidianLLMSettings;
  messages: { role: string; content: string }[] = [];

  constructor(app: App, settings: ObsidianLLMSettings) {
    super(app);
    this.settings = settings;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Chat with LLM" });

    const chatDiv = contentEl.createDiv({ cls: "llm-chat" });
    chatDiv.style.maxHeight = "400px";
    chatDiv.style.overflowY = "auto";
    chatDiv.style.marginBottom = "12px";

    const input = contentEl.createEl("textarea");
    input.style.width = "100%";
    input.style.height = "80px";

    const btn = contentEl.createEl("button", { text: "Send" });
    btn.onclick = async () => {
      const text = input.value;
      if (!text) return;

      this.messages.push({ role: "user", content: text });
      this.renderMessages(chatDiv);
      input.value = "";

      try {
        const res = await fetch(this.settings.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(this.settings.apiKey ? { Authorization: `Bearer ${this.settings.apiKey}` } : {}),
          },
          body: JSON.stringify({
            model: this.settings.model,
            messages: this.messages,
            stream: false,
          }),
        });
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content || "No response";
        this.messages.push({ role: "assistant", content: reply });
        this.renderMessages(chatDiv);
      } catch (e: any) {
        new Notice(`Error: ${e.message}`);
      }
    };
  }

  renderMessages(container: HTMLElement) {
    container.empty();
    for (const msg of this.messages) {
      const div = container.createDiv();
      div.style.marginBottom = "8px";
      div.style.padding = "8px";
      div.style.background = msg.role === "user" ? "#1e293b" : "#0f172a";
      div.style.borderRadius = "6px";
      div.createEl("strong", { text: msg.role === "user" ? "You: " : "AI: " });
      div.createSpan({ text: msg.content });
    }
    container.scrollTop = container.scrollHeight;
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

class ObsidianLLMSettingTab extends PluginSettingTab {
  plugin: ObsidianLLM;

  constructor(app: App, plugin: ObsidianLLM) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Obsidian LLM Settings" });

    new Setting(containerEl)
      .setName("Endpoint")
      .setDesc("OpenAI-compatible endpoint URL")
      .addText((text) =>
        text
          .setPlaceholder("http://localhost:11434/v1/chat/completions")
          .setValue(this.plugin.settings.endpoint)
          .onChange(async (value) => {
            this.plugin.settings.endpoint = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Model")
      .setDesc("Model name")
      .addText((text) =>
        text
          .setPlaceholder("llama3.2")
          .setValue(this.plugin.settings.model)
          .onChange(async (value) => {
            this.plugin.settings.model = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("API Key")
      .setDesc("Optional API key")
      .addText((text) =>
        text
          .setPlaceholder("sk-...")
          .setValue(this.plugin.settings.apiKey)
          .onChange(async (value) => {
            this.plugin.settings.apiKey = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
