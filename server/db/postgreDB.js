import pg from "pg";
import { config } from "dotenv";
import debug from "debug";
config();

const DEBUG = debug("dev");

const postgre_url = process.env.POSTGRE_DB
const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testrestaurant',
    password: 'Welcome@1',
    port: 5436,
});

client.connect()
    .then(() => {
        DEBUG(`Connected to PostgreSQL`);
    })
    .catch((error) => {
        DEBUG("PostgreSQL connection unsuccessful");
        DEBUG(error);
    });

export default {
    query: (text) => {
        return client.query(text)
    },
}