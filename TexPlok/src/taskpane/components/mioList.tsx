import * as React from 'react';
import { MioListItem, renderMioListItem } from './mioListItem';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack, SearchBox, IconButton } from 'office-ui-fabric-react';

const theme: ITheme = getTheme();
//const { palette } = theme;

export interface MioListProps {
    items?: MioListItem[];
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

export interface MioListState {
    items: MioListItem[];
    loading: boolean;
    search: string;
}

export class MioList extends React.Component<MioListProps, MioListState> {

    constructor(props: MioListProps) {
        super(props);
        this.state = {
            items: (props.items != undefined ? props.items : new Array<MioListItem>()),
            loading: false,
            search: '',
        }

        this.search = this.search.bind(this);
        this.loadExampleData = this.loadExampleData.bind(this);
    }

    componentDidMount() {
        const that = this;
        this.setState({loading: true});

        fetch('https://addin.eap4.me/load.php')
            .then(response => response.json())
            .then(function(data) {
                that.setState({loading: false, items: data.map(obj => {
                    console.log(obj);
                    return new MioListItem({id: obj.id, icon: 'DocumentSet', secondaryText: obj.text, 
                        tertiaryText: obj.description, metaText: obj.timestamp});
                })});
            }, function(reason) {
                console.log('Fehler: "' + reason + '"');
                that.setState({loading: false, items: that.loadExampleData()});
            }).catch(function(error) {
                console.log('Fehler: "' + error + '"');
            });
    }

    loadExampleData(): MioListItem[] {
        var newItems = new Array<MioListItem>();
        for (var i = 0; i < 11; i++) {
            var Item = new MioListItem({id: i, icon: 'DocumentSet', secondaryText: 'text_' + i, 
                tertiaryText: 'description_' + i, metaText: Date().toLocaleString()});
            newItems.push(Item);
        }
        return newItems;
    }

    render(): JSX.Element {
        return (
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
                        {this.state.items.map((item: MioListItem, index: number) =>
                            <li className={listStyles.item} key={index}>
                                {renderMioListItem(item)}
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