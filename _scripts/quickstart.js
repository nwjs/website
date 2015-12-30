
$(document).ready(function(){
    //Get the content for the Vanilla Quick Start Instructions
    $.get("_markup/quickstart.md", function (qsData) {
        //use "marked" plugin to convert markdown to html and embed on page.
        $("#qs-vanilla").html( marked(qsData) );

        //Get the content for the Node.js Quick Start Instructions
        $.get("_markup/quickstartnode.md", function (qsnData) {
            //use "marked" plugin to convert markdown to html and embed on page.
            $("#qs-node").html( marked(qsnData) );

            //Code syntax highlighting for both of the above
            hljs.initHighlighting();

            function updateInstructionsVisibility () {
                //Hide both sections
                $("#qs-vanilla, #qs-node").hide();

                //Get the values of what the user has selected
                var instructions = $(".instructions-group input:checked").val();

                if (instructions == "vanilla") {
                    $("#qs-vanilla").show();
                } else if (instructions == "node") {
                    $("#qs-node").show();
                } else {
                    //Show both instructions as a fallback
                    $("#qs-vanilla, #qs-node").show();
                }
            }

            //When you switch between vanilla and node
            $(".radio-group input").change(updateInstructionsVisibility);
            //Click vanilla on page load
            $('label[for="vanilla"]').click();
        });
    });
});
