import app from './app.js'

// Running the server
app.listen(app.get("port"))

console.log("Server initialized in port: "+app.get("port") )