import os
import json
import base64
import urllib.request
import urllib.error

def test_flux_img2img():
    api_key = os.environ.get("FLUX")
    if not api_key:
        print("Error: FLUX environment variable is not set.")
        return

    model_name = "black-forest-labs/flux_2-klein-4b"
    url = f"https://ai.api.nvidia.com/v1/genai/{model_name}"

    image_path = "/tmp/file_attachments/file_00000000ea98720b809e872997023b10.png"
    with open(image_path, "rb") as f:
        b64_image = base64.b64encode(f.read()).decode("utf-8")

    payload = {
        "text_prompts": [{"text": "Make it realistic"}],
        "image": b64_image,
        "steps": 4
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers)

    print(f"Testing FLUX key on model: {model_name} for img2img...")
    try:
        with urllib.request.urlopen(req) as response:
            result = response.read().decode('utf-8')
            print("Success:", response.status)
            print("Response:", result[:500])
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
        print("Response Body:", e.read().decode('utf-8'))

if __name__ == "__main__":
    test_flux_img2img()
