const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const items = require('../fakeDb');

/* GET route */
router.get('/', (req, res) => {
    return res.json({ items })
})

/* POST route */
router.post('/', function(req, res, next){
    try {
        if (!req.body.name && !req.body.price) throw new ExpressError("Name and Price is required", 400);
        const newItem = { name: req.body.name, price: req.body.price };
        items.push(newItem);
        return res.status(201).json({ added: newItem});
    } catch (e) {
        return next(e);
    }
});

/* GET route for a specific name of item */
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem === undefined) throw new ExpressError("Item not found", 404);
    return res.json({ item: foundItem });
});

/* PATCH route for updating an existing item */
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem === undefined) throw new ExpressError ("Item not found", 404);
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    return res.json({ updated: foundItem });
});

/* DELETE router for deleting an exsiting item */
router.delete('/:name', (req, res) => {
    const indexFoundItem = items.findIndex(item => item.name === req.params.name);
    if (indexFoundItem === -1) throw new ExpressError ("Item not found", 404);
    items.splice(indexFoundItem, 1)
    return res.json({ message: "Deleted" });
});

module.exports = router;