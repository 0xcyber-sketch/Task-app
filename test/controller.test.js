import Controller from '../controller/controller.js'
import { assert } from "chai";


describe("My controller", () => {

    let controller = new Controller()

    it('1) Create calender', () => {
        let subject = null
        subject = controller.createCalender()


        assert.notStrictEqual(subject, undefined, "Calender obj is not created")
        assert.isNotNull(subject, "Calender obj is not created")


    })


    it ('2) Update task properly', () => {
        
        let c1 = controller.createCalender()
        controller.addTaskToCalender(c1, "old", "old")

        

        let t1 = c1.findTask(5) 

        controller.updateTask(t1, "new", "new")

        assert.notStrictEqual(t1.getTitle(), "old", "Title aren't updated")
        assert.notStrictEqual(t1.getDescription(), "old", "Description aren't updated")

        controller.addTaskToCalender(c1, "old", "old")
        let t2 = c1.findTask(6)
        controller.updateTask(t2, "new", "")

        assert.notStrictEqual(t2.getTitle(), "old", "Title aren't updated")
        assert.strictEqual(t2.getDescription(), "old", "Description are changed")

        controller.addTaskToCalender(c1, "old", "old")
        let t3 = c1.findTask(7)
        controller.updateTask(t3, "", "new")


        assert.strictEqual(t3.getTitle(), "old", "Title are changed")
        assert.notStrictEqual(t3.getDescription(), "old", "Description aren't updated")


    })

   

    it('3) Task deleted from calender', () => {
        let c1 = controller.createCalender()


        controller.addTaskToCalender(c1,"some task", "some description")
        controller.addTaskToCalender(c1,"some task", "some description")
        controller.addTaskToCalender(c1,"some task", "some description")

        
        
        let t1 = c1.findTask(9)

       
        assert.strictEqual(c1.getTasks().length, 3)
        controller.deleteTaskFromCalender(c1,t1)
        
        assert.strictEqual(c1.getTasks().length, 2)
   
        // figure out how to set a class object to null/undefined
        //assert.isNull(t2, "Task weren't deleted")


    })


})