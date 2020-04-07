const request = require('request');

const forecast = (coordinates,callback)=>{
    const url = `https://api.darksky.net/forecast/257ac392bbfee6b42258fbef0620bfe2/${coordinates.latitude},${coordinates.longitude}?units=si`;
    request({url,json:true},(error,resp)=>{
        const {temperature, precipProbability, windGust} = resp.body.currently;
        if(error){
            callback('low level error',undefined);
        }else if(resp.body.error) {
            callback(resp.body.error,undefined);
        }else{
            callback(undefined,`${resp.body.daily.data[0].summary} 
            It is currently ${temperature} degrees out.
            There is a ${precipProbability}% chance of rain.
            Wind gusts are at ${windGust}.`);
        }
    });
}

module.exports = {
    forecast
};