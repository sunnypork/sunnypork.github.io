// This is TERRIBLE CODE
// Please don't look at it
const onButtonClick = (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();

    clearTimeout(buttonEventsTimeout);

    const $target = $(event.target);
    const delay = ON_CLICK_DELAY_SECONDS * 1000;
    const transition = `${delay}ms ease-in-out`;

    const $window = $(window);
    const $parent = $target.parent();

    $target.stop(true);
    $parent.stop(true);

    const grandparentPos = $parent.parent().position();
    $parent.css({
        zIndex: 999
    });
    $target.css({
        width: $window.width() * 2,
        height: $window.height() * 2,
        transition,
    });
    $parent.css({
        top: - grandparentPos.top - ($window.height() / 2),
        left: - grandparentPos.left - ($window.width() / 2),
        transition,
    })

    setTimeout(() => {
        window.location.href = $target.data("href");
    }, delay);
};

const initRedirector = () => {
    $(".menu-button").on('click', onButtonClick);
};

$(initRedirector);
