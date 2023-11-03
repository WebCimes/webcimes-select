// Import webcimes-select
import {WebcimesSelect} from "../dist/js/webcimes-select.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    let selectCity = new WebcimesSelect({
        element: document.querySelector("select[name='city']"),
        keepOpenDropdown: true,
        onInit(){
            console.log("onInit");
        },
        onDestroy(){
            console.log("onDestroy");
        },
        onInitDropdown(){
            console.log("onInitDropdown");
        },
        onDestroyDropdown(){
            console.log("onDestroyDropdown");
        },
        onSearchDropdown(value, options){
            console.log(value);
            console.log(options);
            console.log("onSearchDropdown");
        },
        onAddOption(value){
            console.log(value);
            console.log("onAddOption");
        },
        onRemoveOption(value){
            console.log(value);
            console.log("onRemoveOption");
        },
        onRemoveAllOptions(){
            console.log("onRemoveAllOptions");
        },
    });

    let selectCity2 = new WebcimesSelect({
        element: document.querySelector("select[name='city2']"),
    });
});