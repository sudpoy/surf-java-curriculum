function initQuiz() {
  const form = document.getElementById('quiz-form');
  if (!form) return;

  const submitBtn = document.getElementById('quiz-submit');
  const retryBtn  = document.getElementById('quiz-retry');
  const scoreEl   = document.getElementById('quiz-score');

  submitBtn.addEventListener('click', () => {
    const questions = form.querySelectorAll('.quiz-q');
    let correct = 0;

    questions.forEach(q => {
      const selected = q.querySelector('input[type=radio]:checked');
      const resultEl = q.querySelector('.quiz-result');
      const answer   = q.dataset.answer;

      if (!selected) {
        resultEl.className = 'quiz-result wrong';
        resultEl.textContent = '⚠ Please select an answer.';
        return;
      }

      if (selected.value === answer) {
        correct++;
        resultEl.className = 'quiz-result correct';
        resultEl.textContent = '✓ Correct!';
      } else {
        resultEl.className = 'quiz-result wrong';
        resultEl.textContent = `✗ Incorrect. The answer is: ${q.dataset.explanation || answer}`;
      }
    });

    const total = questions.length;
    scoreEl.className = 'quiz-score visible';
    scoreEl.textContent = `You got ${correct} / ${total} correct.`;

    submitBtn.style.display = 'none';
    retryBtn.style.display  = 'inline-block';
  });

  retryBtn.addEventListener('click', () => {
    form.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
    form.querySelectorAll('.quiz-result').forEach(r => { r.className = 'quiz-result'; r.textContent = ''; });
    scoreEl.className = 'quiz-score';
    submitBtn.style.display = 'inline-block';
    retryBtn.style.display  = 'none';
  });
}

document.addEventListener('DOMContentLoaded', initQuiz);
