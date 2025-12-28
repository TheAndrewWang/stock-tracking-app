"use client"

import * as React from 'react'
import {useMemo} from 'react';
import {Check, ChevronsUpDown} from "lucide-react"
import countryList from "react-select-country-list";

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Controller} from "react-hook-form";
import {Label} from "@radix-ui/react-menu";


const CountrySelect = ({value, onChange}: { value: string; onChange: (value: string) => void; }) => {
    const [open, setOpen] = React.useState(false)
    const countries = useMemo(() => countryList().getData(), [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="country-select-trigger"
                >
                    {value
                        ? countries.find((country) => country.value === value)?.label
                        : "Select a country..."
                    }
                    <ChevronsUpDown className="opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0 bg-gray-800 border-gray-600' align='start'>
                <Command className='bg-gray-800 border-gray-600'>
                    <CommandInput placeholder="Search for a country..." className="country-select-input" />
                        <CommandList>
                            <CommandEmpty className="country-select-empty">No countries found.</CommandEmpty>
                            <CommandGroup>
                                {countries.map((country) => (
                                    <CommandItem
                                        key={country.value}
                                        value={country.label}
                                        onSelect={(currentCountry) => {
                                            onChange(currentCountry === value ? "" : currentCountry)
                                            setOpen(false)
                                        }}
                                        className="country-select-item"
                                    >
                                        {country.label}
                                        <Check
                                            className={cn(
                                                "m1-auto",
                                                value === country.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

    )
};

const CountrySelectField = ({
    name,
    label,
    control,
    error,
    required = false
}: CountrySelectProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">{label}</Label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false
                }}
                render={({field}) => (
                    <CountrySelect value={field.value} onChange={(field.onChange)} />
                )}
            />
            {error && <p className='text-sm text-red-500'>{error.message}</p>}
            <p className='text-xs text-gray-500'>
                Helps us show market data and news relevant to you.
            </p>
        </div>
    )
}
export default CountrySelectField
