import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, Button } from 'office-ui-fabric-react';
import { MioListItemAction, MioListItemActionType } from './mioListItemAction';
import { consoleLog } from './mioList';
//import { redraw } from '..';
import { classnames } from './Helper';

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioListItemProps {
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
    metaText?: string;
    actions?: MioListItemActionType[];
    items?: MioListItemProps[];
}

export interface MioListItemClasses {
    cell: string;
    item: string;
    topStack: string;
    leftStack: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    rightStack: string;
    actionStack: string;
    items: string;
    expanded: string;
}

const itemStyles: MioListItemClasses = mergeStyleSets({
    cell: {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
    },
    item: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: '100%',
            height: 'auto',
            borderRadius: 5,
            // boxSizing: 'border-box',
            // border: `1px solid ${semanticColors.bodyDivider}`,
            // justifyContent: 'flex-start',
            // alignItems: 'flex-start',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            selectors: {
                '&:hover': { 
                    background: 'linear-gradient(to right, ' + palette.themeLighter + ' 0%, ' + palette.white + ' 75%)',
                },
                '&:hover .primaryText': {
                    background: palette.themePrimary,
                    color: palette.white,
                },
                '&:active': {
                    background: 'linear-gradient(to right, ' + palette.themePrimary + ' 0%, ' + palette.white + ' 75%)',
                    color: palette.white,
                },
                '&:active .primaryText': {
                    background: 'transparent',
                    color: palette.white,
                }
            },
            cursor: 'pointer',
        },
    ],
    topStack: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftStack: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
    },
    primaryText: {
        fontSize: 26,
        backgroundColor: theme.palette.themeLighter,
        borderRadius: 5,
        padding: '0 5px 5px 5px',
        margin: '5px 5px 5px 0',
    },
    secondaryText: {
        fontSize: 20,
        margin: '2px 0 2px 5px',
    },
    tertiaryText: {
        fontSize: 14,
        margin: '2px 0 2px 5px',
    },
    metaText: {
        fontSize: 12,
        textAlign: 'right',
        margin: 'auto 2px 2px auto',
        //alignSelf: 'flex-end',
    },
    rightStack: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        justifySelf: 'flex-end',
        //margin: '0 0 0 auto',
    },
    actionStack: {
        // margin: '5px 5px 5px 5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    items: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
    },
    expanded: {
        borderRadius: 5,
        boxSizing: 'border-box',
        border: `1px solid ${palette.themePrimary}`,
        background: palette.themeLight,
    },
});

interface MioListItemState {
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    actions: MioListItemAction[];
    items: MioListItem[];
    expanded: boolean;
}

export class MioListItem extends React.Component<MioListItemProps, MioListItemState> {

    private primaryText: string;
    private secondaryText: string;
    private tertiaryText: string;
    private metaText: string;
    private actions: MioListItemAction[];
    private items: MioListItem[];
    private expanded: boolean;

    constructor(props: MioListItemProps) {
        super(props);
        this.primaryText = props.primaryText;
        this.secondaryText = props.secondaryText;
        this.tertiaryText = props.tertiaryText;
        this.metaText = props.metaText;
        this.actions = (props.actions != undefined ? Array.apply(null, props.actions.map(value => {
            return new MioListItemAction({type: value});
        })) : []);
        this.items = (props.items != undefined ? Array.apply(null, props.items.map(value => {
                return new MioListItem(value);
            })) : []);
        this.expanded = this.items.length > 0;
    }

    render(): JSX.Element {
        const items = (
            <div className={itemStyles.items}>
                {this.items.map<JSX.Element>(value => {
                    return value.render();
                })}
            </div>
        );
        return (
            <Stack.Item>
                <Stack className={this.expanded ? classnames([itemStyles.expanded, itemStyles.cell]) : itemStyles.cell}>
                    <Button draggable={true} className={itemStyles.item}
                        onClick={() => this.onClick()}
                    >
                        <Stack className={itemStyles.topStack}>
                            <Stack className={itemStyles.leftStack}>
                                <Stack.Item className={classnames(['primaryText', itemStyles.primaryText])}>{this.primaryText}</Stack.Item>
                                <Stack.Item className={classnames(['secondaryText', itemStyles.secondaryText])}>{this.secondaryText}</Stack.Item>
                                <Stack.Item className={classnames(['tertiaryText', itemStyles.tertiaryText])}>{this.tertiaryText}</Stack.Item>
                            </Stack>
                            <Stack.Item className={itemStyles.rightStack}>
                                <Stack.Item align='end' className={itemStyles.actionStack}>
                                    {this.actions.map<JSX.Element>(value => {
                                        return value.render();
                                    })}
                                </Stack.Item>
                                <Stack.Item align='end' className={classnames(['metaText', itemStyles.metaText])}>{this.metaText}</Stack.Item>
                            </Stack.Item>
                        </Stack>
                    </Button>
                    {this.expanded ? items : null}
                </Stack>
            </Stack.Item>
        );
    }

    onClick(): void {
        if (this.items.length > 0) {
            this.expanded = !this.expanded;
            consoleLog('lol');
        }
    }

}