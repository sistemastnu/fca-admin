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

export default function Servicios() {
  console.log("Rendering Servicios");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`/api/servicios/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("Active ID:", active.id);
    console.log("Over ID:", over.id);
    if (active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        console.log("Old Index:", oldIndex);
        console.log("New Index:", newIndex);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  if (isLoading) return <Loader />;
  //setItems(data.map((item) => item));
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
                <SortableItem key={item.order} id={item.order}>
                  <Card tittle={item.title} />
                </SortableItem>
              ))}
            </SortableContext>
          </div>
        </DefaultLayout>
      </DndContext>
    </>
  );
}
