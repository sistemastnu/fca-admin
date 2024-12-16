"use client";

import dynamic from "next/dynamic";
import { urlSeparetor } from "../Dashboard/utils";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartThree = ({ options, series, info, urls }) => {
  const sum = series.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log(sum);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Servicios Mas Visitados
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {info.map((servicio, index) => {
          const ulr = urlSeparetor(servicio[0]);
          const porcentage = (servicio[1] / sum) * 100;
          return (
            <div key={index} className="flex items-center">
              <span className="mr-2 block h-3 w-3 rounded-full bg-primary"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {ulr} </span>
                <span> {porcentage}% </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartThree;
