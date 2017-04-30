module.exports.sender = function(msg) {
	//init provider
	const Nexmo = require('nexmo');
	const nexmo = new Nexmo({
		apiKey: msg.apiKey,
  		apiSecret: msg.apiSecret
	});
	//init message
	nexmo.message.sendSms( msg.fromphone,
							msg.tophone,
	'Hey. you have to pay '+msg.bill+
			' dollars at '+msg.day,
	//success&failier notes
	(err,res) => {
    	if (err) {
    		console.log(err);
      	} else {
        	console.dir(res);
	    }
    });	
}