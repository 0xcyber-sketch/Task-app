

function addevents() {
    for (let node of document.querySelectorAll('td')) {
        node.onclick = onClickFunction
    }
}

function onClickFunction(event) {
    let node = event.target
    let data
    if (node.nodeName === 'TD') {
        node.lastElementChild.firstElementChild.style.display = 'block'
        data = node.lastElementChild.lastElementChild.innerHTML
    }
    else {
        node.previousElementSibling.style.display = 'block'
        data = node.innerHTML

    }

    data = { data: parseInt(data.split(" ")[1]), calendarId: getCIDFromURL() }
    post(data, '/u/day/checked/')



}

async function addTaskHandler() {
    let data = {}
    data.title = document.querySelectorAll('input')[0].value
    data.description = document.getElementById("taskDes").value
    data.calendarID = getCIDFromURL()
    data.day = parseInt(document.querySelectorAll('input')[1].value)


    const res = await post(data, '/u/task/add/')
    if (res.status === 201) {
        window.location = window.location.href
    }
    

}


function main() {
    addevents()
}
main()