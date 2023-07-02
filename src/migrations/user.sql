--=======================================================================================
--                                                                                                     
--  ##   ##   ####  #####  #####     ####        ######    ###    #####   ##      #####              
--  ##   ##  ##     ##     ##  ##   ##             ##     ## ##   ##  ##  ##      ##                 
--  ##   ##   ###   #####  #####     ###           ##    ##   ##  #####   ##      #####              
--  ##   ##     ##  ##     ##  ##      ##          ##    #######  ##  ##  ##      ##                 
--   #####   ####   #####  ##   ##  ####           ##    ##   ##  #####   ######  #####              
--                                                                                                     
--=======================================================================================


CREATE TABLE IF NOT EXISTS users
(
    id                	SERIAL PRIMARY KEY,
	uid					uuid DEFAULT uuid_generate_v4 (),
	
	first_name        	VARCHAR(50)  NOT NULL DEFAULT '',
	surname           	VARCHAR(50)  NOT NULL DEFAULT '',
	contact_number    	VARCHAR(50)  NOT NULL DEFAULT '',
	
    email             	VARCHAR(50)  NOT NULL UNIQUE,
    password          	VARCHAR(200) NOT NULL,

    is_active         	BOOLEAN      DEFAULT TRUE,
    is_verify       	BOOLEAN      DEFAULT FALSE,
    is_block        	BOOLEAN      DEFAULT FALSE,
    is_archive        	BOOLEAN      DEFAULT FALSE,
	roles				UUID[]	     DEFAULT '{}',

    created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       	TIMESTAMP
);

-- Create Index
CREATE INDEX "user_is_archive" ON "users"("is_archive");
CREATE INDEX "user_email" ON "users"("email");

-- Insert Record
INSERT INTO users (email, password) VALUES ('kasra_k2k@yahoo.com', '12345678') RETURNING *;