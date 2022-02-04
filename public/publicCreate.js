


function change(radioButton) {
    let nodePre = document.getElementsByClassName('pred')[0] 
    let nodeCus = document.getElementsByClassName('cus')[0] 
   if (radioButton.value === "Pre-defined") {
        nodePre.style.display = "block"
        nodeCus.style.display = "none"
        document.querySelectorAll('div[class="cus"] > label > input')[1].required = false
        document.querySelectorAll('div[class="cus"] > label > input')[0].required = false
        document.querySelectorAll('form > input')[0].value  = ''
        
    } else {
        nodePre.style.display = "none"
        nodeCus.style.display = "block"
        document.querySelectorAll('div[class="cus"] > label > input')[1].required = true
        document.querySelectorAll('div[class="cus"] > label > input')[0].required = true
        document.querySelectorAll('form > input')[0].value  = 'custom'
    }
}
