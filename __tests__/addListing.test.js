function listingValidation(listing){
    if(listing.title && listing.user && listing.price && listing.status && listing.region && listing.description){
        if(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(listing.price)){
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

describe('Add New Listing Test', () =>{
    describe('Form Validation', ()=>{
        test('All forms are filled properly', ()=>{
            const listingData = {title : "Heaven's Feel", user: "Legs", price: 500, status: "Available", region: "NCR", description:"Good"}

            expect(listingValidation(listingData)).toBe(true)
        })
    })
})