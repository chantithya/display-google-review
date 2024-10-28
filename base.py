from flask import Flask, jsonify, request
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.common.exceptions import TimeoutException

# Initialize Flask app
api = Flask(__name__)

# Define the home route
@api.route('/')
def home():
    return "Welcome to the API! Visit /profile for more information."

# Define a profile route
@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves Python and JavaScript"
    }
    return jsonify(response_body)

# Define the Google Maps scraping function
def scrape_google_maps_reviews(url):
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)

    try:
        driver.maximize_window()
        driver.get(url)

        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, 'fontDisplayLarge')))
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, 'fontBodySmall')))
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "d4r55")))
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "rsqaWe")))
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "wiI7pd")))

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        font_display_large = [div.get_text() for div in soup.find_all('div', class_='fontDisplayLarge')]
        font_body_small = [div.get_text() for div in soup.find_all('div', class_='fontBodySmall')]
        reviews = [review.get_text() for review in soup.find_all('div', class_='d4r55')]
        review_spans = [span.get_text() for span in soup.find_all('span', class_='rsqaWe')]
        wiI7pd_review_spans = [span.get_text() for span in soup.find_all('span', class_='wiI7pd')]

        # Return data as dictionary
        return {
            "fontDisplayLarge": font_display_large,
            "fontBodySmall": font_body_small,
            "reviews": reviews,
            "spanReviews": review_spans,
            "description": wiI7pd_review_spans
        }

    except TimeoutException:
        return {"error": "The page took too long to load or elements were not found."}
    finally:
        driver.quit()

# Define the scrape route
@api.route('/scrape', methods=['GET'])
def scrape_route():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "Please provide a valid Google Maps URL using the 'url' parameter."}), 400
    
    data = scrape_google_maps_reviews(url)
    return jsonify(data)

if __name__ == '__main__':
    api.run(debug=True)
