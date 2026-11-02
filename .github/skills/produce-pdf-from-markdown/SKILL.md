---
name: produce-pdf-from-markdown
description: 'Convert Markdown documents to PDF in a workspace. Use when asked to produce, export, render, or write a .pdf from a Markdown file, including when common converters are unavailable.'
argument-hint: '[source Markdown] [output PDF]'
user-invocable: true
disable-model-invocation: false
---

# Produce PDF From Markdown

Convert a Markdown source into a readable PDF while preserving its content and avoiding unnecessary project changes.

## When to Use

- A user asks to create or export a PDF from a Markdown file.
- A daily board, report, guide, or other Markdown document needs a PDF counterpart.
- A PDF must be generated in an environment where available conversion tools are uncertain.

## Procedure

1. Identify the source Markdown and requested output path. If the user gives only a filename, use the matching Markdown file in the same directory.
2. Read the source and inspect nearby generated documents when available, so the output follows the local document style and does not invent content.
3. Check available converters before choosing an implementation:
   - Prefer `pandoc` with an installed PDF engine.
   - Otherwise use LibreOffice, `weasyprint`, or a headless browser that can print HTML to PDF.
   - Use `groff` or a small direct PDF generator only as a last resort for text-heavy Markdown.
4. Use the first available route that supports the document adequately. Do not install dependencies or alter project configuration unless the user explicitly asks for setup changes.
5. Preserve headings, lists, task states, code/path names, and non-ASCII text whenever the chosen tool supports them. A fallback that cannot represent some characters must be reported clearly.
6. Write only the requested PDF and any explicitly approved temporary files. Never overwrite the Markdown source.
7. Validate the result:
   - Confirm the output exists and is non-empty.
   - Identify it as a valid PDF with `file` or an equivalent PDF inspector.
   - Check the page count when a PDF inspection tool is available.
   - Run `git diff --check` when the output is part of a Git workspace.
   - Remove temporary or failed output artifacts.

## Tool Selection

### Pandoc or document converter available

Use the converter's normal Markdown input and PDF output options. Select a Unicode-capable PDF engine and a simple, readable page layout. If conversion fails because an engine is missing, move to the next available route instead of modifying the system silently.

### HTML-to-PDF route available

Render the Markdown to HTML with a Markdown parser, apply a minimal print stylesheet, and print the HTML to PDF. Keep the stylesheet focused on readable typography, page margins, headings, lists, and code blocks.

### Only a low-level text or PostScript tool available

Use a conservative text layout with standard fonts and explicit line wrapping. Keep the PDF valid and readable, but do not claim that rich Markdown styling or full Unicode fidelity was preserved. Report this limitation in the completion summary.

### No conversion route available

Do not create a file with a `.pdf` extension that is not a valid PDF. Report the missing prerequisite and suggest the smallest viable command or dependency for the user's environment.

## Completion Criteria

- The requested PDF exists at the exact requested path.
- The PDF is non-empty and recognized as a valid PDF.
- The Markdown source remains unchanged.
- The content is faithful to the source, with any fallback limitations disclosed.
- No unrelated project files or configuration were changed.
