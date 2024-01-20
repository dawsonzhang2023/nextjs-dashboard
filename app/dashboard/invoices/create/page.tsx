import { fetchCustomers } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/create-form';

async function page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoice', href: '/dashboard/invoices' },
          {
            label: 'Create Invoices',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      ></Breadcrumbs>
      <Form customers={customers} />
    </main>
  );
}

export default page;
