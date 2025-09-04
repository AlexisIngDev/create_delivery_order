

#!/bin/bash
set -e

export REGION=us-central1
export IMAGE=gcr.io/development-415817/test-prueba:latest

echo "🔧 Compilando y subiendo imagen a Cloud Build..."
gcloud builds submit --tag $IMAGE

echo "🚀 Desplegando en Cloud Run..."
gcloud run deploy test-prueba \
  --image $IMAGE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8082 \
  --memory 512Mi

echo "✅ Despliegue completado exitosamente."
