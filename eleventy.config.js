const VitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(VitePlugin, {
        // Any plugin options can go here
    });

    // Pass-through files
    eleventyConfig.addPassthroughCopy("public");
    eleventyConfig.addPassthroughCopy("styles");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("code");

    return {
        dir: {
            input: "src",
            output: "dist"
        },

        htmlTemplateEngine: 'liquid',
        markdownTemplateEngine: 'liquid',
    }
}
