setTimeout(function () {
  document.body.classList.add('body_visible');
}, 200);

function postNumber() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return id;
}

function loadPost(num) {
  fetch(`https://gorest.co.in/public-api/posts?id=${num}`)
    .then((response) => response.json())
    .then((data) => takePage(data));
}
loadPost(postNumber());

function commentsPost(num) {
  fetch(`https://gorest.co.in/public-api/comments?id=${num}`)
    .then((response) => response.json())
    .then((data) => commentsPage(data));
}
commentsPost(postNumber());

function takePage(data) {
  for (const elem of data.data) {
    const articleTitle = document.getElementById('article-title');
    const articleBody = document.getElementById('article-body');
    articleTitle.innerText = elem.title;
    articleBody.innerText = elem.body;
  }
}

function commentsPage(data) {
  const nameAuthor = document.getElementById('name-author');
  const emailAuthor = document.getElementById('email-author');
  const bodyAuthor = document.getElementById('body-author');
  for (const elem of data.data) {
    nameAuthor.innerText = `Имя автора: ${elem.name}`;
    emailAuthor.innerText = `E-mail автора: ${elem.email}`;
    bodyAuthor.innerText = `Пояснение: ${elem.body}`;
  }
}
(function returnBack() {
  const historyBtn = document.getElementById('history');
  historyBtn.innerText = 'Назад к списку';
  historyBtn.addEventListener('click', () => {
    window.history.back();
  });
})();
