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

        # Adjust the wait time if necessary
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.CLASS_NAME, 'fontDisplayLarge')))
        
        # Scroll to load more elements
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # Extract main data
        font_display_large = [div.get_text() for div in soup.find_all('div', class_='fontDisplayLarge')]
        font_body_small_confirmed = [div.get_text() for div in soup.select('div.jANrlb > div.fontBodySmall')]
        reviews = [review.get_text() for review in soup.find_all('div', class_='d4r55')]
        review_spans = [span.get_text() for span in soup.find_all('span', class_='rsqaWe')]
        wiI7pd_review_spans = [span.get_text() for span in soup.find_all('span', class_='wiI7pd')]
        bhokxe_aria_labels = [row.get('aria-label') for row in soup.find_all('tr', class_='BHOKXe') if row.get('aria-label')]

        # Combine data
        combined_reviews = []
        for i in range(len(reviews)):
            combined_reviews.append({
                "customer_review": reviews[i] if i < len(reviews) else None,
                "date_review": review_spans[i] if i < len(review_spans) else None,
                "star_review": bhokxe_aria_labels[i] if i < len(bhokxe_aria_labels) else None,
                "description": wiI7pd_review_spans[i] if i < len(wiI7pd_review_spans) else None
            })

        return {
            "total_star": font_display_large,
            "confirmed_reviews": font_body_small_confirmed,
            "combined_reviews": combined_reviews
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

    try:
        data = scrape_google_maps_reviews(url)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    api.run(debug=True)
