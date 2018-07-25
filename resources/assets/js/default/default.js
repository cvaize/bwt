initFormsJs();

function initFormsJs() {
    // File input
    $('.js-custom-file-input').off('change').on('change', function () {
        let path = $(this).val();
        var filename = path.replace(/\\/g, '/').replace(/.*\//, '');
        $(this).next('.custom-file-label').addClass("selected").html(filename);
    });


    $(".js-on-submit-ajax").off('submit').on('submit', function () {
        console.log('Form submitted');
        var formData = $(this).serialize();
        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var target = $(this).data('target');
        var command = $(this).data('command');
        var attributes = $(this).data();
        $.ajax({
            type: method,
            url: action,
            data: formData,
            async: true,
            success: function (data) {
                console.log(data);
                console.log('target: ', target);
                console.log('command: ', command);

                if (data.data && target && command) {
                    switch (command) {
                        case 'before': {
                            $("[" + target + "]").before(data.data);
                        }
                            break;
                        case 'after': {
                            $("[" + target + "]").after(data.data);
                        }
                            break;
                        case 'replace': {
                            console.log('replace');
                            $("[" + target + "]").after(data.data).remove()
                        }
                            break;
                    }
                    initAjax();
                }

                if (command && command === 'remove') {
                    $("[" + target + "]").remove();
                }

                if (data.type
                    && data.text) {
                    popupMsg(data.type, data.text);
                }

                if (data.console) {
                    console.log(data.console);
                }

                if (method && method === 'GET') {
                    history.pushState(formData, document.title, window.location.pathname + '?' + formData);
                    initAjax();
                }

            },
            error: function (data) {
                console.log(data);
            }
        });
        return false;
    });

    $('.js-on-change-submit').off('change').on('change',function(){
        console.log('Form changed');
        "use strict";
        $(this).submit();
    });
}

var popupMsg = function (type,text) {
    toastr[type](text);
};