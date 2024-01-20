'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import z, { coerce, string } from 'zod';

const formSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const formSchemaCreateInvoice = formSchema.omit({
  id: true,
  date: true,
});

export async function createInvoice(params: FormData) {
  console.log(params);

  const { customerId, amount, status } = formSchemaCreateInvoice.parse({
    customerId: params.get('customerId'),
    amount: params.get('amount'),
    status: params.get('status'),
  });

  const amountCent = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  console.log(amountCent);
  console.log(`input date ${date}`);

  await sql`insert  into invoices ( customer_id , amount , status , date) 
   values ( ${customerId} , ${amountCent} , ${status} , ${date})`;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const formSchemaUpdateInvoice = formSchema.omit({
  id: true,
  date: true,
});
export async function updateInvoice(id: string, params: FormData) {
  console.log(`update invoice id :${id}`);

  const { customerId, amount, status } = formSchemaUpdateInvoice.parse({
    customerId: params.get('customerId'),
    amount: params.get('amount'),
    status: params.get('status'),
  });

  const amountCent = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  const result = await sql`update invoices
    set customer_id=${customerId} , amount=${amountCent} , status=${status} ,
      date=${date}
    where id=${id}
    `;

  console.log(`update result : ${result.rowCount}`);
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  console.log(`update invoice id :${id}`);

  const result = await sql`delete from invoices where id=${id}
      `;

  console.log(`update result : ${result.rowCount}`);
  revalidatePath('/dashboard/invoices');
}
