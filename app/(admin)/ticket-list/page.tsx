"use client";

import { useState } from "react";
import TicketListHeader from "@/components/ticket-list/TicketListHeader";
import LatestReportsTable from "@/components/ticket-list/LatestReportsTable";
import TicketDetailModal from "@/components/ticket-list/TicketDetailModal";
import { ticketListDummyData, Report } from "@/components/dashboard/dummy-data";

export default function TicketListPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <TicketListHeader />
      <LatestReportsTable
        reports={ticketListDummyData}
        title={`All Ticket Reports (${ticketListDummyData.length})`}
        hideLink={true}
        isTicketListPage={true}
        onDetailClick={(report) => setSelectedReport(report)}
      />

      <TicketDetailModal
        isOpen={selectedReport !== null}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
    </div>
  );
}

