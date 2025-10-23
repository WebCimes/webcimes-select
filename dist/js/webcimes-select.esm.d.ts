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
        onChange: CustomEvent;
        onAddOption: CustomEvent;
        onRemoveOption: CustomEvent;
        onRemoveAllOptions: CustomEvent;
    }
}
/**
 * Default texts
 */
export interface defaultTexts {
    removeOptionText: string;
    removeAllOptionsText: string;
    searchPlaceholderText: string;
    searchNoResultsText: string;
    optionIconSelectedText: string;
}
/**
 * Options
 */
export interface Options {
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
    /** allow clear selected options, default true */
    allowClear: boolean;
    /** allow search options, default true */
    allowSearch: boolean;
    /** autofocus on search field when open select, default true */
    searchAutoFocus: boolean;
    /** keep dropdown open after selecting an option, default false */
    keepOpenDropdown: boolean;
    /** set default language for defaultTexts, default "en" */
    language: string;
    /** set default texts for select (override the language texts), default english texts */
    defaultTexts: defaultTexts;
    /** set placeholder text, default null */
    placeholderText: string | null;
    /** set aria-label for select, default null */
    ariaLabel: string | null;
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
    /** callback on change */
    onChange(value: string, selected: boolean, selectedOptions: HTMLOptionElement[]): void;
    /** callback on add option */
    onAddOption(value: string): void;
    /** callback on remove option */
    onRemoveOption(value: string): void;
    /** callback on  all options */
    onRemoveAllOptions(): void;
}
/**
 * Public interface for WebcimesSelect instances
 * This represents the actual accessible members of the instance
 */
export interface WebcimesSelect {
    /** Get the dom element of the native select */
    nativeSelect: HTMLSelectElement | null;
    /** Get the dom element of select */
    select: HTMLElement;
    /** Get the dom element of dropdown */
    dropdown: HTMLElement | null;
    /** Destroy the select */
    destroy(): void;
    /** Enable or disable the select */
    disable(disable?: boolean): void;
    /** Get selected options */
    getSelectedOptions(): HTMLOptionElement[];
    /** Initialize options */
    initOptions(): void;
    /** Add a selected option */
    addSelectedOption(value: string | null): void;
    /** Remove a selected option */
    removeSelectedOption(value: string | null): void;
    /** Remove all options */
    removeAllOptions(): void;
}
/**
 * Factory function to create a WebcimesSelect instance with proper typing
 */
export declare function CreateWebcimesSelect(options: Partial<Options>): WebcimesSelect;
//# sourceMappingURL=webcimes-select.d.ts.map