import * as React from 'react';
import { MioListItem } from './mioListItem';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, SearchBox, IconButton, Spinner } from 'office-ui-fabric-react';
import { fetchdata, urlDefault } from './Helper';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const theme: ITheme = getTheme();
//const { palette } = theme;

export interface MioListProps {
    items?: MioListItem[];
}

export interface MioListState {
    items: number[]; loading: boolean; search: string; edit: number;
}

export class MioList extends React.Component<MioListProps, MioListState> {

    constructor(props: MioListProps) {
        super(props);
        this.state = {
            items: new Array<number>(), loading: false,
            search: '',
            edit: 0,
        }
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        const that = this;
        this.setState({loading: true});
        fetchdata(urlDefault,
        function(data) { 
            that.setState({
                loading: false,
                items: data.map(obj => obj.id)
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
                <div className={listStyles.cell}>
                    <Stack className={listStyles.controls}>
                        <Stack.Item>
                            <IconButton primary={true} iconProps={{iconName: 'GlobalNavButton'}}></IconButton>
                        </Stack.Item>
                        <Stack.Item grow={3}>
                            <SearchBox className={listStyles.searchBox} placeholder="Search" onSearch={newValue => this.search(newValue)}/>
                        </Stack.Item>
                    </Stack>
                    <div className={listStyles.wrapper}>
                        <ul className={listStyles.list}>
                            {this.state.items.map((id: number, index: number) =>
                                <li className={listStyles.item} key={index}>
                                    <MioListItem id={id} />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
        );
    }

    search(value: string) {
        console.log(value);
        this.setState({search: value});
    }

}
















export interface MioListClasses {
    cell: string;
    searchBox: string;
    controls: string;
    wrapper: string;
    list: string;
    item: string;
}

export const listStyles: MioListClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            height: '100%',
            position: 'absolute',
            left: 0,
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
    ],
    searchBox: {
        width: 'auto',
    },
    controls: {
        alignItems: 'flex-start',
		display: 'flex',
		justifyContent: 'space-evenly',
        padding: '5px',
        flexDirection: 'row',
    },
    wrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        overflowY: 'scroll',
    },
    list: {
        width: 'auto',
        marginBottom: 'auto',
        margin: '0 5px 0 5px',
        padding: 0,   
    },
    item: {
        padding: 0,
        margin: 0,
    },
})
