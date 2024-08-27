CREATE OR REPLACE FUNCTION add_history()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NEW IS NOT NULL THEN
        INSERT INTO "history" ("stockId", "price") VALUES (NEW.id, NEW.price);
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS after_price_change on "stocks";

CREATE TRIGGER after_price_change
AFTER UPDATE OF "price" 
ON "stocks"
FOR EACH ROW
EXECUTE PROCEDURE add_history();
