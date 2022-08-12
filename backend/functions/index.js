const functions = require("firebase-functions");
const axios = require('axios');
const firebase = require('firebase-admin/firestore');
const client = require('drip-nodejs')({ token: 'xxxxxxxxx', accountId: 'xxxxxxx' }); //private integrations


//get email addess from firestore DB collection and send to drip api (create or update a batch of subscribers)
exports.sendDBEmailToDrip = functions.https.onRequest((req, res) => {
	var token = "xxxxxxxx";
	var baseURl = "https://api.getdrip.com"

	//dmbt1KFnmZZft0HiVJV7 => user's collection document ID
    firebase.collection('users').doc('dmbt1KFnmZZft0HiVJV7').get().then((snapshot) => {
	const batch = {
		"batches": [{
		  "subscribers": [
			{
			  "email": snapshot.data().emailAddress,
			  "tags": "Dog Person"
			},
		  ]
		}]
	  };

    //account id needed here on the api call
	axios.post(`${baseURl}/v2/YOUR_ACCOUNT_ID/subscribers/batches`, batch, {
		headers: {
			"Content-Type": "application/json",
			 Authorization: 'Bearer ' + token  
		}
	}).then((res) => {
        console.log(`Status: ${res.status}`);
        console.log('Body: ', res.data);
        }).catch((err) => {
           console.error(err);
        });
	});
});



//Or


//get email addess from request body and send to drip
exports.sendEmailToDrip = functions.https.onRequest((req, res) => {
	let emailAddress = req.body.email; 
	const payload = {
		email: emailAddress,
	  };
    client.createUpdateSubscriber(payload)
	  .then((response) => {
		res.send({
			response: response,
		});
	  })
	  .catch((error) => {
		res.send({
			response: error,
		});	 
 	});
});
