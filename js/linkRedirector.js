const onLinkClick = (event) => {
    // This just forces links to open in a new tab
    event.preventDefault();
    const href = $(event.target).attr("href");
    href && window.open(href);
};

$(() => $("a").on('click', onLinkClick));
