/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */

"use strict";

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
export class WebcimesSelect
{
	/** Get the dom element of the current select */
	public select: HTMLSelectElement | null;
	
	/** Get the dom element of the current webcimesSelect */
	public webcimesSelect: HTMLElement;
	
	/** Get the dom element of the current webcimesDropdown */
	public webcimesDropdown: HTMLElement | null = null;

	/** Options of the current select */
	private options: Options;

	/**
	 * Convert elements entry to an array of HTMLElement
	 */
	private getHtmlElements(element: string | HTMLElement | NodeList | null)
	{
		// Convert options.element to an array of HTMLElement
		let htmlElements: HTMLElement[] = [];
		if(element instanceof NodeList)
		{
			htmlElements = [...Array.from(element) as HTMLElement[]];
		}
		if(element instanceof HTMLElement)
		{
			htmlElements = [...[element]];
		}
		if(typeof element === "string")
		{
			htmlElements = [...Array.from(document.querySelectorAll(element)) as HTMLElement[]];
		}
		return htmlElements;
	}

	/**
	 * Convert element entry to an HTMLElement
	 */
	private getHtmlElement(element: string | HTMLElement | null)
	{
		// Convert options.element to an array of HTMLElement
		let htmlElement: HTMLElement | null = null;
		if(element instanceof HTMLElement)
		{
			htmlElement = element;
		}
		if(typeof element === "string")
		{
			htmlElement = document.querySelector(element) as HTMLElement | null;
		}
		return htmlElement;
	}

	/**
	 * Init options or placeholder on webcimesSelect, according selected option on select field
	 */
	private initWebcimesSelectOptions()
	{
		if(this.select)
		{
			// Get selected options with no empty value
			let selectedOptions = Array.from(this.select.selectedOptions).filter((el) => {
				if(el.value !== "")
				{
					return true;
				}
			});

			// Remove old event clear selected option on webcimesSelect
			this.webcimesSelect.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((el) => {
				el.removeEventListener("click", this.onWebcimesSelectClearOption);
			});

			// Remove old option(s)
			this.webcimesSelect.querySelector(".webcimes-select__options")!.innerHTML = "";
			
			// If an option is selected, show the value
			if(selectedOptions.length)
			{
				this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.add("webcimes-select__clear--active");
				selectedOptions.forEach((el) => {
					let option = document.createElement("template");
					option.innerHTML = 
					`<div class="webcimes-select__option" data-value="${el.value}">
						<div class="webcimes-select__option-label" title="${el.innerHTML}">${el.innerHTML}</div>
						${this.select!.multiple?`<button type="button" class="webcimes-select__clear"><div class="webcimes-select__cross"></div></button>`:``}
					</div>\n`;
					this.webcimesSelect.querySelector(".webcimes-select__options")!.appendChild(option.content);
				});
			}
			// Else if a placeholder string exist, show the value
			else if(this.options.placeholderText)
			{
				this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");
				let option = document.createElement("template");
				option.innerHTML = 
				`<div class="webcimes-select__option webcimes-select__option--placeholder" data-value="">
					<div class="webcimes-select__option-label" title="${this.options.placeholderText}">${this.options.placeholderText}</div>
				</div>\n`;
				this.webcimesSelect.querySelector(".webcimes-select__options")!.appendChild(option.content);
			}
			// Else if no option selected and no placeholder
			else
			{
				this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");
			}

			// Event clear selected option on webcimesSelect
			this.webcimesSelect.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((el) => {
				el.addEventListener("click", this.onWebcimesSelectClearOption);
			});
		}
	}

	/**
	 * Add option on webcimesSelect
	 */
	private addWebcimesSelectOption(value: string | null)
	{
		if(value)
		{
			// If select single, remove all options selected
			if(!this.select!.multiple)
			{
				this.removeWebcimesSelectAllOptions();
			}

			// Set option selected on select
			let optionEl = this.select!.querySelector(`option[value="${value}"]`) as HTMLOptionElement;
			optionEl.setAttribute("selected", "");
			optionEl.selected = true;

			// Init option on webcimesSelect
			this.initWebcimesSelectOptions();

			// If keepOpenDropdown option true
			if(this.options.keepOpenDropdown)
			{
				// Add selected class on dropdown option
				this.webcimesDropdown?.querySelector(`.webcimes-dropdown__option[data-value="${value}"]`)?.classList.add("webcimes-dropdown__option--selected");

				// Set position and width of webcimesDropdown
				this.setWebcimesDropdownPosition(true);
			}
			else
			{
				// Destroy webcimesDropdown
				this.destroyWebcimesDropdown();
			}
	
			// Callback on set option
			this.webcimesSelect.dispatchEvent(new CustomEvent("onAddOption"));
			if(typeof this.options.onAddOption === 'function')
			{
				this.options.onAddOption(value);
			}
		}
	}

	/**
	 * Remove option on webcimesSelect
	 */
	private removeWebcimesSelectOption(value: string | null)
	{
		if(value)
		{
			// Remove option selected on select
			let optionEl = this.select!.querySelector(`option[value="${value}"]:not([disabled])`) as HTMLOptionElement;
			optionEl.removeAttribute("selected");
			optionEl.selected = false;

			// If select single and allowClear option
			if(!this.select!.multiple && this.options.allowClear)
			{
				// Set and force select value to empty string (or placeholder option if define)
				this.select!.value = "";
			}

			// Init option on webcimesSelect
			this.initWebcimesSelectOptions();

			// If keepOpenDropdown option true
			if(this.options.keepOpenDropdown)
			{
				// Remove selected class on dropdown option
				this.webcimesDropdown?.querySelector(`.webcimes-dropdown__option[data-value="${value}"]`)?.classList.remove("webcimes-dropdown__option--selected");
				
				// Set position and width of webcimesDropdown
				this.setWebcimesDropdownPosition(true);
			}
			else
			{
				// Destroy webcimesDropdown
				this.destroyWebcimesDropdown();
			}
	
			// Callback on set option
			this.webcimesSelect.dispatchEvent(new CustomEvent("onRemoveOption"));
			if(typeof this.options.onRemoveOption === 'function')
			{
				this.options.onRemoveOption(value);
			}
		}
	}

	/**
	 * Remove all options on webcimesSelect
	 */
	private removeWebcimesSelectAllOptions()
	{
		this.select!.querySelectorAll(`option:not([disabled])`).forEach((el: HTMLOptionElement) => {
			// Remove option selected on select
			el.removeAttribute("selected");
			el.selected = false;
		});

		// If select single and allowClear option
		if(!this.select!.multiple && this.options.allowClear)
		{
			// Set and force select value to empty string (or placeholder option if define)
			this.select!.value = "";
		}

		// Init option on webcimesSelect
		this.initWebcimesSelectOptions();

		// If keepOpenDropdown option true
		if(this.options.keepOpenDropdown)
		{
			// Remove selected class on dropdown option
			this.webcimesDropdown?.querySelectorAll(`.webcimes-dropdown__option`).forEach((el) => {
				el.classList.remove("webcimes-dropdown__option--selected");
			});
			
			// Set position and width of webcimesDropdown
			this.setWebcimesDropdownPosition(true);
		}
		else
		{
			// Destroy webcimesDropdown
			this.destroyWebcimesDropdown();
		}
	
		// Callback on set option
		this.webcimesSelect.dispatchEvent(new CustomEvent("onRemoveAllOptions"));
		if(typeof this.options.onRemoveAllOptions === 'function')
		{
			this.options.onRemoveAllOptions();
		}
	}
	
	/**
	 * Event clear selected option on webcimesSelect
	 */
	private onWebcimesSelectClearOption(e: Event)
	{
		this.removeWebcimesSelectOption((e.target as HTMLElement).closest(".webcimes-select__option")!.getAttribute("data-value"));
	}
	
	/**
	 * Event clear all selected options on webcimesSelect
	 */
	private onWebcimesSelectClearAllOptions(e: Event)
	{
		this.removeWebcimesSelectAllOptions();
	}
	
	/**
	 * Event on keydown on webcimesSelect
	 */
	private onWebcimesSelectKeyDown(e: KeyboardEvent)
	{
		if((e.target as HTMLElement).closest(".webcimes-select > .webcimes-select__clear"))
		{
			if(e.key == "Enter")
			{
				e.preventDefault();
				this.removeWebcimesSelectAllOptions();
			}
		}
		else if((e.target as HTMLElement).closest(".webcimes-select__option .webcimes-select__clear"))
		{
			if(e.key == "Enter")
			{
				e.preventDefault();
				this.removeWebcimesSelectOption((e.target as HTMLElement).closest(".webcimes-select__option")!.getAttribute("data-value"));
			}
		}
		else
		{
			if(!this.webcimesDropdown)
			{
				// Create webcimesDropdown
				if(e.key == " " || e.key == "Enter" || e.key == "ArrowUp" || e.key == "ArrowDown")
				{
					e.preventDefault();
					this.initWebcimesDropdown();
				}
			}
		}
	}
	
	/**
	 * Event init webcimesDropdown on click on webcimesSelect
	 */
	private onWebcimesSelectClickInitWebcimesDropdown(e: Event)
	{
		// If webcimesDropdown is null, create webcimesDropdown
		if(!this.webcimesDropdown && !(e.target as HTMLElement).closest(".webcimes-select__clear"))
		{
			this.initWebcimesDropdown();
		}
		// Close webcimesDropdown
		else
		{
			this.destroyWebcimesDropdown();
		}
	}

	/**
	 * Init webcimesDropdown
	 */
	private initWebcimesDropdown()
	{
		this.webcimesSelect.classList.add("webcimes-select--open");
					
		// Append webcimesDropdown after select
		document.body.insertAdjacentHTML("beforeend", 
			`<div class="webcimes-dropdown" ${(this.select!.getAttribute("dir")=="rtl"?`dir="rtl"`:``)} tabindex="-1">
				${(this.options.allowSearch?`<input class="webcimes-dropdown__search-input" type="text" name="search" autocomplete="off" ${(this.options.searchPlaceholderText?`placeholder="${this.options.searchPlaceholderText}" title="${this.options.searchPlaceholderText}"`:``)}>`:``)}
				<div class="webcimes-dropdown__options" style="max-height:${this.options.maxHeightOptions};" tabindex="-1"></div>
			</div>`
		);

		// Define webcimesDropdown
		this.webcimesDropdown = document.body.lastElementChild as HTMLElement;

		// Set options on webcimesDropdown
		let options = Array.from(this.select!.options).filter((el) => {
			if(el.value !== "")
			{
				return el;
			}
		});
		this.setWebcimesDropdownOptions(Array.from(options));
		
		// Set position and width of webcimesDropdown
		this.setWebcimesDropdownPosition();

		// By default set focus on webcimesDropdown
		this.webcimesDropdown.focus();

		// If allowSearch active
		if(this.options.allowSearch)
		{
			let searchEl = (this.webcimesDropdown.querySelector(".webcimes-dropdown__search-input") as HTMLInputElement);

			// Set focus on search field
			if(this.options.searchAutoFocus)
			{
				searchEl.focus();
			}

			// Event search options on webcimesDropdown
			searchEl.addEventListener("input", this.onWebcimesDropdownSearch);
		}

		// Event on keydown on webcimesDropdown 
		this.webcimesDropdown.addEventListener("keydown", this.onWebcimesDropdownKeyPress);

		// Event on resize on WebcimesDropdown
		window.addEventListener("resize", this.onWebcimesDropdownResize);

		// Event destroy on click or keydown outside webcimesDropdown
		['click', 'keydown'].forEach((typeEvent) => {
			document.addEventListener(typeEvent, this.onWebcimesDropdownDestroy);
		});
		
		// Callback on init dropdown
		this.webcimesSelect.dispatchEvent(new CustomEvent("onInitDropdown"));
		if(typeof this.options.onInitDropdown === 'function')
		{
			this.options.onInitDropdown();
		}
	}

	/**
	 * Set webcimesDropdown options
	 */
	private setWebcimesDropdownOptions(options: HTMLOptionElement[])
	{
		// Remove old events on WebcimesDropdown option
		this.webcimesDropdown!.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((el: HTMLElement) => {
			el.removeEventListener("click", this.onWebcimesDropdownClickOption);
			el.removeEventListener("mouseover", this.onWebcimesDropdownMouseOverOption)
		});

		// Set options
		let optionsEl = document.createElement("template");
		options.forEach((el, index) => {
			let optionEl = document.createElement("template");
			optionEl.innerHTML = `<div class="webcimes-dropdown__option ${(el.selected?`webcimes-dropdown__option--selected`:``)} ${index==0?"webcimes-dropdown__option--highlighted":""} ${(el.disabled?`webcimes-dropdown__option--disabled`:``)} ${el.classList.toString()}" data-value="${el.value}" title="${el.innerHTML}">${el.innerHTML}</div>\n`;

			// If option has optgroup parent
			if(el.closest("optgroup"))
			{
				let label = el.closest("optgroup")!.label;

				// Create the optgroup if has not already been created
				if(!optionsEl.content.querySelector(`.webcimes-dropdown__opt-group[data-label='${label}']`))
				{
					let optGroupEl = document.createElement("template");
					optGroupEl.innerHTML = 
					`<div class="webcimes-dropdown__opt-group" data-label="${label}" title="${label}">
						<div class="webcimes-dropdown__opt-group-label">${label}</div>
					</div>\n`;
					optionsEl.content.appendChild(optGroupEl.content);
				}

				// Add option to optgroup
				optionsEl.content.querySelector(`.webcimes-dropdown__opt-group[data-label='${label}']`)?.appendChild(optionEl.content);
			}
			else
			{
				// Add option to options
				optionsEl.content.appendChild(optionEl.content);
			}
		});
		this.webcimesDropdown!.querySelector(".webcimes-dropdown__options")!.replaceChildren(optionsEl.content);

		// Events on WebcimesDropdown option
		this.webcimesDropdown!.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((el: HTMLElement) => {
			el.addEventListener("click", this.onWebcimesDropdownClickOption);
			el.addEventListener("mouseover", this.onWebcimesDropdownMouseOverOption)
		});
	}

	/**
	 * Set webcimesDropdown position and width, relative to webcimesSelect
	 */
	private setWebcimesDropdownPosition(keepDirection: boolean = false)
	{
		if(this.webcimesDropdown)
		{
			let webcimesSelectRect = this.webcimesSelect.getBoundingClientRect();

			// If the webcimesDropdown is too high for the bottom of the window, then we direct it to the top (or if keepDirection set to true and webcimes-select--direction-top already exist)
			if(
				(keepDirection && this.webcimesSelect.classList.contains("webcimes-select--direction-top")) || 
				(!keepDirection && webcimesSelectRect.bottom + this.webcimesDropdown.getBoundingClientRect().height > window.innerHeight)
			)
			{
				this.webcimesSelect.classList.remove("webcimes-select--direction-bottom");
				this.webcimesSelect.classList.add("webcimes-select--direction-top");
				this.webcimesDropdown.classList.remove("webcimes-dropdown--direction-bottom");
				this.webcimesDropdown.classList.add("webcimes-dropdown--direction-top");
				this.webcimesDropdown.style.top = (webcimesSelectRect.top - this.webcimesDropdown.getBoundingClientRect().height + window.scrollY)+"px";
			}
			// Else direct it to the bottom
			else
			{
				this.webcimesSelect.classList.remove("webcimes-select--direction-top");
				this.webcimesSelect.classList.add("webcimes-select--direction-bottom");
				this.webcimesDropdown.classList.remove("webcimes-dropdown--direction-top");
				this.webcimesDropdown.classList.add("webcimes-dropdown--direction-bottom");
				this.webcimesDropdown.style.top = (webcimesSelectRect.bottom + window.scrollY)+"px";
			}

			// Set webcimesDropdown left position
			this.webcimesDropdown.style.left = (webcimesSelectRect.left + window.scrollX)+"px";

			// Set webcimesDropdown width
			this.webcimesDropdown.style.width = webcimesSelectRect.width+"px";
		}
	}

	/**
	 * Set highlight option
	 */
	private setWebcimesDropdownHighlightOption(index: number, autoScroll: boolean)
	{
		let highlightedOption = this.webcimesDropdown!.querySelector(".webcimes-dropdown__option--highlighted");
		let optionsEl = this.webcimesDropdown!.querySelectorAll(`.webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)`);
		highlightedOption?.classList.remove("webcimes-dropdown__option--highlighted");
		highlightedOption = optionsEl[index];
		highlightedOption.classList.add("webcimes-dropdown__option--highlighted");
		if(autoScroll)
		{
			highlightedOption.scrollIntoView({behavior: "smooth", block: "nearest"});
		}
	}

	/**
	 * Destroy webcimesDropdown
	 */
	private destroyWebcimesDropdown()
	{
		if(this.webcimesDropdown)
		{
			// Destroy webcimesDropdown
			this.webcimesSelect.classList.remove("webcimes-select--open");
			(this.webcimesDropdown.querySelector(".webcimes-dropdown__search-input") as HTMLElement).removeEventListener("input", this.onWebcimesDropdownSearch);
			this.webcimesDropdown.removeEventListener("keydown", this.onWebcimesDropdownKeyPress);
			window.removeEventListener("resize", this.onWebcimesDropdownResize);
			['click', 'keydown'].forEach((typeEvent) => {
				document.removeEventListener(typeEvent, this.onWebcimesDropdownDestroy);
			});
			this.webcimesDropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((el: HTMLElement) => {
				el.removeEventListener("click", this.onWebcimesDropdownClickOption);
				el.removeEventListener("mouseover", this.onWebcimesDropdownMouseOverOption)
			});
			this.webcimesDropdown.remove();
			this.webcimesDropdown = null;

			// Set focus to webcimesSelect after destroy webcimesDropdown (only if no other webcimesDropdown is open)
			if(!document.querySelector(".webcimes-dropdown"))
			{
				this.webcimesSelect.focus();
			}

			// Remove class direction on webcimesSelect after destroy dropdown
			this.webcimesSelect.classList.remove("webcimes-select--direction-bottom");
			this.webcimesSelect.classList.remove("webcimes-select--direction-top");

			// Callback on destroy dropdown
			this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroyDropdown"));
			if(typeof this.options.onDestroyDropdown === 'function')
			{
				this.options.onDestroyDropdown();
			}
		}
	}

	/**
	 * Event search options on webcimesDropdown
	 */
	private onWebcimesDropdownSearch(e: Event)
	{
		// Search options
		let regexSearch = new RegExp((e.target as HTMLInputElement).value, "i");
		let options = Array.from(this.select!.options).filter((el) => {
			if(el.value !== "")
			{
				if(regexSearch.test(el.innerHTML) || regexSearch.test(el.value))
				{
					return true;
				}
			}
		});

		// If no option match the search, and searchTextNoResults not null, then show no results
		if(options.length == 0 && this.options.searchNoResultsText)
		{
			let optionEl = document.createElement("option");
			optionEl.classList.add("webcimes-dropdown__option--no-results");
			optionEl.innerHTML = this.options.searchNoResultsText;
			options.push(optionEl);
		}

		// Set options on webcimesDropdown
		this.setWebcimesDropdownOptions(options);
		
		// Set position and width of webcimesDropdown
		this.setWebcimesDropdownPosition(true);

		// Callback on search dropdown
		this.webcimesSelect.dispatchEvent(new CustomEvent("onSearchDropdown"));
		if(typeof this.options.onSearchDropdown === 'function')
		{
			this.options.onSearchDropdown((e.target as HTMLInputElement).value, options);
		}
	}

	/**
	 * Event on keydown on webcimesDropdown 
	 */
	private onWebcimesDropdownKeyPress(e: KeyboardEvent)
	{
		// If KeyboardEvent not comming from webcimesSelect
		if(e.target != this.webcimesSelect)
		{
			let highlightedOption = this.webcimesDropdown!.querySelector(".webcimes-dropdown__option--highlighted");
			if(highlightedOption)
			{
				if(e.key == "ArrowUp" || e.key == "ArrowDown")
				{
					e.preventDefault();
					let optionsEl = this.webcimesDropdown!.querySelectorAll(`.webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)`);
					let highlightedIndex = Array.from(optionsEl).indexOf(highlightedOption);
					this.setWebcimesDropdownHighlightOption((e.key == "ArrowUp" ? (highlightedIndex-1 >= 0 ? highlightedIndex-1 : 0) : (highlightedIndex+1 <= optionsEl.length-1 ? highlightedIndex+1 : optionsEl.length-1)), true);
				}
				if(e.key == "Enter")
				{
					e.preventDefault();
					if(highlightedOption.classList.contains("webcimes-dropdown__option--selected"))
					{
						this.removeWebcimesSelectOption(highlightedOption.getAttribute("data-value"));
					}
					else
					{
						this.addWebcimesSelectOption(highlightedOption.getAttribute("data-value"));
					}
				}
			}
			if(e.key == "Escape")
			{
				e.preventDefault();
				this.destroyWebcimesDropdown();
			}
			if(e.key == "Tab")
			{
				e.preventDefault();
				this.destroyWebcimesDropdown();
			}
		}
	}

	/**
	 * Event on mouseover option on webcimesDropdown 
	 */
	private onWebcimesDropdownMouseOverOption(e: MouseEvent)
	{
		let optionsEl = this.webcimesDropdown!.querySelectorAll(`.webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)`);
		this.setWebcimesDropdownHighlightOption(Array.from(optionsEl).indexOf(e.target as HTMLElement), false);
	}

	/**
	 * Event on resize on WebcimesDropdown
	 */
	private onWebcimesDropdownResize(e: Event)
	{
		this.setWebcimesDropdownPosition();
	}

	/**
	 * Event on select option on WebcimesDropdown
	 */
	private onWebcimesDropdownClickOption(e: Event)
	{
		if((e.target as HTMLElement).classList.contains("webcimes-dropdown__option--selected"))
		{
			this.removeWebcimesSelectOption((e.target as HTMLElement).getAttribute("data-value"));
		}
		else
		{
			this.addWebcimesSelectOption((e.target as HTMLElement).getAttribute("data-value"));
		}
	}

	/**
	 * Event destroy on click or keydown outside webcimesDropdown
	 */
	private onWebcimesDropdownDestroy(e: Event)
	{
		if((e.target as HTMLElement).closest(".webcimes-select") != this.webcimesSelect && (e.target as HTMLElement).closest(".webcimes-dropdown") != this.webcimesDropdown)
		{
			this.destroyWebcimesDropdown();
		}
	}

	/**
	 * Create select
	 */
	constructor(options: Options)
	{
		// Defaults
		const defaults: Options = {
			element: null,
			setId: null,
			setClass: null,
			width: 'auto',
			height: 'auto',
			maxHeightOptions: '200px',
			style: null,
			placeholderText: null,
			allowClear: true,
			allowSearch: true,
			searchAutoFocus: true,
			searchPlaceholderText: "Search",
			searchNoResultsText: "No results found",
			keepOpenDropdown: false,
			onInit: () => {},
			onDestroy(){},
			onInitDropdown: () => {},
			onDestroyDropdown: () => {},
			onSearchDropdown: () => {},
			onAddOption: () => {},
			onRemoveOption: () => {},
			onRemoveAllOptions: () => {},
		}
		this.options = {...defaults, ...options};

		// Bind "this" to all events
		this.onWebcimesSelectClearOption = this.onWebcimesSelectClearOption.bind(this);
		this.onWebcimesSelectClearAllOptions = this.onWebcimesSelectClearAllOptions.bind(this);
		this.onWebcimesSelectKeyDown = this.onWebcimesSelectKeyDown.bind(this);
		this.onWebcimesSelectClickInitWebcimesDropdown = this.onWebcimesSelectClickInitWebcimesDropdown.bind(this);
		this.onWebcimesDropdownSearch = this.onWebcimesDropdownSearch.bind(this);
		this.onWebcimesDropdownKeyPress = this.onWebcimesDropdownKeyPress.bind(this);
		this.onWebcimesDropdownMouseOverOption = this.onWebcimesDropdownMouseOverOption.bind(this);
		this.onWebcimesDropdownResize = this.onWebcimesDropdownResize.bind(this);
		this.onWebcimesDropdownClickOption = this.onWebcimesDropdownClickOption.bind(this);
		this.onWebcimesDropdownDestroy = this.onWebcimesDropdownDestroy.bind(this);
		
		// Call init method
		this.init();
	}

	/**
	 * Initialization of the current select
	 */
    private init()
	{
		// Define select
		this.select = this.getHtmlElement(this.options.element) as HTMLSelectElement | null;
		if(this.select)
		{
			// Hide select
			this.select.style.display = "none";

			// Append webcimesSelect after select
			this.select.insertAdjacentHTML("afterend", 
				`<div class="webcimes-select ${(this.select.multiple?`webcimes-select--multiple`:``)} ${(this.options.setClass?this.options.setClass:``)}" ${(this.options.setId?`id="${this.options.setId}"`:``)} ${(this.select.getAttribute("dir")=="rtl"?`dir="rtl"`:``)} tabindex="0">
					<div class="webcimes-select__options"></div>
					${(this.options.allowClear?`<button type="button" class="webcimes-select__clear"><div class="webcimes-select__cross"></div></button>`:'')}
					<div class="webcimes-select__arrow"></div>
				</div>`
			);

			// Define webcimesSelect
			this.webcimesSelect = this.select.nextElementSibling as HTMLElement;

			// Set placeholder
			if(!this.options.placeholderText)
			{
				if(this.select.querySelector("option[value='']"))
				{
					this.options.placeholderText = this.select.querySelector("option[value='']")!.innerHTML;
				}
			}

			// Width of webcimesSelect
			if(this.options.width != "auto" && this.options.width)
			{
				this.webcimesSelect.style.setProperty("width", this.options.width);
			}

			// Height of select
			if(this.options.height != "auto" && this.options.height)
			{
				this.webcimesSelect.style.setProperty("height", this.options.height);
			}

			// Style
			if(this.options.style)
			{
				let oldStyle = this.webcimesSelect.getAttribute("style");
				this.webcimesSelect.setAttribute("style", oldStyle+this.options.style);
			}

			// Set webcimesSelect value (or placeholder)
			this.initWebcimesSelectOptions();

			// Event clear all selected options on webcimesSelect
			this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.addEventListener("click", this.onWebcimesSelectClearAllOptions);

			// Event on keydown on webcimesSelect
			this.webcimesSelect.addEventListener("keydown", this.onWebcimesSelectKeyDown);

			// Event init webcimesDropdown on click on webcimesSelect
			this.webcimesSelect.addEventListener("click", this.onWebcimesSelectClickInitWebcimesDropdown);

			// Callback on init select (set a timeout of zero, to wait for some dom to load)
			setTimeout(() => {
				this.webcimesSelect.dispatchEvent(new CustomEvent("onInit"));
				if(typeof this.options.onInit === 'function')
				{
					this.options.onInit();
				}
			}, 0);
		}
    }

	/**
	 * Destroy current select
	 */
	public destroy()
	{
		this.webcimesSelect.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((el) => {
			el.removeEventListener("click", this.onWebcimesSelectClearOption);
		});
		this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.removeEventListener("click", this.onWebcimesSelectClearAllOptions);
		this.webcimesSelect.removeEventListener("keydown", this.onWebcimesSelectKeyDown);
		this.webcimesSelect.removeEventListener("click", this.onWebcimesSelectClickInitWebcimesDropdown);

		// Callback on destroy select
		this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroy"));
		if(typeof this.options.onDestroy === 'function')
		{
			this.options.onDestroy();
		}
	}
}