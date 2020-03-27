import fetch from "node-fetch";

export class City {
    constructor(name, latitude, longitude, population, key) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.population = population;
        this.key = key
    }
    show() {
        return this.name +
            this.latitude +
            this.longitude +
            this.population
    }
    movedIn(moveIn) {
        this.population+=moveIn;
        return this.population;
    }
    movedOut(moveOut) {
        this.population-=moveOut;
        return this.population;
    }
    howBig() {
        // return 'City';
        switch (true) {
            case this.population > 100000:
                return 'City';
                // break;
            case this.population > 20000:
                return 'Large town';
                // break;
            case this.population > 1000:
                return 'Town';
                // break;
            case this.population > 100:
                return 'Village';
                // break;
            default:
                return 'Hamlet';
        }
    }
    whichSphere() {
        if (this.latitude > 0) {
            return 'Northern';
        } else {
            return 'Southern';
        }
    }
}

export class Controller {
    constructor() {
        this.cities = [];
    }
    createCity(obj) {
        this.cities.push(obj);
    }
    deleteCity(key) {
        for (const keyCount in this.cities) {
            if (this.cities[keyCount].key = key) {
                this.cities.splice(key);
            } else {
                return 'no city with that key exists'
            }
        }
    }
    getMostNorthern() {
        const most = 0;
        for (const lat in this.cities) {
            ((lat===0)?most=lat:null);
            (this.cities[lat].latitude>this.cities[most].latitude?most=lat:null)
            // console.log(lat);
            // console.log(this.cities[lat].latitude);
        }
        return this.cities[most].name;
        // console.log(this.cities[most].name+`:`+this.cities[most].latitude);
    }
    getMostSouthern() {
        var most = 0;
        for (const lat in this.cities) {
            ((lat===0)?most=lat:null);
            (this.cities[lat].latitude<this.cities[most].latitude?most=lat:null)
            // console.log(lat);
            // console.log(this.cities[lat].latitude);
        }
        return this.cities[most].name;
    }
    getPopulation() {
        const pop = [];
        for (const popCount in this.cities) {
            pop.push(this.cities[popCount].population);
        }
        // console.log(pop);
        return pop.reduce((a, b) => a + b, 0);
    }

}


export class CityFetch {
    constructor() {
        this.header = {
            mode: 'cors',       // no-cors, *cors, same-origin
            cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',         // manual, *follow, error
            referrer: 'no-referrer',    // no-referrer, *client
        }
    }
    async add(data) {
        // Default options are marked with *
        const url = `http://127.0.0.1:5000/add`;
        const header = this.header;
        header.method = 'POST';
        header.body = JSON.stringify(data);
        // console.log(header);
        const response = await fetch(url, header);
        return await response.json();   // parses JSON response into native JavaScript objects
    }
    async read(key) {
        const keyJson = {
            "key": `${key}`
        }
        const url = `http://127.0.0.1:5000/read`;
        const header = this.header;
        header.method = 'POST';
        header.body = JSON.stringify(keyJson);
        const response = await fetch(url, header);
        return await response.json();   // parses JSON response into native JavaScript objects
        // const resp = await response.json();
        // console.log(keyJson);
        // console.log(resp);
    }
    async all() {
        const url = `http://127.0.0.1:5000/all`;
        const header = this.header;
        header.method = 'POST';
        const response = await fetch(url, header);
        return await response.json();           
    }
    async delete(key) {
        const keyJson = {
            "key": `${key}`
        }
        const url = `http://127.0.0.1:5000/delete`;
        const header = this.header;
        header.method = 'POST';
        header.body = JSON.stringify(keyJson);
        await fetch(url, header);  
    }
    async load() {
        const url = `http://127.0.0.1:5000/load`;
        const response = await fetch(url);
        return await response.text();
    
    }
    async update(data) {
        const url = `http://127.0.0.1:5000/update`;
        const header = this.header;
        header.method = 'POST';
        header.body = JSON.stringify(data);
        await fetch(url, header);
    }
    async save() {
        const url = `http://127.0.0.1:5000/save`;
        const response = await fetch(url);
        return await response.text();
    }
    async clear() {
        const url = `http://127.0.0.1:5000/clear`;
        const response = await fetch(url);
        return await response.json();   // parses JSON response into native JavaScript objects
    }

}

//, CLEAR 

// export async function postData(url, data) {
//     // console.log('in postData');
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST',     // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors',       // no-cors, *cors, same-origin
//         cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow',         // manual, *follow, error
//         referrer: 'no-referrer',    // no-referrer, *client
//         body: JSON.stringify(data)  // body data type must match "Content-Type" header
//     });
//     return await response.json();   // parses JSON response into native JavaScript objects
// };

// const data = {
//     "key":"1",
//     "name":"Calgary",
//     "latitude":"51.03",
//     "longitude":"-114.37",
//     "population":"1285711"
// }

// const yk = {
//     "key":"2",
//     "name":"Yellowknife",
//     "latitude":"62.47",
//     "longitude":"-114.54",
//     "population":"19569"
// }

// const slc = {
//     "key":"3",
//     "name":"Salt Lake City",
//     "latitude":"40.78",
//     "longitude":"-112.06",
//     "population":"200544"
// }

// const merida = {
//     "key":"4",
//     "name":"Mérida",
//     "latitude":"20.98",
//     "longitude":"-89.77",
//     "population":"892363"
// }

// const bogota = {
//     "key":"5",
//     "name":"Bogota",
//     "latitude":"4.65",
//     "longitude":"-74.25",
//     "population":"7413000"
// }

// const ba = {
//     "key":"6",
//     "name":"Buenos Aires",
//     "latitude":"-34.62",
//     "longitude":"-58.58",
//     "population":"2890000"
// }

// const warsaw = {
//     "key":"7",
//     "name":"Warsaw",
//     "latitude":"52.23",
//     "longitude":"20.78",
//     "population":"1708000"
// }