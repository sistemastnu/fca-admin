"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import Card from "@/components/common/Card";
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
  const { data } = useSWR("/api/servicios", fetcher);
  const [items, setItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (data) {
      const sortedData = data.sort((a, b) => a.order - b.order);
      setItems(sortedData);
    }
  }, [data]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setIsDragging(false);
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.order === active.id);
        const newIndex = items.findIndex((item) => item.order === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = () => {
    console.log(items);
  };
  if (!data) return <Loader />;

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
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
                >
                  <div>
                    <Card tittle={item.title} content={item.content} />
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          </div>
        </DefaultLayout>
      </DndContext>
    </>
  );
}
