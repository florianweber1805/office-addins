import * as React from "react";
import { Spinner, SpinnerType } from "office-ui-fabric-react";
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { classnames } from "./Helper";
/* global Spinner */

export interface ProgressProps {
    logo: string;
    message: string;
    title: string;
    loading: boolean;
}

export default class Progress extends React.Component<ProgressProps> {

    render() {
        const { logo, message, title } = this.props;

        return (
            <div className={styles.wrapper}>
                <section className={classnames(['ms-welcome__progress', 'ms-u-fadeIn500', styles.block])}>
                    <img width="auto" height="auto" src={logo} alt={title} title={title} />
                    <h1 className="ms-fontSize-su ms-fontWeight-semibold ms-fontColor-neutralPrimary">{title}</h1>
                    {this.props.loading ? <Spinner type={SpinnerType.large} label={message} /> : null}
                </section>
            </div>
        );
    }
}

export interface ProgressClasses {
    wrapper: string;
    block: string;
}

export const styles: ProgressClasses = mergeStyleSets({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    block: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
