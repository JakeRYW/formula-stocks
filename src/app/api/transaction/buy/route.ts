import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
	const session = await auth();

	console.log(session);

	if (!session) {
		return new NextResponse(null, { status: 401 });
	}

	const { accountId, stockId, amount } = await req.json();
	console.log(accountId, stockId, amount);
	return NextResponse.json({ message: 'Created' }, { status: 201 });

	// try {
	// 	const name = context.params.stockName;

	// 	console.log(name);

	// 	const stock = await db
	// 		.select()
	// 		.from(stocks)
	// 		.where(ilike(stocks.name, name));

	// 	return NextResponse.json(stock, { status: 200 });
	// } catch (error) {
	// 	return new Response(null, {
	// 		status: 500,
	// 	});
	// }
}

export async function GET() {
	const session = await auth();

	console.log(session);

	if (!session) {
		return new NextResponse(null, { status: 401 });
	}

	// const { accountId, stockId, amount } = await req.json();
	// console.log(accountId, stockId, amount);
	return NextResponse.json({ message: 'Created' }, { status: 201 });
}
