import * as React from "react";
import { MioList } from "./mioList";
import { isOfficeInitialized, refresh } from "..";
import { fetchdata, urlInfo, GetURLParameter, mapItems, mapActions, openEditorWindow } from './Helper';
import { mergeStyleSets } from "@uifabric/styling";
import { MioEditor } from "./mioEditor";
import { format } from "@uifabric/utilities";
import SplitPane from "react-split-pane";
import "./SplitPane.css";
import { MioListItemProps } from "./mioListItem";

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
		return (<div className={styles.editor}><MioEditor /></div>);
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

// ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ██║███████║   ██║   ███████║
// ██║  ██║██╔══██║   ██║   ██╔══██║
// ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

export function setIndex(index: number) {
    localStorage.setItem('editorIndex', (index || 0).toString()); //refresh();
}
export function getIndex(): number {
    var index = Number(localStorage.getItem('editorIndex'));
    return (!isNaN(index) ? index : 0);
}
export function setPages(pages: MioListItemProps[]) {
    localStorage.setItem('editorPages', JSON.stringify(pages || [])); //refresh();
}
export function getPages(): MioListItemProps[] {
    return JSON.parse(localStorage.getItem('editorPages')) || [];
}
export function updatePage(id: number, item: MioListItemProps) {
    var pages = getPages(); pages[id] = item; setPages(pages); refresh();
}
export function resetPages() {
    setPages([]); setIndex(0); refresh();
}
export function openPage(item: MioListItemProps) {
    if (isOfficeInitialized) {
        openEditorWindow(item.id);
    } else {
        var pages = getPages();
        pages[pages.length] = item;
        setPages(pages);
        setIndex(pages.length-1);
        refresh();
    }
}
export function closePage(id: number) {
    var index = getIndex();
    var pages = getPages();
    pages.splice(id, 1);
    setPages(pages);
    if (id < index) { index -= 1; }
    if (index < 0) { index = 0;
    } else if ( index >= pages.length) { index = pages.length-1; }
    setIndex(index);
    refresh();
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
