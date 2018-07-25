'use strict';

$('.js-autocomplete').each(function () {
    let elem = $(this);
    let source = elem.data('source');
    let name = elem.attr('name');
    let elementWithId = $('[name="' + elem.data('targetId') + '"]');
    let form = elem.closest('form');
    elem.autocomplete({
        source: source,
        minLength: 2,
        select: function (event, ui) {
            console.log(elementWithId);
            elementWithId.val(ui.item.value);
            elem.val(ui.item.value);
            if (elem.hasClass('js-on-change-submit')) {
                form.submit();
            }
            // console.log("Selected: " + ui.item.value + " aka " + ui.item.id, elem);
        },
    });
});
