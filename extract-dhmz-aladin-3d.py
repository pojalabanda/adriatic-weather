import requests
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

if __name__ == "__main__":
    urls = [
        ('rain-croatia', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_3h_ob_uk_'),
        ('wind-kvarner', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_uv10_SENJ_'),
        ('wind-zadar', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_uv10_MASL_'),
        ('wind-split', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_uv10_SPLI_'),
        ('wind-dubrovnik', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_uv10_DUBR_'),
        ('wind-croatia', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_uv10_HRv8_'),
        ('temp-croatia', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_t02m_'),
        ('clouds-croatia', 'https://meteo.hr/prognoze.php?section=prognoze_model&param=ala_k&el=web_naob_'),
    ]

    for desc, url in urls:
        print(f"Extracting images from {desc}:")
        images = extract_images(url)
        for img in images:
            print(img)
        print("\n")  # Just to separate the output for different URLs

