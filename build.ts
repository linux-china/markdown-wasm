import {compress} from "https://deno.land/x/brotli@v0.1.4/mod.ts";
import {encode as base64} from "https://deno.land/std@0.101.0/encoding/base64.ts";

//encode wasm binary file with lz4
const wasm = await Deno.readFile("dist/markdown.wasm");
const compressed = compress(wasm);
const encodedWasmText = base64(compressed);
// process markdown.deno.js for Deno
let jsCode = await Deno.readTextFile("dist/markdown.bundle.es.js");
// remove const WASM_DATA Uint8Array
let begin = jsCode.indexOf("]);");
jsCode = jsCode.substring(begin + 3);
// use WASM_DATA from lz4 encoded wasm
jsCode = `const WASM_DATA = brotli.decompress(Uint8Array.from(atob('${encodedWasmText}'), c => c.charCodeAt(0)));` + jsCode;
// add header & import to be compatible with Demo
jsCode = "var document = {};import * as brotli from 'https://deno.land/x/brotli@v0.1.4/mod.ts';" + jsCode;
// adjust export
// jsCode = jsCode.replace("export{te as ready,re as ParseFlags,ie as parse}", "await te;export{re as ParseFlags,ie as parse}")
// write to mod.js
await Deno.writeTextFile("wasm.js", jsCode);
console.log("wasm.js generated successfully!")
