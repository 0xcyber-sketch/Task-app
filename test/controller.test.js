import Controller from '../controller/controller.js'
import { assert, expect } from "chai";


describe("My controller", () => {

    let controller = new Controller()

    it('1) Create calender', () => {
        let subject = null
        subject = controller.createCalender()


        assert.notStrictEqual(subject, undefined, "Calender obj is not created")
        assert.isNotNull(subject, "Calender obj is not created")
        assert.isAbove(controller.getCalenders().length, 0, "Calender isn't added to calenders list") 


    })


    it ('2) Update task properly', () => {
        
        let c1 = controller.createCalender()
        controller.addTaskToCalender(c1, "old", "old")

        

        let t1 = c1.findTask(8) 

        controller.updateTask(t1, "new", "new")

        assert.notStrictEqual(t1.getTitle(), "old", "Title aren't updated")
        assert.notStrictEqual(t1.getDescription(), "old", "Description aren't updated")

        controller.addTaskToCalender(c1, "old", "old")
        let t2 = c1.findTask(9)
        controller.updateTask(t2, "new", "")

        assert.notStrictEqual(t2.getTitle(), "old", "Title aren't updated")
        assert.strictEqual(t2.getDescription(), "old", "Description are changed")

        controller.addTaskToCalender(c1, "old", "old")
        let t3 = c1.findTask(10)
        controller.updateTask(t3, "", "new")


        assert.strictEqual(t3.getTitle(), "old", "Title are changed")
        assert.notStrictEqual(t3.getDescription(), "old", "Description aren't updated")


    })

   

    it('3) Task deleted from calender', () => {
        let c1 = controller.createCalender()


        controller.addTaskToCalender(c1,"some task", "some description")
        controller.addTaskToCalender(c1,"some task", "some description")
        controller.addTaskToCalender(c1,"some task", "some description")

        
        
        let t1 = c1.findTask(12)
       
        assert.strictEqual(c1.getTasks().length, 3)
        controller.deleteTaskFromCalender(c1,t1)
        assert.strictEqual(c1.getTasks().length, 2)

    })

    it('4) Find calender by id', () => {

        let con = new Controller()
        con.createCalender()
        let c1 = con.createCalender()
        con.createCalender()


        let subject = con.getcalenderFromID(c1.getId())

        expect(con.getCalenders()).to.include(subject)

        con.deleteCalender(c1)

        
        
        assert.throws(() => con.getcalenderFromID(c1.getId()), Error, "Calender is not in the calender list")

    })


    it('5) Delete calender', () => {

        let con = new Controller()

        let c1 = con.createCalender()
        let c2 = con.createCalender()
        let c3 = con.createCalender()

        let subject = con.getCalenders().length
        assert.strictEqual(subject, 3, "Elements aren't added to the calender object")

        con.deleteCalender(c2)
        subject = con.getCalenders().length
        assert.strictEqual(subject, 2, "Element is not deleted to the calender object")


       

    })

})