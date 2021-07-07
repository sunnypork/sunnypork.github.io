const ON_LAND_DELAY_SECONDS = 0.5;

const onButtonClick = (event) => {
    // This just forces links to open in a new tab
    event.preventDefault();
    window.open($(event.target).attr("href"));
};

const init = () => {
    const delay = ON_LAND_DELAY_SECONDS * 1000;
    const transition = `${delay}ms ease-in-out`;
    $(".link").on('click', onButtonClick);
    $("#page").css({
        opacity: 1,
        transition,
    });
};

$(init);
