import Task from "./task.js"

const  Calender = (() => {
    let lastID = 1
    return class Calender {
        #id
        #tasks
        #type
        #days
        #description
        #title

        constructor(type, days, title, descripion) {
            this.#id = lastID
            this.#tasks = []
            lastID++
            this.#type = type
            this.#days = days
            this.#description = descripion || ""
            this.#title = title
            if (lastID === Number.MAX_SAFE_INTEGER) {
                lastID = 0
            }
        }

        getId() {
            return this.#id
        }

        setID(value) {
            this.#id = value

        }


        setLastID(value) {
            lastID = value
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
                this.#tasks.splice(i, 1)
            }
        }

        findTask(taskid) {
            let i = this.#findTaskSearch(taskid)
            if (i !== -1) {
                return this.#tasks[i]
            }else {
                console.log("Calendar: " + taskid);
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

        getType() {return this.#type}

        setType(type) {this.#tasks = type}

        getTitle() {return this.#title}

        setTitle(title) {this.#title = title}
        getDescription() {return this.#description}

        setDescription(des) {this.#description = des}

        getDays() {return this.#days}

        setDays(days) {
            if (typeof days !== 'number') throw new Error("Days has to be a number!")
            this.#days = Math.floor(days)
        }

    }

})()



export default Calender