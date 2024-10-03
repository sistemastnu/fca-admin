"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/common/SortableItem";
import { useState, useEffect } from "react";

export default function SortableList({ data, apiUrl, mutate }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) {
      const sortedData = data.sort((a, b) => a.order - b.order);
      setItems(sortedData);
    }
  }, [data]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.order === active.id);
        const newIndex = items.findIndex((item) => item.order === over.id);
        const updatedItems = arrayMove(items, oldIndex, newIndex);
        updateOrderInBackend(updatedItems);
        return updatedItems;
      });
    }
  };

  const updateOrderInBackend = async (updatedItems) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          updatedItems.map((item, index) => ({
            id: item.id,
            order: index + 1,
          }))
        ),
      });

      if (!response.ok) {
        throw new Error("Failed to update order in backend");
      }
      console.log("Order updated successfully");
      mutate();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem
            key={item.order}
            id={item.order}
            cardTittle={item.title}
            cardContent={item.content}
            idService={item.id}
            refreshData={mutate}
            apiUrl={apiUrl}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
