import json
import random
from google.cloud import aiplatform
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value
from google.cloud import firestore

def getTourPackages(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
    project, endpoint_id, location ="497230236321", "3053959516845506560", "us-central1"
    client = aiplatform.gapic.PredictionServiceClient(client_options={"api_endpoint": "us-central1-aiplatform.googleapis.com"})    
    endpoint = client.endpoint_path(
        project=project, location=location, endpoint=endpoint_id
    )
    requestBody = request.get_json()
    instances = [json_format.ParseDict({"index": str(random.randint(1,2000)),"days": request_json_data["days"]}, Value())]
    parameters = json_format.ParseDict({}, Value())
    response = client.predict(
        endpoint=endpoint, instances=instances, parameters=parameters
    )
    prediction_dict = dict(response.predictions[0])
    result_data = dict(zip(prediction_dict['classes'], prediction_dict['scores']))
    recommended_tours = sorted(result_data.items(), key=lambda x: x[1], reverse=True)

    db = firestore.Client()
    docs = db.collection('packages-offerred').stream()
    packages = []
    for doc in docs:
        docs_dict = doc.to_dict()
        if(str(docs_dict["days"]) == str(request_json_data["days"])):
           packages.append(docs_dict)
    response_data = {}
    response_data["packages"]= packages
    response_data["recommendation"] = recommended_tours[0][0]
    return response_data, 200, headers