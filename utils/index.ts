import { customAlphabet } from 'nanoid/async'
import { alphanumeric } from 'nanoid-dictionary'

/**
 * Generates a random short id.
 * Using 0-9A-Za-z and a length of 7, generating 60 ID's per hour
 * would need ~185 days to have a 1% chance of collision.
 * https://zelark.github.io/nano-id-cc/
 */
const generateSlug = customAlphabet(alphanumeric, 7)

export { generateSlug }
