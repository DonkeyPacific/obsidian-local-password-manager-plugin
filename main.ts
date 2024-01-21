import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, addIcon } from 'obsidian';

// Remember to rename these classes and interfaces!

interface PasswordManagementSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: PasswordManagementSettings = {
	mySetting: 'default'
}

export default class PasswordManagementPlugin extends Plugin {
	settings: PasswordManagementSettings;

	async onload() {
		await this.loadSettings();
		addIcon("obsidian-password-manager", '<svg viewBox="0 0 1024 1024" width="100" height="100" fill="currentColor"><path d="M153.6 768H76.8a25.6 25.6 0 0 1-25.6-25.6v-51.2a25.6 25.6 0 0 1 25.6-25.6h76.8v-102.4H76.8a25.6 25.6 0 0 1-25.6-25.6v-51.2a25.6 25.6 0 0 1 25.6-25.6h76.8v-102.4H76.8a25.6 25.6 0 0 1-25.6-25.6V281.6a25.6 25.6 0 0 1 25.6-25.6h76.8V153.6A102.4 102.4 0 0 1 256 51.2h614.4a102.4 102.4 0 0 1 102.4 102.4v716.8a102.4 102.4 0 0 1-102.4 102.4H256a102.4 102.4 0 0 1-102.4-102.4V768z m512-296.96V409.6a102.4 102.4 0 0 0-204.8 0v61.44h-10.24A40.96 40.96 0 0 0 409.6 512v163.84c0 22.624 18.336 40.96 40.96 40.96h225.28a40.96 40.96 0 0 0 40.96-40.96V512a40.96 40.96 0 0 0-40.96-40.96h-10.24z m-102.4-112.64a51.2 51.2 0 0 1 51.2 51.2v61.44H512V409.6a51.2 51.2 0 0 1 51.2-51.2z m-25.6 204.8h51.2v102.4h-51.2v-102.4z" p-id="5357"></path></svg>');
		
		this.addRibbonIcon('obsidian-password-manager-ribbon', 'Password Manager', (evt: MouseEvent) => {
			new Notice('This is a notice!');
		}).addClass('my-plugin-ribbon-class');
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: PasswordManagementPlugin;

	constructor(app: App, plugin: PasswordManagementPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
