function getNthPosition(el){
    var previousEl = el.previousElementSibling,
        count = 1,
        result = '';

    while(previousEl){
        ++count;
        previousEl = previousEl.previousElementSibling;
    }
    result = ':nth-child(' + count + ')';

    return result;
}

//получаение элементов страницы
function eachElements(el, arr){
    if(el === document.body) {
        return arr.reverse();
    }
    arr.push(el.tagName.toLowerCase() + getNthPosition(el));

    return eachElements(el.parentElement, arr);
}

function getPath(currEl){
	var arr = [];
    var strOut = '';
    
    strOut = eachElements(currEl, arr).join('>');

	return strOut;
}
