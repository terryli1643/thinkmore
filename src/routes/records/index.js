import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import RecordList from './RecordList'
import RecordFilter from './RecordFilter'
import RecordModal from './RecordModal'
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
const menuOptions1 = [ { key: '1', name: '编辑' }, { key: '2', name: '打印' } ];
const menuOptions2 = [ { key: '3', name: '重发' }, { key: '4', name: '打印' } ];
let applyTrackingNumber = false;


function Records ({ location, dispatch, records, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = records
  const { field, keyword } = location.query

  const recordModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `records/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'records/hideModal',
      })
    },
  }


  let selectedRowKeys = [];


  const recordListProps = {
    dataSource: list,
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
    onPrintItem (id) {
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
    onEditItem (item) {
      dispatch({
        type: 'records/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onSelectedRowKeysChanged(selectedRowKeys) {
      console.log("====" + selectedRowKeys)
      selectedRowKeys = selectedRowKeys;
    },
    menuOptions: menuOptions1,
  }


  const recordFilterProps = {
    field,
    keyword,
    isMotion,
    selectedRowKeys,
    applyTrackingNumber,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length || fieldsValue.timeRange ? dispatch(routerRedux.push({
          pathname: '/records',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
            timeRange: fieldsValue.timeRange,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/records',
        }))
    },
    onAdd () {
      dispatch({
        type: 'records/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  function callback (key) {
    console.log(key);
    if (key === 1) {
      applyTrackingNumber = true;
      recordListProps.menuOptions = menuOptions1;
    }
    if (key === 2) {
      applyTrackingNumber = false;
      recordListProps.menuOptions = menuOptions2;
    }
  }

  const RecordModalGen = () =>
    <RecordModal {...recordModalProps} />

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="未打查询" key="1">
        <div className="content-inner">
          <RecordFilter {...recordFilterProps} />
          <RecordList {...recordListProps} />
          <RecordModalGen />
        </div>
      </TabPane>

      <TabPane tab="已打查询" key="2">
        <div className="content-inner">
          <RecordFilter {...recordFilterProps} />
          <RecordList {...recordListProps} />
          <RecordModalGen />
        </div>
      </TabPane>

      <TabPane tab="未发单号" key="3">
        <div className="content-inner">
          <RecordFilter {...recordFilterProps} />
          <RecordList {...recordListProps} />
          <RecordModalGen />
        </div>
      </TabPane>

      <TabPane tab="已被重用" key="4">
        <div className="content-inner">
          <RecordFilter {...recordFilterProps} />
          <RecordList {...recordListProps} />
          <RecordModalGen />
        </div>
      </TabPane>
    </Tabs>
  )
}

Records.propTypes = {
  records: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ records, loading }) => ({ records, loading: loading.models.records }))(Records)
