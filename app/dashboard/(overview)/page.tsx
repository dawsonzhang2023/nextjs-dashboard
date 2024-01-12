import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "../../lib/data"
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { lusitana } from "@/app/ui/fonts"
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import CardWrapper, { Card } from "../../ui/dashboard/cards";
import { Suspense } from "react";
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";


async function page() {

  // const revenue = await fetchRevenue();
  // const invoices = await fetchLatestInvoices();
  // console.log( revenue )

  /*
  const  {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); 
  
  
<Card title="Collected" value={totalPaidInvoices} type='collected'></Card>
        <Card title="Collected" value={totalPendingInvoices} type='pending'></Card>
        <Card title="Collected" value={numberOfInvoices} type='invoices'></Card>
        <Card title="Collected" value={numberOfCustomers} type='customers'></Card>


  
  */





  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={ <CardSkeleton /> }>
              <CardWrapper />
          </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/*<RevenueChart revenue={revenue}></RevenueChart> */}
          <Suspense fallback={ <RevenueChartSkeleton />}>
              <RevenueChart />
          </Suspense>
          {/*} <LatestInvoices latestInvoices={invoices}></LatestInvoices> */}
          <Suspense fallback={ <LatestInvoicesSkeleton />}>
            <LatestInvoices />
          </Suspense>
      </div>
    </main>
  )
}

export default page