
//Initializes the highlight.js code

function findCode(pre) {
    var node = pre.firstChild;
    return (node.nodeName == 'CODE' && node.className) ? node : false;
}

addEventListener('load', function() {
    Array.prototype.map.call(document.getElementsByTagName('pre'), findCode).
        filter(Boolean).
        forEach(function(code){hljs.highlightBlock(code);});
}, false);
