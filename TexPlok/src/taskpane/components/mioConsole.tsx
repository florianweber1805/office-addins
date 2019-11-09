import * as React from 'react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme: ITheme = getTheme();

export interface MioConsoleProps {
    lines: string[];
}

export interface MioConsoleState {
    lines: string[];
}

export interface MioConsoleClasses {

}

const listStyles: MioConsoleClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {

        },
    ],
})

export class mioConsole extends React.Component<MioConsoleProps, MioConsoleState> {

    constructor(props: MioConsoleProps) {
        super(props)
        
    }

    render(): JSX.Element {
        return (
            <div></div>
        );
    }

}