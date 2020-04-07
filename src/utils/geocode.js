const request = require('request');

const getGeoLocaton = (address,callback) =>{
    if(address.length === 0){
        console.log('Please provide address!');
        return false;
    }
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1Ijoiamlyb3F1aWphbm8iLCJhIjoiY2s4MXJvbW9xMHRwNzNtb3E4djltN3UxaCJ9.XJy-r35twz2mNNXikiALHA`;
    request({url:mapboxURL,json:true},(err,resp)=>{
        if(err){
            callback('problem with connecting to mapbox',undefined);
        } else if(resp.body.message){
            callback(resp.body.message,undefined);
        } else if(resp.body.features.length === 0){
            callback('no results found',undefined);
        } else{
            const {place_name:name, center:coordinates} = resp.body.features[0];
            const data = {
                name,
                longitude: coordinates[0],
                latitude: coordinates[1]
            }
            callback(undefined,data);
        }
    });
};

module.exports = {
    getGeoLocaton
};