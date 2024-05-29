

let schema = {

    createUsers: `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT NOW()
    );`
}

module.exports =  schema; 
