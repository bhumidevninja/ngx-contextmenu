var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { first } from 'rxjs/operators';
import { ContextMenuItemDirective } from './contextMenu.item.directive';
import { ContextMenuService } from './contextMenu.service';
import { CONTEXT_MENU_OPTIONS } from './contextMenu.tokens';
var ContextMenuComponent = (function () {
    function ContextMenuComponent(_contextMenuService, changeDetector, elementRef, options) {
        var _this = this;
        this._contextMenuService = _contextMenuService;
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.options = options;
        this.menuClass = "";
        this.autoFocus = false;
        this.useBootstrap4 = false;
        this.disabled = false;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.visibleMenuItems = [];
        this.links = [];
        this.subscription = new Subscription();
        if (options) {
            this.autoFocus = options.autoFocus;
            this.useBootstrap4 = options.useBootstrap4;
        }
        this.subscription.add(_contextMenuService.show.subscribe(function (menuEvent) {
            _this.onMenuEvent(menuEvent);
        }));
    }
    ContextMenuComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ContextMenuComponent.prototype.onMenuEvent = function (menuEvent) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        var contextMenu = menuEvent.contextMenu, event = menuEvent.event, item = menuEvent.item;
        if (contextMenu && contextMenu !== this) {
            return;
        }
        this.event = event;
        this.item = item;
        this.setVisibleMenuItems();
        this._contextMenuService.openContextMenu(__assign({}, menuEvent, { menuItems: this.visibleMenuItems, menuClass: this.menuClass }));
        this._contextMenuService.close.asObservable().pipe(first()).subscribe(function (closeEvent) { return _this.close.emit(closeEvent); });
        this.open.next(menuEvent);
    };
    ContextMenuComponent.prototype.isMenuItemVisible = function (menuItem) {
        return this.evaluateIfFunction(menuItem.visible);
    };
    ContextMenuComponent.prototype.setVisibleMenuItems = function () {
        var _this = this;
        this.visibleMenuItems = this.menuItems.filter(function (menuItem) { return _this.isMenuItemVisible(menuItem); });
    };
    ContextMenuComponent.prototype.evaluateIfFunction = function (value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    };
    ContextMenuComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'context-menu',
                    styles: ["\n    .cdk-overlay-container {\n      position: fixed;\n      z-index: 1000;\n      pointer-events: none;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n    }\n    .ngx-contextmenu.cdk-overlay-pane {\n      position: absolute;\n      pointer-events: auto;\n      box-sizing: border-box;\n    }\n  "],
                    template: " ",
                },] },
    ];
    /** @nocollapse */
    ContextMenuComponent.ctorParameters = function () { return [
        { type: ContextMenuService, },
        { type: ChangeDetectorRef, },
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CONTEXT_MENU_OPTIONS,] },] },
    ]; };
    ContextMenuComponent.propDecorators = {
        'menuClass': [{ type: Input },],
        'autoFocus': [{ type: Input },],
        'useBootstrap4': [{ type: Input },],
        'disabled': [{ type: Input },],
        'close': [{ type: Output },],
        'open': [{ type: Output },],
        'menuItems': [{ type: ContentChildren, args: [ContextMenuItemDirective,] },],
        'menuElement': [{ type: ViewChild, args: ['menu',] },],
    };
    return ContextMenuComponent;
}());
export { ContextMenuComponent };
//# sourceMappingURL=contextMenu.component.js.map