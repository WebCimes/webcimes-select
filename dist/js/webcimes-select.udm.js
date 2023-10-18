!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var o=t();for(var s in o)("object"==typeof exports?exports:e)[s]=o[s]}}(self,(()=>(()=>{"use strict";var e={d:(t,o)=>{for(var s in o)e.o(o,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:o[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{WebcimesSelect:()=>o});class o{select;webcimesSelect;webcimesSelectDropDown=null;options;getHtmlElements=e=>{let t=[];return e instanceof NodeList&&(t=[...Array.from(e)]),e instanceof HTMLElement&&(t=[e]),"string"==typeof e&&(t=[...Array.from(document.querySelectorAll(e))]),t};getHtmlElement=e=>{let t=null;return e instanceof HTMLElement&&(t=e),"string"==typeof e&&(t=document.querySelector(e)),t};setSelectedValue(){this.select&&(""!==this.select.value?(this.webcimesSelect.classList.remove("placeholder"),this.webcimesSelect.querySelector(".text").innerHTML=this.select.value,this.webcimesSelect.querySelector(".clear")?.classList.add("active")):this.options.placeholder&&(this.webcimesSelect.classList.add("placeholder"),this.webcimesSelect.querySelector(".text").innerHTML=this.options.placeholder,this.webcimesSelect.querySelector(".clear")?.classList.remove("active")))}createDropDown(){this.webcimesSelect.classList.add("open"),document.body.insertAdjacentHTML("beforeend",`<div class="webcimesSelectDropDown" ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""}>\n\t\t\t\t${this.options.allowSearch?`<div class="search"><input type="text" name="search" autocomplete="off" ${this.options.searchPlaceholder?`placeholder="${this.options.searchPlaceholder}"`:""}></div>`:""}\n\t\t\t\t<div class="options" style="max-height:${this.options.maxHeightOptions};"></div>\n\t\t\t</div>`),this.webcimesSelectDropDown=document.body.lastElementChild;let e=Array.from(this.select.options).filter((e=>{if(""!==e.value)return e}));if(this.setDropDownOptions(Array.from(e)),this.setDropDownPositionAndWidth(),this.options.allowSearch){let e=this.webcimesSelectDropDown.querySelector("input[name='search']");this.options.searchAutoFocus&&e.focus(),e.addEventListener("input",this.eventSearchDropDown)}document.addEventListener("keydown",this.eventKeyboardControlsDropDown),window.addEventListener("resize",this.eventResizeDropDown),document.addEventListener("click",this.eventDestroyDropDown)}setDropDownOptions(e){this.webcimesSelectDropDown.querySelectorAll(".option:not(.disabled)").forEach((e=>{e.removeEventListener("click",this.eventSelectOptionDropDown)}));let t=document.createElement("template");e.forEach(((e,o)=>{let s=document.createElement("template");if(s.innerHTML=`<div class="option ${0==o?"highlighted":""} ${e.disabled?"disabled":""} ${e.classList.toString()}" data-value="${e.value}">${e.innerHTML}</div>\n`,e.closest("optgroup")){let o=e.closest("optgroup").label;if(!t.content.querySelector(`.optGroup[data-label='${o}']`)){let e=document.createElement("template");e.innerHTML=`<div class="optGroup" data-label="${o}">\n\t\t\t\t\t\t<div class="label">${o}</div>\n\t\t\t\t\t</div>\n`,t.content.appendChild(e.content)}t.content.querySelector(`.optGroup[data-label='${o}']`)?.appendChild(s.content)}else t.content.appendChild(s.content)})),this.webcimesSelectDropDown.querySelector(".options").replaceChildren(t.content),this.webcimesSelectDropDown.querySelectorAll(".option:not(.disabled)").forEach((e=>{e.addEventListener("click",this.eventSelectOptionDropDown)}))}setDropDownPositionAndWidth(e=!1){if(this.webcimesSelectDropDown){let t=this.webcimesSelect.getBoundingClientRect();e&&this.webcimesSelect.classList.contains("directionTop")||!e&&t.bottom+this.webcimesSelectDropDown.getBoundingClientRect().height>window.innerHeight?(this.webcimesSelect.classList.remove("directionBottom"),this.webcimesSelect.classList.add("directionTop"),this.webcimesSelectDropDown.classList.remove("directionBottom"),this.webcimesSelectDropDown.classList.add("directionTop"),this.webcimesSelectDropDown.style.top=t.top-this.webcimesSelectDropDown.getBoundingClientRect().height+window.scrollY+"px"):(this.webcimesSelect.classList.remove("directionTop"),this.webcimesSelect.classList.add("directionBottom"),this.webcimesSelectDropDown.classList.remove("directionTop"),this.webcimesSelectDropDown.classList.add("directionBottom"),this.webcimesSelectDropDown.style.top=t.bottom+window.scrollY+"px"),this.webcimesSelectDropDown.style.left=t.left+window.scrollX+"px",this.webcimesSelectDropDown.style.width=t.width+"px"}}destroyDropDown(){this.webcimesSelectDropDown&&(this.webcimesSelect.classList.remove("open"),this.webcimesSelect.focus(),this.webcimesSelectDropDown.querySelector("input[name='search']").removeEventListener("input",this.eventSearchDropDown),document.removeEventListener("keydown",this.eventKeyboardControlsDropDown),window.removeEventListener("resize",this.eventResizeDropDown),document.addEventListener("click",this.eventDestroyDropDown),this.webcimesSelectDropDown.querySelectorAll(".option:not(.disabled)").forEach((e=>{e.removeEventListener("click",this.eventSelectOptionDropDown)})),this.webcimesSelectDropDown.remove(),this.webcimesSelectDropDown=null)}eventSearchDropDown=e=>{let t=new RegExp(e.target.value,"i"),o=Array.from(this.select.options).filter((e=>{if(""!==e.value&&(t.test(e.innerHTML)||t.test(e.value)))return e}));if(0==o.length&&this.options.searchTextNoResults){let e=document.createElement("option");e.classList.add("noResults"),e.innerHTML=this.options.searchTextNoResults,o.push(e)}this.setDropDownOptions(o),this.setDropDownPositionAndWidth(!0)};eventKeyboardControlsDropDown=e=>{if(e.target!=this.webcimesSelect){let t=this.webcimesSelectDropDown.querySelector(".option.highlighted");if(t){let o=this.webcimesSelectDropDown.querySelectorAll(".option:not(.disabled)"),s=Array.from(o).indexOf(t);"ArrowUp"!=e.key&&"ArrowDown"!=e.key||(t.classList.remove("highlighted"),t=o["ArrowUp"==e.key?s-1>=0?s-1:0:s+1<=o.length-1?s+1:o.length-1],t.classList.add("highlighted"),t.scrollIntoView({behavior:"smooth",block:"nearest"})),"Enter"==e.key&&(t.classList.remove("highlighted"),this.select.value=t.getAttribute("data-value"),this.setSelectedValue(),this.destroyDropDown()),"Escape"==e.key&&this.destroyDropDown()}}};eventResizeDropDown=()=>{this.setDropDownPositionAndWidth()};eventSelectOptionDropDown=e=>{this.select.value=e.target.getAttribute("data-value"),this.setSelectedValue(),this.destroyDropDown()};eventDestroyDropDown=e=>{e.target.closest(".webcimesSelect")!=this.webcimesSelect&&e.target.closest(".webcimesSelectDropDown")!=this.webcimesSelectDropDown&&this.destroyDropDown()};constructor(e){this.options={element:null,setId:null,setClass:null,width:"auto",height:"auto",maxHeightOptions:"200px",style:null,placeholder:null,allowClear:!0,allowSearch:!0,searchAutoFocus:!0,searchPlaceholder:"Search",searchTextNoResults:"No results found",beforeShow:()=>{},afterShow:()=>{},beforeDestroy:()=>{},afterDestroy:()=>{},...e},this.init()}init(){this.select=this.getHtmlElement(this.options.element),this.select&&(this.select.style.display="none",this.select.insertAdjacentHTML("afterend",`<div class="webcimesSelect ${this.options.setClass?this.options.setClass:""}" ${this.options.setId?`id="${this.options.setId}"`:""} ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""} tabindex="0">\n\t\t\t\t\t<div class="text"></div>\n\t\t\t\t\t${this.options.allowClear?'<div class="clear"><div class="cross"></div></div>':""}\n\t\t\t\t</div>`),this.webcimesSelect=this.select.nextElementSibling,this.options.placeholder||this.select.querySelector("option[value='']")&&(this.options.placeholder=this.select.querySelector("option[value='']").innerHTML),this.setSelectedValue(),this.webcimesSelect.querySelector(".clear")?.addEventListener("click",(e=>{this.select.value="",this.setSelectedValue(),this.destroyDropDown()})),this.webcimesSelect?.addEventListener("keydown",(e=>{" "!=e.key&&"Enter"!=e.key&&"ArrowUp"!=e.key&&"ArrowDown"!=e.key||(e.preventDefault(),this.createDropDown())})),this.webcimesSelect.addEventListener("click",(e=>{this.webcimesSelectDropDown||e.target.closest(".clear")?this.destroyDropDown():this.createDropDown()})))}destroy(){}}return t})()));
//# sourceMappingURL=webcimes-select.udm.js.map