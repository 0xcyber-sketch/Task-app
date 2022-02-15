async function handleSignOut() {
    const response = await get("/logout")
    if (response) {
        window.location = "/"}
    
    
}

