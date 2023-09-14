import cors from 'cors';

const ACEEPTED_ORIGINS = [
    'http://localhost:8080',
    'https://elbardelafai-dev.fl0.io'
]

export const corsMiddleware = ({ acceptedOrigins = ACEEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        console.log("CORS: origin", origin);

        if (acceptedOrigins.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
})