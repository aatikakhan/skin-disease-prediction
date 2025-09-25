# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





Here are the run commands for your skin disease detection application:

## 🚀 **Frontend (React App) Commands:**

### **Start Development Server:**
```bash
cd /Users/ak/TFox/college/skin-disease-prediction/frontent/SkinDiseaseDetection
npm run dev
```

### **Build for Production:**
```bash
npm run build
```

### **Preview Production Build:**
```bash
npm run preview
```

### **Run Linting:**
```bash
npm run lint
```

## 🔧 **Backend (ML API) Commands:**

### **If using FastAPI/Python:**
```bash
# Navigate to your backend directory
cd /path/to/your/backend

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### **If using Flask:**
```bash
# Navigate to your backend directory
cd /path/to/your/backend

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

## �� **Complete Setup Commands:**

### **1. Start Frontend:**
```bash
cd /Users/ak/TFox/college/skin-disease-prediction/frontent/SkinDiseaseDetection
npm run dev
```

### **2. Start Backend (in a new terminal):**
```bash
# Navigate to your ML backend directory
cd /path/to/your/ml/backend
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## 🌐 **Access URLs:**

- **Frontend:** http://localhost:5173/
- **Backend API:** http://127.0.0.1:8000/
- **API Documentation:** http://127.0.0.1:8000/docs

## 🔍 **Testing Commands:**

### **Test API Endpoint:**
```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: multipart/form-data" \
  -F "file=@your_image.jpg"
```

### **Check if Backend is Running:**
```bash
curl http://127.0.0.1:8000/docs
```

## 🛠️ **Development Workflow:**

1. **Start Backend First:**
   ```bash
   # Terminal 1
   cd /path/to/your/ml/backend
   uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```

2. **Start Frontend:**
   ```bash
   # Terminal 2
   cd /Users/ak/TFox/college/skin-disease-prediction/frontent/SkinDiseaseDetection
   npm run dev
   ```

3. **Open Browser:**
   - Go to http://localhost:5173/
   - Toggle "Test Mode" OFF to use real ML backend
   - Upload an image and test the prediction

## 🚨 **Troubleshooting:**

### **If Frontend Shows Connection Error:**
- Make sure backend is running on port 8000
- Check CORS settings in your backend
- Use "Test Mode" toggle for demo without backend

### **If Dependencies Missing:**
```bash
# Frontend
npm install

# Backend (Python)
pip install -r requirements.txt
```

Your skin disease detection app should now be running with both frontend and backend! 🎉