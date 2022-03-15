async function signInGuest() {
    const data = { uname: "guest", psw: "******", email: "guest@guest.com" }
    const res = await post(data, '/signIn')
    if (res.status === 200) {
        window.location = "/u/home"}
    }
    