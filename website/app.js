/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?&zip=";
const apiKey = "&APPID=908e82f11abd0ba527466cb4d4e77de3&units=metric";
let temp = document.querySelector('#temp');
let content = document.querySelector('#content');
let date = document.querySelector('#date');
let name = document.querySelector('#name');
let pressure = document.querySelector('#pressure');
let humidity = document.querySelector('#humidity');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.querySelector('#generate').addEventListener('click', createData = async () => {
  const zipCode = document.querySelector('#zip').value;
  const content = document.querySelector('#feelings').value;
  const req = await fetch(`${baseURL}${zipCode}${apiKey}`);
  try {
    const data = await req.json();
    data.content = content;
    data.date = newDate;
    await postData('/addWeather', data);
    updateHTML();
  } catch (error) {
    console.error("error", error);
  }
});

const getData = async (baseURL = '') => {
  try {
    const res = await fetch(baseURL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (baseURL = '', data = {}) => {
  const req = await fetch(baseURL, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
};

const updateHTML = async () => {
  const projectData = await getData('/all');
  console.log(`${projectData}`);
  date.innerHTML = `${projectData.date}`;
  name.innerHTML = `${projectData.name}`;
  temp.innerHTML = `${projectData.temp}`;
  pressure.innerHTML = `${projectData.pressure}`;
  humidity.innerHTML = `${projectData.humidity}`;
  content.innerHTML = projectData.content;
};