import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IconButton, format, Spinner } from 'office-ui-fabric-react';
import { classnames, fetchdata, urlActionInfo } from './Helper';

const theme: ITheme = getTheme();
//const { palette } = theme;

export enum MioListItemActionType {
    Edit, Feedback, Delete,
}

export const MioListItemActions = {
    [MioListItemActionType.Edit]: { text: 'Edit', icon: 'PageEdit', },
    [MioListItemActionType.Feedback]: { text: 'Feedback', icon: 'Feedback', },
    [MioListItemActionType.Delete]: { text: 'Delete', icon: 'Delete', },
}

export interface MioListItemActionProps {
    action: number;
    parent: number;
}

export interface MioListItemActionState {
    action: number;
    parent: number;
    text: string;
    icon: string;
    loading: boolean;
}

export class MioListItemAction extends React.Component<MioListItemActionProps, MioListItemActionState> {

    constructor(props: MioListItemActionProps) {
        super(props);
        this.state = {
            action: props.action,
            parent: props.parent,
            text: '',
            icon: '',
            loading: false,
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        const that = this;
        this.setState({loading: true});
        fetchdata(format(urlActionInfo, this.state.action),
        function(data) {
            that.setState({
                text: data[0].name,
                icon: data[0].icon,
                loading: false,
            });
        }, function() {
            that.setState({loading: false});
        });
    }

    render(): JSX.Element {
        return (
            this.state.loading ? 
                <Spinner></Spinner>
            :
                <div className={actionStyles.cell}>
                    <IconButton label={this.state.text} iconProps={{iconName: this.state.icon}} className={classnames(['action', actionStyles.button])}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onClick(event)}
                    />
                </div>
        );
    }

    onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        //consoleLog(format('Action "{0}" pressed!', this.text));
        var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
        window.open('https://addin.eap4.me/taskpane.html', '_blank', strWindowFeatures);
        event.stopPropagation();
    }

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
