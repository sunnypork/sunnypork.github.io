// This is TERRIBLE CODE
// Please don't look at it
const onButtonClick = (event) => {
    event.preventDefault();
    console.log("On Button Click")

    clearTimeout(buttonEventsTimeout);

    const $target = $(event.target);
    const delay = ON_CLICK_DELAY_SECONDS * 1000;
    const transition = `${delay}ms ease-in-out`;

    const $window = $(window);
    const $parent = $target.parent();
    const $a = $target.find("a");

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
    });
    $a.fadeOut("fast");

    setTimeout(() => {
        window.location.href = $a.attr("href");
    }, delay);
};

// This probably isn't the **correct** way to do this
const onLinkClick = (event) => {
    event.stopPropagation();
    event.target = $(event.target).parent();
    onButtonClick(event);
};

const initRedirector = () => {
    $("a").on('click', onLinkClick);
    $(".menu-button").on('click', onButtonClick);
};

$(initRedirector);
