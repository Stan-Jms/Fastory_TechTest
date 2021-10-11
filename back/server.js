'use strict';

const Hapi = require('@hapi/hapi');
const Bcrypt = require('bcrypt');
const axios = require("axios");


const BASE_URL = "https://swapi.dev/api/";
const URL_VALUES = ["films/?","people/?","species/?","starships/?","vehicles/?","planets/?"]

/*Used fonction for calling all the datas*/
const GetAllData = async (end_url) => {
    let response =[];/*Stacker*/
    let k=0,j=0,i=0;/*Increments */
    let stock =[];/*Temp holder of raw datas*/
    let reg = /\/[0-9]+\//s;/*Regex for dumping the extra numbers at the end of an url*/
    while(k<URL_VALUES.length)
    {
        stock.push(await GetData(URL_VALUES[k],end_url));/*Fetch all data using previous function */
        k+=1;
    }
    while(i<stock.length){
        j=0;
        while(j<stock[i].length){
            response.push(stock[i][j]);
            /*Sanitazing the JSON file (better to be done on back-end than front*/
            j+=1;
        }
        i+=1;
    }
    response.forEach((element,index) => {
        /*Giving personal id and type according to it's url */
        element.id = index;
        element.type = element.url.replace("https://swapi.dev/api/","");
        element.type = element.type.replace(reg,"");
    });
    
    return response;
}

const GetData = async (search,end_url) => {
    /*Ok time to focus hehe */
    let num = 1;/*Page number */
    let url = BASE_URL + search + "page=" + num + end_url; /*Custom url for requests using params */
    let value = null;/*Used for axios get */
    let acc = {}; /*Temp accumulator */
    let response = [];/*Final return */
    let checker = true;/*check if there's an other page after False = no | True = yes */

    try{
        value = await axios.get(url);
    }catch(err){
        value = err.response;
    } finally{

        if(value.status != 200)
        {
            return {Error: value.status}/*Return code error */
        }

        else{
            /*While there's an other page or if the other page doesn't exist but the verif token didn't changed yet still get the last datas */
            while(value.data.next != null || (value.data.next === null && checker === true)){

                if(value.data.next === null){
                    checker = false;/*No more data to scrap*/
                }
                for(let i=0;i<10;i++){  /*Scrap the data */
                    acc =value.data.results[i];
                    if(acc != null){/*If the data isn't null add all the datas but the null's one */
                        response.push(acc);
                    }
                }
                if(checker!=false){/*If there's an other page go to it */
                    num+=1;
                    url = BASE_URL + search + "page=" + num + end_url;
                    value = await axios.get(url);
                }
            }

            return response;
        }
        
    }  
    
};


const users = {
    Luke: {
        username: 'Luke',
        password: '$2b$10$oKg3n.CCo6eDLTR3r4NME.77MJtd5gsVFMOg7oFxQYO7wpHb3AxEG',/*Password hashed for security reason since we don't store it on a DB */
        id: 0,
        name: 'Luke',
    }
};


const validate = async (request,username,password,h) => {/*Verification of the id / pswd */

    const user = users[username];
    if(!users[username]){
        return {isValid: false};
    }
    const match = await Bcrypt.compare(password,user.password);
    if(match){
        return { isValid: true, credentials:{id: user.id, name:user.name}};
    }
    else{
        return {isValid: false};
    }

};

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3001,
        host: /*'0.0.0.0'*/"localhost",/*Add your host for : - heroku : 0.0.0.0 || - your machine : localhost */
        routes: {
            cors:{
                origin: ['*'],
                headers: ['Authorization'],
                exposedHeaders: ['Accept'],
                additionalExposedHeaders: ['Accept'],
                credentials: true
            }
        }
    });
    await server.register([{
        plugin: require("@hapi/basic")
    }]);

    server.auth.strategy('login','basic',{validate});
    server.route({
        method:'GET',
        path:'/',/*Homepage return all the datas */
        handler: (request,h) => {
            let end_url ="&format=json";
            return GetAllData(end_url);
        },
        options: {
            auth: 'login',/*Login enabled */
            cors:true /*CORS ALLOWED */
        }
    });


    server.route({
        method:'GET',
        path:'/{any*}',/*If user gets lost bring error */
        handler: (request,h) => {
            return "<h1>Erreur 404 - Mauvaise manipulation jeune padawan</h1>";
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);/*Log for terminal */
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
    /*Error log for terminal */
});

init();/*Start*/
