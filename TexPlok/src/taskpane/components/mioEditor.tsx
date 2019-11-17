import * as React from 'react';
import { MioListItem } from './mioListItem';
import { mergeStyleSets, ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';

const theme: ITheme = getTheme();
const { palette } = theme;

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
        console.log(palette);
        return (
            <div className={styles.editor}>
                <MioListItem expanded={true} onChange={this.onChange} edit={true} onEdit={function(item: MioListItem){console.log(item.state.id);}} id={this.state.item} />
            </div>
        );
    }

    onChange(item: MioListItem) {
        console.log(item);
    }

}

interface MioEditorClasses {
    editor: string;
}

const styles: MioEditorClasses = mergeStyleSets({
    editor: {
        padding: 20,
    },
})
