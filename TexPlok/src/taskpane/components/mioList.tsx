import * as React from 'react';
import Progress from './Progress'
import { MioListItem, MioListItemProps } from './mioListItem';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { fetchdata, urlDefault, mioLogo, mapItems } from './Helper';
import { MioListControls } from './mioListControls';

export interface MioListProps {}
export interface MioListState {
    items: MioListItemProps[];
    search: string;
    edit: number;
    loading: boolean;
    delay: boolean;
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
            items: new Array<MioListItemProps>(),
            loading: true,
            delay: true,
            search: undefined,
            edit: undefined,
            error: undefined,
        }
        this.renderItems = this.renderItems.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderProgress = this.renderProgress.bind(this);
        // this.onEdit = this.onEdit.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        const that = this;
        fetchdata(urlDefault, function(data: any) { 
            that.setState({items: mapItems(data), loading: false});
        }, function() {
            that.setState({loading: false});
        }, function(error: any) {
            that.setState({error: error, loading: false});
        });
        setTimeout(function () {
            that.setState({delay: false});
        }, 10);
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
            {this.state.items.map((item: MioListItemProps, index: number) => 
                <MioListItem key={index} id={item.id} edit={false} icon={item.icon} primaryText={item.primaryText} secondaryText={item.secondaryText} 
                    tertiaryText={item.tertiaryText} metaText={item.metaText} items={item.items} actions={item.actions} //onChange={null} onEdit={this.onEdit}
                    onChange={null}
                />
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
    renderProgress(): JSX.Element { 
        return (<Progress loading={true} logo={mioLogo} title={'TexPlok'} message={'Loading...'} />); 
    }

    render(): JSX.Element { 
        return (this.state.loading || this.state.delay ? this.renderProgress() : this.renderList()); 
    }

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    // onEdit(item: MioListItem) {
    //     if (this.props.onEdit != undefined) { this.props.onEdit(item.props); }
    // }

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
        position: 'absolute',
        width: '100%',
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
