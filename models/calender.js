import Task from "./task.js"

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
            return [...this.#tasks]
        }

        addTask(task) {
            if (!(task instanceof Task)) throw new Error("Task is not a task object")
            this.#tasks.push(task)
        }

        deleteTask(task) {
            let i = this.#findTaskSearch(task.getId())
            if (i !== -1) {
                let arrNew = this.#tasks.splice(i, 1)


            }
        }

        findTask(taskid) {
            let i = this.#findTaskSearch(taskid)
            if (i !== -1) {
                return this.#tasks[i]
            }else {
                throw new Error("Task is not in the task list")
            }
        }

        #findTaskSearch(x) {
            // Look at binary search later
            let index = -1
            let i = 0
            while (index === -1 && i < this.#tasks.length) {
                if (this.#tasks[i].getId() === x) {
                    index = i
                } 
                else {
                    i++
                }
            }
            return index
        }

    }

})()



export default Calender