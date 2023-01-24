import { Box, Text } from "@chakra-ui/react"
const Footer = () => {
  return (
    <footer>
      <Box bg="#2B6CB0" align="center" p={4} color="white">
        <Text fontSize="lg" as="b">
          <a
            href="https://github.com/AleksiKuj"
            target="_blank"
            rel="noreferrer"
          >
            GitHub.com/AleksiKuj
          </a>
        </Text>
      </Box>
    </footer>
  )
}

export default Footer
