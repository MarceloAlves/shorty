import { GetServerSideProps } from 'next'
import { getLinkBySlug } from '@services/db'

/**
 * This page exists solely to redirect to either a link or a 404.
 * If everything fails, a 500 error is shown.
 * User _should_ never see this page.
 */

export default function Slug() {
  return <div />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const link = await getLinkBySlug(query.slug as string)

  return {
    props: {},
    redirect: {
      status: link ? 301 : 404,
      destination: link ? link.url : '/404',
    },
  }
}
