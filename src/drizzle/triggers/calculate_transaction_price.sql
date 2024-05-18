CREATE OR REPLACE FUNCTION calculate_transaction_price()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
    current_quantity INTEGER;
    current_balance NUMERIC;
BEGIN

    SELECT price INTO NEW."total_price" FROM stocks WHERE "id" = NEW."stockId";

    SELECT quantity INTO current_quantity FROM portfolio WHERE "userId" = NEW."userId" AND "stockId" = NEW."stockId";

    SELECT balance INTO current_balance FROM "user" WHERE "id" = NEW."userId";

    IF NEW IS NOT NULL AND NEW.transaction_type = 'buy' THEN
        NEW."total_price" := ROUND(NEW."total_price" * NEW.quantity + NEW."total_price" * NEW.quantity * 0.0025, 2);
        IF NEW."total_price" > current_balance THEN RAISE EXCEPTION 'total price is greater than user balance';
        END IF;
    ELSEIF NEW.transaction_type = 'sell' THEN
        NEW."total_price" := ROUND(NEW."total_price" * NEW.quantity, 2);
        IF NEW.quantity > current_quantity THEN RAISE EXCEPTION 'sell amount more than amount owned';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS before_transaction_insert on "transactions";

CREATE TRIGGER before_transaction_insert
BEFORE INSERT ON "transactions"
FOR EACH ROW
EXECUTE PROCEDURE calculate_transaction_price();
