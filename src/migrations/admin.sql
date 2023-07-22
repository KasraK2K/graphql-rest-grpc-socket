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
	uid					uuid DEFAULT uuid_generate_v4 (),
	
	first_name        	VARCHAR(50)  NOT NULL DEFAULT '',
	surname           	VARCHAR(50)  NOT NULL DEFAULT '',
	contact_number    	VARCHAR(50)  NOT NULL DEFAULT '',
	
    email             	VARCHAR(50)  NOT NULL UNIQUE,
    password          	VARCHAR(200) NOT NULL,
    latest_token        VARCHAR(500) NOT NULL DEFAULT '',

    is_active         	BOOLEAN      DEFAULT TRUE,
    is_block        	BOOLEAN      DEFAULT FALSE,
    is_archive        	BOOLEAN      DEFAULT FALSE,
	roles				UUID[]	     DEFAULT '{}',

    created_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        	TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    archived_at       	TIMESTAMPTZ
    last_login_at       TIMESTAMPTZ
);

-- Create Index
CREATE INDEX "admin_is_archive" ON "admins"("is_archive");
CREATE INDEX "admin_email" ON "admins"("email");

-- Insert Record
INSERT INTO admins (email, password) VALUES ('kasra_k2k@yahoo.com', '12345678') RETURNING *;