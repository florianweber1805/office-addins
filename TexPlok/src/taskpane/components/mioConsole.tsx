import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme: ITheme = getTheme();

export interface MioConsoleProps {
    lines?: string[];
}

export interface MioConsoleClasses {
    cell: string;
}

const listStyles: MioConsoleClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: 'auto',
        },
    ],
})

export class MioConsole extends React.Component<MioConsoleProps> {

    constructor(props: MioConsoleProps) {
        super(props)
    }

    render(): JSX.Element {
        return (
            <div className={listStyles.cell}></div>
        );
    }

}