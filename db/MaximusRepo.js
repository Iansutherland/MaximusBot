const {MongoClient, ObjectID} = require('mongodb');
const {url, dbName} = require('../dbConfig.json');

//using mongodocs https://mongodb.github.io/node-mongodb-native/4.0/

function MaximusRepo() {
    const client = new MongoClient(url);
    const db = client.db(dbName);

    //The object for the remember/remind commands
    function Remember() {
        //the remember collection
        const collection = db.collection('remember');

        //store stuff in the remember table
        function store(data){
            //Validate that the object is ready to be inserted
            if(!isValid(data)){
                throw 'Data is not valid';
            }

            return new Promise(async (resolve, reject) => {
                try{
                    const result = await collection.insertMany(data);
                    resolve(result);
                }
                catch (error){
                    reject(error);
                }
            });
        }

        //get all user records
        function getAllFromUser(givenUser){
            if(givenUser === ''){
                throw 'user cannot be empty'
            }
            return new Promise(async (resolve, reject) => {
                try{
                    const foundRecords = await colection.find({ user: givenUser}).toArray();
                resolve(foundRecords);
                }
                catch (error){
                    reject(error);
                }
            });
        }

        //get record with user and wildcard search
        function getOneFromUser(user, searchTerm){
            if(user === ''){
                throw 'user cannot be empty';
            }
            if(searchTerm === ''){
                throw 'searchTerm cannot be empty';
            }
            
            return new Promise(async (resolve, reject) => {
                try{
                    const regexForSearch = new RegExp(`.*${searchTerm}.*`);
                    const foundRecord = await collection.find({ user: user, remember: regexForSearch });
                    resolve(foundRecord);
                }
                catch (error){
                    reject(error);
                }
            });
        }

        //make sure the object is good to go
        function isValid(data){
            let valid = false;
            if(data.remember && data.user && data.date){
                valid = true;
            }

            return valid;
        }

        return {store, getAllFromUser, getOneFromUser};
    }

    function Dispose() {
        client.close();
    }

    return {Remember, Dispose}
}

module.exports = {MaximusRepo};