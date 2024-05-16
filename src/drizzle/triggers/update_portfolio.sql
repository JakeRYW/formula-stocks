CREATE OR REPLACE FUNCTION update_portfolio()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN

    INSERT INTO portfolio ("userId", "stockId", quantity)
    VALUES (NEW."userId", NEW."stockId", NEW.quantity)
    ON CONFLICT ("userId", "stockId")
    DO UPDATE SET quantity = 
        CASE WHEN NEW.transaction_type = 'buy' THEN portfolio.quantity + EXCLUDED.quantity
            WHEN NEW.transaction_type = 'sell' THEN portfolio.quantity - EXCLUDED.quantity
            ELSE portfolio.quantity
        END;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_portfolio_trigger on "transactions";

CREATE TRIGGER update_portfolio_trigger
AFTER INSERT ON "transactions"
FOR EACH ROW
EXECUTE PROCEDURE update_portfolio();
