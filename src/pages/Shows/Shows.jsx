import { Container,Heading } from "@chakra-ui/react"

const Shows = () => {
  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"xl"} textTransform={"uppercase"} px={8} >
        Discover tv Shows
      </Heading>
    </Container>
  )
}

export default Shows