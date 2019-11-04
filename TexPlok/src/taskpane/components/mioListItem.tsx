import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, Button, Icon } from 'office-ui-fabric-react';
import { MioListItemAction, MioListItemActionType } from './mioListItemAction';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { classnames } from './Helper';
import { redraw } from '..';
import { Motion, spring, presets } from 'react-motion'

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioListItemProps {
    icon?: string;
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
    icon: string;
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
        padding: 0,
        margin: '0 0 5px 0',
        cursor: 'pointer',
    },
    item: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: '100%',
            height: '100%',
            borderRadius: 5,
            boxSizing: 'border-box',
            boxShadow: Depths.depth4,
            margin: 0,
            padding: 0,
            textAlign: 'left',
            selectors: {
                '&:hover': { 
                    background: 'linear-gradient(to right, ' + palette.themeLighter + ' 0%, ' + palette.themeLighter + ' 75%)',
                    boxShadow: Depths.depth8,
                    cursor: 'pointer',
                },
                '&:hover .primaryText': {
                    background: palette.themePrimary,
                    color: palette.themeLighter,
                    cursor: 'pointer',
                },
                '&:active': {
                    background: 'linear-gradient(to right, ' + palette.themePrimary + ' 0%, ' + palette.themeLighter + ' 75%)',
                    color: palette.themeLighter,
                    boxShadow: Depths.depth64,
                    cursor: 'pointer',
                },
                '&:active .primaryText': {
                    background: 'transparent',
                    color: palette.themeLighter,
                    cursor: 'pointer',
                },
                '&:active .metaText': {
                    color: palette.black,
                },
            },
            cursor: 'pointer',
        },
    ],
    topStack: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        padding: 5,
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
    },
    leftStack: {
        width: 'available',
        // width: 'auto',
        // maxWidth: '65%',
        //width: '100%',
        //width: 'auto',
        // maxWidth: '100%',
        //background: palette.red,
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
    },
    icon: {
        margin: 0,
        padding: '5px 5px 5px 0',
        fontSize: 48,
    },
    primaryText: {
        //width: '100%',
        //width: 'available',
        fontSize: 26,
        backgroundColor: palette.themeLighter,
        borderRadius: 5,
        padding: '0 5px 5px 5px',
        // textOverflow: 'ellipsis',
        // overflow: 'hidden',
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
        margin: 'auto 2px 2px 2px',
    },
    rightStack: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
    },
    actionStack: {
    },
    items: {
        marginLeft: 10,
    },
    expanded: {
        borderRadius: 5,
        border: `1px solid ${palette.themePrimary}`,
        background: palette.themeLight,
        boxShadow: Depths.depth16,
    },
});

export class MioListItem extends React.Component<MioListItemProps> {

    private icon: string;
    private primaryText: string;
    private secondaryText: string;
    private tertiaryText: string;
    private metaText: string;
    private actions: MioListItemAction[];
    private items: MioListItem[];
    private expanded: boolean;

    constructor(props: MioListItemProps) {
        super(props);
        this.icon = props.icon;
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
        return (
            <Stack.Item>
                <Stack className={this.expanded ? classnames([itemStyles.expanded, itemStyles.cell]) : itemStyles.cell}>
                    <Button draggable={true} className={itemStyles.item}
                        onClick={() => this.onClick()}
                    >
                        <Stack className={itemStyles.topStack}>
                            <Stack.Item className={itemStyles.icon}>{this.icon != undefined ? (<Icon iconName={this.icon}></Icon>) : null}</Stack.Item>
                            <Stack className={itemStyles.leftStack}>
                                <Stack.Item className={classnames(['primaryText', itemStyles.primaryText])}>{this.primaryText}</Stack.Item>
                                <Stack.Item className={classnames(['secondaryText', itemStyles.secondaryText])}>{this.secondaryText}</Stack.Item>
                                <Stack.Item className={classnames(['tertiaryText', itemStyles.tertiaryText])}>{this.tertiaryText}</Stack.Item>
                            </Stack>
                            <Stack className={itemStyles.rightStack}>
                                <Stack.Item align='end' className={itemStyles.actionStack}>
                                    {this.actions.map<JSX.Element>(value => {
                                        return value.render();
                                    })}
                                </Stack.Item>
                                <Stack.Item align='end' className={classnames(['metaText', itemStyles.metaText])}>{this.metaText}</Stack.Item>
                            </Stack>
                        </Stack>
                    </Button>
                    {/* {this.expanded ?  */}
                        <Motion 
                            defaultStyle={{x: -10, y: -60, opacity: 0}} 
                            style={{
                                x: spring((this.expanded ? 0 : -10), presets.gentle), 
                                y: spring((this.expanded ? 0 : -60), presets.gentle), 
                                opacity: spring((this.expanded ? 1 : 0), presets.gentle),
                            }}>
                            {style => (
                                style.y > -30 ?
                                    <div style={{transform: `translate(${style.x}px, ${style.y}px)`, opacity: style.opacity}} className={itemStyles.items}>
                                        {this.items.map<JSX.Element>(value => {
                                            return value.render();
                                        })}
                                    </div>
                                : null
                            )}
                        </Motion> 
                    {/* : null} */}
                </Stack>
            </Stack.Item>
        );
    }

    onClick(): void {
        if (this.items.length > 0) {
            this.expanded = !this.expanded;
            redraw();
        }
    }

}