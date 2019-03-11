/*jshint esversion: 6 */
// @ts-check

// useful utility function for creating HTML
/**
 * https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
 * inserts an element after another element (referenceNode)
 * @param {HTMLElement} el 
 * @param {HTMLElement} referenceNode 
 */
export function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

// allow for flexible insertion
export function insertElement(el, where) {
    if (!where) {
        console.log("Warning: appending element to end of body because WHERE can't figure out a better place");
        document.body.appendChild(el);
    } else if (where.appendChild) {
        where.appendChild(el);
    } else if (where.after) {
        insertAfter(el,where.after);
    } else if (where.end) {
        where.end.appendChild(el);
    } else {
        console.log("Warning: appending element to end of body because WHERE can't figure out a better place");
        document.body.appendChild(el);
    }
}

/**
 * 
 * @param {String} str 
 * @param {Object | HTMLElement} [where] 
 * @param {String} [label] 
 */
export function makeCheckbox(str,where,label=undefined) {
    label = label ? label : str;

    let safename = str.replace(/ /g,str);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.id = "check-"+safename;
    insertElement(checkbox,where);

    let checklabel = document.createElement("label");
    checklabel.setAttribute("for","check-"+safename);
    checklabel.innerText = label;
    insertAfter(checklabel,checkbox);

    return checkbox;
}

export function makeButton(str,where) {
    let safename = str.replace(/ /g,str);

    let button = document.createElement("button");
    button.innerHTML = str;
    insertElement(button,where);

    return button;
}

export function makeBoxDiv(params,where) {
    if (!params) params = {};

    if (!params.margin) params.margin = 5;
    if (!params.padding) params.padding = 5;

    let style = `border:2px solid black; padding:${params.padding}px; margin:${params.margin}px; border-radius:5px`;

    if (params.width) style += `; width:${Number(params.width) - 2*params.margin}px`;

    console.log(style);

    let div = document.createElement("div");
    div.setAttribute("style",style);
    insertElement(div,where);
    return div;
}

export function makeFlexDiv(where) {
    let style = "display: flex; flex-direction: row;";
    let div = document.createElement("div");
    div.setAttribute("style",style);
    insertElement(div,where);
    return div;
}

export function makeOutbox(str,where, label) {
    label = label ? label : str;

    let safename = str.replace(/ /g,str);

    let text = document.createElement("input");
    insertElement(text,where);
    text.id = name+"-text";
    text.setAttribute("type","text");
    text.style.width = "50px";
    text.setAttribute("readonly","1");

    let checklabel = document.createElement("label");
    checklabel.setAttribute("for","check-"+safename);
    checklabel.innerText = label;
    insertAfter(checklabel,text);

    return text;

}