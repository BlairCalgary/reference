import {functions} from './fetch.js';

global.fetch = require('node-fetch')
// const fetch = require('node-fetch');
// const myData = [{"name":"Alejandro","surname":"Domínguez","gender":"male","region":"Mexico"},{"name":"Mitică","surname":"Goldiș","gender":"male","region":"Romania"},{"name":"Viviana","surname":"Rodas","gender":"female","region":"Colombia"},{"name":"Lina","surname":"Villegas","gender":"female","region":"Colombia"},{"name":"Ιάκωβος","surname":"Κούνδουρος","gender":"male","region":"Greece"},{"name":"Toby","surname":"Morgan","gender":"male","region":"England"},{"name":"Зинаида","surname":"Николаевa","gender":"female","region":"Russia"},{"name":"戴","surname":"瑗","gender":"female","region":"China"},{"name":"Ingrid","surname":"Svendsen","gender":"female","region":"Norway"},{"name":"Demre","surname":"Ergon","gender":"female","region":"Turkey"}]

// let urlData = async () => await functions.getUsers();

test('Testing getUsers.', async () =>{
    let data = await functions.getUsers();
    expect(data.length).toBe(10);
});

test('testing workingWithData.', async () =>{
    await functions.workWithData();
})

