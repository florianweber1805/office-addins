import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MioEditorPage } from './mioEditorPage';
import { mergeStyleSets, ITheme, getTheme } from '@uifabric/styling';
import { MioListItemProps } from './mioListItem';
import Progress from './Progress';
import { mioLogo, classnames } from './Helper';
import { IconButton, PrimaryButton } from 'office-ui-fabric-react';
import { refresh } from '..';
import { getIndex, setIndex, resetPages, closePage, getPages } from './App';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';

const theme: ITheme = getTheme();
const { palette } = theme;
console.log(palette);

export interface MioEditorProps {
    //pages: MioListItemProps[];
}
export interface MioEditorState {}

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
            //index: props.index || 0,
        }
        this.renderTabs = this.renderTabs.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    renderTabs(): JSX.Element {
        
        const CustomTab = ({index, children }) => (
            <Tab style={{margin: 0, padding: 0}} key={index}>
                <div className={classnames([styles.tab, index === getIndex() ? styles.selectedTab : styles.unselectedTab])}>
                    <div className={classnames(['tabText', styles.text])}>{children}</div>
                    <IconButton className={classnames(['tabClose', styles.closeButton])}
                        iconProps={{iconName: 'ChromeClose'}} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onClose(event, index)} />
                </div>
            </Tab>
        );
        CustomTab.tabsRole = 'Tab';

        return (<Tabs className={styles.tabs} selectedIndex={getIndex()} //defaultIndex={1} //
            onSelect={(index: number) => {setIndex(index); refresh();}}
            // onSelect={(index: number) => {
            //     this.setState({index: index});
            //     setIndex(index);
            // }}
        >
            <TabList style={{marginBottom: 0, borderBottom: '5px solid ' + palette.themePrimary,}}>
                {getPages().map((item: MioListItemProps, index: number) => 
                    //<Tab key={index}>{'TexPlok ' + item.id}</Tab>
                    <CustomTab index={index} key={index}>{(item.primaryText || 'TexPlok ( ' + item.id + ' )') + (item.changed ? ' *' : '')}</CustomTab>
                )}
            </TabList>
                {getPages().map((item: MioListItemProps, index: number) => 
                    index == getIndex() ? 
                        <TabPanel key={index} className={styles.tabPanel}><MioEditorPage id={index} item={item} /></TabPanel> //onChange={this.onChange}
                    : 
                        <TabPanel key={index} />
                )}
        </Tabs>);
    }

    render(): JSX.Element {
        return (
            <div className={styles.tabs}>
                {getPages().length > 1 ? <PrimaryButton style={{float: 'right', height: '32px'}} label='Close All' onClick={() => resetPages()}>Close All</PrimaryButton> : null}
                {getPages().length > 0 ? this.renderTabs() : <Progress loading={false} logo={mioLogo} title={'TexPlok'} message={'Loading...'} />}
            </div>
        );
    }

    onClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) {
        //console.log('close page ', getIndex());
        closePage(index);
        event.stopPropagation();
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
    tab: string;
    unselectedTab: string;
    selectedTab: string;
    text: string;
    closeButton: string;
}

const styles: MioEditorClasses = mergeStyleSets({
    tabs: {
        width: '100%',
        height: '100%',
    },
    tabPanel: {
        width: '100%',
        height: 'calc(100% - 45px)',
    },
    tab: {
        //background: palette.red,
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 2,
        margin: 0,
        borderRadius: '10px 5px 0 0',
        
        //boxSizing: 'border-box',
        //padding: '5px 10px 5px 10px',
        
    },
    unselectedTab: {
        background: palette.neutralLighter,
        border: '1px solid ' + palette.neutralTertiary,
        color: palette.neutralDark,
        boxShadow: Depths.depth0,
        selectors: {
            '& .tabText': {
                background: palette.themeLight,
                color: palette.themePrimary,
            },
            '&:hover': {
                background: palette.neutralQuaternary,
                color: palette.neutralDark,
                boxShadow: Depths.depth4,
            },
            '&:hover .tabText': {
                background: palette.themePrimary,
                color: palette.neutralLighter,
            },
        },
    },
    selectedTab: {
        background: palette.themePrimary,
        color: palette.neutralLighter,
        boxShadow: Depths.depth0,
        border: '1px solid ' + palette.themePrimary,
        selectors: {
            '& .tabClose': {
                background: palette.themePrimary,
                color: palette.neutralLighter,
            },
        },
    },
    text: {
        borderRadius: '10px 3px 0 0',
        fontSize: 16,
        fontWeight: 'bold',
        padding: '0 5px 5px 5px',
        marginBottom: -3,
        marginRight: 10,
    },
    closeButton: {
        width: 25,
        minWidth: 25,
        height: 25,
        minHeight: 25,
        //fontSize: 10,
        margin: 0,
        padding: 5,
    },
})
