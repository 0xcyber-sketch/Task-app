

const  task = (() => {
    let lastID = 0
    return class Task {

        #id
        #title
        #description

        constructor(title, description) {
            this.#id = lastID
            lastID++
            this.#title = title
            this.#description = description
        }

        getId() {
            return this.#id
        }

        getTitle() {
            return this.#title
        }

        setTitle(t) {
            this.#title = "" + t
        }

        getDescription() {
            return this.#description
        }

        setDescription(d) {
            this.#description = "" + d
        }

    }

})()

export default task