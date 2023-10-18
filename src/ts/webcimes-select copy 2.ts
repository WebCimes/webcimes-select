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
	/** add extra css style to select, default null */
	style: string | null;
	/** set placeholder, default null */
	placeholder: string | null;
	/** allow clear selected options, default true */
	allowClear: boolean;
	/** allow search options, default true */
	allowSearch: boolean;
	/** autofocus on search field when open select, default true */
	searchAutoFocus: boolean;
	/** set placeholder on search field, default "Search" */
	searchPlaceholder: string | null;
	/** set text for no results found on search, default "No results found" */
	searchTextNoResults: string | null;
	/** callback before show select */
	beforeShow: () => void;
	/** callback after show select */
	afterShow: () => void;
	/** callback before destroy select */
	beforeDestroy: () => void;
	/** callback after destroy select */
	afterDestroy: () => void;
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
	
	/** Get the dom element of the current dropDown */
	public webcimesSelectDropDown: HTMLElement | null = null;

	/** Options of the current select */
	private options: Options;

	/**
	 * Convert elements entry to an array of HTMLElement
	 */
	private getHtmlElements = (element: string | HTMLElement | NodeList | null) => {
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
	};

	/**
	 * Convert element entry to an HTMLElement
	 */
	private getHtmlElement = (element: string | HTMLElement | null) => {
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
	};

	/**
	 * Set value (or placeholder) on webcimesSelect
	 */
	private setSelectedValue()
	{
		if(this.select)
		{
			// If an option is selected, show the value
			if(this.select.value !== "")
			{
				this.webcimesSelect.classList.remove("placeholder");
				this.webcimesSelect.querySelector(".text")!.innerHTML = this.select.value;
				this.webcimesSelect.querySelector(".clear")?.classList.add("active");
			}
			else
			{
				// If a placeholder string exist, show the value
				if(this.options.placeholder)
				{
					this.webcimesSelect.classList.add("placeholder");
					this.webcimesSelect.querySelector(".text")!.innerHTML = this.options.placeholder;
					this.webcimesSelect.querySelector(".clear")?.classList.remove("active");
				}
			}
		}
	}

	/**
	 * Set dropdown options
	 */
	private setDropDownOptions(options: HTMLElement[])
	{
		// Remove old event on select option
		this.webcimesSelectDropDown!.querySelectorAll(".option").forEach((el: HTMLElement) => {
			el.removeEventListener("click", this.eventSelectOptionDropDown);
		});

		// Set options
		let optionsHtml: string = "";
		Array.from(options).forEach((el) => {
			if(el.tagName == "OPTGROUP")
			{
				optionsHtml += `<div class="optGroup">
									<div class="label">${(el as HTMLOptGroupElement).label}</div>`;
				Array.from(el.children).forEach((el2: HTMLOptionElement) => {
					optionsHtml += `<div class="option ${el2.classList.toString()}" data-value="${el2.value}">${el2.innerHTML}</div>`+"\n";
				});
				optionsHtml += `</div>`;
			}
			// if(el.value !== "")
			// {
			// 	optionsHtml += `<div class="option ${el.classList.toString()}" data-value="${el.value}">${el.innerHTML}</div>`+"\n";
			// }
		});
		this.webcimesSelectDropDown!.querySelector(".options")!.innerHTML = optionsHtml;

		// Event - on select option
		this.webcimesSelectDropDown!.querySelectorAll(".option").forEach((el: HTMLElement) => {
			el.addEventListener("click", this.eventSelectOptionDropDown);
		});
	}

	/**
	 * Set dropdown position and width, relative to webcimesSelect
	 */
	private setDropDownPositionAndWidth(keepDirection: boolean = false)
	{
		if(this.webcimesSelectDropDown)
		{
			let webcimesSelectRect = this.webcimesSelect.getBoundingClientRect();

			// If the dropdown is too high for the bottom of the window, then we direct it to the top (or if keepDirection set to true and directionTop already exist)
			if(
				(keepDirection && this.webcimesSelect.classList.contains("directionTop")) || 
				(!keepDirection && webcimesSelectRect.bottom + this.webcimesSelectDropDown.getBoundingClientRect().height > window.innerHeight)
			)
			{
				this.webcimesSelect.classList.remove("directionBottom");
				this.webcimesSelect.classList.add("directionTop");
				this.webcimesSelectDropDown.classList.remove("directionBottom");
				this.webcimesSelectDropDown.classList.add("directionTop");
				this.webcimesSelectDropDown.style.top = (webcimesSelectRect.top - this.webcimesSelectDropDown.getBoundingClientRect().height + window.scrollY)+"px";
			}
			// Else direct it to the bottom
			else
			{
				this.webcimesSelect.classList.remove("directionTop");
				this.webcimesSelect.classList.add("directionBottom");
				this.webcimesSelectDropDown.classList.remove("directionTop");
				this.webcimesSelectDropDown.classList.add("directionBottom");
				this.webcimesSelectDropDown.style.top = (webcimesSelectRect.bottom + window.scrollY)+"px";
			}

			// Set dropdown left position
			this.webcimesSelectDropDown.style.left = (webcimesSelectRect.left + window.scrollX)+"px";

			// Set dropdown width
			this.webcimesSelectDropDown.style.width = webcimesSelectRect.width+"px";
		}
	}

	/**
	 * Destroy dropdown
	 */
	private destroyDropDown()
	{
		if(this.webcimesSelectDropDown)
		{
			this.webcimesSelect.classList.remove("open");
			(this.webcimesSelectDropDown.querySelector("input[name='search']") as HTMLElement).removeEventListener("keyup", this.eventSearchDropDown);
			window.removeEventListener("resize", this.eventResizeDropDown);
			this.webcimesSelectDropDown.querySelectorAll(".option").forEach((el: HTMLElement) => {
				el.removeEventListener("click", this.eventSelectOptionDropDown);
			});
			this.webcimesSelectDropDown.remove();
			this.webcimesSelectDropDown = null;
		}
	}

	/**
	 * Event search dropdown options
	 */
	private eventSearchDropDown: (e: Event) => void = (e) => {
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

		// Set options on webcimesSelectDropDown
		this.setDropDownOptions(options);
		
		// Set position and width of dropdown
		this.setDropDownPositionAndWidth(true);
	};

	/**
	 * Event resize
	 */
	private eventResizeDropDown: () => void = () => {
		this.setDropDownPositionAndWidth();
	};

	/**
	 * Event on select option
	 */
	private eventSelectOptionDropDown: (e: Event) => void = (e) => {
		this.select!.value = (e.target as HTMLElement).getAttribute("data-value") as string;
		this.setSelectedValue();
	};

	/**
	 * Event destroy dropdown on click outside
	 */
	private eventDestroyDropDown: (e: Event) => void = (e) => {
		if((e.target as HTMLElement).closest(".webcimesSelect") != this.webcimesSelect && !(e.target as HTMLElement).closest(".webcimesSelectDropDown input[name='search']"))
		{
			this.destroyDropDown();
		}
	};

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
			style: null,
			placeholder: null,
			allowClear: true,
			allowSearch: true,
			searchAutoFocus: true,
			searchPlaceholder: "Search",
			searchTextNoResults: "No results found",
			beforeShow: () => {},
			afterShow: () => {},
			beforeDestroy: () => {},
			afterDestroy: () => {},
		}
		this.options = {...defaults, ...options};
		
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
				`<div class="webcimesSelect `+(this.options.setClass?this.options.setClass:'')+`" `+(this.options.setId?'id="'+this.options.setId+'"':'')+`>
					<div class="text"></div>
					`+(this.options.allowClear?`<div class="clear"><div class="cross"></div></div>`:'')+`
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

			// Set webcimesSelect value (or placeholder)
			this.setSelectedValue();

			// Event - create webcimesSelectDropDown on click
			this.webcimesSelect.addEventListener("click", (e) => {
				// If webcimesSelectDropDown is null, create dropdown
				if(!this.webcimesSelectDropDown && !(e.target as HTMLElement).closest(".clear"))
				{
					this.webcimesSelect.classList.add("open");
					
					// Append webcimesSelectDropDown after select
					document.body.insertAdjacentHTML("beforeend", 
						`<div class="webcimesSelectDropDown">
							`+(this.options.allowSearch?`<div class="search"><input type="text" name="search" autocomplete="off" `+(this.options.searchPlaceholder?`placeholder="`+this.options.searchPlaceholder+`"`:``)+`></div>`:``)+`
							<div class="options"></div>
						</div>`
					);
	
					// Define webcimesSelectDropDown
					this.webcimesSelectDropDown = document.body.lastElementChild as HTMLElement;

					// Set options on webcimesSelectDropDown
					// this.setDropDownOptions(Array.from(this.select!.options));
					
					this.setDropDownOptions(Array.from(this.select!.children) as HTMLElement[]);
					
					// Set position and width of dropdown
					this.setDropDownPositionAndWidth();

					// If allowSearch active
					if(this.options.allowSearch)
					{
						// Set focus on search field
						if(this.options.searchAutoFocus)
						{
							(this.webcimesSelectDropDown.querySelector("input[name='search']") as HTMLElement).focus();
						}

						// Event - on search, refresh dropdown options
						(this.webcimesSelectDropDown.querySelector("input[name='search']") as HTMLElement).addEventListener("keyup", this.eventSearchDropDown);
					}
					
					// Event - on resize refresh position and width of dropdown
					window.addEventListener("resize", this.eventResizeDropDown);
	
					// Event - destroy webcimesSelectDropDown on click outside
					document.addEventListener("click", this.eventDestroyDropDown);
				}
				// Close dropdown
				else
				{
					this.destroyDropDown();
				}
			});

			// Event - clear selected options
			this.webcimesSelect.querySelector(".clear")?.addEventListener("click", (e) => {
				this.select!.value = "";
				this.setSelectedValue();
				this.destroyDropDown();
			});
		}


		// Create select
		// document.body.insertAdjacentHTML("beforeend", 
		// 	`<div class="webcimesSelect `+(this.options.setClass?this.options.setClass:'')+`" `+(this.options.setId?'id="'+this.options.setId+'"':'')+`>
		// 	</div>`
		// );
		// this.select = document.body.lastChild as HTMLElement;
		
		// Callback before show select (set a timeout of zero, to wait for some dom to load)
		// setTimeout(() => {
		// 	this.select.dispatchEvent(new CustomEvent("beforeShow"));
		// 	if(typeof this.options.beforeShow === 'function')
		// 	{
		// 		this.options.beforeShow();
		// 	}
		// }, 0);
	
		// // Width of select
		// if(this.options.width != "auto" && this.options.width)
		// {
		// 	this.select.style.setProperty("width", this.options.width);
		// }
	
		// // Height of select
		// if(this.options.height != "auto" && this.options.height)
		// {
		// 	this.select.style.setProperty("height", this.options.height);
		// }
	
		// // Style
		// if(this.options.style)
		// {
		// 	let oldStyle = this.select.getAttribute("style");
		// 	this.select.setAttribute("style", oldStyle+this.options.style);
		// }
    }

	/**
	 * Destroy current select
	 */
	public destroy()
	{
		// Callback before destroy select
		// this.select.dispatchEvent(new CustomEvent("beforeDestroy"));
		// if(typeof this.options.beforeDestroy === 'function')
		// {
		// 	this.options.beforeDestroy();
		// }

		// // Callback after destroy select
		// this.select.dispatchEvent(new CustomEvent("afterDestroy"));
		// if(typeof this.options.afterDestroy === 'function')
		// {
		// 	this.options.afterDestroy();
		// }
	}
}