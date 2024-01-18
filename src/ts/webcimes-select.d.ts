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
    nativeSelect: HTMLSelectElement | null;
    /** Get the dom element of select */
    select: HTMLElement;
    /** Get the dom element of dropdown */
    dropdown: HTMLElement | null;
    /** Options of WebcimesSelect */
    private options;
    /**
     * Create select
     */
    constructor(options: Partial<Options>);
    /**
     * Convert elements entry to an array of HTMLElement
     */
    private getHtmlElements;
    /**
     * Convert element entry to an HTMLElement
     */
    private getHtmlElement;
    /**
     * Initialization of select
     */
    private init;
    /**
     * Destroy select and revert to native select
     */
    destroy(): void;
    /**
     * Init options or placeholder on select, according selected option on native select field
     */
    initOptions(): void;
    /**
     * Add option on select
     */
    addOption(value: string | null): void;
    /**
     * Remove option on select
     */
    removeOption(value: string | null): void;
    /**
     * Remove all options on select
     */
    removeAllOptions(): void;
    /**
     * Event clear selected option on select
     */
    private onClearOption;
    /**
     * Event clear all selected options on select
     */
    private onClearAllOptions;
    /**
     * Event on keydown on select
     */
    private onKeyDown;
    /**
     * Event init dropdown on click on select
     */
    private onClickInitDropdown;
    /**
     * Init dropdown
     */
    private initDropdown;
    /**
     * Destroy dropdown
     */
    private destroyDropdown;
    /**
     * Set dropdown options
     */
    private setDropdownOptions;
    /**
     * Set dropdown position and width, relative to select
     */
    private setDropdownPosition;
    /**
     * Set highlight option
     */
    private setDropdownHighlightOption;
    /**
     * Event search options on dropdown
     */
    private onDropdownSearch;
    /**
     * Event on keydown on dropdown
     */
    private onDropdownKeyDown;
    /**
     * Event on mouseover option on dropdown
     */
    private onDropdownMouseOverOption;
    /**
     * Event on resize on Dropdown
     */
    private onDropdownResize;
    /**
     * Event on select option on Dropdown
     */
    private onDropdownClickOption;
    /**
     * Event destroy on click or keydown outside dropdown
     */
    private onDropdownDestroy;
}
export {};
//# sourceMappingURL=webcimes-select.d.ts.map