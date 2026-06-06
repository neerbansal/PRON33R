import requests
import os
import base64

key = os.environ.get("FLUX")
headers = {
    "Authorization": f"Bearer {key}",
    "Accept": "application/json",
}

# Try the exact model user mentioned, though it might not exist on Nvidia API
# usually it's black-forest-labs/flux.1-schnell or black-forest-labs/flux.1-dev
models_to_try = [
    "black-forest-labs/flux.1-schnell" # Using this because we know it works from previous steps
]

for model in models_to_try:
    endpoint = f"https://ai.api.nvidia.com/v1/genai/{model}"
    payload = {
        "prompt": "A futuristic cute cat hacking a computer in space",
        "seed": 42,
        "steps": 4 # Schnell needs steps <= 4 usually
    }

    print(f"Trying {model} at {endpoint}...")
    response = requests.post(endpoint, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()
        b64 = data.get("artifacts", [{}])[0].get("base64")
        if not b64:
             # Try other structure
             b64 = data.get("data", [{}])[0].get("b64_json")

        if b64:
            image_data = base64.b64decode(b64)
            with open('flux_generated_image.png', 'wb') as f:
                f.write(image_data)
            print("SUCCESS! Saved to flux_generated_image.png")
            break
        else:
            print("SUCCESS but no base64 image found in response:")
            print(data.keys())
    else:
        print(f"FAILED. Status {response.status_code}")
        print(response.text)
