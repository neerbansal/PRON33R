import os
import json
import base64
import urllib.request
import urllib.error

def test_flux_img2img():
    # 1. Setup API details
    api_key = os.environ.get("FLUX")
    if not api_key:
        print("Error: FLUX environment variable is not set.")
        return

    # Use the model requested by the user
    model_name = "black-forest-labs/flux_2-klein-4b"
    url = f"https://ai.api.nvidia.com/v1/genai/{model_name}"

    # 2. Read and encode the image provided by the user
    image_path = "/tmp/file_attachments/file_00000000ea98720b809e872997023b10.png"
    try:
        with open(image_path, "rb") as f:
            b64_image = base64.b64encode(f.read()).decode("utf-8")
    except FileNotFoundError:
        print(f"Error: Could not find image file at {image_path}")
        return

    # 3. Construct the img2img payload
    payload = {
        "text_prompts": [{"text": "Make it realistic"}],
        "image": b64_image,
        "steps": 4 # Using 4 steps as recommended for NVIDIA FLUX endpoints
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers)

    # 4. Execute the request
    print(f"Testing FLUX key on model: {model_name} for img2img...")
    print(f"URL: {url}")
    try:
        with urllib.request.urlopen(req) as response:
            result = response.read().decode('utf-8')
            print("Success:", response.status)
            print("Response:", result[:500])
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
        print("Response Body:", e.read().decode('utf-8'))
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    test_flux_img2img()
