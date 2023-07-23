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
    
	access              INTEGER[]	     DEFAULT '{}',

    created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       	TIMESTAMPTZ,
);

-- Update updated_at
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON "permissions"
    FOR EACH ROW
EXECUTE PROCEDURE trg_timestamp();

-- Create Index
CREATE INDEX "permission_last_token" ON "permissions"("last_token");
CREATE INDEX "permission_is_archive" ON "permissions"("is_archive");

-- Insert Record
INSERT INTO permissions (name, description, access) VALUES ('Writer', 'Alow to write new posts', '{1001, 1002, 1003}') RETURNING *;