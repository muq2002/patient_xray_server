# Server-Side Architecture for Patient Registration and X-ray Diagnosis

Our patient registration app and X-ray diagnosis system feature a robust server-side architecture that combines the power of Node.js and Flask. The Node.js server handles patient registration, providing a fast and scalable backend to manage patient data, including personal details and uploaded X-ray images. It offers RESTful API endpoints for seamless integration with the client React app.

For the AI-powered X-ray diagnosis, we utilize a Flask server running a convolutional neural network (CNN) model trained to detect different types of fractures. The Flask server accepts requests from the Node.js server to analyze the uploaded X-ray images, processes them using the CNN model, and returns diagnostic results. This setup allows healthcare professionals to receive accurate and timely diagnoses, enhancing patient care.

Both servers prioritize security and data privacy, ensuring that patient information and medical data are handled with the utmost care. Together, the Node.js and Flask servers create an efficient and reliable backend system for patient registration and X-ray diagnosis.

---
