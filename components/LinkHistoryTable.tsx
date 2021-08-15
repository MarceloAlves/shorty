import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import type { Link } from '@prisma/client'
import LinkHistoryRow from './LinkHistoryRow'

interface Props {
  links: Link[]
}

export default function LinkHistoryTable({ links }: Props) {
  return (
    <Table size='sm' variant='simple'>
      <Thead>
        <Tr>
          <Th />
          <Th>Slug</Th>
          <Th>Long URL</Th>
        </Tr>
      </Thead>
      <Tbody>
        {links.map((link) => (
          <LinkHistoryRow key={link.id} link={link} />
        ))}
      </Tbody>
    </Table>
  )
}
