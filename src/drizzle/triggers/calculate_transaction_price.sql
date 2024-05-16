CREATE OR REPLACE FUNCTION calculate_transaction_price()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN

    SELECT price INTO NEW."total_price" FROM stocks WHERE "id" = NEW."stockId";

    IF NEW IS NOT NULL AND NEW.transaction_type = 'buy' THEN
        NEW."total_price" := ROUND(NEW."total_price" * NEW.quantity + NEW."total_price" * NEW.quantity * 0.0025, 2);
    ELSEIF NEW.transaction_type = 'sell' THEN
        NEW."total_price" := ROUND(NEW."total_price" * NEW.quantity, 2);
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS before_transaction_insert on "transactions";

CREATE TRIGGER before_transaction_insert
BEFORE INSERT ON "transactions"
FOR EACH ROW
EXECUTE PROCEDURE calculate_transaction_price();
