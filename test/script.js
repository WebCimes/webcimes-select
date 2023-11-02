// Import webcimes-select
import {WebcimesSelect} from "../dist/js/webcimes-select.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    let selectCity = new WebcimesSelect({
        element: document.querySelector("select[name='city']"),
        // width: "200px",
        // height: "100px",
        // searchAutoFocus: false,
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
    let selectTown = new WebcimesSelect({
        element: document.querySelector("select[name='town']"),
        searchAutoFocus: true,
        // beforeDestroy: () => {
        //     console.log("destroy modal 1");
        // },
        beforeDestroy(){
            console.log("destroy modal 1");
        },
    });
    // document.addEventListener("click", () => {
    //     selectCity.destroy();
    // });
});