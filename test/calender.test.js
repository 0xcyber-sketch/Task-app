import { assert } from 'chai'
import cal from '../models/calender.js'

describe("My callender", () => {

    let c1 = new cal()
    let t = "Test"

    it('1) Calender is created empty', () => {
        // Test one
        let subject = c1.getTasks().length
        assert.strictEqual(subject, 0, "Tasks aren't empty")
    })

    it('2) Calender dynamiccally increments ID', () => {
        // Test 
        let s1 = c1.getId()
        let c2 = new cal()
        let c3 = new cal()
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
    



    it('Delete task', () => {
        let subject = c1.getTasks().length
        assert.isAtLeast(subject, 1, "Length is less than 1")

        subject = c1.deleteTask(t)
        assert.include(c1.getTasks(),t, "Still contains object")
    })
}) 