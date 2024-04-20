const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient_route.js');
const uploadRoute = require('./routes/upload_route.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/patients', patientRoutes);
app.use('/api', uploadRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
