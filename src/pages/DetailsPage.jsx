import { useEffect, useState } from "react"
import { fetchDetails, imagePathOriginal } from "../services/api"
import { useParams } from "react-router-dom"
import { Box , Container, Flex, Heading, Image } from "@chakra-ui/react"
import { Spinner } from '@chakra-ui/react'
import { imagePath } from "../services/api"

const DetailsPage = () => {
    const param=useParams()
    const {type,id}=param
    const [loading,setLoading]=useState(true)
    const [details,setDetails]=useState({})

    useEffect(()=>{
        fetchDetails(type,id)
        .then((res)=>{
            setDetails(res)
           
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setLoading(false)
        })
    },[type,id])

    console.log(details)

  if (loading) {
    return(
        <Flex justifyContent={"center"}>
            <Spinner size={"xl"} color="red"  />
        </Flex>
    ) 
  }

  const title = details?.title  || details?.name

  return (
    <Box>
        <Box 
        background={`linear-gradient(rgba(0,0,0,.80), rgba(0,0,0,.90)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"20% 40%"}
        w={"100%"}
        h={{base: "auto", md:"60%"}}
        py={"2"}
       
        display={"flex"}
        alignItems={"center"} >
            <Container maxW={"container.xl"}>
                <Flex alignItems={"center"} gap={"10"} px={"8"} flexDirection={{base:"column" , md:"row"}}>
                    <Image 
                    height={"350px"} 
                    borderRadius={"sm"}
                    src={`${imagePath}/${details?.poster_path}`} />
                    <Box>
                        <Heading fontSize={"4xl"}>
                            {title}
                        </Heading>
                    </Box>
                </Flex>
            </Container>
        </Box>
    </Box>
  )
}

export default DetailsPage