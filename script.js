let inputElem = document.querySelector('input')
let searchBtn = document.querySelector('button')
let archiveArr = []
let archiveContainer = document.querySelector('.archive')
let dateContainer = document.querySelector('.date')

let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=',
    key: '6def9e88813114a69f35c52bdf9b6754'
}

searchBtn.addEventListener('click', checkWeather)
document.addEventListener('keydown', function(e){
    if(e.key == 'Enter'){
        checkWeather()
    }
})

async function checkWeather(){
    const response = await fetch(apiData.url + `${inputElem.value}&appid=${apiData.key}`);
    var data = await response.json();

    if(data.cod == 200){
        document.querySelector('h1').style.display = 'block'
        let dataObj = {
            cityName: data.name,
            temp: Math.round(data.main.temp),
            img: `./images/${data.weather[0].main}.png`,
            maxTemp: Math.round(data.main.temp_max),
            minTemp: Math.round(data.main.temp_min)
        }

        archiveArr.push(dataObj)
        writeArchive(archiveArr)
        showDate()
        getCurrentWeather(data)
        
    }else{
        alert("the city or country didn't find")
    }

}

function writeArchive(arr){
    archiveContainer.innerHTML = ''
    arr.forEach(item => {
        archiveContainer.innerHTML += `<div class="item">
                                            <img src="${item.img}" alt="">
                                            <div class="city-name-archive">${item.cityName}</div>
                                            <div class="temp-archive">${item.temp}<span>°c</span></div>
                                            <div class="hi-low">${item.minTemp}°c / ${item.maxTemp}°c</div>
                                        </div>`
    })
}

function showDate(){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    dateContainer.innerHTML = ''

    let now = new Date();
    let day = days[now.getDay()]
    let month = months[now.getMonth()]
    let year = now.getFullYear()
    let date = now.getDate()
    
    dateContainer.innerHTML = day + ' ' + date + ' ' + month + ' ' + year

}

function getCurrentWeather(data){
    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temp span').innerHTML = Math.round(data.main.temp);
    document.querySelector('.humidity-number').innerHTML = data.main.humidity;
    document.querySelector('.wind-number').innerHTML = data.wind.speed;
    document.querySelector('.main').innerHTML = data.weather[0].main
    let img = document.querySelector('.img img')
    img.setAttribute('src', `./images/${data.weather[0].main}.png`)
    document.querySelector('.hi-low').innerHTML = Math.round(data.main.temp_min) + '°c' + ' / ' + Math.round(data.main.temp_max) + '°c' ;
}

