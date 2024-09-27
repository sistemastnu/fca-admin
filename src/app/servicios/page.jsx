"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import SortableItem from "@/components/common/SortableItem";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Servicios() {
  const { data, mutate } = useSWR("/api/servicios", fetcher);
  const [items, setItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (data) {
      const sortedData = data.sort((a, b) => a.order - b.order);
      setItems(sortedData);
    }
  }, [data]);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setIsDragging(false);
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
  const refreshData = () => {
    mutate();
  };

  const updateOrderInBackend = async (updatedItems) => {
    try {
      const response = await fetch("/api/servicios", {
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
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  if (!data) return <Loader />;

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <DefaultLayout>
          <Breadcrumb pageName={"Servicios"} />
          <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem
                  key={item.order}
                  onClick={() => handleClick(item.order)}
                  id={item.order}
                  cardTittle={item.title}
                  cardContent={item.content}
                  idService={item.id}
                  refreshData={refreshData}
                />
              ))}
            </SortableContext>
          </div>
        </DefaultLayout>
      </DndContext>
    </>
  );
}
