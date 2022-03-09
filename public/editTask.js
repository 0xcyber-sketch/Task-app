async function editTask() {
    let oldTitle = ""
    let oldDescribtion = ""
    let taskID = ""
    let firstChecked = false

    for (let element of document.querySelectorAll('input')) {
        if (element.checked && !firstChecked) {
            oldTitle = element.parentElement.previousElementSibling.previousElementSibling.innerText
            oldDescribtion = element.parentElement.previousElementSibling.innerText
            taskID = element.value
            firstChecked = true
        }
    }

    let newTitle = document.getElementById("ett").value
    let newDescription = document.getElementById("etd").value

    if (validate) {
        let id = getCIDFromURL()
        let data = {ID : id, TaskID : taskID}
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
       await post(data, '/u/home/edit/task/')
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