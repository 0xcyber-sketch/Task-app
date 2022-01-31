import Factory from "../models/factory.js";
import { assert } from "chai";

describe("My task", () => {

    let fac = new Factory()
    let t1 = fac.createTaskFactory("Task", "Description")


    it("1) Creating a task", () => {
        let t2 = null
        t2 = fac.createTaskFactory("Task", "Description")

        assert.isNotNull(t2, "Object weren't created")


    })
  
    it('2) Task dynamiccally increments ID', () => {
        // Test 
        let t2 = fac.createTaskFactory()
        let t3 = fac.createTaskFactory()

        let s1 = t1.getId()
        let s2 = t3.getId()
        let s3 = t2.getId()

        assert.strictEqual(s1, 0, "ID is not incremented")
        assert.strictEqual(s2, 5, "ID is not incremented")
        assert.strictEqual(s3, 4, "ID is not incremented")
    })

    it('3) set title', () => {
        assert.equal(t1.getTitle, t1.getTitle, "Title is not updated")

        t1.setTitle("New title")
        let newT = t1.getTitle()

        assert.strictEqual(newT,t1.getTitle(), "Title is not updated")



    }) 

    it('4) set description', () => {
        assert.equal(t1.getDescription(), t1.getDescription(), "Description is not updated")

        t1.setDescription("New description")
        let newD = t1.getDescription()

        assert.strictEqual(newD,t1.getDescription(), "Description is not updated")



    }) 


    
}) 