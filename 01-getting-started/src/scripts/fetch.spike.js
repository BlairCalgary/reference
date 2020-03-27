const fetch = require('node-fetch');

const functions = {

    url: 'https://uinames.com/api/?amount=10',

    getFirstName(data) {
        return (data[0].name);
    },

    getAllFirstNames(data) {
        return data.map((d, i, x) => d.name);
    },

    showDelayProblem() {
        console.log('One');
        setTimeout(() => {          // Simulates a fetch
            console.log("Two");
        }, 1 * 1000);
        console.log('Three');       // We have a problem Huston
    },

    async showDelaySolution() {
        try {
            console.log('One');
            const value = await                 // Simulate fetch
            new Promise(
                (resolve, reject) =>
                    setTimeout(() => resolve("Two"),
                        1 * 2000));
        // Now that we have the value we can use it.
        console.log(value);
        console.log('Three');
    } catch (error) {
        console.log(error);
    }
},

async getUsers() {
    try {
        const response = await fetch(functions.url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw (error);
    }
},

async workWithData() {
    const data = await functions.getUsers();
    console.log(functions.getFirstName(data));
    console.log(functions.getAllFirstNames(data));
},
}

const data = await functions.getUsers();
console.log(data.length);

const me = {
    "name":"Blair",
    "surname":"Hone",
    "gender":"male",
    "region":"Canada"
};



// const data = [{"name":"Alejandro","surname":"Domínguez","gender":"male","region":"Mexico"},{"name":"Mitică","surname":"Goldiș","gender":"male","region":"Romania"},{"name":"Viviana","surname":"Rodas","gender":"female","region":"Colombia"},{"name":"Lina","surname":"Villegas","gender":"female","region":"Colombia"},{"name":"Ιάκωβος","surname":"Κούνδουρος","gender":"male","region":"Greece"},{"name":"Toby","surname":"Morgan","gender":"male","region":"England"},{"name":"Зинаида","surname":"Николаевa","gender":"female","region":"Russia"},{"name":"戴","surname":"瑗","gender":"female","region":"China"},{"name":"Ingrid","surname":"Svendsen","gender":"female","region":"Norway"},{"name":"Demre","surname":"Ergon","gender":"female","region":"Turkey"}]

// console.log(functions.getFirstName(data));

// console.log(functions.getAllFirstNames(data));

// console.log(functions.showDelayProblem());

// console.log(functions.showDelaySolution());

// const myArray = [];
// const myData = functions.getUsers().then(resp=>resp.json());
// console.log(myArray);
// console.log(myData);


// console.log(myData);

// let urlData = async () => await functions.getUsers;;
// functions.getUsers().then(resp=>console.log(resp));

// functions.getUsers().then(resp=>console.log(resp));
