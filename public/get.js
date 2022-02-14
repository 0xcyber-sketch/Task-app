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