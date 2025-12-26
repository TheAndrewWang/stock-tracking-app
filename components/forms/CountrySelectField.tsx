import React, {useMemo} from 'react'
import {Label} from "@radix-ui/react-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {Controller} from "react-hook-form";
import countryList from "react-select-country-list"

const CountrySelectField = ({name, label, control, error, required = false}: CountrySelectProps) => {
    const options = useMemo(() => countryList().getData(), [])

    return (
        <div className="space-y-2">
            <Label className="form-label">{label}</Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({field}) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">{field.value}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Command className="shadow-md md:min-w-[450px]">
                                        <CommandInput placeholder="Type a command or search..." />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup heading="Suggestions">
                                                <CommandItem>
                                                    <span>Calendar</span>
                                                </CommandItem>
                                                <CommandItem>
                                                    <span>Search Emoji</span>
                                                </CommandItem>
                                                <CommandItem disabled>
                                                    <span>Calculator</span>
                                                </CommandItem>
                                            </CommandGroup>
                                            <CommandSeparator />
                                            <CommandGroup heading="Settings">
                                                <CommandItem>
                                                    <span>Profile</span>
                                                    <CommandShortcut>⌘P</CommandShortcut>
                                                </CommandItem>
                                                <CommandItem>
                                                    <span>Billing</span>
                                                    <CommandShortcut>⌘B</CommandShortcut>
                                                </CommandItem>
                                                <CommandItem>
                                                    <span>Settings</span>
                                                    <CommandShortcut>⌘S</CommandShortcut>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </div>
                            </div>
                            {/*<Command className="rounded-lg border shadow-md md:min-w-[450px]">*/}
                            {/*    <CommandInput placeholder="Type a command or search..." />*/}
                            {/*    <CommandList>*/}
                            {/*        {options.map(option => (*/}
                            {/*            <CommandItem value={option.value} key={option.value}>*/}
                            {/*                <span>{option.label}</span>*/}
                            {/*                <CommandShortcut>⌘P</CommandShortcut>*/}
                            {/*            </CommandItem>*/}
                            {/*        ))}*/}
                            {/*    </CommandList>*/}
                            {/*</Command>*/}
                        </PopoverContent>
                    </Popover>
                )}

            />
        </div>
    )
}
export default CountrySelectField
