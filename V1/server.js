/*============================
=            Vars            =
============================*/

const http = require(`http`);
const fs = require(`fs`);

/*=====  End of Vars  ======*/
/*==============================
=            Router            =
==============================*/
http.createServer( (req, res)=>{

	console.log(`req.url: ${req.url}`);
	console.log(`req.method: ${req.method}`);

	switch(true){

		case(req.url == `/` && req.method == `GET`):
			homePage(req, res);
			break;

		default :
			console.log(`broke`);
	}

}).listen(3000, ()=>{
	console.log(`server up`)
});
/*=====  End of Router  ======*/

function homePage(req, res){
	fs.readFile(`./homePage.html`, (err, data)=>{
		if(err){throw err};
		console.log(`saved`);
		res.end(data);
	});

}