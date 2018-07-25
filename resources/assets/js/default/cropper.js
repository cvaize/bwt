$('.js-image-input').on('change', function (cropperImageInput) {
    "use strict";
    var form = $(cropperImageInput).form;
    let image = document.getElementById('imageCropper');
    let cropperModal = $('#modalCropper');
    let cropper;
    let files = cropperImageInput.target.files;
    let done = function (url) {
        cropperImageInput.value = 'http://crm.demetrius.ru.s3.eu-central-1.amazonaws.com/avatars/2018/1526995034-f2b16b3b3c6d63354aa789a49a2ae24f.png';
        image.src = url;
        cropperModal.modal('show');
    };
    let reader;
    let file;

    if (files && files.length > 0) {
        file = files[0];

        if (URL) {
            done(URL.createObjectURL(file));
        } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
                done(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }


    cropperModal.on('shown.bs.modal', function () {
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 0,
        });
    }).on('hidden.bs.modal', function () {
        // cropper.destroy();
        cropper = null;
    });

    $('.js-cropper__buttons-success').on('click', function () {
        let canvas;

        cropperModal.modal('hide');

        if (cropper) {
            canvas = cropper.getCroppedCanvas({
                width: 600,
                height: 600,
            });

            canvas.toBlob(function (blob) {
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    let base64data = reader.result;
                    $('.w-100').attr('src', base64data);
                    let base64input = $('.js-image-base64');
                    base64input.val(base64data);
                    base64input.closest('form').submit();
                }
            });
        }
    });
});

