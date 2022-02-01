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
        
        
        let subject = c1.getTasks().length
        assert.strictEqual(subject, 0, "Tasks aren't empty")
        c1.addTask(t)

        subject = c1.getTasks().length
        assert.strictEqual(subject, 1, "Tasks didn't update")

    })
    
    it ('4) find task', () => {
        let t1 = fac.createTaskFactory("task 2", "test")
        c1.addTask(t1)

        let subject = c1.findTask(t1)
    

        expect(c1.getTasks()).to.include(subject)

        let t2 = fac.createTaskFactory("task 3", "test")

        subject = t2

        assert.throws(() => c1.findTask(subject), Error, "Task is not in the task list")


    })


    it('5) Delete task', () => {
        let subject = c1.getTasks().length
        assert.isAtLeast(subject, 2, "Length is less than 2")

        c1.deleteTask(t)
        subject = c1.getTasks().length
        assert.strictEqual(subject, 1, "Object is still there")
    })

    
}) 