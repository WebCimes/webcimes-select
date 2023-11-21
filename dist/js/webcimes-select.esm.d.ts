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
        onInitDropdown: CustomEvent;
        onDestroyDropdown: CustomEvent;
        onSearchDropdown: CustomEvent;
        onAddOption: CustomEvent;
        onRemoveOption: CustomEvent;
        onRemoveAllOptions: CustomEvent;
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
    placeholderText: string | null;
    /** allow clear selected options, default true */
    allowClear: boolean;
    /** allow search options, default true */
    allowSearch: boolean;
    /** autofocus on search field when open select, default true */
    searchAutoFocus: boolean;
    /** set placeholder text on search field, default "Search" */
    searchPlaceholderText: string | null;
    /** set text for no results found on search, default "No results found" */
    searchNoResultsText: string | null;
    /** keep dropdown open after selecting an option, default false */
    keepOpenDropdown: boolean;
    /** callback on init select */
    onInit(): void;
    /** callback on destroy select */
    onDestroy(): void;
    /** callback on init dropdown */
    onInitDropdown(): void;
    /** callback on destroy dropdown */
    onDestroyDropdown(): void;
    /** callback on search dropdown */
    onSearchDropdown(value: string, options: HTMLOptionElement[]): void;
    /** callback on add option */
    onAddOption(value: string): void;
    /** callback on remove option */
    onRemoveOption(value: string): void;
    /** callback on  all options */
    onRemoveAllOptions(): void;
}
/**
 * Class WebcimesSelect
 */
export declare class WebcimesSelect {
    /** Get the dom element of the native select */
    select: HTMLSelectElement | null;
    /** Get the dom element of webcimesSelect */
    webcimesSelect: HTMLElement;
    /** Get the dom element of webcimesDropdown */
    webcimesDropdown: HTMLElement | null;
    /** Options of WebcimesSelect */
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
     * Init options or placeholder on webcimesSelect, according selected option on select field
     */
    private initWebcimesSelectOptions;
    /**
     * Add option on webcimesSelect
     */
    private addWebcimesSelectOption;
    /**
     * Remove option on webcimesSelect
     */
    private removeWebcimesSelectOption;
    /**
     * Remove all options on webcimesSelect
     */
    private removeWebcimesSelectAllOptions;
    /**
     * Event clear selected option on webcimesSelect
     */
    private onWebcimesSelectClearOption;
    /**
     * Event clear all selected options on webcimesSelect
     */
    private onWebcimesSelectClearAllOptions;
    /**
     * Event on keydown on webcimesSelect
     */
    private onWebcimesSelectKeyDown;
    /**
     * Event init webcimesDropdown on click on webcimesSelect
     */
    private onWebcimesSelectClickInitWebcimesDropdown;
    /**
     * Init webcimesDropdown
     */
    private initWebcimesDropdown;
    /**
     * Set webcimesDropdown options
     */
    private setWebcimesDropdownOptions;
    /**
     * Set webcimesDropdown position and width, relative to webcimesSelect
     */
    private setWebcimesDropdownPosition;
    /**
     * Set highlight option
     */
    private setWebcimesDropdownHighlightOption;
    /**
     * Destroy webcimesDropdown
     */
    private destroyWebcimesDropdown;
    /**
     * Event search options on webcimesDropdown
     */
    private onWebcimesDropdownSearch;
    /**
     * Event on keydown on webcimesDropdown
     */
    private onWebcimesDropdownKeyPress;
    /**
     * Event on mouseover option on webcimesDropdown
     */
    private onWebcimesDropdownMouseOverOption;
    /**
     * Event on resize on WebcimesDropdown
     */
    private onWebcimesDropdownResize;
    /**
     * Event on select option on WebcimesDropdown
     */
    private onWebcimesDropdownClickOption;
    /**
     * Event destroy on click or keydown outside webcimesDropdown
     */
    private onWebcimesDropdownDestroy;
    /**
     * Create select
     */
    constructor(options: Options);
    /**
     * Initialization of webcimesSelect
     */
    private init;
    /**
     * Destroy webcimesSelect and revert to native select
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=webcimes-select.d.ts.map