setTimeout(function () {
  document.body.classList.add('body_visible');
}, 250);

const urlParams = new URLSearchParams(window.location.search);

function pageNumber() {
  const page = urlParams.get('page');
  return page ? page : 1;
}

function loadPage(num) {
  fetch(`https://gorest.co.in/public-api/posts?page=${num}`)
    .then((response) => response.json())
    .then((data) => {
      getPages(data.meta.pagination.pages)
      renderPosts(data.data)
    });
}

https: loadPage(pageNumber());

const pages = []

function getPages(dataPages) {
  for (let allPages = 1; allPages <= dataPages; allPages++) {
    pages.push(allPages)
  }
  renderPages(pages)
}

function getActivePage() {
  pages =  document.querySelectorAll('.page-link');
  pages.forEach(page => {
    urlParams.get('page') === page.id ? page.classList.add('page-active') : ''
  });
}

function renderPages(dataPages) {
  const paginationList = document.getElementById('pagination-list');
  for (let allPages = 1; allPages <= dataPages.length; allPages++) {
    const itemListPageNumber = document.createElement('li');
    const linkPageNumber = document.createElement('a');
    linkPageNumber.href = '?page=' + allPages;
    linkPageNumber.innerText = allPages;
    itemListPageNumber.classList.add('page-item', 'p-1');
    itemListPageNumber.style.cursor = 'pointer';
    linkPageNumber.classList.add(
      'page-link',
      'link-secondary',
      'list-group-item-action',
      'list-group-item-dark'
    );
    linkPageNumber.id = allPages
    paginationList.append(itemListPageNumber);
    itemListPageNumber.append(linkPageNumber);
  }
}

function renderPosts(dataPosts) {
  const listGroup = document.getElementById('list-group');
  for (const elem of dataPosts) {
    const linkTitle = document.createElement('a');
    linkTitle.setAttribute('href', 'post.html?id=' + elem.id);
    linkTitle.innerText = elem.title;
    linkTitle.classList.add(
      'list-group-item',
      'list-group-item-action',
      'list-group-item-dark',
      'link-secondary'
    );
    listGroup.append(linkTitle);
  }
}
