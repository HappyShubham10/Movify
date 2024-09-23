import { Box,Container,Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar=()=>{
    return(
        <Box py="4" mb="2" px="8">
            <Container maxW={"container.xl"}>
                <Flex justifyContent={"space-between"}>
                    <Link to="/">
                        <Box
                            fontSize={"4xl"}
                            fontWeight={"bold"}
                            color={"Violet"}
                            letterSpacing={"widest"}
                            fontFamily={"mono"}
                        >
                            Movify
                        </Box>
                    </Link>
                

                {/* desktop */}
                <Flex fontSize="xl" gap={10} alignItems={"center"}>
                    <Link to="/">Home</Link>
                    <Link to="movies">Movies</Link>
                    <Link to="shows">Tv Shows</Link>
                    <Link to="search">Search</Link>
                </Flex>

                </Flex>
            </Container>
        </Box>
    )
}

export default NavBar