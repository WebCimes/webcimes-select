
// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    // Apply class WebcimesSelect to all select fields
    document.querySelectorAll("select").forEach((el) => {
        const mySelect = new WebcimesSelect({
            element: el, // Element (selector string or HTMLElement)
            setId: null, // set a specific id on the select. default "null"
            setClass: null, // set a specific class on the select, default "null"
            width: 'auto', // width (specify unit), default "auto"
            height: 'auto', // height (specify unit), default "auto"
            maxHeightOptions: "200px", // max-height for options list (specify unit), default "200px"
            style: null, // add extra css style to select, default null
            allowClear: true, // allow clear selected options, default true
            allowSearch: true, // allow search options, default true 
            searchAutoFocus: true, // autofocus on search field when open select, default true
            keepOpenDropdown: false, // keep dropdown open after selecting an option, default false
            placeholderText: null, // set placeholder text, default null
            removeOptionText: "Remove option", // set remove text for title and aria-label for remove option button, default "Remove option"
            removeAllOptionsText: "Remove all options", // set remove text for title and aria-label for remove all options button, default "Remove all options"
            searchPlaceholderText: "Search", // set placeholder text on search field, default "Search"
            searchNoResultsText: "No results found", // set text for no results found on search, default "No results found"
            optionIconSelectedText: "Selected", // set icon selected text into option dropdown, default "Selected"
            ariaLabel: null, // set aria-label for select, default null
            onInit(){console.log("onInit");}, // callback on init select
            onDestroy(){console.log("onDestroy");}, // callback on destroy select
            onInitDropdown(){console.log("onInitDropdown");}, // callback on init dropdown
            onDestroyDropdown(){console.log("onDestroyDropdown");}, // callback on destroy dropdown
            onSearchDropdown(value, options){console.log("onSearchDropdown"); console.log(value); console.log(options);}, // callback on search dropdown
            onAddOption(value){console.log("onAddOption"); console.log(value);}, // callback on add option
            onRemoveOption(value){console.log("onRemoveOption"); console.log(value);}, // callback on remove option
            onRemoveAllOptions(){console.log("onRemoveAllOptions");}, // callback on  all options
        });
    });
});