import * as React from 'react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IContextualMenuProps, IconButton, SearchBox } from 'office-ui-fabric-react';

export interface MioListControlsProps {
    onSearch: (newValue: string) => void;
}
export interface MioListControlsState {}

export class MioListControls extends React.Component<MioListControlsProps, MioListControlsState> {

    // ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

    menuProps: IContextualMenuProps = {
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

    constructor(props: MioListControlsProps) {
        super(props);
    }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    render(): JSX.Element {
        return (
            <div className={styles.wrapper}>
                <IconButton className={styles.mainButton} menuProps={this.menuProps} primary={true} iconProps={{iconName: 'GlobalNavButton'}}></IconButton>
                <SearchBox className={styles.searchBox} placeholder="Search" onSearch={newValue => this.props.onSearch(newValue)}/>
            </div>
        );
    }

}

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

export interface MioListClasses {
    wrapper: string;
    mainButton: string;
    searchBox: string;
}

export const styles: MioListClasses = mergeStyleSets({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
    },
    mainButton: {},
    searchBox: {
        marginLeft: 5,
        flexGrow: 1,
        flexShrink: 1,
    },
})
