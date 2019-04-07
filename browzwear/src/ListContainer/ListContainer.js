import React, {Component} from 'react';
import axios from 'axios';
import List from '../List/List';
import './ListContainer.css';
import MapContainer from '../MapContainer/MapContainer';
//This will represent our lists, if we want to add more lists in the future we need to add another element to this array.
const LISTS_STRUCTURE = [
                            {val:'Country',listTitle:'Countries',nextfuncName:'renderCitiesList'},
                            {val:'City',listTitle:'Cities',nextfuncName:'renderCompaniesList'},
                            {val:'CompanyName',listTitle:'Companies',nextfuncName:'renderMap'},
                        ];
                
const INITIAL_LIST_INDEX = 0;

class MainTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clientList: []
        }
    }
    
    componentDidMount() {
        //read json file
        axios.get('clients.json').then(client => {
           this.setState({clientList: client.data.Customers});
       })
    }
   
    //each time the render props 'renderSubComponent' will return a filtered list (without duplicate)
    //this function gets the list and by the related item and the selectedKey (the country\city\company that had been pressed) and return the relevant next items   
    getRelatedItemsHelper =(relatedItem,selectedKey,currentList)=>{
        const selectedItem = currentList.find(item => item.Id === selectedKey);
        return this.state.clientList.filter(customer => customer[relatedItem] === selectedItem[relatedItem]);
    }

    //each time we want to re-render the list component with dynamic values well go here
    buildListComponent = (list,listStructure,idx) =>{
        //idx is for the next index to get in the next list
        return (
                <List 
                listNumber ={idx}   
                items={list} 
                value={listStructure.val}   
                title={listStructure.listTitle}
                renderSubComponent={this[listStructure.nextfuncName]}/>
        );
    }
    
    renderCountriesList = (currentList,idx) => {
        //sortListByNumbers return a sorted list by keys (countries by number of cities), so:
        //LISTS_STRUCTURE[idx+1] = cities , LISTS_STRUCTURE[idx] = countries
        return this.buildListComponent(this.sortListByNumbers(currentList,LISTS_STRUCTURE[idx+1].val,LISTS_STRUCTURE[idx].val),LISTS_STRUCTURE[idx],idx);
    }

    renderCitiesList = (selectedKey, currentList,idx) => {
        //iterate over the filtered array and find the one that is selected and return the relevant list
        const allRelatedCities = this.getRelatedItemsHelper(LISTS_STRUCTURE[idx-1].val,selectedKey, currentList);
        return this.buildListComponent(this.sortListByNumbers(allRelatedCities,LISTS_STRUCTURE[idx+1].val,LISTS_STRUCTURE[idx].val),LISTS_STRUCTURE[idx],idx);
    }

    renderCompaniesList = (selectedKey, currentList,idx) =>{      
        return this.buildListComponent(this.getRelatedItemsHelper(LISTS_STRUCTURE[idx-1].val,selectedKey, currentList).sort(),LISTS_STRUCTURE[idx]);
    }

    renderMap = (selectedKey, currentList,idx) => { 
        const comp = this.getRelatedItemsHelper('CompanyName',selectedKey, currentList);
        //get the address (street,city,country)
        if(comp[0]){
            return(
                <div className='map-container'>
                    <div className='map-title'>Map</div>
                    <div className='map-data'>
                        <MapContainer addr={`${comp[0].Address}, ${comp[0].City}, ${comp[0].Country}`}/>
                    </div>
                </div>
            )
        }   
    }
    sortListByNumbers = (listToSort,distinctBy,groupBy) =>{
        //first I distinct values so we wont have duplicates (for example: if mexico have 5 keys but all are the same city so the final result should be only one city in mexico)
        const distinctedlistByKey = this.distinctedlistByKey(listToSort,distinctBy);
        //now I need to group by the groupBy variable
        const GroupedByList = this.groupByKey(distinctedlistByKey,groupBy)
        //then, I sort the GroupedByList by the length of each array 
        return this.sortLists(GroupedByList);
    }

    distinctedlistByKey = (listToSort, key) => {
        return listToSort.filter((obj, pos) => {
            return (
                listToSort.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos
            );
          });
    }
    groupByKey = (listToSort, key) => {
        return listToSort.reduce(function(acc, current) {
            (acc[current[key]] = acc[current[key]] || []).push(current);
            return acc;
          }, {});
    }
    
    sortLists = (listToSort) => {
        return Object.values(listToSort).sort((valA, valB) => {
            return valB.length - valA.length
        }).flat();
    }

    render(){
       return (
        <div className='container'>
            {/* we pass the countries list to the method in order to start the rendering from the first method 'renderCountriesList'  */}
            {this.renderCountriesList(this.state.clientList,INITIAL_LIST_INDEX)}
        </div>
       );
    }
}

export default MainTable; 
