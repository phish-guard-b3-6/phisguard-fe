

import TicketListHeader from "@/components/ticket-list/TicketListHeader";
import LatestReportsTable from "@/components/ticket-list/LatestReportsTable";

export default function TicketListPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <TicketListHeader />
      <LatestReportsTable 
        isTicketListPage={true} 
        hideLink={true} 
      />
    </div>
  );
}
