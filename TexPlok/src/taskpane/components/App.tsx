import * as React from "react";
import { MioList, mapItems, mapActions } from "./mioList";
import { isOfficeInitialized } from "..";
import { MioListItemProps } from "./mioListItem";
import { openEditorWindow, fetchdata, urlInfo, GetURLParameter } from './Helper';
import { mergeStyleSets } from "@uifabric/styling";
import { MioEditor } from "./mioEditor";
import { format } from "@uifabric/utilities";
import SplitPane from "react-split-pane";
import "./SplitPane.css";

export interface AppProps {}
export interface AppState {
	edit: MioListItemProps;
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
			edit: undefined,
		}
		this.renderEditor = this.renderEditor.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderStandalone = this.renderStandalone.bind(this);
		this.onEdit = this.onEdit.bind(this);	
	}

	componentDidMount() {
		const that = this;
		var id = Number(GetURLParameter('edit'));
		if (id != undefined && id != null && id > 0) {
			console.log(format(urlInfo, id));
			fetchdata(format(urlInfo, id), function(data: any) {
				that.setState({edit: {
					id: id,
					icon: data[0].icon,
					primaryText: data[0].name,
					secondaryText: data[0].text,
					tertiaryText: data[0].description,
					metaText: data[0].timestamp,
					items: mapItems(data[0].items),
					actions: mapActions(data[0].actions),
					onEdit: function(){},
					onChange: function(){},
					edit: true,
				}});
				// that.setState((state) => {
				// 	var edit = state.edit;
				// 	edit.push({
				// 		id: id,
				// 		icon: data[0].icon,
				// 		primaryText: data[0].name,
				// 		secondaryText: data[0].text,
				// 		tertiaryText: data[0].description,
				// 		metaText: data[0].timestamp,
				// 		items: mapItems(data[0].items),
				// 		actions: mapActions(data[0].actions),
				// 		onEdit: function(){},
				// 		onChange: function(){},
				// 		edit: true,
				// 	});
				// 	that.setState({edit: edit});
				// })
			}, function() {
				
			}, function(error: any) {
				console.log(error);
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
		return (<div className={styles.editor}><MioEditor edit={this.state.edit} /></div>);
	}

	renderList(): JSX.Element {
		return (<div className={styles.list}><MioList onEdit={this.onEdit} /></div>);
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

	onEdit(item: MioListItemProps) {
		if (!isOfficeInitialized) {
			// this.setState(function() {
			// 	if (!this.state.edit.includes(item)) {
			// 		var edit = this.state.edit;
			// 		edit.push(item);
			// 		return {edit: edit};
			// 	}
			// 	return {edit: this.state.edit};
			// });
			this.setState({edit: item});
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
