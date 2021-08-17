import { getServerSideProps } from '../pages/[slug]'
import * as DBService from '@services/db'

/**
 * NOTE:
 * `getServerSideProps` has a whole lot of request/response logic
 * so we're typing as `any` to skip the passrts not needed for the test
 */

describe('Slug getServerSideProps', () => {
  afterEach(jest.resetAllMocks)

  describe('when slug is found', () => {
    it('should return a redirect to the slug link', async () => {
      jest.spyOn(DBService, 'getLinkBySlug').mockResolvedValue({
        slug: 'slug',
        url: 'https://example.com',
        id: '12345',
        createdAt: new Date('2021-01-01T00:00:00.000Z'),
        updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      })

      const result = await getServerSideProps({ query: { slug: 'slug' } } as any)

      expect(result).toStrictEqual({
        props: {},
        redirect: { status: 301, destination: 'https://example.com' },
      })
    })
  })

  describe('when slug is not found', () => {
    it('should return a redirect to /404', async () => {
      jest.spyOn(DBService, 'getLinkBySlug').mockResolvedValue(null)

      const result = await getServerSideProps({ query: { slug: 'slug' } } as any)

      expect(result).toStrictEqual({
        props: {},
        redirect: { status: 404, destination: '/404' },
      })
    })
  })
})
