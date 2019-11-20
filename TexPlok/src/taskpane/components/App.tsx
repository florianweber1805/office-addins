import * as React from "react";
import { MioList } from "./mioList";
import { isOfficeInitialized } from "..";
import { fetchdata, urlInfo, GetURLParameter, mapItems, mapActions } from './Helper';
import { mergeStyleSets } from "@uifabric/styling";
import { MioEditor, getPages, openPage } from "./mioEditor";
import { format } from "@uifabric/utilities";
import SplitPane from "react-split-pane";
import "./SplitPane.css";

export interface AppProps {}
export interface AppState {}
export class App extends React.Component<AppProps, AppState> {
	
	// ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

	constructor(props: AppProps) {
		super(props);
		this.state = {}
		this.renderEditor = this.renderEditor.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderStandalone = this.renderStandalone.bind(this);
	}

	componentDidMount() {
		var id = Number(GetURLParameter('edit'));
		if (id != undefined && id != null && id > 0) {
			fetchdata(format(urlInfo, id), function(data: any) {
				openPage({
					id: id,
					icon: data[0].icon,
					primaryText: data[0].name,
					secondaryText: data[0].text,
					tertiaryText: data[0].description,
					metaText: data[0].timestamp,
					items: mapItems(data[0].items),
					actions: mapActions(data[0].actions),
					edit: true,
				});
			}, function() {
				//console.warn(reason);
			}, function() {
				//console.error(error);
			});
		}
		
	}

	// ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

	renderEditor(): JSX.Element {
		return (<div className={styles.editor}><MioEditor pages={getPages()} /></div>);
	}

	renderList(): JSX.Element {
		return (<div className={styles.list}><MioList /></div>); //
	}

	renderStandalone(): JSX.Element {
		return (<SplitPane className={styles.splitpane} split='vertical' defaultSize={500} minSize={250} maxSize={750} primary="second">
			{!isOfficeInitialized ? this.renderEditor() : null}
			{this.renderList()}
		</SplitPane>);
	}

	render(): JSX.Element {
		return (<div className={styles.frame}>{!isOfficeInitialized ? this.renderStandalone() : this.renderList()}</div>);
	}

	// ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

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
		width: '100%',
		height: '100%',
		margin: 0,
		padding: 0,
	},
	splitpane: {
		width: '100%',
		height: '100%',
		margin: 0,
		padding: 0,
	},
	editor: {
		width: '100%',
		height: '100%',
		margin: 0,
		padding: 0,
	},
	list: {
		width: '100%',
		height: '100%',
		margin: 0,
		padding: 0,
	},
});
