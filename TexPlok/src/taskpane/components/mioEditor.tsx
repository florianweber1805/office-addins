import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MioEditorPage } from './mioEditorPage';
import { mergeStyleSets, ITheme, getTheme } from '@uifabric/styling';
import { MioListItemProps } from './mioListItem';
import Progress from './Progress';
import { mioLogo } from './Helper';
//import { openedEditorItems, resetOpenedEditorItems, getEditorIndex, setEditorIndex } from '..';
import { DefaultButton } from 'office-ui-fabric-react';
import { refresh } from '..';
import { isNumber } from 'util';

const theme: ITheme = getTheme();
const { palette } = theme;
console.log(palette);

export interface MioEditorProps {
    pages: MioListItemProps[];
    index?: number;
    //edit?: MioListItemProps;
    //edits: MioListItemProps[];
}

export interface MioEditorState {
    //pages: MioListItemProps[];
    //edit: MioListItemProps[];
    index: number;
}

// Storage.prototype.setObj = function(key, obj) {
//     return this.setItem(key, JSON.stringify(obj));
// }
// Storage.prototype.getObj = function(key) {
//     return JSON.parse(this.getItem(key));
// }

export function setIndex(index: number) {
    localStorage.setItem('editorIndex', index.toString());
    refresh();
}
export function getIndex(): number {
    var str = localStorage.getItem('editorIndex');
    return isNumber(str) ? Number(str) : 0;
}
export function setPages(pages: MioListItemProps[]) {
    localStorage.setItem('editorPages', JSON.stringify(pages || []));
    refresh();
}
export function getPages(): MioListItemProps[] {
    return JSON.parse(localStorage.getItem('editorPages')) || [];
}
export function updatePage(id: number, item: MioListItemProps) {
    var pages = getPages();
    pages[id] = item;
    console.log('update page ', id, pages);
    setPages(pages);
}
export function resetPages() {
    setPages([]);
    refresh();
}
export function openPage(item: MioListItemProps) {
    var pages = getPages();
    pages[pages.length] = item;
    setIndex(pages.length);
    console.log('open page ', pages);
    //pages.push(item);
    setPages(pages);
}

export class MioEditor extends React.Component<MioEditorProps, MioEditorState> {

    constructor(props: MioEditorProps) {
        super(props);
        this.state = {
            //pages: getPages(),
            //edit: openItems,
            index: props.index || 0,
        }
        //this.onChange = this.onChange.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    // componentWillReceiveProps(props: MioEditorProps) {
    //     this.setState((state) => {
    //         return {index: props.index != undefined && props.index > 0 ? props.index : getEditorIndex()};
    //     });
    // //     //const that = this;
    // //     // this.setState((state) => {
    // //     //     var edit = state.edit;
    // //     //     edit.push(props.edit);
    // //     //     console.log(edit);
    // //     //     return {edit: edit};
    // //     // });
    // //     //openItem(props);
    // //     //openItems.push(props.edit);
    // }

    renderTabs(): JSX.Element {
        //const items = getPages();

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
        //
        return (
            <div className={styles.tabs}>
                <DefaultButton style={{position: 'absolute', right: 0}} label='Close All' onClick={() => resetPages()}>Close All</DefaultButton>
                {this.props.pages.length > 0 ? this.renderTabs() : <Progress loading={false} logo={mioLogo} title={'TexPlok'} message={'Loading...'} />}
            </div>
        );
    }

    // onChange(item: MioListItemChange) {
    //     console.log('rofl');
    //     for (var i = 0; i < openEditorItems.length; i++) {
    //         if (openEditorItems[i].id === item.id) {
    //             openEditorItems[i].icon = item.icon;
    //             openEditorItems[i].primaryText = item.primaryText;
    //             openEditorItems[i].secondaryText = item.secondaryText;
    //             openEditorItems[i].tertiaryText = item.tertiaryText;
    //             openEditorItems[i].items = item.items;
    //             openEditorItems[i].actions = item.actions;
    //         }
    //     }
    //     // var edits = this.state.edit.map<MioListItemProps>((edit: MioListItemProps) => {
    //     //     if (edit.id === item.id) {
    //     //         return {
    //     //             id: edit.id,
    //     //             icon: item.icon,
    //     //             primaryText: item.primaryText,
    //     //             secondaryText: item.secondaryText,
    //     //             tertiaryText: item.tertiaryText,
    //     //             metaText: edit.metaText,
    //     //             items: item.items,
    //     //             actions: item.actions,
    //     //             onEdit: edit.onEdit,
    //     //             onChange: edit.onChange,
    //     //             edit: true,
    //     //         };
    //     //     }
    //     //     return edit;
    //     // })
    //     // this.setState({edit: edits});

    //     // var edits = this.state.edit;
    //     // for (var i = 0; i < edits.length; i++) {
    //     //     if (edits[i].id === item.id) {
    //     //         var edit = edits[i];
    //     //         edit.primaryText = item.primaryText;
    //     //         edit.secondaryText = item.secondaryText;
    //     //         edit.tertiaryText = item.tertiaryText;
    //     //         edit.items = item.items;
    //     //         edit.actions = item.actions;
    //     //         edits[i] = edit;
    //     //     }
    //     // }
    // }

}

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
