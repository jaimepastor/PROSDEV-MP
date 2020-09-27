function validation(game){
    if(game.title && game.platform && game.genre && game.release && game.rating && game.link){
        return true
    }
    else{
        return false
    }
}

describe('Add New Game Test', () =>{
    describe('Form Validation', ()=>{
        test('All forms are filled properly', ()=>{
            const gameData = {title : "Heaven's Feel", platform: "PS4", genre: "RPG", release: new Date('July 14, 2000'), rating: "Mature 17+", link:"testlink.com"}

            expect(validation(gameData)).toBe(true)
        })
    })
})
