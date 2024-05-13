import { db } from '@/lib/db';
import { eq, ilike } from 'drizzle-orm';
import { stocks } from '@/drizzle/schema';
import { NextResponse } from 'next/server';

type Params = {
  stockName: string;
};

export async function GET(req: Request, context: { params: Params }) {
  try {
    const name = context.params.stockName;

    console.log(name);

    const stock = await db
      .select()
      .from(stocks)
      .where(ilike(stocks.name, name.replace('-', ' ')));

    return NextResponse.json(stock, { status: 200 });
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const id = context.params.stockName;

    const deletedStock = await db
      .delete(stocks)
      .where(ilike(stocks.id, id))
      .returning();

    if (deletedStock.length === 0) {
      throw new Error('not found');
    }

    return NextResponse.json(deletedStock, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'not found') {
        return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
      }
    }

    return new NextResponse(null, { status: 500 });
  }
}

// ? Change route to use URL Params instead of slugs
// Cant use two slugs for ID and username
// stocks/chummy
// stocks/45349372

// stocks?username=chummy
// stocks?id=45349372
