import * as path from "path";
import * as isbinaryfile from "isbinaryfile";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { QuickPickItem, window, workspace } from 'vscode';

const CONFIG = vscode.workspace.getConfiguration();
const LIMIT = CONFIG.get<number>("fuzzily.resultLimit");

const cwd = workspace.workspaceFolders?.[0].uri.fsPath;
if (!cwd) {
	window.showErrorMessage("No workspace found");
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let fileFinder = vscode.commands.registerCommand('fuzzily.fzf', async () => {
		const query = await window.showInputBox({
			placeHolder: "Search for...",
			ignoreFocusOut: true
		});
		await findItems(query!);
		// window.showInformationMessage("Searching...");
	});

	context.subscriptions.push(fileFinder);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log("Deactivating fuzzily");
}


async function findItems(query: string) {
	// console.log("Searching for", query);
	// return;
	const queryParts = query.split(" ").map(part => {
		let caseInsensitive = "";
		for (let i = 0; i < part.length; i++) {
			const char = part[i];
			caseInsensitive += (char.match(/[a-zA-Z]/)) ? `[${char.toLowerCase()}${char.toUpperCase()}]` : char;
		}
		return caseInsensitive;
	});
	var searchQuery = "**/**" + queryParts.join("**/**/**") + "**";
	const results = (await vscode.workspace.findFiles(searchQuery, `**/node_modules/**`, LIMIT)).map(uri => vscode.workspace.asRelativePath(uri));
	
	// If results are empty, show a message and return
	if (results.length === 0) {
		window.showInformationMessage("No results found");
		return;
	}

	const options: QuickPickItemWithPath[] = results.map(result => {
		const filename = path.basename(result);
		const dirname = path.dirname(result);
		return {
			label: filename,
			description: dirname,
			path: result
		};
	});
	const selection = await window.showQuickPick(options, {
		placeHolder: "Select a file...",
		ignoreFocusOut: true
	});
	if (!selection) {
		return;
	}
	//Open the selected file in the editor, but only relative path is given
	const file = vscode.Uri.file(path.join(cwd!, selection.path!));

	isbinaryfile.isBinaryFile(file.fsPath).then((isBinary) => {
		if (isBinary) {
			vscode.env.openExternal(vscode.Uri.file(file.fsPath));
		} else {
			window.showTextDocument(file);
		}
	});

}

interface QuickPickItemWithPath extends QuickPickItem {
	path: string;
}