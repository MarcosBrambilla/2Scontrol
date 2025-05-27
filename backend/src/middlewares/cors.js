const whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000'];


//Disable for tests, have to enable it later!! Very Important
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (!origin || whitelist.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error(`Erro de CORS: origem '${origin}' não está na whitelist.`));
//         }
//     }
// };

const corsOptions = {
    origin: (origin, callback) => {
            callback(null, true);
    }
};

export default corsOptions;