import React from "react";
import { Text, Box, Image } from "@chakra-ui/react";

class Card extends React.Component {
   constructor() {
      super();
      this.myRef = React.createRef();
   }

   render() {
      return (
         <Box
            className="card"
            ref={this.myRef}
            onPointerDown={(e) => {
               this.myRef.current.className = "card cardpressed";
            }}
            onPointerUp={(e) => {
               this.myRef.current.className = "card";
            }}
            onMouseLeave={(e) => {
               this.myRef.current.className = "card";
            }}
            onClick={() => this.props.setCurrentUser(this.props.data.login)}
         >
            <Box mr="1vh">
               <Image src={this.props.data.avatar_url} boxSize="150px" />
            </Box>
            <Box>
               <Text>Username: {this.props.data.login}</Text>
               <Text>Name: {this.props.data.name}</Text>
            </Box>
         </Box>
      );
   }
}

export default Card;
