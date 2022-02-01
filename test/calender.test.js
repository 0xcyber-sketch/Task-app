import { assert, expect } from 'chai'
import Factory from '../models/factory.js'

describe("My callender", () => {

    
    let fac = new Factory()
    let c1 = fac.createCalenderFactory("Task 1", "Some description")
    let t = fac.createTaskFactory("title", "des")

    it('1) Calender is created empty', () => {
        // Test one
        let subject = c1.getTasks().length
        assert.strictEqual(subject, 0, "Tasks aren't empty")
    })

    it('2) Calender dynamiccally increments ID', () => {
        // Test 
        let c2 = fac.createCalenderFactory("Task 2", "Some description")
        let c3 = fac.createCalenderFactory("Task 3", "Some description")

        let s1 = c1.getId()
        let s2 = c3.getId()
        let s3 = c2.getId()

        assert.strictEqual(s1, 0, "ID is not incremented")
        assert.strictEqual(s2, 2, "ID is not incremented")
        assert.strictEqual(s3, 1, "ID is not incremented")
    })

    it('3) Add tasks', () => {
        
        let c1 = fac.createCalenderFactory()
        let t1 = fac.createTaskFactory("some task", "some description")

        c1.addTask(t1)
        assert.strictEqual(c1.getTasks().length, 1, "Task aren't added to the calender")

        let t2 = "Task as a string"
        let t3 = 6372

        assert.throws(() => c1.addTask(t2) , Error, "Task is not a task object")
        assert.throws(() => c1.addTask(t3) , Error, "Task is not a task object")

    })
    
    it ('4) find task', () => {
        let t1 = fac.createTaskFactory("task 2", "test")
        let t1Id = t1.getId()
        c1.addTask(t1)

        let subject = c1.findTask(t1Id)
    

        expect(c1.getTasks()).to.include(subject)

        let t2 = fac.createTaskFactory("task 3", "test")

        subject = t2.getId()

        assert.throws(() => c1.findTask(subject), Error, "Task is not in the task list")


    })


    it('5) Delete task', () => {
        let subject = c1.getTasks().length
        assert.isAtLeast(subject, 1, "Length is less than 2")

        c1.deleteTask(t)
        subject = c1.getTasks().length
        assert.strictEqual(subject, 1, "Object is still there")
    })

    
}) 