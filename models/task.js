

const  task = (() => {
    let lastID = 1
    return class Task {

        #id
        #title
        #description
        #days

        constructor(title, description) {
            this.#id = lastID
            lastID++
            this.#title = title
            this.#description = description
            this.#days = []
        }

        getId() {
            return this.#id
        }

        getTitle() {
            return this.#title
        }

        setTitle(t) {
            this.#title = t
        }

        getDescription() {
            return this.#description
        }

        setDescription(d) {
            this.#description = d
        }

        getDays() {
            return [...this.#days]
        }

        addDay(d) {
            this.#days.push(d)
        }

        // Delete task

    }

})()



export default task