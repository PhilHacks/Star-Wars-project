import mongoose from 'mongoose';

// Import dotenv to access local .env connection string
import * as dotenv from 'dotenv';

//Call config method to load varible in process.env
dotenv.config();

export const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('🗄️  MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export const closeConnectionToMongoDb = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}
