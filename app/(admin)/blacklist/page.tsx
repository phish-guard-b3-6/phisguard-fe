"use client";

import { useState } from "react";
import BlacklistHeader from "@/components/blacklist/BlacklistHeader";
import BlacklistTable from "@/components/blacklist/BlacklistTable";
import AddEntryModal from "@/components/blacklist/AddEntryModal";
import DeleteConfirmModal from "@/components/blacklist/DeleteConfirmModal";
import { blacklistDummyData, BlacklistItem } from "@/components/dashboard/dummy-data";

export default function BlacklistPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BlacklistItem | null>(null);

  const handleDeleteClick = (item: BlacklistItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Implement delete logic here if needed
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <BlacklistHeader onAddClick={() => setIsAddModalOpen(true)} />
      <BlacklistTable data={blacklistDummyData} onDeleteClick={handleDeleteClick} />
      
      <AddEntryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
