const submitForm = function(event) {
    event.preventDefault();

    let formData = $(this).serialize(); // form data as string
    let formAction = $(this).attr('action'); // form handler url
    let formMethod = '';
    if($(this).find('[name="_method"]').length > 0){
        formMethod = $(this).find('[name="_method"]').first().val();
    }else{
        formMethod = $(this).attr('method'); // GET, POST
    }

    $.ajax({
        type  : formMethod,
        url   : formAction,
        data  : formData,
        cache : false,

        beforeSend : function() {
        },

        success : function(data) {
            console.log(data);
            if(!data){
                return;
            }
            if(data.text){
                if(data.type){
                    alertify.notify(data.text, data.type);
                }else{
                    alertify.message(data.text);
                }
            }
            if(data.replace){
                $(data.replace.selector).html(data.replace.html);
                unInit();
                init();
            }
        },

        error : function() {

        }
    });

    // console.log(formData);

    return false; // prevent send form
};
const init = function(){
    $('form.js-ajax').on('submit', submitForm);
};
const unInit = function(){
    $('form.js-ajax').unbind('submit', submitForm);
};
init();

$('.js-mask-phone').mask('+0(000)000-00-00');

$('.js-datepicker').datepicker({
    format: "yyyy.mm.dd",
    autoclose: true,
});

