import { Container,Heading } from "@chakra-ui/react"

const Search = () => {
  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"xl"} textTransform={"uppercase"} px={8} >
        search
      </Heading>
    </Container>
  )
}

export default Search