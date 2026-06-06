# Why Image-to-Image with FLUX is Failing

Based on testing and checking the NVIDIA API availability for FLUX models, there are two primary reasons why the request is failing:

## 1. The model `black-forest-labs/flux_2-klein-4b` is not available on this endpoint.
When attempting to call `https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux_2-klein-4b`, the NVIDIA API returns a `404 Not Found` error.
```
HTTP Error 404: Not Found
Response Body: 404 page not found
```
This indicates that `flux_2-klein-4b` is not currently an active or accessible model endpoint for the provided API key/environment on NVIDIA's GenAI or integration services. Listing the available models (`https://integrate.api.nvidia.com/v1/models`) does not show any `flux` or `klein` model in the authorized list for this API key.

## 2. FLUX base endpoints on NVIDIA generally do not support `img2img`.
As a supplementary note, even if we use the available FLUX endpoint (e.g., `black-forest-labs/flux.1-schnell`), attempting to pass an initial image payload results in a `422 Unprocessable Entity` error. The NVIDIA FLUX models are strictly configured for "base mode" (text-to-image).
```
{"detail":"Image input is not supported in the base mode"}
```
This means the underlying API architecture for FLUX on NVIDIA doesn't currently accept image inputs for editing/img2img workflows, regardless of the specific FLUX variant.
