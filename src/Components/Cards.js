import React from "react";
import { Text, Box } from "@chakra-ui/react";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

class Cards extends React.Component {
   constructor() {
      super();
      this.state = {
         followers: [],
         following: [],
      };
   }

   componentDidUpdate(pp) {
      if (pp.currentUser.login === this.props.currentUser.login) {
         return;
      }
      fetch(this.props.currentUser.url + "/followers", {
         headers: {
            // authorization: "token x",
         },
      }).then((res) =>
         res.json().then((res) => {
            this.setState({ followers: res });
         })
      );

      fetch(this.props.currentUser.url + "/following", {
         headers: {
            // authorization: "token x",
         },
      }).then((res) =>
         res.json().then((res) => {
            this.setState({ following: res });
         })
      );
   }

   render() {
      return (
         <Box className="cardframe">
            <Box className="cardcolumn">
               <Text m="1%"> Current user </Text>
               <Card
                  data={this.props.currentUser}
                  setCurrentUser={this.props.setCurrentUser}
               />
            </Box>
            <Box className="cardcolumn">
               {this.state.followers.length === 0 ? (
                  <></>
               ) : (
                  <Text m="1%"> Followers of this user: </Text>
               )}

               {this.state.followers.length === 0 ? (
                  <></>
               ) : (
                  this.state.followers
                     .slice(0, 10)
                     .map((i) => (
                        <Card
                           key={uuidv4()}
                           data={i}
                           setCurrentUser={this.props.setCurrentUser}
                        />
                     ))
               )}
            </Box>
            <Box className="cardcolumn">
               {this.state.following.length === 0 ? (
                  <></>
               ) : (
                  <Text m="1%"> Users this user follows: </Text>
               )}
               {this.state.following.length === 0 ? (
                  <></>
               ) : (
                  this.state.following
                     .slice(0, 10)
                     .map((i) => (
                        <Card
                           key={uuidv4()}
                           data={i}
                           setCurrentUser={this.props.setCurrentUser}
                        />
                     ))
               )}
            </Box>
         </Box>
      );
   }
}

export default Cards;
