import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 transition-all duration-200"
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
