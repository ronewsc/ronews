document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById('loader');
    const newsSection = document.getElementById('news');

    loader.style.display = 'block';
    newsSection.style.display = 'none';

    // Загружаем обновленный файл news.json
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            newsSection.style.display = 'grid';

            data.forEach(news => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2><a href="${news.link}" target="_blank">${news.title}</a></h2>
                    <p>${news.description}</p>
                    <p><small>${new Date(news.published_at).toLocaleDateString()}</small></p>
                `;
                newsSection.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки новостей:', error);
            loader.style.display = 'none';
        });
});

}
