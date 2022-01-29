

const  Calender = (() => {
    let lastID = 0
    return class Calender {

        #id
        #tasks

        constructor() {
            this.#id = ++lastID
            this.#tasks = []
        }

        getId() {
            return this.#id
        }

        getTasks() {
            return this.#tasks
        }

        addTask(task) {
            if (task !== typeof(Task)) throw new Error("Type doesn't match")
            return "Task added"
        }

    }

})()

let c = new Calender()

console.log(c.getTasks().length);

export default Calender