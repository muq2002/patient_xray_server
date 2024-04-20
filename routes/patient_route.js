const express = require('express');
const pool = require('../config/config_db.js');

const router = express.Router();

router.post('/', (req, res) => {
    const { name, age, gender, uuid } = req.body;
    const query = `INSERT INTO patient_table (Name, Age, Gender, UUID) VALUES (?, ?, ?, ?)`;
    pool.query(query, [name, age, gender, uuid], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Failed to save patient data' });
            return;
        }
        console.log('Patient data saved successfully');
        res.status(201).json({ message: 'Patient data saved successfully' });
    });
});


router.get('/', (req, res) => {
    const query = `SELECT * FROM patient_table`;
    pool.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Failed to fetch patients' });
            return;
        }
        res.status(200).json(results);
    });
});


router.get('/:id', (req, res) => {
    const patientId = req.params.id;
    const query = `SELECT * FROM patient_table WHERE ID = ?`;
    pool.query(query, [patientId], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Failed to fetch patient by ID' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        res.status(200).json(results[0]);
    });
});

router.get('/uuid/:id', (req, res) => {
    const patientId = req.params.id;
    const query = `SELECT * FROM patient_table WHERE UUID = ?`;
    pool.query(query, [patientId], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Failed to fetch patient by UUID' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        res.status(200).json(results[0]);
    });
});

module.exports = router;
