const data = require('./santa-cruz-nature-team-retreat.json');
const prompt = require("prompt-sync")();
const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function downloadImage (url, name) {  
  const path = Path.resolve(__dirname, 'images', name)
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

function produce(guest, needAgenda="", needImages=""){
    let totalCost = parseInt(data.cost_per_head.substring(1)) * guest;
    console.log("Total Cost: ", totalCost);
    if(needAgenda){
        data.agenda.forEach((e, ind)=>{
            console.log(e.events);
        });
    }
    if(needImages){
        data.agenda.forEach((e, ind)=>{
            downloadImage(`https://retrera-images.s3.us-west-2.amazonaws.com/${e.image}`, `image-${ind}.jpeg`);
        });
    }
}
let a = prompt('No. of guest');
let guest = parseInt(a);
let needAgenda = prompt('Do you want to know the Agenda?');
let needImages = prompt('Do you want to download the images?');
produce(guest, needAgenda, needImages);






