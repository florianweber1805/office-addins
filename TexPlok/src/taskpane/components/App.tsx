import * as React from "react";
import { MioList } from "./mioList";
import { isOfficeInitialized } from "..";
//import { ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { MioEditor } from "./mioEditor";
import { MioListItem } from "./mioListItem";
import { GetURLParameter } from './Helper';
import SplitPane from "react-split-pane";
import "./SplitPane.css";
import { mergeStyleSets, ITheme, getTheme } from "@uifabric/styling";

const theme: ITheme = getTheme();
const { palette } = theme;

export interface AppProps {}
export interface AppState {
	edit: number;
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
			edit: Number(GetURLParameter('edit')) || 0,
		}
		this.onEdit = this.onEdit.bind(this);
		this.renderEditor = this.renderEditor.bind(this);
		this.renderList = this.renderList.bind(this);
	}

	// ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

	renderEditor(): JSX.Element {
		return (<div className={styles.editor}><MioEditor item={this.state.edit} /></div>);
	}

	renderList(): JSX.Element {
		return (<div className={styles.list}><MioList onEdit={this.onEdit} /></div>);
	}

	renderStandalone(): JSX.Element {
		return (
			<SplitPane style={{position: 'absolute'}} split='vertical' defaultSize={500} minSize={250} maxSize={750} primary="second">
				{!isOfficeInitialized ? this.renderEditor() : null}
				{this.renderList()}
			</SplitPane>
		);
	}

	render(): JSX.Element {
		console.log(palette);
		return (
			!isOfficeInitialized ? this.renderStandalone() : this.renderList()
		);
	}

	// ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

	onEdit(item: MioListItem) {
		console.log(item.state.id);
		if (!isOfficeInitialized) {
			this.setState({edit: item.state.id});
		} else {
			var strWindowFeatures = "location=no, height=" + screen.height + ", width=" + screen.width + ", scrollbars=no, status=no";
        	window.open('https://addin.eap4.me/taskpane.html?edit=' + item.state.id, '_blank', strWindowFeatures);
		}
	}

}

export interface MioListItemClasses {
	editor: string;
	list: string;
}

const styles: MioListItemClasses = mergeStyleSets({
	editor: {},
	list: {
		height: '100%',
	},
});
