// Wandbox API — free, no API key, CORS-enabled
const WANDBOX_API = 'https://wandbox.org/api/compile.json';

async function runJava(code, outputEl) {
  outputEl.className = 'code-output visible';
  outputEl.textContent = '⏳ Running...';

  try {
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    const filename   = classMatch ? classMatch[1] + '.java' : 'Main.java';

    const res = await fetch(WANDBOX_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'openjdk-jdk-22+36',
        codes:    [{ file: filename, code: code }],
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const compileErr = data.compiler_error || '';
    const output     = data.program_output || '';
    const runtimeErr = data.program_error  || '';

    if (compileErr) {
      outputEl.className = 'code-output visible error';
      outputEl.textContent = compileErr;
    } else if (runtimeErr) {
      outputEl.className = 'code-output visible error';
      outputEl.textContent = output + runtimeErr;
    } else {
      outputEl.className = 'code-output visible';
      outputEl.textContent = output || '(no output)';
    }
  } catch (err) {
    outputEl.className = 'code-output visible error';
    outputEl.textContent = '❌ ' + err.message;
  }
}

// Copy code to clipboard
async function copyCode(code, btn) {
  await navigator.clipboard.writeText(code);
  const orig = btn.textContent;
  btn.textContent = '✓ Copied!';
  setTimeout(() => { btn.textContent = orig; }, 1500);
}
