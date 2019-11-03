import * as React from "react";
import { DefaultButton, PrimaryButton, Stack, IStackItemStyles, IStackStyles, IStackTokens, IStackItemTokens } from 'office-ui-fabric-react';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { MioListItemActionType } from './mioListItemAction';
import { initializeIcons } from '@uifabric/icons';
import { MioList, consoleClear } from "./mioList";
initializeIcons();

export const theme: ITheme = getTheme();
export const { palette } = theme;

export interface AppClasses {
    cell: string;
    searchBox: string;
}

const styles: AppClasses = mergeStyleSets({
    cell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
    ],
    searchBox: {
        width: '100%',
        selectors: {
            '&:hover': { background: palette.themeLighterAlt },
        },
    }
})

const ssControl: IStackStyles = {
    root: { 
        alignItems: 'flex-start',
		display: 'flex',
		justifyContent: 'space-evenly',
        padding: '5px',
        flexDirection: 'row',
    }
};

const ssControlItem: IStackItemStyles = {
    root: {
        padding: 2,
    }
};

const stControl: IStackTokens = {
    padding: 2,
};

const stControlItem: IStackItemTokens = {
    padding: 2,
}

export const App: React.FunctionComponent = () => {
	return (
        <div className={styles.cell}>
            <Stack styles={ssControl} tokens={stControl}>
                <Stack.Item grow={5} styles={ssControlItem} tokens={stControlItem}><SearchBox className={styles.searchBox} placeholder="Search" onSearch={newValue => _search(newValue)} /></Stack.Item>
                <Stack.Item styles={ssControlItem} tokens={stControlItem}><PrimaryButton text="Collapse" onClick={_collapse} allowDisabledFocus /></Stack.Item>
                <Stack.Item styles={ssControlItem} tokens={stControlItem}><DefaultButton text="Clear" onClick={clearConsole} allowDisabledFocus /></Stack.Item>
            </Stack>
            <MioList items={[
                { primaryText: 'Test 9', secondaryText: 'Alter', tertiaryText: 'Was Geht?', actions: [MioListItemActionType.Edit], items: [
                    { primaryText: 'lol', tertiaryText: 'Nut', metaText: '###' }
                ]},
                { secondaryText: 'ROFL', metaText: 'Lol', items: [
                    { tertiaryText: 'Blubb!' },
                    { tertiaryText: 'Blubber!!', items: [
                        { primaryText: 'EOEO' }
                    ]}
                ]}
            ]} />
        </div>
	);
};

function _search(newValue: string): void {
	alert('value is ' + newValue);
}

function _collapse(): void {

	alert('Collapse!');
}

function clearConsole(): void {
    consoleClear();
}
