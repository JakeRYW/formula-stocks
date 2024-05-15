import { users } from '@/drizzle/schema';
import { db } from './db';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db
			.selectDistinct()
			.from(users)
			.where(eq(users.email, email));

		return user[0];
	} catch {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db
			.selectDistinct()
			.from(users)
			.where(eq(users.id, id));

		return user[0];
	} catch {
		return null;
	}
};
