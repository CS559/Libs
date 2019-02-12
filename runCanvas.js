/*jshint esversion: 6 */
// @ts-check

/**
 *  Simple version of an auto-update slider to have looping time
 *
 * Designed for making quick UIs for CS559 demos
 */

 export function runCanvas(canvasName) {
    let step = 0.01;

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(canvasName));

    /**
     * https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
     * @param {HTMLElement} el 
     * @param {HTMLElement} referenceNode 
     */
    function insertAfter(el, referenceNode) {
	    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
	}

    let br = document.createElement("br");
    insertAfter(br,canvas);

    let range = document.createElement("input");
    range.id = canvasName + "-slider";
    range.setAttribute("type","range");
    range.style.width = String(canvas.width - 50 - 20);
    range.setAttribute("min","0");
    range.setAttribute("max","1");
    range.setAttribute("step",String(step));

    insertAfter(range,br);

    let text = document.createElement("input");
    text.id = canvasName+"-text";
    text.setAttribute("type","text");
    text.style.width = "50";
    text.setAttribute("readonly","1");
    insertAfter(text,br);

    let runbutton = document.createElement("input");
    runbutton.id=canvasName + "-run";
    runbutton.setAttribute("type","checkbox");
    runbutton.width=20;
    insertAfter(runbutton,br);

    function setValue(value) {
        let valString = String(value);
        range.value = valString;
        text.value = valString;
    }

    setValue(0.5);

    function advance() {
        let value = (Number(range.value) + step) % 1;
        setValue(value);
        if (runbutton.checked) {
            window.requestAnimationFrame(advance);
        }
    }
    runbutton.onchange = advance;
    range.oninput = function() {
        let val = Number(range.value);
        setValue(val);
    };

 }