# webcimes-select

Just create beautiful select boxes, it supports search, single select, multiple select, keyboard control, clear options, dropdown can also be opened over an overflow parent, and many other options.

All options selected by Webcimes-Select are directly applied to the form's native select, to support sending form.

It works with vanilla javascript + html + css, no dependencies are required and the module it's built in a very lightweight size.

Once the `webcimes-select` javascript is defined, we can simply call the WebcimesSelect class with the desired options.

## Installation

Use the npm package manager to install webcimes-select.

```bash
npm install webcimes-select
```

### ESM
Compared to JS bundlers (like Webpack), using ESM in the browser requires you to use the full path and filename instead of the module name.
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

Or with JS bundlers (like Webpack) you can call directly the module :
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
            searchPlaceholderText: "Search", // set placeholder text on search field, default "Search"
            searchNoResultsText: "No results found", // set text for no results found on search, default "No results found"
            keepOpenDropdown: false, // keep dropdown open after selecting an option, default false
            onInit(){console.log("onInit");}, // callback on init select
            onDestroy(){console.log("onDestroy");}, // callback on destroy select
            onInitDropdown(){console.log("onInitDropdown");}, // callback on init dropdown
            onDestroyDropdown(){console.log("onDestroyDropdown");}, // callback on destroy dropdown
            onSearchDropdown(value, options){console.log("onSearchDropdown");}, // callback on search dropdown
            onAddOption(value){console.log("onAddOption");}, // callback on add option
            onRemoveOption(value){console.log("onRemoveOption");}, // callback on remove option
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

### Placeholder:
By default, the placeholder will be set based on the text defined inside the option having the `value=""` attribute (this is a method to set a placeholder on a natural select). We also recommend adding the `disabled` and `selected` attributes like this:

```html
<select name="mySelect" title="My title">
	<option disabled selected value="">My placeholder</option>
</select>
```

But if you prefer, you can also set the placeholder with the `placeholderText` option. Just note that it will replace the placeholder text in case you also set the placeholder with the previous method.

### Customize text:
You can customize the default text by setting these options:
- `placeholderText` is used to set/replace basic placeholder text.
- `searchPlaceholderText` matches the placeholder text inside the search field in the dropdown container.
- `searchNoResultsText` is the text that appears if no results are found from the search field.

```javascript
const mySelect = new WebcimesSelect({
	element: el, // Element (selector string or HTMLElement)
	placeholderText: null, // set placeholder text, default null
	searchPlaceholderText: "Search", // set placeholder text on search field, default "Search"
	searchNoResultsText: "No results found", // set text for no results found on search, default "No results found"
});
```

### Add extra style to the select:
You can define the style of the select with `css`, but you can also use the `style` property which allows to directly add an additional style to the select.

```javascript
const myModal = new WebcimesSelect({
	style: "background:red; color:cyan;",
});
```






### Get dom element
You can get the dom element of the current modal like this:

```javascript
// Get the instance
const myModal = new WebcimesSelect(...);

// Things

// Then get the dom element of the current modal
myModal.modal;
```

Or you can get the global container of all modals like this:

```javascript
// Get the instance
const myModal = new WebcimesSelect(...);

// Things

// Then get the dom element containing all modals
myModal.webcimesSelects;
```

### Events:
Multiple events exist, which allow to interact with the modal at each step. You can use all events below: 

```javascript
const myModal = new WebcimesSelect({
	beforeShow: () => {console.log("before show");}, // callback before show modal
	afterShow: () => {console.log("after show");}, // callback after show modal
	beforeDestroy: () => {console.log("before destroy");}, // callback before destroy modal
	afterDestroy: () => {console.log("after destroy");}, // callback after destroy modal
	onCancelButton: () => {console.log("on cancel button");}, // callback after triggering cancel button
	onConfirmButton: () => {console.log("on confirm button");}, // callback after triggering confirm button
});
```

You can also use `addEventListener` for get the events from the instance like this:

```javascript
// Get the instance
const myModal = new WebcimesSelect(...);

// Create an event on the current modal
myModal.modal.addEventListener("afterDestroy", () => {
	console.log("after destroy");
});
```

### Destroy
To destroy the modal, you have several ways:

- You can use basic close button with `showCloseButton` property set to `true`

- Use `cancel` or `confirm` button with `closeOnCancelButton` or `closeOnConfirmButton` property set to `true`

- Add a custom button, and set its class to `close`

- Destroy the modal manually with the `destroy` method, like this:

```javascript
// Get the instance
const myModal = new WebcimesSelect(...);

// Things

// Then call the destroy method:
myModal.destroy();
```

### Style modals:
You can style modal with the following field applying to the class of `.webcimesSelects` (for background and z-index behind the modal) and `.webcimesSelects > .modal` (for modal):

```css
.webcimesSelects
{
	--webcimes-selects-background: rgba(0,0,0,0.8);
	--webcimes-selects-z-index: 5;
}
.webcimesSelects > .modal
{
	--modal-color: inherit;
	--modal-background: #fff;
	--modal-border-color: #ddd;
	--modal-box-shadow: 1px 1px 3px 0px #444;
	--modal-title-font-size: 24px;
	--modal-button-cancel-background: rgba(102,102,102,1);
	--modal-button-cancel-background-hover: rgba(102,102,102,0.7);
	--modal-button-cancel-color: #fff;
	--modal-button-cancel-color-hover: #fff;
	--modal-button-confirm-background: rgba(0,0,0,1);
	--modal-button-confirm-background-hover: rgba(0,0,0,0.7);
	--modal-button-confirm-color: #fff;
	--modal-button-confirm-color-hover: #fff;
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)