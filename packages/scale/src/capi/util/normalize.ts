/**
 * Adapted from https://github.com/paritytech/capi-old copyright Parity Technologies (APACHE License 2.0)
 * Changes August 19th 2023 :
 * - updated to use subshape for scale decoding
 * - adapted from deno to typescript
 *
   Copyright 2023 Parity Technologies

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

export function normalizeIdent(ident: string) {
  if (ident.startsWith("r#")) ident = ident.slice(2)
  return normalizeKeyword(
    ident.replace(/(?:[^\p{ID_Continue}]|_)+(.)/gu, (_, $1: string) => $1.toUpperCase())
  )
}

export function normalizeDocs(docs: string[] | undefined): string {
  let str = docs?.join("\n") ?? ""
  str = str
    .replace(/[^\S\n]+$/gm, "") // strip trailing whitespace
    .replace(/^\n+|\n+$/g, "") // strip leading and trailing newlines
  const match = /^([^\S\n]+).*(?:\n\1.*)*$/.exec(str) // find a common indent
  if (match) {
    const { 1: prefix } = match
    str = str.replace(new RegExp(`^${prefix}`, "gm"), "") // strip the common indent
    // this `new RegExp` is safe because `prefix` must be whitespace
  }
  return str
}

export function normalizePackageName(name: string) {
  return name.replace(/[A-Z]/g, (x) => `-` + x.toLowerCase())
}

export function normalizeTypeName(name: string) {
  return normalizeIdent(name).replace(/^./, (x) => x.toUpperCase())
}

export function normalizeVariableName(name: string) {
  return normalizeIdent(name).replace(/^./, (x) => x.toLowerCase())
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words
const keywords = [
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "let",
  "static",
  "yield",
  "await",
  "enum",
  "implements",
  "interface",
  "package",
  "private",
  "protected",
  "public",
]
function normalizeKeyword(ident: string) {
  return keywords.includes(ident) ? ident + "_" : ident
}
