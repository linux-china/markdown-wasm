markdown-wasm for Deno
======================

🦕 Deno module for Markdown parser implemented in WebAssembly based on md4c from https://github.com/rsms/markdown-wasm

why markdown_wasm?  It's small(41k with wasm bundled), and fast(wasm based on md4c).

# How to use?

```typescript
import {parseMarkdown} from "https://deno.land/x/markdown_wasm/mod.ts"

console.log(parseMarkdown("# hello\n*世界*"))
```

# References

* markdown-wasm: Markdown parser and HTML generator implemented in WebAssembly, based on md4c  https://github.com/rsms/markdown-wasm

