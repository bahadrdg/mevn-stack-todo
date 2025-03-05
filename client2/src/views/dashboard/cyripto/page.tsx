
import CyriptoCurrencyPriceCards from "./cyripto-currency-price-cards";
import DigitalWallets from "./digital-wallets";
import { RecentActivities } from "./recent-activities";
import { BalanceSummeryChart } from "./balance-summary";
import CoinBuySell from "./coin-buy-sell";
import CalendarDateRangePicker from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import OverviewCard from "./overview-card";

//TODO: Slider a bakılacak stili kayık gibi olmuş

export default function CryptoPage() {
  return (
    <div>
      <div className="mb-4 flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cyripto Dashboard</h1>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      {/* <div className="mb-4 w-screen">
        <CyriptoCurrencyPriceCards />
      </div> */}
      <div className="space-y-4">
        <div className="gap-4 space-y-4 lg:grid lg:grid-cols-6 lg:space-y-0 flex-wrap">
          <OverviewCard />
          <DigitalWallets />
          <CoinBuySell />
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          <RecentActivities />
          <BalanceSummeryChart />
        </div>
      </div>
    </div>
  );
}
