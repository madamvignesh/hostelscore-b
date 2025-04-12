const initializeDatabase = require('../model/database.js');

const getAllHostels = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    let {input_search} = req.body;
    if (input_search){
        try{
            const hostels = await db.all(`SELECT * FROM hostel WHERE name LIKE '%${input_search}%' OR address LIKE '%${input_search}%'`);
            res.send(hostels);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
    } else {
        try{
            const hostels = await db.all('SELECT * FROM hostel');
            res.send(hostels);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
    }
}

const getHostelById = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    const { id } = req.params;
    
    input_search = input_search.toLowerCase()

    if (input_search){
        try {
            const hostel = await db.get('SELECT * FROM hostel WHERE hotel_id = ? OR name = ? OR address = ?', [id, input_search, input_search]);
            if (!hostel) {
                return res.status(404).json({ error: 'Hostel not found' });
            }
            res.json(hostel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
    } 
}

module.exports = {
    getAllHostels,
    getHostelById
}