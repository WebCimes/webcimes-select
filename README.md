# webcimes-select

Just create beautiful select boxes, it supports single select and multiple select.

Many features exist, like search, multilingual, keyboard control, delete options, dropdown can also be opened on overflow parent, optgroup support, rtl support and many other options.

`webcimes-select` also comes with full support for web accessibility and screen readers.

All options selected by Webcimes-Select are directly applied to the form's native select, to support sending native form.

Inspired by select2, but opposed to it, it works with vanilla javascript + html + css, no dependencies are required and the module is built in a very lightweight size.

Once the `webcimes-select` javascript is defined, we can simply call the WebcimesSelect class with the desired options.

## Installation

Use the <a href="https://www.npmjs.com/package/webcimes-select" target="_blank">npm package</a> manager to install webcimes-select.

```bash
npm install webcimes-select
```

### ESM
Compared to JS bundlers (like Webpack or Vite), using ESM in the browser requires you to use the full path and filename instead of the module name.
You can use an importmap to resolve the arbitrary module names to complete paths (not needed if you use JS bundlers):
```html
<html>
    <head>
		...
        <script type="importmap">
        {
            "imports": {
                "webcimes-select": "./node_modules/webcimes-select/dist/js/webcimes-select.esm.js"
            }
        }
        </script>
	</head>
	...
```

Then import javascript module:
```javascript
import { WebcimesSelect } from "webcimes-select";
```

Or you can also set the full path directly in the import:
```html
<html>
    <head>
		...
		<script type="module">
			// Import webcimes-select
			import { WebcimesSelect } from "./node_modules/webcimes-select/dist/js/webcimes-select.esm.js";
			...
		</script>
	</head>
	...
```

Or with JS bundlers (like Webpack or Vite) you can call directly the module :
```javascript
import { WebcimesSelect } from "webcimes-select";
```

### UDM
You can directly load the udm module in the script tag:
```html
<html>
    <head>
		...
        <script src="./node_modules/webcimes-select/dist/js/webcimes-select.udm.js" type="text/javascript"></script>
	</head>
	...
```

### Import stylesheet:
```html
<link rel="stylesheet" href="./node_modules/webcimes-select/dist/css/webcimes-select.css">
```

## Usage

### Call `WebcimesSelect` for create custom select:
```javascript
// Wait for dom content loaded or call WebcimesSelect before the end of body
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
            placeholderText: null, // set placeholder text, default null
            allowClear: true, // allow clear selected options, default true
            allowSearch: true, // allow search options, default true 
            searchAutoFocus: true, // autofocus on search field when open select, default true
            keepOpenDropdown: false, // keep dropdown open after selecting an option, default false
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
```

### Set basic parameter on the select:
All parameters are optional (except `element`).

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
});
```

### Scale select:
By default `height` and `width` are set to `auto`, the select will also be sized according to the html content. The `width` will be relative to the parent container and the `height` depending on the options selected.

You can also set the `height` or `width` by specifying the value with a number and a unit.

The `maxHeightOptions` defaults to 200px, and corresponds to the options container inside the drop-down list, if too many options exceed the value of `maxHeightOptions`, a scrollbar will appear inside the options container.

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
	width: 'auto', // width (specify unit), default "auto"
	height: 'auto', // height (specify unit), default "auto"
	maxHeightOptions: "200px", // max-height for options list (specify unit), default "200px"
});
```

### Select behavior:
Below are the different options for customize the select behavior.

- `allowClear` to allow clearing of selected options (for single and multiple selects).
- `allowSearch` is used to create an input search field in the drop-down list.
- `keepOpenDropdown` to keep the drop-down list open after selecting an option (more useful with a multiple select).

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
	allowClear: true, // allow clear selected options, default true
	allowSearch: true, // allow search options, default true 
	keepOpenDropdown: false, // keep dropdown open after selecting an option, default false
});
```

### Use optgroup:
You can use optgroup by setting optgroup element in native select like this:

```html
<select name="mySelect">
	<optgroup label="France">
		<option value="Paris">Paris</option>
		<option value="Marseille">Marseille</option>
	</optgroup>
	<optgroup label="Italie">
		<option value="Rome">Rome</option>
		<option value="Venise">Venise</option>
	</optgroup>
</select>
```

### Use RTL (Right to left):
To set the select to use RTL (right to left), you need to put the `dir` attribute inside the native select, like this:

```html
<select name="mySelect" dir="rtl">
	<option>...</option>
</select>
```

### Placeholder:
By default, the placeholder will be set based on the text defined inside the option having the `value=""` attribute (this is a method to set a placeholder on a native select). We also recommend adding the `disabled` and `selected` attributes like this:

```html
<select name="mySelect" title="My title">
	<option disabled selected value="">My placeholder</option>
</select>
```

But if you prefer, you can also set the placeholder with the `placeholderText` option. Just note that it will replace the placeholder text in case you also set the placeholder with the previous method.

### Aria label:

1. By default, the label will be set based on the label tag relative to the native select, for example:

```html
<label>
	My label
	<select name="mySelect">
		...
	</select>
</label>
```
or
```html
<label for="mySelect">My label</label>
<select id="mySelect">
	...
</select>
```
In the following case, `aria-label` will automatically be set to `"My label"`

2. Another way will be to define an `aria-label` attribute on the native select, like this:

```html
<select name="mySelect" title="My title" aria-label="My label">
	...
</select>
```
Just note that it will replace the `aria-label` text in case you have use the `label` tag with the previous method (1.).

3. But if you prefer, you can also set the aria-label with the `ariaLabel` option on `WebCimesSelect`, like this:

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
	ariaLabel: "My label", // set aria-label for select, default null
});
```

Just note that it will replace the `aria-label` text in case you have use one of the two previous method (1. & 2.).

### Customize text:
You can customize the default text by setting these options:
- `placeholderText` is used to set/replace basic placeholder text.
- `removeOptionText` is the title and aria-label text that appears on remove option button.
- `removeAllOptionsText` is the title and aria-label text that appears on remove all options button.
- `searchPlaceholderText` matches the placeholder text inside the search field in the dropdown container.
- `searchNoResultsText` is the text that appears if no results are found from the search field.
- `optionIconSelectedText` is the the title and aria-label text that appears on icon option dropdown if option is selected.
- `ariaLabel` is the accessibility text that appears on the select.

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
	placeholderText: null, // set placeholder text, default null
	removeOptionText: "Remove option", // set remove text for title and aria-label for remove option button, default "Remove option"
	removeAllOptionsText: "Remove all options", // set remove text for title and aria-label for remove all options button, default "Remove all options"
	searchPlaceholderText: "Search", // set placeholder text on search field, default "Search"
	searchNoResultsText: "No results found", // set text for no results found on search, default "No results found"
	optionIconSelectedText: "Selected", // set icon selected text into option dropdown, default "Selected"
	ariaLabel: null, // set aria-label for select, default null
});
```

### Customize default language for texts:

You can choose a default language for all texts, actually `"en" / "fr" / "es" / "de" / "it" / "pt" / "nl" / "ru" ` is supported.

All default texts will be translated into the defined language.

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
	language: "en", // set default language for texts, default "en"
});
```

Just note that if you customize the default text for any of these attributes "`removeOptionText, removeAllOptionsText, searchPlaceholderText, searchNoResultsText, optionIconSelectedText`", it will override the default text, even if you set the `language` attribute to a language other than the default `"en"` language.

### Add extra style to the select:
You can define the style of the select with `css`, but you can also use the `style` property which allows to directly add an additional style to the select.

```javascript
const mySelect = new WebcimesSelect({
	style: "background:red; color:cyan;",
});
```

### Get dom element
You can get the dom element of the `native select` like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then get the dom element of the native select
mySelect.nativeSelect;
```

Or you can Get the dom element of the current `select` like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then get the dom element of the current select
mySelect.select;
```

Or you can also get the dom element of the current `dropdown` like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then get the dom element of the current dropdown
mySelect.dropdown;
```

### Events:
Multiple events exist, which allow to interact with the select at each step. You can use all events below: 

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
	onInit(){console.log("onInit");}, // callback on init select
	onDestroy(){console.log("onDestroy");}, // callback on destroy select
	onInitDropdown(){console.log("onInitDropdown");}, // callback on init dropdown
	onDestroyDropdown(){console.log("onDestroyDropdown");}, // callback on destroy dropdown
	onSearchDropdown(value, options){console.log("onSearchDropdown"); console.log(value); console.log(options);}, // callback on search dropdown
	onAddOption(value){console.log("onAddOption"); console.log(value);}, // callback on add option
	onRemoveOption(value){console.log("onRemoveOption"); console.log(value);}, // callback on remove option
	onRemoveAllOptions(){console.log("onRemoveAllOptions");}, // callback on  all options
});
```

You can also use `addEventListener` for get the events from the instance like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Create an event on the current select
selectCity.select.addEventListener("onSearchDropdown", (e) => {
	console.log("onSearchDropdown");
	console.log(e.detail.value); // Get parameter with e.detail
	console.log(e.detail.options); // Get parameter with e.detail
});
```

### Disable select
To disable the select, you can call the `disable` method, like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then call the disable method:
mySelect.disable();
```

You can also remove the disabled attribute like this:
```javascript
mySelect.disable(false);
```

### Refresh options
To update/refresh the select options (after changing the native select options for example), you can call the `initOptions` method, like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then call the init options method:
mySelect.initOptions();
```

### Add selected option
To add a selected option, you can call the `addOption` method, like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then call the add selected option method:
mySelect.addOption("Paris");
```

### Remove selected option
To remove a selected option, you can call the `removeOption` method, like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then call the remove selected option method:
mySelect.removeOption("Paris");
```
Just note that if the select or an option is disabled, you cannot remove it.

### Remove all selected option
To remove all selected options, you can call the `removeAllOptions` method, like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then call the remove all selected options method:
mySelect.removeAllOptions();
```
Just note that if the select or an option is disabled, you cannot remove them.

### Destroy
To destroy the select, you can call the `destroy` method, like this:

```javascript
// Get the instance
const mySelect = new WebcimesSelect(...);

// Things

// Then call the destroy method:
mySelect.destroy();
```

### Style select:
You can style select with the following field applying to the class of `.webcimes-select, .webcimes-dropdown`:

```css
.webcimes-select,
.webcimes-dropdown
{
	--select-color: inherit;
	--select-background: #fff;
	--select-padding: 2.5px 5px;
	--select-border: 1px solid #cbd5e1;
	--select-border-radius: 4px;
	--select-focus-border-color: #94a3b8;
	--select-disabled-opacity: 0.5;
	--select-option-margin: 2.5px 5px 2.5px 0;
	--select-option-padding: 5px 10px;
	--select-option-multiple-color: #334155;
	--select-option-multiple-background: #e2e8f0;
	--select-option-multiple-border: 1px solid #cbd5e1;
	--select-option-multiple-border-radius: 4px;
	--select-option-multiple-clear-background: #e2e8f0;
	--select-option-multiple-clear-background-hover: #f1f5f9;
	--select-placeholder-opacity: 0.7;
	--select-cross-background: #64748b;
	--select-cross-background-hover: #334155;
	--select-arrow-background: #64748b;
	--select-input-padding: 10px;
	--select-dropdown-option-padding: 10px;
	--select-dropdown-option-color-selected: #334155;
	--select-dropdown-option-background-selected: #e2e8f0;
	--select-dropdown-option-color-hightlight: #fff;
	--select-dropdown-option-background-hightlight: #64748b;
	--select-dropdown-option-disabled-opacity: 0.5;
	--select-dropdown-optgroup-option-padding: 10px 10px 10px 20px;
	--select-dropdown-optgroup-option-padding-rtl: 10px 20px 10px 10px;
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)