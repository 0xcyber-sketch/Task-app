

const  Calender = (() => {
    let lastID = 0
    return class Calender {

        #id
        #tasks

        constructor() {
            this.#id = lastID
            this.#tasks = []
            lastID++
        }

        getId() {
            return this.#id
        }

        getTasks() {
            return this.#tasks
        }

        addTask(task) {
            this.#tasks.push(task)
        }

        deleteTask(task) {
            if (this.#tasks.includes(task)) {
                let i = this.#tasks.indexOf(task)
                this.#tasks.splice(i, 1)

            }
        }

        findTask(task) {
            if (this.#tasks.includes(task)) {
                let i = this.#tasks.indexOf(task)
                return this.#tasks[i]
            }else {
                throw new Error("Task is not in the task list")
            }
        }

    }

})()


export default Calender