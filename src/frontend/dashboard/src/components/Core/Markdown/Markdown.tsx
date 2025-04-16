import React, { FC, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import './Markdown.scss';

// Import the languages you want to support for syntax highlighting
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import lua from 'highlight.js/lib/languages/lua';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import scala from 'highlight.js/lib/languages/scala';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/nnfx-light.css'
// import { ThemeName } from 'hooks';

// import Typography from '../Typography/Typography';

// Register the languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('php', php);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('go', go);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('scala', scala);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('markdown', markdown);

interface MarkdownProps {
    content: string;
    themeName?: string,
    style?: React.CSSProperties,
    className?: string;
}

const Markdown: FC<MarkdownProps> = ({
  content,
  themeName,
  style,
  className,
}) => {

  useEffect(() => {

    // if (themeName === 'light') {
    //   require('highlight.js/styles/nnfx-light.css');
    // } else {
    //   require('highlight.js/styles/github-dark.css');
    // }
    document.querySelectorAll('pre code').forEach((block) => {
      block.removeAttribute('data-highlighted');
      hljs.highlightElement(block as HTMLElement);
    });
  }, [themeName]);


  const renderer = new marked.Renderer();

  renderer.heading = (text, level) => {
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  renderer.blockquote = (quote) => `<blockquote class="blockquote">${quote}</blockquote>`;

  renderer.image = (href, title, text) => `<img src="${href}" alt="${text}" title="${title}" />`;

  renderer.hr = () => '<hr class="horizontal-rule" />';

  // Add support for unordered lists (ul)
  renderer.list = (body, ordered) => {
    if (ordered) {
      return `<ol>${body}</ol>`;
    } else {
      return `<ul>${body}</ul>`;
    }
  };

  renderer.link = (href, title, text) => `<a href="${href}" style="text-decoration: underline" title="${title || ''}" target="_blank">${text}</a>`;

  // Add support for list items (li)
  renderer.listitem = (text) => `<li>${text}</li>`;

  // Table
  renderer.table = (header, body) => `<table><thead>${header}</thead><tbody>${body}</tbody></table>`;

  renderer.tablerow = (content) => `<tr>${content}</tr>`;

  renderer.tablecell = (content, flags) => {
    const tag = flags.header ? 'th' : 'td';
    return `<${tag}>${content}</${tag}>`;
  };

  renderer.del = (text) => `<del>${text}</del>`;

  const renderedContent = marked(content, {
    headerIds: false,
    mangle: false,
    renderer,
  });

  return (
    <div
      className={`markdown-content ${themeName} ${className}`}
      style={{
        ...style,
        backgroundColor: 'transparent',
      }}
      // @ts-ignore
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};

export default Markdown;