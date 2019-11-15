import * as React from 'react';
import { MioListItem } from './mioListItem';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, SearchBox, IconButton, IContextualMenuProps } from 'office-ui-fabric-react';
import { fetchdata, urlDefault } from './Helper';
import Progress from './Progress'

const theme: ITheme = getTheme();
//const { palette } = theme;

export interface MioListProps {
    items?: MioListItem[];
}

export interface MioListState {
    items: number[];
    search: string;
    edit: number;
    loading: boolean;
    error: string;
}

const menuProps: IContextualMenuProps = {
    items: [
        {
            key: 'test',
            text: 'test',
            iconProps: {iconName: 'Add'},
        },
        {
            key: 'refresh',
            text: 'Refresh',
            iconProps: {iconName: 'Refresh'},
        },
    ],
};

export class MioList extends React.Component<MioListProps, MioListState> {

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

    render(): JSX.Element {
        return (
            this.state.loading ? <Progress logo={'https://www.kjh-mio.de/s/misc/logo.jpg?t=1573588989'} title={'TexPlok'} message={'Loading...'} /> :
                this.state.error != undefined ? <div></div> :
                    <div className={listStyles.cell}>
                        <Stack className={listStyles.controls}>
                            <Stack.Item>
                                <IconButton menuProps={menuProps} primary={true} iconProps={{iconName: 'GlobalNavButton'}}></IconButton>
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
            position: 'relative',
            //left: 0,
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
