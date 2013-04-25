$(function() {

var add_events = (function () {
    $(".products tr").on("click", function () {
        var id = $(this).find("td:first").text();
        var url = "product.aspx?id=" + id;
        $.get(url, ajax_loaded);

        past_url = url;
    });
});

var ajax_loaded = (function (response) {

    $("#content").slideUp(
        500,
        function () {
            $("#content")
                .html(response)
                .slideDown(500);


        }
    );
});


$("#menu a").on("click", function (e) {
    e.preventDefault();

    var url = $(this).attr("href");

        $.get(url, ajax_loaded);

});

});











