function validation(user){
    if(user.email && user.password){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

describe('Login Test', () =>{
    describe('Form Validation', ()=>{
        test('All forms are filled properly', ()=>{
            const loginData = {email: "steven@mail.com", password: "secret"}

            expect(validation(loginData)).toBe(true)
        })
    })
})