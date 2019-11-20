const mongoose =  require('mongoose')
const Register = require('../models/registrationModel')

//create test suite
describe('registration model test', () =>{

    // set up: runs before any test; in this case to create our testdb
    beforeAll( async() => {
        try{
            await mongoose.connect("mongodb://localhost:27017/test-db", {useUnifiedTopology:true,useNewUrlParser:true})
            await Register.deleteMany({})
        } catch (err) {
            console.log("database error" + err)
        } 
    })

    test('should be able to save', async()=> { //async is before the callback function
        const register = new Register({'firstname':'Paul'})
        await register.save() // await is after
        const items = await Register.find({})//find all items in there
        expect(items.length).toBe(1) //the expected outcome
    })
})

test('should not save when first name isnt input', async () => {
    try {
        await (new Register({ lastname: 'Joreen' }).save())
    } catch (err) {
        console.log("database error " + err)
        expect(err.toString()).toBe('ValidationError: firstname: Please Enter first name')
    }
    const items = await Register.find({})
    expect(items.length).toBe(1)
})


//test tear down:some finishing work that needs to happen after the tests are done
// afterEach(async () => {
//     try {
//         await Register.deleteMany({})
//     } catch (err) {
//         console.log("database error " + err)
//     }
//  })