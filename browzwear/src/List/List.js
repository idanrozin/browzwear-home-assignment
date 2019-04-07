import React, {Component} from 'react';
import './List.css';

class List extends Component{
    constructor(props) {
        super(props);        
        this.state = {
            key: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        //in order to initialize the default pick
        this.setState({key: nextProps.items[0].Id})
    }

    handleClickItem = (item) => {
        //this will change the current selected item
        this.setState({key: item.Id});
    }

    render() {
        //filter the list from duplications
        const filteredArr = this.props.items.reduce((acc, current) => {
            const x = acc.find(item => item[this.props.value]  === current[this.props.value] );
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        
        return (
            <>
                <div className='list-container'>
                    <div className='title'>{this.props.title}</div>
                    <div className='data-container'>
                    {   
                        filteredArr.map(item => {
                            const isSelected = item.Id === this.state.key;
                            return (
                                <div 
                                    key={item.Id}
                                    title={item[this.props.value]}
                                    onClick={() => this.handleClickItem(item)}
                                    className={`item ${isSelected ? 'selected' : ''}`}
                                >
                                    {item[this.props.value]}
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
                {/* inside this fragment - append the renderSubComponent method to the props so we can implement the behaviour
                 outside the List component to build the next list */}
                {this.props.renderSubComponent(this.state.key, filteredArr,this.props.listNumber+1)}
            </>
        );
    }
};

export default List;
