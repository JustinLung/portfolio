import cn from "clsx"
import s from "./SectionHeader.module.css"

interface SectionHeaderProps {
  title?: string
  subtitle?: string
  hasDivider?: boolean
}

export function SectionHeader(props: SectionHeaderProps) {
  const { title, subtitle } = props
  return (
    <section className={cn(s["section-header"], "container")}>
      <h2 className={cn(s["section-header__title"])}>{title}</h2>
      {subtitle && (
        <p className={cn(s["section-header__subtitle"])}>{subtitle}</p>
      )}
    </section>
  )
}
