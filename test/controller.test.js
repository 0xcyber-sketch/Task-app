import Controller from '../controller/controller.js'
import { assert, expect } from "chai";


describe("My controller", () => {

    let controller = new Controller()

    it('1) Create calender', () => {
        let subject = null
        subject = controller.createCalender()


        assert.notStrictEqual(subject, undefined, "Calender obj is not created")
        assert.isNotNull(subject, "Calender obj is not created")


    })

    it('2) Create Task', () => {
        let subject = null
        subject = controller.createTask("task", "Some description")


        assert.notStrictEqual(subject, undefined, "Task obj is not created")
        assert.isNotNull(subject, "Calender obj is not created")


    })

    it ('3) Update task properly', () => {
        let t1 = controller.createTask("old", "old")
        controller.updateTask(t1, "new", "new")

        assert.notStrictEqual(t1.getTitle(), "old", "Title aren't updated")
        assert.notStrictEqual(t1.getDescription(), "old", "Description aren't updated")

        let t2 = controller.createTask("old", "old")
        controller.updateTask(t2, "new", "")

        assert.notStrictEqual(t2.getTitle(), "old", "Title aren't updated")
        assert.strictEqual(t2.getDescription(), "old", "Description are changed")

        
        let t3 = controller.createTask("old", "old")
        controller.updateTask(t3, "", "new")

        assert.strictEqual(t3.getTitle(), "old", "Title are changed")
        assert.notStrictEqual(t3.getDescription(), "old", "Description aren't updated")

    })

    it('5) Task added to a calender', () => {
        let c1 = controller.createCalender()
        let t1 = controller.createTask("some task", "some description")

        controller.addTaskForCalender(c1, t1)
        assert.strictEqual(c1.getTasks().length, 1, "Task aren't added to the calender")

        let t2 = "Task as a string"
        let t3 = 6372

        assert.throws(() => controller.addTaskForCalender(c1, t2) , Error, "Task is not a task object")
        assert.throws(() => controller.addTaskForCalender(c1, t3) , Error, "Task is not a task object")





    })

    it('6) Task deleted from calender', () => {
        let c1 = controller.createCalender()
        let t1 = controller.createTask("some task", "some description")
        let t2 = controller.createTask("some task", "some description")
        let t3 = controller.createTask("some task", "some description")

        controller.addTaskForCalender(c1, t1)
        controller.addTaskForCalender(c1, t2)
        controller.addTaskForCalender(c1, t3)

        assert.strictEqual(c1.getTasks().length, 3)
        controller.deleteTaskFromCalender(c1,t2)
        
        assert.strictEqual(c1.getTasks().length, 2)
   
        // figure out how to set a class object to null/undefined
        //assert.isNull(t2, "Task weren't deleted")


    })


})