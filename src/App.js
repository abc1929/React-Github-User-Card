import React from "react";
import "./App.css";
import { ChakraProvider, Input, Box, Button } from "@chakra-ui/react";
import Cards from "./Components/Cards";

class App extends React.Component {
   constructor() {
      super();
      this.state = {
         currentsearch: "",
         currentUser: {},
      };
   }

   setCurrentUser = (login) => {
      fetch("https://api.github.com/users/" + login, {
         headers: {
            // authorization: "token x",
         },
      })
         .then((res) => {
            // console.log(res.status);
            if (res.status === 404) {
               console.log("user not found");
               return;
            } else {
               res.json().then((res) => this.setState({ currentUser: res }));
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   componentDidMount() {
      fetch("https://api.github.com/users/abc1929", {
         headers: {
            // authorization: "token x",
         },
      }).then((res) =>
         res.json().then((res) => this.setState({ currentUser: res }))
      );
   }

   shouldComponentUpdate(nextProps, nextState) {
      return this.state.currentUser !== nextState.currentUser;
   }

   componentDidUpdate() {}

   componentWillUnmount() {}

   render() {
      return (
         <ChakraProvider>
            <div className="App">
               <Box display="flex" mt="2vh">
                  <Input
                     placeholder="Username"
                     maxWidth="500px"
                     onChange={(e) =>
                        this.setState({ currentsearch: e.target.value })
                     }
                     onKeyUp={(e) => {
                        if (e.key === "Enter") {
                           this.setCurrentUser(this.state.currentsearch);
                           if (this.state.currentsearch.length !== 0) {
                              this.setState({ currentsearch: "" });
                           }
                        }
                     }}
                  />
                  <Button
                     ml="1vw"
                     w="110px"
                     onClick={(e) => {
                        this.setCurrentUser(this.state.currentsearch);
                        if (this.state.currentsearch.length !== 0) {
                           this.setState({ currentsearch: "" });
                        }
                     }}
                  >
                     Search
                  </Button>
               </Box>
               <Cards
                  currentUser={this.state.currentUser}
                  setCurrentUser={this.setCurrentUser}
               />
            </div>
         </ChakraProvider>
      );
   }
}

export default App;
