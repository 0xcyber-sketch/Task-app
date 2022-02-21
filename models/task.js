

const  Task = (() => {
    let lastID = 1
    return class Task {

        #id
        #title
        #description
        #days

        constructor(title, description, day) {
            this.#id = lastID
            lastID++
            this.#title = title
            this.#description = description
            this.#days = []
            if (day !== undefined) {
                this.addDay(day)
            } 
            
        }

        getId() {
            return this.#id
        }

        setId(id) {
            this.#id = id
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
            if (Array.isArray(d)) {
                if (d.length === 0) throw new Error("List is empty")
                let type = typeof(d[0])
                if (type !== 'number') throw new Error("Type is not a number")
                if(!d.every(e => typeof(e) === type)) throw new Error("List has to consist of numbers")
                d.forEach(value => {
                    if (this.#findDaySearch(value) === -1 ) {
                        this.#days.push(Math.floor(value))
                    }
                })

            }
            else if (typeof(d) === 'number') {
                if (d < 0) throw new Error("Day has to be greater than 0")
                            
            if (this.#findDaySearch(d) === -1 ) {
                this.#days.push(Math.floor(d))
            }

            }
            else {
                throw new Error("Input day is not a number or an Array of numbers")
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



export default Task