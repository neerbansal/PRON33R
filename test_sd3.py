import requests
import os

key = os.environ.get("SD3")
headers = {
    "Authorization": f"Bearer {key}",
    "Accept": "application/json",
}

print("Checking available models for SD3 key on standard models endpoint...")
try:
    models_resp = requests.get("https://integrate.api.nvidia.com/v1/models", headers=headers)
    models = models_resp.json().get('data', [])
    stability_models = [m['id'] for m in models if 'stable' in m['id'].lower() or 'sd3' in m['id'].lower() or 'stability' in m['id'].lower()]
    print(f"Stability models found in standard list: {stability_models}")
except Exception as e:
    print(f"Error fetching models: {e}")

print("\nTrying to generate an image using specific SD3 endpoints to test permissions...")
endpoints_to_test = [
    ("stabilityai/stable-diffusion-3-medium", "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium"),
    ("stabilityai/sdxl-turbo", "https://ai.api.nvidia.com/v1/genai/stabilityai/sdxl-turbo"),
    ("stabilityai/stable-diffusion-3.5-large", "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3.5-large")
]

payload = {
    "text_prompts": [{"text": "A simple test"}],
    "cfg_scale": 5,
    "seed": 0,
    "steps": 10
}

for model_id, endpoint in endpoints_to_test:
    print(f"\nTesting {model_id}...")
    resp = requests.post(endpoint, headers=headers, json=payload)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text[:200]}...")
