import * as React from 'react';
import { MioListItem, MioListItemProps } from './mioListItem';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme: ITheme = getTheme();
//const { palette } = theme;

export interface MioListProps {
    items: MioListItemProps[];
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

    constructor(props: MioListProps) {
        super(props);
        this.state = {
            items: props.items.map(value => {
                return new MioListItem(value);
            }),
        }
    }

    render(): JSX.Element {
        return (
            <div className={listStyles.wrapper}>
                <ul className={listStyles.list}>
                    {this.state.items.map((value: MioListItem, index: number) => 
                        <li className={listStyles.item} key={index}>{value.render()}</li>
                    )}
                </ul>
            </div>
        );
    }

}