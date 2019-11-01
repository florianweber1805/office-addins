import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react';

const theme: ITheme = getTheme();
const { palette, semanticColors } = theme;

export interface MioListItemActionProps {
    text?: string;
    icon?: string;
}

export interface MioListItemActionClasses {
    cell: string;
    icon: string;
}

const actionStyles: MioListItemActionClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: 48,
            height: 48,
            boxSizing: 'border-box',
            border: `1px solid ${semanticColors.bodyDivider}`,
            selectors: {
                '&:hover': { background: palette.neutralLight },
            },
        },
    ],
    icon: {
        width: 48,
        height: 48,
    },
})

export class MioListItemAction extends React.Component<MioListItemActionProps> {

    private text: string;
    private icon: string;
    private hovered: boolean;

    constructor(props: MioListItemActionProps) {
        super(props);
        this.text = props.text;
        this.icon = props.icon;
        this.hovered = false;
    }

    render(): JSX.Element {
        return (
            <span onMouseEnter={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.mouseenter(event)} 
            onMouseLeave={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.mouseenter(event)}
            className={actionStyles.cell}>
                <div>{this.text + (this.hovered ? ' hovered' : '')}</div>
                <Icon iconName={this.icon} className={actionStyles.icon} />
            </span>
        );
    }

    mouseenter(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        this.hovered = true;

        event.stopPropagation();
    }

    mouseleave(event: React.MouseEvent<HTMLDivElement, MouseEvent>){
        this.hovered = false;
        event.stopPropagation();
    }

}

export interface MioListItemProps {
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
    metaText?: string;
    actions?: MioListItemAction[];
}

export interface MioListItemClasses {
    cell: string;
    containerStack: string;
    leftStack: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    rightStack: string;
    actionStack: string;
}

const itemStyles: MioListItemClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: '100%',
            minHeight: 54,
            padding: 5,
            boxSizing: 'border-box',
            borderBottom: `1px solid ${semanticColors.bodyDivider}`,
            display: 'flex',
            selectors: {
                '&:hover': { background: palette.neutralLight },
            },
        },
    ],
    containerStack: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    leftStack: {
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    primaryText: {
        fontSize: 26,
    },
    secondaryText: {
        fontSize: 20
    },
    tertiaryText: {
        fontSize: 14
    },
    metaText: {
        fontSize: 12
    },
    rightStack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    actionStack: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-end',
    },
});

export class MioListItem extends React.Component<MioListItemProps> {

    private primaryText: string;
    private secondaryText: string;
    private tertiaryText: string;
    private metaText: string;
    private actions: MioListItemAction[];

    constructor(props: MioListItemProps) {
        super(props);
        this.primaryText = props.primaryText;
        this.secondaryText = props.secondaryText;
        this.tertiaryText = props.tertiaryText;
        this.metaText = props.metaText;
        this.actions = props.actions;
    }

    public render(): JSX.Element {
        return (
            <div draggable={true} className={itemStyles.cell}>
                <Stack className={itemStyles.containerStack}>
                    <Stack className={itemStyles.leftStack}>
                        <Stack.Item><span className={itemStyles.primaryText}>{this.primaryText}</span></Stack.Item>
                        <Stack.Item><span className={itemStyles.secondaryText}>{this.secondaryText}</span></Stack.Item>
                        <Stack.Item><span className={itemStyles.tertiaryText}>{this.tertiaryText}</span></Stack.Item>
                    </Stack>
                    <Stack className={itemStyles.rightStack}>
                        <Stack.Item><List items={this.actions}></List></Stack.Item>
                        <Stack className={itemStyles.actionStack}>
                            {/* <List items={this.actions} onRenderCell={(item: MioListItemAction) => this.render_action(item)} /> */}
                            <MioListItemAction text='test' icon='ChevronUp'></MioListItemAction>
                            <MioListItemAction text='test' icon='ChevronUp'></MioListItemAction>
                            <MioListItemAction text='test' icon='ChevronUp'></MioListItemAction>
                        </Stack>
                        <Stack.Item className={itemStyles.metaText}>{this.metaText}</Stack.Item>
                    </Stack>
                </Stack>
            </div>
        );
    }

    // render_actions(): JSX.Element {
    //     return Array.apply(null, Array(this.actions.length)).map((action: MioListItemAction) => {
    //         return (
    //             <MioListItemAction text={action.props.text} icon={action.props.icon} />
    //         );
    //     });
        
    // }

    render_action(item: MioListItemAction): JSX.Element {
        return (
            <Stack.Item><MioListItemAction text={item.props.text} icon={item.props.icon}></MioListItemAction></Stack.Item>
        );
    }

}