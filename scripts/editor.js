import { EditorView, basicSetup } from 'https://esm.sh/codemirror@6.0.1';
import { java }                   from 'https://esm.sh/@codemirror/lang-java@6.0.1';
import { oneDark }                from 'https://esm.sh/@codemirror/theme-one-dark@6.1.2';
import { EditorState }            from 'https://esm.sh/@codemirror/state@6.4.1';

// Map of id → EditorView
const editors = {};

/**
 * Mount a CodeMirror editor inside the element with the given id.
 * The element's current textContent is used as initial code.
 */
export function mountEditor(id, initialCode) {
  const host = document.getElementById(id);
  if (!host) return;

  const view = new EditorView({
    state: EditorState.create({
      doc: initialCode,
      extensions: [
        basicSetup,
        java(),
        oneDark,
        EditorView.theme({
          '&': {
            fontSize: '0.88rem',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            backgroundColor: 'var(--code-bg)',
          },
          '.cm-scroller': { overflow: 'auto' },
          '.cm-content': { padding: '0.75rem 0' },
          '.cm-gutters': { backgroundColor: '#0d1017', borderRight: '1px solid #2e3350' },
        }),
        EditorView.lineWrapping,
      ],
    }),
    parent: host,
  });

  editors[id] = view;
}

/** Get the current code from an editor by id */
export function getCode(id) {
  const view = editors[id];
  return view ? view.state.doc.toString() : '';
}
