import dotenv from 'dotenv';
import Server from './models/server';

dotenv.config();
const app = new Server();

app.listen();