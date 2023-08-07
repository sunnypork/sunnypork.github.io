$.modal.defaults = {
    closeExisting: true,
    escapeClose: true,
    clickClose: true,
    showClose: true,
    fadeDuration: 200,
    fadeDelay: 0.8,
};

function init() {
    $(document).on($.modal.BEFORE_BLOCK, function() {
        history.pushState(null, null, "#book");
        $(document).one($.modal.CLOSE, function () {
            history.back();
        });
        $(window).one('hashchange', function() {
            $(document).off($.modal.CLOSE);
            $.modal.close();
        });
    });
}

$(init);
