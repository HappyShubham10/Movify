import { Container,Flex,Grid,Heading, Select, Skeleton } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { fetchMovies } from "../../services/api"
import Card from "../../components/Card"
import Pagination from "../../components/Pagination"

const Movies = () => {

  const [movies,setMovies]=useState([])
  const [isloading,setIsLoading]=useState(true)
  const [activePage, setActivePage] = useState(1)
  const [totalPages,setTotalPages]=useState(1)
  const [sortBy,setSortBy]=useState("popularity.desc")

  useEffect(() => {
   setIsLoading(true)
   fetchMovies(activePage,sortBy)
   .then((res)=>{
    // console.log(res?.results)
    setMovies(res?.results)
    setActivePage(res?.page)
    setTotalPages(res?.total_pages)
    console.log(movies)

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
          Discover Movies
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
          movies && movies?.map((item,i)=>(
            isloading?(
              <Skeleton height={300} key={i}/>
            ):(
              <Card key={item?.id} item={item} type={"movie"}/>
            )
          ))
        }
      </Grid>
      <Pagination activePage={activePage} totalPages={totalPages} setActivePage={setActivePage} />
    </Container>
  )
}

export default Movies