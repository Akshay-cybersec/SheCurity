from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings


@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, World!"})

@api_view(['GET'])
def ecommerce_data(request):
    return Response({"message": "ecommerce"})

@csrf_exempt
def upload_to_ipfs(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        file_path = default_storage.save(file.name, file)

        url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
        headers = {
            "pinata_api_key": settings.PINATA_API_KEY,
            "pinata_secret_api_key": settings.PINATA_SECRET_API_KEY,
        }
        
        with open(file_path, "rb") as f:
            response = requests.post(url, headers=headers, files={"file": f})
        if response.status_code == 200:
            ipfs_hash = response.json()["IpfsHash"]
            return JsonResponse({"success": True, "ipfs_hash": ipfs_hash, "url": f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"})
        else:
            return JsonResponse({"success": False, "error": response.text})

    return JsonResponse({"success": False, "error": "No file provided"})
