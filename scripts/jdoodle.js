// Judge0 CE — free public instance, no API key required
const JUDGE0_API = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
const JAVA_LANGUAGE_ID = 62;

async function runJava(code, outputEl) {
  outputEl.className = 'code-output visible';
  outputEl.textContent = '⏳ Running...';

  try {
    const res = await fetch(JUDGE0_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code:  code,
        language_id:  JAVA_LANGUAGE_ID,
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const compileErr = data.compile_output || '';
    const stdout     = data.stdout         || '';
    const stderr     = data.stderr         || '';

    if (compileErr) {
      outputEl.className = 'code-output visible error';
      outputEl.textContent = compileErr;
    } else if (stderr) {
      outputEl.className = 'code-output visible error';
      outputEl.textContent = stdout + stderr;
    } else {
      outputEl.className = 'code-output visible';
      outputEl.textContent = stdout || '(no output)';
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
