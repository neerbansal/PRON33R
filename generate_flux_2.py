import requests
import os
import base64

key = os.environ.get("FLUX")
headers = {
    "Authorization": f"Bearer {key}",
    "Accept": "application/json",
}

endpoint = "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell"
payload = {
    "prompt": "indian guy sitting at chair drinking his coffee while staring at the Eiffel tower the scene should be asthetic and blurry",
    "seed": 42,
    "steps": 4
}

print("Generating second FLUX image...")
response = requests.post(endpoint, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    b64 = data.get("artifacts", [{}])[0].get("base64")
    if not b64:
        b64 = data.get("data", [{}])[0].get("b64_json")

    if b64:
        image_data = base64.b64decode(b64)
        with open('flux_image_2.jpg', 'wb') as f:
            f.write(image_data)
        print("SUCCESS! Saved to flux_image_2.jpg")
    else:
        print("SUCCESS but no base64 image found in response.")
else:
    print(f"FAILED. Status {response.status_code}")
    print(response.text)
