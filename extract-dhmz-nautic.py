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

    areas = [
        ('adriatic', 'jadran'),
        ('adriatic-north', 'sj_jadran'),
        ('adriatic-central', 'sr_jadran'),
        ('adriatic-south', 'ju_jadran'),
    ]

    forecasts = [
        ('wind', ''),
        ('gusts', 'uvgst_'),
        ('clouds', 'uk_naob_'),
        ('precipation', 'uk_obo_'),
    ]

    all_data = {}
    for area, atag  in areas:

        f_data = {}
        for forecast, ftag  in forecasts:
            print(f"Extracting images from {area} - {forecast}:")
            url=f"https://meteo.hr/prognoze_e.php?section=prognoze_model&param=prog_nauticari&el={atag}&it={ftag}"
            images = extract_images(url)

            f_data[forecast] = {
                'source': url,
                'images': images
            }

        all_data[area] = f_data

    write_to_json(all_data, 'src/_data/adriatic.json')
