# Start backend
cd backend && node index.js

# In new terminal: expose backend
npx ngrok http 3000

# Update BACKEND_URL in lib/api.ts

# Start app
npx expo start
