import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import useFetchCreateOrder from "../hooks/useFetchCreateOrder";
import { CreateOrderType } from "../types/createOrder.type";

export default function CreateOrderPage() {
  const { tableData } = useFetchCreateOrder();
  
  const [selection, setSelection] = useState({
    selectedIds: [] as number[],
    isSelectedRow: false,
  })

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing until client-side rendering
  }

  const handleSelectAll = () => {
    const allIds = tableData.map((item) => item.id);

    setSelection({
      selectedIds: selection.selectedIds.length === tableData.length ? [] : allIds,
      isSelectedRow: false,
    })

  };

  const handleSelectRow = (id: number) => {
    setSelection((prev) => {
      const isSelected = prev.selectedIds.includes(id);
      const updatedIds = isSelected
        ? prev.selectedIds.filter((itemId) => itemId !== id)
        : [...prev.selectedIds, id];

      return {
        ...prev,
        selectedIds: updatedIds,
        isSelectedRow: true,
      };
    }

    );
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Create Order" />
      <div className="space-y-6">
        <ComponentCard
          title="List of create orders"
          headerRight={
            selection.selectedIds.length > 0 ? (
              <div className="mb-4 flex flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
                <button className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                  Edit selected
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.41l-2.34-2.34a1.003 1.003 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                  </svg>
                </button>                
                <button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-red-700">
                  Delete Selected
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M3 6h18v2H3V6zm2 3h14v13H5V9zm5 3v7h2v-7H10zm4 0v7h2v-7h-2z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="mb-4 flex flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
                <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
                  Create New Order
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
                      d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
            )
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
                          stroke=""
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
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
                        ></path>
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
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.7075 14.0961H2.29085"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                        fill=""
                        stroke=""
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                        fill=""
                        stroke=""
                        strokeWidth="1.5"
                      ></path>
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
                              selection.isSelectedRow === false && selection.selectedIds.length > 0
                            }
                            onChange={handleSelectAll}
                          />
                          {selection.isSelectedRow === false && selection.selectedIds.length > 0 && (
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
                        Number
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Process By
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
                        Total Weight
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Total Vulome
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {tableData?.map((order: CreateOrderType) => (
                      <TableRow key={order.id} className="group transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-gray-200">
                        <TableCell className="w-[36px] px-2 py-3 text-start text-theme-xs">
                          <div className="relative flex items-center justify-center">
                            <input
                              className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                              type="checkbox"
                              checked={selection.selectedIds.includes(order.id)}
                              onChange={() => handleSelectRow(order.id)}
                            />
                            {selection.selectedIds.includes(order.id) && (
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
                          {order.trackingNumber}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                          {order.sender}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                          {order.recipient}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                          {order.origin}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                          {order.destination}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                          {order.shippingDate}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                          {order.weight}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 dark:group-hover:text-gray-200">
                          {order.dimensions}
                        </TableCell>
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
