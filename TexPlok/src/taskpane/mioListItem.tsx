import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
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
            minHeight: 54,
            padding: 10,
            boxSizing: 'border-box',
            borderBottom: `1px solid ${semanticColors.bodyDivider}`,
            display: 'flex',
            selectors: {
                '&:hover': { background: palette.neutralLight },
            },
        },
    ],
    icon: {
        fontSize: 14,
        width: 30,
        height: 30,
    },
})

export class MioListItemAction extends React.Component<MioListItemActionProps> {

    private text: string;
    private icon: string;

    constructor(props: MioListItemActionProps) {
        super(props);
        this.text = props.text;
        this.icon = props.icon;
    }

    render(): JSX.Element {
        return (
            <FontIcon iconName={this.icon} className={actionStyles.icon}>{this.text}</FontIcon>
        );
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
    topStack: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    actionStack: string;
    action: string;
}

const itemStyles: MioListItemClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: '100%',
            minHeight: 54,
            padding: 10,
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
    topStack: {
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
    actionStack: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap-reverse',
    },
    action: {
        
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
                    <Stack className={itemStyles.topStack}>
                        <Stack.Item><span className={itemStyles.primaryText}>{this.primaryText}</span></Stack.Item>
                        <Stack.Item><span className={itemStyles.secondaryText}>{this.secondaryText}</span></Stack.Item>
                        <Stack.Item><span className={itemStyles.tertiaryText}>{this.tertiaryText}</span></Stack.Item>
                        <Stack.Item><span className={itemStyles.metaText}>{this.metaText}</span></Stack.Item>
                    </Stack>
                    <Stack className={itemStyles.actionStack}>
                        <Stack.Item><List items={this.actions}></List></Stack.Item>
                    </Stack>
                </Stack>
            </div>
        );
    }

    render_action(): JSX.Element {
        return (
            <div>{'lol'}</div>
        );
    }

}