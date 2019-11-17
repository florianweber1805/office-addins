import * as React from 'react';
import Progress from './Progress'
import { MioListItem } from './mioListItem';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { fetchdata, urlDefault, mioLogo } from './Helper';
import { MioListControls } from './mioListControls';

export interface MioListProps {
    onEdit?: (item: MioListItem) => void;
}

export interface MioListState {
    items: number[];
    search: string;
    edit: number;
    loading: boolean;
    error: string;
}

export class MioList extends React.Component<MioListProps, MioListState> {

    // ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

    constructor(props: MioListProps) {
        super(props);
        this.state = {
            items: new Array<number>(),
            loading: true,
            search: undefined,
            edit: undefined,
            error: undefined,
        }
        this.renderItems = this.renderItems.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderProgress = this.renderProgress.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        const that = this;
        fetchdata(urlDefault, function(data: any) { 
            that.setState({items: data.map(obj => obj.id), loading: false});
        }, function() {
            that.setState({loading: false});
        }, function(error: any) {
            that.setState({error: error, loading: false});
        });
    }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    // Render list items in a scrollable wrapper
    renderItems(): JSX.Element {
        return (<div className={styles.itemStack}>
            {this.state.items.map((id: number, index: number) => 
                <MioListItem key={index} onChange={null} edit={false} onEdit={this.onEdit} id={id} />
            )}
        </div>);
    }

    // Render list
    renderList(): JSX.Element {
        return(<div className={styles.wrapper}>
            <MioListControls onSearch={newValue => this.search(newValue)} />
            {this.renderItems()}
        </div>);
    }

    // Render progress
    renderProgress(): JSX.Element { return (<Progress logo={mioLogo} title={'TexPlok'} message={'Loading...'} />); }

    render(): JSX.Element { return (this.state.loading ? this.renderProgress() : this.renderList()); }

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    onEdit(item: MioListItem) {
        if (this.props.onEdit != undefined) { this.props.onEdit(item); }
    }

    search(value: string) { this.setState({search: value}); }

}

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

export interface MioListClasses {
    wrapper: string;
    itemStack: string;
}

export const styles: MioListClasses = mergeStyleSets({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    itemStack: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: 10,
    },
})
