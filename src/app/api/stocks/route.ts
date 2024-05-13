import { NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';
import { stocks } from '@/drizzle/schema';

import { db } from '@/lib/db';

export async function GET() {
	try {
		const allStocks = await db.select().from(stocks);

		return NextResponse.json(allStocks, { status: 200 });
	} catch (error) {
		return new Response(null, {
			status: 500,
		});
	}
}

export async function POST(req: Request) {
	// try {
	// 	const { username, symbol, price } = await req.json();
	// 	//Check for valid request body
	// 	if (!username || !symbol || !price) {
	// 		throw new Error('missing');
	// 	}
	// 	//Check if valid Twitch user
	// 	const user = await getUserByUsername(username);
	// 	if (!user) throw new Error('Twitch username not found');
	// 	const channel = await getChannel(user.id);
	// 	const stream = await getStream(user.id);
	// 	const followers = await getFollowerCount(user.id);
	// 	//Check if stock already exists before inserting
	// 	const existingStock = await db
	// 		.select()
	// 		.from(stocks)
	// 		.where(eq(stocks.id, user.id));
	// 	if (existingStock.length > 0) {
	// 		throw new Error('existing');
	// 	}
	// 	//Create stock object
	// 	const stock = {
	// 		id: user.id,
	// 		symbol: symbol.toUpperCase(),
	// 		name: user.display_name,
	// 		price: price,
	// 		live: stream.length > 0,
	// 		view_count: stream.length > 0 ? stream[0].viewer_count : null,
	// 		title: channel.title,
	// 		game: channel.game_name,
	// 		description: user.description,
	// 		tags: channel.tags,
	// 		mature: channel.is_branded_content,
	// 		followers: followers,
	// 		language: channel.broadcaster_language,
	// 		avatar: user.profile_image_url,
	// 		url: `https://twitch.tv/${user.login}`,
	// 		broadcaster_type:
	// 			user.broadcaster_type === '' ? 'none' : user.broadcaster_type,
	// 		created_at: user.created_at,
	// 	};
	// 	const newStock = await db.insert(stocks).values(stock).returning();
	// 	return NextResponse.json(newStock, { status: 201 });
	// } catch (error) {
	// 	if (error instanceof Error) {
	// 		if (error.message === 'missing') {
	// 			return new Response(null, {
	// 				status: 400,
	// 			});
	// 		}
	// 		if (error.message === 'existing') {
	// 			return NextResponse.json(
	// 				{ error: 'Stock already exists' },
	// 				{
	// 					status: 409,
	// 				}
	// 			);
	// 		}
	// 	}
	// 	console.log(error);
	// 	return new NextResponse(null, {
	// 		status: 500,
	// 	});
	//}
}
