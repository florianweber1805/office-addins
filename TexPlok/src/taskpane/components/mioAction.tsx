import { MioListItemAction } from "./mioListItemAction";

export enum MioActionType {
    edit = 1,
    delete = 2,
    feedback = 3
}

export function executeAction(action: MioListItemAction) {
    if (action.props.action == MioActionType.edit) {
        var strWindowFeatures = "location=yes, height=" + screen.availHeight + ", width=" + screen.availWidth + ", scrollbars=yes, status=yes";
        window.open('https://addin.eap4.me/taskpane.html', '_blank', strWindowFeatures);
    } else if (action.props.action == MioActionType.delete) {
        console.log('delete');
    } else if (action.props.action == MioActionType.feedback) {
        console.log('feedback');
    } else {
        console.log('action: ' + action.props.action);
    }
}