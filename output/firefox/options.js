KangoAPI.onReady(function() {
    var current;
    var fields = {
        'refresh_timeout': 'integer',
        'redirect_url': 'string'
    };

    // Load currents.
    $.each(fields, function (field, type)
    {
        current = kango.storage.getItem('sm_' + field);

        if (current != '') {
            $('#' + field).val(current);
        }
    });

    // Trigger when clicked Save button.
    $('#save').click(function (event)
    {
        $.each(fields, function(field, type)
        {
            var input = $('#' + field).val();

            if (type == 'integer') {
                input = parseInt(input);

                if (isNaN(input)) {
                    alert('Please check your input!');

                    return;
                }
            }
            else if (type == 'integer') {
                input = input;
            }

            kango.storage.setItem('sm_' + field, input);
        });

        alert('Setting saved!');
    });

    // The game is over, everyone go home.
    $('#close').click(function (event) {
        KangoAPI.closeWindow();
    });

});