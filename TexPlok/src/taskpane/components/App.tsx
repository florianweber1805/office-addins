import * as React from "react";
import { initializeIcons } from '@uifabric/icons';
import { MioList } from "./mioList";
initializeIcons();

export interface AppProps {

}

export class App extends React.Component<AppProps> {
	constructor(props) {
		super(props)
	}

	render(): JSX.Element {
		return (
			<MioList />
		);
	}
}

// export const App: React.FunctionComponent = () => {
// 	return (
//         <MioList />
// 	);
// };
