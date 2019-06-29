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
		case(req.url == `/addData` && req.method == `POST`):
			 addData(req, res);
			break;
		case(req.url == `/getData` && req.method == `POST`):
			 getData(req, res);
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

function homePage(req, res){
	fs.readFile(`./homePageV2.html`, (err, data)=>{
		if(err){throw err};
		res.end(data);
	});

}

function addData(req, res){
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		
		body = JSON.parse(Buffer.concat(body).toString());
		console.log(body);

		// fs.writeFile(`data/${body.name}@${Math.random()}.txt`, JSON.stringify(body), (err) => {
			fs.writeFile(`data/${body.name}@.txt`, JSON.stringify(body), (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});

		res.end(`Saved`);
	});	
}

function getData(req, res){
	fs.readdir(`./data`,(err, file)=>{
		res.end(JSON.stringify({arr : file}));
		console.log(`file`);
		console.log(file);
	});
}

function getFile(req, res){
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		
		body = JSON.parse(Buffer.concat(body).toString());
		console.log(body);

		fs.readFile(`./data/${body.file}`, (err, data)=>{
			if(err){throw err};
			console.log(typeof data);
			res.end(data);
		});

	})
}