import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IconButton, format } from 'office-ui-fabric-react';
import { consoleLog } from './mioList';
import { classnames } from './Helper';

const theme: ITheme = getTheme();
const { palette } = theme;

export enum MioListItemActionType {
    Edit, Feedback, Delete,
}

export const MioListItemActions = {
    [MioListItemActionType.Edit]: { text: 'Edit', icon: 'PageEdit', },
    [MioListItemActionType.Feedback]: { text: 'Feedback', icon: 'Feedback', },
    [MioListItemActionType.Delete]: { text: 'Delete', icon: 'Delete', },
}

export interface MioListItemActionProps {
    type: MioListItemActionType;
}

export interface MioListItemActionClasses {
    cell: string;
    button: string;
}

const actionStyles: MioListItemActionClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: 'auto',
            height: 'auto',
            cursor: 'pointer',
            padding: 0,
        },
    ],
    button: {
        padding: '5px',
    },
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
            <div className={actionStyles.cell}>
                <IconButton ariaLabel={this.text} iconProps={{color: palette.white, iconName: this.icon}} className={classnames(['action', actionStyles.button])}
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onClick(event)}
                />
            </div>
        );
    }

    onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        consoleLog(format('Action "{0}" pressed!', this.text));
        event.stopPropagation();
    }

}