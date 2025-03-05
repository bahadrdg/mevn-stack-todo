

import ApiKeysDataTable from "./datatable";
import UpgradePlanCard from "./upgrade-plan-card";
import SuccessfulConversionsCard from "./successful-conversions-card";
import FailedConversionsCard from "./failed-conversions-card";

export default function APIPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Api Keys Management</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <UpgradePlanCard />
        <SuccessfulConversionsCard />
        <FailedConversionsCard />
      </div>
      <ApiKeysDataTable data={[]} />
    </div>
  );
}
