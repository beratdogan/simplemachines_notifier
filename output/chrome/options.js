KangoAPI.onReady(function() {

    var currentTimeout = kango.storage.getItem('sm_refreshtimeout');

    $('#refresh-timeout').val(currentTimeout);

    $('#save').click(function(event) {
        var input = parseInt($('#refresh-timeout').val());

        if (isNaN(input)) {
            alert('Upss!');
        }
        else {
            kango.storage.setItem('sm_refreshtimeout', input);

            alert('Settings saved!');
        }
    });

    $('#close').click(function(event) {
            KangoAPI.closeWindow();
    });

});