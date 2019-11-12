import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, Icon } from 'office-ui-fabric-react';
import { MioListItemAction, MioListItemActionType, renderMioListItemAction } from './mioListItemAction';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { classnames } from './Helper';
import { listStyles } from './mioList';
//import { redraw } from '..';

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioListItemProps {
    id: number;
    icon?: string;
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
    metaText?: string;
    actions?: MioListItemActionType[];
    items?: MioListItemProps[];
    expanded?: boolean;
}

export interface MioListItemState {
    id: number;
    icon: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    actions: MioListItemAction[];
    items: MioListItem[];
    expanded: boolean;
    loading: boolean;
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
        // display: 'flex',
        // flexDirection: 'column',
        // background: palette.yellow,
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

export class MioListItem extends React.Component<MioListItemProps, MioListItemState> {

    constructor(props: MioListItemProps) {
        super(props);

        this.state = {
            id: props.id,
            icon: props.icon,
            primaryText: props.primaryText,
            secondaryText: props.secondaryText,
            tertiaryText: props.tertiaryText,
            metaText: props.metaText,
            actions: (props.actions != undefined ? Array.apply(null, props.actions.map(value => {
                return new MioListItemAction({type: value});
            })) : []),
            items: (props.items != undefined ? Array.apply(null, props.items.map(value => {
                return new MioListItem(value);
            })) : []),
            expanded: (props.expanded != undefined ? props.expanded : (props.items != undefined ? props.items.length > 0 : false)),
            loading: false,
        }

        this.onClick = this.onClick.bind(this);

    }

    componentDidMount() {
        const that = this;
        this.setState({loading: true});

        console.log('https://addin.eap4.me/load.php?t=' + this.state.id)
        fetch('https://addin.eap4.me/load.php?t=' + this.state.id)
            .then(response => response.json())
            .then(function(data) {
                that.setState({loading: false, items: data.map(obj => {
                    console.log(obj);
                    return new MioListItem({id: obj.id, icon: 'DocumentSet', secondaryText: obj.text, 
                        tertiaryText: obj.description, metaText: obj.timestamp});
                })});
            }, function(reason) {
                console.log('Fehler: "' + reason + '"');
            })
            .catch(function(error) {
                console.log('Fehler: "' + error + '"');
            });
    }

    render(): JSX.Element {
        return (
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
                                    {this.state.actions.map<JSX.Element>((action: MioListItemAction, index: number) =>
                                        <Stack.Item key={index}>
                                            {renderMioListItemAction(action.props.type)}
                                        </Stack.Item>
                                        //return this.render_action(action, index)
                                    )}
                                </Stack.Item>: null}
                                {this.state.metaText ? <Stack.Item align='end' className={classnames(['metaText', itemStyles.metaText])}>{this.state.metaText}</Stack.Item>: null}
                            </Stack>
                        </Stack>
                    </div>
                    {this.state.expanded && this.state.items.length > 0 ? 
                        <ul className={itemStyles.items}>
                            {this.state.items.map<JSX.Element>((item: MioListItem, index: number) =>
                                <li className={listStyles.item} key={index}>
                                    {renderMioListItem(item)}
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

export function renderMioListItem(item: MioListItem): JSX.Element {
    return (
        <MioListItem id={item.state.id} icon={item.state.icon} primaryText={item.state.primaryText} secondaryText={item.state.secondaryText}
            tertiaryText={item.state.tertiaryText} metaText={item.state.metaText} actions={[MioListItemActionType.Edit]}
            items={item.props.items} />
    );
}
