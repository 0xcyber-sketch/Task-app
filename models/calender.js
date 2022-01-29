

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
                this.#tasks.slice(i, 1)

            }
        }

    }

})()


export default Calender