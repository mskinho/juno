const rp = require('request-promise-native')

const gerarToken =  async (req,res,next) => {
    const basicUrl = "https://api.juno.com.br/authorization-server/oauth/token"
    const url = `${basicUrl}?grant_type=client_credentials`
    const username = process.env.user2
    const password = process.env.pdw2
    const auth = "Basic " + new Buffer.from(username + ":" + password).toString("base64");
    let options = {
        method: 'POST',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": auth
        },
        url:url,
        json: true
    };
    try {
        console.log(url)
        let data = await rp(options)
        res.locals.accessToken = `Bearer ${data.access_token}`
    } catch (err) {
        console.log("Deu erro")
            if(err.error != ""){
                res.status(err.error.status).json({"Erro na geração do token": err.error})
            }else{
                res.status(err.error.status).json(err)
            } 
    }
    next()
}

module.exports = gerarToken