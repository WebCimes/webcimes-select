!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var s=t();for(var i in s)("object"==typeof exports?exports:e)[i]=s[i]}}(self,(()=>(()=>{"use strict";var e={d:(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{WebcimesSelect:()=>s});class s{select;webcimesSelect;webcimesDropDown=null;options;getHtmlElements(e){let t=[];return e instanceof NodeList&&(t=[...Array.from(e)]),e instanceof HTMLElement&&(t=[e]),"string"==typeof e&&(t=[...Array.from(document.querySelectorAll(e))]),t}getHtmlElement(e){let t=null;return e instanceof HTMLElement&&(t=e),"string"==typeof e&&(t=document.querySelector(e)),t}setWebcimesSelectValue(){this.select&&(""!==this.select.value?(this.webcimesSelect.classList.remove("placeholder"),this.webcimesSelect.querySelector(".text").innerHTML=this.select.value,this.webcimesSelect.title=this.select.value,this.webcimesSelect.querySelector(".clear")?.classList.add("active")):this.options.placeholder&&(this.webcimesSelect.classList.add("placeholder"),this.webcimesSelect.querySelector(".text").innerHTML=this.options.placeholder,this.webcimesSelect.title=this.options.placeholder,this.webcimesSelect.querySelector(".clear")?.classList.remove("active")))}eventClearSelectedOptionsWebcimesSelect(e){this.select.value="",this.setWebcimesSelectValue(),this.destroyWebcimesDropDown()}eventKeyboardWebCimesSelect(e){this.webcimesDropDown||" "!=e.key&&"Enter"!=e.key&&"ArrowUp"!=e.key&&"ArrowDown"!=e.key||(e.preventDefault(),this.initWebcimesDropDown())}eventOpenCloseWebcimesDropDown(e){this.webcimesDropDown||e.target.closest(".clear")?this.destroyWebcimesDropDown():this.initWebcimesDropDown()}initWebcimesDropDown(){this.webcimesSelect.classList.add("open"),document.body.insertAdjacentHTML("beforeend",`<div class="webcimesDropDown" ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""} tabindex="-1">\n\t\t\t\t${this.options.allowSearch?`<div class="search"><input type="text" name="search" autocomplete="off" ${this.options.searchPlaceholder?`placeholder="${this.options.searchPlaceholder}"`:""}></div>`:""}\n\t\t\t\t<div class="options" style="max-height:${this.options.maxHeightOptions};" tabindex="-1"></div>\n\t\t\t</div>`),this.webcimesDropDown=document.body.lastElementChild;let e=Array.from(this.select.options).filter((e=>{if(""!==e.value)return e}));if(this.setWebcimesDropDownOptions(Array.from(e)),this.setWebcimesDropDownPositionAndWidth(),this.webcimesDropDown.focus(),this.options.allowSearch){let e=this.webcimesDropDown.querySelector("input[name='search']");this.options.searchAutoFocus&&e.focus(),e.addEventListener("input",this.eventSearchWebcimesDropDown)}this.webcimesDropDown.addEventListener("keydown",this.eventKeyboardWebcimesDropDown),window.addEventListener("resize",this.eventResizeWebcimesDropDown),["click","keydown"].forEach((e=>{document.addEventListener(e,this.eventDestroyWebcimesDropDown)})),this.webcimesSelect.dispatchEvent(new CustomEvent("onInitDropDown")),"function"==typeof this.options.onInitDropDown&&this.options.onInitDropDown()}setWebcimesDropDownOptions(e){this.webcimesDropDown.querySelectorAll(".option:not(.disabled)").forEach((e=>{e.removeEventListener("click",this.eventSelectOptionWebcimesDropDown)}));let t=document.createElement("template");e.forEach(((e,s)=>{let i=document.createElement("template");if(i.innerHTML=`<div class="option ${0==s?"highlighted":""} ${e.disabled?"disabled":""} ${e.classList.toString()}" data-value="${e.value}">${e.innerHTML}</div>\n`,e.closest("optgroup")){let s=e.closest("optgroup").label;if(!t.content.querySelector(`.optGroup[data-label='${s}']`)){let e=document.createElement("template");e.innerHTML=`<div class="optGroup" data-label="${s}">\n\t\t\t\t\t\t<div class="label">${s}</div>\n\t\t\t\t\t</div>\n`,t.content.appendChild(e.content)}t.content.querySelector(`.optGroup[data-label='${s}']`)?.appendChild(i.content)}else t.content.appendChild(i.content)})),this.webcimesDropDown.querySelector(".options").replaceChildren(t.content),this.webcimesDropDown.querySelectorAll(".option:not(.disabled)").forEach((e=>{e.addEventListener("click",this.eventSelectOptionWebcimesDropDown)}))}setWebcimesDropDownPositionAndWidth(e=!1){if(this.webcimesDropDown){let t=this.webcimesSelect.getBoundingClientRect();e&&this.webcimesSelect.classList.contains("directionTop")||!e&&t.bottom+this.webcimesDropDown.getBoundingClientRect().height>window.innerHeight?(this.webcimesSelect.classList.remove("directionBottom"),this.webcimesSelect.classList.add("directionTop"),this.webcimesDropDown.classList.remove("directionBottom"),this.webcimesDropDown.classList.add("directionTop"),this.webcimesDropDown.style.top=t.top-this.webcimesDropDown.getBoundingClientRect().height+window.scrollY+"px"):(this.webcimesSelect.classList.remove("directionTop"),this.webcimesSelect.classList.add("directionBottom"),this.webcimesDropDown.classList.remove("directionTop"),this.webcimesDropDown.classList.add("directionBottom"),this.webcimesDropDown.style.top=t.bottom+window.scrollY+"px"),this.webcimesDropDown.style.left=t.left+window.scrollX+"px",this.webcimesDropDown.style.width=t.width+"px"}}destroyWebcimesDropDown(){this.webcimesDropDown&&(this.webcimesSelect.classList.remove("open"),this.webcimesDropDown.querySelector("input[name='search']").removeEventListener("input",this.eventSearchWebcimesDropDown),this.webcimesDropDown.removeEventListener("keydown",this.eventKeyboardWebcimesDropDown),window.removeEventListener("resize",this.eventResizeWebcimesDropDown),["click","keydown"].forEach((e=>{document.removeEventListener(e,this.eventDestroyWebcimesDropDown)})),this.webcimesDropDown.querySelectorAll(".option:not(.disabled)").forEach((e=>{e.removeEventListener("click",this.eventSelectOptionWebcimesDropDown)})),this.webcimesDropDown.remove(),this.webcimesDropDown=null,document.querySelector(".webcimesDropDown")||this.webcimesSelect.focus(),this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroyDropDown")),"function"==typeof this.options.onDestroyDropDown&&this.options.onDestroyDropDown())}eventSearchWebcimesDropDown(e){let t=new RegExp(e.target.value,"i"),s=Array.from(this.select.options).filter((e=>{if(""!==e.value&&(t.test(e.innerHTML)||t.test(e.value)))return e}));if(0==s.length&&this.options.searchTextNoResults){let e=document.createElement("option");e.classList.add("noResults"),e.innerHTML=this.options.searchTextNoResults,s.push(e)}this.setWebcimesDropDownOptions(s),this.setWebcimesDropDownPositionAndWidth(!0),this.webcimesSelect.dispatchEvent(new CustomEvent("onSearchDropDown")),"function"==typeof this.options.onSearchDropDown&&this.options.onSearchDropDown(e.target.value,s)}eventKeyboardWebcimesDropDown(e){if(e.target!=this.webcimesSelect){let t=this.webcimesDropDown.querySelector(".option.highlighted");if(t){let s=this.webcimesDropDown.querySelectorAll(".option:not(.disabled)"),i=Array.from(s).indexOf(t);"ArrowUp"!=e.key&&"ArrowDown"!=e.key||(e.preventDefault(),t.classList.remove("highlighted"),t=s["ArrowUp"==e.key?i-1>=0?i-1:0:i+1<=s.length-1?i+1:s.length-1],t.classList.add("highlighted"),t.scrollIntoView({behavior:"smooth",block:"nearest"})),"Enter"==e.key&&(e.preventDefault(),t.classList.remove("highlighted"),this.select.value=t.getAttribute("data-value"),this.setWebcimesSelectValue(),this.destroyWebcimesDropDown()),"Escape"==e.key&&(e.preventDefault(),this.destroyWebcimesDropDown())}}}eventResizeWebcimesDropDown(e){this.setWebcimesDropDownPositionAndWidth()}eventSelectOptionWebcimesDropDown(e){this.select.value=e.target.getAttribute("data-value"),this.setWebcimesSelectValue(),this.destroyWebcimesDropDown()}eventDestroyWebcimesDropDown(e){e.target.closest(".webcimesSelect")!=this.webcimesSelect&&e.target.closest(".webcimesDropDown")!=this.webcimesDropDown&&this.destroyWebcimesDropDown()}constructor(e){const t={element:null,setId:null,setClass:null,width:"auto",height:"auto",maxHeightOptions:"200px",style:null,placeholder:null,allowClear:!0,allowSearch:!0,searchAutoFocus:!0,searchPlaceholder:"Search",searchTextNoResults:"No results found",onInit:()=>{},onDestroy(){},onInitDropDown:()=>{},onDestroyDropDown:()=>{},onSearchDropDown:()=>{}};this.options={...t,...e},this.eventClearSelectedOptionsWebcimesSelect=this.eventClearSelectedOptionsWebcimesSelect.bind(this),this.eventKeyboardWebCimesSelect=this.eventKeyboardWebCimesSelect.bind(this),this.eventOpenCloseWebcimesDropDown=this.eventOpenCloseWebcimesDropDown.bind(this),this.eventSearchWebcimesDropDown=this.eventSearchWebcimesDropDown.bind(this),this.eventKeyboardWebcimesDropDown=this.eventKeyboardWebcimesDropDown.bind(this),this.eventResizeWebcimesDropDown=this.eventResizeWebcimesDropDown.bind(this),this.eventSelectOptionWebcimesDropDown=this.eventSelectOptionWebcimesDropDown.bind(this),this.eventDestroyWebcimesDropDown=this.eventDestroyWebcimesDropDown.bind(this),this.init()}init(){if(this.select=this.getHtmlElement(this.options.element),this.select){if(this.select.style.display="none",this.select.insertAdjacentHTML("afterend",`<div class="webcimesSelect ${this.options.setClass?this.options.setClass:""}" ${this.options.setId?`id="${this.options.setId}"`:""} ${"rtl"==this.select.getAttribute("dir")?'dir="rtl"':""} tabindex="0">\n\t\t\t\t\t<div class="text"></div>\n\t\t\t\t\t${this.options.allowClear?'<div class="clear"><div class="cross"></div></div>':""}\n\t\t\t\t\t<div class="arrow"></div>\n\t\t\t\t</div>`),this.webcimesSelect=this.select.nextElementSibling,this.options.placeholder||this.select.querySelector("option[value='']")&&(this.options.placeholder=this.select.querySelector("option[value='']").innerHTML),"auto"!=this.options.width&&this.options.width&&this.webcimesSelect.style.setProperty("width",this.options.width),"auto"!=this.options.height&&this.options.height&&this.webcimesSelect.style.setProperty("height",this.options.height),this.options.style){let e=this.webcimesSelect.getAttribute("style");this.webcimesSelect.setAttribute("style",e+this.options.style)}this.setWebcimesSelectValue(),this.webcimesSelect.querySelector(".clear")?.addEventListener("click",this.eventClearSelectedOptionsWebcimesSelect),this.webcimesSelect.addEventListener("keydown",this.eventKeyboardWebCimesSelect),this.webcimesSelect.addEventListener("click",this.eventOpenCloseWebcimesDropDown),setTimeout((()=>{this.webcimesSelect.dispatchEvent(new CustomEvent("onInit")),"function"==typeof this.options.onInit&&this.options.onInit()}),0)}}destroy(){this.webcimesSelect.querySelector(".clear")?.removeEventListener("click",this.eventClearSelectedOptionsWebcimesSelect),this.webcimesSelect.removeEventListener("keydown",this.eventKeyboardWebCimesSelect),this.webcimesSelect.removeEventListener("click",this.eventOpenCloseWebcimesDropDown),this.webcimesSelect.dispatchEvent(new CustomEvent("onDestroy")),"function"==typeof this.options.onDestroy&&this.options.onDestroy()}}return t})()));
//# sourceMappingURL=webcimes-select.udm.js.map