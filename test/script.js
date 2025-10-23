// Import webcimes-select
import { createWebcimesSelect } from '../dist/js/webcimes-select.esm.js';

// Wait for dom content loaded
document.addEventListener('DOMContentLoaded', function () {
    let selectCity = createWebcimesSelect({
        element: document.querySelector("select[name='city']"),
        keepOpenDropdown: true,
        // allowSearch: false,
        language: 'fr',
        onInit() {
            console.log('onInit');
        },
        onDestroy() {
            console.log('onDestroy');
        },
        onInitDropdown() {
            console.log('onInitDropdown');
        },
        onDestroyDropdown() {
            console.log('onDestroyDropdown');
        },
        onSearchDropdown(value, options) {
            console.log('onSearchDropdown');
            console.log(value);
            console.log(options);
        },
        // onChange(value, selected, selectedOptions){
        //     console.log("onChange");
        //     console.log(value);
        //     console.log(selected);
        //     console.log(selectedOptions);
        // },
        // onAddOption(value){
        //     console.log("onAddOption");
        //     console.log(value);
        // },
        // onRemoveOption(value){
        //     console.log("onRemoveOption");
        //     console.log(value);
        // },
        // onRemoveAllOptions(){
        //     console.log("onRemoveAllOptions");
        // },
    });
    selectCity.select.addEventListener('onSearchDropdown', (e) => {
        console.log('onSearchDropdown');
        console.log(e.detail.value);
        console.log(e.detail.options);
    });
    // selectCity.select.addEventListener("onChange", (e) => {
    //     console.log("onChange");
    //     console.log(e.detail.value);
    //     console.log(e.detail.selected);
    //     console.log(e.detail.selectedOptions);
    // });
    selectCity.nativeSelect.addEventListener('input', (e) => {
        console.log('onChange');
        console.log(e.target.value);
    });

    let selectCity2 = createWebcimesSelect({
        element: document.querySelector("select[name='city2']"),
    });

    selectCity2.nativeSelect.addEventListener('input', (e) => {
        console.log('onChange');
        console.log(e.target.value);
    });
});
