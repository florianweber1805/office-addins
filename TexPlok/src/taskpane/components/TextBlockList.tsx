import * as React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';

export interface ITextBlockListProps {
    items?: ITextBlockProps[];
}

export interface ITextBlockProps {
    container: string;
    cell: string;
    image: string;
    content: string;
    name: string;
    index: string;
    chevron: string;
}

export interface ITextBlockListClassObject {
    container: string;
    itemCell: string;
    itemImage: string;
    itemContent: string;
    itemName: string;
    itemIndex: string;
    chevron: string;
}

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames: ITextBlockListClassObject = mergeStyleSets({
    container: {
        overflow: 'auto',
        //maxHeight: 500,
        width: '100%'
    },
    itemCell: [
        getFocusStyle(theme, { inset: -1 }), {
            minHeight: 54,
            padding: 10,
            width: '100%',
            boxSizing: 'border-box',
            borderBottom: `1px solid ${semanticColors.bodyDivider}`,
            display: 'flex',
            selectors: {
                '&:hover': { background: palette.neutralLight }
            }
        }
    ],  
    itemImage: {
        flexShrink: 0
    },
    itemContent: {
        marginLeft: 10,
        overflow: 'hidden',
        flexGrow: 1
    },
    itemName: [
        fonts.xLarge,
        {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
        }
    ],
    itemIndex: {
        fontSize: fonts.small.fontSize,
        color: palette.neutralTertiary,
        marginBottom: 10
    },
    chevron: {
        alignSelf: 'center',
        marginLeft: 10,
        color: palette.neutralTertiary,
        fontSize: fonts.large.fontSize,
        flexShrink: 0
    }
});

function createItems(count: number): ITextBlockProps[] {
    return Array.apply(null, Array(count)).map(() => {
        return {
            container: 'container',
            cell: 'cell',
            image: 'image',
            content: 'content',
            name: 'name',
            index: 'index',
            chevron: 'chevron',
        };
    });
}

export class TextBlockList extends React.Component<ITextBlockListProps> {

    private _items: ITextBlockProps[];

    constructor(props: ITextBlockListProps) {
        super(props);
        this._items = createItems(100);
    }
  
    public render(): JSX.Element {
        return (
            <FocusZone direction={FocusZoneDirection.vertical}>
                <div className={classNames.container} data-is-scrollable={true}>
                    <List items={this._items} onRenderCell={this._onRenderCell} />
                </div>
            </FocusZone>
        );
    }
  
    private _onRenderCell(item?: ITextBlockProps, index?: number, isScrolling?: boolean): JSX.Element {
        return (
            <div className={classNames.itemCell} data-is-focusable={true}>
                <Image
                    className={classNames.itemImage}
                    src={isScrolling ? undefined : ( item ? item.image : '')}
                    width={50}
                    height={50}
                    imageFit={ImageFit.cover}
                />
                <div className={classNames.itemContent}>
                    <div className={classNames.itemName}>{( item ? item.name : '')}</div>
                    <div className={classNames.itemIndex}>{`Item ${index}`}</div>
                </div>
            </div>
        );
    }
}
