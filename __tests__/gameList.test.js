function filterByOptions(arr, selectconsole, selectgenre){
    var newarr = [];
    
    for(x = 0; x < arr.length; x++){
        if((selectconsole === 'all' || selectconsole === arr[x].console) && (selectgenre === 'all' || selectgenre === arr[x].genre)){
            newarr.push(arr[x]);
        }
    }
    return newarr;
}

describe('Select option module', () => {
    const sampledata = [
        {id: 0, console: 'ps4', genre: 'Strategy'},
        {id: 1, console: 'switch', genre: 'Strategy'},
        {id: 2, console: 'xbox', genre: 'Racing'},
        {id: 3, console: 'switch', genre: 'Family/Party'}
    ]
    
    describe('case 1: all consoles and all genres selected', () => {
        test('output should be all games', () => {
            const expectedoutput = [
                {id: 0, console: 'ps4', genre: 'Strategy'},
                {id: 1, console: 'switch', genre: 'Strategy'},
                {id: 2, console: 'xbox', genre: 'Racing'},
                {id: 3, console: 'switch', genre: 'Family/Party'}
            ]
            
            expect(filterByOptions(sampledata, 'all', 'all') === expectedoutput);
        });
    });
    describe('case 2: all consoles and one genre selected', () => {
        test('output should be game 0 and 1', () => {
            const expectedoutput = [
                {id: 0, console: 'ps4', genre: 'Strategy'},
                {id: 1, console: 'switch', genre: 'Strategy'}
            ]
            
            expect(filterByOptions(sampledata, 'all', 'Strategy') === expectedoutput);
        });
    });
    describe('case 3: one console and all genres selected', () => {
        test('output should be ', () => {
            const expectedoutput = [
                {id: 1, console: 'switch', genre: 'Strategy'},
                {id: 3, console: 'switch', genre: 'Family/Party'}
            ]
            
            expect(filterByOptions(sampledata, 'switch', 'all') === expectedoutput);
        });
    });
    describe('case 4: one console and one genre selected', () => {
        test('output should be ', () => {
           const expectedoutput = [
                {id: 3, console: 'switch', genre: 'Family/Party'}
            ]
            
            expect(filterByOptions(sampledata, 'switch', 'Family/Party') === expectedoutput);
        });
    });
});