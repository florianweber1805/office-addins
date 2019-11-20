import "isomorphic-fetch"
import { MioListItemActionProps } from "./mioListItemAction";
import { MioListItemProps } from "./mioListItem";

export const urlDefault = 'https://addin.eap4.me/load.php';
export const urlInfo = urlDefault + '?i={0}';
export const urlUpdate = urlDefault + '?u={0}';
// export const urlChildren = urlDefault + '?t={0}';
// export const urlAction = urlDefault + '?a={0}';
// export const urlActionInfo = urlDefault + '?ai={0}';

export const mioLogo = 'https://www.kjh-mio.de/s/misc/logo.jpg?t=1573588989';

export function classnames(classes: string[]): string {
    var classnames = '';
    for (var i = 0; i < classes.length; i++) {
        classnames += classes[i] + (i < classes.length - 1 ? ' ' : '');
    }
    return classnames;
}

export function fetchdata(url: string, successCallback, failCallback, errorCallback, logging = true) {
    if (logging) { console.log('Request from "' + url + '" started...'); }
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
        if (logging) { console.log('Request from "' + url + '" finished!'); }
        successCallback(data);
    }, function(reason) {
        if (logging) { console.warn('Warning: "' + reason + '"'); }
        failCallback(reason);
    })
    .catch(function(error) {
        if (logging) { console.error('Error: "' + error + '"'); }
        errorCallback(error);
    });
}

export function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
    return '';
}​

export function openEditorWindow(id: number) {
    var strWindowFeatures = "location=no, height=" + screen.height + ", width=" + screen.width + ", scrollbars=no, status=no";
    window.open('https://addin.eap4.me/taskpane.html?edit=' + id, '_blank', strWindowFeatures);
}

export function mapActions(data: any): MioListItemActionProps[] {
    return data.map((obj: any) => { return {
        action: obj.action,
        text: obj.name,
        icon: obj.icon,
    }; })
}
export function mapItems(data: any): MioListItemProps[] {
    return data.map((obj: any) => { return {
        id: obj.id, 
        icon: obj.icon, 
        primaryText: obj.name, 
        secondaryText: obj.text,
        tertiaryText: obj.description, 
        metaText: obj.timestamp,
        items: mapItems(obj.items),
        actions: mapActions(obj.actions),
    }; })
}
