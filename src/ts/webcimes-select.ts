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
	
	/** Get the dom element of the current webcimesDropDown */
	public webcimesDropDown: HTMLElement | null = null;

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
	 * Set value (or placeholder) on webcimesSelect
	 */
	private setWebcimesSelectValue()
	{
		if(this.select)
		{
			// If an option is selected, show the value
			if(this.select.value !== "")
			{
				this.webcimesSelect.classList.remove("placeholder");
				this.webcimesSelect.querySelector(".text")!.innerHTML = this.select.value;
				this.webcimesSelect.title = this.select.value;
				this.webcimesSelect.querySelector(".clear")?.classList.add("active");
			}
			else
			{
				// If a placeholder string exist, show the value
				if(this.options.placeholder)
				{
					this.webcimesSelect.classList.add("placeholder");
					this.webcimesSelect.querySelector(".text")!.innerHTML = this.options.placeholder;
					this.webcimesSelect.title = this.options.placeholder;
					this.webcimesSelect.querySelector(".clear")?.classList.remove("active");
				}
			}
		}
	}
	
	/**
	 * Event clear selected options
	 */
	private eventClearSelectedOptionsWebcimesSelect(e: Event)
	{
		this.select!.value = "";
		this.setWebcimesSelectValue();
		this.destroyWebcimesDropDown();
	}
	
	/**
	 * Event keyboard controls
	 */
	private eventKeyboardWebCimesSelect(e: KeyboardEvent)
	{
		if(!this.webcimesDropDown)
		{
			// Create webcimesDropDown
			if(e.key == " " || e.key == "Enter" || e.key == "ArrowUp" || e.key == "ArrowDown")
			{
				e.preventDefault();
				this.initWebcimesDropDown();
			}
		}
	}
	
	/**
	 * Event create webcimesDropDown on click
	 */
	private eventOpenCloseWebcimesDropDown(e: Event)
	{
		// If webcimesDropDown is null, create webcimesDropDown
		if(!this.webcimesDropDown && !(e.target as HTMLElement).closest(".clear"))
		{
			this.initWebcimesDropDown();
		}
		// Close webcimesDropDown
		else
		{
			this.destroyWebcimesDropDown();
		}
	}

	/**
	 * Init webcimesDropDown
	 */
	private initWebcimesDropDown()
	{
		this.webcimesSelect.classList.add("open");
					
		// Append webcimesDropDown after select
		document.body.insertAdjacentHTML("beforeend", 
			`<div class="webcimesDropDown" ${(this.select!.getAttribute("dir")=="rtl"?`dir="rtl"`:``)} tabindex="-1">
				${(this.options.allowSearch?`<div class="search"><input type="text" name="search" autocomplete="off" ${(this.options.searchPlaceholder?`placeholder="${this.options.searchPlaceholder}"`:``)}></div>`:``)}
				<div class="options" style="max-height:${this.options.maxHeightOptions};" tabindex="-1"></div>
			</div>`
		);

		// Define webcimesDropDown
		this.webcimesDropDown = document.body.lastElementChild as HTMLElement;

		// Set options on webcimesDropDown
		let options = Array.from(this.select!.options).filter((el) => {
			if(el.value !== "")
			{
				return el;
			}
		});
		this.setWebcimesDropDownOptions(Array.from(options));
		
		// Set position and width of webcimesDropDown
		this.setWebcimesDropDownPositionAndWidth();

		// By default set focus on webcimesDropDown
		this.webcimesDropDown.focus();

		// If allowSearch active
		if(this.options.allowSearch)
		{
			let searchEl = (this.webcimesDropDown.querySelector("input[name='search']") as HTMLInputElement);

			// Set focus on search field
			if(this.options.searchAutoFocus)
			{
				searchEl.focus();
			}

			// Event - on search, refresh webcimesDropDown options
			searchEl.addEventListener("input", this.eventSearchWebcimesDropDown);
		}

		// Keyboard controls
		this.webcimesDropDown.addEventListener("keydown", this.eventKeyboardWebcimesDropDown);
		
		// Event - on resize refresh position and width of webcimesDropDown
		window.addEventListener("resize", this.eventResizeWebcimesDropDown);

		// Event - destroy webcimesDropDown on click or keypress outside
		['click', 'keydown'].forEach((typeEvent) => {
			document.addEventListener(typeEvent, this.eventDestroyWebcimesDropDown);
		});
		
		// Callback on show dropdown
		this.webcimesSelect.dispatchEvent(new CustomEvent("onInitDropDown"));
		if(typeof this.options.onInitDropDown === 'function')
		{
			this.options.onInitDropDown();
		}
	}

	/**
	 * Set webcimesDropDown options
	 */
	private setWebcimesDropDownOptions(options: HTMLOptionElement[])
	{
		// Remove old event on select option
		this.webcimesDropDown!.querySelectorAll(".option:not(.disabled)").forEach((el: HTMLElement) => {
			el.removeEventListener("click", this.eventSelectOptionWebcimesDropDown);
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
		this.webcimesDropDown!.querySelector(".options")!.replaceChildren(optionsEl.content);

		// Event - on select option
		this.webcimesDropDown!.querySelectorAll(".option:not(.disabled)").forEach((el: HTMLElement) => {
			el.addEventListener("click", this.eventSelectOptionWebcimesDropDown);
		});
	}

	/**
	 * Set webcimesDropDown position and width, relative to webcimesSelect
	 */
	private setWebcimesDropDownPositionAndWidth(keepDirection: boolean = false)
	{
		if(this.webcimesDropDown)
		{
			let webcimesSelectRect = this.webcimesSelect.getBoundingClientRect();

			// If the webcimesDropDown is too high for the bottom of the window, then we direct it to the top (or if keepDirection set to true and directionTop already exist)
			if(
				(keepDirection && this.webcimesSelect.classList.contains("directionTop")) || 
				(!keepDirection && webcimesSelectRect.bottom + this.webcimesDropDown.getBoundingClientRect().height > window.innerHeight)
			)
			{
				this.webcimesSelect.classList.remove("directionBottom");
				this.webcimesSelect.classList.add("directionTop");
				this.webcimesDropDown.classList.remove("directionBottom");
				this.webcimesDropDown.classList.add("directionTop");
				this.webcimesDropDown.style.top = (webcimesSelectRect.top - this.webcimesDropDown.getBoundingClientRect().height + window.scrollY)+"px";
			}
			// Else direct it to the bottom
			else
			{
				this.webcimesSelect.classList.remove("directionTop");
				this.webcimesSelect.classList.add("directionBottom");
				this.webcimesDropDown.classList.remove("directionTop");
				this.webcimesDropDown.classList.add("directionBottom");
				this.webcimesDropDown.style.top = (webcimesSelectRect.bottom + window.scrollY)+"px";
			}

			// Set webcimesDropDown left position
			this.webcimesDropDown.style.left = (webcimesSelectRect.left + window.scrollX)+"px";

			// Set webcimesDropDown width
			this.webcimesDropDown.style.width = webcimesSelectRect.width+"px";
		}
	}

	/**
	 * Destroy webcimesDropDown
	 */
	private destroyWebcimesDropDown()
	{
		if(this.webcimesDropDown)
		{
			// Destroy webcimesDropDown
			this.webcimesSelect.classList.remove("open");
			(this.webcimesDropDown.querySelector("input[name='search']") as HTMLElement).removeEventListener("input", this.eventSearchWebcimesDropDown);
			this.webcimesDropDown.removeEventListener("keydown", this.eventKeyboardWebcimesDropDown);
			window.removeEventListener("resize", this.eventResizeWebcimesDropDown);
			['click', 'keydown'].forEach((typeEvent) => {
				document.removeEventListener(typeEvent, this.eventDestroyWebcimesDropDown);
			});
			this.webcimesDropDown.querySelectorAll(".option:not(.disabled)").forEach((el: HTMLElement) => {
				el.removeEventListener("click", this.eventSelectOptionWebcimesDropDown);
			});
			this.webcimesDropDown.remove();
			this.webcimesDropDown = null;

			// Set focus to webcimesSelect after destroy webcimesDropDown (only if no other webcimesDropDown is open)
			if(!document.querySelector(".webcimesDropDown"))
			{
				this.webcimesSelect.focus();
			}

			// Callback on destroy dropdown
			this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroyDropDown"));
			if(typeof this.options.onDestroyDropDown === 'function')
			{
				this.options.onDestroyDropDown();
			}
		}
	}

	/**
	 * Event search webcimesDropDown options
	 */
	private eventSearchWebcimesDropDown(e: Event)
	{
		// Search options
		let regexSearch = new RegExp((e.target as HTMLInputElement).value, "i");
		let options = Array.from(this.select!.options).filter((el) => {
			if(el.value !== "")
			{
				if(regexSearch.test(el.innerHTML) || regexSearch.test(el.value))
				{
					return el;
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

		// Set options on webcimesDropDown
		this.setWebcimesDropDownOptions(options);
		
		// Set position and width of webcimesDropDown
		this.setWebcimesDropDownPositionAndWidth(true);

		// Callback on search dropdown
		this.webcimesSelect.dispatchEvent(new CustomEvent("onSearchDropDown"));
		if(typeof this.options.onSearchDropDown === 'function')
		{
			this.options.onSearchDropDown((e.target as HTMLInputElement).value, options);
		}
	}

	/**
	 * Event keyboard webcimesDropDown 
	 */
	private eventKeyboardWebcimesDropDown(e: KeyboardEvent)
	{
		// If KeyboardEvent not comming from webcimesSelect
		if(e.target != this.webcimesSelect)
		{
			let highlightedOption = this.webcimesDropDown!.querySelector(".option.highlighted");
			if(highlightedOption)
			{
				let optionsEl = this.webcimesDropDown!.querySelectorAll(`.option:not(.disabled)`);
				let highlightedIndex = Array.from(optionsEl).indexOf(highlightedOption);
				if(e.key == "ArrowUp" || e.key == "ArrowDown")
				{
					e.preventDefault();
					highlightedOption.classList.remove("highlighted");
					highlightedOption = optionsEl[(e.key == "ArrowUp" ? (highlightedIndex-1 >= 0 ? highlightedIndex-1 : 0) : (highlightedIndex+1 <= optionsEl.length-1 ? highlightedIndex+1 : optionsEl.length-1))];
					highlightedOption.classList.add("highlighted");
					highlightedOption.scrollIntoView({behavior: "smooth", block: "nearest"});
				}
				if(e.key == "Enter")
				{
					e.preventDefault();
					highlightedOption.classList.remove("highlighted");
					this.select!.value = highlightedOption.getAttribute("data-value") as string;
					this.setWebcimesSelectValue();
					this.destroyWebcimesDropDown();
				}
				if(e.key == "Escape")
				{
					e.preventDefault();
					this.destroyWebcimesDropDown();
				}
			}
		}
	}

	/**
	 * Event resize
	 */
	private eventResizeWebcimesDropDown(e: Event)
	{
		this.setWebcimesDropDownPositionAndWidth();
	}

	/**
	 * Event on select option
	 */
	private eventSelectOptionWebcimesDropDown(e: Event)
	{
		this.select!.value = (e.target as HTMLElement).getAttribute("data-value") as string;
		this.setWebcimesSelectValue();
		this.destroyWebcimesDropDown();
	}

	/**
	 * Event destroy webcimesDropDown on click or keypress outside
	 */
	private eventDestroyWebcimesDropDown(e: Event)
	{
		if((e.target as HTMLElement).closest(".webcimesSelect") != this.webcimesSelect && (e.target as HTMLElement).closest(".webcimesDropDown") != this.webcimesDropDown)
		{
			this.destroyWebcimesDropDown();
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
		}
		this.options = {...defaults, ...options};

		// Bind "this" to all events
		this.eventClearSelectedOptionsWebcimesSelect = this.eventClearSelectedOptionsWebcimesSelect.bind(this);
		this.eventKeyboardWebCimesSelect = this.eventKeyboardWebCimesSelect.bind(this);
		this.eventOpenCloseWebcimesDropDown = this.eventOpenCloseWebcimesDropDown.bind(this);
		this.eventSearchWebcimesDropDown = this.eventSearchWebcimesDropDown.bind(this);
		this.eventKeyboardWebcimesDropDown = this.eventKeyboardWebcimesDropDown.bind(this);
		this.eventResizeWebcimesDropDown = this.eventResizeWebcimesDropDown.bind(this);
		this.eventSelectOptionWebcimesDropDown = this.eventSelectOptionWebcimesDropDown.bind(this);
		this.eventDestroyWebcimesDropDown = this.eventDestroyWebcimesDropDown.bind(this);
		
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
				`<div class="webcimesSelect ${(this.options.setClass?this.options.setClass:``)}" ${(this.options.setId?`id="${this.options.setId}"`:``)} ${(this.select.getAttribute("dir")=="rtl"?`dir="rtl"`:``)} tabindex="0">
					<div class="text"></div>
					${(this.options.allowClear?`<div class="clear"><div class="cross"></div></div>`:'')}
					<div class="arrow"></div>
				</div>`
			);

			// Define webcimesSelect
			this.webcimesSelect = this.select.nextElementSibling as HTMLElement;

			// Set placeholder
			if(!this.options.placeholder)
			{
				if(this.select.querySelector("option[value='']"))
				{
					this.options.placeholder = this.select.querySelector("option[value='']")!.innerHTML;
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
			this.setWebcimesSelectValue();

			// Event - clear selected options
			this.webcimesSelect.querySelector(".clear")?.addEventListener("click", this.eventClearSelectedOptionsWebcimesSelect);

			// Event - keyboard controls
			this.webcimesSelect.addEventListener("keydown", this.eventKeyboardWebCimesSelect);

			// Event - create webcimesDropDown on click
			this.webcimesSelect.addEventListener("click", this.eventOpenCloseWebcimesDropDown);

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
		this.webcimesSelect.querySelector(".clear")?.removeEventListener("click", this.eventClearSelectedOptionsWebcimesSelect);
		this.webcimesSelect.removeEventListener("keydown", this.eventKeyboardWebCimesSelect);
		this.webcimesSelect.removeEventListener("click", this.eventOpenCloseWebcimesDropDown);

		// Callback on destroy select
		this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroy"));
		if(typeof this.options.onDestroy === 'function')
		{
			this.options.onDestroy();
		}
	}
}