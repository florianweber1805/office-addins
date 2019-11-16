import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';

export interface MioTextfieldProps {
    text: string;
    edit: boolean;
    className: string;
    onChange: () => void;
}

export interface MioTextfieldState {
    text: string;
    edit: boolean;
    className: string;
}

export class MioTextfield extends React.Component<MioTextfieldProps, MioTextfieldState> {

    constructor(props: MioTextfieldProps) {
        super(props);
        this.state = {
            text: props.text,
            edit: props.edit,
            className: props.className,
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props: MioTextfieldProps) {
        if (props.text != this.state.text) {
            this.setState({text: props.text});
        }
    }

    render(): JSX.Element {
        return (
            !this.state.edit ?
                <Label className={this.state.className}>{this.state.text}</Label>
            :
                <TextField className={this.state.className} value={this.state.text} multiline={true} 
                    onClick={(event: React.MouseEvent<HTMLInputElement>) => this.onClick(event)}
                    onChange={(event: React.FormEvent<HTMLInputElement>, newvalue: string) => this.onChange(event, newvalue)}
                />
        );
    }

    onClick(event: React.MouseEvent<HTMLInputElement>) {
        event.stopPropagation();
    }

    onChange(event: React.FormEvent<HTMLInputElement>, newvalue: string) {
        this.props.onChange();
        this.setState({text: newvalue});
        console.log(newvalue);
        event.preventDefault();
    }

}