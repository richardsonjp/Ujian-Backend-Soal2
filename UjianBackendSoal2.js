var express = require('express')
var app = express()

//mongodb
var mo = require('mongodb').MongoClient;
var url = 'mongodb://admin:1234@localhost:27017/ujian';

//os package
var os = require('os')

var namaCPU =  os.hostname()
var osTipe = os.type();
var osPlatform = os.platform()
var osRilis = os.release()
var ramSisa = os.freemem()
var ramTotal = os.totalmem()

// --mongodb-- //
mo.connect(url, (error,data)=>{
    console.log('Terhubung ke MongoDB!')
})


app.get('/data',(req,res)=>{
    mo.connect(url,(error,data)=>{
        var collection = data.collection('test');
        collection.find({}).toArray((error,hasil)=>{
            console.log(hasil);
            res.send(hasil);
        })
    })
})


app.post('/data',(req,res)=>{
    mo.connect(url,(error,data)=>{
        var datas = {namacpu: namaCPU, tipe: osTipe, platform: osPlatform , rilis: osRilis , ramSisa: ramSisa, ramTotal: ramTotal};
        var collection = data.collection('test');
        collection.insert(datas, (error,hasil)=>{
            console.log(hasil);
            res.send(hasil);
        })
    })
})



app.listen(3210,()=>{
    console.log('terhubung @port 3210')
})