async function signInGuest() {
    const data = { uname: "guest", psw: "******", email: "guest@guest.com" }
    await post(data, '/signIn')
    window.location = "/u/home"}