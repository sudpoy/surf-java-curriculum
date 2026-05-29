const PROGRESS_KEY = 'surf-java-progress';

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}

function markComplete(week) {
  const p = getProgress();
  p[week] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function isComplete(week) {
  return !!getProgress()[week];
}

// Update dot indicators in lesson nav
function updateProgressDots(currentWeek) {
  const p = getProgress();
  document.querySelectorAll('.progress-dots span').forEach((dot, i) => {
    const w = i + 1;
    dot.classList.remove('done', 'active');
    if (w === currentWeek) dot.classList.add('active');
    else if (p[w])         dot.classList.add('done');
  });
}

// Complete button handler
function initCompleteButton(week) {
  const btn = document.getElementById('complete-btn');
  if (!btn) return;
  if (isComplete(week)) {
    btn.textContent = '✓ Lesson Complete';
    btn.className = 'btn-success';
    btn.disabled = true;
  }
  btn.addEventListener('click', () => {
    markComplete(week);
    btn.textContent = '✓ Lesson Complete';
    btn.className = 'btn-success';
    btn.disabled = true;
    updateProgressDots(week);
  });
}
