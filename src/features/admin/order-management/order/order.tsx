import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { OrderType } from "./types/order.type";
import Badge from "@/components/ui/badge/Badge";
import useFetchOrder from "./hooks/useFetchOrder";
import Image from "next/image";

export default function OrderPage() {
    const { tableData } = useFetchOrder();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isSelectedRow, setIsSelectedRow] = useState(false);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null; // Render nothing until client-side rendering
    }

    const handleSelectAll = () => {
        const allIds = tableData.map((item) => item.id);

        setIsSelectedRow(false);

        if (selectedIds.length === tableData.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(allIds);
        }
    };

    const handleSelectRow = (id: number) => {
        let updatedIds: number[];

        setIsSelectedRow(true);

        if (selectedIds.includes(id)) {
            updatedIds = selectedIds.filter((itemId) => itemId !== id);
        } else {
            updatedIds = [...selectedIds, id];
        }

        setSelectedIds(updatedIds);
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Orders" />
            <div className="space-y-6">
                <ComponentCard
                    title="List of orders"
                    desc="Select the Delivery Number to proceed"
                    headerRight={
                        <div className="mb-4 flex flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
                            <button className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6 2C5.44772 2 5 2.44772 5 3V6H6V3H18V6H19V3C19 2.44772 18.5523 2 18 2H6ZM5 8C3.89543 8 3 8.89543 3 10V17C3 18.1046 3.89543 19 5 19H6V21C6 21.5523 6.44772 22 7 22H17C17.5523 22 18 21.5523 18 21V19H19C20.1046 19 21 18.1046 21 17V10C21 8.89543 20.1046 8 19 8H5ZM17 20H7V16H17V20ZM5 10H19V17H18V14H6V17H5V10Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Print Delivery Order
                            </button>

                            <button className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4.293 6.293L12 2.586L19.707 6.293C19.8946 6.3801 20.0574 6.50869 20.1836 6.66805C20.3097 6.8274 20.3955 7.01249 20.433 7.209L21 10.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V10.5L3.56696 7.209C3.60445 7.01249 3.6903 6.8274 3.81643 6.66805C3.94257 6.50869 4.10537 6.3801 4.293 6.293ZM12 4.414L6.182 7.5H17.818L12 4.414ZM5 9L12 12.5L19 9L19.5 10.5V17H4.5V10.5L5 9Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Process Delivery Order
                            </button>
                        </div>
                    }
                >
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <div className="mb-4 flex flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {" "}
                                        Show{" "}
                                    </span>
                                    <div
                                        x-data="{ isOptionSelected: false }"
                                        className="relative z-20 bg-transparent"
                                    >
                                        <select className="dark:bg-dark-900 h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none py-2 pl-3 pr-8 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                                            <option
                                                value="10"
                                                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                            >
                                                10
                                            </option>
                                            <option
                                                value="8"
                                                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                            >
                                                8
                                            </option>
                                            <option
                                                value="5"
                                                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                            >
                                                5
                                            </option>
                                        </select>
                                        <span className="absolute right-2 top-1/2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                            <svg
                                                className="stroke-current"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {" "}
                                        entries{" "}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <div className="relative">
                                        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                            <svg
                                                className="fill-current"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>

                                        <input
                                            type="text"
                                            x-model="search"
                                            placeholder="Search..."
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                                        />
                                    </div>

                                    <button className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                        <svg
                                            className="stroke-current fill-white dark:fill-gray-800"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2.29004 5.90393H17.7067"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17.7075 14.0961H2.29085"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                        Filter
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-[1102px]">
                                <Table>
                                    {/* Table Header */}
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            <TableCell
                                                isHeader
                                                className="w-[36px] px-2 py-3 text-start text-theme-xs"
                                            >
                                                <div className="flex items-center justify-center">
                                                    <input
                                                        className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                                                        type="checkbox"
                                                        checked={
                                                            tableData.length > 0 &&
                                                            selectedIds.length === tableData.length
                                                        }
                                                        onChange={handleSelectAll}
                                                    />
                                                    {selectedIds.length > 0 && !isSelectedRow && (
                                                        <svg
                                                            className="absolute w-3 h-3 text-white pointer-events-none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Create Order
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Customer Name
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Pickup Location
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Delivery Location
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Delivery Date
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Status
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Total Weight
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Total Vulome
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Assigned Driver
                                            </TableCell>
                                            {/* <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Action
                      </TableCell> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {tableData?.map((order: OrderType, index: number) => (
                                            <TableRow key={order.id} className="group transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white">
                                                <TableCell className="w-[36px] px-2 py-3 text-start text-theme-xs">
                                                    <div className="relative flex items-center justify-center">
                                                        <input
                                                            className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                                                            type="checkbox"
                                                            checked={selectedIds.includes(order.id)}
                                                            onChange={() => handleSelectRow(order.id)}
                                                        />
                                                        {selectedIds.includes(order.id) && (
                                                            <svg
                                                                className="absolute w-3 h-3 text-white pointer-events-none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    {order.createOrder.number}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    {order.createOrder.customer.name}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    {order.createOrder.pickupLocation}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    {order.createOrder.deliveryLocation}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    {order.createOrder.deliveryDate}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    <Badge
                                                        size="sm"
                                                        color={
                                                            order.status === "Delivered" && "On Delivery"
                                                                ? "success"
                                                                : order.status === "Pending"
                                                                    ? "error"
                                                                    : "warning"
                                                        }
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    {order.createOrder.totalWeight}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    {order.createOrder.totalVolume}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 overflow-hidden rounded-full relative">
                                                            <Image
                                                                src={`/images/user/user-${String(
                                                                    index + 1
                                                                ).padStart(2, "0")}.jpg`}
                                                                alt="brand"
                                                                fill
                                                            />
                                                        </div>
                                                        <div>
                                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                                {order.createOrder.driver.name}
                                                            </span>
                                                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                                {order.createOrder.vehicle.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                {/* <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <div className="flex w-full items-center gap-2">
                            <svg
                              className="cursor-pointer hover:fill-success-500 dark:hover:fill-success-500 fill-gray-700 dark:fill-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6 9V4h12v5h1a2 2 0 0 1 2 2v7h-4v3H7v-3H3v-7a2 2 0 0 1 2-2h1zm2-3v3h8V6H8zm8 9H8v4h8v-4z"
                                fill=""
                              />
                            </svg>
                          </div>
                        </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="border-t border-gray-100 py-4 pl-[18px] pr-4 dark:border-gray-800">
                                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                                    <p className="border-b border-gray-100 pb-3 text-center text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                                        Showing <span x-text="startEntry">1</span> to
                                        <span x-text="endEntry"> 10 </span> of
                                        <span x-text="totalEntries"> 30 </span> entries
                                    </p>
                                    <div className="flex items-center justify-center gap-0.5 pt-3 xl:justify-end xl:pt-0">
                                        <button className="mr-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                                            Previous
                                        </button>

                                        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500 bg-blue-500/[0.08] text-brand-500">
                                            1
                                        </button>

                                        <template x-if="currentPage > 3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                                                ...
                                            </span>
                                        </template>

                                        <template x-for="page in pagesAroundCurrent">
                                            <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                                                <span x-text="page"></span>
                                            </button>
                                        </template>
                                        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500 text-gray-700 dark:text-gray-400">
                                            <span x-text="page">2</span>
                                        </button>

                                        <template x-if="currentPage < totalPages - 2">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">
                                                ...
                                            </span>
                                        </template>

                                        <button className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </div>
    );
}
