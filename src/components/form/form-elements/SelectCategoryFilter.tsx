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
      color: "white",
    }),
    control: (base, state) => ({
      ...base,
      color: "white",
      backgroundColor: "#0d6b3f",
      borderColor: state.isFocused ? "gray" : "#0d6b3f",
      padding: "2px",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
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

