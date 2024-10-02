document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');

  fetch('news.json')
      .then(response => response.json())
      .then(data => {
          const news = data.find(n => n.id === newsId);
          if (news) {
              document.getElementById('news-title').textContent = news.title;
              document.getElementById('news-content').textContent = news.content;
          }
      });

  // Загружаем комментарии
  loadComments();
});

// Комментарии
function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  const commentsSection = document.getElementById('comments');
  commentsSection.innerHTML = '';

  comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.innerHTML = `<strong>${comment.username}</strong><p>${comment.text}</p>`;
      commentsSection.appendChild(commentDiv);
  });
}

function addComment(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const text = document.getElementById('comment-text').value;

  const newComment = { username, text };
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  comments.push(newComment);

  localStorage.setItem('comments', JSON.stringify(comments));
  loadComments();

  // Очищаем форму
  document.getElementById('username').value = '';
  document.getElementById('comment-text').value = '';
}
