import fs from "fs/promises"
import { existsSync } from 'fs'
class Service {

    makePath(inputUserName, dir) {
        return dir + inputUserName + ".txt"
    }


        
    fileExists(path) {
        if (existsSync(path)) {
            return true
        }
        return false
    }

    async findUser(inputUserName, dir) {
        let path = this.makePath(inputUserName, dir)

        if (!this.fileExists(path)) {
            throw new Error("username is not saved")
        }
        let data = await fs.readFile(path, 'utf-8')
    return data
    }

    async saveData(inputUserName, dir,  newData) {
        let path = this.makePath(inputUserName, dir)
        console.log("HEHE : " + newData);

        let data = await fs.readFile(path, 'utf-8')
        let find
        let inData

        try {
            find = await this.findUser(inputUserName, dir)
            if (find) {
                inData = true
            }
        } catch (error) {
            console.log(error);
            inData = false
        }

        if (inData) {
            await fs.writeFile(path, newData)
  
        }


    }


    async initCalendars(inputUserName, dir) {
        let path = this.makePath(inputUserName, dir)
        if (this.fileExists(path)) {
            let dataString = await this.findUser(inputUserName, dir)

            let dataObject = JSON.parse(dataString)
            return dataObject         
        }

    }

    async createFile(inputUserName, dir, data) {
        let path = this.makePath(inputUserName, dir)
        await fs.writeFile(path, data)

    }

}




export default Service