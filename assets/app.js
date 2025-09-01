
console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

// any CSS you import will output into a single css file (app.css in this case)
// import './styles/app.css';

// start the Stimulus application

import 'bootstrap';
import '@digitaluc/uc-kitdigital/dist/js/uc-kitdigital';
import './styles/app.scss';

// this "modifies" the jquery module: adding behavior to it
// the bootstrap module doesn't export/return anything

window.addEventListener("load", function () {
    $(".loader").fadeOut("slow");
});

$(function () {
    $("form").on("submit", function () {
        $("#loader").show();
    });
});
