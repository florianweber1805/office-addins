import * as React from "react";
import { MioList } from "./mioList";
import { isOfficeInitialized } from "..";
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from "office-ui-fabric-react";
import { MioEditor } from "./mioEditor";
import { MioListItem } from "./mioListItem";

const theme: ITheme = getTheme();
//const { palette } = theme;

export interface AppProps {
	
}

export interface AppState {
	edit: number;
}

export class App extends React.Component<AppProps, AppState> {
	
	constructor(props: AppProps) {
		super(props)
		this.state = {
			edit: 0,
		}
		this.onEdit = this.onEdit.bind(this);
	}

	render(): JSX.Element {
		console.log(this.state.edit);
		return (
			<Stack className={styles.stack} verticalFill={true}>
				{isOfficeInitialized === false && this.state.edit > 0 ? 
					<Stack.Item className={styles.editor} align='start' verticalFill={true}>
						<MioEditor item={this.state.edit} />
					</Stack.Item>
				: null}
				<Stack.Item className={styles.list} align='end' verticalFill={true}>
					<MioList onEdit={this.onEdit} />
				</Stack.Item>
			</Stack>
		);
	}

	onEdit(item: MioListItem) {
		console.log(item.state.id);
		this.setState({edit: item.state.id});
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
