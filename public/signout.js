async function handleSignOut() {
    const response = await get("localhost:8080/logout")
    console.log(response);
    console.log("Signed out");
    console.log("AYE YOOOOOOOOOOO");

}

