// TO run this file type " truffle test " in the console
const { assert } = require("chai")

const TodoList = artifacts.require('./ToDoList.sol')

contract('ToDoList', (accounts) => {
    before(async () => {
        this.todoList = await TodoList.deployed() //creates a copy of todolist bfr each test is run
    })

    // Checking if we are connected to the proper account
    it('Deployed succesfully', async () => { 
        const address = await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    // Check if the tasks are being listed
    it('lists tasks', async () => {
        const taskCount = await this.todoList.taskCount()
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, 'CHeckout Batcave') //we are only checking the first task
        assert.equal(task.completed, false)
        assert.equal(taskCount.toNumber(), 1)
    })

    // CHeck if tasks are being created
    it('creates tasks', async () => {
        const result = await this.todoList.createTask('A new Task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount,2)
        // console.log(result)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(),2)
        assert.equal(event.content, 'A new Task')
        assert.equal(event.completed,false)
    })

})