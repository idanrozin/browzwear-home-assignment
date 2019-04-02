import React, {Component} from 'react'
import axios from 'axios'
import clients from './data/clients.json'
class MainTable extends Component{
    componentWillMount() {
       //console.log(clients);
       this.setState({clientList:clients.Customers})
    }
    state = {
        clientList : []

    }

    listCountries(){

    }

    render(){
        const countries = this.state.clientList;
        console.log(this.state.clientList);
        
       const cList =  countries.map( country => {
            return (
               <tr>
                {country.Country}
                    </tr>
                    
                  )
        }

        )
        // const cList = [];
       return cList;  
    }
}

export default MainTable; 