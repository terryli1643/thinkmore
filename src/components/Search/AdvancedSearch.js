import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './Search.less'
import { DatePicker, Input, Select, Button, Icon } from 'antd'
import moment from 'moment';
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

class AdvancedSearch extends React.Component {
  state = {
    clearVisible: false,
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
  }
  handleSearch = () => {
    const data = {
      keyword: ReactDOM.findDOMNode(this.refs.searchInput).value,
    }
    if (this.props.select) {
      data.field = this.state.selectValue
    }
    if (this.props.onSearch) this.props.onSearch(data)
  }
  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== '',
    })
  }
  handeleSelectChange = value => {
    this.setState({
      ...this.state,
      selectValue: value,
    })
  }
  handleClearInput = () => {
    ReactDOM.findDOMNode(this.refs.searchInput).value = ''
    this.setState({
      clearVisible: false,
    })
    this.handleSearch()
  }

  render () {
    const { size, select, selectOptions, selectProps, style, keyword } = this.props
    const { clearVisible } = this.state
    return (
      <div>
        <Input.Group compact size={size} className={styles.search} style={style}>
          {select && <Select ref="searchSelect" onChange={this.handeleSelectChange} size={size} {...selectProps}>
            {selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value}
                                                                              key={key}>{item.name || item.value}</Select.Option>)}
          </Select>}
          <RangePicker
            defaultValue={[moment(), moment()]}
            format={dateFormat}
          />
          <Input ref="searchInput" size={size} style={{ width: '50%' }} onChange={this.handleInputChange} onPressEnter={this.handleSearch}
                 placeholder="支持以姓名，手机，订单号，快递单号查询"/>
          <Button size={size} type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
          {clearVisible && <Icon type="cross" onClick={this.handleClearInput} />}
        </Input.Group>
      </div>
    )
  }
}


AdvancedSearch.propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  selectProps: PropTypes.object,
  onSearch: PropTypes.func,
  selectOptions: PropTypes.array,
  style: PropTypes.object,
  keyword: PropTypes.string,
}

export default AdvancedSearch
