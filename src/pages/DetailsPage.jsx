import { useEffect, useState } from "react"
import { fetchCredits, fetchDetails, fetchVideos, imagePathOriginal } from "../services/api"
import { useParams } from "react-router-dom"
import { Badge, Box , CircularProgress, CircularProgressLabel, Container, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { Spinner } from '@chakra-ui/react'
import { imagePath } from "../services/api"
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons'
import { minToHour, ratingToPercentage, resolveRatingColor } from "../utils/helpers"
import VideoComp from "../components/VideoComp"

const DetailsPage = () => {
    const param=useParams()
    const {type,id}=param
    const [loading,setLoading]=useState(true)
    const [details,setDetails]=useState({})
    const [cast,setCast]=useState([])
    const [video,setVideo]=useState(null)
    const [videos,setVideos]=useState([])

    // useEffect(()=>{
    //     fetchDetails(type,id)
    //     .then((res)=>{
    //         setDetails(res)
           
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    //     .finally(()=>{
    //         setLoading(false)
    //     })
    // },[type,id])

    // console.log(details)

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const [detailsData,creditsData,videosData] = await Promise.all([
                    fetchDetails(type,id),
                    fetchCredits(type,id),
                    fetchVideos(type,id)
                ])
                setDetails(detailsData)
                setCast(creditsData?.cast?.slice(0,10))
                
                const video=videosData?.results?.find((video)=>video?.type === "Trailer")
                setVideo(video)
                const videos=videosData?.results?.filter((video)=>video?.type !== "Trailer")?.slice(0,10)
                setVideos(videos)

            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)

            }
        }

        fetchData()
    },[type , id ])

        console.log(cast)

  if (loading) {
    return(
        <Flex justifyContent={"center"}>
            <Spinner size={"xl"} color="red"  />
        </Flex>
    ) 
  }

  const title = details?.title  || details?.name
  const releaseDate = type === "tv" ? details?.first_air_date : details?.release_date

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
                        <Heading fontSize={"4xl"} mb={4}>
                            {title}{" "}
                            <Text as={"span"} fontSize={"2xl"} fontWeight={"normal"} color={"gray.500"}>
                                {new Date(releaseDate).getFullYear()}
                            </Text>
                        </Heading>

                        <Flex alignItems={"center"} gap={"4"} mt={"1"} mb={"5"}>
                            <Flex alignItems={"center"} >
                                <CalendarIcon mr={2} color={"gray.400"} />
                                <Text fontSize={"md"}>
                                {new Date(releaseDate).toLocaleDateString("en-In")} (US)
                                </Text>
                            </Flex>
                            {
                                type === "movie" && (
                                    <>
                                        <Box>
                                            *
                                        </Box>
                                        <Flex alignItems={"center"}>
                                            <TimeIcon mr={"2"} color={"gray.400"}/>
                                            <Text fontSize={"md"}>{minToHour(details?.runtime)}</Text>
                                        </Flex>
                                    </>
                            )}
                        </Flex>
                        <Flex alignItems={"center"} gap={"4"}>
                            <CircularProgress
                            value={ratingToPercentage(details?.vote_average)}
                            bg={"gray.800"}
                            borderRadius={"full"}
                            p={"0.5"}
                            size={"60px"}
                            color={resolveRatingColor(details?.vote_average)}
                            thickness={"6px"}
                            >
                            <CircularProgressLabel fontSize={"lg"}>
                                {ratingToPercentage(details?.vote_average)}{" "}
                                <Box as="span" fontSize={"10px"}>%</Box>
                            </CircularProgressLabel>    
                            </CircularProgress>
                            <Text display={{base:"none", md:"initial"}}>
                                User Score
                            </Text>
                        </Flex>
                        <Text 
                            color={"gray.400"}
                            fontSize={"sm"}
                            fontStyle={"italic"}
                            my={"5"}>
                                {details?.tagline}
                        </Text>
                        <Heading fontSize={"xl"} mb={"3"}>
                            Overview
                        </Heading>
                        <Text fontSize={"md"} mb={"3"}>
                            {details?.overview}
                        </Text>
                        <Flex mt={"6"} gap={"2"}>
                            {details?.genres?.map((genre)=>(
                                <Badge key={genre?.id} p={"2"}>{genre?.name}</Badge>
                            ))}
                        </Flex>
                    </Box>
                </Flex>
            </Container>
        </Box>

        <Container px={8} maxW={"container.xl"} pb="10">
        <Heading as={"h2"} fontSize={"2xl"} textTransform={"uppercase"} mt={"10"}>
            Cast
        </Heading>
        <Flex mt={"5"} mb={"10"} overflowX={"scroll"} gap={"5"}>
            {cast?.length === 0 && <Text>No cast found</Text>}
            {cast && cast?.map((item)=>(
                <Box key={item?.id} minW={"150px"}>
                    <Image borderRadius={"md"} src={`${imagePath}/${item?.profile_path}`}/>
                    <Text fontSize={"xl"} textAlign={"center"} mt={"2"}>{item?.name || item?.original_name}</Text>
                </Box>
            ))}
        
        </Flex>

        <Heading
        as="h2"
        fontSize={"2xl"}
        textTransform={"uppercase"}
        mt={"10"}
        mb={"5"}>
            Videos
        </Heading>
        <VideoComp id={video?.key} />
        <Flex mt={"5"} mb={"10"} overflowX={"scroll"} gap={"5"}>
        {videos && videos?.map((item)=>(
            <Box key={item?.id} minW={"300px"}>
                <VideoComp id={item?.key} small/>
                <Text fontSize={"md"} fontWeight={"bold"} mt={2} noOfLines={2}>
                    {item?.name}{" "}
                </Text>
            </Box>
        ))}
        </Flex>
    </Container>                            
    </Box>
  )
}

export default DetailsPage