import requests
import json
from bs4 import BeautifulSoup

def extract_images(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    gallery_div = soup.find('div', class_='meteo-galleria')
    if not gallery_div:
        return []

    image_urls = []
    for img_tag in gallery_div.find_all('img'):
        if img_tag and img_tag.get('src'):
            image_urls.append(img_tag['src'])

    return image_urls

def write_to_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    urls = [
        ('waves', 'https://meteo.hr/prognoze_e.php?section=prognoze_model&param=prog_nauticari&el=val_we'),
    ]

    all_data = {}
    for desc, url in urls:
        print(f"Extracting images from {desc}:")
        images = extract_images(url)
        all_data[desc] = {
            'source': url,
            'images': images
        }

    write_to_json(all_data, 'src/_data/waves.json')
