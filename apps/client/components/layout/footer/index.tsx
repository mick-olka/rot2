import { FooterContent } from './footer-content'
import s from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={s.Footer}>
      <FooterContent />
    </footer>
  )
}
