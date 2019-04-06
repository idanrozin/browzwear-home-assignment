import React, {Component} from 'react';
import axios from 'axios';
import List from './List/List';
import './MainTable.css';
import MapContainer from './MapContainer';

class MainTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clientList: []
        }
    }

    componentDidMount() {
       axios.get('clients2.json').then(client => {
           console.log(client);
           console.log(client.data.Customers);
           this.setState({clientList: client.data.Customers});
       })
    }
   
    renderCountriesList = (currentList) => {
        return (
                <List    
                items={currentList} 
                value={'Country'}   
                title={'Countries'}
                renderSubComponent={this.renderCitiesList}
            />
        );
    }

    renderCitiesList = (selectedKey, currentList) => {
        const selectedCountry = currentList.find(item => item.Id === selectedKey);
        console.log('selectedCountry ? ', selectedCountry);

        return (
            <List    
                items={this.state.clientList} 
                value={'City'} 
                title={'Cities'}
                renderSubComponent={this.renderCompaniesList}
            />
        );
    }

    renderCompaniesList = () => (
        <List    
            items={this.state.clientList} 
            value={'CompanyName'} 
            title={'Companies'}
            renderSubComponent={this.renderMap}
        />
    );

    renderMap = () => (
        <div className='map-container'>
            <div className='map-title'>Map</div>
            <div className='map-data'>
                <MapContainer long= {3.14}/>
            </div>
        </div>
    )

    render(){
       console.log('render ? ', this.state.clientList);

       return (
        <div className='container'>
            {this.renderCountriesList(this.state.clientList)}
        </div>
       );
    }
}

export default MainTable; 
