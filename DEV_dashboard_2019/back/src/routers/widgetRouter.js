const express = require('express')
const User = require('../models/user')
const Widget = require('../models/widget')

const auth = require('../middleware/auth')
const router = new express.Router()

// Create a widget
router.post('/widgets', auth, async (req, res) => {
    console.log(req.body)
    const widget = new Widget({
        ...req.body, // add all properties from req.body
        owner: req.user._id
    })
    try {
        await widget.save()
        res.status(201).send(widget)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all user's widgets
router.get('/widgets', auth, async (req, res) => {
    try {

        await req.user.populate({
            path: 'widgets',
        }).execPopulate()

        res.send(req.user.widgets)
    } catch (e) {
        res.status(500).send()
    }
})

// Update a user's widget
router.patch('/widgets/:id', auth, async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(400).send({error: 'ID must be 24 characters'})
    }
    const updates = Object.keys(req.body)
    console.log('updates', updates)
    const allowedUpdates = ['position','params']
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdates) return res.status(400).send({ error: 'Invalid updates!'})
    try{

        const widget = await Widget.findOne({_id, owner: req.user._id})
        if (!widget) return res.status(404).send()
        console.log("inside try")
        updates.forEach((update) => {
            console.log(widget[update])
            widget[update]=req.body[update]
        })
        await widget.save()
        res.send(widget)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete a user's widget
router.delete('/widgets/:id', auth, async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(400).send({error: 'ID must be 24 characters'})
    }
    try{
        const widget = await Widget.findOneAndDelete({_id, owner:req.user._id})
        if (!widget) return res.status(404).send()
        res.send(widget)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
