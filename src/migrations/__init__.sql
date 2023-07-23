--===================================================================================================
--                                                                                                                  
--  ##  ##     ##  ##  ######        ####      ###    ######    ###    #####     ###     ####  #####              
--  ##  ####   ##  ##    ##          ##  ##   ## ##     ##     ## ##   ##  ##   ## ##   ##     ##                 
--  ##  ##  ## ##  ##    ##          ##  ##  ##   ##    ##    ##   ##  #####   ##   ##   ###   #####              
--  ##  ##    ###  ##    ##          ##  ##  #######    ##    #######  ##  ##  #######     ##  ##                 
--  ##  ##     ##  ##    ##          ####    ##   ##    ##    ##   ##  #####   ##   ##  ####   #####              
--                                                                                                                  
--====================================================================================================


-- Create database
CREATE DATABASE <db_name>;

-- Add privileges to database
GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <db_username>;

-- Create trigger function for update timestamp
CREATE OR REPLACE FUNCTION public.trg_timestamp()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  COST 100
  VOLATILE NOT LEAKPROOF
  AS $BODY$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
    $BODY$;

ALTER FUNCTION public.trg_timestamp()
  OWNER TO postgres;