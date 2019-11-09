import * as React from 'react';
import { MioListItem, MioListItemProps } from './mioListItem';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme: ITheme = getTheme();

export interface MioListProps {
    items: MioListItemProps[];
}

export interface MioListClasses {
    cell: string;
}

const listStyles: MioListClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: 'auto',
            height: 'auto',
            margin: '0 5px 0 5px',
        },
    ],
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
            <ul className={listStyles.cell}>
                {/* Render ListItems */}
                {this.state.items.map((value: MioListItem, index: number) => {
                    return <div key={index}>{value.render()}</div>
                })}
            </ul>
        );
    }

}