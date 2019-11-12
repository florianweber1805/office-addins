import * as React from "react";
import { initializeIcons } from '@uifabric/icons';
import { MioList } from "./mioList";
initializeIcons();

export const App: React.FunctionComponent = () => {
	return (
        <MioList />
	);
};
