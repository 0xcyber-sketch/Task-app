import fs from "fs/promises"
import { existsSync } from 'fs'
class Service {


    // To know if auser is not logged out when server is closes
    async init(dir) {
        const files = await fs.readdir(dir)
        let fileName = ""
        for (const f of files) {
            let temp = await fs.readFile(dir + f, 'utf8')
            temp = JSON.parse(temp)
            if (temp.login)  {
                fileName = f
                return this.removeDotTxt(fileName)
            }

        }

        return fileName
    }

    // Cleans up the file
    removeDotTxt(str) {
        let regex = /.*(?=.txt)/g
        return str.match(regex)[0]
        
    }

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


    async initCalendarsAndTasks(inputUserName, dir) {
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