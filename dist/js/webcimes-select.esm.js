var e={d:(t,o)=>{for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{D:()=>o});class o{nativeSelect;select;dropdown=null;options;constructor(e){this.options={element:null,setId:null,setClass:null,width:"auto",height:"auto",maxHeightOptions:"200px",style:null,placeholderText:null,allowClear:!0,allowSearch:!0,searchAutoFocus:!0,searchPlaceholderText:"Search",searchNoResultsText:"No results found",keepOpenDropdown:!1,onInit:()=>{},onDestroy:()=>{},onInitDropdown:()=>{},onDestroyDropdown:()=>{},onSearchDropdown:()=>{},onAddOption:()=>{},onRemoveOption:()=>{},onRemoveAllOptions:()=>{},...e},this.onClearOption=this.onClearOption.bind(this),this.onClearAllOptions=this.onClearAllOptions.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.onClickInitDropdown=this.onClickInitDropdown.bind(this),this.onDropdownSearch=this.onDropdownSearch.bind(this),this.onDropdownKeyDown=this.onDropdownKeyDown.bind(this),this.onDropdownMouseOverOption=this.onDropdownMouseOverOption.bind(this),this.onDropdownResize=this.onDropdownResize.bind(this),this.onDropdownClickOption=this.onDropdownClickOption.bind(this),this.onDropdownDestroy=this.onDropdownDestroy.bind(this),this.init()}getHtmlElements(e){let t=[];return e instanceof NodeList&&(t=[...Array.from(e)]),e instanceof HTMLElement&&(t=[e]),"string"==typeof e&&(t=[...Array.from(document.querySelectorAll(e))]),t}getHtmlElement(e){let t=null;return e instanceof HTMLElement&&(t=e),"string"==typeof e&&(t=document.querySelector(e)),t}init(){if(this.nativeSelect=this.getHtmlElement(this.options.element),this.nativeSelect){if(this.nativeSelect.style.display="none",this.nativeSelect.insertAdjacentHTML("afterend",`<div class="webcimes-select ${this.nativeSelect.multiple?"webcimes-select--multiple":""} ${this.nativeSelect.disabled?"webcimes-select--disabled":""} ${this.options.setClass?this.options.setClass:""}" ${this.options.setId?`id="${this.options.setId}"`:""} ${"rtl"==this.nativeSelect.getAttribute("dir")?'dir="rtl"':""} tabindex="0">\n\t\t\t\t\t<div class="webcimes-select__options"></div>\n\t\t\t\t\t${this.options.allowClear?'<button type="button" class="webcimes-select__clear"><div class="webcimes-select__cross"></div></button>':""}\n\t\t\t\t\t<div class="webcimes-select__arrow"></div>\n\t\t\t\t</div>`),this.select=this.nativeSelect.nextElementSibling,this.options.placeholderText||this.nativeSelect.querySelector("option[value='']")&&(this.options.placeholderText=this.nativeSelect.querySelector("option[value='']").innerHTML),"auto"!=this.options.width&&this.options.width&&this.select.style.setProperty("width",this.options.width),"auto"!=this.options.height&&this.options.height&&this.select.style.setProperty("height",this.options.height),this.options.style){let e=this.select.getAttribute("style")??"";this.select.setAttribute("style",e+this.options.style)}this.initOptions(),this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.addEventListener("click",this.onClearAllOptions),this.select.addEventListener("keydown",this.onKeyDown),this.select.addEventListener("click",this.onClickInitDropdown),setTimeout((()=>{this.select.dispatchEvent(new CustomEvent("onInit")),"function"==typeof this.options.onInit&&this.options.onInit()}),0)}}destroy(){this.destroyDropdown(),this.select.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((e=>{e.removeEventListener("click",this.onClearOption)})),this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.removeEventListener("click",this.onClearAllOptions),this.select.removeEventListener("keydown",this.onKeyDown),this.select.removeEventListener("click",this.onClickInitDropdown),this.nativeSelect.style.removeProperty("display"),this.select.remove(),this.select.dispatchEvent(new CustomEvent("onDestroy")),"function"==typeof this.options.onDestroy&&this.options.onDestroy()}disable(e=!0){this.nativeSelect&&(e?(this.nativeSelect.setAttribute("disabled",""),this.nativeSelect.disabled=!0,this.select.classList.add("webcimes-select--disabled")):(this.nativeSelect.removeAttribute("disabled"),this.nativeSelect.disabled=!1,this.select.classList.remove("webcimes-select--disabled")))}initOptions(){if(this.nativeSelect){let e=Array.from(this.nativeSelect.selectedOptions).filter((e=>{if(""!==e.value)return!0}));if(this.select.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((e=>{e.removeEventListener("click",this.onClearOption)})),this.select.querySelector(".webcimes-select__options").innerHTML="",e.length)this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.add("webcimes-select__clear--active"),e.forEach((e=>{let t=document.createElement("template");t.innerHTML=`<div class="webcimes-select__option" data-value="${e.value}">\n\t\t\t\t\t\t<div class="webcimes-select__option-label" title="${e.innerHTML}">${e.innerHTML}</div>\n\t\t\t\t\t\t${this.nativeSelect.multiple&&!e.disabled?'<button type="button" class="webcimes-select__clear"><div class="webcimes-select__cross"></div></button>':""}\n\t\t\t\t\t</div>\n`,this.select.querySelector(".webcimes-select__options").appendChild(t.content)}));else if(this.options.placeholderText){this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");let e=document.createElement("template");e.innerHTML=`<div class="webcimes-select__option webcimes-select__option--placeholder" data-value="">\n\t\t\t\t\t<div class="webcimes-select__option-label" title="${this.options.placeholderText}">${this.options.placeholderText}</div>\n\t\t\t\t</div>\n`,this.select.querySelector(".webcimes-select__options").appendChild(e.content)}else this.select.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");this.select.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((e=>{e.addEventListener("click",this.onClearOption)}))}}addOption(e){if(e){this.nativeSelect.multiple||this.removeAllOptions();let t=this.nativeSelect.querySelector(`option[value="${e}"]`);t&&(t.setAttribute("selected",""),t.selected=!0),this.initOptions(),this.options.keepOpenDropdown?(this.dropdown?.querySelector(`.webcimes-dropdown__option[data-value="${e}"]`)?.classList.add("webcimes-dropdown__option--selected"),this.setDropdownPosition(!0)):this.destroyDropdown(),this.select.dispatchEvent(new CustomEvent("onAddOption",{detail:{value:e}})),"function"==typeof this.options.onAddOption&&this.options.onAddOption(e)}}removeOption(e){if(e&&!this.nativeSelect?.disabled){let t=this.nativeSelect.querySelector(`option[value="${e}"]:not([disabled])`);t&&(t.removeAttribute("selected"),t.selected=!1),!this.nativeSelect.multiple&&this.options.allowClear&&(this.nativeSelect.value=""),this.initOptions(),this.options.keepOpenDropdown?(this.dropdown?.querySelector(`.webcimes-dropdown__option[data-value="${e}"]`)?.classList.remove("webcimes-dropdown__option--selected"),this.setDropdownPosition(!0)):this.destroyDropdown(),this.select.dispatchEvent(new CustomEvent("onRemoveOption",{detail:{value:e}})),"function"==typeof this.options.onRemoveOption&&this.options.onRemoveOption(e)}}removeAllOptions(){this.nativeSelect?.disabled||(this.nativeSelect.querySelectorAll("option:not([disabled])").forEach((e=>{e.removeAttribute("selected"),e.selected=!1})),!this.nativeSelect.multiple&&this.options.allowClear&&(this.nativeSelect.value=""),this.initOptions(),this.options.keepOpenDropdown?(this.dropdown?.querySelectorAll(".webcimes-dropdown__option").forEach((e=>{e.classList.remove("webcimes-dropdown__option--selected")})),this.setDropdownPosition(!0)):this.destroyDropdown(),this.select.dispatchEvent(new CustomEvent("onRemoveAllOptions")),"function"==typeof this.options.onRemoveAllOptions&&this.options.onRemoveAllOptions())}onClearOption(e){this.removeOption(e.target.closest(".webcimes-select__option").getAttribute("data-value"))}onClearAllOptions(e){this.removeAllOptions()}onKeyDown(e){e.target.closest(".webcimes-select > .webcimes-select__clear")?"Enter"==e.key&&(e.preventDefault(),this.removeAllOptions()):e.target.closest(".webcimes-select__option .webcimes-select__clear")?"Enter"==e.key&&(e.preventDefault(),this.removeOption(e.target.closest(".webcimes-select__option").getAttribute("data-value"))):this.dropdown||" "!=e.key&&"Enter"!=e.key&&"ArrowUp"!=e.key&&"ArrowDown"!=e.key||(e.preventDefault(),this.initDropdown())}onClickInitDropdown(e){this.dropdown||e.target.closest(".webcimes-select__clear")?this.destroyDropdown():this.initDropdown()}initDropdown(){if(!this.nativeSelect?.disabled){this.select.classList.add("webcimes-select--open"),document.body.insertAdjacentHTML("beforeend",`<div class="webcimes-dropdown" ${"rtl"==this.nativeSelect.getAttribute("dir")?'dir="rtl"':""} tabindex="-1">\n\t\t\t\t\t${this.options.allowSearch?`<input class="webcimes-dropdown__search-input" type="text" name="search" autocomplete="off" ${this.options.searchPlaceholderText?`placeholder="${this.options.searchPlaceholderText}" title="${this.options.searchPlaceholderText}"`:""}>`:""}\n\t\t\t\t\t<div class="webcimes-dropdown__options" style="max-height:${this.options.maxHeightOptions};" tabindex="-1"></div>\n\t\t\t\t</div>`),this.dropdown=document.body.lastElementChild;let e=Array.from(this.nativeSelect.options).filter((e=>{if(""!==e.value)return e}));if(this.setDropdownOptions(Array.from(e)),this.setDropdownPosition(),this.dropdown.focus(),this.options.allowSearch){let e=this.dropdown.querySelector(".webcimes-dropdown__search-input");this.options.searchAutoFocus&&e.focus(),e.addEventListener("input",this.onDropdownSearch)}this.dropdown.addEventListener("keydown",this.onDropdownKeyDown),window.addEventListener("resize",this.onDropdownResize),["click","keydown"].forEach((e=>{document.addEventListener(e,this.onDropdownDestroy)})),this.select.dispatchEvent(new CustomEvent("onInitDropdown")),"function"==typeof this.options.onInitDropdown&&this.options.onInitDropdown()}}destroyDropdown(){this.dropdown&&(this.select.classList.remove("webcimes-select--open"),this.dropdown.querySelector(".webcimes-dropdown__search-input").removeEventListener("input",this.onDropdownSearch),this.dropdown.removeEventListener("keydown",this.onDropdownKeyDown),window.removeEventListener("resize",this.onDropdownResize),["click","keydown"].forEach((e=>{document.removeEventListener(e,this.onDropdownDestroy)})),this.dropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((e=>{e.removeEventListener("click",this.onDropdownClickOption),e.removeEventListener("mouseover",this.onDropdownMouseOverOption)})),this.dropdown.remove(),this.dropdown=null,document.querySelector(".webcimes-dropdown")||this.select.focus(),this.select.classList.remove("webcimes-select--direction-bottom"),this.select.classList.remove("webcimes-select--direction-top"),this.select.dispatchEvent(new CustomEvent("onDestroyDropdown")),"function"==typeof this.options.onDestroyDropdown&&this.options.onDestroyDropdown())}setDropdownOptions(e){this.dropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((e=>{e.removeEventListener("click",this.onDropdownClickOption),e.removeEventListener("mouseover",this.onDropdownMouseOverOption)}));let t=e.findIndex((e=>!e.disabled)),o=document.createElement("template");e.forEach(((e,i)=>{let s=document.createElement("template");if(s.innerHTML=`<div class="webcimes-dropdown__option ${e.selected?"webcimes-dropdown__option--selected":""} ${t==i?"webcimes-dropdown__option--highlighted":""} ${e.disabled?"webcimes-dropdown__option--disabled":""} ${e.classList.toString()}" data-value="${e.value}" title="${e.innerHTML}">${e.innerHTML}</div>\n`,e.closest("optgroup")){let t=e.closest("optgroup").label;if(!o.content.querySelector(`.webcimes-dropdown__opt-group[data-label='${t}']`)){let e=document.createElement("template");e.innerHTML=`<div class="webcimes-dropdown__opt-group" data-label="${t}" title="${t}">\n\t\t\t\t\t\t<div class="webcimes-dropdown__opt-group-label">${t}</div>\n\t\t\t\t\t</div>\n`,o.content.appendChild(e.content)}o.content.querySelector(`.webcimes-dropdown__opt-group[data-label='${t}']`)?.appendChild(s.content)}else o.content.appendChild(s.content)})),this.dropdown.querySelector(".webcimes-dropdown__options").replaceChildren(o.content),this.dropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((e=>{e.addEventListener("click",this.onDropdownClickOption),e.addEventListener("mouseover",this.onDropdownMouseOverOption)}))}setDropdownPosition(e=!1){if(this.dropdown){let t=this.select.getBoundingClientRect();e&&this.select.classList.contains("webcimes-select--direction-top")||!e&&t.bottom+this.dropdown.getBoundingClientRect().height>window.innerHeight?(this.select.classList.remove("webcimes-select--direction-bottom"),this.select.classList.add("webcimes-select--direction-top"),this.dropdown.classList.remove("webcimes-dropdown--direction-bottom"),this.dropdown.classList.add("webcimes-dropdown--direction-top"),this.dropdown.style.top=t.top-this.dropdown.getBoundingClientRect().height+window.scrollY+"px"):(this.select.classList.remove("webcimes-select--direction-top"),this.select.classList.add("webcimes-select--direction-bottom"),this.dropdown.classList.remove("webcimes-dropdown--direction-top"),this.dropdown.classList.add("webcimes-dropdown--direction-bottom"),this.dropdown.style.top=t.bottom+window.scrollY+"px"),this.dropdown.style.left=t.left+window.scrollX+"px",this.dropdown.style.width=t.width+"px"}}setDropdownHighlightOption(e,t){let o=this.dropdown.querySelector(".webcimes-dropdown__option--highlighted"),i=this.dropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)");o?.classList.remove("webcimes-dropdown__option--highlighted"),o=i[e],o.classList.add("webcimes-dropdown__option--highlighted"),t&&o.scrollIntoView({behavior:"smooth",block:"nearest"})}onDropdownSearch(e){let t=new RegExp(e.target.value,"i"),o=Array.from(this.nativeSelect.options).filter((e=>{if(""!==e.value&&(t.test(e.innerHTML)||t.test(e.value)))return!0}));if(0==o.length&&this.options.searchNoResultsText){let e=document.createElement("option");e.classList.add("webcimes-dropdown__option--no-results"),e.innerHTML=this.options.searchNoResultsText,o.push(e)}this.setDropdownOptions(o),this.setDropdownPosition(!0),this.select.dispatchEvent(new CustomEvent("onSearchDropdown",{detail:{value:e.target.value,options:o}})),"function"==typeof this.options.onSearchDropdown&&this.options.onSearchDropdown(e.target.value,o)}onDropdownKeyDown(e){if(e.target!=this.select){let t=this.dropdown.querySelector(".webcimes-dropdown__option--highlighted");if(t){if("ArrowUp"==e.key||"ArrowDown"==e.key){e.preventDefault();let o=this.dropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)"),i=Array.from(o).indexOf(t);this.setDropdownHighlightOption("ArrowUp"==e.key?i-1>=0?i-1:0:i+1<=o.length-1?i+1:o.length-1,!0)}"Enter"==e.key&&(e.preventDefault(),t.classList.contains("webcimes-dropdown__option--selected")?this.removeOption(t.getAttribute("data-value")):this.addOption(t.getAttribute("data-value")))}"Escape"==e.key&&(e.preventDefault(),this.destroyDropdown()),"Tab"==e.key&&(e.preventDefault(),this.destroyDropdown())}}onDropdownMouseOverOption(e){let t=this.dropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)");this.setDropdownHighlightOption(Array.from(t).indexOf(e.target),!1)}onDropdownResize(e){this.setDropdownPosition()}onDropdownClickOption(e){e.target.classList.contains("webcimes-dropdown__option--selected")?this.removeOption(e.target.getAttribute("data-value")):this.addOption(e.target.getAttribute("data-value"))}onDropdownDestroy(e){e.target.closest(".webcimes-select")!=this.select&&e.target.closest(".webcimes-dropdown")!=this.dropdown&&this.destroyDropdown()}}var i=t.D;export{i as WebcimesSelect};
//# sourceMappingURL=webcimes-select.esm.js.map