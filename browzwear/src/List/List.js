import React, {Component} from 'react';
import './List.css';

class List extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        
        this.state = {
            key: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({key: nextProps.items[0].Id})
    }

    handleClickItem = (item) => {
        this.setState({key: item.Id});
    }

    render() {
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
                {this.props.renderSubComponent(this.state.key, this.props.items)}
            </>
        );
    }
};

export default List;
