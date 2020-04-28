const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create a task
router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body, // add all properties from req.body
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get user's tasks with filter on completed and pagination
// filtering:   GET /tasks?completed=<bool>
// pagination:  GET /tasks?limit=<int>&skip=<int>
// sorting:     GET /tasks/sortBy=createdAt[:asc][:desc]

router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {}
        const sort = {}

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// Get a user's task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    if (_id.length != 24) {
        return res.status(400).send({error: 'ID must be 24 characters'})
    }

    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) return res.status(404).send()

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// Update a user's task
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(400).send({error: 'ID must be 24 characters'})
    }
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdates) return res.status(400).send({ error: 'Invalid updates!'})
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) return res.status(404).send()
        updates.forEach((update) => task[update]=req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete a user's task
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    if (_id.length != 24) {
        return res.status(400).send({error: 'ID must be 24 characters'})
    }
    try{
        const task = await Task.findOneAndDelete({_id, owner:req.user._id})
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
