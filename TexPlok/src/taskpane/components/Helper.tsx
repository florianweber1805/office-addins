export function classnames(classes: string[]): string {
    var classnames = '';
    for (var i = 0; i < classes.length; i++) {
        classnames += classes[i] + (i < classes.length - 1 ? ' ' : '');
    }
    return classnames;
}