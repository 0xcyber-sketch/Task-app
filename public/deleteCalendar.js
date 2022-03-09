async function deleteCalendar() {
    let data = {Calendars: []}

    let nodes = document.querySelectorAll('input')

    for (element of nodes) {
        if (element.checked) {
            data.Calendars.push(parseInt(element.value))
            
        }
    }
    if (data.Calendars.length > 0) {
        await post(data, '/u/home/delete/calendar/')
        window.location.href = "http://localhost:8080/u/home"
    }
    else {
        alert("Empty")
    }

}

function openDeleteModal() {

}