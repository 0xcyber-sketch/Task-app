import Controller from '../controller/controller.js'
import { assert, expect } from "chai";


describe("My controller", () => {

    let controller = new Controller()

    it('1) Create calender', () => {
        let subject = controller.createCalender('pre', 13, "title", "description")


        assert.notStrictEqual(subject, undefined, "Calender obj is not created")
        assert.isNotNull(subject, "Calender obj is not created")
        assert.isAbove(controller.getCalenders().length, 0, "Calender isn't added to calenders list") 

        
        assert.throws(() => controller.createCalender("test", "error"), Error, "Days has to be a number!")

    })


    it ('2) Update task properly', () => {
        
        let c1 = controller.createCalender('pre', 13, "title", "description")
        controller.addTaskToCalender(c1, "old", "old" , 5)

        

        let t1 = c1.findTask(9) 

        controller.updateTask(t1, "new", "new")

        assert.notStrictEqual(t1.getTitle(), "old", "Title aren't updated")
        assert.notStrictEqual(t1.getDescription(), "old", "Description aren't updated")

        controller.addTaskToCalender(c1, "old", "old", 7)
        let t2 = c1.findTask(10)
        controller.updateTask(t2, "new", "")

        assert.notStrictEqual(t2.getTitle(), "old", "Title aren't updated")

        controller.addTaskToCalender(c1, "old", "old", 8)
        let t3 = c1.findTask(11)
        controller.updateTask(t3, "", "new")


        assert.strictEqual(t3.getTitle(), "old", "Title are changed")


    })

   

    it('3) Task deleted from calender', () => {
        let c1 = controller.createCalender('pre', 13, "title", "description")


        controller.addTaskToCalender(c1,"some task", "some description",4)
        controller.addTaskToCalender(c1,"some task", "some description", 4)
        controller.addTaskToCalender(c1,"some task", "some description", 7)

        
        
        let t1 = c1.findTask(12)
       
        assert.strictEqual(c1.getTasks().length, 3)
        controller.deleteTaskFromCalender(c1,t1)
        assert.strictEqual(c1.getTasks().length, 2)

    })

    it('4) Find calender by id', () => {

        let con = new Controller()
        con.createCalender('pre', 13, "title", "description")
        let c1 = con.createCalender('pre', 13, "title", "description")
        con.createCalender('pre', 13, "title", "description")


        let subject = con.getcalenderFromID(c1.getId())

        expect(con.getCalenders()).to.include(subject)

        con.deleteCalender(c1)

        
        
        assert.throws(() => con.getcalenderFromID(c1.getId()), Error, "Calender is not in the calender list")

    })


    it('5) Delete calender', () => {

        let con = new Controller()

        let c1 = con.createCalender('pre', 13, "title", "description")
        let c2 = con.createCalender('pre', 13, "title", "description")
        let c3 = con.createCalender('pre', 13, "title", "description")

        let subject = con.getCalenders().length
        assert.strictEqual(subject, 3, "Elements aren't added to the calender object")

        con.deleteCalender(c2)
        subject = con.getCalenders().length
        assert.strictEqual(subject, 2, "Element is not deleted to the calender object")
    })

})