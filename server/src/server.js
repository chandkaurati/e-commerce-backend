import "dotenv/config"
import dns from "node:dns"
import connectDb from "./config/db.js"
import app from "./app.js"

dns.setServers(["1.1.1.1", "8.8.8.8"])

const PORT = process.env.PORT || 3000

connectDb().then(()=>{
    app.listen(PORT, "0.0.0.0", ()=>{
        console.log("app is listning on port", PORT)
    })
}).catch((err)=>{
    console.log(`failed to start server`, err)
    process.exit(1)
})
