async function  updateCalendar() {
    let oldTitle = document.querySelectorAll('h1')[0].innerText
    let oldDescribtion = document.querySelectorAll('p')[0].innerText

    let newTitle = document.getElementById("ect").value
    let newDescription = document.getElementById("ecd").value

    if (validate) {
        let id = getCIDFromURL()
        let data = {ID : id}
        if (oldTitle !== newTitle) {
            data.Title = newTitle
        }
        else {
            data.Title = oldTitle
        }

        if (oldDescribtion !== newDescription) {
            data.Description = newDescription
        }
        else {
            data.Description = oldDescribtion
        }
       await post(data, '/u/home/edit/calendar/')
        window.location.href = "http://localhost:8080/u/calender/" + id
    }
    else {
        alert("Atleast 1 change has to be made")
    }


}

function validate(title, description) {
    if (title === "" && description === "") {
        return false
    }
    else {
        return true
    }

}