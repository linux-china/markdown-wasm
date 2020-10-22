import {compress} from "https://deno.land/x/lz4@v0.1.2/mod.ts";
import {encode as base64} from "https://deno.land/std@0.74.0/encoding/base64.ts";

//encode wasm binary file with lz4
const wasm = await Deno.readFile("dist/markdown.wasm");
const compressed = compress(wasm);
const encodedWasmText = base64(compressed);
// process markdown.deno.js for Deno
let jsCode = await Deno.readTextFile("dist/markdown.bundle.es.js");
//convert utf-16le to utf-8 because utf-16le not available on Deno
jsCode = jsCode.replace("utf-16le", "utf-8");
// remove const WASM_DATA Uint8Array
let begin = jsCode.indexOf("]);");
jsCode = jsCode.substring(begin + 3);
// use WASM_DATA from lz4 encoded wasm
jsCode = `const WASM_DATA = lz4.decompress(Uint8Array.from(atob('${encodedWasmText}'), c => c.charCodeAt(0)));` + jsCode;
// add header & import to be compatible with Demo
jsCode = "var document = {};import * as lz4 from 'https://deno.land/x/lz4@v0.1.2/mod.ts';" + jsCode;
// adjust export
// jsCode = jsCode.replace("export{te as ready,re as ParseFlags,ie as parse}", "await te;export{re as ParseFlags,ie as parse}")
// write to mod.js
await Deno.writeTextFile("wasm.js", jsCode);
console.log("wasm.js generated successfully!")
