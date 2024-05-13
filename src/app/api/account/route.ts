import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@/drizzle/schema';

export async function GET() {
	const session = await auth();
	const id = session.user?.id;
	const account = await db.select().from(users).where(eq(users.id, id));

	const user = {
		account: account[0].name,
		balance: account[0].balance,
	};

	return NextResponse.json(user);
}
