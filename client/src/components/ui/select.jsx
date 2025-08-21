import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = ({ children, onValueChange, defaultValue, value }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '')
  const [selectedLabel, setSelectedLabel] = React.useState('')
  
  const handleSelect = (value, label) => {
    setSelectedValue(value)
    setSelectedLabel(label)
    setIsOpen(false)
    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            selectedLabel,
            isOpen
          })
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onSelect: handleSelect,
            selectedValue
          })
        }
        return child
      })}
    </div>
  )
}

const SelectTrigger = ({ className, children, onClick, selectedLabel, isOpen, ...props }) => (
  <button
    type="button"
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    onClick={onClick}
    {...props}
  >
    <span className={selectedLabel ? "text-foreground" : "text-muted-foreground"}>
      {selectedLabel || children}
    </span>
    <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
  </button>
)

const SelectContent = ({ className, children, isOpen, onSelect, selectedValue, ...props }) => {
  if (!isOpen) return null
  
  return (
    <div
      className={cn(
        "absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
        className
      )}
      {...props}
    >
      <div className="p-1">
        {React.Children.map(children, child => {
          if (child.type === SelectItem) {
            return React.cloneElement(child, {
              onSelect,
              isSelected: child.props.value === selectedValue
            })
          }
          return child
        })}
      </div>
    </div>
  )
}

const SelectItem = ({ className, children, value, onSelect, isSelected, ...props }) => (
  <div
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
      isSelected && "bg-accent text-accent-foreground",
      className
    )}
    onClick={() => onSelect(value, children)}
    {...props}
  >
    {children}
  </div>
)

const SelectValue = ({ placeholder }) => (
  <span className="text-muted-foreground">{placeholder}</span>
)

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
}

