"use strict"

var commonmark = require("commonmark")

/**
 * This is a function expression providing closure such that a reader
 * and writer is only created once.
 *
 */
var MarkdownTransform = function(){
    // Stick reader and writer in a closure so they only get created once.

    let reader = new commonmark.Parser()
    let writer = new commonmark.HtmlRenderer({
        safe: true
    })
    /**
     * Converts data with a markdown mimetype to an HTML div element.
     *
     * @param {string} mimetype -  The mimetype of the data to be transformed,
     * it is unused by this function but included for a common API.
     * @param {string} data - The markdown data to be transformed.
     * @param {Document} document - A Document Object Model to be used for
     * creating an element.
     * @return {HTMLElement} - An HTML div containing the transformed markdown.
     */
    return function(mimetype, data, document) {
        var div = document.createElement("div")

        var parsed = reader.parse(data)

        // TODO: Any other transformations on the parsed object
        // See https://github.com/jgm/commonmark.js#usage

        div.innerHTML = writer.render(parsed)

        return div
    }
}();

MarkdownTransform.mimetype = 'text/markdown'

export { MarkdownTransform }
