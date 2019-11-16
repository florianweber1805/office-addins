import * as React from 'react';
import { MioListItem } from './mioListItem';

export interface MioEditorProps {
    item: number;
}

export interface MioEditorState {
    item: number;
}

export class MioEditor extends React.Component<MioEditorProps, MioEditorState> {

    constructor(props: MioEditorProps) {
        super(props);
        this.state = {
            item: props.item,
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props: MioEditorProps) {
        if (props.item != this.state.item) {
            console.log(props.item + " <> " + this.state.item);
            this.setState({item: props.item});
            this.forceUpdate();
        }
    }

    render(): JSX.Element {
        return (
            <div style={{padding: 20}}>
                <MioListItem onChange={this.onChange} edit={true} onEdit={function(item: MioListItem){console.log(item.state.id);}} id={this.state.item} />
            </div>
        );
    }

    onChange(item: MioListItem) {
        console.log(item);
    }

}