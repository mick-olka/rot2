import { Box, Card, Typography } from '@mui/material'

import { ReactNode } from 'react'

import { MainLayout } from '@/layouts'

export async function getStaticProps() {
  return {
    props: { header: 'About' },
  }
}

const article = (header: string, children: ReactNode) => (
  <article>
    <h1 style={{ textAlign: 'center' }}>{header}</h1>
    <Card sx={{ padding: '1rem', '& p': { fontSize: '20px' } }}>{children}</Card>
    <br />
  </article>
)

export default function About({ header }: { header: string }) {
  return (
    <MainLayout title='About' description='About page'>
      <main>
        {article(
          'Контакти',
          <Box>
            <Typography>м. Ірпінь, вул. Українська, 83 (тільки офіс)</Typography>
            <br />
            <Typography>1. +38(098) 405-60-40 (Олександр Миколайович)</Typography>
            <Typography>Telegram:@aleksgutsal</Typography>
            <Typography>E-mail: rotangua@gmail.com</Typography>
            <Typography>Viber: +38(098) 405-60-40 м.</Typography>
            <Typography>Виноградів, вул. Комунальна, 1А Салон меблів "Еко дизайн"</Typography>
            <br />
            <Typography>2. +38(050) 550-18-70 (Руслан Миколайович)</Typography>
          </Box>,
        )}
        {article(
          'Про доставку',
          <Box>
            <Typography>
              Доставляємо по всій Україні! Безкоштовна доставка по Києву здійснюється при замовленні
              на суму від 10000 грн. При замовленні на суму до 10000 грн доставка 500 грн в межах
              міста Києва. При доставці за межі Києва 20 грн за 1 км від КП. Доставка товарів,
              замовлених в нашому магазині, здійснюється протягом 1-7 рабочих днів з моменту
              замовлення (при наявності товару на складі). Більш точні терміни виконання замовлення
              і доставки узгоджуйте з менеджером-консультантом. Доставка по Києву і Київській
              області здійснюється щоденно з 10.00 до 22.00 Доставка товарів, замовлених в
              Інтернет–магазині, здійснюється протягом 2 - 7 робочих днів з моменту замовлення
              (залежно від особливостей товару і додаткових умов доставки) післе того,як Ви погодите
              з менеджером-консультантом всі деталі замовлення (його вартістьсть, наявність і дату
              доставки). Доставка по Україні здійснюється до місця після того, як Ви узгодите з
              менеджером-консультантом всі деталі замовлення (його вартість, наявність і дату
              доставки). Вартість доставки, розраховану автоматично, необхідно уточнювати у
              менеджера-консультанта.
            </Typography>
          </Box>,
        )}
        {article(
          'Оплата',
          <Box>
            <Typography>Оплата можлива будь-яким способом за домовленістю.</Typography>
          </Box>,
        )}
      </main>
    </MainLayout>
  )
}
