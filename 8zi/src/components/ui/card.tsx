import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className="bg-white rounded-2xl overflow-hidden shadow-lg"
      {...props}
    />
  )
)

Card.displayName = "Card"

export { Card }
