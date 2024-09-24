import { useEffect, useState } from "react"
import { Container,Flex,Grid,Heading,Input, Skeleton, Spinner } from "@chakra-ui/react"
import { searchData } from "../../services/api"
import Card from "../../components/Card"
import Pagination from "../../components/Pagination"


const Search = () => {
  const [searchValue,setSearchValue]=useState("")
  const [tempSearchValue,setTempSearchValue]=useState("")
  const [activePage,setActivePage]=useState(1)
  const [isLoading,setIsLoading]=useState(false)
  const [data,setData]=useState([])
  const [totalPages,setTotalPages]=useState(1)


  useEffect(()=>{
    setIsLoading(true)
    searchData(searchValue,activePage)
    .then((res)=>{console.log(res)
      setData(res?.results)
      setActivePage(res?.page)
      setTotalPages(res?.total_pages)
    }
  )
    .catch((err)=>console.log(err))
    .finally(()=>setIsLoading(false))
  },[searchValue,activePage])

  const handleSearch=(e)=>{
    e.preventDefault()
    setSearchValue(tempSearchValue)
    
  }

  return (
    <Container px={"6"} maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"xl"} textTransform={"uppercase"} px={8} >
          Search
        </Heading>
      </Flex>  

      <form  onSubmit={handleSearch}>
        <Input
        placeholder="Search movies, tv shows... "
        _placeholder={{color:"gray.400"}} 
        value={tempSearchValue}
        ml={8}
        width={"97%"}
        
        onChange={(e)=>setTempSearchValue(e.target.value)} 
        />
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt={"10"}>
          <Spinner size={"xl"} color="red"/>
        </Flex>
      )}

      {
        data?.length === 0 && (
          <Heading textAlign={"center"} as={"h2"} fontSize={"md"} mt={"10"}>
            No results found
          </Heading>
        )
      }

      <Grid templateColumns={{
       base:"1fr",
       sm:"repeat(2,1fr)",
       md:"repeat(4,1fr)",
       lg:"repeat(5,1fr)"
      }} gap={8} px={8} py={4}>
        {
          data?.length > 0 && !isLoading && data?.map((item,i)=>(
            isLoading?(
              <Skeleton height={300} key={i}/>
            ):(
              <Card key={item?.id} item={item} type={item?.media_type} />
            )
          ))
        }
      </Grid>

      {data?.length > 0 && !isLoading && (
        <Pagination activePage={activePage} totalPages={totalPages} setActivePage={setActivePage}/>
      )}

    </Container>
  )
}

export default Search