(function ($) {
    'use strict';

    const CONTACT_FORM_SELECTOR = '.cm-form';
    const MESSAGE_CONTAINER_SELECTOR = '.contact__msg';
    const MESSAGE_DISPLAY_DURATION = 2000;

    /**
     * Handle successful form submission
     */
    function handleSuccess(response, form) {
        const message = $(MESSAGE_CONTAINER_SELECTOR);
        message.fadeIn()
            .removeClass('alert-danger')
            .addClass('alert-success')
            .text(response);
        
        setTimeout(() => message.fadeOut(), MESSAGE_DISPLAY_DURATION);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    /**
     * Handle failed form submission
     */
    function handleFailure(data) {
        const message = $(MESSAGE_CONTAINER_SELECTOR);
        message.fadeIn()
            .removeClass('alert-success')
            .addClass('alert-danger')
            .text(data.responseText);
        
        setTimeout(() => message.fadeOut(), MESSAGE_DISPLAY_DURATION);
    }

    /**
     * Initialize contact form handler
     */
    function initContactForm() {
        const form = $(CONTACT_FORM_SELECTOR);
        if (!form.length) return;

        form.on('submit', function (e) {
            e.preventDefault();
            
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form.serialize()
            })
            .done((response) => handleSuccess(response, form))
            .fail(handleFailure);
        });
    }

    // Initialize on document ready
    initContactForm();

})(jQuery);
