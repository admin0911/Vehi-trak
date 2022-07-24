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

    //CHeck if tasks are toggled as complete
    it('toggles task completion', async () => {
        const result = await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed,true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(),1)
        assert.equal(event.completed,true)
    })

    it('Create request', async () => {
        const result = await this.todoList.requestTask("91169 MCT","Adharsh","R8","Audi");
        const taskCount = await this.todoList.requestCount()
        console.log(assert.equal(taskCount,1))
        assert.equal(taskCount,1)
    })

    it('Check status', async () => {
        console.log("Check Status!!")
        const result = await this.todoList.requestTask("91169 MCT","Adharsh","R8","Audi");
        const re = await this.todolist.statusCompleted(1,"true")
        console.log(result,re)
        const r = await this.todolist.requests(1)
        assert.equal(re.status,"Verified")
        assert.equal(re.status,"Verified")
        console.log(assert.equal(result.status,"Verified"))
        
        console.log(r)

    })
})