var t={d:(e,o)=>{for(var i in o)t.o(o,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:o[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{D:()=>o});class o{select;wSelect;wDropDown=null;options;getHtmlElements(t){let e=[];return t instanceof NodeList&&(e=[...Array.from(t)]),t instanceof HTMLElement&&(e=[t]),"string"==typeof t&&(e=[...Array.from(document.querySelectorAll(t))]),e}getHtmlElement(t){let e=null;return t instanceof HTMLElement&&(e=t),"string"==typeof t&&(e=document.querySelector(t)),e}initWSelectValue(){if(this.select){let t=Array.from(this.select.selectedOptions).filter((t=>{if(""!==t.value)return!0}));if(this.wSelect.querySelectorAll(".wSelect .option .clear").forEach((t=>{t.removeEventListener("click",this.onWSelectClearOption)})),this.wSelect.querySelector(".options").innerHTML="",t.length)this.wSelect.querySelector(".clear")?.classList.add("active"),t.forEach((t=>{let e=document.createElement("template");e.innerHTML=`<div class="option" data-value="${t.value}">\n\t\t\t\t\t\t<div class="label" title="${t.innerHTML}">${t.innerHTML}</div>\n\t\t\t\t\t\t${this.select.multiple?'<div class="clear"><div class="cross"></div></div>':""}\n\t\t\t\t\t</div>\n`,this.wSelect.querySelector(".options").appendChild(e.content)}));else if(this.options.placeholder){this.wSelect.querySelector(".clear")?.classList.remove("active");let t=document.createElement("template");t.innerHTML=`<div class="option placeholder" data-value="">\n\t\t\t\t\t<div class="label" title="${this.options.placeholder}">${this.options.placeholder}</div>\n\t\t\t\t</div>\n`,this.wSelect.querySelector(".options").appendChild(t.content)}this.wSelect.querySelectorAll(".wSelect .option .clear").forEach((t=>{t.addEventListener("click",this.onWSelectClearOption)}))}}addWSelectOption(t){t&&(this.select.querySelector(`option[value="${t}"`)?.setAttribute("selected",""),this.initWSelectValue(),this.destroyWDropDown(),this.wSelect.dispatchEvent(new CustomEvent("onAddOption")),"function"==typeof this.options.onAddOption&&this.options.onAddOption(t))}removeWSelectOption(t){t&&(this.select.querySelector(`option[value="${t}"]:not([disabled])`)?.removeAttribute("selected"),this.initWSelectValue(),this.destroyWDropDown(),this.wSelect.dispatchEvent(new CustomEvent("onRemoveOption")),"function"==typeof this.options.onRemoveOption&&this.options.onRemoveOption(t))}onWSelectClearOption(t){this.removeWSelectOption(t.target.closest(".option").getAttribute("data-value"))}onWSelectClearAllOptions(t){this.select.querySelectorAll("option:not([disabled])").forEach((t=>{this.removeWSelectOption(t.value)}))}onWSelectKeyDown(t){this.wDropDown||" "!=t.key&&"Enter"!=t.key&&"ArrowUp"!=t.key&&"ArrowDown"!=t.key||(t.preventDefault(),this.initWDropDown())}onWSelectClickInitWDropDown(t){this.wDropDown||t.target.closest(".clear")?this.destroyWDropDown():this.initWDropDown()}initWDropDown(){this.wSelect.classList.add("open"),document.body.insertAdjacentHTML("beforeend",`<div class="wDropDown" ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""} tabindex="-1">\n\t\t\t\t${this.options.allowSearch?`<div class="search"><input type="text" name="search" autocomplete="off" ${this.options.searchPlaceholder?`placeholder="${this.options.searchPlaceholder}"`:""}></div>`:""}\n\t\t\t\t<div class="options" style="max-height:${this.options.maxHeightOptions};" tabindex="-1"></div>\n\t\t\t</div>`),this.wDropDown=document.body.lastElementChild;let t=Array.from(this.select.options).filter((t=>{if(""!==t.value)return t}));if(this.setWDropDownOptions(Array.from(t)),this.setWDropDownPosition(),this.wDropDown.focus(),this.options.allowSearch){let t=this.wDropDown.querySelector("input[name='search']");this.options.searchAutoFocus&&t.focus(),t.addEventListener("input",this.onWDropDownSearch)}this.wDropDown.addEventListener("keydown",this.onWDropDownKeyPress),this.wDropDown.querySelectorAll(".option:not(.disabled)").forEach((t=>{t.addEventListener("mouseover",this.onWDropDownMouseOverOption)})),window.addEventListener("resize",this.onWDropDownResize),["click","keydown"].forEach((t=>{document.addEventListener(t,this.onWDropDownDestroy)})),this.wSelect.dispatchEvent(new CustomEvent("onInitDropDown")),"function"==typeof this.options.onInitDropDown&&this.options.onInitDropDown()}setWDropDownOptions(t){this.wDropDown.querySelectorAll(".option:not(.disabled)").forEach((t=>{t.removeEventListener("click",this.onWDropDownSelectOption)}));let e=document.createElement("template");t.forEach(((t,o)=>{let i=document.createElement("template");if(i.innerHTML=`<div class="option ${0==o?"highlighted":""} ${t.disabled?"disabled":""} ${t.classList.toString()}" data-value="${t.value}">${t.innerHTML}</div>\n`,t.closest("optgroup")){let o=t.closest("optgroup").label;if(!e.content.querySelector(`.optGroup[data-label='${o}']`)){let t=document.createElement("template");t.innerHTML=`<div class="optGroup" data-label="${o}">\n\t\t\t\t\t\t<div class="label">${o}</div>\n\t\t\t\t\t</div>\n`,e.content.appendChild(t.content)}e.content.querySelector(`.optGroup[data-label='${o}']`)?.appendChild(i.content)}else e.content.appendChild(i.content)})),this.wDropDown.querySelector(".options").replaceChildren(e.content),this.wDropDown.querySelectorAll(".option:not(.disabled)").forEach((t=>{t.addEventListener("click",this.onWDropDownSelectOption)}))}setWDropDownPosition(t=!1){if(this.wDropDown){let e=this.wSelect.getBoundingClientRect();t&&this.wSelect.classList.contains("directionTop")||!t&&e.bottom+this.wDropDown.getBoundingClientRect().height>window.innerHeight?(this.wSelect.classList.remove("directionBottom"),this.wSelect.classList.add("directionTop"),this.wDropDown.classList.remove("directionBottom"),this.wDropDown.classList.add("directionTop"),this.wDropDown.style.top=e.top-this.wDropDown.getBoundingClientRect().height+window.scrollY+"px"):(this.wSelect.classList.remove("directionTop"),this.wSelect.classList.add("directionBottom"),this.wDropDown.classList.remove("directionTop"),this.wDropDown.classList.add("directionBottom"),this.wDropDown.style.top=e.bottom+window.scrollY+"px"),this.wDropDown.style.left=e.left+window.scrollX+"px",this.wDropDown.style.width=e.width+"px"}}setWDropDownHighlightOption(t){let e=this.wDropDown.querySelector(".option.highlighted"),o=this.wDropDown.querySelectorAll(".option:not(.disabled)");e?.classList.remove("highlighted"),e=o[t],e.classList.add("highlighted"),e.scrollIntoView({behavior:"smooth",block:"nearest"})}destroyWDropDown(){this.wDropDown&&(this.wSelect.classList.remove("open"),this.wDropDown.querySelector("input[name='search']").removeEventListener("input",this.onWDropDownSearch),this.wDropDown.removeEventListener("keydown",this.onWDropDownKeyPress),window.removeEventListener("resize",this.onWDropDownResize),["click","keydown"].forEach((t=>{document.removeEventListener(t,this.onWDropDownDestroy)})),this.wDropDown.querySelectorAll(".option:not(.disabled)").forEach((t=>{t.removeEventListener("click",this.onWDropDownSelectOption)})),this.wDropDown.remove(),this.wDropDown=null,document.querySelector(".wDropDown")||this.wSelect.focus(),this.wSelect.dispatchEvent(new CustomEvent("onDestroyDropDown")),"function"==typeof this.options.onDestroyDropDown&&this.options.onDestroyDropDown())}onWDropDownSearch(t){let e=new RegExp(t.target.value,"i"),o=Array.from(this.select.options).filter((t=>{if(""!==t.value&&(e.test(t.innerHTML)||e.test(t.value)))return!0}));if(0==o.length&&this.options.searchTextNoResults){let t=document.createElement("option");t.classList.add("noResults"),t.innerHTML=this.options.searchTextNoResults,o.push(t)}this.setWDropDownOptions(o),this.setWDropDownPosition(!0),this.wSelect.dispatchEvent(new CustomEvent("onSearchDropDown")),"function"==typeof this.options.onSearchDropDown&&this.options.onSearchDropDown(t.target.value,o)}onWDropDownKeyPress(t){if(t.target!=this.wSelect){let e=this.wDropDown.querySelector(".option.highlighted");if(e){if("ArrowUp"==t.key||"ArrowDown"==t.key){t.preventDefault();let o=this.wDropDown.querySelectorAll(".option:not(.disabled)"),i=Array.from(o).indexOf(e);this.setWDropDownHighlightOption("ArrowUp"==t.key?i-1>=0?i-1:0:i+1<=o.length-1?i+1:o.length-1)}"Enter"==t.key&&(t.preventDefault(),e.classList.remove("highlighted"),this.addWSelectOption(e.getAttribute("data-value")))}"Escape"==t.key&&(t.preventDefault(),this.destroyWDropDown()),"Tab"==t.key&&(t.preventDefault(),this.destroyWDropDown())}}onWDropDownMouseOverOption(t){let e=this.wDropDown.querySelectorAll(".option:not(.disabled)");this.setWDropDownHighlightOption(Array.from(e).indexOf(t.target))}onWDropDownResize(t){this.setWDropDownPosition()}onWDropDownSelectOption(t){this.addWSelectOption(t.target.getAttribute("data-value"))}onWDropDownDestroy(t){t.target.closest(".wSelect")!=this.wSelect&&t.target.closest(".wDropDown")!=this.wDropDown&&this.destroyWDropDown()}constructor(t){const e={element:null,setId:null,setClass:null,width:"auto",height:"auto",maxHeightOptions:"200px",style:null,placeholder:null,allowClear:!0,allowSearch:!0,searchAutoFocus:!0,searchPlaceholder:"Search",searchTextNoResults:"No results found",onInit:()=>{},onDestroy(){},onInitDropDown:()=>{},onDestroyDropDown:()=>{},onSearchDropDown:()=>{},onAddOption:()=>{},onRemoveOption:()=>{}};this.options={...e,...t},this.onWSelectClearOption=this.onWSelectClearOption.bind(this),this.onWSelectClearAllOptions=this.onWSelectClearAllOptions.bind(this),this.onWSelectKeyDown=this.onWSelectKeyDown.bind(this),this.onWSelectClickInitWDropDown=this.onWSelectClickInitWDropDown.bind(this),this.onWDropDownSearch=this.onWDropDownSearch.bind(this),this.onWDropDownKeyPress=this.onWDropDownKeyPress.bind(this),this.onWDropDownMouseOverOption=this.onWDropDownMouseOverOption.bind(this),this.onWDropDownResize=this.onWDropDownResize.bind(this),this.onWDropDownSelectOption=this.onWDropDownSelectOption.bind(this),this.onWDropDownDestroy=this.onWDropDownDestroy.bind(this),this.init()}init(){if(this.select=this.getHtmlElement(this.options.element),this.select){if(this.select.style.display="none",this.select.insertAdjacentHTML("afterend",`<div class="wSelect ${this.select.multiple?"multiple":""} ${this.options.setClass?this.options.setClass:""}" ${this.options.setId?`id="${this.options.setId}"`:""} ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""} tabindex="0">\n\t\t\t\t\t<div class="options"></div>\n\t\t\t\t\t${this.options.allowClear?'<div class="clear"><div class="cross"></div></div>':""}\n\t\t\t\t\t<div class="arrow"></div>\n\t\t\t\t</div>`),this.wSelect=this.select.nextElementSibling,this.options.placeholder||this.select.querySelector("option[value='']")&&(this.options.placeholder=this.select.querySelector("option[value='']").innerHTML),"auto"!=this.options.width&&this.options.width&&this.wSelect.style.setProperty("width",this.options.width),"auto"!=this.options.height&&this.options.height&&this.wSelect.style.setProperty("height",this.options.height),this.options.style){let t=this.wSelect.getAttribute("style");this.wSelect.setAttribute("style",t+this.options.style)}this.initWSelectValue(),this.wSelect.querySelector(".wSelect > .clear")?.addEventListener("click",this.onWSelectClearAllOptions),this.wSelect.addEventListener("keydown",this.onWSelectKeyDown),this.wSelect.addEventListener("click",this.onWSelectClickInitWDropDown),setTimeout((()=>{this.wSelect.dispatchEvent(new CustomEvent("onInit")),"function"==typeof this.options.onInit&&this.options.onInit()}),0)}}destroy(){this.wSelect.querySelectorAll(".wSelect .option .clear").forEach((t=>{t.removeEventListener("click",this.onWSelectClearOption)})),this.wSelect.querySelector(".wSelect > .clear")?.removeEventListener("click",this.onWSelectClearAllOptions),this.wSelect.removeEventListener("keydown",this.onWSelectKeyDown),this.wSelect.removeEventListener("click",this.onWSelectClickInitWDropDown),this.wSelect.dispatchEvent(new CustomEvent("onDestroy")),"function"==typeof this.options.onDestroy&&this.options.onDestroy()}}var i=e.D;export{i as WebcimesSelect};
//# sourceMappingURL=webcimes-select.esm.js.map