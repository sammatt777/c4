import mongoose from "mongoose";


const isDbConnected = {
    value: 0
}

export async function MongoDb() {

    const uri = process.env.MONGODB_URI;
    console.log(uri);

    if (!uri) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    if (isDbConnected.value) {
        return
    }

    const resp = await mongoose.connect(uri)
    console.log(resp.connection.readyState);
    isDbConnected.value=resp.connection.readyState
    if(resp){
        console.log('mongoDb connected');
    }

}
