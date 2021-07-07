let bottom = 0;

const getVideoId = (link) => {
    const {searchParams} = new URL(link);
    return searchParams.get("v");
};

const createVideoIframe = ({id, title, width, height}) => {
    const $iframe = $('<iframe class="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $iframe.attr("width", width);
    $iframe.attr("height", height);
    $iframe.attr("title", title);
    $iframe.attr("src", `https://www.youtube.com/embed/${id}`);
    $iframe.attr("id", id);
    return $iframe;
};

const createPreview = (id) => {
    const $img = $(`<img class="preview" src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="preview"/>`);
    $img.data("id", id);
    return $img;
};

const insertVideo = (link) => {
    return new Promise((resolve) => {
        const videoSizeFactor = randomFloat(VIDEO_MIN_SIZE_FACTOR, VIDEO_MAX_SIZE_FACTOR);
        const width = Math.round(BASE_WIDTH * videoSizeFactor);
        const height = Math.round(BASE_HEIGHT * videoSizeFactor);
        const title = "A Video";
        const id = getVideoId(link);
        const $iframe = createVideoIframe({id, title, width, height});
        const $preview = createPreview(id);
        $("body").append($iframe, $preview);
        $iframe.one("load", () => {
            resolve(onVideoLoad($iframe, $preview, height, width));
        });
    });
};

const onVideoLoad = ($iframe, $preview, heightPx, widthPx) => {
    return new Promise((resolve) => {
        const leftPx = random(X_AXIS_MARGIN, $(window).width() - widthPx - X_AXIS_MARGIN);
        const topPx = bottom + random(NEXT_VIDEO_MIN_DELTA, NEXT_VIDEO_MAX_DELTA);
        bottom = topPx + heightPx;

        const top = `${topPx}px`;
        const left = `${leftPx}px`;
        const height = `${heightPx}px`;
        const width = `${widthPx}px`;

        $iframe.css({
            left,
            top,
        });
        $preview.css({
            left,
            top,
            height,
            width,
            zIndex: 999,
        });
        $preview.fadeIn("slow");
        resolve();
    });
};

const insertVideos = () => {
    return shuffleArray(VIDEOS).map(insertVideo);
};

const onVideoEnter = (event) => {
    const $target = $(event.target);
    $target.css({pointerEvents: "none"});
    $target.fadeOut("slow");
    const id = $target.data("id");
    $target.parent().find(`#${id}`).show();
};

const init = () => {
    insertVideos();
    $(".preview").on("mouseenter", onVideoEnter);
};

$(init);
