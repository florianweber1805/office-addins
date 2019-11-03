import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IconButton, Stack } from 'office-ui-fabric-react';
import { consoleLog } from './mioList';

const theme: ITheme = getTheme();
const { palette } = theme;

export enum MioListItemActionType {
    Edit,
    Feedback,
    Delete,
}

export const MioListItemActions = {
    [MioListItemActionType.Edit]: {
        text: 'Edit',
        icon: 'PageEdit',
    },
    [MioListItemActionType.Feedback]: {
        text: 'Feedback',
        icon: 'Feedback',
    },
    [MioListItemActionType.Delete]: {
        text: 'Delete',
        icon: 'Delete',
    },
}

export interface MioListItemActionProps {
    type: MioListItemActionType;
}

export interface MioListItemActionClasses {
    cell: string;
}

const actionStyles: MioListItemActionClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: '100%',
            height: '100%',
            padding: '5px',
            display: 'flex',
            justifyContent: 'flex-end',
            selectors: {
                '&:hover': { background: palette.themeLighterAlt },
            },
            cursor: 'pointer',
        },
    ],
})

export class MioListItemAction extends React.Component<MioListItemActionProps> {

    private text: string;
    private icon: string;

    constructor(props: MioListItemActionProps) {
        super(props);
        this.text = MioListItemActions[props.type].text;
        this.icon = MioListItemActions[props.type].icon;
    }

    render(): JSX.Element {
        return (
            <Stack.Item>
                <IconButton ariaLabel={this.text} iconProps={{color: palette.white, iconName: this.icon}} className={actionStyles.cell}
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onClick(event)}
                />
            </Stack.Item>
        );
    }

    onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        consoleLog('test');
        event.stopPropagation();
    }

}