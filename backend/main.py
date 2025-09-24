from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import io
import torch
from torchvision import models, transforms
import torch.nn as nn

app = FastAPI()

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Classes - make sure this matches your training classes
class_names = ['Melanoma', 'Benign', 'Carcinoma']

# Load model architecture and weights
def load_model():
    model = models.resnet18(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, len(class_names))
    model.load_state_dict(torch.load('skin_disease_classifier.pth', map_location=device))
    model.eval()
    model.to(device)
    return model

model = load_model()

# Image transforms — must match training
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read uploaded image bytes and convert to PIL Image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Apply transforms and add batch dimension
        input_tensor = transform(image).unsqueeze(0).to(device)

        # Forward pass
        with torch.no_grad():
            outputs = model(input_tensor)
            probs = torch.nn.functional.softmax(outputs, dim=1)
            conf, pred_idx = torch.max(probs, 1)
            predicted_class = class_names[pred_idx.item()]
            confidence = conf.item()

        return JSONResponse({
            "class": predicted_class,
            "confidence": confidence
        })

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)
