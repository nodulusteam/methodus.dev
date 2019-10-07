module.exports = {
    // maps 'packages/foo-bar#readme' to 'modules/foo_bar.html'
    [String.raw`.+`](_, name) {
        return `documentation/modules/${name.replace(/-/g, "_")}.html`;
    },
    [String.raw`modules/mapping.md`](_, name) {
        return `documentation/modules/${name.replace(/-/g, "_")}.html`;
    },
    [String.raw`^/([^/]+)`](_, name) {
        return `./${name.replace(/-/g, "_")}.html`;
    },
}
 