const onLinkClick = (event) => {
    // This just forces links to open in a new tab
    event.preventDefault();
    window.open($(event.target).attr("href"));
};

$(() => $("a").on('click', onLinkClick));
