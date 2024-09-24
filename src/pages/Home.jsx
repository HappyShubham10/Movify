import { Container, Grid, Heading, Flex, Box, Skeleton } from "@chakra-ui/react"
import { fetchTrending } from "../services/api"
import { useEffect, useState } from "react"
import Card from "../components/Card"

const Home = () => {

  const [data, setData] = useState([])
  const [timeWindow,setTimeWindow]=useState("day")
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    setLoading(true)
    fetchTrending(timeWindow)
    .then((res)=>{
      setData(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    })
  
    
  }, [timeWindow])

  // console.log(data)
  



  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} mt={"4"} mb={"6"}>
        <Heading as="h2" fontSize={"xl"} textTransform={"uppercase"} px={8} >
          Trending
        </Heading>
        <Flex alignItems={"center"} gap={"2"} border={"1px solid teal"} borderRadius={"20px"}>
          <Box 
          as="button" 
          px={"3"} 
          py={"1"} 
          borderRadius={"20px"} 
          bg={`${timeWindow === "day"? "gray.700" :""}`}
          onClick={()=>setTimeWindow("day")}>
            Today
          </Box>
          <Box 
          as="button" 
          px={"3"} 
          py={"1"} 
          borderRadius={"20px"}
          bg={`${timeWindow === "week"? "gray.700" :""}`} 
          onClick={()=>setTimeWindow("week")}>
            This Week
          </Box>
        </Flex>
      </Flex>
     
      {/* {loading && <div>Loading....</div>} */}

      <Grid templateColumns={{
       base:"1fr",
       sm:"repeat(2,1fr)",
       md:"repeat(4,1fr)",
       lg:"repeat(5,1fr)"
      }} gap={8} px={8} py={4}>
        {
          data && data?.map((item,i)=>(
            loading?(
              <Skeleton height={300} key={i}/>
            ):(
              <Card key={item?.id} item={item} type={item?.media_type} />
            )
          ))
        }
      </Grid>

    </Container>
  )
}

export default Home