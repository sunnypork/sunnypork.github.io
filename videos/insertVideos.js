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

const createPreview = (id, preview) => {
    const previewLink = preview ? preview : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    const $img = $(`<img class="preview" src="${previewLink}" alt="preview"/>`);
    $img.data("id", id);
    return $img;
};

const createShadow = ({height, width}, position) => {
    const $shadow = $('<div class="shadow"></div>');
    $shadow.css({
        top: `${position.top}px`,
        left: `${position.left}px`,
        height, width
    });
    return $shadow;
};

const calculateSize = () => {
    const videoSizeFactor = randomFloat(VIDEO_MIN_SIZE_FACTOR, VIDEO_MAX_SIZE_FACTOR);
    let dynamicSizeFactor = 1;
    while (BASE_WIDTH * videoSizeFactor * dynamicSizeFactor > $(window).width()) {
        dynamicSizeFactor = dynamicSizeFactor / WIDTH_OVERFLOW_FACTOR;
    }
    const width = Math.round(BASE_WIDTH * videoSizeFactor * dynamicSizeFactor);
    const height = Math.round(BASE_HEIGHT * videoSizeFactor * dynamicSizeFactor);
    return {width, height};
};

const getVideoPosition = ({height, width}) => {
    const left = random(X_AXIS_MARGIN, $(window).width() - width - X_AXIS_MARGIN);
    const top = bottom + random(NEXT_VIDEO_MIN_DELTA, NEXT_VIDEO_MAX_DELTA);
    bottom = top + height;
    return {top, left};
};

const insertVideo = (video) => {
    return new Promise((resolve) => {
        const {width, height} = calculateSize();
        const {link, preview} = typeof video === "string" ? {link: video} : video;
        const title = "A Video";
        const id = getVideoId(link);
        const $iframe = createVideoIframe({id, title, width, height});
        const $preview = createPreview(id, preview);
        const position = getVideoPosition({height, width});
        const $shadow = createShadow({height, width}, position);
        $("body").append($iframe, $preview, $shadow);
        $shadow.fadeIn("slow");
        $iframe.one("load", () => {
            resolve(onVideoLoad($iframe, $preview, {height, width}, position));
        });
    });
};

const onVideoLoad = ($iframe, $preview, size, position) => {
    return new Promise((resolve) => {
        const top = `${position.top}px`;
        const left = `${position.left}px`;
        const height = `${size.height}px`;
        const width = `${size.width}px`;

        $iframe.css({
            left,
            top,
        });
        $preview.css({
            left,
            top,
            height,
            width,
        });
        $preview.fadeIn("slow");
        resolve();
    });
};

const onVideoEnter = (event) => {
    const $target = $(event.target);
    $target.css({pointerEvents: "none"});
    $target.fadeOut("slow");
    const id = $target.data("id");
    $target.parent().find(`#${id}`).show();
};

const init = () => {
    Promise.all(shuffleArray(VIDEOS).map(insertVideo))
        .then(() => {
            $(".preview").on("mouseenter", onVideoEnter);
            const height = bottom + random(NEXT_VIDEO_MIN_DELTA, NEXT_VIDEO_MAX_DELTA);
            $("body").css({height});
        });
};

$(init);
