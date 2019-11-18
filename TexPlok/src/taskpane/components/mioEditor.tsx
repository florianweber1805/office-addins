import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MioEditorPage } from './mioEditorPage';
import { mergeStyleSets, ITheme, getTheme } from '@uifabric/styling';
import { MioListItemProps } from './mioListItem';

const theme: ITheme = getTheme();
const { palette } = theme;
console.log(palette);

export interface MioEditorProps {
    edit?: MioListItemProps[];
}

export interface MioEditorState {
    edit: MioListItemProps[];
    index: number;
}

export class MioEditor extends React.Component<MioEditorProps, MioEditorState> {

    constructor(props: MioEditorProps) {
        super(props);
        this.state = {
            edit: props.edit || new Array<MioListItemProps>(),
            index: 0,
        }
    }

    render(): JSX.Element {
        return (
            <Tabs className={styles.tabs} selectedIndex={this.state.index}
                onSelect={(index: number) => this.setState({index: index})}
            >
                <TabList>
                    {this.state.edit.map((item: MioListItemProps, index: number) => 
                        <Tab key={index}>{'TexPlok ' + item.id}</Tab>
                    )}
                </TabList>
                {this.state.edit.map((item: MioListItemProps, index: number) => 
                    <TabPanel className={styles.tabPanel} key={index}><MioEditorPage item={item} /></TabPanel>    
                )}
            </Tabs>
        );
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
        height: '100%',
        position: 'absolute',
    },
})
