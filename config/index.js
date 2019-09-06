const dotenv =  require('dotenv');

// set  NODE_ENV to development by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if(!envFound) {
    // This error will crash the whole process

    throw new Error("Could'nt find a .env file");
}

module.exports =  {
    /**
     * your application favorite port
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * application database url
     */
    databaseURL: process.env.MONGODB_URL,

    /**
     * json webtoken secret
     */
    jwtSecret: process.env.JWT_SECRET
}


