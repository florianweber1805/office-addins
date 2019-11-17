import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';
import { mergeStyleSets, ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { classnames } from './Helper';

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioTextfieldProps {
    text: string;
    edit: boolean;
    className: string;
    onChange: () => void;
}

export interface MioTextfieldState {
    text: string;
    edit: boolean;
    className: string;
}

export class MioTextfield extends React.Component<MioTextfieldProps, MioTextfieldState> {

    // ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

    constructor(props: MioTextfieldProps) {
        super(props);
        this.state = {
            text: props.text,
            edit: props.edit,
            className: props.className,
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props: MioTextfieldProps) {
        if (props.text != this.state.text) {
            this.setState({text: props.text});
        }
    }

    className(): string {
        switch (this.state.className) {
            case 'primaryText': return styles.primaryText;
            case 'secondaryText': return styles.secondaryText;
            case 'tertiaryText': return styles.tertiaryText;
            case 'metaText': return styles.metaText;
            default: return styles.tertiaryText;
        }
    }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    render(): JSX.Element {
        console.log(palette);
        return (
            !this.state.edit ?
                <Label className={classnames([this.state.className, styles.field, this.className()])}>{this.state.text}</Label>
            :
                <TextField className={styles.textfield} //inputClassName={classnames([this.state.className, this.className(), styles.edit])} 
                    value={this.state.text} multiline={true} autoAdjustHeight={true} resizable={true}
                    onClick={(event: React.MouseEvent<HTMLInputElement>) => this.onClick(event)}
                    onChange={(event: React.FormEvent<HTMLInputElement>, newvalue: string) => this.onChange(event, newvalue)}
                />
                // <iframe src={'https://view.officeapps.live.com/op/embed.aspx?src=http://remote.url.tld/path/to/document.doc'} style={{width:'100%', height:'auto'}} />
        );
        
    }

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    onClick(event: React.MouseEvent<HTMLInputElement>) {
        event.stopPropagation();
    }

    onChange(event: React.FormEvent<HTMLInputElement>, newvalue: string) {
        this.props.onChange();
        this.setState({text: newvalue});
        console.log(newvalue);
        event.preventDefault();
    }

}

interface MioTextfieldClasses {
    field: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    edit: string;
    textfield: string;
}

const styles: MioTextfieldClasses = mergeStyleSets({
    field: {
        alignSelf: 'flex-start',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    primaryText: {
        fontSize: 26,
        //background: palette.themeLighterAlt,
        borderRadius: 5,
        padding: '0 5px 5px 5px',
        margin: '0 10px 0 0',
    },
    secondaryText: {
        fontSize: 20,
        margin: '2px 0 2px 5px',
    },
    tertiaryText: {
        fontSize: 14,
        margin: '2px 0 2px 5px',
    },
    metaText: {
        fontSize: 12,
        textAlign: 'right',
        margin: 'auto 2px 2px 2px',
    },
    edit: {
        background: palette.themeLighter,
        borderRadius: 0,
        margin: 0,
        padding: 10,
    },
    textfield: {
        padding: 5,
    },
})
