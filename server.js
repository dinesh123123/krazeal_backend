// import to modules
const http =require('http');
const app = require('./app');//import node_project file here
const sever = http.createServer(app);
const mongoose =require('mongoose');
mongoose.set('strictQuery', false);

/*
//connect mongodb with localhost
mongoose.connect('mongodb://localhost:27017/Kerazeal',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
mongoose.connection.on('error',err =>{
	console.log('connection fail');

})
mongoose.connection.on('connected',connected =>{
	console.log('mongodb connected');
})
*/


// connect mongodb to live atlas
const url = "mongodb+srv://dashing:rauniyar@atlascluster.7lw8bpt.mongodb.net/Krazeal?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })




// connect to browser 
const port = process.env.port ||3020;
sever.listen(port, function(error){
	if(error){
		console.log(error)
	}else{
		console.log("The server is running at port 3020");
	}
});

