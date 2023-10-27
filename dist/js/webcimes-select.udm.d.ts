/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */
/**
 * Global
 */
declare global {
    /** Events */
    interface GlobalEventHandlersEventMap {
        onInit: CustomEvent;
        onDestroy: CustomEvent;
        onInitDropDown: CustomEvent;
        onDestroyDropDown: CustomEvent;
        onSearchDropDown: CustomEvent;
        onAddOption: CustomEvent;
        onRemoveOption: CustomEvent;
    }
}
/**
 * Options
 */
interface Options {
    /** Element (selector string or HTMLElement) */
    element: string | HTMLElement | null;
    /** set a specific id on the select. default "null" */
    setId: string | null;
    /** set a specific class on the select, default "null" */
    setClass: string | null;
    /** width (specify unit), default "auto" */
    width: string;
    /** height (specify unit), default "auto" */
    height: string;
    /** max-height for options list (specify unit), default "200px" */
    maxHeightOptions: string;
    /** add extra css style to select, default null */
    style: string | null;
    /** set placeholder text, default null */
    placeholder: string | null;
    /** allow clear selected options, default true */
    allowClear: boolean;
    /** allow search options, default true */
    allowSearch: boolean;
    /** autofocus on search field when open select, default true */
    searchAutoFocus: boolean;
    /** set placeholder text on search field, default "Search" */
    searchPlaceholder: string | null;
    /** set text for no results found on search, default "No results found" */
    searchTextNoResults: string | null;
    /** callback on init select */
    onInit(): void;
    /** callback on destroy select */
    onDestroy(): void;
    /** callback on init dropdown */
    onInitDropDown(): void;
    /** callback on hide dropdown */
    onDestroyDropDown(): void;
    /** callback on search dropdown */
    onSearchDropDown(value: string, options: HTMLOptionElement[]): void;
    /** callback on add option */
    onAddOption(value: string): void;
    /** callback on remove option */
    onRemoveOption(value: string): void;
}
/**
 * Class WebcimesSelect
 */
export declare class WebcimesSelect {
    /** Get the dom element of the current select */
    select: HTMLSelectElement | null;
    /** Get the dom element of the current wSelect */
    wSelect: HTMLElement;
    /** Get the dom element of the current wDropDown */
    wDropDown: HTMLElement | null;
    /** Options of the current select */
    private options;
    /**
     * Convert elements entry to an array of HTMLElement
     */
    private getHtmlElements;
    /**
     * Convert element entry to an HTMLElement
     */
    private getHtmlElement;
    /**
     * Init value or placeholder on wSelect, according selected option on select field
     */
    private initWSelectValue;
    /**
     * Add option on wSelect
     */
    private addWSelectOption;
    /**
     * Remove option on wSelect
     */
    private removeWSelectOption;
    /**
     * Event clear selected option on wSelect
     */
    private onWSelectClearOption;
    /**
     * Event clear all selected options on wSelect
     */
    private onWSelectClearAllOptions;
    /**
     * Event on keydown on wSelect
     */
    private onWSelectKeyDown;
    /**
     * Event init wDropDown on click on wSelect
     */
    private onWSelectClickInitWDropDown;
    /**
     * Init wDropDown
     */
    private initWDropDown;
    /**
     * Set wDropDown options
     */
    private setWDropDownOptions;
    /**
     * Set wDropDown position and width, relative to wSelect
     */
    private setWDropDownPosition;
    /**
     * Set highlight option
     */
    private setWDropDownHighlightOption;
    /**
     * Destroy wDropDown
     */
    private destroyWDropDown;
    /**
     * Event search options on wDropDown
     */
    private onWDropDownSearch;
    /**
     * Event on keydown on wDropDown
     */
    private onWDropDownKeyPress;
    /**
     * Event on mouseover option on wDropDown
     */
    private onWDropDownMouseOverOption;
    /**
     * Event on resize on WDropDown
     */
    private onWDropDownResize;
    /**
     * Event on select option on WDropDown
     */
    private onWDropDownSelectOption;
    /**
     * Event destroy on click or keydown outside wDropDown
     */
    private onWDropDownDestroy;
    /**
     * Create select
     */
    constructor(options: Options);
    /**
     * Initialization of the current select
     */
    private init;
    /**
     * Destroy current select
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=webcimes-select.d.ts.map