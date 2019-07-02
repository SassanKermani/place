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
		case(req.url == `/favicon.ico`):
			console.log(`favicon.ico`)
			break
		case(req.url == `/` && req.method == `GET`):
			homePage(req, res);
			break;
		case(req.url == `/getData` && req.method == `POST`):
			getData(req, res)
			break;
		default :
			console.log(`broke`);
	}

}).listen(3000, ()=>{
	console.log(`server up`)
});
/*=====  End of Router  ======*/

function homePage(req, res){
	fs.readFile(`./homePageV3.html`, (err, data)=>{
		if(err){throw err};
		res.end(data);
	});

}

function getData(req, res){
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = JSON.parse(Buffer.concat(body).toString());
		// console.log(body);
		let sendArr = [];
		fs.readdir(`./data`,(err, file)=>{
			for(let i = 0; i < file.length; i++){
				if(file[i].split(`@`)[0] >= body.minlat && file[i].split(`@`)[0] <= body.maxlat && file[i].split(`@`)[1] >= body.minlng && file[i].split(`@`)[1] <= body.maxlng){
					sendArr.push(file[i]);
				}
			}
			res.end(JSON.stringify({arr : sendArr}));
		});
	});	
}