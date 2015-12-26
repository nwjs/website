
$(document).ready(function(){
    $.get("_markup/quickstart.md", function (data) {
        //use "marked" plugin to convert markdown to html and embed on page.
        $(".content").html( marked(data) );

        //Code syntax highlighting
        hljs.initHighlighting();
    });
});
