// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "language-recommend-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	let disposable = vscode.commands.registerCommand('language-recommend-extension.get-recommend', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		var nowLanguage = vscode.window.activeTextEditor?.document.languageId
		if (nowLanguage != undefined) {
			let ii: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("recommended-extensions-for-each-language")
			let myExtension = ii.get<string>(nowLanguage)
			if (myExtension != undefined) {
				
				// const quickPick = vscode.window.createQuickPick();
				// quickPick.items = Object.values(myExtension).map(label => ({ label }));
				// quickPick.;
				// quickPick.onDidHide(() => quickPick.dispose());
				// quickPick.show();
				
				for (var i = 0; i < myExtension.length; i++){
					await vscode.window.showInformationMessage("enable extension " + myExtension[i] + "?","ok","cancel")
						.then(async function (res) {
							if (res == "ok") {
								if (myExtension != undefined) {
									await vscode.commands.executeCommand("workbench.extensions.search", myExtension[i])
									//await vscode.commands.executeCommand("workbench.extensions.installExtension", myExtension[i])
								}
								
							}
							
						})
					//await vscode.commands.executeCommand("workbench.extensions.search", myExtension[i]);
				}
			}
		}



	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
