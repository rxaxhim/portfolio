import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils"

const Progress = React.forwardRef(({ className, value = 0, animateInView = true, ...props }, ref) => {
  const rootRef = React.useRef(null)
  const [visible, setVisible] = React.useState(!animateInView)

  React.useEffect(() => {
    if (!animateInView || !rootRef.current) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setVisible(true)
      })
    }, { threshold: 0.2 })
    io.observe(rootRef.current)
    return () => io.disconnect()
  }, [animateInView])

  const displayed = visible ? value : 0

  return (
    <ProgressPrimitive.Root
      ref={(node) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-teal-500/15",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-transform duration-700 ease-out will-change-transform",
          "bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400",
          "shadow-[0_0_12px_rgba(45,212,191,0.35)]"
        )}
        style={{ transform: `translateX(-${100 - (displayed || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
