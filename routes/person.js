const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET /person: Displays a table with a list of people
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        console.log(people); // Log the people to check the data
        // res.json({
        //     people: people.map(people => ({
        //         name: people.name,
        //         age: people.age,
        //         gender: people.gender,
        //         mobile:people.mobile,
        //         _id: people._id
        //     }))
        // })
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
        const user = await Person.create({
            name: name,
            age: age,
            gender:gender,
            mobile: mobile,
        })
        res.status(201).send(newPerson);
    } catch (err) {
        res.status(400).send(err);
    }
});

// PUT /person/{id}: Displays a form through which a person with a specified id parameter can be edited and updated
router.put('/', async (req, res) => {
    // const { id } = req.params;
    // const updates = req.body;
    // try {
    //     const updatedPerson = await Person.findByIdAndUpdate(id, updates, { new: true });
    //     res.json(updatedPerson);
    // } catch (err) {
    //     res.status(400).send(err);
    // }

    const { name, age, gender, mobile } = req.body;
    const newPerson = new Person({ name, age, gender, mobile });
   

	await Person.updateOne({ name: name }, req.body);
	
    res.json({
        message: "Updated successfully",
        newPerson
    })
});

router.delete('/', async (req, res) => {
    const { name} = req.body;
    try {
        await Person.deleteOne({name:name});
        res.status(204).send("deleted");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
