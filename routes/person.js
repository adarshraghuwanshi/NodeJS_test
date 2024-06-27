const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET /person: Displays a table with a list of people
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        console.log(people); // Log the people to check the data
        res.json(people);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST /person: Displays a form to create a single person
router.post('/', async (req, res) => {
    const { name, age, gender, mobile } = req.body;
    const newPerson = new Person({ name, age, gender, mobile });
    try {
        await newPerson.save();
        res.status(201).send(newPerson);
    } catch (err) {
        res.status(400).send(err);
    }
});

// PUT /person/{id}: Displays a form through which a person with a specified id parameter can be edited and updated
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedPerson);
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE /person/{id}: Displays a page through which a person with a specified id can be deleted
router.delete('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        await Person.findByIdAndDelete(name);
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
