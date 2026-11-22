import { createWebcimesSelect } from '../dist/js/webcimes-select.esm.js';

createWebcimesSelect({
    element: '#demo-select',
    allowSearch: true,
    allowClear: true,
    placeholderText: 'Choose destinations',
});
