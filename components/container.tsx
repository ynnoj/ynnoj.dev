import { forwardRef } from 'react'
import type { ReactElement, ReactNode } from 'react'
import clsx from 'clsx'

const OuterContainer = forwardRef<
  HTMLDivElement,
  { children?: ReactNode; className?: string }
>(function OuterContainer({ children, className }, ref) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

const InnerContainer = forwardRef<
  HTMLDivElement,
  { children?: ReactNode }
>(function InnerContainer({ children }, ref) {
  return (
    <div ref={ref} className="relative px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

export interface ContainerProps {
  children?: ReactNode
  className?: string
  Inner?: typeof InnerContainer
  Outer?: typeof OuterContainer
}

export type ContainerType = React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<HTMLDivElement>
> & {
  Inner: typeof InnerContainer
  Outer: typeof OuterContainer
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, className, Inner, Outer }, ref): ReactElement {
    const InnerComponent = Inner || InnerContainer
    const OuterComponent = Outer || OuterContainer

    return (
      <OuterComponent ref={ref} className={className}>
        <InnerComponent>{children}</InnerComponent>
      </OuterComponent>
    )
  }
) as ContainerType

Container.Outer = OuterContainer
Container.Inner = InnerContainer
