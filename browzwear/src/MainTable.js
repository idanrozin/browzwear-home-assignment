import React, {Component} from 'react';
import axios from 'axios';
import List from './List/List';
import './MainTable.css';
import MapContainer from './MapContainer';
import Geocode from "react-geocode";

class MainTable extends Component{
    constructor(props) {
        Geocode.setApiKey("AIzaSyA4Uc2Ak1sEekIorvPmNStt8YqrGD4Rahw");
        super(props);
        this.state = {
            clientList: [],
            selectedKey: ''
        }
    }

    componentDidMount() {
       axios.get('clients2.json').then(client => {
           console.log(client);
           console.log(client.data.Customers);
           this.setState({clientList: client.data.Customers});
       })
    }
   
    getRelatedItemsHelper =(relatedItem,selectedKey,currentList)=>{
        console.log('selectedKey ?', selectedKey);
        const selectedItem = currentList.find(item => item.Id === selectedKey);
        console.log('selectedItem ? ', selectedItem);
        return this.state.clientList.filter(customer => customer[relatedItem] === selectedItem[relatedItem]);

    }
    buildListComp = (list,val,listTitle,funcName,cb) =>{
        console.log(list);
        if(cb){
            cb(list);
        }
        return (
            <List    
            items={list} 
            value={val}   
            title={listTitle}
            renderSubComponent={this[funcName]}
        />
    );
    }
    renderCountriesList = (currentList) => {
        console.log(currentList);
        return this.buildListComp(currentList,'Country','Countries','renderCitiesList',this.sortCountries);
   
    }

    sortCountries = (listToSort) =>{
        // const CountriesCounter = [];
        // listToSort.forEach(element => {
        //     if()
        // });





        // console.log('hi i am sort func')
        // const countriesMap = new Map();
        // console.log(listToSort);
        
        // listToSort.forEach(element => {
        //     if(!countriesMap.has(element.Country)){
        //         countriesMap.set(element.Country, 0)
        //     }
        //     countriesMap.set(element.Country,countriesMap.get(element.Country)+1);
        // });
        // console.log(JSON.stringify(countriesMap));
        // var mapAsc = new Map([...countriesMap.entries()].sort());

        // console.log(mapAsc)
        

    }

    renderCitiesList = (selectedKey, currentList) => {
        //iterate over the filtered array and find the one that is selected
        const allRelatedCities = this.getRelatedItemsHelper('Country',selectedKey, currentList);
        return this.buildListComp(allRelatedCities,'City','Cities','renderCompaniesList');
    }

    renderCompaniesList = (selectedKey, currentList) =>{      
        return this.buildListComp(this.getRelatedItemsHelper('City',selectedKey, currentList),'CompanyName','Companies','renderMap');
    }


    renderMap = (selectedKey, currentList) => {
        
        // var ob = [{long:32.0879994, lat:34.7622266},{long:29.0879994, lat:30.7622266},{long:21.0879994, lat:31.7622266} ];
        // var rand = Math.floor(Math.random() * 3);
        // console.log(rand);
        //     return (
        //         <div className='map-container'>
        //             <div className='map-title'>Map</div>
        //             <div className='map-data'>
        //                 <MapContainer lat={ob[rand].lat} long={ob[rand].long}/>
        //             </div>
        //         </div>
        //     )
        const comp = this.getRelatedItemsHelper('CompanyName',selectedKey, currentList);
        // let longLat = {long:32.0879994, lat:34.7622266};
        if(comp[0]){
            return (
                    <div className='map-container'>
                        <div className='map-title'>Map</div>
                        <div className='map-data'>
                            <MapContainer addr={`${comp[0].Address}, ${comp[0].City}, ${comp[0].Country}`}/>
                        </div>
                    </div>
                )
        }
     
        
    }

    getLongLat = (address) =>{
        
        Geocode.fromAddress(address).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              return (
                <div className='map-container'>
                    <div className='map-title'>Map</div>
                    <div className='map-data'>
                        <MapContainer lat={lat} long={lng}/>
                    </div>
                </div>)
            //   return {long:lng, lat:lat} 

            },
            error => {
              console.error(error);
              return (
                <div className='map-container'>
                    <div className='map-title'>Map</div>
                    <div className='map-data'>
                        <MapContainer lat={32.0879994} long={34.7622266}/>
                    </div>
                </div>
            )
            //   return {long:32.0879994, lat:34.7622266} // in case of error i have decided to just return some default long & lat (in this case its tel aviv)
            }
          );
    }

    render(){
    //    console.log('render ? ', this.state.clientList);
        //console.log('mainTable Render');
       return (
        <div className='container'>
            {/* we pass the countries list to the method in order to... */}
            {this.renderCountriesList(this.state.clientList)}
        </div>
       );
    }
}

export default MainTable; 
