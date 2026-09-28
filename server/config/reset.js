import {pool} from './database.js'
import './dotenv.js'
import cityData from '../data/gifts.js'

async function createCitiesTable() {
    const createTableQuery = `
        DROP TABLE IF EXISTS cities;
        CREATE TABLE IF NOT EXISTS cities (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            founded INT NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            population TEXT NOT NULL
        );
    `
    try {
        await pool.query(createTableQuery)
        console.log('🎉 cities table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cities table', err)
    }
}

const seedCitiesTable = async () => {
    await createCitiesTable()
    cityData.forEach((city) => {
        const insertQuery = {
            text: `
                INSERT INTO cities (name, state, founded, image, description, population)
                VALUES ($1, $2, $3, $4, $5, $6)
            `
        }
        
        const values = [
            city.name,
            city.state,
            city.founded,
            city.image,
            city.description,
            city.population,
        ]

    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.error('⚠️ error inserting gift', err)
            return
        }

        console.log(`✅ ${city.name} added successfully`)
    })
    }
)
}
seedCitiesTable()