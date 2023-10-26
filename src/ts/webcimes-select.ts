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
		onInitDropDown: CustomEvent;
		onDestroyDropDown: CustomEvent;
		onSearchDropDown: CustomEvent;
		onSetValue: CustomEvent;
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
	onSetValue(value: string): void;
}

/**
 * Class WebcimesSelect
 */
export class WebcimesSelect
{
	/** Get the dom element of the current select */
	public select: HTMLSelectElement | null;
	
	/** Get the dom element of the current wSelect */
	public wSelect: HTMLElement;
	
	/** Get the dom element of the current wDropDown */
	public wDropDown: HTMLElement | null = null;

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
	 * Init value or placeholder on wSelect, according selected option on select field
	 */
	private initWSelectValue()
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

			// Remove old option(s)
			this.wSelect.querySelector(".options")!.innerHTML = "";
			
			// If an option is selected, show the value
			if(selectedOptions.length)
			{
				this.wSelect.querySelector(".clear")?.classList.add("active");
				selectedOptions.forEach((el) => {
					let option = document.createElement("template");
					option.innerHTML = 
					`<div class="option" data-value="${el.value}">
						<div class="label" title="${el.innerHTML}">${el.innerHTML}</div>
						${this.select!.multiple?`<div class="clear"><div class="cross"></div></div>`:``}
					</div>\n`;
					this.wSelect.querySelector(".options")!.appendChild(option.content);
				});
			}
			// Else if a placeholder string exist, show the value
			else if(this.options.placeholder)
			{
				this.wSelect.querySelector(".clear")?.classList.remove("active");
				let option = document.createElement("template");
				option.innerHTML = 
				`<div class="option placeholder" data-value="">
					<div class="label" title="${this.options.placeholder}">${this.options.placeholder}</div>
				</div>\n`;
				this.wSelect.querySelector(".options")!.appendChild(option.content);
			}
		}
	}

	/**
	 * Set value on wSelect
	 */
	private setWSelectValue(value: string)
	{
		this.select!.value = value;
		this.initWSelectValue();
		this.destroyWDropDown();

		// Callback on set option
		this.wSelect.dispatchEvent(new CustomEvent("onSetValue"));
		if(typeof this.options.onSetValue === 'function')
		{
			this.options.onSetValue(value);
		}
	}
	
	/**
	 * Event clear all selected options on wSelect
	 */
	private onWSelectClearAllOptions(e: Event)
	{
		this.setWSelectValue("");
	}
	
	/**
	 * Event on keydown on wSelect
	 */
	private onWSelectKeyDown(e: KeyboardEvent)
	{
		if(!this.wDropDown)
		{
			// Create wDropDown
			if(e.key == " " || e.key == "Enter" || e.key == "ArrowUp" || e.key == "ArrowDown")
			{
				e.preventDefault();
				this.initWDropDown();
			}
		}
	}
	
	/**
	 * Event init wDropDown on click on wSelect
	 */
	private onWSelectClickInitWDropDown(e: Event)
	{
		// If wDropDown is null, create wDropDown
		if(!this.wDropDown && !(e.target as HTMLElement).closest(".clear"))
		{
			this.initWDropDown();
		}
		// Close wDropDown
		else
		{
			this.destroyWDropDown();
		}
	}

	/**
	 * Init wDropDown
	 */
	private initWDropDown()
	{
		this.wSelect.classList.add("open");
					
		// Append wDropDown after select
		document.body.insertAdjacentHTML("beforeend", 
			`<div class="wDropDown" ${(this.select!.getAttribute("dir")=="rtl"?`dir="rtl"`:``)} tabindex="-1">
				${(this.options.allowSearch?`<div class="search"><input type="text" name="search" autocomplete="off" ${(this.options.searchPlaceholder?`placeholder="${this.options.searchPlaceholder}"`:``)}></div>`:``)}
				<div class="options" style="max-height:${this.options.maxHeightOptions};" tabindex="-1"></div>
			</div>`
		);

		// Define wDropDown
		this.wDropDown = document.body.lastElementChild as HTMLElement;

		// Set options on wDropDown
		let options = Array.from(this.select!.options).filter((el) => {
			if(el.value !== "")
			{
				return el;
			}
		});
		this.setWDropDownOptions(Array.from(options));
		
		// Set position and width of wDropDown
		this.setWDropDownPosition();

		// By default set focus on wDropDown
		this.wDropDown.focus();

		// If allowSearch active
		if(this.options.allowSearch)
		{
			let searchEl = (this.wDropDown.querySelector("input[name='search']") as HTMLInputElement);

			// Set focus on search field
			if(this.options.searchAutoFocus)
			{
				searchEl.focus();
			}

			// Event search options on wDropDown
			searchEl.addEventListener("input", this.onWDropDownSearch);
		}

		// Event on keydown on wDropDown 
		this.wDropDown.addEventListener("keydown", this.onWDropDownKeyPress);

		// Event on mouseover option on wDropDown 
		this.wDropDown.querySelectorAll(".option:not(.disabled)").forEach((el) => {
			el.addEventListener("mouseover", this.onWDropDownMouseOverOption)
		});
		
		// Event on resize on WDropDown
		window.addEventListener("resize", this.onWDropDownResize);

		// Event destroy on click or keydown outside wDropDown
		['click', 'keydown'].forEach((typeEvent) => {
			document.addEventListener(typeEvent, this.onWDropDownDestroy);
		});
		
		// Callback on show dropdown
		this.wSelect.dispatchEvent(new CustomEvent("onInitDropDown"));
		if(typeof this.options.onInitDropDown === 'function')
		{
			this.options.onInitDropDown();
		}
	}

	/**
	 * Set wDropDown options
	 */
	private setWDropDownOptions(options: HTMLOptionElement[])
	{
		// Remove old event on select option on WDropDown
		this.wDropDown!.querySelectorAll(".option:not(.disabled)").forEach((el: HTMLElement) => {
			el.removeEventListener("click", this.onWDropDownSelectOption);
		});

		// Set options
		let optionsEl = document.createElement("template");
		options.forEach((el, index) => {
			let optionEl = document.createElement("template");
			optionEl.innerHTML = `<div class="option ${index==0?"highlighted":""} ${(el.disabled?`disabled`:``)} ${el.classList.toString()}" data-value="${el.value}">${el.innerHTML}</div>\n`;

			// If option has optgroup parent
			if(el.closest("optgroup"))
			{
				let label = el.closest("optgroup")!.label;

				// Create the optgroup if has not already been created
				if(!optionsEl.content.querySelector(`.optGroup[data-label='${label}']`))
				{
					let optGroupEl = document.createElement("template");
					optGroupEl.innerHTML = 
					`<div class="optGroup" data-label="${label}">
						<div class="label">${label}</div>
					</div>\n`;
					optionsEl.content.appendChild(optGroupEl.content);
				}

				// Add option to optgroup
				optionsEl.content.querySelector(`.optGroup[data-label='${label}']`)?.appendChild(optionEl.content);
			}
			else
			{
				// Add option to options
				optionsEl.content.appendChild(optionEl.content);
			}
		});
		this.wDropDown!.querySelector(".options")!.replaceChildren(optionsEl.content);

		// Event on select option on WDropDown
		this.wDropDown!.querySelectorAll(".option:not(.disabled)").forEach((el: HTMLElement) => {
			el.addEventListener("click", this.onWDropDownSelectOption);
		});
	}

	/**
	 * Set wDropDown position and width, relative to wSelect
	 */
	private setWDropDownPosition(keepDirection: boolean = false)
	{
		if(this.wDropDown)
		{
			let wSelectRect = this.wSelect.getBoundingClientRect();

			// If the wDropDown is too high for the bottom of the window, then we direct it to the top (or if keepDirection set to true and directionTop already exist)
			if(
				(keepDirection && this.wSelect.classList.contains("directionTop")) || 
				(!keepDirection && wSelectRect.bottom + this.wDropDown.getBoundingClientRect().height > window.innerHeight)
			)
			{
				this.wSelect.classList.remove("directionBottom");
				this.wSelect.classList.add("directionTop");
				this.wDropDown.classList.remove("directionBottom");
				this.wDropDown.classList.add("directionTop");
				this.wDropDown.style.top = (wSelectRect.top - this.wDropDown.getBoundingClientRect().height + window.scrollY)+"px";
			}
			// Else direct it to the bottom
			else
			{
				this.wSelect.classList.remove("directionTop");
				this.wSelect.classList.add("directionBottom");
				this.wDropDown.classList.remove("directionTop");
				this.wDropDown.classList.add("directionBottom");
				this.wDropDown.style.top = (wSelectRect.bottom + window.scrollY)+"px";
			}

			// Set wDropDown left position
			this.wDropDown.style.left = (wSelectRect.left + window.scrollX)+"px";

			// Set wDropDown width
			this.wDropDown.style.width = wSelectRect.width+"px";
		}
	}

	/**
	 * Set highlight option
	 */
	private setWDropDownHighlightOption(index: number)
	{
		let highlightedOption = this.wDropDown!.querySelector(".option.highlighted");
		let optionsEl = this.wDropDown!.querySelectorAll(`.option:not(.disabled)`);
		highlightedOption?.classList.remove("highlighted");
		highlightedOption = optionsEl[index];
		highlightedOption.classList.add("highlighted");
		highlightedOption.scrollIntoView({behavior: "smooth", block: "nearest"});
	}

	/**
	 * Destroy wDropDown
	 */
	private destroyWDropDown()
	{
		if(this.wDropDown)
		{
			// Destroy wDropDown
			this.wSelect.classList.remove("open");
			(this.wDropDown.querySelector("input[name='search']") as HTMLElement).removeEventListener("input", this.onWDropDownSearch);
			this.wDropDown.removeEventListener("keydown", this.onWDropDownKeyPress);
			window.removeEventListener("resize", this.onWDropDownResize);
			['click', 'keydown'].forEach((typeEvent) => {
				document.removeEventListener(typeEvent, this.onWDropDownDestroy);
			});
			this.wDropDown.querySelectorAll(".option:not(.disabled)").forEach((el: HTMLElement) => {
				el.removeEventListener("click", this.onWDropDownSelectOption);
			});
			this.wDropDown.remove();
			this.wDropDown = null;

			// Set focus to wSelect after destroy wDropDown (only if no other wDropDown is open)
			if(!document.querySelector(".wDropDown"))
			{
				this.wSelect.focus();
			}

			// Callback on destroy dropdown
			this.wSelect.dispatchEvent(new CustomEvent("onDestroyDropDown"));
			if(typeof this.options.onDestroyDropDown === 'function')
			{
				this.options.onDestroyDropDown();
			}
		}
	}

	/**
	 * Event search options on wDropDown
	 */
	private onWDropDownSearch(e: Event)
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
		if(options.length == 0 && this.options.searchTextNoResults)
		{
			let optionEl = document.createElement("option");
			optionEl.classList.add("noResults");
			optionEl.innerHTML = this.options.searchTextNoResults;
			options.push(optionEl);
		}

		// Set options on wDropDown
		this.setWDropDownOptions(options);
		
		// Set position and width of wDropDown
		this.setWDropDownPosition(true);

		// Callback on search dropdown
		this.wSelect.dispatchEvent(new CustomEvent("onSearchDropDown"));
		if(typeof this.options.onSearchDropDown === 'function')
		{
			this.options.onSearchDropDown((e.target as HTMLInputElement).value, options);
		}
	}

	/**
	 * Event on keydown on wDropDown 
	 */
	private onWDropDownKeyPress(e: KeyboardEvent)
	{
		// If KeyboardEvent not comming from wSelect
		if(e.target != this.wSelect)
		{
			let highlightedOption = this.wDropDown!.querySelector(".option.highlighted");
			if(highlightedOption)
			{
				if(e.key == "ArrowUp" || e.key == "ArrowDown")
				{
					e.preventDefault();
					let optionsEl = this.wDropDown!.querySelectorAll(`.option:not(.disabled)`);
					let highlightedIndex = Array.from(optionsEl).indexOf(highlightedOption);
					this.setWDropDownHighlightOption((e.key == "ArrowUp" ? (highlightedIndex-1 >= 0 ? highlightedIndex-1 : 0) : (highlightedIndex+1 <= optionsEl.length-1 ? highlightedIndex+1 : optionsEl.length-1)));
				}
				if(e.key == "Enter")
				{
					e.preventDefault();
					highlightedOption.classList.remove("highlighted");
					this.setWSelectValue(highlightedOption.getAttribute("data-value") as string);
				}
			}
			if(e.key == "Escape")
			{
				e.preventDefault();
				this.destroyWDropDown();
			}
			if(e.key == "Tab")
			{
				e.preventDefault();
				this.destroyWDropDown();
			}
		}
	}

	/**
	 * Event on mouseover option on wDropDown 
	 */
	private onWDropDownMouseOverOption(e: MouseEvent)
	{
		let optionsEl = this.wDropDown!.querySelectorAll(`.option:not(.disabled)`);
		this.setWDropDownHighlightOption(Array.from(optionsEl).indexOf(e.target as HTMLElement));
	}

	/**
	 * Event on resize on WDropDown
	 */
	private onWDropDownResize(e: Event)
	{
		this.setWDropDownPosition();
	}

	/**
	 * Event on select option on WDropDown
	 */
	private onWDropDownSelectOption(e: Event)
	{
		this.setWSelectValue((e.target as HTMLElement).getAttribute("data-value") as string);
	}

	/**
	 * Event destroy on click or keydown outside wDropDown
	 */
	private onWDropDownDestroy(e: Event)
	{
		if((e.target as HTMLElement).closest(".wSelect") != this.wSelect && (e.target as HTMLElement).closest(".wDropDown") != this.wDropDown)
		{
			this.destroyWDropDown();
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
			placeholder: null,
			allowClear: true,
			allowSearch: true,
			searchAutoFocus: true,
			searchPlaceholder: "Search",
			searchTextNoResults: "No results found",
			onInit: () => {},
			onDestroy(){},
			onInitDropDown: () => {},
			onDestroyDropDown: () => {},
			onSearchDropDown: () => {},
			onSetValue: () => {},
		}
		this.options = {...defaults, ...options};

		// Bind "this" to all events
		this.onWSelectClearAllOptions = this.onWSelectClearAllOptions.bind(this);
		this.onWSelectKeyDown = this.onWSelectKeyDown.bind(this);
		this.onWSelectClickInitWDropDown = this.onWSelectClickInitWDropDown.bind(this);
		this.onWDropDownSearch = this.onWDropDownSearch.bind(this);
		this.onWDropDownKeyPress = this.onWDropDownKeyPress.bind(this);
		this.onWDropDownMouseOverOption = this.onWDropDownMouseOverOption.bind(this);
		this.onWDropDownResize = this.onWDropDownResize.bind(this);
		this.onWDropDownSelectOption = this.onWDropDownSelectOption.bind(this);
		this.onWDropDownDestroy = this.onWDropDownDestroy.bind(this);
		
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

			// Append wSelect after select
			this.select.insertAdjacentHTML("afterend", 
				`<div class="wSelect ${(this.select.multiple?`multiple`:``)} ${(this.options.setClass?this.options.setClass:``)}" ${(this.options.setId?`id="${this.options.setId}"`:``)} ${(this.select.getAttribute("dir")=="rtl"?`dir="rtl"`:``)} tabindex="0">
					<div class="options"></div>
					${(this.options.allowClear?`<div class="clear"><div class="cross"></div></div>`:'')}
					<div class="arrow"></div>
				</div>`
			);

			// Define wSelect
			this.wSelect = this.select.nextElementSibling as HTMLElement;

			// Set placeholder
			if(!this.options.placeholder)
			{
				if(this.select.querySelector("option[value='']"))
				{
					this.options.placeholder = this.select.querySelector("option[value='']")!.innerHTML;
				}
			}

			// Width of wSelect
			if(this.options.width != "auto" && this.options.width)
			{
				this.wSelect.style.setProperty("width", this.options.width);
			}

			// Height of select
			if(this.options.height != "auto" && this.options.height)
			{
				this.wSelect.style.setProperty("height", this.options.height);
			}

			// Style
			if(this.options.style)
			{
				let oldStyle = this.wSelect.getAttribute("style");
				this.wSelect.setAttribute("style", oldStyle+this.options.style);
			}

			// Set wSelect value (or placeholder)
			this.initWSelectValue();

			// Event clear all selected options on wSelect
			this.wSelect.querySelector(".wSelect > .clear")?.addEventListener("click", this.onWSelectClearAllOptions);

			// Event on keydown on wSelect
			this.wSelect.addEventListener("keydown", this.onWSelectKeyDown);

			// Event init wDropDown on click on wSelect
			this.wSelect.addEventListener("click", this.onWSelectClickInitWDropDown);

			// Callback on init select (set a timeout of zero, to wait for some dom to load)
			setTimeout(() => {
				this.wSelect.dispatchEvent(new CustomEvent("onInit"));
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
		this.wSelect.querySelector(".wSelect > .clear")?.removeEventListener("click", this.onWSelectClearAllOptions);
		this.wSelect.removeEventListener("keydown", this.onWSelectKeyDown);
		this.wSelect.removeEventListener("click", this.onWSelectClickInitWDropDown);

		// Callback on destroy select
		this.wSelect.dispatchEvent(new CustomEvent("onDestroy"));
		if(typeof this.options.onDestroy === 'function')
		{
			this.options.onDestroy();
		}
	}
}