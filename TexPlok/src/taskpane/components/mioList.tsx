import * as React from 'react';
import { MioListItem } from './mioListItem';
import { mergeStyleSets, ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { fetchdata, urlDefault, mioLogo } from './Helper';
import Progress from './Progress'
import { MioListControls } from './mioListControls';

const theme: ITheme = getTheme();
const { palette } = theme;

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
        this.search = this.search.bind(this);
        this.onEdit = this.onEdit.bind(this);
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
    renderProgress(): JSX.Element {
        return (<Progress logo={mioLogo} title={'TexPlok'} message={'Loading...'} />);
    }

    render(): JSX.Element {
        console.log(palette);
        return (
            this.state.loading ? this.renderProgress() : this.renderList()
        );
    }

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    onEdit(item: MioListItem) {
        if (this.props.onEdit != undefined) { this.props.onEdit(item); }
    }

    search(value: string) {
        console.log(value);
        this.setState({search: value});
    }

}

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
