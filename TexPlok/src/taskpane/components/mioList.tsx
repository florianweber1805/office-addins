import * as React from 'react';
import { MioListItem, MioListItemProps } from './mioListItem';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { redraw } from '..';

const theme: ITheme = getTheme();
//const { palette } = theme;

export interface MioListProps {
    items?: MioListItemProps[];
}

export interface MioListClasses {
    wrapper: string;
    list: string;
    item: string;
}

const listStyles: MioListClasses = mergeStyleSets({
    wrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        overflowY: 'scroll',
    },
    list: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: 'auto',
            marginBottom: 'auto',
            margin: '0 5px 0 5px',
            padding: 0,   
        },
    ],
    item: {
        padding: 0,
        margin: 0,
    },
})

export interface MioListState {
    items: MioListItem[];
}

export class MioList extends React.Component<MioListProps, MioListState> {

    private items: MioListItem[];
    private loading: boolean;

    constructor(props: MioListProps) {
        super(props);

        this.items = new Array<MioListItem>();
        this.fetchData();

        // this.state = {
        //     items: props.items.map((value: MioListItemProps) => {
        //         return new MioListItem(value);
        //     }),
        // }
    }

    render(): JSX.Element {
        return (
            <div className={listStyles.wrapper}>
                <ul className={listStyles.list}>
                    {this.items.map((value: MioListItem, index: number) => 
                        <li className={listStyles.item} key={index}>{value}</li>
                    )}
                </ul>
            </div>
        );
    }

    setItems(textblocks: MioListItemProps[]) {
        this.items = textblocks.map((value: MioListItemProps) => new MioListItem(value));
        redraw();
        console.log('rofl');
    }

    fetchData() {
        this.loading = true;

        try {
            fetch('load.php')
            .then(response => {
                if (!response.ok) { throw Error(response.statusText); }
                return response.json();
            })
            .then(commit => {
                var textblocks = new Array<MioListItemProps>();
                console.log(commit);
                for (var i = 0; i < commit.length; i++) {
                    console.log(commit[i]);
                    textblocks.push({icon: 'DocumentSet', secondaryText: commit[i].Text, tertiaryText: commit[i].Description, metaText: commit[i].Timestamp});
                }
                this.setItems(textblocks);
            }).catch(function(error) {
                console.log(error);
            });
        } catch {
            var textblocks = new Array<MioListItemProps>();
            for (var i = 0; i < 11; i++) {
                textblocks.push({icon: 'DocumentSet', secondaryText: 'text_' + i, tertiaryText: 'description_' + i, metaText: Date.now.toString()});
            }
            this.setItems(textblocks);
        }
    }

}