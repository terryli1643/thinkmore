import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Switch } from 'antd'
import { AdvancedSearch } from '../../components/'


const RecordFilter = ({
    field,
    keyword,
    onSearch,
    onAdd,
    isMotion,
    switchIsMotion,
    onPrintItem,
    selectedRowKeys,
}) => {
    const searchGroupProps = {
        field,
        keyword,
        size: 'large',
        select: false,
        onSearch: (value) => {
            onSearch(value)
        },
    }

    const hasSelected = selectedRowKeys.length > 0;

    const handlePrintClick = (record, e) => {
        onPrintItem(record.id);
    }

    return (
        <Row gutter={24}>
            <Col lg={16} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
                <AdvancedSearch {...searchGroupProps} />
            </Col>
            <Col lg={8} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
                {/* <Switch style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren={'动画开'} unCheckedChildren={'动画关'} /> */}
                <Button size="large" disabled={!hasSelected} onClick={handlePrintClick}>打印</Button>
            </Col>
        </Row>
    )
}

RecordFilter.propTypes = {
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func,
    onAdd: PropTypes.func,
    field: PropTypes.string,
    keyword: PropTypes.string,
    isMotion: PropTypes.bool,
    switchIsMotion: PropTypes.func,
}

export default Form.create()(RecordFilter)
