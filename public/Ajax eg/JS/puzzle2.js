$(function(){
            $(".piece").draggable({ revert: "invalid" });
             $(".holder").each(function() {
            $(this).droppable( {
                 accept: "#i" + $(this).attr('id').substring(1),
                drop: function() {
                    var audio = $("#cheers")[0];
                    var picurl = "Pics/i" + $(this).attr('id').substring(1) + ".png";
                    $("#i" + $(this).attr('id').substring(1)).hide();
                    $(this).css('background-image', 'url("'+ picurl +'")');
                    audio.play();
                }
                
            });

    });
});