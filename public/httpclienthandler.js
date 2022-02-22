async function get(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    })

    if (!response.ok) throw new Error(response.status)

    return await response.json()

}

async function post(data, url) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error(response.status)

    return response

}

async function deleteData(itemID, url) {
    const response = await fetch(url + itemID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) throw new Error(response.status)

    return response
}