// JDoodle integration
// Set your credentials here after signing up at jdoodle.com
const JDOODLE_CLIENT_ID     = '';
const JDOODLE_CLIENT_SECRET = '';

const JDOODLE_API = 'https://api.jdoodle.com/v1/execute';

async function runJava(code, outputEl) {
  outputEl.className = 'code-output visible';
  outputEl.textContent = '⏳ Running...';

  if (!JDOODLE_CLIENT_ID || !JDOODLE_CLIENT_SECRET) {
    outputEl.className = 'code-output visible';
    outputEl.innerHTML =
      '⚙️  No API key configured yet.\n' +
      'Copy this code and paste it into your IDE, or\n' +
      'add your JDoodle credentials to scripts/jdoodle.js.';
    return;
  }

  try {
    const res = await fetch(JDOODLE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId:     JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET,
        script:       code,
        language:     'java',
        versionIndex: '4',
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (data.error) {
      outputEl.className = 'code-output visible error';
      outputEl.textContent = data.error;
    } else {
      outputEl.className = 'code-output visible';
      outputEl.textContent = data.output || '(no output)';
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
