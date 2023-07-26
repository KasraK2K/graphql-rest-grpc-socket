--======================================================================================================
--                                                                                                      
--  #####     #####   ##      #####   ####        ######    ###    #####   ##      #####              
--  ##  ##   ##   ##  ##      ##     ##             ##     ## ##   ##  ##  ##      ##                 
--  #####    ##   ##  ##      #####   ###           ##    ##   ##  #####   ##      #####              
--  ##  ##   ##   ##  ##      ##        ##          ##    #######  ##  ##  ##      ##                 
--  ##   ##   #####   ######  #####  ####           ##    ##   ##  #####   ######  #####              
--                                                                                                      
--======================================================================================================



CREATE TABLE IF NOT EXISTS roles
(
    id                	SERIAL PRIMARY KEY,
	
	name        	    VARCHAR(50)  NOT NULL DEFAULT '',
	description         VARCHAR(250) NOT NULL DEFAULT '',
    
	permissions			INTEGER[]	     DEFAULT '{}',

    created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       	TIMESTAMPTZ
);

-- Update updated_at
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON "roles"
    FOR EACH ROW
EXECUTE PROCEDURE trg_timestamp();


-- Insert Record
INSERT INTO roles (name, description, permissions) VALUES ('admin', 'access to everything', '{0, 1, 2}') RETURNING *;