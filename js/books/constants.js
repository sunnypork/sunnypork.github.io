const BOOKS = [
    {
        id: "growing-up",
        name: "Growing Up",
        preview: "../img/books/growing-up.png",
        description: "This page is currently under construction but when it is finished it will look amazzing with all my books!!!!!!",
        pdf: "../pdf/growing-up.pdf",
    },
    {
        id: "for-a-child",
        name: "For: A Child Who is Scared to Grow Up",
        preview: "../img/books/for-a-child.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac efficitur lorem, vel tempor lacus. Integer id aliquam lectus, quis tempor sem. Sed eu laoreet risus, ac maximus velit. Etiam dui nisi, auctor lobortis sem aliquam, auctor egestas tellus. Sed non lacus vitae eros luctus varius. Ut id placerat erat. Quisque eget libero ligula. Pellentesque nec nibh felis.",
        pdf: "../pdf/for-a-child.pdf",
    },
    {
        id: "growth",
        name: "Growth",
        preview: "../img/books/growth/korean-melon.jpg",
        description: "This page is currently under construction but when it is finished it will look amazzing with all my books!!!!!!",
        pdf: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    }
];

$.modal.defaults = {
    closeExisting: true,
    escapeClose: true,
    clickClose: true,
    showClose: true,
    fadeDuration: 200,
    fadeDelay: 0.8,
};