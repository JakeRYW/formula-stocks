'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { LoginSchema, RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields' };
	}

	return { success: 'Email sent' };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields' };
	}

	const { username, password, email } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await db
		.selectDistinct({ email: users.email })
		.from(users);

	if (existingUser) {
		return { error: 'Email already in use' };
	}

	await db
		.insert(users)
		.values({ name: username, email: email, password: hashedPassword });

	return { success: 'Email sent' };
};
