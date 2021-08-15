import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react'
import { useAppContext } from '@providers/app'
import LinkHistoryTable from './LinkHistoryTable'

export default function LinkHistory() {
  const [state] = useAppContext()

  return (
    <Box maxWidth='3xl'>
      <Accordion allowMultiple paddingTop={5} paddingX={5}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Link History
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {state.context.linkHistory.length === 0 && <Text marginTop={1}>No links yet. Create one!</Text>}
            {state.context.linkHistory.length >= 1 && <LinkHistoryTable links={state.context.linkHistory} />}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
