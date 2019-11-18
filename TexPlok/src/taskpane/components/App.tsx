import * as React from "react";
import SplitPane from "react-split-pane";
import { MioList } from "./mioList";
import { isOfficeInitialized } from "..";
import { MioListItemProps } from "./mioListItem";
import { openEditorWindow } from './Helper';
import { mergeStyleSets } from "@uifabric/styling";
//import { MioEditorPage } from "./mioEditorPage";
import "./SplitPane.css";
import { MioEditor } from "./mioEditor";

export interface AppProps {}
export interface AppState {
	edit: MioListItemProps[];
}

export class App extends React.Component<AppProps, AppState> {
	
	// ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

	constructor(props: AppProps) {
		super(props);
		this.state = {
			edit: new Array<MioListItemProps>(), //Number(GetURLParameter('edit'))
		}
		this.renderEditor = this.renderEditor.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderStandalone = this.renderStandalone.bind(this);
		this.onEdit = this.onEdit.bind(this);	
	}

	// ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

	//renderEditor(): JSX.Element { return (<div className={styles.editor}><MioEditorPage item={this.state.edit} /></div>); }
	renderEditor(): JSX.Element { return (<div className={styles.editor}><MioEditor edit={this.state.edit} /></div>); }

	renderList(): JSX.Element { return (<div className={styles.list}><MioList onEdit={this.onEdit} /></div>); }

	renderStandalone(): JSX.Element {
		return (<SplitPane className={styles.splitpane} split='vertical' defaultSize={500} minSize={250} maxSize={750} primary="second">
			{!isOfficeInitialized ? this.renderEditor() : null}
			{this.renderList()}
		</SplitPane>);
	}

	render(): JSX.Element { return (<div className={styles.frame}>{!isOfficeInitialized ? this.renderStandalone() : this.renderList()}</div>); }

	// ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

	onEdit(item: MioListItemProps) {
		if (!isOfficeInitialized) {
			this.setState(function() {
				if (!this.state.edit.includes(item)) {
					var edit = this.state.edit;
					edit.push(item);
					return {edit: edit};
				}
				return {edit: this.state.edit};
			});
		} else {
			openEditorWindow(item.id);
		}
	}

}

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

export interface MioListItemClasses {
	frame: string;
	splitpane: string;
	editor: string;
	list: string;
}

const styles: MioListItemClasses = mergeStyleSets({
	frame: {
		//position: 'absolute',
		width: '100%',
		height: '100%',
		margin: 0,
		padding: 0,
	},
	splitpane: {
		width: '100%',
		height: '100%',
	},
	editor: {
		width: '100%',
		height: '100%',
	},
	list: {
		width: '100%',
		height: '100%',
	},
});
