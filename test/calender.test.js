import { assert, expect } from 'chai'
import Factory from '../models/factory.js'
import Task from '../models/task.js'

describe("My callender", () => {

    
    let fac = new Factory()
    let c1 = fac.createCalenderFactory("Task 1", 13, "title", "description")
    let t = fac.createTaskFactory("title", "des")

    it('1) Calender is created empty', () => {
        // Test one
        let subject = c1.getTasks().length
        assert.strictEqual(subject, 0, "Tasks aren't empty")
    })

    it('2) Calender dynamiccally increments ID', () => {
        // Test 
        let c2 = fac.createCalenderFactory('pre', 13, "title", "description")
        let c3 = fac.createCalenderFactory('pre', 13, "title", "description")

        let s1 = c1.getId()
        let s2 = c3.getId()
        let s3 = c2.getId()

        assert.strictEqual(s1, 1, "ID is not incremented")
        assert.strictEqual(s2, 3, "ID is not incremented")
        assert.strictEqual(s3, 2, "ID is not incremented")
    })

    it('3) Add tasks', () => {
        
        let c1 = fac.createCalenderFactory('pre', 13, "title", "description")
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

        let c = fac.createCalenderFactory('pre', 24, "title", "description")

        c.addTask(new Task("some task", "some description"))
        c.addTask(new Task("some task", "some description"))
        c.addTask(new Task("some task", "some description"))



        let subject = c.getTasks().length
        assert.strictEqual(subject, 3, "Elements aren't added to the calender object")
        let t1 = c.findTask(6)
        c.deleteTask(t1)
        subject = c.getTasks().length
        assert.strictEqual(subject, 2, "Element is not deleted to the calender object")

       

    })

    
}) 