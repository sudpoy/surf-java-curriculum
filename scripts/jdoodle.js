// Piston API — free, no API key required, CORS-enabled
const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

async function runJava(code, outputEl) {
  outputEl.className = 'code-output visible';
  outputEl.textContent = '⏳ Running...';

  try {
    const res = await fetch(PISTON_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        version:  '*',
        files:    [{ content: code }],
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const out = (data.run?.stdout || '') + (data.run?.stderr || '');
    if (data.run?.stderr) {
      outputEl.className = 'code-output visible error';
    } else {
      outputEl.className = 'code-output visible';
    }
    outputEl.textContent = out || '(no output)';
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
