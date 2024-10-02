import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

URL = 'https://cyber.sports.ru/games/roblox/news/'
response = requests.get(URL)
soup = BeautifulSoup(response.text, 'html.parser')

news_list = []

# Парсим новости
for item in soup.find_all('div', class_='news-item'):  # Убедитесь, что класс правильный для новостного элемента
    title = item.find('a', class_='news-title').text
    link = item.find('a', class_='news-title')['href']
    published_at = item.find('time', class_='news-date')['datetime']  # Убедитесь, что класс даты правильный
    description = item.find('div', class_='news-text').text

    news_list.append({
        'title': title,
        'link': link,
        'description': description,
        'published_at': published_at
    })

# Записываем новости в news.json
with open('news.json', 'w', encoding='utf-8') as f:
    json.dump(news_list, f, ensure_ascii=False, indent=4)

print(f'Собрано {len(news_list)} новостей на {datetime.now()}')
