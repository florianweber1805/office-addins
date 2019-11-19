import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MioEditorPage } from './mioEditorPage';
import { mergeStyleSets, ITheme, getTheme } from '@uifabric/styling';
import { MioListItemProps, MioListItemChange } from './mioListItem';
import Progress from './Progress';
import { mioLogo } from './Helper';

const theme: ITheme = getTheme();
const { palette } = theme;
console.log(palette);

var openItems = new Array<MioListItemProps>();

export interface MioEditorProps {
    edit?: MioListItemProps;
}

export interface MioEditorState {
    //edit: MioListItemProps[];
    index: number;
}

export class MioEditor extends React.Component<MioEditorProps, MioEditorState> {

    constructor(props: MioEditorProps) {
        super(props);
        this.state = {
            //edit: openItems,
            index: 0,
        }
        this.onChange = this.onChange.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    componentWillReceiveProps(props: MioEditorProps) {
        //const that = this;
        // this.setState((state) => {
        //     var edit = state.edit;
        //     edit.push(props.edit);
        //     console.log(edit);
        //     return {edit: edit};
        // });
        openItems.push(props.edit);
    }

    renderTabs(): JSX.Element {
        return (<Tabs className={styles.tabs} selectedIndex={this.state.index} //defaultIndex={1} //
            onSelect={(index: number) => this.setState({index: index})}
        >
            <TabList>
                {openItems.map((item: MioListItemProps) => 
                    <Tab>{'TexPlok ' + item.id}</Tab>
                )}
            </TabList>
                {openItems.map((item: MioListItemProps, index: number) => 
                    index == this.state.index ? 
                        <TabPanel className={styles.tabPanel}><MioEditorPage onChange={this.onChange} item={item} /></TabPanel> 
                    : 
                        <TabPanel />
                )}
        </Tabs>);
    }

    render(): JSX.Element {
        //
        return (
            openItems.length > 0 ? this.renderTabs() : <Progress loading={false} logo={mioLogo} title={'TexPlok'} message={'Loading...'} />
        );
    }

    onChange(item: MioListItemChange) {
        console.log('rofl');
        for (var i = 0; i < openItems.length; i++) {
            if (openItems[i].id === item.id) {
                openItems[i].icon = item.icon;
                openItems[i].primaryText = item.primaryText;
                openItems[i].secondaryText = item.secondaryText;
                openItems[i].tertiaryText = item.tertiaryText;
                openItems[i].items = item.items;
                openItems[i].actions = item.actions;
            }
        }
        // var edits = this.state.edit.map<MioListItemProps>((edit: MioListItemProps) => {
        //     if (edit.id === item.id) {
        //         return {
        //             id: edit.id,
        //             icon: item.icon,
        //             primaryText: item.primaryText,
        //             secondaryText: item.secondaryText,
        //             tertiaryText: item.tertiaryText,
        //             metaText: edit.metaText,
        //             items: item.items,
        //             actions: item.actions,
        //             onEdit: edit.onEdit,
        //             onChange: edit.onChange,
        //             edit: true,
        //         };
        //     }
        //     return edit;
        // })
        // this.setState({edit: edits});

        // var edits = this.state.edit;
        // for (var i = 0; i < edits.length; i++) {
        //     if (edits[i].id === item.id) {
        //         var edit = edits[i];
        //         edit.primaryText = item.primaryText;
        //         edit.secondaryText = item.secondaryText;
        //         edit.tertiaryText = item.tertiaryText;
        //         edit.items = item.items;
        //         edit.actions = item.actions;
        //         edits[i] = edit;
        //     }
        // }
    }

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
