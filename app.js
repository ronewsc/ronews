document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById('loader');
    const newsSection = document.getElementById('news');

    // Показываем загрузчик при старте
    loader.style.display = 'block';
    newsSection.style.display = 'none';

    // Загружаем новости
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            newsSection.style.display = 'grid';

            data.forEach(news => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2>${news.title}</h2>
                    <p>${news.excerpt}</p>
                    <button onclick="viewNews('${news.id}')">Читать далее</button>
                `;
                newsSection.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки новостей:', error);
            loader.style.display = 'none';
        });
});

// Поиск новостей по заголовкам
function searchNews() {
    const query = document.getElementById('search').value.toLowerCase();
    const articles = document.querySelectorAll('article');

    articles.forEach(article => {
        const title = article.querySelector('h2').textContent.toLowerCase();
        if (title.includes(query)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Открытие полной новости
function viewNews(id) {
    window.location.href = `news.html?id=${id}`;
}