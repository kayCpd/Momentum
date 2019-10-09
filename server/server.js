let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let backendPort = 8840;

let mock = {
    authDataB: require('./mock/authDataB'),
    authDataR: require('./mock/authDataR'),
    clientData: require('./mock/clientData'),
    
};

let jsonFile = '{"accounts":{"111222333":{"balance":300,"overdraft":300}, "123456789":{"balance":100,"overdraft":100}, "987654321":{"balance":200,"overdraft":0}}, "clients":{ "B8os8Ryx60YFdtoBkrdb2zKD1uC2" : {"accounts" : [ 123456789, 987654321 ], "age" : 21, "name" : "Rob Rider" },"UZyMgwSApiN0b148VDrZSAeWkfb2" : {"accounts" : [ 111222333 ],"age" : 42, "name" : "Bob Builder" }}}';
let json = JSON.parse(jsonFile);



app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
res.header(
'Access-Control-Allow-Headers',
'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
);
next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(
bodyParser.urlencoded({
extended: true
})
);


app.post('', function(req, res, next) {
    let data = JSON.parse(req.body);
    let email = data.email;
    let password = data.password;
    let returnSecureToken = data.returnSecureToken;
    if (email === ('bob@email.com') || ('rob@email.com') && password === 'password' && returnSecureToken === 'true') {
        if (email === ('bob@email.com')){
            return res.status(200).json(mock.authDataB);
        }
        else if(email ===('rob@email.com')){
            return res.status(200).json(mock.authDataR);
        }
         
    } else {
        return res
        .status(200)
        .send('{"error":{"text":"Bad Request.! Wrong Email and Password"}}');
    }
});




// app.get('', function(req, res, next) {
//     let data = JSON.parse(req.body);
//     let localId = data.localId;
//     let idToken = data.idToken;
//     if (idToken === 'aaikaIQXgpjgmMt2QwaNIquLfiP7NephhPQ' && localId === 'UZyMgwSApiN0b148VDrZSAeWkfb2') {
//          return res.status(200).json(mock.clientData);
//     } else {
//         return res
//         .status(200)
//         .send('{"error":{"text":"Incorrect Credentials"}}');
//     }
// });
app.get('/clients/', function(req, res, next) {

    let clientData = {
        accounts: [],
        age: '',
        name: ''
    };
    let data = JSON.parse(req.body);
    let localId = data.localId;
    let idToken = data.idToken;
    if (localId === ('UZyMgwSApiN0b148VDrZSAeWkfb2') || ('B8os8Ryx60YFdtoBkrdb2zKD1uC2') && idToken ) {
        
        for (y in json.clients){
            if (localId == y){                
            clientData.accounts.push(json.clients[y].accounts);
            clientData.name =  json.clients[y].name;
            clientData.age = json.clients[y].age;  
            }
        }
        return res.status(200).json(clientData);
    } else {
        return res
        .status(200)
        .send('{"error":{"text":"Incorrect Credentials"}}');
    }
});

app.put('/clients/', function(req, res, next) {

    let data = JSON.parse(req.body);
    let localId = data.localId;
    let idToken = data.idToken;
    let account = data.account;
    if (localId === ('UZyMgwSApiN0b148VDrZSAeWkfb2') || ('B8os8Ryx60YFdtoBkrdb2zKD1uC2') && idToken ) {
        
        for (y in json.clients){
            if (localId == y){                
                json.clients[y].accounts.push(account);             
            }
        }
        //returns updated list
        //return res.status(200).json(json.clients[localId].accounts);
    } else {
        return res
        .status(200)
        .send('{"error":{"text":"Security.!! Unauthorised.!!"}}');
    }
});

app.get('/accounts/', function(req, res, next) {

    let account = {        
          balance: '',
          overdraft: ''
    };        
    let data = JSON.parse(req.body);
    let idToken = data.idToken;
    let accountNumber = data.account;
    if (idToken) {        
        for (x in json.accounts){
            if (accountNumber == x){            
                account.balance = json.accounts[x].balance;
                account.overdraft = json.accounts[x].overdraft ;
            }
        } return res.status(200).json(account);
    } else {
        return res
        .status(200)
        .send('{"error":{"text":"UnAuthorised Token"}}');
    }
});

app.put('/accounts/', function(req, res, next) {

    let account = {        
          balance: '',
          overdraft: ''
    };        
    let data = JSON.parse(req.body);
    let idToken = data.idToken;
    let accountNumber = data.accountNumber;

    let balance=0;
    let overdraft=0;
    balance = data.balance;
    overdraft = data.overdraft;

        if (idToken) {                 
                for (x in json.accounts){
                    if (accountNumber == x){                        
                        //assuming the "overdraft" entity is the balance from a withdrawal.
                        //and the "balance" entity is the balance from a deposit.
                        json.accounts[x].balance = (json.accounts[x].balance + balance);
                        json.accounts[x].overdraft = (json.accounts[x].overdraft - overdraft);                
                        account.balance = json.accounts[x].balance;       
                        account.overdraft = json.accounts[x].overdraft;      
                    }               
                    else{
                        account=accountNumber;
                        account={
                            "balance":balance,
                            "overdraft":overdraft
                        };        
                        JSON.parse(json.accounts.push(account));
                    }
                }
            //If we need to see the result of the transaction
                //return res.status(200).json(account);
        } else {
            return res
            .status(200)
            .send('{"error":{"text":"Account Not Added"}}');
        }    
});


// app.put('/accounts/', function(req, res, next) {

//     let account = {        
//           balance: '',
//           overdraft: ''
//     };        
//     let data = JSON.parse(req.body);
//     let idToken = data.idToken;
    
//     let balance=0;
//     let overdraft=0;
//     balance = data.balance;
//     overdraft = data.overdraft;
 
//     if (idToken) {        
               
//         length = 9
//         let acN = "";
//         while (acN.length < 9) {
            
//             let id = (Math.floor(Math.random() * 10)); 
//             acN += id;
//         }
//         account=acN;
//         account={
//             "balance":balance,
//             "overdraft":overdraft
//         }
//         // json.parse("",)account);

//         JSON.parse(json.accounts.push(account));
//                 // "save" the data by adding it to the "foods" array in memory
//         // foods.push(new_food);
//         // json.push(D);



//         return res.status(200).json(account.balance);
//     } else {
//         return res
//         .status(200)
//         .send('{"error":{"text":"Account Not Added"}}');
//     }
// });


app.listen(backendPort, function() {
console.log('Express server listening on port ' + backendPort);
});