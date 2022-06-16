// Loaded via <script> tag, create shortcut to access PDF.js exports.
const pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.13.216/build/pdf.worker.js';

class PDF {

    pdfDoc = null;
    pageNum = 1;
    pageRendering = false;
    pageNumPending = null;
    context;

    constructor(id, url) {
        const $container = $(`#${id}`);
        const $canvas = $container.find('canvas');
        this.context = $canvas[0].getContext('2d');
        $container.find(".prev").on('click', this.onPrevPage($container));
        $container.find(".next").on('click', this.onNextPage($container));

        pdfjsLib.getDocument(url).promise.then((pdfDoc) => {
            this.pdfDoc = pdfDoc;
            $container.find(".page-count").text(pdfDoc.numPages);
            if (pdfDoc.numPages > 1) {
                $container.addClass("can-next");
            }
            this.queueRenderPage(this.pageNum, $container);
            $(window).resize(() => this.queueRenderPage(this.pageNum, $container))
        });
    }

    queueRenderPage(num, $container) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num, $container);
        }
        $container.find('.page-num').text(num);
    }

    onPrevPage = ($container) => () => {
        if (this.pageNum <= 1) {
            return;
        }
        if (this.pageNum === this.pdfDoc.numPages) {
            // add class
            $container.addClass("can-next");
        }
        this.pageNum--;
        if (this.pageNum <= 1) {
            // remove class
            $container.removeClass("can-prev");
        }
        this.queueRenderPage(this.pageNum, $container);
    };

    onNextPage = ($container) => () => {
        if (this.pageNum >= this.pdfDoc.numPages) {
            return;
        }
        if (this.pageNum === 1) {
            // add class
            $container.addClass("can-prev");
        }
        this.pageNum++;
        if (this.pageNum >= this.pdfDoc.numPages) {
            // remove class
            $container.removeClass("can-next");
        }
        this.queueRenderPage(this.pageNum, $container);
    };

    renderPage(num, $container) {
        this.pageRendering = true;
        // Using promise to fetch the page
        this.pdfDoc.getPage(num).then((page) => {
            const [,, width] = page.view;
            const scale = Math.min(($(window).width() * 0.5) / width, 1);
            const viewport = page.getViewport({scale});
            this.context.canvas.height = viewport.height;
            this.context.canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: this.context,
                viewport
            };

            page.render(renderContext).promise.then(() => {
                this.pageRendering = false;
                if (this.pageNumPending !== null) {
                    // New page rendering is pending
                    this.renderPage(this.pageNumPending, $container);
                    this.pageNumPending = null;
                }
            });
        });
    }
}


function init() {
    BOOKS.forEach((book) => new PDF(book.id, book.pdf));
}

$(init);
