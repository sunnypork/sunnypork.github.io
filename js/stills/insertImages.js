let bottom = 0;

const insertImage = (src) => {
    return new Promise((resolve) => {
        const $img = $(`<img class="still" src="${src}" alt="still"/>`);
        $('body').append($img);
        $img.one("load", () => {
            resolve(onImageLoad($img));
        });
    });
};

const onImageLoad = ($img) => {
    return new Promise((resolve) => {
        // TODO handle case where image is wider than screen
        const width = $img.width();
        const height = $img.height();
        const left = random(X_AXIS_MARGIN, $(window).width() - width - X_AXIS_MARGIN);
        const top = bottom + random(NEXT_IMAGE_MIN_DELTA, NEXT_IMAGE_MAX_DELTA);
        bottom = top + height;
        $img.css({
            left: `${left}px`,
            top: `${top}px`,
        });
        $img.fadeIn("slow");
        resolve();
    });
};

const insertImages = (images) => {
    return images.map(insertImage);
};

const insertRandomImages = () => {
    const images = shuffleArray(IMAGES);
    return insertImages(images);
};

const atBottomOfPage = () => {
    const $window = $(window);
    const scrollHeight = $(document).height();
    const scrollPosition = $window.height() + $window.scrollTop();
    return (scrollHeight - scrollPosition) / scrollHeight === 0;
}

const fillPage = () => {
    Promise.all(insertRandomImages()).then(() => {
        if (atBottomOfPage()) {
            fillPage();
        }
    });
}

const initInfiniteScroll = () => {
    const $window = $(window);
    $window.on("scroll", function() {
        if (atBottomOfPage()) {
            insertRandomImages();
        }
    });
}

const init = () => {
    fillPage();
    initInfiniteScroll();
};

$(init);
