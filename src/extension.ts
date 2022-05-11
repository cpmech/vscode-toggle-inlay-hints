// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const COMMAND = 'vscode-toggle-inlay-hints.doToggle';
const SETTING = 'editor.inlayHints.enabled';

const isEnabled = () => {
  const config = vscode.workspace.getConfiguration();
  const status = config.get(SETTING);
  return status === 'on' || status === true ? true : false;
};

const statusText = () => isEnabled() ? 'InlayHints: $(check)' : 'InlayHints: $(x)';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Status bar item
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -3);
  item.command = COMMAND;
  item.tooltip = 'Toggle Inlay Hints';
  item.text = statusText();
  item.show();
  context.subscriptions.push(item);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const command = vscode.commands.registerCommand(COMMAND, () => {
    const config = vscode.workspace.getConfiguration();
    const newText = isEnabled() ? 'off' : 'on';
    // the following will trigger the onDidChangeConfiguration to update the status bar
    config.update(SETTING, newText, vscode.ConfigurationTarget.Global);
	});
	context.subscriptions.push(command);

  // Listener (must be after command, apparently)
  const listener = vscode.workspace.onDidChangeConfiguration(() => item.text = statusText());
  context.subscriptions.push(listener);
}

// this method is called when your extension is deactivated
export function deactivate() {}
