import React, {Component} from 'react'
import NumberFormat from 'react-number-format'


class Row extends Component{

render(){
    return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.country}</td>

                <NumberFormat value={this.props.new_cases} displayType={'text'} thousandSeparator={true} renderText={value => <td style={{color:this.props.new_cases!==0?"#fff":"#2C3335"}} bgColor={this.props.new_cases!==0?"#F4C724":'#fff'}>{value}</td>} />
                <NumberFormat value={this.props.total_cases} displayType={'text'} thousandSeparator={true} renderText={value => <td>{value}</td>} />

            
                <NumberFormat value={this.props.new_deaths} displayType={'text'} thousandSeparator={true} renderText={value => <td style={{color:this.props.new_deaths!==0?"#fff":"#2C3335"}} bgColor={this.props.new_deaths!==0?"#E8290B":'#fff'}>{value}</td>} />

                <NumberFormat value={this.props.total_deaths} displayType={'text'} thousandSeparator={true} renderText={value=><td>{value}</td>}/>
               

    <NumberFormat value={this.props.new_recoveries} displayType={'text'} thousandSeparator={true} renderText={value => <td style={{color:this.props.new_recoveries!==0?"#fff":"#2C3335"}} bgColor={this.props.new_recoveries!==0?"#43BE31":'#fff'}>{value}</td>} />

                <NumberFormat value= {this.props.total_recoveries} displayType={'text'} thousandSearator ={true} renderText={value=><td>{value}</td>}/>
            


                

                </tr>
        )
    }
}    

export default Row
