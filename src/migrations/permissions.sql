--===================================================================================================================================================
--                                                                                                                                                   
--  #####   #####  #####    ###    ###  ##   ####   ####  ##   #####   ##     ##   ####        ######    ###    #####   ##      #####              
--  ##  ##  ##     ##  ##   ## #  # ##  ##  ##     ##     ##  ##   ##  ####   ##  ##             ##     ## ##   ##  ##  ##      ##                 
--  #####   #####  #####    ##  ##  ##  ##   ###    ###   ##  ##   ##  ##  ## ##   ###           ##    ##   ##  #####   ##      #####              
--  ##      ##     ##  ##   ##      ##  ##     ##     ##  ##  ##   ##  ##    ###     ##          ##    #######  ##  ##  ##      ##                 
--  ##      #####  ##   ##  ##      ##  ##  ####   ####   ##   #####   ##     ##  ####           ##    ##   ##  #####   ######  #####              
--                                                                                                                                                   
--===================================================================================================================================================




CREATE TABLE IF NOT EXISTS permissions
(
    id                	SERIAL PRIMARY KEY,
	
	name        	    VARCHAR(50)  NOT NULL DEFAULT '',
	description         VARCHAR(250) NOT NULL DEFAULT '',
    module              INTEGER      NOT NULL,
	access              INTEGER	     NOT NULL,

    created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       	TIMESTAMPTZ
);

-- Update updated_at
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON "permissions"
    FOR EACH ROW
EXECUTE PROCEDURE trg_timestamp();

-- Insert Record
INSERT INTO permissions (name, description, module, access) VALUES ('Writer', 'Alow to write new posts', 1, 1001) RETURNING *;