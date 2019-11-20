import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MioEditorPage } from './mioEditorPage';
import { mergeStyleSets, ITheme, getTheme } from '@uifabric/styling';
import { MioListItemProps } from './mioListItem';
import Progress from './Progress';
import { mioLogo, openEditorWindow } from './Helper';
import { DefaultButton } from 'office-ui-fabric-react';
import { refresh, isOfficeInitialized } from '..';
import { isNumber } from 'util';

const theme: ITheme = getTheme();
const { palette } = theme;
console.log(palette);

export interface MioEditorProps {
    pages: MioListItemProps[];
    index?: number;
}

export interface MioEditorState {
    index: number;
}

// ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ██║███████║   ██║   ███████║
// ██║  ██║██╔══██║   ██║   ██╔══██║
// ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

export function setIndex(index: number) {
    localStorage.setItem('editorIndex', index.toString()); refresh();
}
export function getIndex(): number {
    var str = localStorage.getItem('editorIndex');
    return isNumber(str) ? Number(str) : 0;
}
export function setPages(pages: MioListItemProps[]) {
    localStorage.setItem('editorPages', JSON.stringify(pages || [])); refresh();
}
export function getPages(): MioListItemProps[] {
    return JSON.parse(localStorage.getItem('editorPages')) || [];
}
export function updatePage(id: number, item: MioListItemProps) {
    var pages = getPages(); pages[id] = item; setPages(pages);
}
export function resetPages() {
    setPages([]); refresh();
}
export function openPage(item: MioListItemProps) {
    if (isOfficeInitialized) {
        openEditorWindow(item.id);
    } else {
        var pages = getPages(); pages[pages.length] = item;
        setIndex(pages.length); setPages(pages);
    }
}

export class MioEditor extends React.Component<MioEditorProps, MioEditorState> {

    // ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

    constructor(props: MioEditorProps) {
        super(props);
        this.state = {
            index: props.index || 0,
        }
        this.renderTabs = this.renderTabs.bind(this);
    }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    renderTabs(): JSX.Element {
        return (<Tabs className={styles.tabs} selectedIndex={this.state.index} //defaultIndex={1} //
            onSelect={(index: number) => {
                this.setState({index: index});
                setIndex(index);
            }}
        >
            <TabList>
                {this.props.pages.map((item: MioListItemProps, index: number) => 
                    <Tab key={index}>{'TexPlok ' + item.id}</Tab>
                )}
            </TabList>
                {this.props.pages.map((item: MioListItemProps, index: number) => 
                    index == this.state.index ? 
                        <TabPanel key={index} className={styles.tabPanel}><MioEditorPage id={index} item={item} /></TabPanel> //onChange={this.onChange}
                    : 
                        <TabPanel />
                )}
        </Tabs>);
    }

    render(): JSX.Element {
        return (
            <div className={styles.tabs}>
                <DefaultButton style={{position: 'absolute', right: 0}} label='Close All' onClick={() => resetPages()}>Close All</DefaultButton>
                {this.props.pages.length > 0 ? this.renderTabs() : <Progress loading={false} logo={mioLogo} title={'TexPlok'} message={'Loading...'} />}
            </div>
        );
    }

}

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

interface MioEditorClasses {
    tabs: string;
    tabPanel: string;
}

const styles: MioEditorClasses = mergeStyleSets({
    tabs: {
        width: '100%',
        height: '100%',
    },
    tabPanel: {
        width: '100%',
        height: 'calc(100% - 50px)',
    },
})
