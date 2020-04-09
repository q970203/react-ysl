import React from "react";
import './input.css';
import propTypes from 'prop-types'

export default class Input extends React.Component{
  static defaultProps={
    type:'text',
    style:{},
    model:{
      name:"",
      value:"",
      onChange:()=>{}
    }
  }
  static propTypes = {
    type:propTypes.string,
    style: propTypes.object,
    model: propTypes.shape({
      name:propTypes.string.isRequired,
      value:propTypes.string.isRequired,
      onChange:propTypes.func.isRequired
    })
  }

  render() {
    let {type,style,model} = this.props
    return(
      <div style={style} className={'input'}>

      {!model?(
        <input type={type} />
    ):(
        <input
          type={type}
          value={model.value}
          onChange={model.onChange}
          name={model.name}
        />
    )
      }
      </div>

    )
  }

}