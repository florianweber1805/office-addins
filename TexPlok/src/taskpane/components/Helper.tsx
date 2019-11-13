export const urlDefault = 'https://addin.eap4.me/load.php';
export const urlInfo = urlDefault + '?i={0}';
export const urlChildren = urlDefault + '?t={0}';
export const urlAction = urlDefault + '?a={0}';
export const urlActionInfo = urlDefault + '?ai={0}';

export function classnames(classes: string[]): string {
    var classnames = '';
    for (var i = 0; i < classes.length; i++) {
        classnames += classes[i] + (i < classes.length - 1 ? ' ' : '');
    }
    return classnames;
}

export function fetchdata(url: string, successCallback, failCallback, logging = true) {
    console.log('Request from "' + url + '" started...');
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
        console.error('Error: "' + error + '"');
        failCallback(error);
    });
}