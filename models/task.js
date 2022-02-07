

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
            if(typeof(d) !== 'number') throw new Error("Input day is not a number")
            if (d < 0) throw new Error("Day has to be greater than 0")
            if (this.#findDaySearch(d) === -1 ) {
                this.#days.push(Math.floor(d))
            }
            
        }

        #findDaySearch(x) {
            let index = -1
            let i = 0
            while (index === -1 && i < this.#days.length) {
                if (this.#days[i] === x) {
                    index = i
                }
                else {
                    i++
                }
            }
            return index
        }

        // Delete task

    }

})()



export default task