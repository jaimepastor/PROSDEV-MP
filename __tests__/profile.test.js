function filterByAccount(arr, currentuser){
    var newarr = [];
    
    for(x = 0; x < arr.length; x++){
        newarr.push(arr[x]);
    }
    
    return newarr;
}

describe('Profile module', () => {
    const sampledata = [
        {id: 0, owner: 'user1'},
        {id: 1, owner: 'user2'},
        {id: 2, owner: 'user3'},
        {id: 3, owner: 'user1'}
    ]
    
    describe('case 1: current user is user1', () => {
        test('output should have 2 games', () => {
                    const expectedoutput = [
                {id: 0, owner: 'user1'},
                {id: 3, owner: 'user1'}
            ]

            expect(filterByAccount(sampledata, 'user1') === expectedoutput)
        });
    });
    
    describe('case 2: current user is user4', () => {
        test('output should have no games', () => {
                    const expectedoutput = []

            expect(filterByAccount(sampledata, 'user4') === expectedoutput)
        });
    });
});