// Import webcimes-select
import {WebcimesSelect} from "../dist/js/webcimes-select.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    let selectCity = new WebcimesSelect({
        element: document.querySelector("select[name='city']"),
        // width: "200px",
        // height: "100px",
        searchAutoFocus: false,
        onInit(){
            console.log("init");
        },
        onDestroy(){
            console.log("destroy");
        },
        onInitDropDown(){
            console.log("onInitDropDown");
        },
        onDestroyDropDown(){
            console.log("onDestroyDropDown");
        },
        onSearchDropDown(value, options){
            console.log(value);
            console.log(options);
            console.log("onSearchDropDown");
        },
        onSetValue(value){
            console.log(value);
            console.log("onSetValue");
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