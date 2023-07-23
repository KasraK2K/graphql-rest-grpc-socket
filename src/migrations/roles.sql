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
	-- uid					uuid DEFAULT uuid_generate_v4 (),
	
	name        	    VARCHAR(50)  NOT NULL DEFAULT '',
	description         VARCHAR(250) NOT NULL DEFAULT '',
    
	permissions			INTEGER[]	     DEFAULT '{}',

    created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       	TIMESTAMPTZ,
);

-- Create Index
-- CREATE INDEX "role_uid" ON "roles"("uid");
-- CREATE INDEX "role_name" ON "roles"("name");
CREATE INDEX "role_last_token" ON "roles"("last_token");
CREATE INDEX "role_is_archive" ON "roles"("is_archive");

-- Insert Record
-- Password is 12345678 and hashed by bcryptjs salt 7
INSERT INTO users (email, password) VALUES ('kasra_k2k@yahoo.com', '$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO') RETURNING *;