import { Container,Flex,Grid,Heading, Select, Skeleton } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { fetchTvShows } from "../../services/api"
import Card from "../../components/Card"
import Pagination from "../../components/Pagination"

const Shows = () => {

  const [shows,setShows]=useState([])
  const [isloading,setIsLoading]=useState(true)
  const [activePage, setActivePage] = useState(1)
  const [totalPages,setTotalPages]=useState(1)
  const [sortBy,setSortBy]=useState("popularity.desc")

  useEffect(() => {
   setIsLoading(true)
   fetchTvShows(activePage,sortBy)
   .then((res)=>{
    setShows(res?.results)
    setActivePage(res?.page)
    setTotalPages(res?.total_pages)

   })
   .catch((err)=>{
    console.log(err)
   })
   .finally(()=>{
      setIsLoading(false)
   })

  }, [activePage,sortBy])
  


  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"6"}>
        <Heading as="h2" fontSize={"xl"} textTransform={"uppercase"} px={8} >
          Discover Tv Shows
        </Heading>

        <Select w={"140px"}
        onChange={(e)=>{
          setSortBy(e.target.value)
          setActivePage(1)
        }}>
          <option value="popularity.desc" >
            Popular
          </option>
          <option value="vote_average.desc&vote_count.gte=1000" >
            Top Rated
          </option>
        </Select>
      </Flex>

      <Grid templateColumns={{
       base:"1fr",
       sm:"repeat(2,1fr)",
       md:"repeat(4,1fr)",
       lg:"repeat(5,1fr)"
      }} gap={8} px={8} py={4}>
        {
          shows && shows?.map((item,i)=>(
            isloading?(
              <Skeleton height={300} key={i}/>
            ):(
              <Card key={item?.id} item={item} type={"tv"}/>
            )
          ))
        }
      </Grid>
      <Pagination activePage={activePage} totalPages={totalPages} setActivePage={setActivePage} />
    </Container>
  )
}

export default Shows