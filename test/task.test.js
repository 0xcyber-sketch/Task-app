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

        assert.strictEqual(s1, 2, "ID is not incremented")
        assert.strictEqual(s2, 17, "ID is not incremented")
        assert.strictEqual(s3, 16, "ID is not incremented")
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

    it('5) Add day', () => {
        
        let t1 = fac.createTaskFactory("some task", "some description")

        assert.strictEqual(t1.getDays().length, 0, "Task's days list aren't created empty")

        t1.addDay(7)
        

      
        assert.strictEqual(t1.getDays().length, 1, "Task's days list aren't updated")

       


        assert.throws(() =>  t1.addDay("Hello") , Error, "Input day is not a number")
        assert.throws(() => t1.addDay(-1)  , Error, "Day has to be greater than 0")

        t1.addDay(3)
        t1.addDay(2)

        t1.addDay(2)

        assert.strictEqual(t1.getDays().length, 3, "Task's days list is updated with an existing day")

    })




    
}) 