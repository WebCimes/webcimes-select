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
 * Class WebcimesSelect
 */
export class WebcimesSelect
{
	/** Get the dom element of the native select */
	public nativeSelect: HTMLSelectElement | null;
	
	/** Get the dom element of select */
	public select: HTMLElement;
	
	/** Get the dom element of dropdown */
	public dropdown: HTMLElement | null = null;

	/** Options of WebcimesSelect */
	private options: Options;
	
	/** Get the unique id of dropdown options */
	private idDropdownOptions: string;

    /** Set the default texts for each language */
    private defaultTexts: { [key: string]: defaultTexts } = {
		en: {
			removeOptionText: "Remove option",
			removeAllOptionsText: "Remove all options",
			searchPlaceholderText: "Search",
			searchNoResultsText: "No results found",
			optionIconSelectedText: "Selected",
		},
		fr: {
			removeOptionText: "Supprimer l'option",
			removeAllOptionsText: "Supprimer toutes les options",
			searchPlaceholderText: "Rechercher",
			searchNoResultsText: "Aucun résultat trouvé",
			optionIconSelectedText: "Sélectionné",
		},
		es: {
			removeOptionText: "Eliminar opción",
			removeAllOptionsText: "Eliminar todas las opciones",
			searchPlaceholderText: "Buscar",
			searchNoResultsText: "No se encontraron resultados",
			optionIconSelectedText: "Seleccionado",
		},
		de: {
			removeOptionText: "Option entfernen",
			removeAllOptionsText: "Alle Optionen entfernen",
			searchPlaceholderText: "Suche",
			searchNoResultsText: "Keine Ergebnisse gefunden",
			optionIconSelectedText: "Ausgewählt",
		},
		it: {
			removeOptionText: "Rimuovi opzione",
			removeAllOptionsText: "Rimuovi tutte le opzioni",
			searchPlaceholderText: "Cerca",
			searchNoResultsText: "Nessun risultato trovato",
			optionIconSelectedText: "Selezionato",
		},
		pt: {
			removeOptionText: "Remover opção",
			removeAllOptionsText: "Remover todas as opções",
			searchPlaceholderText: "Pesquisar",
			searchNoResultsText: "Nenhum resultado encontrado",
			optionIconSelectedText: "Selecionado",
		},
		nl: {
			removeOptionText: "Optie verwijderen",
			removeAllOptionsText: "Alle opties verwijderen",
			searchPlaceholderText: "Zoeken",
			searchNoResultsText: "Geen resultaten gevonden",
			optionIconSelectedText: "Geselecteerd",
		},
		ru: {
			removeOptionText: "Удалить опцию",
			removeAllOptionsText: "Удалить все опции",
			searchPlaceholderText: "Поиск",
			searchNoResultsText: "Результаты не найдены",
			optionIconSelectedText: "Выбрано",
		},
	}

	/**
	 * Create select
	 */
	constructor(options: Partial<Options>)
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
			allowClear: true,
			allowSearch: true,
			searchAutoFocus: true,
			keepOpenDropdown: false,
			language: "en",
			defaultTexts: this.defaultTexts["en"],
			placeholderText: null,
			ariaLabel: null,
			onInit: () => {},
			onDestroy: () => {},
			onInitDropdown: () => {},
			onDestroyDropdown: () => {},
			onSearchDropdown: () => {},
			onChange: () => {},
			onAddOption: () => {},
			onRemoveOption: () => {},
			onRemoveAllOptions: () => {},
		}

        // If options language is set, set defaultTexts according to the language
        if (options.language && this.defaultTexts[options.language]) {
            defaults.defaultTexts = this.defaultTexts[options.language];
        }

        // If options defaultTexts is set, merge defaults.defaultTexts with options.defaultTexts
        if (options.defaultTexts) {
            options.defaultTexts = { ...defaults.defaultTexts, ...options.defaultTexts };
        }

		// Merge defaults and options
		this.options = {...defaults, ...options};

		// Bind "this" to all events
		this.onNativeSelectClick = this.onNativeSelectClick.bind(this);
		this.onClearOption = this.onClearOption.bind(this);
		this.onClearAllOptions = this.onClearAllOptions.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onClickInitDropdown = this.onClickInitDropdown.bind(this);
		this.onDropdownSearch = this.onDropdownSearch.bind(this);
		this.onDropdownKeyDown = this.onDropdownKeyDown.bind(this);
		this.onDropdownMouseOverOption = this.onDropdownMouseOverOption.bind(this);
		this.onDropdownResize = this.onDropdownResize.bind(this);
		this.onDropdownClickOption = this.onDropdownClickOption.bind(this);
		this.onDropdownDestroy = this.onDropdownDestroy.bind(this);
		
		// Call init method
		this.init();
	}

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
	 * Get a unique ID, related to the identifier
	 * @param selectorPrefix Prefix of the selector
	 * @param identifier Identifier to find
	 * @param selectorSuffix Suffix of the selector
	 * @param element Find if the ID already exist in provided dom element
	 */
	private getUniqueID(selectorPrefix: string, identifier: string, selectorSuffix: string = "", element: HTMLElement | Document | DocumentFragment | null = null)
	{
		// If element is null, set document
		element = element ?? document;
		
		// Generate a unique ID
		do
		{
			identifier += Math.floor(Math.random()*10000);
		} while (element.querySelector(selectorPrefix + identifier + selectorSuffix));
		
		return identifier;
	}

	/**
	 * Initialization of select
	 */
    private init()
	{
		// Define native select
		this.nativeSelect = this.getHtmlElement(this.options.element) as HTMLSelectElement | null;
		if(this.nativeSelect)
		{
			// Hide native select
			this.nativeSelect.style.display = "none";

			// Set aria label
			if(!this.options.ariaLabel)
			{
				if(this.nativeSelect.getAttribute("aria-label"))
				{
					this.options.ariaLabel = this.nativeSelect.getAttribute("aria-label");
				}
				else
				{
					// Get label element relative to native select
					let label = (this.nativeSelect.closest("label") || document.querySelector(`label[for="${this.nativeSelect.id}"]`)) as HTMLElement | null;
					if(label)
					{
						this.options.ariaLabel = label.innerText.trim();
					}
				}
			}

			// Set id for dropdown options
			this.idDropdownOptions = this.getUniqueID("#", "webcimes-dropdown-options-");

			// Append select after native select
			this.nativeSelect.insertAdjacentHTML("afterend", 
				`<div class="webcimes-select ${(this.nativeSelect.multiple?`webcimes-select--multiple`:``)} ${this.nativeSelect.disabled?`webcimes-select--disabled`:``} ${(this.options.setClass?this.options.setClass:``)}" ${(this.options.setId?`id="${this.options.setId}"`:``)} ${(this.nativeSelect.getAttribute("dir")=="rtl"?`dir="rtl"`:``)} role="combobox" aria-controls="${this.idDropdownOptions}" aria-expanded="false" aria-haspopup="listbox" ${this.options.ariaLabel?`aria-label="${this.options.ariaLabel}"`:``} tabindex="0">
					<div class="webcimes-select__options"></div>
					${(this.options.allowClear?`<button type="button" class="webcimes-select__clear" title="${this.options.defaultTexts.removeAllOptionsText}" aria-label="${this.options.defaultTexts.removeAllOptionsText}"><div class="webcimes-select__cross"></div></button>`:'')}
					<div class="webcimes-select__arrow"></div>
				</div>`
			);

			// Define select
			this.select = this.nativeSelect.nextElementSibling as HTMLElement;

			// Set placeholder
			if(!this.options.placeholderText)
			{
				if(this.nativeSelect.querySelector("option[value='']"))
				{
					this.options.placeholderText = this.nativeSelect.querySelector("option[value='']")!.textContent;
				}
			}

			// Width of select
			if(this.options.width != "auto" && this.options.width)
			{
				this.select.style.setProperty("width", this.options.width);
			}

			// Height of select
			if(this.options.height != "auto" && this.options.height)
			{
				this.select.style.setProperty("height", this.options.height);
			}

			// Style
			if(this.options.style)
			{
				let oldStyle = this.select.getAttribute("style")??"";
				this.select.setAttribute("style", oldStyle+this.options.style);
			}

			// Set select value (or placeholder)
			this.initOptions();

			// Event init dropdown after click on label (who is relative to native select)
			this.nativeSelect.addEventListener("click", this.onNativeSelectClick);

			// Event clear all selected options on select
			this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.addEventListener("click", this.onClearAllOptions);

			// Event on keydown on select
			this.select.addEventListener("keydown", this.onKeyDown);

			// Event init dropdown on click on select
			this.select.addEventListener("click", this.onClickInitDropdown);

			// Callback on init select (set a timeout of zero, to wait for some dom to load)
			setTimeout(() => {
				this.select.dispatchEvent(new CustomEvent("onInit"));
				if(typeof this.options.onInit === 'function')
				{
					this.options.onInit();
				}
			}, 0);
		}
    }

	/**
	 * Destroy select and revert to native select
	 */
	public destroy()
	{
		// Destroy dropdown if exist
		this.destroyDropdown();

		// Remove events
		this.nativeSelect!.removeEventListener("click", this.onNativeSelectClick);
		this.select.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((el) => {
			el.removeEventListener("click", this.onClearOption);
		});
		this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.removeEventListener("click", this.onClearAllOptions);
		this.select.removeEventListener("keydown", this.onKeyDown);
		this.select.removeEventListener("click", this.onClickInitDropdown);

		// Show native select
		this.nativeSelect!.style.removeProperty("display");

		// Remove select
		this.select.remove();

		// Callback on destroy select
		this.select.dispatchEvent(new CustomEvent("onDestroy"));
		if(typeof this.options.onDestroy === 'function')
		{
			this.options.onDestroy();
		}
	}

	/**
	 * Set select disabled or not
	 */
	public disable(disable: boolean = true)
	{
		if(this.nativeSelect)
		{
			if(disable)
			{
				this.nativeSelect.setAttribute("disabled", "");
				this.nativeSelect.disabled = true;
				this.select.classList.add("webcimes-select--disabled");
			}
			else
			{
				this.nativeSelect.removeAttribute("disabled");
				this.nativeSelect.disabled = false;
				this.select.classList.remove("webcimes-select--disabled");
			}
		}
	}

	/**
	 * Get selected options with no empty value
	 */
	public getSelectedOptions(): HTMLOptionElement[] {

		return Array.from(this.nativeSelect?.selectedOptions || []).filter((el) => {
			return el.value !== "";
		});
	}

	/**
	 * Init options or placeholder on select, according selected option on native select field
	 */
	public initOptions()
	{
		if(this.nativeSelect)
		{
			// Get selected options with no empty value
			let selectedOptions = this.getSelectedOptions();

			// Remove old event clear selected option on select
			this.select.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((el) => {
				el.removeEventListener("click", this.onClearOption);
			});

			// Remove old option(s)
			this.select.querySelector(".webcimes-select__options")!.innerHTML = "";
			
			// If an option is selected, show the value
			if(selectedOptions.length)
			{
				this.select.classList.add("webcimes-select--selected");
				this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.add("webcimes-select__clear--active");
				selectedOptions.forEach((el) => {
					let option = document.createElement("template");
					option.innerHTML = 
					`<div class="webcimes-select__option" data-value="${el.value}">
						<div class="webcimes-select__option-label" title="${el.textContent}" aria-label="${el.textContent}">${el.textContent}</div>
						${this.nativeSelect!.multiple && !el.disabled?`<button type="button" class="webcimes-select__clear" title="${this.options.defaultTexts.removeOptionText} ${el.textContent}" aria-label="${this.options.defaultTexts.removeOptionText} ${el.textContent}"><div class="webcimes-select__cross"></div></button>`:``}
					</div>\n`;
					this.select.querySelector(".webcimes-select__options")!.appendChild(option.content);
				});
			}
			// Else if a placeholder string exist, show the value
			else if(this.options.placeholderText)
			{
				this.select.classList.remove("webcimes-select--selected");
				this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");
				let option = document.createElement("template");
				option.innerHTML = 
				`<div class="webcimes-select__option webcimes-select__option--placeholder" data-value="">
					<div class="webcimes-select__option-label" title="${this.options.placeholderText}" aria-label="${this.options.placeholderText}">${this.options.placeholderText}</div>
				</div>\n`;
				this.select.querySelector(".webcimes-select__options")!.appendChild(option.content);
			}
			// Else if no option selected and no placeholder
			else
			{
				this.select.classList.remove("webcimes-select--selected");
				this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");
			}

			// Event clear selected option on select
			this.select.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((el) => {
				el.addEventListener("click", this.onClearOption);
			});
		}
	}

	/**
	 * Add option on select
	 */
	public addOption(value: string | null)
	{
		if(value)
		{
			// If native select single, remove all options selected
			if(!this.nativeSelect!.multiple)
			{
				// Remove option selected on native select
				this.nativeSelect!.querySelectorAll(`option:not([disabled])`).forEach((el: HTMLOptionElement) => {
					el.removeAttribute("selected");
					el.selected = false;
				});
			}

			// Set option selected on native select
			let optionEl = this.nativeSelect!.querySelector(`option[value="${value}"]`) as HTMLOptionElement | null;
			if(optionEl)
			{
				optionEl.setAttribute("selected", "");
				optionEl.selected = true;
			}

			// Trigger change event on native select
			this.nativeSelect!.dispatchEvent(new Event("change", {bubbles: true}));
			this.nativeSelect!.dispatchEvent(new Event("input", {bubbles: true}));

			// Init option on select
			this.initOptions();

			// If keepOpenDropdown option true
			if(this.options.keepOpenDropdown)
			{
				// Add selected class on dropdown option
				this.dropdown?.querySelector(`.webcimes-dropdown__option[data-value="${value}"]`)?.classList.add("webcimes-dropdown__option--selected");

				// Set aria-selected on dropdown option to true
				this.dropdown?.querySelector(`.webcimes-dropdown__option[data-value="${value}"]`)?.setAttribute("aria-selected", "true");

				// Set position and width of dropdown
				this.setDropdownPosition(true);
			}
			else
			{
				// Destroy dropdown
				this.destroyDropdown();
			}
	
			// Callback on change
			this.select.dispatchEvent(new CustomEvent("onChange", {
				"detail": {
					"value": value,
					"selected": true,
					"selectedOptions": this.getSelectedOptions(),
				}
			}));
			if(typeof this.options.onChange === 'function')
			{
				this.options.onChange(value, true, this.getSelectedOptions());
			}

			// Callback on add option
			this.select.dispatchEvent(new CustomEvent("onAddOption", {
				"detail": {
					"value": value,
				}
			}));
			if(typeof this.options.onAddOption === 'function')
			{
				this.options.onAddOption(value);
			}
		}
	}

	/**
	 * Remove option on select
	 */
	public removeOption(value: string | null)
	{
		if(value && !this.nativeSelect?.disabled)
		{
			// Remove option selected on native select
			let optionEl = this.nativeSelect!.querySelector(`option[value="${value}"]:not([disabled])`) as HTMLOptionElement | null;
			if(optionEl)
			{
				optionEl.removeAttribute("selected");
				optionEl.selected = false;
			}

			// If native select single and allowClear option
			if(!this.nativeSelect!.multiple && this.options.allowClear)
			{
				// Set and force native select value to empty string (or placeholder option if define)
				this.nativeSelect!.value = "";
			}
			
			// Trigger change event on native select
			this.nativeSelect!.dispatchEvent(new Event("change", {bubbles: true}));
			this.nativeSelect!.dispatchEvent(new Event("input", {bubbles: true}));

			// Init option on select
			this.initOptions();

			// If keepOpenDropdown option true
			if(this.options.keepOpenDropdown)
			{
				// Remove selected class on dropdown option
				this.dropdown?.querySelector(`.webcimes-dropdown__option[data-value="${value}"]`)?.classList.remove("webcimes-dropdown__option--selected");

				// Set aria-selected on dropdown option to false
				this.dropdown?.querySelector(`.webcimes-dropdown__option[data-value="${value}"]`)?.setAttribute("aria-selected", "false");
				
				// Set position and width of dropdown
				this.setDropdownPosition(true);
			}
			else
			{
				// Destroy dropdown
				this.destroyDropdown();
			}

			// Callback on change
			this.select.dispatchEvent(new CustomEvent("onChange", {
				"detail": {
					"value": value,
					"selected": false,
					"selectedOptions": this.getSelectedOptions(),
				}
			}));
			if(typeof this.options.onChange === 'function')
			{
				this.options.onChange(value, false, this.getSelectedOptions());
			}
	
			// Callback on remove option
			this.select.dispatchEvent(new CustomEvent("onRemoveOption", {
				"detail": {
					"value": value,
				}
			}));
			if(typeof this.options.onRemoveOption === 'function')
			{
				this.options.onRemoveOption(value);
			}
		}
	}

	/**
	 * Remove all options on select
	 */
	public removeAllOptions()
	{
		if(!this.nativeSelect?.disabled)
		{
			// Remove option selected on native select
			this.nativeSelect!.querySelectorAll(`option:not([disabled])`).forEach((el: HTMLOptionElement) => {
				el.removeAttribute("selected");
				el.selected = false;
			});

			// If native select single and allowClear option
			if(!this.nativeSelect!.multiple && this.options.allowClear)
			{
				// Set and force native select value to empty string (or placeholder option if define)
				this.nativeSelect!.value = "";
			}

			// Trigger change event on native select
			this.nativeSelect!.dispatchEvent(new Event("change", {bubbles: true}));
			this.nativeSelect!.dispatchEvent(new Event("input", {bubbles: true}));
			
			// Init option on select
			this.initOptions();

			// If keepOpenDropdown option true
			if(this.options.keepOpenDropdown)
			{
				// Remove selected class on dropdown option and set aria-selected to false
				this.dropdown?.querySelectorAll(`.webcimes-dropdown__option`).forEach((el) => {
					el.classList.remove("webcimes-dropdown__option--selected");
					el.setAttribute("aria-selected", "false");
				});
				
				// Set position and width of dropdown
				this.setDropdownPosition(true);
			}
			else
			{
				// Destroy dropdown
				this.destroyDropdown();
			}

			// Callback on change
			this.select.dispatchEvent(new CustomEvent("onChange", {
				"detail": {
					"value": "",
					"selected": false,
					"selectedOptions": this.getSelectedOptions(),
				}
			}));
			if(typeof this.options.onChange === 'function')
			{
				this.options.onChange("", false, this.getSelectedOptions());
			}
		
			// Callback on remove all option
			this.select.dispatchEvent(new CustomEvent("onRemoveAllOptions"));
			if(typeof this.options.onRemoveAllOptions === 'function')
			{
				this.options.onRemoveAllOptions();
			}
		}
	}
	
	/**
	 * Event init dropdown on click on native select
	 */
	private onNativeSelectClick(e: Event)
	{
		// If dropdown is null, create dropdown
		if(!this.dropdown)
		{
			this.initDropdown();
		}
	}
	
	/**
	 * Event clear selected option on select
	 */
	private onClearOption(e: Event)
	{
		this.removeOption((e.target as HTMLElement).closest(".webcimes-select__option")!.getAttribute("data-value"));
	}
	
	/**
	 * Event clear all selected options on select
	 */
	private onClearAllOptions(e: Event)
	{
		this.removeAllOptions();
	}
	
	/**
	 * Event on keydown on select
	 */
	private onKeyDown(e: KeyboardEvent)
	{
		if((e.target as HTMLElement).closest(".webcimes-select > .webcimes-select__clear"))
		{
			if(e.key == "Enter")
			{
				e.preventDefault();
				this.removeAllOptions();
			}
		}
		else if((e.target as HTMLElement).closest(".webcimes-select__option .webcimes-select__clear"))
		{
			if(e.key == "Enter")
			{
				e.preventDefault();
				this.removeOption((e.target as HTMLElement).closest(".webcimes-select__option")!.getAttribute("data-value"));
			}
		}
		else
		{
			if(!this.dropdown)
			{
				// Create dropdown
				if(e.key == " " || e.key == "Enter" || e.key == "ArrowUp" || e.key == "ArrowDown")
				{
					e.preventDefault();
					this.initDropdown();
				}
			}
		}
	}
	
	/**
	 * Event init dropdown on click on select
	 */
	private onClickInitDropdown(e: Event)
	{
		// If dropdown is null, create dropdown
		if(!this.dropdown && !(e.target as HTMLElement).closest(".webcimes-select__clear"))
		{
			this.initDropdown();
		}
		// Close dropdown
		else
		{
			this.destroyDropdown();
		}
	}

	/**
	 * Init dropdown
	 */
	private initDropdown()
	{
		if(!this.nativeSelect?.disabled)
		{
			this.select.classList.add("webcimes-select--open");
			this.select.setAttribute("aria-expanded", "true");
						
			// Append dropdown before the end of body
			document.body.insertAdjacentHTML("beforeend", 
				`<div class="webcimes-dropdown" ${(this.nativeSelect!.getAttribute("dir")=="rtl"?`dir="rtl"`:``)}>
					${(this.options.allowSearch?`<input class="webcimes-dropdown__search-input" type="text" name="search" autocomplete="off" ${(this.options.defaultTexts.searchPlaceholderText?`placeholder="${this.options.defaultTexts.searchPlaceholderText}" title="${this.options.defaultTexts.searchPlaceholderText}" aria-label="${this.options.defaultTexts.searchPlaceholderText}"`:``)} role="combobox" aria-controls="${this.idDropdownOptions}" aria-expanded="true" aria-haspopup="listbox" aria-autocomplete="list">`:``)}
					<div class="webcimes-dropdown__options" id="${this.idDropdownOptions}" style="max-height:${this.options.maxHeightOptions};" role="listbox" ${this.nativeSelect?.multiple?`aria-multiselectable="true"`:``} tabindex="-1"></div>
				</div>`
			);

			// Define dropdown
			this.dropdown = document.body.lastElementChild as HTMLElement;

			// Set options on dropdown
			let options = Array.from(this.nativeSelect!.options).filter((el) => {
				if(el.value !== "")
				{
					return el;
				}
			});
			this.setDropdownOptions(Array.from(options));
			
			// Set position and width of dropdown
			this.setDropdownPosition();

			// Set highlight option on first option
			this.setDropdownHighlightOption(0, true);
			
			// By default, set focus on select
			this.select.focus();

			// If allowSearch active
			if(this.options.allowSearch)
			{
				let searchEl = (this.dropdown.querySelector(".webcimes-dropdown__search-input") as HTMLInputElement);

				// Set focus on search field
				if(this.options.searchAutoFocus)
				{
					searchEl.focus();
				}

				// Event search options on dropdown
				searchEl.addEventListener("input", this.onDropdownSearch);
				
				// Event on dropdown keydown on search field
				searchEl.addEventListener("keydown", this.onDropdownKeyDown);
			}

			// Event on dropdown keydown on select
			this.select.addEventListener("keydown", this.onDropdownKeyDown);

			// Event on resize on Dropdown
			window.addEventListener("resize", this.onDropdownResize);

			// Event destroy on click or keydown outside dropdown
			['click', 'keydown'].forEach((typeEvent) => {
				document.addEventListener(typeEvent, this.onDropdownDestroy);
			});
			
			// Callback on init dropdown
			this.select.dispatchEvent(new CustomEvent("onInitDropdown"));
			if(typeof this.options.onInitDropdown === 'function')
			{
				this.options.onInitDropdown();
			}
		}
	}

	/**
	 * Destroy dropdown
	 */
	private destroyDropdown()
	{
		if(this.dropdown)
		{
			// Destroy dropdown
			this.select.classList.remove("webcimes-select--open");
			this.select.setAttribute("aria-expanded", "false");
			(this.dropdown.querySelector(".webcimes-dropdown__search-input") as HTMLElement)?.removeEventListener("input", this.onDropdownSearch);
			(this.dropdown.querySelector(".webcimes-dropdown__search-input") as HTMLElement)?.removeEventListener("keydown", this.onDropdownKeyDown);
			this.select.removeEventListener("keydown", this.onDropdownKeyDown);
			window.removeEventListener("resize", this.onDropdownResize);
			['click', 'keydown'].forEach((typeEvent) => {
				document.removeEventListener(typeEvent, this.onDropdownDestroy);
			});
			this.dropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((el: HTMLElement) => {
				el.removeEventListener("click", this.onDropdownClickOption);
				el.removeEventListener("mouseover", this.onDropdownMouseOverOption)
			});
			this.dropdown.remove();
			this.dropdown = null;

			// Set focus to select after destroy dropdown (only if no other dropdown is open)
			if(!document.querySelector(".webcimes-dropdown"))
			{
				this.select.focus();
			}

			// Remove class direction on select after destroy dropdown
			this.select.classList.remove("webcimes-select--direction-bottom");
			this.select.classList.remove("webcimes-select--direction-top");

			// Callback on destroy dropdown
			this.select.dispatchEvent(new CustomEvent("onDestroyDropdown"));
			if(typeof this.options.onDestroyDropdown === 'function')
			{
				this.options.onDestroyDropdown();
			}
		}
	}

	/**
	 * Set dropdown options
	 */
	private setDropdownOptions(options: HTMLOptionElement[])
	{
		// Remove old events on Dropdown option
		this.dropdown!.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((el: HTMLElement) => {
			el.removeEventListener("click", this.onDropdownClickOption);
			el.removeEventListener("mouseover", this.onDropdownMouseOverOption)
		});

		// Set options
		let optionsEl = document.createElement("template");
		options.forEach((el, index) => {
			let optionEl = document.createElement("template");
			optionEl.innerHTML = `<div class="webcimes-dropdown__option ${(el.selected?`webcimes-dropdown__option--selected`:``)} ${(el.disabled?`webcimes-dropdown__option--disabled`:``)} ${el.classList.toString()}" id="${this.getUniqueID("#", "webcimes-dropdown-option-", "", optionsEl.content)}" data-value="${el.value}" title="${el.textContent}" role="option" aria-label="${el.textContent}" aria-selected="${(el.selected?`true`:`false`)}">
				${el.textContent}
				<svg class="webcimes-dropdown__icon-selected" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor" role="img" aria-labelledby="iconSelectedTitle"><title id="iconSelectedTitle">${this.options.defaultTexts.optionIconSelectedText}</title><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 16.292969 8.2929688 L 10 14.585938 L 7.7070312 12.292969 L 6.2929688 13.707031 L 10 17.414062 L 17.707031 9.7070312 L 16.292969 8.2929688 z"/></svg>
			</div>\n`;

			// If option has optgroup parent
			if(el.closest("optgroup"))
			{
				let label = el.closest("optgroup")!.label;

				// Create the optgroup if has not already been created
				if(!optionsEl.content.querySelector(`.webcimes-dropdown__opt-group[data-label='${label}']`))
				{
					let optGroupEl = document.createElement("template");
					optGroupEl.innerHTML = 
					`<div class="webcimes-dropdown__opt-group" data-label="${label}" title="${label}" role="group" aria-label="${label}">
						<div class="webcimes-dropdown__opt-group-label" role="presentation">${label}</div>
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
		this.dropdown!.querySelector(".webcimes-dropdown__options")!.replaceChildren(optionsEl.content);

		// Events on Dropdown option
		this.dropdown!.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((el: HTMLElement) => {
			el.addEventListener("click", this.onDropdownClickOption);
			el.addEventListener("mouseover", this.onDropdownMouseOverOption)
		});
	}

	/**
	 * Set dropdown position and width, relative to select
	 */
	private setDropdownPosition(keepDirection: boolean = false)
	{
		if(this.dropdown)
		{
			let selectRect = this.select.getBoundingClientRect();

			// If the dropdown is too high for the bottom of the window, then we direct it to the top (or if keepDirection set to true and webcimes-select--direction-top already exist)
			if(
				(keepDirection && this.select.classList.contains("webcimes-select--direction-top")) || 
				(!keepDirection && selectRect.bottom + this.dropdown.getBoundingClientRect().height > window.innerHeight)
			)
			{
				this.select.classList.remove("webcimes-select--direction-bottom");
				this.select.classList.add("webcimes-select--direction-top");
				this.dropdown.classList.remove("webcimes-dropdown--direction-bottom");
				this.dropdown.classList.add("webcimes-dropdown--direction-top");
				this.dropdown.style.top = (selectRect.top - this.dropdown.getBoundingClientRect().height + window.scrollY)+"px";
			}
			// Else direct it to the bottom
			else
			{
				this.select.classList.remove("webcimes-select--direction-top");
				this.select.classList.add("webcimes-select--direction-bottom");
				this.dropdown.classList.remove("webcimes-dropdown--direction-top");
				this.dropdown.classList.add("webcimes-dropdown--direction-bottom");
				this.dropdown.style.top = (selectRect.bottom + window.scrollY)+"px";
			}

			// Set dropdown left position
			this.dropdown.style.left = (selectRect.left + window.scrollX)+"px";

			// Set dropdown width
			this.dropdown.style.width = selectRect.width+"px";
		}
	}

	/**
	 * Set highlight option
	 */
	private setDropdownHighlightOption(index: number, autoScroll: boolean)
	{
		let highlightedOption = this.dropdown!.querySelector(".webcimes-dropdown__option--highlighted");
		let optionsEl = this.dropdown!.querySelectorAll(`.webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)`);

		// Remove highlighted class on old option
		highlightedOption?.classList.remove("webcimes-dropdown__option--highlighted");

		// Set highlighted class on new option
		if(optionsEl[index])
		{
			highlightedOption = optionsEl[index];
			highlightedOption.classList.add("webcimes-dropdown__option--highlighted");
			this.select!.setAttribute("aria-activedescendant", highlightedOption.id);
			this.dropdown!.querySelector(".webcimes-dropdown__search-input")?.setAttribute("aria-activedescendant", highlightedOption.id);
			if(autoScroll)
			{
				highlightedOption.scrollIntoView({behavior: "smooth", block: "nearest"});
			}
		}
	}

	/**
	 * Event search options on dropdown
	 */
	private onDropdownSearch(e: Event)
	{
		// Search options
		let regexSearch = new RegExp((e.target as HTMLInputElement).value, "i");
		let options = Array.from(this.nativeSelect!.options).filter((el) => {
			if(el.value !== "")
			{
				if((el.textContent && regexSearch.test(el.textContent)) || regexSearch.test(el.value))
				{
					return true;
				}
			}
		});

		// If no option match the search, add a no result option if searchNoResultsText exist
		if(options.length == 0 && this.options.defaultTexts.searchNoResultsText)
		{
			let optionEl = document.createElement("option");
			optionEl.classList.add("webcimes-dropdown__option--no-results");
			optionEl.textContent = this.options.defaultTexts.searchNoResultsText;
			options.push(optionEl);
		}

		// Set options on dropdown
		this.setDropdownOptions(options);
		
		// Set position and width of dropdown
		this.setDropdownPosition(true);
		
		// Set highlight option on first option
		this.setDropdownHighlightOption(0, true);

		// Callback on search dropdown
		this.select.dispatchEvent(new CustomEvent("onSearchDropdown", {
			"detail": {
				"value": (e.target as HTMLInputElement).value,
				"options": options,
			}
		}));
		if(typeof this.options.onSearchDropdown === 'function')
		{
			this.options.onSearchDropdown((e.target as HTMLInputElement).value, options);
		}
	}

	/**
	 * Event on keydown on dropdown 
	 */
	private onDropdownKeyDown(e: KeyboardEvent)
	{
		let highlightedOption = this.dropdown!.querySelector(".webcimes-dropdown__option--highlighted");
		if(highlightedOption)
		{
			if(e.key == "ArrowUp" || e.key == "ArrowDown")
			{
				e.preventDefault();
				let optionsEl = this.dropdown!.querySelectorAll(`.webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)`);
				let highlightedIndex = Array.from(optionsEl).indexOf(highlightedOption);
				this.setDropdownHighlightOption((e.key == "ArrowUp" ? (highlightedIndex-1 >= 0 ? highlightedIndex-1 : 0) : (highlightedIndex+1 <= optionsEl.length-1 ? highlightedIndex+1 : optionsEl.length-1)), true);
			}
			if(e.key == "Enter")
			{
				e.preventDefault();
				if(highlightedOption.classList.contains("webcimes-dropdown__option--selected"))
				{
					this.removeOption(highlightedOption.getAttribute("data-value"));
				}
				else
				{
					this.addOption(highlightedOption.getAttribute("data-value"));
				}
			}
		}
		if(e.key == "Escape")
		{
			e.preventDefault();
			this.destroyDropdown();
		}
		if(e.key == "Tab")
		{
			e.preventDefault();
			this.destroyDropdown();
		}
	}

	/**
	 * Event on mouseover option on dropdown 
	 */
	private onDropdownMouseOverOption(e: MouseEvent)
	{
		let optionEl = (e.target as HTMLElement).closest(".webcimes-dropdown__option");
		if(optionEl)
		{
			let optionsEl = this.dropdown!.querySelectorAll(`.webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)`);
			this.setDropdownHighlightOption(Array.from(optionsEl).indexOf(optionEl), false);
		}
	}

	/**
	 * Event on resize on Dropdown
	 */
	private onDropdownResize(e: Event)
	{
		this.setDropdownPosition();
	}

	/**
	 * Event on select option on Dropdown
	 */
	private onDropdownClickOption(e: Event)
	{
		let optionEl = (e.target as HTMLElement).closest(".webcimes-dropdown__option");
		if(optionEl)
		{
			if(optionEl.classList.contains("webcimes-dropdown__option--selected"))
			{
				this.removeOption(optionEl.getAttribute("data-value"));
			}
			else
			{
				this.addOption(optionEl.getAttribute("data-value"));
			}
		}
	}

	/**
	 * Event destroy on click or keydown outside dropdown
	 */
	private onDropdownDestroy(e: Event)
	{
		if(
			(e.target as HTMLElement).closest("select") != this.nativeSelect &&
			(e.target as HTMLElement).closest(".webcimes-select") != this.select &&
			(e.target as HTMLElement).closest(".webcimes-dropdown") != this.dropdown
		)
		{
			this.destroyDropdown();
		}
	}
}