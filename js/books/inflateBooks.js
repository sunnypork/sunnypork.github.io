function createPDFModal(book) {
    const {id} = book;
    const $modal = $(`
        <div class="modal">
            <div class="modal-nav-container loading">
                <div class="prev modal-nav"></div>
                <div class="next modal-nav"></div>
            </div>
            <div>
                <span><span class="page-num">???</span> / <span class="page-count">???</span></span>
            </div>
            <div class="loader"></div>
            <canvas></canvas>
        </div>`);
    $modal.attr("id", id);
    return $modal;
}


function createDescription(book) {
    const $title = $('<h3></h3>');
    $title.text(book.name);
    const $description = $('<p></p>');
    $description.append($title, book.description);
    return $description;
}

function createPreview(book) {
    const {id, name, preview} = book;
    const $img = $('<img alt="" src="">');
    $img.attr("alt", name);
    $img.attr("src", preview);
    const $a = $('<a class="center-elements" rel="modal:open"></a>');
    $a.attr("href", `#${id}`);
    $a.append($img);
    return $a;
}

function createEntry(book, swap) {
    const $div = $('<div></div>');
    let [left, right] = [
        createPreview(book),
        createDescription(book),
    ];
    if (swap) {
        [right, left] = [left, right];
    }
    $div.append(createPDFModal(book), left, right);
    return $div;
}

function createEntries(books) {
    const $container = $('#entries');
    for (let i = 0; i < books.length; i = i + 1) {
        $container.append(createEntry(books[i], i % 2));
    }
}

function init() {
    createEntries(BOOKS);
}

$(init);
