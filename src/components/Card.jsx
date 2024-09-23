import { Box,Image, Text, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { imagePath } from '../services/api'
import { StarIcon  } from '@chakra-ui/icons'
import moment from 'moment'

const Card = ({item, type}) => {
  return (
    <Link to={`/${type}/${item?.id}`} >
        <Box 
        pos={"relative"}
        _hover={{
          transform:{base:"scale(1)", md:"scale(1.10)"},
          transition:"transform 0.2s ease-in-out",
          "& .overlay":{
          opacity:1}
        }}
        >
            <Image
            src={`${imagePath}/${item?.poster_path}`}
            alt={item?.title || item?.name }
            height={"100%"}
            />
            <Box className='overlay' textAlign={"center"} pos={"absolute"} p={"4"} bottom={"0"} left={"0"} w={"100%"} h={"30%"} bg={"rgba(0,0,0,0.9)"} opacity={"0"} transition={"opacity 0.3s ease-in-out"}>
              <Text mb={"2"} > {item?.title || item?.name} </Text>
              <Text mb={"2"}  fontSize={"small"} color={"green.200"}>
                {moment(item?.release_date || item?.first_air_date).format("Do MMM YYYY")}  
                {/* {new Date(item?.release_date || item?.firse_air_date).getFullYear()  || "N/A"} */}
              </Text>
              <Flex
              alignItems={"center"}
              justifyContent={"center"}
              gap={"2"}>
                <StarIcon fontSize={"small"} />
                <Text>{item?.vote_average?.toFixed(1)}</Text>
              </Flex>
            </Box>
        </Box>
    </Link>
  )
}

export default Card