from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings
from web3 import Web3

INFURA_URL="https://sepolia.infura.io/v3/b13adaf2665b4a53b4d824bf7bd6c99b"
CONTRACT_ADDRESS = "0xF5C2CA3aC480Ba84A3E5051d23e5B42ae19A8f91";
CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "deleteLocation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "phoneNo",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "latitude",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "longitude",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "ipfsAddress",
				"type": "string"
			}
		],
		"name": "LocationAdded",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "LocationDeleted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phoneNo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_latitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_longitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsAddress",
				"type": "string"
			}
		],
		"name": "storeLocation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllLocations",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phoneNo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "latitude",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "longitude",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsAddress",
						"type": "string"
					}
				],
				"internalType": "struct IPFSLocationStorage.LocationData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getLocation",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phoneNo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "latitude",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "longitude",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsAddress",
						"type": "string"
					}
				],
				"internalType": "struct IPFSLocationStorage.LocationData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "locations",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "latitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "longitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsAddress",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

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

web3 = Web3(Web3.HTTPProvider(INFURA_URL))

def fetch_all_locations(request):
    try:
        if not web3.is_connected():
            return JsonResponse({"error": "Unable to connect to blockchain"}, status=500)

        contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
        locations = contract.functions.getAllLocations().call()

        response_data = [
            {
                "name": location[0],
                "phoneNo": location[1],
                "description": location[2],
                "latitude": location[3],
                "longitude": location[4],
                "ipfsAddress": location[5]
            }
            for location in locations
        ]

        return JsonResponse(response_data, safe=False)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)