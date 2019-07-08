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
			getData(req, res);
			break;
		case(req.url == `/sendData` && req.method == `POST`):
			sendData(req, res);
			break;
		case(req.url == `/getFile` && req.method == `POST`):
			getFile(req, res);
			break;
		default :
			console.log(`broke`);
	}

}).listen(3000, ()=>{
	console.log(`server up`)
});
/*=====  End of Router  ======*/

/*----------  homePage  ----------*/
function homePage(req, res){
	fs.readFile(`./homePage.html`, (err, data)=>{
		if(err){throw err};
		res.end(data);
	});

}

/*----------  getData  ----------*/
function getData(req, res){
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = JSON.parse(Buffer.concat(body).toString());
		// console.log(body);
		let sendArr = [];
		fs.readdir(`./db`,(err, files)=>{

			for(let i = 0; i < files.length; i++){
				if(files[i].split(`@`)[0] >= body.minlat && files[i].split(`@`)[0] <= body.maxlat && files[i].split(`@`)[1] >= body.minlng && files[i].split(`@`)[1] <= body.maxlng){
					console.log(`go`);
					sendArr.push(files[i]);
				}
			}
			console.log(sendArr);
			res.end(JSON.stringify({arr: sendArr}));
		});
	})
}

/*----------  sendData  ----------*/
function sendData(req, res){
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = JSON.parse(Buffer.concat(body).toString());
		// console.log(body);
		fs.writeFile(`./db/${body.lat}@${body.lng}@${body.title}@${new Date().getTime()}@${Math.random()}.txt`, JSON.stringify(body), (err)=>{
			res.end(`done`)
		})
	})
}

/*----------  getFile  ----------*/
function getFile(req, res){
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = JSON.parse(Buffer.concat(body).toString());
		console.log(body.file)
		fs.readFile(`./db/${body.file}`, (err, file)=>{
			if (err){ console.log(err) };
			console.log(typeof file);
			res.write(file);
			res.end();
		});
	})
}