import fs from "fs/promises"
import { existsSync } from 'fs'
class Service {


    async init(dir) {
        if(!this.direcotoryExsists(dir)) {
            await fs.mkdir(dir)
        }
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
    direcotoryExsists(dir) {
        if (existsSync(dir)) {return true}
        return false
    }

    // Cleans up the file
    removeDotTxt(str) {
        let regex = /.*(?=.txt)/g
        return str.match(regex)[0]
        
    }

    makePath(inputUserName, dir) {
        return dir + inputUserName + ".txt"
    }


    // Checks if a file exists    
    userDataExist(path) {
        if (existsSync(path)) {
            return true
        }
        return false
    }

    async retrieveUser(inputUserName, dir) {
        let path = this.makePath(inputUserName, dir)

        if (!this.userDataExist(path)) {
            throw new Error("username is not saved")
        }
        let data = await fs.readFile(path, 'utf-8')
    return data
    }

    async saveDataToUser(inputUserName, dir,  newData) {
        let path = this.makePath(inputUserName, dir)
        let find
        let inData

        try {
            find = await this.retrieveUser(inputUserName, dir)
            if (find) {
                inData = true
            }
        } catch (error) {
            
            inData = false
        }

        if (inData) {
            await fs.writeFile(path, newData)
  
        }


    }


    async initCalendarsAndTasks(inputUserName, dir) {
        let path = this.makePath(inputUserName, dir)
        if (this.userDataExist(path)) {
            let dataString = await this.retrieveUser(inputUserName, dir)

            let dataObject = JSON.parse(dataString)
            return dataObject         
        }

    }

   



    async createFile(inputUserName, dir, data) {
        let path = this.makePath(inputUserName, dir)
        await fs.writeFile(path, data)

    }

    async openDataFile(path) {
        let temp
        try {
            if (this.userDataExist) {
                 temp = await fs.readFile(path, 'utf8')
                 return temp
            }
        } catch (error) {
            console.log(error);
            return "0"
        }
        }
        
       



}




export default Service