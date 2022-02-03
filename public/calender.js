

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
    data = { data: parseInt(data.split(" ")[1]) }
    post(data)

}



async function post(data) {
    await fetch('/calender/checked', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

function main() {
    addevents()
}
main()