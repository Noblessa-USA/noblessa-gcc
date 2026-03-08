/*
 * 📝 Markdown to HTML Filter
 * Converts markdown text to HTML
 * Usage: {{ content | markdown | safe }}
 * 
 * This filter processes markdown strings (like those stored in frontmatter)
 * and converts them to HTML for display in templates.
 */

const markdownIt = require("markdown-it");

module.exports = function (content) {
    // Initialize markdown-it with default options
    const md = new markdownIt({
        html: true, // Enable HTML tags in markdown
        breaks: true, // Convert line breaks to <br>
        linkify: true, // Auto-convert URLs to links
    });

    // Return processed HTML
    return md.render(content || "");
};
