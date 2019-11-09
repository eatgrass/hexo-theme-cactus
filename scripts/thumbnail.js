let hashCode = s => Math.abs(s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0))


/**
 * Thumbnail Helper
 * @description Get the thumbnail url from a post
 * @example
 *     <%- thumbnail(post) %>
 */
hexo.extend.helper.register("thumbnail", function(post) {
  return post.thumbnail || post.banner || "";
});

hexo.extend.tag.register("obs", function(args) {
  let id = args[0];
  let hash = hashCode(id);
  return `
            <div id="note_${hash}"></div>
            <script type="module">
                import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
                import define from "${id}";
                const runtime = new Runtime();
                const main = runtime.module(define, Inspector.into(document.querySelector('#note_${hash}')));
            </script>`;
});

