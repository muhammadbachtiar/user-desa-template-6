"use client"

import React, { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import type { SingleValue, StylesConfig } from "react-select"
import useCategory from "@/features/article/hooks/useCategory"

const Select = dynamic(() => import('react-select'), { ssr: false });

interface SelectCategoryProps {
  setCategoryId: React.Dispatch<React.SetStateAction<number>>
}

export default function SelectCategoryFilter({ setCategoryId }: SelectCategoryProps) {
  const [options, setOptions] = useState<{ value: number; label: string }[]>([])
  const [search, setSearch] = useState("");
  
  const [isMounted, setIsMounted] = useState(false)
  
  const { data: categories, isLoading } = useCategory({'search': search})
  
  const customStyles: StylesConfig<{ value: number; label: string }> = {
    placeholder: (base) => ({
      ...base,
      color: "rgb(156, 163, 175)", // placeholder gray-450
      fontSize: "0.875rem",
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      borderColor: state.isFocused ? "var(--brand-primary)" : "rgb(229, 231, 235)", // border gray-200
      borderRadius: "12px",
      padding: "2px",
      minHeight: "44px",
      fontSize: "0.875rem",
      color: "var(--neutral-text)",
      boxShadow: "none",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "var(--brand-primary)",
      }
    }),
    input: (base) => ({
      ...base,
      color: "var(--neutral-text)",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--neutral-text)",
      fontWeight: "500",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--neutral-bg)",
      borderRadius: "12px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgb(243, 244, 246)",
      overflow: "hidden",
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? "var(--brand-primary)" 
        : state.isFocused 
          ? "rgba(13, 107, 63, 0.05)" 
          : "transparent",
      color: state.isSelected ? "white" : "var(--neutral-text)",
      cursor: "pointer",
      fontSize: "0.875rem",
      "&:active": {
        backgroundColor: "var(--brand-primary)",
        color: "white",
      }
    }),
  }

  const handleChange = (selectedOption: SingleValue<{ value: number; label: string }>) => {
    setCategoryId(selectedOption ? selectedOption.value : 0)
  }

  const handleInputChange = (inputValue: string) => {
    setSearch(inputValue)
  }

  useEffect(() => {
    if (!categories || !Array.isArray(categories)) {
      setOptions([]);
      return
    }

    const newOptions = categories.map((item) => ({
      value: item.id,
      label: item.name,
    }))
    
    setOptions(newOptions)
  }, [categories])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Select
      styles={customStyles as any}
      isLoading={isLoading}
      isClearable
      placeholder="Cari kategori ..."
      name="category"
      options={options}
      onChange={handleChange as any}
      onInputChange={handleInputChange}
    />
  )
}

