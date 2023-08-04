--============================================================================================
--                                                                                                          
--    ###    ####    ###    ###  ##  ##     ##        ######    ###    #####   ##      #####              
--   ## ##   ##  ##  ## #  # ##  ##  ####   ##          ##     ## ##   ##  ##  ##      ##                 
--  ##   ##  ##  ##  ##  ##  ##  ##  ##  ## ##          ##    ##   ##  #####   ##      #####              
--  #######  ##  ##  ##      ##  ##  ##    ###          ##    #######  ##  ##  ##      ##                 
--  ##   ##  ####    ##      ##  ##  ##     ##          ##    ##   ##  #####   ######  #####              
--                                                                                                          
--============================================================================================


CREATE TABLE IF NOT EXISTS admins
(
    id                	SERIAL PRIMARY KEY,
	
	first_name        	VARCHAR(50)  NOT NULL DEFAULT '',
	surname           	VARCHAR(50)  NOT NULL DEFAULT '',
	contact_number    	VARCHAR(50)  NOT NULL DEFAULT '',
	
    email             	VARCHAR(50)  NOT NULL UNIQUE,
    password          	VARCHAR(200) NOT NULL,
    last_token          VARCHAR(500) NOT NULL DEFAULT '',

    is_active         	BOOLEAN      DEFAULT TRUE,
    is_block        	BOOLEAN      DEFAULT FALSE,
    is_archive        	BOOLEAN      DEFAULT FALSE,
    is_superuser        BOOLEAN      DEFAULT FALSE,
	roles				INTEGER[]	 DEFAULT '{}',

    created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       	TIMESTAMPTZ,
    last_login_at       TIMESTAMPTZ
);

-- Update updated_at
CREATE TRIGGER set_timestamp
    BEFORE UPDATE
    ON "admins"
    FOR EACH ROW
EXECUTE PROCEDURE trg_timestamp();

-- Create Index
CREATE INDEX "admin_email" ON "admins"("email");
CREATE INDEX "admin_last_token" ON "admins"("last_token");
CREATE INDEX "admin_is_archive" ON "admins"("is_archive");

-- Insert Record
-- Password is 12345678 and hashed by bcryptjs salt 7
INSERT INTO admins (email, password, is_superuser) VALUES ('kasra.karami.kk@yahoo.com', '$2a$07$r66gkFrxBP5L5/XSd4No4eY.Z/UGu.56F/neHhsLjAwydlPvUnocO', TRUE) RETURNING *;