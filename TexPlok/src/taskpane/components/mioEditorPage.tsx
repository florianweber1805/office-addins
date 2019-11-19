import * as React from 'react';
import { MioListItem, MioListItemProps } from './mioListItem';
import { mergeStyleSets, ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { updatePage } from './mioEditor';

const theme: ITheme = getTheme();
const { palette } = theme;
console.log(palette);

export interface MioEditorPageProps {
    id: number;
    item: MioListItemProps;
    //onChange: (item: MioListItemChange) => void;
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

    // componentWillReceiveProps(props: MioEditorPageProps) {
    //     if (props.item != this.props.item) {
    //         this.setState({item: props.item});
    //         this.forceUpdate();
    //     }
    // }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    render(): JSX.Element {
        const item = this.state.item;
        return (
            <div className={styles.editorPage}><div className={styles.item}>
                <MioListItem id={item.id} icon={item.icon} primaryText={item.primaryText} secondaryText={item.secondaryText}
                    tertiaryText={item.tertiaryText} metaText={item.metaText} expanded={true} //onChange={this.props.} //onEdit={function(item: MioListItem){console.log(item.props.id);}}
                    edit={true} items={item.items} actions={item.actions} onChange={this.onChange} /> 
            </div></div>
        );
    }

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    onChange() {
        updatePage(this.props.id, this.state.item);
    }

    // onChange(item: MioListItemChange) {
    //     updateEditorItem(this.props.id, item);
    // }
    //     //this.setState({item: item});
    //     this.props.onChange(item);

    //     // this.props.onChange({
    //     //     id: item.props.id,
    //     //     icon: item.state.icon,
    //     //     primaryText: item.state.primaryText,
    //     //     secondaryText: item.state.secondaryText,
    //     //     tertiaryText: item.state.tertiaryText,
    //     //     metaText: item.props.metaText,
    //     //     items: item.state.items,
    //     //     actions: item.state.actions,
    //     //     onEdit: function(){},
	// 	// 	onChange: function(){},
	// 	// 	edit: true,
    //     // });
    //     // this.setState((state) => {
    //     //     return {
    //     //         item: state.item,
    //     //     };
    //     // });
    //     console.log('Changed: ' + item.id);
    // }

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
        height: '100%',
        overflow: 'hidden',
        overflowY: 'scroll',
    },
    item: {
        width: 'auto',
        margin: 10,
    },
})
