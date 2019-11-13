import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, Icon, format, Spinner, Label } from 'office-ui-fabric-react';
import { MioListItemAction } from './mioListItemAction';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { classnames, fetchdata, urlInfo, urlChildren, urlAction } from './Helper';
import { listStyles } from './mioList';

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioListItemProps {
    id: number;
}

export interface MioListItemState {
    id: number;
    icon: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    actions: number[];
    items: number[];
    expanded: boolean;
    loading: number;
    error: string;
}

export class MioListItem extends React.Component<MioListItemProps, MioListItemState> {

    constructor(props: MioListItemProps) {
        super(props);
        this.state = {
            id: props.id,
            icon: undefined,
            primaryText: undefined,
            secondaryText: undefined,
            tertiaryText: undefined,
            metaText: undefined,
            actions: new Array<number>(),
            items: new Array<number>(),
            expanded: false,
            loading: 3,
            error: undefined,
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        const that = this;

        // Values
        fetchdata(format(urlInfo, this.state.id), function(data: any) {
            that.setState({
                icon: data[0].icon,
                primaryText: data[0].name,
                secondaryText: data[0].text,
                tertiaryText: data[0].description,
                metaText: data[0].timestamp,
                loading: that.state.loading - 1,
            });
        }, function() {
            that.setState({loading: that.state.loading - 1});
        }, function(error: any) {
            that.setState({error: error, loading: that.state.loading - 1});
        });

        // SubItems
        fetchdata(format(urlChildren, this.state.id), function(data: any) {
            that.setState({items: data.map(obj => obj.id), loading: that.state.loading - 1});
        }, function() {
            that.setState({loading: that.state.loading - 1});
        }, function(error: any) {
            that.setState({error: error, loading: that.state.loading - 1});
        });

        // Actions
        fetchdata(format(urlAction, this.state.id), function(data: any) {
            that.setState({actions: data.map(obj => obj.action), loading: that.state.loading - 1});
        }, function() {
            that.setState({loading: that.state.loading - 1});
        }, function(error: any) {
            that.setState({error: error, loading: that.state.loading - 1});
        });
    }

    renderError(): JSX.Element {
        return (
            <div className={itemStyles.cell}>
                <Stack className={itemStyles.item} style={{display: 'flex', flexDirection: 'row', padding: 5,}}>
                    <Stack.Item><Icon className={itemStyles.icon} iconName='Error' /></Stack.Item>
                    <Stack.Item><Label className={itemStyles.primaryText}>{'Error: "' + this.state.error + '"'}</Label></Stack.Item>
                </Stack>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            this.state.loading > 0 ? <Spinner></Spinner> :
                this.state.error != undefined ? this.renderError() :
                    <Stack.Item>
                        <Stack className={this.state.expanded ? classnames([itemStyles.expanded, itemStyles.cell]) : itemStyles.cell}>
                            <div draggable={true} className={itemStyles.item}
                                onClick={() => this.onClick()}
                            >
                                <Stack className={itemStyles.topStack}>
                                    <Stack style={{display: 'flex', flexDirection: 'column'}}>
                                        {this.state.icon != undefined ? <Stack.Item className={itemStyles.icon}><Icon iconName={this.state.icon}></Icon></Stack.Item>: null}
                                        {this.state.items.length > 0 ? <Icon className={itemStyles.chevron} iconName={(this.state.expanded ? 'ChevronDown' : 'ChevronUp')}></Icon> : null}
                                    </Stack>
                                    <Stack className={itemStyles.leftStack}>
                                        {this.state.primaryText ? <Stack.Item className={classnames(['primaryText', itemStyles.primaryText])}>{this.state.primaryText}</Stack.Item>: null}
                                        {this.state.secondaryText ? <Stack.Item className={classnames(['secondaryText', itemStyles.secondaryText])}>{this.state.secondaryText}</Stack.Item>: null}
                                        {this.state.tertiaryText ? <Stack.Item className={classnames(['tertiaryText', itemStyles.tertiaryText])}>{this.state.tertiaryText}</Stack.Item>: null}
                                    </Stack>
                                    <Stack className={itemStyles.rightStack}>
                                        {this.state.actions.length > 0 ? <Stack.Item align='end' className={itemStyles.actionStack}>
                                            {this.state.actions.map<JSX.Element>((action: number, index: number) =>
                                                <Stack.Item key={index}>
                                                    <MioListItemAction action={action} parent={this.state.id} />
                                                </Stack.Item>
                                            )}
                                        </Stack.Item>: null}
                                        {this.state.metaText ? <Stack.Item align='end' className={classnames(['metaText', itemStyles.metaText])}>{this.state.metaText}</Stack.Item>: null}
                                    </Stack>
                                </Stack>
                            </div>
                            {this.state.expanded && this.state.items.length > 0 ? 
                                <ul className={itemStyles.items}>
                                    {this.state.items.map<JSX.Element>((id: number, index: number) =>
                                        <li className={listStyles.item} key={index}>
                                            <MioListItem id={id} />
                                        </li>
                                    )}
                                </ul>
                            : null}
                        </Stack>
                    </Stack.Item>
        );
    }

    onClick(): void {
        if (this.state.items.length > 0) {
            this.setState({expanded: !this.state.expanded});
        }
    }

}






















export interface MioListItemClasses {
    cell: string;
    item: string;
    expanded: string;
    topStack: string;
    leftStack: string;
    actionStack: string;
    icon: string;
    chevron: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    rightStack: string;
    items: string;
}

const itemStyles: MioListItemClasses = mergeStyleSets({
    cell: {
        width: 'auto',
        height: 'auto',
        padding: 0,
        margin: 0,
        borderRadius: 5,
        cursor: 'pointer',
        whiteSpace: 'pre-wrap',
    },
    item: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: 'auto',
            height: '100%',
            borderRadius: 5,
            boxSizing: 'border-box',
            boxShadow: Depths.depth4,
            margin: 0,
            padding: 0,
            textAlign: 'left',
            selectors: {
                '&:hover': { 
                    background: palette.themeLighter, //'linear-gradient(to right, ' + palette.themeLighter + ' 0%, ' + palette.white + ' 75%)',
                    boxShadow: Depths.depth8,
                },
                '&:hover .primaryText': {
                    background: palette.themePrimary,
                    color: palette.themeLighter,
                },
                '&:active': {
                    background: palette.themePrimary, //'linear-gradient(to right, ' + palette.themePrimary + ' 0%, ' + palette.themeLighter + ' 75%)',
                    color: palette.themeLighter,
                    boxShadow: Depths.depth64,
                },
                '&:active .primaryText': {
                    background: 'transparent',
                    color: palette.themeLighter,
                },
                '&:active .metaText': {
                    color: palette.black,
                },
            },
            cursor: 'pointer',
        },
    ],
    expanded: {
        borderRadius: 5,
        border: `1px solid ${palette.themePrimary}`,
        background: palette.themeLight,
        boxShadow: Depths.depth16,
    },
    topStack: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
    },
    leftStack: {
        width: 'auto',
        height: 'auto',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    actionStack: {
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        margin: 0,
        padding: '5px 5px 5px 0',
        fontSize: 48,
    },
    chevron: {
        padding: 5,
        marginTop: 'auto'
    },
    primaryText: {
        width: 'auto',
        maxWidth: '100%',
        fontSize: 26,
        backgroundColor: palette.themeLighter,
        borderRadius: 5,
        padding: '0 5px 5px 5px',
        margin: '0 10px 0 0',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    secondaryText: {
        width: 'auto',
        maxWidth: '100%',
        fontSize: 20,
        margin: '2px 0 2px 5px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    tertiaryText: {
        width: 'auto',
        maxWidth: '100%',
        fontSize: 14,
        margin: '2px 0 2px 5px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    metaText: {
        width: 'auto',
        maxWidth: '100%',
        fontSize: 12,
        //textAlign: 'right',
        margin: 'auto 2px 2px 2px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    rightStack: {
        width: 'auto',
        minWidth: 30,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        overflow: 'hidden',
    },
    
    items: {
        marginLeft: 5,
    },
});
