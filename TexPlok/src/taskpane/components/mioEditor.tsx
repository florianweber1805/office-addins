import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MioEditorPage } from './mioEditorPage';
import { mergeStyleSets, ITheme, getTheme } from '@uifabric/styling';

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioEditorProps {
    edit?: number[];
}

export interface MioEditorState {
    edit: number[];
    index: number;
}

export class MioEditor extends React.Component<MioEditorProps, MioEditorState> {

    constructor(props: MioEditorProps) {
        super(props);
        this.state = {
            edit: props.edit || [],
            index: 0,
        }
    }

    render(): JSX.Element {
        console.log(palette);
        return (
            <Tabs className={styles.tabs} selectedIndex={this.state.index} defaultIndex={1}
                onSelect={(index: number) => this.setState({index: index})}
            >
                <TabList>
                    {this.state.edit.map((id: number, index: number) => 
                        <Tab key={index}>{'TexPlok ' + id}</Tab>
                    )}
                </TabList>
                {this.state.edit.map((id: number, index: number) => 
                    <TabPanel className={styles.tabPanel} key={index}><MioEditorPage item={id} /></TabPanel>    
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
