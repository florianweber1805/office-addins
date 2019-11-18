import * as React from 'react';
import { MioListItem, MioListItemProps } from './mioListItem';
import { mergeStyleSets, ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioEditorPageProps {
    item: MioListItemProps;
}

export interface MioEditorPageState {
    item: MioListItemProps;
}

export class MioEditorPage extends React.Component<MioEditorPageProps, MioEditorPageState> {

    // ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

    constructor(props: MioEditorPageProps) {
        super(props);
        this.state = {
            item: props.item,
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props: MioEditorPageProps) {
        if (props.item != this.state.item) {
            this.setState({item: props.item});
            this.forceUpdate();
        }
    }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    render(): JSX.Element {
        console.log(palette);
        const item = this.props.item;
        return (
            <div className={styles.editorPage}><div className={styles.item}>
                <MioListItem id={item.id} icon={item.icon} primaryText={item.primaryText} secondaryText={item.secondaryText}
                    tertiaryText={item.tertiaryText} metaText={item.metaText} expanded={true} onChange={this.onChange} 
                    edit={true} onEdit={function(item: MioListItem){console.log(item.props.id);}} />
            </div></div>
        );
    }

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    onChange(item: MioListItem) {
        console.log(item);
    }

}

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

interface MioEditorPageClasses {
    editorPage: string;
    item: string;
}

const styles: MioEditorPageClasses = mergeStyleSets({
    editorPage: {
        width: '100%',
        height: 'calc(100% - 42px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        overflowY: 'scroll',
    },
    item: {
        width: 'auto',
        margin: 10,
    },
})
