const mongoose=require('mongoose')


async function ConnecttoDB(url){
    return mongoose.connect(url)
}

module.exports={ConnecttoDB};