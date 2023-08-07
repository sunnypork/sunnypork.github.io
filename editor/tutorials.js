const BEGINNER = `# Beginner
These are the most basic features in Markdown!

# Headers
Headers are usually used to denote a new section. The header from the top of this page looks like this:

# Example Header!

While there are usually different sizes of header in Markdown[^1], on _this_ website, the default setting is for all headers to come out as the same size, and for only the single \`#\` header to have the horizontal line below it.

# Text

Text can be _italic_, **bold**, ~~struck~~, or \`mono-spaced\`. To create a new paragraph...

... just add space between the lines.
Normally, if you add text to the next line in the markdown,
it will still show up on the same line in the final text.

However, if you add two spaces to the end of a line${"  "}
the next line you write will show up on a newline.


# Lists

There are unordered lists:

- An item
- Another item
- A final item

And ordered lists:

1. The first item
2. The second item
3. The third item

You can also have lists in lists

1. First an unordered list
   - An item
      - Another nested item!!!
   - Another item
2. And then an ordered list
   1. One thing
   2. Another thing

# Links

[This is a link](https://en.wikipedia.org/wiki/Markdown).
To link to a file on your website, you refer to it by its relative path!

So another file in the same folder as this file would be linked to [like this](./index.md).
And _if_ there was a file in a subfolder in this folder, it would be linked to [like this](./folder/foo.txt).
Finally, _if_ you were linking to a file in a folder that contains this folder, it would be linked to [like this](../foo.txt).

# Images

To add an image, just link it, but with a \`!\` at the beginning.

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/2560px-Markdown-mark.svg.png)

That text in the square brackets important! If a visually impaired person comes to your site, they will rely on that text to know what's in the picture. Furthermore, if the image doesn't load properly, that's what all your visitors will see

![Image that does not exist](foo.png)

# Blockquotes

Quotations can be created with the \`>\` character

> Markdown is a lightweight markup language for creating formatted text using a plain-text editor.
>
> John Gruber created Markdown in 2004 as a markup language that is appealing to human readers in its source code form. Markdown is widely used in blogging, instant messaging, online forums, collaborative software, documentation pages, and readme files.

# Codeblocks

Using the triple backtick, you can create a section that will not render _as it is written_ and in monospace
\`\`\`
- Not a list item
[not](a link)
_not italic_
\`\`\`

[^1]: _Usually_, the more \`#\` at the beginning the smaller


`;
const INTERMEDIATE = `# Intermediate

You're much less likely to need these features

# Tables

Tables can be arbitrarily long, and arbitrarily wide, but they are a little tedious to write. I suggest using some kind of [table generator](https://www.tablesgenerator.com/markdown_tables) and pasting in the markdown if you want a table.

| Country | Capital    |
|---------|------------|
| Denmark | Copenhagen |
| Sweden  | Stockholm  |
| Norway  | Oslo       |

# Footnotes

Footnotes aren't actually a common markdown feature[^1]. You can have multiple footnotes in succession[^2][^3]!

[^1]: I added them because I like them
[^2]: Example footnote
[^3]: Another example footnote

# Dropdowns

These are very useful but annoying to write, because you actually are writing HTML!

<details>

<summary>Click me for surprise!</summary>

**_Peekaboo!_**

</details>

# Table of Contents

Each header can actually be linked to in a page, so you can link a visitor to a specific part of the page!

To figure out how to link someone to a specific header,
1. take the header name
2. make it all lowercase
3. replace the spaces with dashes
4. delete all special characters

For example, "Table of Contents" becomes "\`table-of-contents\`".

You can then use that in a link with a \`#\` instead of a \`./\` at the begnning. For example:

1. [link to the top of the page](#intermediate)
1. [link to the tables section](#tables)
1. [link to the footnotes section](#footnotes)
1. [link to the table of contents section](#table-of-contents)

# Comments

<!---
This is a comment!
It won't be seen in the final website render
-->

Sometimes, it is useful to save some work on your page, but you don't want visitors to see it. Or maybe you just have some notes that you don't want visitors to see. We put these in _comments_. Comments will be shown in the markdown file, but not in the final website seen by visitors.

To create a comment, prefix it with \`<!--- \`, and then add a trailing \` -->\`

<!---
Wow here's another comment!
-->

# Constants

Sometimes, you'll have a link that you want to use many times. It is often better to define it a single time, and the refer to that definition, rather than copy and paste it over and over again. This way, if you make a change to the link, it will be updated in every place where you used it.

To define a link, you give it a name, the link, as well as alternate text for when a user hovers over it.

[link-md]: https://en.wikipedia.org/wiki/Markdown "Markdown at Wikipedia"

You can use a link definition by using square brackets instead of round brackets in your links, like so:

[link to markdown article][link-md]!!


`
const ADVANCED = `# Advanced

You probably won't need any of these features

# Inlining Pages

If you link to another markdown page, but put \`#inline\` in the square brackets, that page will be _inlined_, and just part of the current page. For example, here is the README (from GitHub page) in this page:

[#inline](../README.md)

# HTML

Any HTML can actually be put directly into markdown! There are many things that you can express with HTML that you cannot express with markdown (like dropdowns from the Intermediate tutorial).

<img id="my-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/350px-Markdown-mark.svg.png" alt="markdown logo"></img>

<button id="my-button">Click Me!</button>

# CSS

If you create a codeblock with CSS in it, and then add \`style\` to the top line with the triple backticks, the style will be added to the page!

\`\`\`style
#my-button {
    background-color: azure;
    color: green;
}

#my-image:hover, #my-button:hover {
    cursor: pointer;
}

#my-image {
    width: 30px;
    margin: 0;
}
\`\`\`

For more information on CSS, look elsewhere!

# JavaScript

If you create a codeblock with JavaScript in it, and then add \`eval\` to the top line with the triple backticks, the JavaScript will run on the page!

\`\`\`eval
const callback = () => alert("HELLO WORLD");
document.getElementById("my-button").addEventListener("click", callback);
document.getElementById("my-image").addEventListener("click", callback);
\`\`\`

For more information on JavaScript, look elsewhere!


`;
