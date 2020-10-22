import * as markdown from "./wasm.js"

await markdown.ready

/**
 * convert markdown to HTML
 * @param markdownCode markdown code
 * @param options parse options
 * @return HTML code
 */
export function parseMarkdown(markdownCode: Source, options?: ParseOptions & { bytes?: never | false }): string {
    return markdown.parse(markdownCode, options);
}

/**
 * convert markdown to HTML
 * @param markdownCode markdown code
 * @param options parse options with bytes: true
 * @return HTML code
 */
export function parseMarkdownToUint8Array(markdownCode: Source, options?: ParseOptions & { bytes: true }): Uint8Array {
    return markdown.parse(markdownCode, options);
}

/** Markdown source code can be provided as a JavaScript string or UTF8 encoded data */
type Source = string | ArrayLike<number>

/** Options for the parse function */
export interface ParseOptions {
    /** Customize parsing. Defaults to ParseFlags.DEFAULT */
    parseFlags?: ParseFlags

    /** Select output format. Defaults to "html" */
    format?: "html" | "xhtml"

    /**
     * bytes=true causes parse() to return the result as a Uint8Array instead of a string.
     *
     * The returned Uint8Array is only valid until the next call to parse().
     * If you need to keep the returned data around, call Uint8Array.slice() to make a copy,
     * as each call to parse() uses the same underlying memory.
     *
     * This only provides a performance benefit when you never need to convert the output
     * to a string. In most cases you're better off leaving this unset or false.
     */
    bytes?: boolean
}

/** Flags that customize Markdown parsing */
export enum ParseFlags {
    /** In TEXT, collapse non-trivial whitespace into single ' ' */ COLLAPSE_WHITESPACE,
    /** Enable $ and $$ containing LaTeX equations. */              LATEX_MATH_SPANS,
    /** Disable raw HTML blocks. */                                 NO_HTML_BLOCKS,
    /** Disable raw HTML (inline). */                               NO_HTML_SPANS,
    /** Disable indented code blocks. (Only fenced code works.) */  NO_INDENTED_CODE_BLOCKS,
    /** Do not require space in ATX headers ( ###header ) */        PERMISSIVE_ATX_HEADERS,
    /** Recognize e-mails as links even without <...> */            PERMISSIVE_EMAIL_AUTO_LINKS,
    /** Recognize URLs as links even without <...> */               PERMISSIVE_URL_AUTO_LINKS,
    /** Enable WWW autolinks (without proto; just 'www.') */        PERMISSIVE_WWW_AUTOLINKS,
    /** Enable strikethrough extension. */                          STRIKETHROUGH,
    /** Enable tables extension. */                                 TABLES,
    /** Enable task list extension. */                              TASK_LISTS,
    /** Enable wiki links extension. */                             WIKI_LINKS,
    /** Enable underline extension (disables '_' for emphasis) */   UNDERLINE,

    /** Default flags are:
     *    COLLAPSE_WHITESPACE |
     *    PERMISSIVE_ATX_HEADERS |
     *    PERMISSIVE_URL_AUTO_LINKS |
     *    STRIKETHROUGH |
     *    TABLES |
     *    TASK_LISTS
     */
    DEFAULT,

    /** Shorthand for NO_HTML_BLOCKS | NO_HTML_SPANS */
    NO_HTML,
}

