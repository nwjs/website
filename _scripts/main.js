
$(document).ready(function(){

    $.get("../_markup/header.html", function (headerData) {
        $("header").html(headerData);
    });

    $.get("../_markup/footer.html", function (footerData) {
        $("footer").html(footerData);
    });

});
