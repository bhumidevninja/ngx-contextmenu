import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Subject } from 'rxjs/Subject';
import { ContextMenuComponent } from './contextMenu.component';
import { ContextMenuItemDirective } from './contextMenu.item.directive';
import { ContextMenuContentComponent } from './contextMenuContent.component';
export interface IContextMenuClickEvent {
    anchorElement?: Element | EventTarget;
    contextMenu?: ContextMenuComponent;
    event?: MouseEvent | KeyboardEvent;
    parentContextMenu?: ContextMenuContentComponent;
    item: any;
    activeMenuItemIndex?: number;
}
export interface IContextMenuContext extends IContextMenuClickEvent {
    menuItems: ContextMenuItemDirective[];
    menuClass: string;
}
export interface CloseLeafMenuEvent {
    exceptRootMenu?: boolean;
    event?: MouseEvent | KeyboardEvent;
}
export interface OverlayRefWithContextMenu extends OverlayRef {
    contextMenu?: ContextMenuContentComponent;
}
export interface CancelContextMenuEvent {
    eventType: 'cancel';
    event?: MouseEvent | KeyboardEvent;
}
export interface ExecuteContextMenuEvent {
    eventType: 'execute';
    event?: MouseEvent | KeyboardEvent;
    item: any;
    menuItem: ContextMenuItemDirective;
}
export declare type CloseContextMenuEvent = ExecuteContextMenuEvent | CancelContextMenuEvent;
export declare class ContextMenuService {
    private overlay;
    private scrollStrategy;
    isDestroyingLeafMenu: boolean;
    show: Subject<IContextMenuClickEvent>;
    triggerClose: Subject<ContextMenuContentComponent>;
    close: Subject<CloseContextMenuEvent>;
    private contextMenuContent;
    private overlays;
    private fakeElement;
    constructor(overlay: Overlay, scrollStrategy: ScrollStrategyOptions);
    openContextMenu(context: IContextMenuContext): void;
    attachContextMenu(overlay: OverlayRef, context: IContextMenuContext): void;
    closeAllContextMenus(closeEvent: CloseContextMenuEvent): void;
    getLastAttachedOverlay(): OverlayRefWithContextMenu;
    destroyLeafMenu({exceptRootMenu, event}?: CloseLeafMenuEvent): void;
    destroySubMenus(contextMenu: ContextMenuContentComponent): void;
    isLeafMenu(contextMenuContent: ContextMenuContentComponent): boolean;
}
