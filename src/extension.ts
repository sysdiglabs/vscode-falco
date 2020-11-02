// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { monitorEventLoopDelay } from 'perf_hooks';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-falco.validateRule', async () => {
		// The code you place here will be executed every time your command is executed
		var vscode = require("vscode");
		var path = require("path");
		var currentlyOpenTabFilePath = vscode.window.activeTextEditor.document.fileName;
		var cotfn = path.basename(currentlyOpenTabFilePath);
		var cotfp = path.dirname(currentlyOpenTabFilePath);

		const ruleContainerExport = 'eval $(docker-machine env default)';
		const ruleValidatorCmd = `docker run -v ${cotfp}:/rule --rm falcosecurity/falco-no-driver:latest falco -V ./rule/${cotfn} > validaterule.out`;
		const ruleRemoveResultCmd = 'rm -f validaterule.out';
		
		const terminal = vscode.window.createTerminal(`Rule Validation`);
		terminal.sendText(ruleContainerExport);
		terminal.sendText(ruleRemoveResultCmd);
		terminal.sendText(ruleValidatorCmd);

		const uri = vscode.Uri.parse(`${cotfp}/validaterule.out`);

		let existe = false;
		let texto = '';
		while (!existe) {
			try {
				await vscode.workspace.fs.stat(uri);
				//texto = vscode.window.showTextDocument(uri, { viewColumn: vscode.ViewColumn.Beside });
				let f = await vscode.workspace.fs.readFile(uri);
				texto = await f.toString();
				if (texto!='') existe = true;
			} catch {
				existe = false;
			}
		}
		terminal.sendText(ruleRemoveResultCmd);
		if (texto.trim()=='Ok') {
			vscode.window.showInformationMessage(texto);
		} else {
			vscode.window.showErrorMessage(texto);
		}
		//let r = vscode.workspace.getConfiguration('falcoRules').get('editor.background');
	});

	// Detects change in the extension configuration.
	vscode.workspace.onDidChangeConfiguration(event => {
		//vscode.window.showInformationMessage('BANG!');
    });

	let hoverDisp = vscode.languages.registerHoverProvider('rules', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
			const word = document.getText(range);
			let val = '';
			let ok = true;
			switch (word) {
				case 'rule':
					val = 'The conditions under which an alert should be generated. A rule is accompanied by a descriptive output string that is sent with the alert.\n\nFormat:\n- rule: A short, unique name for the rule.\n\nConvention: all initials capitalized.\n\nRequired';
					break;
				case 'list':
					val = 'Collection of items that can be included in rules, macros, or other lists. Unlike rules and macros, lists cannot be parsed as filtering expressions.\n\nFormat:\n- list: A short, unique name for the list.\n\nRequired';
					break;
				case 'items':
					val = 'The list of values.\n\nInline format:\n  items: [item1, item2, ...]\n\nMultiline format:\n  items:\n    - item1\n    - item2\n      ...';
					break;
				case 'macro':
					val = 'Rule condition snippets that can be re-used inside rules and even other macros. Macros provide a way to name common patterns and factor out redundancies in rules.';
					break;
				case 'condition':
					val = 'A filtering expression that is applied against events to check whether they match the rule.\n\nRequired';
					break;
				case 'desc':
					val = 'A longer description of what the rule detects.\n\nFormat:\n\n  desc: Rule description.\n\nConvention: Begins with \'Detect\' and ends with full stop.\n\nRequired';
					break;
				case 'output':
					val = 'Specifies the message that should be output if a matching event occurs, following the Sysdig output format syntax.\n\nRequired';
					break;
				case 'priority':
					val = 'A case-insensitive representation of the severity of the event. Should be one of the following: EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, NOTICE, INFO, DEBUG.\n\nRequired';
					break;
				case 'enabled':
					val = 'If set to false, a rule is neither loaded nor matched against any events.\n\nDefault: true';
					break;
				case 'append':
					val = 'If set to true, the rule/list/macro will be appended to an existing rule/list/macro with the same name.\n\nWhen appending lists, items are added to the end of the list. When appending rules/macros, the additional text is appended to the condition: field of the rule/macro.\n\nDefault: false';
					break;
				case 'tags':
					val = 'A list of tags applied to the rule.\n\nInline format:\n  tags: [tag1, tag2, ...]\n\nMultiline format:\n  tags:\n    - tag1\n    - tag2\n      ...';
					break;
				case 'warn_evttypes':
					val = 'If set to false, Falco suppresses warnings related to a rule not having an event type.\n\nDefault: true';
					break;
				case 'skip-if-unknown-filter':
					val = 'If set to true, if a rule conditions contains a filtercheck, e.g. fd.some_new_field, that is not known to this version of Falco, Falco silently accepts the rule but does not execute it; if set to false, Falco repots an error and exists when finding an unknown filtercheck.\n\nDefault: false.';
					break;
				case 'source':
					val = 'Falco can consume events from different sources, and apply rules to these events to detect abnormal behavior. Currently Falco supports the following event sources: syscall, k8s_audit.';
					break;
				case 'EMERGENCY':
					val = 'An emergency condition.';
					break;
				case 'ALERT':
					val = 'An alert condition.';
					break;
				case 'CRITICAL':
					val = 'A critical condition.';
					break;
				case 'ERROR':
					val = 'An error condition. Typically a rule related to writing state (i.e. filesystem, etc.)';
					break;
				case 'WARNING':
					val = 'A warning condition. Typically a rule related to an unauthorized read of state (i.e. reading sensitive filees, etc.)';
					break;
				case 'NOTICE':
					val = 'A notice condition. Typically a rule related to unexpected behavior (spawning an unexpected shell in a container, opening an unexpected network connection, etc.)';
					break;
				case 'INFO':
					val = 'An info condition. Typically a rule related to behaving against good practices (unexpected privileged containers, containers with sensitive mounts, running interactive commands as root)';
					break;
				case 'DEBUG':
					val = 'A debug event.';
					break;
				default:
					ok = false;
					break;
			}
			if (ok) {
				return new vscode.Hover({
					language: "Rule",
					value: val
				});
			}
        }
	});

	context.subscriptions.push(disposable, hoverDisp);
}

// this method is called when your extension is deactivated
export function deactivate() {}
