async function deleteTask() {
    
    let id = getCIDFromURL()
    let data = {Tasks: [], ID: id}
    let nodes = document.querySelectorAll('input')

    for (element of nodes) {
        if (element.checked) {
            data.Tasks.push(parseInt(element.value))
            
        }
    }
    if (data.Tasks.length > 0) {
        await post(data, '/u/home/delete/task/')
        window.location.href = "http://localhost:8080/u/calender/" +id
    }
    else {
        alert("Empty")
    }

}

function openDeleteModal() {

}