import * as React from "react";
import { MioList } from "./mioList";
import { isOfficeInitialized } from "..";
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from "office-ui-fabric-react";


const theme: ITheme = getTheme();
//const { palette } = theme;

export interface AppProps {
	
}

export interface AppState {
	
}

export class App extends React.Component<AppProps, AppState> {
	
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	render(): JSX.Element {
		return (
			<Stack className={styles.stack} verticalFill={true}>
				{isOfficeInitialized === false ? 
					<Stack.Item className={styles.editor} align='start' verticalFill={true}>
						<div className={styles.editor}>{'testdiv -> wird außerhalb von office ausgeführt.'}</div>
					</Stack.Item>
				: null}
				<Stack.Item className={styles.list} align='end' verticalFill={true}>
					<MioList />
				</Stack.Item>
			</Stack>
		);
	}

}












export interface MioListItemClasses {
	stack: string;
	editor: string;
	list: string;
}

const styles: MioListItemClasses = mergeStyleSets({
	stack: [
        getFocusStyle(theme, { inset: -1 }),
        {
            height: '100%',
			width: '100%',
			position: 'absolute',
			overflow: 'hidden',
			boxSizing: 'border-box',
            display: 'flex',
			flexDirection: 'row',
        },
	],
	editor: {
		width: '100%',
		height: '100%',
	},
	list: {
		width: 'auto',
		maxWidth: '100%',
		height: '100%',
	},
});
