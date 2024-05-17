CREATE OR REPLACE FUNCTION update_balance()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NEW IS NOT NULL AND NEW.transaction_type = 'buy' THEN
        UPDATE "user" SET balance = balance - NEW."total_price" WHERE id = NEW."userId";
    ELSEIF NEW.transaction_type = 'sell' THEN
        UPDATE "user" SET balance = balance + NEW."total_price" WHERE id = NEW."userId";
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS after_transaction_insert on "transactions";

CREATE TRIGGER after_transaction_insert
AFTER INSERT ON "transactions"
FOR EACH ROW
EXECUTE PROCEDURE update_balance();
