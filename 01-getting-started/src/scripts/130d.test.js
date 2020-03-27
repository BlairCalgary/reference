import {City} from './130d.js';
import {CityFetch} from './130d.js';
import {Controller} from './130d.js';

const city = new City('Calgary', 51.03, -114.37, 1285711, 1);
const ba = new City('Buenos Aires', -34.62, -58.5, 2890000, 2);
const cityFetch = new CityFetch;
const controller = new Controller;

test('create city in controller', () => {
    controller.createCity(city);
    expect(controller.cities[0].name).toBe('Calgary');
    controller.createCity(ba);
    expect(controller.cities[1].name).toBe('Buenos Aires');
});

// controller.createCity(city);
// controller.createCity(ba);
// console.log(controller.cities);

global.fetch = require('node-fetch')

test('Testing constructor', async () =>{
    expect(city.name).toBe('Calgary');
    expect(city.latitude).toBe(51.03);
    expect(city.longitude).toBe(-114.37);
    expect(city.population).toBe(1285711);
});

test('show method returns single string', async () =>{
    expect(city.show()).toBe('Calgary51.03-114.371285711');
});

test('movedIn adds a number to the population', async () =>{
    const moveIn = 99
    expect(city.movedIn(moveIn)).toBe(1285810);
    expect(city.movedIn(moveIn)).toBe(1285909);
});

test('movedOut subtracts a number from the population', async () =>{
    const moveOut = 10
    expect(city.movedOut(moveOut)).toBe(1285899);
    expect(city.movedOut(moveOut)).toBe(1285889);
    // expect(city.movedIn(moveIn)).toBe(1285909);
});

test('movedOut subtracts a number from the population', async () =>{
    const moveOut = 10
    expect(city.movedOut(moveOut)).toBe(1285879);
    expect(city.movedOut(moveOut)).toBe(1285869);
    // expect(city.movedIn(moveIn)).toBe(1285909);
});

test('return settlement class', async () => {
    expect(city.howBig()).toBe('City');
    city.movedOut(1210869);
    expect(city.howBig()).toBe('Large town');
    city.movedOut(65000);
    expect(city.howBig()).toBe('Town');
    city.movedOut(9500);
    expect(city.howBig()).toBe('Village');
    city.movedOut(450);
    expect(city.howBig()).toBe('Hamlet');
});

test('N or W hemisphere', async () => {
    expect(city.whichSphere()).toBe('Northern');
    expect(ba.whichSphere()).toBe('Southern');
});

test('get most northern', () => {
    expect(controller.getMostNorthern()).toBe('Calgary');
});

test('get most southern', () => {
    expect(controller.getMostSouthern()).toBe('Buenos Aires');
});

test('get total population', () => {
    // console.log(controller.getPopulation());
    expect(controller.getPopulation()).toBe(2890050);
});

test('test delete city', () => {
    controller.deleteCity(1);
    expect(controller.cities.length).toBe(1);
    // console.log(controller.cities.length);
});

// reload 7 records from file
test('reload data', async () => {
    const loadResp = await cityFetch.load();
    expect(loadResp).toBe('<h1>EvolveU test</h1> <h2>7 records Loaded</h2>');
});
// add 'red deer' (should be 8 records)
test('call postData work?', async () => {
    // const url = 'http://127.0.0.1:5000/add';
    const data = {
        "key": "8",
        "name": "Red Deer",
        "latitude": "52.28",
        "longitude": "-113.81",
        "population": "103588"
    };
    cityFetch.add(data);
    const resp = await cityFetch.all();
    expect(resp.length).toBe(8);
});

// read key 7 'warsaw'
test('read a response', async () => {
    
    const key = 7;
    const resp = await cityFetch.read(key);
    // console.log(resp[0].name);
    expect(resp[0].name).toBe('Warsaw');
});

// read all (8 records)
test('return all data', async () => {
    const resp = await cityFetch.all();
    expect(resp.length).toBe(8);
    // expect(resp[0].name).toBe('Warsaw');
});

// delete key 7 (warsaw), 7 records to remain
test('delete object', async () => {
    const key = 7;
    await cityFetch.delete(key);
    // expect(resp.length).toBe(8);
    // expect(resp[0].name).toBe('Warsaw');
    const resp = await cityFetch.all();
    expect(resp.length).toBe(7);
});

// update reddeer population
test('update object', async () => {
    const key = 8;
    const resp = await cityFetch.read(key);
    // console.log(`First read fetch: `, resp[0].population);
    expect(resp[0].population).toBe('103588');
    const data = {
        "key": "8",
        "name": "Red Deer",
        "latitude": "52.28",
        "longitude": "-113.81",
        "population": "104000"
    };
    await cityFetch.update(data);
    const respNew = await cityFetch.read(key);
    // console.log(`Second read fetch: `, respNew[0].population);
    expect(respNew[0].population).toBe('104000');
});

// save file
test('save data', async () => {
    const resp = await cityFetch.save();
    // console.log('response:', resp);
    expect(resp).toBe('<h1>EvolveU test</h1> <h2>7 records Saved</h2>');
});
// clear data file
test('clear data', async () => {
    const resp = await cityFetch.clear();
    // console.log('response:', resp);
    expect(resp).toStrictEqual({});
});
