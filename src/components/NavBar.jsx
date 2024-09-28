import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Box,Container,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerOverlay,Flex, IconButton, useDisclosure, } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar=()=>{

    const { onOpen, isOpen, onClose } = useDisclosure();
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
                <Flex fontSize="xl" gap={10} alignItems={"center"} display={{base:"none", md:"flex"}}>
                    <Link to="/">Home</Link>
                    <Link to="movies">Movies</Link>
                    <Link to="shows">Tv Shows</Link>
                    <Link to="search">Search</Link>
                </Flex>

                
          {/* Mobile */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"black"}>
                <DrawerCloseButton />
            

                <DrawerBody>
                  <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                    <Link to="/">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/shows">TV Shows</Link>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
        </Container>
    </Box>
    )
}

export default NavBar