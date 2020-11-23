import {parseMarkdown} from "https://deno.land/x/markdown_wasm/mod.ts"
// import {parseMarkdown} from "./mod.ts"

console.log(parseMarkdown("# hello\n*世界*"))
