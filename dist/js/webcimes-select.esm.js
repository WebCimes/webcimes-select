var e={d:(t,o)=>{for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{D:()=>o});class o{select;webcimesSelect;webcimesDropdown=null;options;getHtmlElements(e){let t=[];return e instanceof NodeList&&(t=[...Array.from(e)]),e instanceof HTMLElement&&(t=[e]),"string"==typeof e&&(t=[...Array.from(document.querySelectorAll(e))]),t}getHtmlElement(e){let t=null;return e instanceof HTMLElement&&(t=e),"string"==typeof e&&(t=document.querySelector(e)),t}initWebcimesSelectOptions(){if(this.select){let e=Array.from(this.select.selectedOptions).filter((e=>{if(""!==e.value)return!0}));if(this.webcimesSelect.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((e=>{e.removeEventListener("click",this.onWebcimesSelectClearOption)})),this.webcimesSelect.querySelector(".webcimes-select__options").innerHTML="",e.length)this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.add("webcimes-select__clear--active"),e.forEach((e=>{let t=document.createElement("template");t.innerHTML=`<div class="webcimes-select__option" data-value="${e.value}">\n\t\t\t\t\t\t<div class="webcimes-select__option-label" title="${e.innerHTML}">${e.innerHTML}</div>\n\t\t\t\t\t\t${this.select.multiple?'<button type="button" class="webcimes-select__clear"><div class="webcimes-select__cross"></div></button>':""}\n\t\t\t\t\t</div>\n`,this.webcimesSelect.querySelector(".webcimes-select__options").appendChild(t.content)}));else if(this.options.placeholderText){this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");let e=document.createElement("template");e.innerHTML=`<div class="webcimes-select__option webcimes-select__option--placeholder" data-value="">\n\t\t\t\t\t<div class="webcimes-select__option-label" title="${this.options.placeholderText}">${this.options.placeholderText}</div>\n\t\t\t\t</div>\n`,this.webcimesSelect.querySelector(".webcimes-select__options").appendChild(e.content)}else this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.classList.remove("webcimes-select__clear--active");this.webcimesSelect.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((e=>{e.addEventListener("click",this.onWebcimesSelectClearOption)}))}}addWebcimesSelectOption(e){if(e){this.select.multiple||this.removeWebcimesSelectAllOptions();let t=this.select.querySelector(`option[value="${e}"]`);t.setAttribute("selected",""),t.selected=!0,this.initWebcimesSelectOptions(),this.options.keepOpenDropdown?(this.webcimesDropdown?.querySelector(`.webcimes-dropdown__option[data-value="${e}"]`)?.classList.add("webcimes-dropdown__option--selected"),this.setWebcimesDropdownPosition(!0)):this.destroyWebcimesDropdown(),this.webcimesSelect.dispatchEvent(new CustomEvent("onAddOption")),"function"==typeof this.options.onAddOption&&this.options.onAddOption(e)}}removeWebcimesSelectOption(e){if(e){let t=this.select.querySelector(`option[value="${e}"]:not([disabled])`);t.removeAttribute("selected"),t.selected=!1,!this.select.multiple&&this.options.allowClear&&(this.select.value=""),this.initWebcimesSelectOptions(),this.options.keepOpenDropdown?(this.webcimesDropdown?.querySelector(`.webcimes-dropdown__option[data-value="${e}"]`)?.classList.remove("webcimes-dropdown__option--selected"),this.setWebcimesDropdownPosition(!0)):this.destroyWebcimesDropdown(),this.webcimesSelect.dispatchEvent(new CustomEvent("onRemoveOption")),"function"==typeof this.options.onRemoveOption&&this.options.onRemoveOption(e)}}removeWebcimesSelectAllOptions(){this.select.querySelectorAll("option:not([disabled])").forEach((e=>{e.removeAttribute("selected"),e.selected=!1})),!this.select.multiple&&this.options.allowClear&&(this.select.value=""),this.initWebcimesSelectOptions(),this.options.keepOpenDropdown?(this.webcimesDropdown?.querySelectorAll(".webcimes-dropdown__option").forEach((e=>{e.classList.remove("webcimes-dropdown__option--selected")})),this.setWebcimesDropdownPosition(!0)):this.destroyWebcimesDropdown(),this.webcimesSelect.dispatchEvent(new CustomEvent("onRemoveAllOptions")),"function"==typeof this.options.onRemoveAllOptions&&this.options.onRemoveAllOptions()}onWebcimesSelectClearOption(e){this.removeWebcimesSelectOption(e.target.closest(".webcimes-select__option").getAttribute("data-value"))}onWebcimesSelectClearAllOptions(e){this.removeWebcimesSelectAllOptions()}onWebcimesSelectKeyDown(e){e.target.closest(".webcimes-select > .webcimes-select__clear")?"Enter"==e.key&&(e.preventDefault(),this.removeWebcimesSelectAllOptions()):e.target.closest(".webcimes-select__option .webcimes-select__clear")?"Enter"==e.key&&(e.preventDefault(),this.removeWebcimesSelectOption(e.target.closest(".webcimes-select__option").getAttribute("data-value"))):this.webcimesDropdown||" "!=e.key&&"Enter"!=e.key&&"ArrowUp"!=e.key&&"ArrowDown"!=e.key||(e.preventDefault(),this.initWebcimesDropdown())}onWebcimesSelectClickInitWebcimesDropdown(e){this.webcimesDropdown||e.target.closest(".webcimes-select__clear")?this.destroyWebcimesDropdown():this.initWebcimesDropdown()}initWebcimesDropdown(){this.webcimesSelect.classList.add("webcimes-select--open"),document.body.insertAdjacentHTML("beforeend",`<div class="webcimes-dropdown" ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""} tabindex="-1">\n\t\t\t\t${this.options.allowSearch?`<input class="webcimes-dropdown__search-input" type="text" name="search" autocomplete="off" ${this.options.searchPlaceholderText?`placeholder="${this.options.searchPlaceholderText}" title="${this.options.searchPlaceholderText}"`:""}>`:""}\n\t\t\t\t<div class="webcimes-dropdown__options" style="max-height:${this.options.maxHeightOptions};" tabindex="-1"></div>\n\t\t\t</div>`),this.webcimesDropdown=document.body.lastElementChild;let e=Array.from(this.select.options).filter((e=>{if(""!==e.value)return e}));if(this.setWebcimesDropdownOptions(Array.from(e)),this.setWebcimesDropdownPosition(),this.webcimesDropdown.focus(),this.options.allowSearch){let e=this.webcimesDropdown.querySelector(".webcimes-dropdown__search-input");this.options.searchAutoFocus&&e.focus(),e.addEventListener("input",this.onWebcimesDropdownSearch)}this.webcimesDropdown.addEventListener("keydown",this.onWebcimesDropdownKeyPress),window.addEventListener("resize",this.onWebcimesDropdownResize),["click","keydown"].forEach((e=>{document.addEventListener(e,this.onWebcimesDropdownDestroy)})),this.webcimesSelect.dispatchEvent(new CustomEvent("onInitDropdown")),"function"==typeof this.options.onInitDropdown&&this.options.onInitDropdown()}setWebcimesDropdownOptions(e){this.webcimesDropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((e=>{e.removeEventListener("click",this.onWebcimesDropdownClickOption),e.removeEventListener("mouseover",this.onWebcimesDropdownMouseOverOption)}));let t=document.createElement("template");e.forEach(((e,o)=>{let i=document.createElement("template");if(i.innerHTML=`<div class="webcimes-dropdown__option ${e.selected?"webcimes-dropdown__option--selected":""} ${0==o?"webcimes-dropdown__option--highlighted":""} ${e.disabled?"webcimes-dropdown__option--disabled":""} ${e.classList.toString()}" data-value="${e.value}" title="${e.innerHTML}">${e.innerHTML}</div>\n`,e.closest("optgroup")){let o=e.closest("optgroup").label;if(!t.content.querySelector(`.webcimes-dropdown__opt-group[data-label='${o}']`)){let e=document.createElement("template");e.innerHTML=`<div class="webcimes-dropdown__opt-group" data-label="${o}" title="${o}">\n\t\t\t\t\t\t<div class="webcimes-dropdown__opt-group-label">${o}</div>\n\t\t\t\t\t</div>\n`,t.content.appendChild(e.content)}t.content.querySelector(`.webcimes-dropdown__opt-group[data-label='${o}']`)?.appendChild(i.content)}else t.content.appendChild(i.content)})),this.webcimesDropdown.querySelector(".webcimes-dropdown__options").replaceChildren(t.content),this.webcimesDropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((e=>{e.addEventListener("click",this.onWebcimesDropdownClickOption),e.addEventListener("mouseover",this.onWebcimesDropdownMouseOverOption)}))}setWebcimesDropdownPosition(e=!1){if(this.webcimesDropdown){let t=this.webcimesSelect.getBoundingClientRect();e&&this.webcimesSelect.classList.contains("webcimes-select--direction-top")||!e&&t.bottom+this.webcimesDropdown.getBoundingClientRect().height>window.innerHeight?(this.webcimesSelect.classList.remove("webcimes-select--direction-bottom"),this.webcimesSelect.classList.add("webcimes-select--direction-top"),this.webcimesDropdown.classList.remove("webcimes-dropdown--direction-bottom"),this.webcimesDropdown.classList.add("webcimes-dropdown--direction-top"),this.webcimesDropdown.style.top=t.top-this.webcimesDropdown.getBoundingClientRect().height+window.scrollY+"px"):(this.webcimesSelect.classList.remove("webcimes-select--direction-top"),this.webcimesSelect.classList.add("webcimes-select--direction-bottom"),this.webcimesDropdown.classList.remove("webcimes-dropdown--direction-top"),this.webcimesDropdown.classList.add("webcimes-dropdown--direction-bottom"),this.webcimesDropdown.style.top=t.bottom+window.scrollY+"px"),this.webcimesDropdown.style.left=t.left+window.scrollX+"px",this.webcimesDropdown.style.width=t.width+"px"}}setWebcimesDropdownHighlightOption(e,t){let o=this.webcimesDropdown.querySelector(".webcimes-dropdown__option--highlighted"),i=this.webcimesDropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)");o?.classList.remove("webcimes-dropdown__option--highlighted"),o=i[e],o.classList.add("webcimes-dropdown__option--highlighted"),t&&o.scrollIntoView({behavior:"smooth",block:"nearest"})}destroyWebcimesDropdown(){this.webcimesDropdown&&(this.webcimesSelect.classList.remove("webcimes-select--open"),this.webcimesDropdown.querySelector(".webcimes-dropdown__search-input").removeEventListener("input",this.onWebcimesDropdownSearch),this.webcimesDropdown.removeEventListener("keydown",this.onWebcimesDropdownKeyPress),window.removeEventListener("resize",this.onWebcimesDropdownResize),["click","keydown"].forEach((e=>{document.removeEventListener(e,this.onWebcimesDropdownDestroy)})),this.webcimesDropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)").forEach((e=>{e.removeEventListener("click",this.onWebcimesDropdownClickOption),e.removeEventListener("mouseover",this.onWebcimesDropdownMouseOverOption)})),this.webcimesDropdown.remove(),this.webcimesDropdown=null,document.querySelector(".webcimes-dropdown")||this.webcimesSelect.focus(),this.webcimesSelect.classList.remove("webcimes-select--direction-bottom"),this.webcimesSelect.classList.remove("webcimes-select--direction-top"),this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroyDropdown")),"function"==typeof this.options.onDestroyDropdown&&this.options.onDestroyDropdown())}onWebcimesDropdownSearch(e){let t=new RegExp(e.target.value,"i"),o=Array.from(this.select.options).filter((e=>{if(""!==e.value&&(t.test(e.innerHTML)||t.test(e.value)))return!0}));if(0==o.length&&this.options.searchNoResultsText){let e=document.createElement("option");e.classList.add("webcimes-dropdown__option--no-results"),e.innerHTML=this.options.searchNoResultsText,o.push(e)}this.setWebcimesDropdownOptions(o),this.setWebcimesDropdownPosition(!0),this.webcimesSelect.dispatchEvent(new CustomEvent("onSearchDropdown")),"function"==typeof this.options.onSearchDropdown&&this.options.onSearchDropdown(e.target.value,o)}onWebcimesDropdownKeyPress(e){if(e.target!=this.webcimesSelect){let t=this.webcimesDropdown.querySelector(".webcimes-dropdown__option--highlighted");if(t){if("ArrowUp"==e.key||"ArrowDown"==e.key){e.preventDefault();let o=this.webcimesDropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)"),i=Array.from(o).indexOf(t);this.setWebcimesDropdownHighlightOption("ArrowUp"==e.key?i-1>=0?i-1:0:i+1<=o.length-1?i+1:o.length-1,!0)}"Enter"==e.key&&(e.preventDefault(),t.classList.contains("webcimes-dropdown__option--selected")?this.removeWebcimesSelectOption(t.getAttribute("data-value")):this.addWebcimesSelectOption(t.getAttribute("data-value")))}"Escape"==e.key&&(e.preventDefault(),this.destroyWebcimesDropdown()),"Tab"==e.key&&(e.preventDefault(),this.destroyWebcimesDropdown())}}onWebcimesDropdownMouseOverOption(e){let t=this.webcimesDropdown.querySelectorAll(".webcimes-dropdown__option:not(.webcimes-dropdown__option--disabled)");this.setWebcimesDropdownHighlightOption(Array.from(t).indexOf(e.target),!1)}onWebcimesDropdownResize(e){this.setWebcimesDropdownPosition()}onWebcimesDropdownClickOption(e){e.target.classList.contains("webcimes-dropdown__option--selected")?this.removeWebcimesSelectOption(e.target.getAttribute("data-value")):this.addWebcimesSelectOption(e.target.getAttribute("data-value"))}onWebcimesDropdownDestroy(e){e.target.closest(".webcimes-select")!=this.webcimesSelect&&e.target.closest(".webcimes-dropdown")!=this.webcimesDropdown&&this.destroyWebcimesDropdown()}constructor(e){const t={element:null,setId:null,setClass:null,width:"auto",height:"auto",maxHeightOptions:"200px",style:null,placeholderText:null,allowClear:!0,allowSearch:!0,searchAutoFocus:!0,searchPlaceholderText:"Search",searchNoResultsText:"No results found",keepOpenDropdown:!1,onInit:()=>{},onDestroy(){},onInitDropdown:()=>{},onDestroyDropdown:()=>{},onSearchDropdown:()=>{},onAddOption:()=>{},onRemoveOption:()=>{},onRemoveAllOptions:()=>{}};this.options={...t,...e},this.onWebcimesSelectClearOption=this.onWebcimesSelectClearOption.bind(this),this.onWebcimesSelectClearAllOptions=this.onWebcimesSelectClearAllOptions.bind(this),this.onWebcimesSelectKeyDown=this.onWebcimesSelectKeyDown.bind(this),this.onWebcimesSelectClickInitWebcimesDropdown=this.onWebcimesSelectClickInitWebcimesDropdown.bind(this),this.onWebcimesDropdownSearch=this.onWebcimesDropdownSearch.bind(this),this.onWebcimesDropdownKeyPress=this.onWebcimesDropdownKeyPress.bind(this),this.onWebcimesDropdownMouseOverOption=this.onWebcimesDropdownMouseOverOption.bind(this),this.onWebcimesDropdownResize=this.onWebcimesDropdownResize.bind(this),this.onWebcimesDropdownClickOption=this.onWebcimesDropdownClickOption.bind(this),this.onWebcimesDropdownDestroy=this.onWebcimesDropdownDestroy.bind(this),this.init()}init(){if(this.select=this.getHtmlElement(this.options.element),this.select){if(this.select.style.display="none",this.select.insertAdjacentHTML("afterend",`<div class="webcimes-select ${this.select.multiple?"webcimes-select--multiple":""} ${this.options.setClass?this.options.setClass:""}" ${this.options.setId?`id="${this.options.setId}"`:""} ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""} tabindex="0">\n\t\t\t\t\t<div class="webcimes-select__options"></div>\n\t\t\t\t\t${this.options.allowClear?'<button type="button" class="webcimes-select__clear"><div class="webcimes-select__cross"></div></button>':""}\n\t\t\t\t\t<div class="webcimes-select__arrow"></div>\n\t\t\t\t</div>`),this.webcimesSelect=this.select.nextElementSibling,this.options.placeholderText||this.select.querySelector("option[value='']")&&(this.options.placeholderText=this.select.querySelector("option[value='']").innerHTML),"auto"!=this.options.width&&this.options.width&&this.webcimesSelect.style.setProperty("width",this.options.width),"auto"!=this.options.height&&this.options.height&&this.webcimesSelect.style.setProperty("height",this.options.height),this.options.style){let e=this.webcimesSelect.getAttribute("style")??"";this.webcimesSelect.setAttribute("style",e+this.options.style)}this.initWebcimesSelectOptions(),this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.addEventListener("click",this.onWebcimesSelectClearAllOptions),this.webcimesSelect.addEventListener("keydown",this.onWebcimesSelectKeyDown),this.webcimesSelect.addEventListener("click",this.onWebcimesSelectClickInitWebcimesDropdown),setTimeout((()=>{this.webcimesSelect.dispatchEvent(new CustomEvent("onInit")),"function"==typeof this.options.onInit&&this.options.onInit()}),0)}}destroy(){this.webcimesSelect.querySelectorAll(".webcimes-select__option .webcimes-select__clear").forEach((e=>{e.removeEventListener("click",this.onWebcimesSelectClearOption)})),this.webcimesSelect.querySelector(".webcimes-select > .webcimes-select__clear")?.removeEventListener("click",this.onWebcimesSelectClearAllOptions),this.webcimesSelect.removeEventListener("keydown",this.onWebcimesSelectKeyDown),this.webcimesSelect.removeEventListener("click",this.onWebcimesSelectClickInitWebcimesDropdown),this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroy")),"function"==typeof this.options.onDestroy&&this.options.onDestroy()}}var i=t.D;export{i as WebcimesSelect};
//# sourceMappingURL=webcimes-select.esm.js.map