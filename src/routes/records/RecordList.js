import React, { PropTypes } from 'react'
import { Button, Table, Modal } from 'antd'
import styles from './RecordList.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'


const confirm = Modal.confirm


function RecordList ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location, onSelectedRowKeysChanged, menuOptions, applyTrackingNumber }) {


  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要打印这条记录吗?',
        onOk () {
          // onDeleteItem(record.id)
        },
      })
    } else if (e.key === '3') {
      confirm({
        title: '您确定要重发这条记录吗?',
        onOk () {
          // onDeleteItem(record.id)
        },
      })
    } else if (e.key === '4') {
      confirm({
        title: '您确定要打印这条记录吗?',
        onOk () {
          // onDeleteItem(record.id)
        },
      })
    }
  }

  const userListProps = {
    dataSource: RecordList,
    loading,
    pagination,
    location,
    isMotion,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'records/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'records/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const columns = [
    {
      title: '发件人姓名',
      dataIndex: 'senderName',
      key: 'senderName',
    }, {
      title: '发件人电话',
      dataIndex: 'senderMobile',
      key: 'senderMobile',
    }, {
      title: '收件人姓名',
      dataIndex: 'receiverName',
      key: 'receiverName',
    }, {
      title: '收件人电话',
      dataIndex: 'receiverMobile',
      key: 'receiverMobile',
    }, {
      title: '快递单号',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      render: function (text, record) {
        if (applyTrackingNumber) {
          return (<Button />)
        } else {
          return text
        }

      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                           menuOptions={menuOptions} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => {
    return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      onSelectedRowKeysChanged(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === '',    // Column configuration not to be checked
    }),
  };

  return (
    <div>
      <Table
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 900 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
        expandedRowRender={record =>
          <p>{record.orderNumber}<br />{record.type}<br />{record.receiverAddress}<br />{record.content}<br />{record.time}
          </p>}
        rowSelection={rowSelection}
      />
    </div>
  )
}

RecordList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default RecordList
