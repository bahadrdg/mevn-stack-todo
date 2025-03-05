import CalendarDateRangePicker from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import AverageDailySalesCard from "./cards/average-daily-sales";
import WebsiteAnalyticsCard from "./cards/website-analytics-card";
import SaleOverviewCard from "./cards/sales-overflow-card";
import EarningReportsCard from "./cards/earning-reports-card";
import TicketsCard from "./cards/tickets-card";
import SalesbyCountriesCard from "./cards/sales-by-countries-card";
import TotalEarningCard from "./cards/total-earning-card";
import MonthlyCampaignStateCard from "./cards/monthly-campaign-state";

export default function WebsitePage() {
  return (
    <>
      <div className="mb-4 flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <h1 className="mb-4 text-2xl font-bold tracking-tight lg:mb-0">Website Analytics</h1>
        <div className="flex items-center space-x-2">
          <div className="grow">
            <CalendarDateRangePicker />
          </div>
          <Button>Download</Button>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <WebsiteAnalyticsCard />
        </div>
        <div className="lg:col-span-4">
          <AverageDailySalesCard />
        </div>
        <div className="lg:col-span-4">
          <SaleOverviewCard />
        </div>
        <div className="lg:col-span-8">
          <EarningReportsCard />
        </div>
        <div className="lg:col-span-4">
          <TicketsCard />
        </div>
        <div className="lg:col-span-4">
          <SalesbyCountriesCard />
        </div>
        <div className="lg:col-span-4">
          <TotalEarningCard />
        </div>
        <div className="lg:col-span-4">
          <MonthlyCampaignStateCard />
        </div>
      </div>
    </>
  );
}
