import * as React from 'react';
import { mergeStyleSets, getFocusStyle, ITheme, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { Icon, format, Spinner, Label } from 'office-ui-fabric-react';
import { MioListItemAction } from './mioListItemAction';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { fetchdata, urlInfo, urlChildren, urlAction, classnames } from './Helper';
import { MioActionType } from './mioAction';
import { MioTextfield } from './mioTextfield';

const theme: ITheme = getTheme();
const { palette } = theme;

export interface MioListItemProps {
    id: number;
    onEdit: (item: MioListItem) => void;
    onChange: (item: MioListItem) => void;
    edit: boolean;
    expanded?: boolean;
}

export interface MioListItemState {
    id: number;
    icon: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    metaText: string;
    actions: MioActionType[];
    items: number[];
    expanded: boolean;
    loading: number;
    error: string;
    edit: boolean;
    refresh: boolean;
}

export class MioListItem extends React.Component<MioListItemProps, MioListItemState> {

    // ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   

    constructor(props: MioListItemProps) {
        super(props);
        this.state = {
            id: props.id,
            icon: undefined,
            primaryText: undefined,
            secondaryText: undefined,
            tertiaryText: undefined,
            metaText: undefined,
            actions: new Array<MioActionType>(),
            items: new Array<number>(),
            expanded: props.expanded || false,
            loading: 3,
            error: undefined,
            edit: props.edit,
            refresh: false,
        }
        this.fetchdata = this.fetchdata.bind(this);
        this.onAction = this.onAction.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    fetchdata() {
        const that = this;

        // Values
        fetchdata(format(urlInfo, this.state.id), function(data: any) {
            that.setState({
                icon: data[0].icon,
                primaryText: data[0].name,
                secondaryText: data[0].text,
                tertiaryText: data[0].description,
                metaText: data[0].timestamp,
                loading: that.state.loading - 1,
            });
        }, function() {
            that.setState({loading: that.state.loading - 1});
        }, function(error: any) {
            that.setState({error: error, loading: that.state.loading - 1});
        });

        // SubItems
        fetchdata(format(urlChildren, this.state.id), function(data: any) {
            that.setState({items: data.map(obj => obj.id), loading: that.state.loading - 1});
        }, function() {
            that.setState({loading: that.state.loading - 1, items: new Array<number>()});
        }, function(error: any) {
            that.setState({error: error, items: new Array<number>(), loading: that.state.loading - 1});
        });

        // Actions
        fetchdata(format(urlAction, this.state.id), function(data: any) {
            that.setState({actions: data.map(obj => obj.action), loading: that.state.loading - 1});
        }, function() {
            that.setState({loading: that.state.loading - 1, actions: new Array<MioActionType>()});
        }, function(error: any) {
            that.setState({error: error, actions: new Array<MioActionType>(), loading: that.state.loading - 1});
        });

        that.setState({refresh: !that.state.refresh});
    }

    componentWillReceiveProps(props: MioListItemProps) {
        if (props.id != this.state.id) {
            this.setState(function(state, props) {
                console.log(state);
                return {id: props.id};
            }, function() {
                this.fetchdata();
            });
        }
    }

    componentDidMount() {
        this.fetchdata();
    }

    // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

    renderError(): JSX.Element {
        return (
            <div>
                <Icon iconName='Error' />
                <Label>{'Error: "' + this.state.error + '"'}</Label>
            </div>
        );
    }

    renderLeftStack(): JSX.Element {
        return (
            <div className={styles.leftStack}>
                {this.state.icon != undefined ? <Icon className={styles.icon} iconName={this.state.icon} /> : null}
                {this.state.items.length > 0 ? <Icon className={styles.chevron} iconName={(this.state.expanded ? 'ChevronDown' : 'ChevronUp')}></Icon> : null}
            </div>
        );
    }

    renderMiddleStack(): JSX.Element {
        return (
            <div className={styles.middleStack}>
                {this.state.primaryText ? <MioTextfield onChange={this.onChange} className={'primaryText'} text={this.state.primaryText} edit={this.state.edit} /> : null}
                {this.state.secondaryText ? <MioTextfield onChange={this.onChange} className={'secondaryText'} text={this.state.secondaryText} edit={this.state.edit} /> : null}
                {this.state.tertiaryText ? <MioTextfield onChange={this.onChange} className={'tertiaryText'} text={this.state.tertiaryText} edit={this.state.edit} /> : null}
            </div>
        );
    }

    renderRightStack(): JSX.Element {
        return (
            <div className={styles.rightStack}>
                {this.state.actions.length > 0 && !this.state.edit ?
                    <div className={styles.actionStack}>
                        {this.state.actions.map<JSX.Element>((action: MioActionType, index: number) =>
                            <MioListItemAction key={index} onAction={this.onAction} action={action} parent={this.state.id} />
                        )}
                    </div>
                : null}
                {this.state.metaText ? <MioTextfield onChange={this.onChange} className={'metaText'} text={this.state.metaText} edit={false} /> : null}
            </div>
        );
    }

    renderSubItems(): JSX.Element {
        return (
            this.state.expanded && this.state.items.length > 0 ?
                <div className={styles.itemStack}>
                    {this.state.items.map<JSX.Element>((id: number, index: number) =>
                        <MioListItem id={id} key={index} expanded={this.state.edit} onChange={this.onChange} 
                            edit={this.state.edit} onEdit={(item: MioListItem) => this.onEdit(item)} />
                    )}
                </div>
            : null
        );
    }

    renderItem(): JSX.Element {
        return (
            <div className={classnames([this.state.expanded ? styles.expanded : '', styles.wrapper])}>
                <div className={styles.item} onClick={() => this.onClick()}>
                    {this.renderLeftStack()}
                    {this.renderMiddleStack()}
                    {this.renderRightStack()}
                </div>
                {this.renderSubItems()}
            </div>
        );
    }

    renderProgress(): JSX.Element {
        return (
            <Spinner></Spinner>
        );
    }

    render(): JSX.Element {
        console.log(palette);
        return (
            this.state.loading > 0 ? this.renderProgress() : 
                this.state.error != undefined ? this.renderError() : this.renderItem()
        );
    }

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    onClick(): void {
        if (this.state.items.length > 0) {
            this.setState({expanded: !this.state.expanded});
        }
    }

    onAction(action: MioActionType): void {
        if (action == MioActionType.edit) {
            this.onEdit(this);
        }
    }

    onEdit(item: MioListItem) {
        this.props.onEdit(item);
    }

    onChange() {
        this.props.onChange(this);
    }

}

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

export interface MioListItemClasses {
    wrapper: string;
    expanded: string;
    item: string;
    icon: string;
    chevron: string;
    leftStack: string;
    middleStack: string;
    rightStack: string;
    actionStack: string;
    itemStack: string;
}

const styles: MioListItemClasses = mergeStyleSets({
    wrapper: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5,
    },
    expanded: {
        background: palette.themeLighterAlt,
        outline: 'thin double ' + palette.themePrimary,
        marginBottom: 10,
        //marginTop: 5,
    },
    item: [
        getFocusStyle(theme, { inset: -1 }),
        {
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            margin: 1,
            boxShadow: Depths.depth0,
            cursor: 'pointer',
            selectors: {
                '& .primaryText': {
                    background: palette.themeLight,
                    color: palette.themePrimary,
                },
                '&:hover': {
                    background: palette.neutralLight,
                    boxShadow: Depths.depth4,
                },
                '&:hover .primaryText': {
                    background: palette.themePrimary,
                    boxShadow: Depths.depth4,
                    color: palette.themeLight,
                },
                '&:active': {
                    background: palette.neutralQuaternary,
                    boxShadow: Depths.depth8,
                },
                '&:active .primaryText': {
                    boxShadow: Depths.depth8,
                    color: palette.neutralLight,
                },
            }
        },
    ],
    icon: {
        fontSize: 50,
        marginRight: 10,
    },
    chevron: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 'auto',
    },
    leftStack: {
        display: 'flex',
        flexDirection: 'column',
    },
    middleStack: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
        overflow: 'hidden',
    },
    rightStack: {
        display: 'flex',
        flexDirection: 'column',
    },
    actionStack: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    itemStack: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
    },
});
