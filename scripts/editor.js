// CodeMirror 5 editor helpers
// CM5 is loaded as script tags in the page (no modules needed)

const editors = {};

/**
 * Replace the element with id `hostId` with a CodeMirror editor.
 * Returns the CodeMirror instance.
 */
function mountEditor(hostId, initialCode) {
  const host = document.getElementById(hostId);
  if (!host) return null;

  // Replace the div with a textarea, then apply CodeMirror
  const ta = document.createElement('textarea');
  ta.value = initialCode;
  host.replaceWith(ta);
  ta.id = hostId; // keep the same id

  const cm = CodeMirror.fromTextArea(ta, {
    mode:        'text/x-java',
    theme:       'dracula',
    lineNumbers: true,
    indentUnit:  4,
    tabSize:     4,
    indentWithTabs: false,
    lineWrapping: false,
    autofocus:   false,
    extraKeys:   { Tab: cm => cm.execCommand('indentMore') },
  });

  editors[hostId] = cm;
  return cm;
}

function getCode(hostId) {
  const cm = editors[hostId];
  return cm ? cm.getValue() : '';
}
