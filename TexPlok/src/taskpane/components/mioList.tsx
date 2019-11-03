import * as React from 'react';
import { MioListItem, MioListItemProps } from './mioListItem';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { redraw } from '..';
//import { redraw } from '..';

const theme: ITheme = getTheme();
//const { palette } = theme;

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
            width: '100%',
            height: '100%',
            borderRadius: 5,
            //boxSizing: 'border-box',
            padding: '0 5px 0 5px',
            // selectors: {
            //     '&:hover': { background: palette.themeLighterAlt },
            // },
        },
    ],
})

export interface MioListState {
    items: MioListItem[];
}

var lines = new Array<string>();

export function consoleLog(message: string) {
    lines.push(message);
    redraw();
}

export function consoleClear() {
    lines = new Array<string>();
    redraw();
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
            <div className={listStyles.cell}>
                {this.state.items.map(value => { return value.render(); })}
                {lines.map(value => (
                    <div>{value}</div>
                ))}
            </div>
        );
    }

}