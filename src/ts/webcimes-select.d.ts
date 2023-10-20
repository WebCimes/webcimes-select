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
        beforeShow: CustomEvent;
        afterShow: CustomEvent;
        beforeDestroy: CustomEvent;
        afterDestroy: CustomEvent;
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
    /** callback before show select */
    beforeShow(): void;
    /** callback after show select */
    afterShow(): void;
    /** callback before destroy select */
    beforeDestroy(): void;
    /** callback after destroy select */
    afterDestroy(): void;
}
/**
 * Class WebcimesSelect
 */
export declare class WebcimesSelect {
    /** Get the dom element of the current select */
    select: HTMLSelectElement | null;
    /** Get the dom element of the current webcimesSelect */
    webcimesSelect: HTMLElement;
    /** Get the dom element of the current webcimesDropDown */
    webcimesDropDown: HTMLElement | null;
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
     * Set value (or placeholder) on webcimesSelect
     */
    private setWebcimesSelectValue;
    /**
     * Event clear selected options
     */
    private eventClearSelectedOptionsWebcimesSelect;
    /**
     * Event keyboard controls
     */
    private eventKeyboardWebCimesSelect;
    /**
     * Event create webcimesDropDown on click
     */
    private eventOpenCloseWebcimesDropDown;
    /**
     * Create webcimesDropDown
     */
    private createWebcimesDropDown;
    /**
     * Set webcimesDropDown options
     */
    private setWebcimesDropDownOptions;
    /**
     * Set webcimesDropDown position and width, relative to webcimesSelect
     */
    private setWebcimesDropDownPositionAndWidth;
    /**
     * Destroy webcimesDropDown
     */
    private destroyWebcimesDropDown;
    /**
     * Event search webcimesDropDown options
     */
    private eventSearchWebcimesDropDown;
    /**
     * Event keyboard webcimesDropDown
     */
    private eventKeyboardWebcimesDropDown;
    /**
     * Event resize
     */
    private eventResizeWebcimesDropDown;
    /**
     * Event on select option
     */
    private eventSelectOptionWebcimesDropDown;
    /**
     * Event destroy webcimesDropDown on click or keypress outside
     */
    private eventDestroyWebcimesDropDown;
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