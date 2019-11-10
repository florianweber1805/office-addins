import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, Icon, Button } from 'office-ui-fabric-react';
import { MioListItemAction, MioListItemActionType } from './mioListItemAction';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { classnames } from './Helper';
import { redraw } from '..';

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

export interface MioListItemState {
    icon: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    actions: MioListItemAction[];
    items: MioListItem[];
    expanded: boolean;
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
                    background: 'linear-gradient(to right, ' + palette.themeLighter + ' 0%, ' + palette.white + ' 75%)',
                    boxShadow: Depths.depth8,
                },
                '&:hover .primaryText': {
                    background: palette.themePrimary,
                    color: palette.themeLighter,
                },
                '&:active': {
                    background: 'linear-gradient(to right, ' + palette.themePrimary + ' 0%, ' + palette.themeLighter + ' 75%)',
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
            // <div className={this.expanded ? classnames([itemStyles.expanded, itemStyles.cell]) : itemStyles.cell}>
            //     <div draggable={true} onClick={() => this.onClick()}>
            //         <Stack className={itemStyles.topStack}>
            //             <Stack.Item verticalFill={true}>
            //                 <Stack className={itemStyles.iconStack}>
            //                     {this.icon != undefined ? <Stack.Item><Icon className={itemStyles.icon} iconName={this.icon} /></Stack.Item> : null}
            //                     {this.items.length > 0 ? <Stack.Item><Icon className={itemStyles.chevron} iconName={(this.expanded ? 'ChevronDown' : 'ChevronUp')} /></Stack.Item> : null}
            //                 </Stack>
            //             </Stack.Item>
            //             <Stack.Item verticalFill={true} shrink={1} grow={1}>
            //                 <Stack className={itemStyles.textStack}>
            //                     {this.primaryText != undefined ? <Stack.Item><Label className={itemStyles.primaryText}>{this.primaryText}</Label></Stack.Item> : null}
            //                     {this.secondaryText != undefined ? <Stack.Item><Label className={itemStyles.secondaryText}>{this.secondaryText}</Label></Stack.Item> : null}
            //                     {this.tertiaryText != undefined ? <Stack.Item><Label className={itemStyles.tertiaryText}>{this.tertiaryText}</Label></Stack.Item> : null}
            //                 </Stack>
            //             </Stack.Item>
            //             <Stack.Item verticalFill={true}>
            //                 <Stack className={itemStyles.actionStack}>
            //                     {this.actions.length > 0 ? 
            //                         <Stack.Item align='end'>
            //                             {this.actions.map<JSX.Element>(value => {
            //                                 return value.render();
            //                             })}
            //                         </Stack.Item>
            //                     : null}
            //                     {this.metaText != undefined ? <Stack.Item align='end'><Label>{this.metaText}</Label></Stack.Item> : null}
            //                     {/* {this.metaText ? <Stack.Item align='end' className={classnames(['metaText', itemStyles.metaText])}>{this.metaText}</Stack.Item>: null} */}
            //                 </Stack>
            //             </Stack.Item>
            //         </Stack>
            //     </div>
            //     {this.expanded && this.items.length > 0 ? 
            //         <div className={itemStyles.items}>
            //             {this.items.map<JSX.Element>(value => {
            //                 return value.render();
            //             })}
            //         </div>
            //     : null}
            // </div>
            <Stack.Item>
                <Stack className={this.expanded ? classnames([itemStyles.expanded, itemStyles.cell]) : itemStyles.cell}>
                    <Button draggable={true} className={itemStyles.item}
                        onClick={() => this.onClick()}
                    >
                        <Stack className={itemStyles.topStack}>
                            <Stack style={{display: 'flex', flexDirection: 'column'}}>
                                {this.icon != undefined ? <Stack.Item className={itemStyles.icon}><Icon iconName={this.icon}></Icon></Stack.Item>: null}
                                {this.items.length > 0 ? <Icon className={itemStyles.chevron} iconName={(this.expanded ? 'ChevronDown' : 'ChevronUp')}></Icon> : null}
                            </Stack>
                            <Stack className={itemStyles.leftStack}>
                                {this.primaryText ? <Stack.Item className={classnames(['primaryText', itemStyles.primaryText])}>{this.primaryText}</Stack.Item>: null}
                                {/* <MioPrimaryText text={this.primaryText} /> */}
                                {this.secondaryText ? <Stack.Item className={classnames(['secondaryText', itemStyles.secondaryText])}>{this.secondaryText}</Stack.Item>: null}
                                {this.tertiaryText ? <Stack.Item className={classnames(['tertiaryText', itemStyles.tertiaryText])}>{this.tertiaryText}</Stack.Item>: null}
                            </Stack>
                            <Stack className={itemStyles.rightStack}>
                                {this.actions.length > 0 ? <Stack.Item align='end' className={itemStyles.actionStack}>
                                    {this.actions.map<JSX.Element>(value => {
                                        return value.render();
                                    })}
                                </Stack.Item>: null}
                                {this.metaText ? <Stack.Item align='end' className={classnames(['metaText', itemStyles.metaText])}>{this.metaText}</Stack.Item>: null}
                            </Stack>
                        </Stack>
                    </Button>
                    {this.expanded && this.items.length > 0 ? 
                        <div className={itemStyles.items}>
                            {this.items.map<JSX.Element>(value => {
                                return value.render();
                            })}
                        </div>
                    : null}
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