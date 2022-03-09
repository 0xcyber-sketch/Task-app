import crypto from "crypto"


export function generateHash(input) {

    return crypto.createHash('sha256').update(input).digest('hex')
}

export  function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

 export function encrypt(iv, key, input) {
    let cipher = crypto.createCipheriv('aes-256-ccm', key, iv)
    let encrypted = cipher.update(input, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return encrypt
    } 