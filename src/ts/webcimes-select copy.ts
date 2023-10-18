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
		onCancelButton: CustomEvent;
		onConfirmButton: CustomEvent;
	}
}

/**
 * Options
 */
interface Options {
	/** set a specific id on the select. default "null" */
	setId: string | null;
	/** set a specific class on the select, default "null" */
	setClass: string | null;
	/** width (specify unit), default "auto" */
	width: string;
	/** height (specify unit), default "auto" */
	height: string;
	/** html for title, default "null" */
	titleHtml: string | null;
	/** html for body, default "null" */
	bodyHtml: string | null;
	/** html for cancel button, default "null" */
	buttonCancelHtml: string | null;
	/** html for confirm button, default "null" */
	buttonConfirmHtml: string | null;
	/** close select after trigger cancel button, default "true" */
	closeOnCancelButton: boolean;
	/** close select after trigger confirm button, default "true" */
	closeOnConfirmButton: boolean;
	/** show close button, default "true" */
	showCloseButton: boolean;
	/** allow the select to close when clicked outside, default "true" */
	allowCloseOutside: boolean;
	/** ability to move select, default "true" */
	allowMovement: boolean;
	/** if allowMovement is set to "true", ability to move select from header, default "true" */
	moveFromHeader: boolean;
	/** if allowMovement is set to "true", ability to move select from body, default "false" */
	moveFromBody: boolean;
	/** if allowMovement is set to "true", ability to move select from footer, default "true" */
	moveFromFooter: boolean;
	/** keep header sticky (visible) when scrolling, default "true" */
	stickyHeader: boolean;
	/** keep footer sticky (visible) when scrolling, default "true" */
	stickyFooter: boolean;
	/** add extra css style to select, default null */
	style: string | null;
	/** "animDropDown" or "animFadeIn" for show animation, default "animDropDown" */
	animationOnShow: "animDropDown" | "animFadeIn";
	/** "animDropUp" or "animFadeOut" for destroy animation, default "animDropUp" */
	animationOnDestroy: "animDropUp" | "animFadeOut";
	/** animation duration in ms, default "500" */
	animationDuration: number;
	/** callback before show select */
	beforeShow: () => void;
	/** callback after show select */
	afterShow: () => void;
	/** callback before destroy select */
	beforeDestroy: () => void;
	/** callback after destroy select */
	afterDestroy: () => void;
	/** callback after triggering cancel button */
	onCancelButton: () => void;
	/** callback after triggering confirm button */
	onConfirmButton: () => void;
}

/**
 * Class WebcimesSelect
 */
export class WebcimesSelect
{
	/** Get the dom element containing all selects */
	public webcimesSelects: HTMLElement;

	/** Get the dom element of the current select */
	public select: HTMLElement;

	/** Options of the current select */
	private options: Options;

	private eventCancelButton: () => void = () => {
		// Callback on cancel button
		this.select.dispatchEvent(new CustomEvent("onCancelButton"));
		if(typeof this.options.onCancelButton === 'function')
		{
			this.options.onCancelButton();
		}
	};

	private eventConfirmButton: () => void = () => {
		// Callback on confirm button
		this.select.dispatchEvent(new CustomEvent("onConfirmButton"));
		if(typeof this.options.onConfirmButton === 'function')
		{
			this.options.onConfirmButton();
		}
	};

	private eventClickOutside: (e: Event) => void = (e) => {
		if(e.target == this.webcimesSelects)
		{
			if(this.options.allowCloseOutside)
			{
				// Destroy select
				this.destroy();
			}
			else
			{
				// Add animation for show select who can't be close
				this.select.classList.add("animGrowShrink");

				// Delete animation after the animation delay
				setTimeout(() => {
					this.select.classList.remove("animGrowShrink");
				}, this.options.animationDuration);
			}
		}
	};

	private eventClickCloseButton: () => void = () => {
		// Destroy select
		this.destroy();
	};

	private eventDragselectOnTop: (e: Event) => void = (e) => {
		// Only if target is not close button (for bug in chrome)
		if(!(<HTMLElement>e.target).closest(".close"))
		{
			// If multiple select, and select not already on top (no next sibling), we place the current select on the top
			if(document.querySelectorAll(".select").length > 1 && this.select.nextElementSibling !== null)
			{
				let oldScrollTop = this.select.scrollTop;
				this.webcimesSelects.insertAdjacentElement("beforeend", this.select);
				this.select.scrollTop = oldScrollTop;
			}
		}
	};

	private position: {x: number, y: number};

	private offset: {x: number, y: number};

	private isDragging: boolean = false;

	private moveFromElements: HTMLElement[] = [];

	private eventDragStart: (e: Event) => void = (e) => {
		// Start drag only if it's not a button
		if(!(<HTMLElement>e.target).closest("button"))
		{
			this.isDragging = true;

			// Mouse
			if((<MouseEvent>e).clientX)
			{
				this.offset = {
					x: this.select.offsetLeft - (<MouseEvent>e).clientX,
					y: this.select.offsetTop - (<MouseEvent>e).clientY
				};
			}
			// Touch device (use the first touch only)
			else if((<TouchEvent>e).touches)
			{
				this.offset = {
					x: this.select.offsetLeft - (<TouchEvent>e).touches[0].clientX,
					y: this.select.offsetTop - (<TouchEvent>e).touches[0].clientY
				};
			}
		}
	};

	private eventMove: (e: Event) => void = (e) => {
		if(this.isDragging)
		{
			// Mouse
			if((<MouseEvent>e).clientX)
			{
				this.position = {
					x: (<MouseEvent>e).clientX,
					y: (<MouseEvent>e).clientY
				};
			}
			// Touch device (use the first touch only)
			else if((<TouchEvent>e).touches)
			{
				this.position = {
					x: (<TouchEvent>e).touches[0].clientX,
					y: (<TouchEvent>e).touches[0].clientY
				};
			}
			this.select.style.left = (this.position.x + this.offset.x)+'px';
			this.select.style.top  = (this.position.y + this.offset.y)+'px';
		}
	};

	private eventDragStop: () => void = () => {
		this.isDragging = false;
	};
	
	private eventPreventSelectText: (e: Event) => void = (e) => {
		if(this.isDragging)
		{
			e.preventDefault();
		}
	};

	private eventResize: () => void = () => {
		this.select.style.removeProperty("left");
		this.select.style.removeProperty("top");
		
	};

	/**
	 * Create select
	 */
	constructor(options: Options)
	{
		// Defaults
		const defaults: Options = {
			setId: null,
			setClass: null,
			width: 'auto',
			height: 'auto',
			titleHtml: null,
			bodyHtml: null,
			buttonCancelHtml: null,
			buttonConfirmHtml: null,
			closeOnCancelButton: true,
			closeOnConfirmButton: true,
			showCloseButton: true,
			allowCloseOutside: true,
			allowMovement: true,
			moveFromHeader: true,
			moveFromBody: false,
			moveFromFooter: true,
			stickyHeader: true,
			stickyFooter: true,
			style: null,
			animationOnShow: 'animDropDown',
			animationOnDestroy: 'animDropUp',
			animationDuration: 500,
			beforeShow: () => {},
			afterShow: () => {},
			beforeDestroy: () => {},
			afterDestroy: () => {},
			onCancelButton: () => {},
			onConfirmButton: () => {},
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
		// Create webcimesSelects
		if(!document.querySelector(".webcimesSelects"))
		{
			// Create webcimesSelects
			document.body.insertAdjacentHTML("beforeend", '<div class="webcimesSelects animFadeIn"></div>');
			this.webcimesSelects = <HTMLElement>document.querySelector(".webcimesSelects");
			
			// Set animation duration for webcimesSelects
			this.webcimesSelects.style.setProperty("animation-duration", this.options.animationDuration+"ms");
	
			// Delete enter animation after animation delay
			setTimeout(() => {
				this.webcimesSelects.classList.remove("animFadeIn");
			}, this.options.animationDuration);
		}
		else
		{
			// Get webcimesSelects
			this.webcimesSelects = <HTMLElement>document.querySelector(".webcimesSelects");

			// Remove animFadeOut in case of create new select after destroy the last one before (during animation duration)
			this.webcimesSelects.classList.remove("animFadeOut");
		}
	
		// Create select
		this.webcimesSelects.insertAdjacentHTML("beforeend", 
			`<div class="select `+(this.options.setClass?this.options.setClass:'')+` `+this.options.animationOnShow+`" `+(this.options.setId?'id="'+this.options.setId+'"':'')+`>
				`+(this.options.titleHtml||this.options.showCloseButton?
					`<div class="selectHeader `+(this.options.stickyHeader?'sticky':'')+` `+(this.options.moveFromHeader?'movable':'')+`">
						`+(this.options.titleHtml?'<div class="title">'+this.options.titleHtml+'</div>':'')+`
						`+(this.options.showCloseButton?'<button class="close"></button>':'')+`
					</div>`
				:'')+`
				`+(this.options.bodyHtml?
					`<div class="selectBody `+(this.options.moveFromBody?'movable':'')+`">
						`+this.options.bodyHtml+`
					</div>`
				:'')+`
				`+(this.options.buttonCancelHtml||this.options.buttonConfirmHtml?
					`<div class="selectFooter `+(this.options.stickyFooter?'sticky':'')+` `+(this.options.moveFromFooter?'movable':'')+`">
						`+(this.options.buttonCancelHtml?'<button class="cancel '+(this.options.closeOnCancelButton?'close':'')+'">'+this.options.buttonCancelHtml+'</button>':'')+`
						`+(this.options.buttonConfirmHtml?'<button class="confirm '+(this.options.closeOnConfirmButton?'close':'')+'">'+this.options.buttonConfirmHtml+'</button>':'')+`
					</div>`
				:'')+`
			</div>`
		);
		this.select = <HTMLElement>this.webcimesSelects.lastElementChild;
		
		// Callback before show select (set a timeout of zero, to wait for some dom to load)
		setTimeout(() => {
			this.select.dispatchEvent(new CustomEvent("beforeShow"));
			if(typeof this.options.beforeShow === 'function')
			{
				this.options.beforeShow();
			}
		}, 0);
		
		// Set animation duration for select
		this.select.style.setProperty("animation-duration", this.options.animationDuration+"ms");
		
		// Delete animation of enter after the animation delay
		setTimeout(() => {
			this.select.classList.remove(this.options.animationOnShow);
	
			// Callback after show select
			this.select.dispatchEvent(new CustomEvent("afterShow"));
			if(typeof this.options.afterShow === 'function')
			{
				this.options.afterShow();
			}
		}, this.options.animationDuration);
	
		// Width of select
		this.select.style.setProperty("max-width", "90%");
		if(this.options.width != "auto" && this.options.width)
		{
			this.select.style.setProperty("width", this.options.width);
		}
		else
		{
			// "max-content" is for keep size in "auto" and for maximum to max-width
			this.select.style.setProperty("width", "max-content");
		}
	
		// Height of select
		this.select.style.setProperty("max-height", "90%");
		if(this.options.height != "auto" && this.options.height)
		{
			this.select.style.setProperty("height", this.options.height);
		}
		else
		{
			// "max-content" is for keep size in "auto" and for maximum to max-height
			this.select.style.setProperty("height", "max-content");
		}
	
		// Style
		if(this.options.style)
		{
			let oldStyle = this.select.getAttribute("style");
			this.select.setAttribute("style", oldStyle+this.options.style);
		}
	
		// Event on cancel button
		if(this.options.buttonCancelHtml)
		{
			this.select.querySelector(".cancel")?.addEventListener("click", this.eventCancelButton);
		}
	
		// Event on confirm button
		if(this.options.buttonConfirmHtml)
		{
			this.select.querySelector(".confirm")?.addEventListener("click", this.eventConfirmButton);
		}
		
		// Event click outside (on webcimesSelects)
		this.webcimesSelects.addEventListener("click", this.eventClickOutside);
	
		// Event close select when click on close button
		this.select.querySelectorAll(".close").forEach((el) => {
			el.addEventListener("click", this.eventClickCloseButton);
		});
	
		// Place selected select on top
		['mousedown', 'touchstart'].forEach((typeEvent) => {
			this.select.addEventListener(typeEvent, this.eventDragselectOnTop);
		});
		
		// Move select
		if(this.options.allowMovement && (this.options.moveFromHeader || this.options.moveFromBody || this.options.moveFromFooter))
		{
			if(this.options.moveFromHeader && this.select.querySelector(".selectHeader"))
			{
				this.moveFromElements.push(<HTMLElement>this.select.querySelector(".selectHeader"));
			}
			if(this.options.moveFromBody && this.select.querySelector(".selectBody"))
			{
				this.moveFromElements.push(<HTMLElement>this.select.querySelector(".selectBody"));
			}
			if(this.options.moveFromFooter && this.select.querySelector(".selectFooter"))
			{
				this.moveFromElements.push(<HTMLElement>this.select.querySelector(".selectFooter"));
			}
	
			['mousedown', 'touchstart'].forEach((typeEvent) => {
				this.moveFromElements.forEach((el) => {
					el.addEventListener(typeEvent, this.eventDragStart);
				});
			});

			['mousemove', 'touchmove'].forEach((typeEvent) => {
				document.addEventListener(typeEvent, this.eventMove);
			});

			['mouseup', 'touchend'].forEach((typeEvent) => {
				document.addEventListener(typeEvent, this.eventDragStop);
			});

			document.addEventListener("selectstart", this.eventPreventSelectText);
		}

		// When resizing window, reset select position to center
		window.addEventListener("resize", this.eventResize);
    }

	/**
	 * Destroy current select
	 */
	public destroy()
	{
		// If select is not already destroying
		if(!this.select.getAttribute("data-destroying"))
		{
			// Callback before destroy select
			this.select.dispatchEvent(new CustomEvent("beforeDestroy"));
			if(typeof this.options.beforeDestroy === 'function')
			{
				this.options.beforeDestroy();
			}

			// Close webcimesSelects (according the number of select not already destroying)
			if(document.querySelectorAll(".select:not([data-destroying])").length == 1)
			{
				this.webcimesSelects.classList.add("animFadeOut");
			}

			// Close select
			this.select.setAttribute("data-destroying", "1");
			this.select.classList.add(this.options.animationOnDestroy);

			// Destroy all events from select and remove webcimesSelects or select after animation duration
			setTimeout(() => {
				if(typeof this.select !== 'undefined')
				{
					// Destroy all events from select

					if(this.options.buttonCancelHtml)
					{
						this.select.querySelector(".cancel")?.removeEventListener("click", this.eventCancelButton);
					}

					if(this.options.buttonConfirmHtml)
					{
						this.select.querySelector(".confirm")?.removeEventListener("click", this.eventConfirmButton);
					}

					this.webcimesSelects.removeEventListener("click", this.eventClickOutside);

					this.select.querySelectorAll(".close").forEach((el) => {
						el.removeEventListener("click", this.eventClickCloseButton);
					});

					['mousedown', 'touchstart'].forEach((typeEvent) => {
						this.select.removeEventListener(typeEvent, this.eventDragselectOnTop);
					});

					if(this.options.allowMovement && (this.options.moveFromHeader || this.options.moveFromBody || this.options.moveFromFooter))
					{
						['mousedown', 'touchstart'].forEach((typeEvent) => {
							this.moveFromElements.forEach((el) => {
								el.removeEventListener(typeEvent, this.eventDragStart);
							});
						});
			
						['mousemove', 'touchmove'].forEach((typeEvent) => {
							document.removeEventListener(typeEvent, this.eventMove);
						});
			
						['mouseup', 'touchend'].forEach((typeEvent) => {
							document.removeEventListener(typeEvent, this.eventDragStop);
						});
						
						document.removeEventListener("selectstart", this.eventPreventSelectText);
					}

					window.removeEventListener("resize", this.eventResize);
					
					// Remove webcimesSelects or select according the number of select
					(document.querySelectorAll(".select").length>1?this.select:this.webcimesSelects).remove();
				}

				// Callback after destroy select
				this.select.dispatchEvent(new CustomEvent("afterDestroy"));
				if(typeof this.options.afterDestroy === 'function')
				{
					this.options.afterDestroy();
				}
			}, this.options.animationDuration);
		}
	}
}