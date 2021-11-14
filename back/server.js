'use strict';

const Hapi = require('@hapi/hapi');
const Bcrypt = require('bcrypt');
const axios = require("axios");


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////My functions used for scraping the data of SWAPI/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const BASE_URL = "https://swapi.dev/api/";
const URL_VALUES = ["films/?","people/?","species/?","starships/?","vehicles/?","planets/?"]


/*Used fonction for calling all the names*/

const GetAllNames = async (end_url) =>{
    let i = 0, response = new Array;
    while(i<URL_VALUES.length){
        if(i==0){
            let x = await GetData(URL_VALUES[i],end_url,"title"),j=0;
            x.forEach(val =>{
                response.push([URL_VALUES[i].replace("/?",""),val,1+j]);
                j++;
            });
            
        }
        else{
            let x = await GetData(URL_VALUES[i],end_url,"name"),j=0;
            x.forEach(val =>{
                response.push([URL_VALUES[i].replace("/?",""),val,1+j]);
                j++;
            });  
        }
        i++;
    }
    return response;

}

const GetQuery = async (type,id,end_url) => {
    let url = BASE_URL + type + '/' + id + '/?' + end_url;
    let payload = await axios.get(url);
    return payload['data'];

}

const GetData = async (search,end_url,query) => {
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
                        response.push(acc[query]);      
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////My functions used for the server/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
        path:'/name',/*Homepage return all the datas */
        handler: (request,h) => {
            const end_url ="&format=json";
            return GetAllNames(end_url);
        },
        options: {
            auth: 'login',/*Login enabled */
            cors:true /*CORS ALLOWED */
        }
    });

    server.route({
        method:'GET',
        path:'/query/',/*Homepage return all the datas */
        handler: (request,h) => {
            const end_url = 'format=' + request.query.format;
            const id = request.query.id;
            const type = request.query.type;
            return GetQuery(type,id,end_url);
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
            const data = {"error":404} 
            return h.response(data).code(201);
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
