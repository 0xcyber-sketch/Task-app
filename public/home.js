




function change(radioButton) {
    let nodePre = document.querySelectorAll('form > div')[0]
    let nodeCus = document.querySelectorAll('form > div')[1]
    if (radioButton.value === "Pre-defined") {
        nodePre.style.display = "block"
        nodeCus.style.display = "none"
        document.querySelectorAll('form > input')[0].value  = ''
    }
    else {
        nodePre.style.display = "none"
        nodeCus.style.display = "block"
        document.querySelectorAll('form > input')[0].value  = 'custom'
    }
}
