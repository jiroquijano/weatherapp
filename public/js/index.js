const fetchSample = async()=>{
    const response = await fetch('http://puzzle.mead.io/puzzle');
    const parsedData = await response.json();
    console.log(parsedData);
};

const fetchWeatherData = async(address)=>{
    document.querySelector('#message-1').innerHTML= 'Loading...';
    const response = await fetch(`/weather?address=${address}`);
    const data = await response.json();
    console.log(data);
    if(data.error){
        const messages = document.querySelectorAll(`[id^=message-]`);
        messages.forEach(curr=>curr.innerHTML = '');
        return document.querySelector('#message-1').innerHTML = `${data.error}`;
    }
    document.querySelector('#message-1').innerHTML = `<b>${data.locationData.name} forecast:</b>`;
    document.querySelector('#message-2').innerHTML = `${data.forecastData}`;
};

// fetchSample();
// const url = new URL(window.location.href).searchParams;
// fetchWeatherData(url.get('address'));

const getSearchValue = () =>{
    const search = document.querySelector('.search-input').value;
    return search;
};

const form = document.querySelector('form');
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    fetchWeatherData(getSearchValue());
});
