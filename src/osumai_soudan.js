import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, ControlLabel, InputGroup, FormControl, Col, Button} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanChat from './osumai_soudan_chat'

// 相談画面を定義するコンポーネント
export default class OsumAISoudan extends Component {
  constructor (props) {
    super(props)
    this.state = { timelines: [], ask: '' }
  }
  postProc () {

    if (this.state.ask=='') {
			return
		}

		// dummy Q
		this.refs.chat.addAsk(this.state.ask)
		
		// dummy A
    this.refs.chat.addAnswer('答えです。')
    
    // Watsonに尋ねて解答をもらう

    this.setState({ask: ''})

  }
  keyProc(e){
    if (e.keyCode == 13){
      e.preventDefault()
      this.postProc()
    }
  }
  keyProc2(e){
    if (e.keyCode == 13){
      e.preventDefault()
    }
  }

  render () {
    return (
      <div>
        <OsumAIHeader title='お住まい相談' />
        <Form style={styles.osumai_soudan_input}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" value={this.state.ask} 
                  onKeyDown={e => this.keyProc(e)}  
                  onKeyPress={e => this.keyProc2(e)} 
                  onKeyUp={e => this.keyProc2(e)} 
                  onChange={e => this.setState({ask: e.target.value})}
                  ref='askinput'/>
              <InputGroup.Addon onClick={e => this.postProc()}>送信</InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Form>
        <OsumAISoudanChat ref='chat'/>
      </div>
    )
  }
  componentDidUpdate(){
    let input = ReactDOM.findDOMNode(this.refs.askinput)
    input && input.focus()
  }
}
