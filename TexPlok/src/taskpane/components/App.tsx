import * as React from "react";
import { DefaultButton, PrimaryButton, Stack, IStackItemStyles, IStackTokens, IStackItemTokens } from 'office-ui-fabric-react';
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
    controls: string;
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
        width: 'auto',
        selectors: {
            // '&:hover': { background: palette.themeLighterAlt },
            // '&:focus': {
            //     border: `1px solid ${palette.themePrimary}`,
            //     background: palette.themeLight,
            // },
        },
    },
    controls: {
        alignItems: 'flex-start',
		display: 'flex',
		justifyContent: 'space-evenly',
        padding: '5px',
        flexDirection: 'row',
    },
})

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
            <Stack className={styles.controls} tokens={stControl}>
                <Stack.Item grow={3} styles={ssControlItem} tokens={stControlItem}><SearchBox className={styles.searchBox} placeholder="Search" onSearch={newValue => _search(newValue)} /></Stack.Item>
                <Stack.Item shrink={1} styles={ssControlItem} tokens={stControlItem}><PrimaryButton text="Collapse" onClick={_collapse} allowDisabledFocus /></Stack.Item>
                <Stack.Item shrink={1} styles={ssControlItem} tokens={stControlItem}><DefaultButton text="Clear" onClick={clearConsole} allowDisabledFocus /></Stack.Item>
            </Stack>
            <MioList items={[
                { icon: 'DocumentSet', primaryText: 'Antrag', secondaryText: '§A32 Klasse A', tertiaryText: 'mit Anhang C', actions: [MioListItemActionType.Edit], items: [
                    { primaryText: 'Antrag', tertiaryText: '§A32', metaText: '###', items: [
                        { secondaryText: 'Klasse A', metaText: 'test', items: [
                            { tertiaryText: 'Antrag' },
                            { tertiaryText: 'Anhang C', actions: [MioListItemActionType.Feedback], items: [
                                { primaryText: 'Zusatz B43' }
                            ]}
                        ]}
                    ] }
                ]},
                { secondaryText: 'ROFL', metaText: 'Lol', items: [
                    { tertiaryText: 'Blubb!', actions: [MioListItemActionType.Delete] },
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
