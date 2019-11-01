import * as React from "react";
import { DefaultButton, PrimaryButton, Stack, IStackItemStyles } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { MioListItem } from '../mioListItem';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

const stackStyles: IStackItemStyles = {
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingBottom: '5px',
  }
};

const searchBoxStyles: IStackItemStyles = {
  root: {
    
    // alignItems: 'stretch',
    // display: 'flex',
    // justifyContent: 'stretch'
    
  }
};

export const App: React.FunctionComponent = () => {
  return (


    <Stack padding="5px">
      <Stack styles={stackStyles} horizontal gap={5}>
        <Stack.Item grow={3}><SearchBox styles={searchBoxStyles} placeholder="Search" onSearch={newValue => _search(newValue)}></SearchBox></Stack.Item>
        <Stack.Item shrink={3}><PrimaryButton text="Collapse" onClick={_collapse} allowDisabledFocus /></Stack.Item>
        <Stack.Item shrink={3}><DefaultButton text="Clear" onClick={_clear} allowDisabledFocus /></Stack.Item>
      </Stack>

      <MioListItem primaryText='test'></MioListItem>
      <MioListItem secondaryText='rofl'></MioListItem>
      <MioListItem primaryText='Category' secondaryText='rofl' tertiaryText='text dsjfhksjdf'></MioListItem>
      <MioListItem primaryText='Category' metaText='nice' tertiaryText='text dsjfhksjdf' secondaryText='ajfas'
        actions={Array.apply(null, Array(3)).map((index: number) => {
          return {
            text: 'ac' + index,
            icon: 'CompassNW'
          };
        })}
      ></MioListItem>

    </Stack>
    
  );
};

function _search(newValue: string): void {
  alert('value is ' + newValue);
}

function _collapse(): void {
  alert('Collapse!');
}

function _clear(): void {
  alert('Clear!');
}
